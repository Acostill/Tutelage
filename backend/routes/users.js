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
router.post("/login", db.loginUser) /** Gerson - I commented out the other '/login' route */
router.post("/create", db.registerUser); /** Greg */
router.post("/survey", db.getAnswersFromUsers); /** Greg */
router.post("/fetch_new_thread", loginRequired, db.fetchNewThread); /** Greg */
router.post("/send_message", loginRequired, db.submitMessage); //** Greg */
router.post("/get_messages", db.getAllMessages); /** Greg */
router.post("/threadmessages", loginRequired, db.getThreadMessages); /** Gerson */
router.post("/getUserById", loginRequired, db.getSingleUserById); /**Greg */
router.post("/interests", loginRequired, db.getUserInterests); /** nick */


/******************PATCH ROUTES********************* */
router.patch("/edit", loginRequired, db.updateSingleUser); /** Greg */
router.patch("/confirm_read", loginRequired, db.confirmRead) /** Gerson */

/******************GET ROUTES********************* */
// router.get("/survey", db.getAllSurveyQuestions);
router.get("/getSingleUser", loginRequired, db.getSingleUser); /** Greg */
router.get("/logout", loginRequired, db.logoutuser); /** Greg */
router.get("/survey", db.getAllSurveyQuestionsAndAnswers); /** Greg */
router.get("/userinfo", loginRequired, db.getSingleUser) /** Gerson */
router.get("/getuser/:username", db.getUserByUsername); /** Gerson */
router.get("/unread_messages", loginRequired, db.getUnreadMessages) //** Gerson */
router.get("/search", db.getAllUsers); /** Carolina */
router.get("/all_zipcodes", db.getAllLocations); /** Greg */
router.get("/userthreads", loginRequired, db.getUserThreads); /** Gerson */
router.get("/magic", loginRequired, db.getSameAnswers) /**Greg */




module.exports = router;