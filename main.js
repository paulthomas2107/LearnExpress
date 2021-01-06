const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: false }));
app.use(getWeather);
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

function getWeather(req, res, next) {
  req.visitorWeather = false;
  if (req.visitorWeather) {
    res.send("Please come back when its not raining");
  } else {
    next();
  }
}

app.get("/", (req, res) => {
  res.render("home", {
    isRaining: req.visitorWeather,
    pets: [
      { name: "Catty", species: "Cat" },
      { name: "Doggy", species: "Dog" },
    ],
  });
});

app.get("/about", (req, res) => {
  res.send("Thanks for looking !");
});

app.post("/result", (req, res) => {
  if (req.body.color.trim().toUpperCase() === "BLUE") {
    res.send("Correct !");
  } else {
    res.send("Wrong !");
  }
});

app.get("/result", (req, res) => {
  res.send("Why are you here ?");
});

app.get("/api/pets", (req, res) => {
  res.json([
    { name: "Catty", species: "Cat" },
    { name: "Doggy", species: "Dog" },
  ]);
});

app.listen(3000);
