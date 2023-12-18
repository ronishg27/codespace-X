// Example using fetch in a frontend application
const postData = {
  fullname: "ronish ghimire",
  username: "ronish_ghim",
  email: "one@gmail.com",
  password: "oneone",
};

fetch("http://localhost:8080/api/v1/users/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(postData),
})
  .then((response) => response.json())
  .then((data) => console.log("Response from server:", data))
  .catch((error) => console.error("Error:", error));
