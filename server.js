var express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

// MongoDB Connection
const mongoDB = require("./mongoDB");
mongoDB();

// Express Server
const app = express();

// Controllers
const users = require("./controllers/users");

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require("./passport")(passport);

// Routing
app.use("/users", users);
app.get("/", (req, res) => {
  res.send("invaild endpoint");
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start Server
const port = process.env.PORT || 9090;
app.listen(port, () => {
  console.log("Server started on port " + port);
});
