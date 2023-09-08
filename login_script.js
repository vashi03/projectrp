// JavaScript
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Make a GET request to the server to check the username and password
  fetch(`http://localhost:3000/api/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        // Redirect to farmer.html after successful login
        window.location.href = `interface.html?username=${encodeURIComponent(username)}`;
      } else {
        alert("Invalid username or password. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error fetching data from server:", error);
      alert("An error occurred. Please try again later.");
    });
});

function registerfunction() {
    window.location.href = `register.html`;
}