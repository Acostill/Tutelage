let db = require("../db/queries");
var express = require("express");
var router = express.Router();
const { loginRequired } = require("../auth/helpers");
const passport = require("../auth/local");

/******************POST ROUTES********************* */
router.post("/login", passport.authenticate("local"), (req, res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user;
  res.send(`${req.user.username} is logged in`);
});
router.post("/create", db.createUser);

/******************PATCH ROUTES********************* */
router.put("/edit", loginRequired, db.updateSingleUser);

/******************GET ROUTES********************* */
router.get("/logout", loginRequired, db.logoutuser);

module.exports = router;
