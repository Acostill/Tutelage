const passport = require("passport");
const db = require("../db/index");

module.exports = () => {
  // store the user id on the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // get user info from session
  passport.deserializeUser((user, done) => {
    console.log("desirealize");
    db
      .one("SELECT * FROM users WHERE id=$1", [user.id])
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err, null);
      });
  });
};
