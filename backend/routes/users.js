let db = require("../db/queries");
var express = require("express");
var router = express.Router();
const { loginRequired } = require("../auth/helpers");
const passport = require("../auth/local");

/******************POST ROUTES********************* */
// router.post("/login", passport.authenticate("local"), (req, res) => {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user;
//     res.send(`${req.user.username} is logged in`);
// }); //** Greg */
router.post("/login", db.loginUser) //** Gerson - I commented out the other '/login' route */
router.post("/create", db.registerUser); //** Greg */
router.post("/survey", db.getAnswersFromUsers); //** Greg */
router.post("/message", loginRequired, db.fetchNewThread); //** Greg */
router.post("/send_message", db.submitMessage); //** Greg */
router.post("/get_messages", db.getAllMessages); //** Greg */
router.post("/threadmessages", loginRequired, db.getThreadMessages); /** Gerson */


/******************PATCH ROUTES********************* */
router.patch("/edit", loginRequired, db.updateSingleUser); //** Greg */

/******************GET ROUTES********************* */
// router.get("/survey", db.getAllSurveyQuestions);
router.get("/logout", loginRequired, db.logoutuser); //** Greg */
router.get("/survey", db.getAllSurveyQuestionsAndAnswers); //** Greg */
router.get("/userinfo", loginRequired, db.getSingleUser) //** Gerson */
router.get("/getuser/:username", db.getUserByUsername); //** Gerson */
router.get("/search", db.getAllUsers); //** Carolina */
router.get("/all_zipcodes", db.getAllLocations); //** Greg */
router.get("/userthreads", loginRequired, db.getUserThreads); //** Gerson */
router.get("/interests", loginRequired, db.getUserInterests); //** nick */



module.exports = router;