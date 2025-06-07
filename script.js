document.addEventListener("DOMContentLoaded", () => {
  const userDataContainer = document.getElementById("userDataContainer");
  const reloadDataBtn = document.getElementById("reloadDataBtn");
  const errorMessageDiv = document.getElementById("errorMessage");
  const API_URL = "https://jsonplaceholder.typicode.com/users";

  function displayError(message) {
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = "block";
    userDataContainer.innerHTML = "";
  }

  function hideError() {
    errorMessageDiv.style.display = "none";
    errorMessageDiv.textContent = "";
  }

  async function fetchAndDisplayUsers() {
    userDataContainer.innerHTML = "<p>Loading user data...</p>";
    hideError();

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const users = await response.json();

      userDataContainer.innerHTML = "";

      users.forEach((user) => {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");

        userCard.innerHTML = `
                    <h2>${user.name}</h2>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                    <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
                    <p><strong>Company:</strong> ${user.company.name}</p>
                `;
        userDataContainer.appendChild(userCard);
      });
    } catch (error) {
      console.error("Fetch error:", error);
      if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("NetworkError")
      ) {
        displayError(
          "Network error: Could not connect to the API. Please check your internet connection."
        );
      } else {
        displayError(`Failed to fetch user data: ${error.message}`);
      }
    }
  }

  fetchAndDisplayUsers();

  reloadDataBtn.addEventListener("click", fetchAndDisplayUsers);
});
