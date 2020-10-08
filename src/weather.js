const { error } = require("console");
const request = require("request");
const getInform = require("./app-callback");

const address = process.argv[2];
if (!address) {
  console.log("please provide address!");
} else {
  getInform.getGeoCode(address, (error, { longitude, latitude, location }) => {
    if (error) {
      return console.log(error);
    }
    getInform.getWeather(longitude, latitude, (error, weatherData) => {
      if (error) {
        return console.log(error);
      }
      console.log(location);
      console.log(weatherData);
    });
  });
}
