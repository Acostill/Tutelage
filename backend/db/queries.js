const pgp = require("pg-promise")({});
const connectionString = "postgres://localhost/tutelage";
const db = pgp(connectionString);

const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

const getAllUsers = (req, res, next) => {
    db
        .any("select * from users")
        .then(function(data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: "Retrieved ALL users"
            });
        })
        .catch(function(err) {
            return next(err);
        });
}

const getSingleUser = (req, res, next) => {
    db
        .any("select * from users where username = ${username}", req.user)
        .then(function(data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: "Fetched one user"
            });
        })
        .catch(function(err) {
            return next(err);
        });
}

// function updateSingleUser(req, res, next) {
//   const hash = authHelpers.createHash(req.body.password);
//   db
//     .none(
//       "UPDATE users SET username = ${newName}, firstname = ${newFirstName}, lastname = ${newLastName}, email = ${newEmail}, password_digest = ${ hash }, ismentor = ${newIsMentor} where id = ${id}",
//       req.body
//     )
//     .then(function(data) {
//       res.status(200).json({
//         status: "success",
//         message: "Changed one user"
//       });
//     })
//     .catch(function(err) {
//       return next(err);
//     });
// }

const updateSingleUser = (req, res, next) => {
    console.log("Req is:", req, "is there a req.user?:", req.user);
    const hash = authHelpers.createHash(req.body.password);
    console.log("updated password hash: ", hash);

    let { username, firstname, lastname, password_digest, ismentor } = req.body;

    let query =
        "UPDATE users SET username = ${username}, firstname = ${firstname}, lastname = ${lastname}, imgURL = ${imgURL}, email = ${email}, password_digest = ${password}, ismentor = ${ismentor} WHERE id = ${id}";
    db
        .none(query, {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            imgURL: req.body.imgURL,
            email: req.body.email,
            password: hash,
            ismentor: req.body.ismentor,
            id: req.user.id
        })
        .then(() => {
            res.send(
                `updated the user: ${req.body.username} Is this person now a mentor?: ${
          req.body.ismentor
        }`
            );
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("error editing user");
        });
};

const loginUser = (req, res, next) => {
    passport.authenticate("local", {});
    const authenticate = passport.authenticate("local", (err, user, info) => {
        if (err) {
            res.status(500).send("error while trying to log in");
        } else if (!user) {
            res.status(401).send("invalid username/password");
        } else if (user) {
            req.logIn(user, function(err) {
                if (err) {
                    res.status(500).send("error");
                } else {
                    res.status(200).send(req.user);
                }
            });
        }
    });
    return authenticate(req, res, next);
}

const logoutUser = (req, res, next) => {
    req.logout();
    res.status(200).send("log out success");
}

const createUser = (req, res, next) => {
    const hash = authHelpers.createHash(req.body.password);
    console.log("createuser hash: ", hash);
    db
        .none(
            "INSERT INTO users (username, firstname, lastname, imgURL, email, password_digest, ismentor) VALUES (${username}, ${firstname}, ${lastname}, ${imgURL}, ${email}, ${password}, ${ismentor})", {
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                imgURL: req.body.imgURL,
                email: req.body.email,
                password: hash,
                ismentor: req.body.ismentor
            }
        )
        .then(() => {
            res.send(
                `created user: ${req.body.username} Is this person a mentor?: ${
          req.body.ismentor
        }`
            );
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("error creating user");
        });
}

// const getAllSurveyQuestions = (req, res, next) => {
//     db
//         .any("SELECT the_question FROM questions")
//         .then(function(data) {
//             res.status(200).json({
//                 status: "success",
//                 data: data,
//                 message: "Retrieved ALL survey questions."
//             });
//         })
//         .catch(function(err) {
//             return next(err);
//         });
// };

const getAllSurveyQuestionsAndAnswers = (req, res, next) => {
    db
        .any("SELECT questions.id, the_question, answer_1, answer_2, answer_3, answer_4 FROM answers JOIN questions ON answers.id = answers.question_id")
        .then(function(data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: "Retrieved ALL survey questions and answers."
            });
        })
        .catch(function(err) {
            return next(err);
        });
};

const getAnswersFromUsers = (req, res, next) => {
    db
        .none(
            "INSERT INTO answers (answer_selection, question_id, user_id) VALUES (${answerNum}, ${questionID},${userID})", {
                answerNum: req.body.answerNum,
                questionID: req.body.questionID,
                userID: req.body.userID
            }
        )
        .then(function(data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: "Retrieved ALL answers from the user."
            });
        })
        .catch(function(err) {
            return next(err);
        });
};


module.exports = {
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    createUser: createUser,
    updateSingleUser: updateSingleUser,
    loginUser: loginUser,
    logoutuser: logoutUser,
    // getAllSurveyQuestions: getAllSurveyQuestions,
    getAnswersFromUsers: getAnswersFromUsers,
    getAllSurveyQuestionsAndAnswers: getAllSurveyQuestionsAndAnswers
};