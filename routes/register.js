const express = require("express");
const jwt = require("jsonwebtoken");
const router = express();

const Register = require("../Models/Register");
const bcrypt = require("bcryptjs");

router.post("/", (req, res, next) => {
  const { username, password } = req.body;
  if (!(password.length <= 15 && password.length >= 3)) {
    res.json({
      error: {
        message: "Password length must be between 3 and 15 character."
      }
    });
  } else if (!(username.length <= 15 && username.length >= 3)) {
    res.json({
      error: {
        message: "Username length must be between 3 and 15 character."
      }
    });
  } else {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        const promise = new Register({
          username,
          password: hash
        }).save();
        promise
          .then(data => {
            jwt.sign(
              { username },
              process.env.API_SECRET_KEY,
              {
                expiresIn: "24h" //12 saat
              },
              (err, token) => {
                if (err) res.json({ error: err });
                else {
                  res.cookie("x-access-token", token, {
                    httpOnly: true,
                    secure: false,
                    maxAge: 24 * 60 * 60 * 1000
                  });
                  res.json(token);
                }
              }
            );
          })
          .catch(err => {
            res.json({ error: err });
          });
      });
    });
  }
});

module.exports = router;
