const path = require('path');
const express = require('express');
const router = express.Router();

const db = require('../data/database');

router.get('/', function(req, res) {
    res.render('index');
});

router.post('/',async function(req, res) {
    const personData = [
        req.body.name,
        req.body.surname,
        req.body.email,
    ];
    const beverageData = [
        req.body.beverage,
    ];
    const foodData = [
        req.body.food,
    ]

    console.log(personData);
    console.log(beverageData);
    console.log(foodData);

    const query_email = `
    SELECT party.persons.id FROM party.persons WHERE party.persons.email = ?
    `
    const query_beverage = `
    SELECT party.persons.id FROM party.persons WHERE party.persons.email = ?
    `
    const query_food = `
    SELECT party.persons.id FROM party.persons WHERE party.persons.email = ?
    `

    const [person_id] = await db.query(query_email, [
        personData[2],
    ]);
    const [beverage_id] = await db.query(query_beverage, [
        beverageData[0],
    ]);
    const [food_id] = await db.query(query_food, [
        foodData[0],
    ]);

    const condition1 = (!person_id.id || person_id.id === 0);
    const condition2 = (!beverage_id.id || beverage_id.id === 0);
    const condition3 = (!food_id.id || food_id.id === 0);

    const query1 = `
    INSERT INTO party.persons (name, surname, email) VALUES (?);
    `
    const query2 = `
    INSERT IGNORE INTO party.food (name) VALUES (?);
    `
    const query3 = `
    INSERT IGNORE INTO party.beverages (name) VALUES (?);
    `

    const query4 = `
    INSERT IGNORE INTO party.persons_has_food (person_id,food_id) VALUES (?);
    `

    const query5 = `
    INSERT IGNORE INTO party.persons_has_beverages (person_id,beverage_id) VALUES (?);
    `

    if (condition1 && condition2 && condition3) {

        const [resultsPerson] = await db.query(query1, [
            personData,
        ], (err, results, fields) => {
            if(err) {
                console.log(error);
                res.status(500).json({message: "Invalid Request"});
            } else {
              inserted_person_id = results.insertId; // undefined
            //   console.log(inserted_person_id);   
              res.status(200).json({message: ""});       
            }
        });
        const personID = resultsPerson.insertId;

        const [resultsFood] = await db.query(query2, [
            foodData,
        ], (err, results, fields) => {
            if(err) {
                console.log(error);
                res.status(500).json({message: "Invalid Request"});
            } else {
              inserted_food_id = results.insertId; // undefined
            //   console.log(inserted_food_id);   
              res.status(200).json({message: ""});       
            }
        });
        const foodID = resultsFood.insertId;

        const [resultsBeverage] = await db.query(query3, [
            beverageData,
        ], (err, results, fields) => {
            if(err) {
                console.log('error');
                res.status(500).json({message: "Invalid Request"});
            } else {
            //   console.log(results.insertId);
              inserted_beverage_id = results.insertId; // undefined
            //   console.log(inserted_beverage_id);   
              res.status(200).json({message: "1"});       
            }
        });

        const beverageID = resultsBeverage.insertId;

        const ob1 = [
            personID,
            foodID,
        ];

        const ob2 = [
            personID,
            beverageID,
        ];

        await db.query(query4, [
            ob1,
        ]);

        await db.query(query5, [
            ob2,
        ]);
    } else if (!condition1 && condition2 && condition3) {
        
    }

    res.redirect('/');
});

module.exports = router;