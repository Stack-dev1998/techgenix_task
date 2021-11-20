const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const  User  = require("../models/user.model");

//login route
router.post("/login", function (req, res) {
  console.log(req.body)
  const email = req.body.email.toLowerCase();
  User.findOne({ email }, function (err, result) {
    if (err) return res.status(500).json({ msg: err.message });
    if (!result) {
      return res.status(401).json({
        msg: "User not Found",
      });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      result.password
    );
    if (!passwordIsValid)
      return res.status(401).json({
        msg: "Enter valid Password",
      });

    var token = jwt.sign(
      {
        _id: result._id,
        email: result.email,
        username: result.username,
        role: result.role,
      },
      process.env.JWTSECRET,
      {
        expiresIn: 86400, // expires in 24 hours
      }
    );

    res.status(200).json({
      token: token,
      role:result.role,
      msg: "Successfull Login",
    });
  });
});

router.get("/another-route", (req, res) => {
  // router code here
});

module.exports = router;
