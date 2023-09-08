const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  const formData = {
    username: username,
    password: password
  };

  fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData),
  })
  .then((response) => {
    console.log("Server Response:", response);
    return response.json();
  })
  .then((data) => {
    console.log("Parsed JSON Data:", data);
    console.log(data.message);
    window.location.href = `index.html`
  })
  .catch((error) => {
    console.error("Error registering user:", error);
  });
});
