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
router.post("/survey", db.getAnswersFromUsers);

/******************PATCH ROUTES********************* */
router.put("/edit", loginRequired, db.updateSingleUser);

/******************GET ROUTES********************* */
// router.get("/survey", db.getAllSurveyQuestions);
router.get("/logout", loginRequired, db.logoutuser);
router.get("/survey", db.getAllSurveyQuestionsAndAnswers);
router.get("/search", db.getAllUsers);

module.exports = router;
