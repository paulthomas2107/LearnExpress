const { response } = require("express");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(getWeather);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

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

app.get("/api/animal/:name", (req, res) => {
  if (req.params.name === "meowsalot") {
    res.json({
      name: "Meowsalot",
      species: "cat",
      photo: "https://learnwebcode.github.io/json-example/images/cat-1.jpg",
      bio:
        "This cat is great and very vocal. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis asperiores, sunt consectetur a amet dolorem rem animi tempore molestias nesciunt fuga, sequi alias voluptatum totam reprehenderit assumenda deleniti distinctio? Cumque.",
    });
  } else if (req.params.name === "barksalot") {
    res.json({
      name: "Barksalot",
      species: "dog",
      photo: "https://learnwebcode.github.io/json-example/images/dog-1.jpg",
      bio:
        "This dog is very communicative. Deleniti, tempora quis commodi qui inventore ratione rem porro doloribus et obcaecati cumque quibusdam voluptatibus iure nisi aut minima consequuntur, officiis esse? Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    });
  } else if (req.params.name === "purrsloud") {
    res.json({
      name: "Purrsloud",
      species: "cat",
      photo: "https://learnwebcode.github.io/json-example/images/cat-2.jpg",
      bio:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis asperiores, sunt consectetur a amet dolorem rem animi tempore molestias nesciunt fuga, sequi alias voluptatum totam reprehenderit assumenda deleniti distinctio? Cumque. Lorem ipsum.",
    });
  } else {
    res.json("Animal not found.");
  }
});

app.get("/fake-search", (req, res) => {
  console.log(req.query);
  res.json("Thank you for your request.");
});

app.post("/api/secret", (req, res) => {
  if (req.body.username === "johndoe" && req.body.password === "qwerty") {
    res.json("You have secret access for us to tell you that 2 + 2 is 4.");
  } else {
    res.json("That is incorrect.");
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000);
