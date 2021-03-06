async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value;
  const email = document.querySelector("#email-signup").value;
  const last_name = document.querySelector("#last-name-signup").value;
  const first_name = document.querySelector("#first-name-signup").value;


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      lat = position.coords.latitude;
      lon = position.coords.longitude

      if (username && email && first_name && last_name && password) {
        const response = await fetch("/api/users/", {
          method: "POST",
          body: JSON.stringify({
            username,
            email,
            first_name,
            last_name,
            password,
            lon,
            lat
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          document.location.replace("/");
        } else {
          alert(response.statusText);
        }
      }
    })
  } else {
    alert('You must allow location in order to use this app')
  }
};


document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);