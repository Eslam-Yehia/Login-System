var userName = localStorage.getItem("userName");
document.querySelector(".username").innerHTML = `${userName}`;

var logoutBtn = document.querySelector("#logoutBtn");
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("userName");
  window.open("../index.html", "_self");
});
