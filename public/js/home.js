const form = document.querySelector("form");
const locationInput = document.querySelector("input");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!locationInput.value) {
    message1.textContent = "Please type the location!";
    message2.textContent = "";
  } else {
    message1.textContent = "Loading...";
    message2.textContent = "";
    fetch("http://localhost:3000/weather?address=" + locationInput.value).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            message1.textContent = data.error;
          } else {
            message1.textContent = data.forcast;
            message2.textContent = data.location;
          }
        });
      }
    );
  }
});
