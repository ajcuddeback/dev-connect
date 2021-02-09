async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value;
  const email = document.querySelector("#email-signup").value;
  const last_name = document.querySelector("#last-name-signup").value;
  const first_name = document.querySelector("#first-name-signup").value;

  if (username && email && first_name && last_name && password) {
<<<<<<< HEAD
    const response = await fetch("/api/users/", {
=======
    const response = await fetch("/api/users", {
>>>>>>> events-frontend
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        first_name,
        last_name,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);