const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

const getInform = require("./app-callback");

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Summer",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("Please provide address");
  }
  getInform.getGeoCode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        console.log(error, longitude);
        return res.send(error);
      }
      getInform.getWeather(longitude, latitude, (error, description, time, temp, precip, humidity) => {
        if (error) {
          return res.send(error);
        }
        res.send({
          location,
          description, time, temp, precip, humidity
        });
      });
    }
  );
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Summer",
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    name: "Summer",
    errorMessage: "Help article not found",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Summer",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    name: "Summer",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on " + port);
});
