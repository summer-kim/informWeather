const form = document.querySelector("form");
const locationInput = document.querySelector("input");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");
const message3 = document.querySelector("#message3");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!locationInput.value) {
    message1.textContent = "Please type the location!";

  } else {
    message1.textContent = "Loading...";

    fetch("/weather?address=" + locationInput.value).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          message1.textContent = data.error;
        } else {
          message1.textContent = "<weather in " + data.location+">";
           message2.textContent = data.time
          message3.textContent = "Currently "+data.description+" in "+locationInput.value+" and "+data.temp+ "℃, "+data.humidity+"% of humidity, "+data.precip+"mm of precipitation out there";
        }
      });
    });
  }
});
