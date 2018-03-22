const pgp = require("pg-promise")({});
const connectionString = "postgres://localhost/tutelage";
const db = pgp(connectionString);

const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");


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
};

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

const fetchNewThread = (req, res, next) => {
    let query =
        "INSERT INTO threads (user_1, user_2) VALUES (${username1}, ${username2}) RETURNING ID";
    db
        .any(query, {
            username1: req.body.username1,
            username2: req.body.username2
        })
        .then(function(data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: "data is the thread ID."
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error getting thread.");
        });
};

const getAllMessages = (req, res, next) => {
    let query = "SELECT * FROM messages WHERE (sender=${sender} AND receiver=${receiver}) OR (sender=${receiver} AND receiver=${sender})"
    db.any(query, {
            sender: req.body.sender,
            receiver: req.body.receiver
        })
        .then(function(data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: "Got all the messages."
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error getting messages.");
        });
}
const submitMessage = (req, res, next) => {
    let query =
        "INSERT INTO messages (thread_id, sender, receiver, body) VALUES (${threadID}, ${sender}, ${receiver}, ${body})";
    db
        .any(query, {
            threadID: req.body.threadID,
            sender: req.body.sender,
            receiver: req.body.receiver,
            body: req.body.body
        })
        .then(() => {
            res.send(
                "Successfully Submitted Message."
            )
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("error sending message");
        });
};
// const fetchMessages = (req, res, next) => {
//     let query = "INSERT INTO threads JOIN"
// }

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
};

const logoutUser = (req, res, next) => {
    req.logout();
    res.status(200).send("log out success");
};

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
};

function getUserByUsername(req, res, next) {
    db
        .one("SELECT username, firstname, lastname, imgURL, email, ismentor FROM users WHERE LOWER(username) = LOWER(${username})", req.params)
        .then(function(data) {
            res.status(200).json({
                status: "success",
                user: data,
                message: `Retrieved user: ${req.params.username}!`
            });
        })
        .catch(err => {
            if (err.code === 0) {
                res.status(500).send(`${req.params.username} not found.`);
            } else {
                res.status(500).send("Oops, something went wrong.")
            }
        });
}

function getAllUsers(req, res, next) {
    db
        .any("SELECT * FROM users")
        .then(function(data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: "Retrieved all users"
            });
        })
        .catch(err => next(err))
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
        .any(
            "SELECT questions.id, the_question, answer_1, answer_2, answer_3, answer_4 FROM answers JOIN questions ON answers.id = answers.question_id"
        )
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
    getAllSurveyQuestionsAndAnswers: getAllSurveyQuestionsAndAnswers,
    fetchNewThread: fetchNewThread,
    submitMessage: submitMessage,
    getAllMessages: getAllMessages,
    getUserByUsername: getUserByUsername,
};