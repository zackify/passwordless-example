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
const { verify, generateAccountToken } = require("@passwordless/server");

app.post("/validate-login", (req, res) => {
  if (req.body.user !== "test" || req.body.password !== "test") {
    return res.send({ success: false, message: "Invalid password!" });
  }

  return res.send({ success: true });
});

app.post("/login", async (req, res) => {
  if (req.body.user !== "test" || req.body.password !== "test") {
    console.log("bad creds!", req.body);
    return res.send({ success: false, message: "Invalid password!" });
  }

  let response = await verify({
    credential: req.body.credential,
    serverKey: process.env.SERVER_KEY,
    user: req.body.user
  });

  if (response.verified) {
    req.session.loggedIn = true;

    return res.send({ success: true });
  }

  return res.send({ success: false, message: response.message });
});

app.get("/account", async (req, res) => {
  if (!req.session.loggedIn) return res.status(401).send({ loggedIn: false });

  let { token } = await generateAccountToken({
    user: "test",
    serverKey: process.env.SERVER_KEY
  });

  return res.send({
    loggedIn: true,
    text: "Some secret data when logged in!",
    token
  });
});

app.listen(4000, () => console.log("app listening on 4000"));
