// signup page
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");

var validateSignupName = /^[a-z0-9_-]{3,15}[ ]?[a-z0-9_-]{0,15}$/gim;
var validateSignupEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm;
var validateSignupPassword =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm;
var signupBtn = document.getElementById("signup");

var usersData = JSON.parse(localStorage.getItem("usersData")) || [];

signupBtn.addEventListener("click", signup);
signupName.addEventListener("input", function () {
  validate(validateSignupName, signupName);
  removeMessage();
});
signupEmail.addEventListener("input", function () {
  validate(validateSignupEmail, signupEmail);
  removeMessage();
});
signupPassword.addEventListener("input", function () {
  validate(validateSignupPassword, signupPassword);
  removeMessage();
});
document.querySelector(".check-box").addEventListener("click", ShowPass);
document.querySelector(".showPassLabel").addEventListener("click", ShowPass);

function validate(regex, element) {
  if (element.value.match(regex)) {
    element.nextElementSibling.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.nextElementSibling.nextElementSibling.classList.remove("d-none");
  }
  if (element.value == "") {
    element.nextElementSibling.nextElementSibling.classList.add("d-none");
    return false;
  }
}

function signup() {
  if (
    signupName.value == "" ||
    signupEmail.value == "" ||
    signupPassword.value == ""
  ) {
    addInputsRequiredMessage();
  } else if (
    validate(validateSignupName, signupName) &&
    validate(validateSignupEmail, signupEmail) &&
    validate(validateSignupPassword, signupPassword)
  ) {
    if (existEmail()) {
      addExistMessage();
    } else {
      var userData = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
      };
      usersData.push(userData);
      localStorage.setItem("usersData", JSON.stringify(usersData));
      clearInputs();
      addSuccessMessage();
      // window.open("../index.html", "_self");
    }
  } else {
    addInvalidInputMessage();
  }
}
function clearInputs() {
  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
}

function addInvalidInputMessage() {
  removeMessage();
  signupBtn.previousElementSibling.classList.add("d-block");
  signupBtn.previousElementSibling.classList.remove("d-none");
}

function addSuccessMessage() {
  removeMessage();
  signupBtn.previousElementSibling.previousElementSibling.classList.add(
    "d-block"
  );
  signupBtn.previousElementSibling.previousElementSibling.classList.remove(
    "d-none"
  );
}

function addInputsRequiredMessage() {
  removeMessage();
  signupBtn.parentElement.querySelector(".required").classList.add("d-block");
  signupBtn.parentElement.querySelector(".required").classList.remove("d-none");
}

function removeMessage() {
  document.querySelector(".exist").classList.remove("d-block");
  document.querySelector(".exist").classList.add("d-none");
  signupBtn.parentElement
    .querySelector(".required")
    .classList.remove("d-block");
  signupBtn.parentElement.querySelector(".required").classList.add("d-none");
  signupBtn.parentElement
    .querySelector(".Invalid-Inputs")
    .classList.remove("d-block");
  signupBtn.parentElement
    .querySelector(".Invalid-Inputs")
    .classList.add("d-none");
  signupBtn.previousElementSibling.previousElementSibling.classList.remove(
    "d-block"
  );
  signupBtn.previousElementSibling.previousElementSibling.classList.add(
    "d-none"
  );
}
function existEmail() {
  for (var i = 0; i < usersData.length; i++) {
    if (signupEmail.value == usersData[i].email) {
      return true;
    }
    return false;
  }
}
function addExistMessage() {
  removeMessage();
  document.querySelector(".exist").classList.add("d-block");
  document.querySelector(".exist").classList.remove("d-none");
}

function ShowPass() {
  if (signupPassword.type === "password") {
    signupPassword.type = "text";
  } else {
    signupPassword.type = "password";
  }
}
