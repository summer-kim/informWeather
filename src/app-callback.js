const { error } = require("console");
const request = require("request");

const getGeoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1Ijoic3VtbWVyenphbmciLCJhIjoiY2tmcnZmYWFsMDZmaDMxcXFidXRtY3o0aSJ9.FC3i_sUZ8CyHoihbWgbrvQ&limit=1";

  request({ url, JSON: true }, (error, { body }) => {
    const parsed = JSON.parse(body);
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (parsed.features.length === 0) {
      callback("Unable to find the location", undefined);
    } else {
      callback(undefined, {
        longitude: parsed.features[0].center[0],
        latitude: parsed.features[0].center[1],
        location: parsed.features[0].place_name,
      });
    }
  });
};

const getWeather = (longi, lati, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=bd459e9c00f721c07d47a7debfbbe4ff&query=" +
    lati +
    "," +
    longi +
    "&unit=f";
  request({ url, JSON: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find the weather. Try again", undefined);
    } else {
      const parsed = JSON.parse(body);
      callback(undefined, parsed.current.weather_descriptions[0], parsed.location.localtime,parsed.current.temperature,parsed.current.precip, parsed.current.humidity);
    }
  });
};

module.exports = { getGeoCode, getWeather };
