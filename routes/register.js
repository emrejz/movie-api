const express = require("express");
const jwt = require("jsonwebtoken");
const router = express();

const Register = require("../Models/Register");
const bcrypt = require("bcryptjs");

router.post("/", (req, res, next) => {
  const { username, password } = req.body;
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
              if (err) res.json(err);
              else {
                res.cookie("x-access-token", token, {
                  httpOnly: true,
                  secure: false,
                  maxAge: 24 * 60 * 60 * 1000
                });
                res.json(username);
              }
            }
          );
        })
        .catch(err => {
          res.json(err);
        });
    });
  });
});

module.exports = router;
