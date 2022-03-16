const path = require('path');
const express = require('express');
const router = express.Router();

const db = require('../data/database');

router.get('/participants', async function (req, res) {
    const query = `
    SELECT * FROM (SELECT party.persons.name AS personsname, party.persons.id 
        AS personID, party.persons.surname, party.persons.email, party.food.name 
        AS food_name 
        FROM (party.persons_has_food) INNER JOIN (party.persons) 
        ON (party.persons_has_food.person_id = party.persons.id)
        INNER JOIN (party.food) ON (party.persons_has_food.food_id = party.food.id)) 
        AS food_table INNER JOIN 

        (SELECT party.beverages.name AS beverage_name, party.persons.id 
        AS personID2 FROM (party.persons_has_beverages) 
        INNER JOIN (party.persons) 
        ON (party.persons_has_beverages.person_id = party.persons.id)
        INNER JOIN (party.beverages) 
        ON (party.persons_has_beverages.beverage_id = party.beverages.id)) 
        AS beverages_table 
        WHERE food_table.personID = beverages_table.personID2
    `
   
    const [participants] = await db.query(query)

    console.log(participants);


    res.render('participants', {
        participants: participants,
    });
})
module.exports = router;