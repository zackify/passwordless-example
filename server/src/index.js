const express = require("express");
const bodyParser = require("body-parser");
const addCors = require("./addCors");
const session = require("express-session");

const app = express();
app.use(bodyParser.json());
app.use(addCors);
app.use(
  session({
    secret: "test",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.post("/login", (req, res) => {
  if (req.body.user !== "test" || req.body.password !== "test") {
    console.log("bad creds!", req.body);
    return res.send({ success: false, message: "Invalid password!" });
  }

  req.session.loggedIn = true;

  return res.send({ success: true });
});

app.get("/account", (req, res) => {
  if (!req.session.loggedIn) return res.status(401).send({ loggedIn: false });

  return res.send({ loggedIn: true, text: "Some secret data when logged in!" });
});

app.listen(4000, () => console.log("app listening on 4000"));
