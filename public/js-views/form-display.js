const FormButtonElement = document.querySelector("#hero_content a");
const FormESCElement = document.querySelector('.menu-btn');
const BackdropElement = document.getElementById("form-background");

function addBackdrop() {
  const BackdropElement = document.getElementById("form-background");
  const ParticipForm = document.getElementById("particip-form");

  ParticipForm.style.display = "block";
  BackdropElement.style.display = "block";
  ParticipForm.style.zIndex = "2";
  BackdropElement.style.zIndex = "1";

  // console.dir(BackdropElement);
  // console.dir(ParticipForm);
}

function deleteBackdrop() {
    const BackdropElement = document.getElementById("form-background");
    const ParticipForm = document.getElementById("particip-form");
    BackdropElement.style.display = "none";
    ParticipForm.style.display = "none";
}

FormButtonElement.addEventListener("click", addBackdrop);
FormESCElement.addEventListener('click', deleteBackdrop);
BackdropElement.addEventListener('click', deleteBackdrop);