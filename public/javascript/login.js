async function loginFormHandler(event) {
  event.preventDefault();
  const errorP = document.querySelector('.error');
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
      lat = position.coords.latitude;
      lon = position.coords.longitude

      if (username && password) {
        const response = await fetch("/api/users/login", {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
            lon,
            lat
          }),
          headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
          document.location.replace("/");
        } else {
          response.json().then(text => {
            console.log(text)
            errorP.append(text.message)
          })
        }
      }
    });
  } else {
    console.log('Nop')
  }



}

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);
