document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const message = document.getElementById("message");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
  
      if (!name || !email || !password) {
        showMessage("All fields are required.", "red");
        return;
      }
  
      if (!validateEmail(email)) {
        showMessage("Please enter a valid email address.", "red");
        return;
      }
  
      if (!validatePassword(password)) {
        showMessage("Password must be at least 6 characters, including a number.", "red");
        return;
      }
  
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  
      // Check for duplicate email
      const isDuplicate = existingUsers.some(user => user.email === email);
      if (isDuplicate) {
        showMessage("Email already registered. Try logging in.", "red");
        return;
      }
  
      // Save new user
      existingUsers.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(existingUsers));
  
      showMessage("Registration successful!", "green");
      form.reset();
    });
  
    function validateEmail(email) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(email);
    }
  
    function validatePassword(password) {
      return password.length >= 6 && /\d/.test(password);
    }
  
    function showMessage(msg, color) {
      message.textContent = msg;
      message.style.color = color;
    }
  });
  