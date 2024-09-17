import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (request, response) => {
  const message = request.query.message;
  console.log("Someone wants the root route!");

  response.render("home", { message }); // Render the 'home.ejs' template and pass the 'message' variable
});
const staff = ["Sally", "Bob", "Mike", "Rachel", "Andy", "Greg"];

app.get("/staff", (req, res) => {
  if (staff.length === 0) {
    res.status(404).json({
      error: "Staff member not found",
    });
  } else {
    res.json({
      people: staff,
    });
  }
});

app.get("/staff/:person", (req, res) => {
  // Get the actual value sent for the parameter from `req.params`
  const name = req.params.person;
  res.json({
    name: name,
    description: `${name} is a valued employee here are our company!`,
  });
});
app.get("/echo/:message", (req, res) => {
  // Get the actual value sent for the parameter from `req.params`
  const message = req.params.message;
  if (message === "secret") {
    res.json({
      message: "the secret is... 42!",
    });
  } else {
    res.json({
      message: message,
    });
  }
});

app.get("/", (request, response) => {
  const message = request.query.message;
  console.log("Someone wants the root route!");
  response.render("home", { message }); // Render the 'home.ejs' template and pass the 'message' variable
});

app.get("/contact", function (req, res) {
  res.render("contact"); // Render the 'contact.ejs' template
});

app.get("/login", function (req, res) {
  res.render("login"); // Assuming you have a 'login.ejs' template
  console.log("serving login.ejs...");
});
app.post("/contact", function (req, res) {
  console.log("We got a message! Somebody wrote:", req.body.message);
  // We don't want to show a specific page here;
  // Instead, let's redirect to the home page.
  res.redirect(`/?message=${req.body.message}`);
});
app.post("/login", function (req, res) {
  const { email, password } = req.body;

  // Validation: Check if email and password are present and not empty
  // if (!email || !password || email.trim() === "" || password.trim() === "") {
  //   return res.json({ success: false });
  // }

  // Check if email and password match the expected credentials
  if (email === "user@email.com" && password === "very-secret") {
    return res.render(`myAccount`);
  } else {
    return res.render(`error404`);
  }
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
