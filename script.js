function changeText() {
  document.getElementById("message").textContent =
    "Yo, JavaScript is working on your website!";
}

function changeTheme() {
  document.body.classList.toggle("light-mode");
}

function showTime() {
  const now = new Date();
  document.getElementById("time").textContent =
    "Current time: " + now.toLocaleTimeString();
}
