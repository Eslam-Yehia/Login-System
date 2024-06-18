//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// sign in page
var usersData = JSON.parse(localStorage.getItem("usersData")) || [];
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");

var validateLoginEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm;
var validateLoginPassword =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm;
var loginBtn = document.querySelector(".login");

loginBtn.addEventListener("click", login);

loginEmail.addEventListener("input", function () {
  validate(validateLoginEmail, loginEmail);
  removeMessage();
});
loginPassword.addEventListener("input", function () {
  validate(validateLoginPassword, loginPassword);
  removeMessage();
});

document.querySelector(".check-box").addEventListener("click",ShowPass)
document.querySelector(".showPassLabel").addEventListener("click",ShowPass)

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

function login() {
  if (loginEmail.value == "" || loginPassword.value == "") {
    addInputsRequiredMessage();
  } else if (
    validate(validateLoginEmail, loginEmail) &&
    validate(validateLoginPassword, loginPassword)
  ) {
    if (checkUser()) {
      {
        window.open("./html/home.html", "_self");
      }
    } else {
      addIncorrectMessage();
    }
  } else {
    addInvalidInputMessage();
  }
}

function checkUser() {
  for (var i = 0; i < usersData.length; i++) {
    if (loginEmail.value === usersData[i].email) {
      if (loginPassword.value === usersData[i].password) {
        var userName = usersData[i].name;
        localStorage.removeItem("userName");
        localStorage.setItem("userName", userName);
        return true;
      }
      return false;
    }
    return false;
  }
}

function addInvalidInputMessage() {
  removeMessage();
  loginBtn.previousElementSibling.classList.add("d-block");
  loginBtn.previousElementSibling.classList.remove("d-none");
}
function addIncorrectMessage() {
  removeMessage();
  loginBtn.previousElementSibling.previousElementSibling.classList.add(
    "d-block"
  );
  loginBtn.previousElementSibling.previousElementSibling.classList.remove(
    "d-none"
  );
}
function addInputsRequiredMessage() {
  removeMessage();
  loginBtn.parentElement.querySelector(".required").classList.add("d-block");
  loginBtn.parentElement.querySelector(".required").classList.remove("d-none");
}
function removeMessage() {
  loginBtn.parentElement.querySelector(".required").classList.remove("d-block");
  loginBtn.parentElement.querySelector(".required").classList.add("d-none");
  loginBtn.parentElement
    .querySelector(".Invalid-Inputs")
    .classList.remove("d-block");
  loginBtn.parentElement
    .querySelector(".Invalid-Inputs")
    .classList.add("d-none");
  loginBtn.previousElementSibling.previousElementSibling.classList.remove(
    "d-block"
  );
  loginBtn.previousElementSibling.previousElementSibling.classList.add(
    "d-none"
  );
}
function ShowPass() {
  if (loginPassword.type === "password") {
    loginPassword.type = "text";
  } else {
    loginPassword.type = "password";
  }
}