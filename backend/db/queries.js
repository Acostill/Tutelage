const pgp = require("pg-promise")({});
const connectionString = "postgres://localhost/tutelage";
const db = pgp(connectionString);

const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

/**
 * @author Greg
 * @function getSingleUser Grabs a specific user by username.
 * @arg {array of objects}
 */
const getSingleUser = (req, res, next) => {
    db
        .one("SELECT * FROM users WHERE username = ${username}", req.user)
        .then(function(data) {
            res.status(200).json({
                status: "success",
                userInfo: data,
                message: "Fetched one user"
            });
        })
        .catch(function(err) {
            return next(err);
        });
};
const getSingleUserById = (req, res, next) => {
    db
        .one("SELECT * FROM users WHERE ID = ${id}", req.body)
        .then(data => {
            res.status(200).json({
                status: "success",
                userInfo: data,
                message: "Fetched one user by ID"
            });
        })
        .catch(function(err) {
            return next(err);
        });
};

updateSingleUser = (req, res, next) => {
    // const hash = authHelpers.createHash(req.body.password);
    db
        .none(
            "UPDATE users SET username = ${username}, firstname = ${firstname}, lastname = ${lastname}, email = ${email}, ismentor = ${ismentor}, age = ${age}, bio = ${bio}, occupation = ${occupation}, zipcode = ${zipcode}, gender = ${gender}, imgurl = ${imgurl} WHERE id = ${id}", {
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                // password: hash,
                ismentor: req.body.ismentor,
                age: req.body.age,
                bio: req.body.bio,
                occupation: req.body.occupation,
                zipcode: req.body.zipcode,
                gender: req.body.gender,
                imgurl: req.body.imgurl,
                id: req.user.id

            }
        )
        .then((data) => {
            res.status(200).json({
                status: "success",
                message: "Changed one user"
            });
        })
        .catch((err) => {
            console.log("got here bro")
            return next(err);
        });
}


/**
 * @author Greg
 * @function fetchNewThread Initiates a new thread between two users and returns their ID.
 * @arg {array of objects}
 */

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

/**
 * @author Greg
 * @function getAllMessages Grabs all the messages between two users from the db.
 * @arg {array of objects}
 */
const getAllMessages = (req, res, next) => {
    let query =
        "SELECT * FROM messages WHERE (sender=${sender} AND receiver=${receiver}) OR (sender=${receiver} AND receiver=${sender})";
    db
        .any(query, {
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
};

/**
 * @author Greg
 * @function submitMessage Submits messages between two users into the db .
 * @arg {array of objects}
 */
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
            res.send("Successfully Submitted Message.");
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("error sending message");
        });
};
// const fetchMessages = (req, res, next) => {
//     let query = "INSERT INTO threads JOIN"
// }

/**
 * @author Greg
 * @function loginUser Logs in a user.
 * @arg {array of objects}
 */

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
                    res.status(200).send({...req.user, password_digest: null });
                }
            });
        }
    });
    return authenticate(req, res, next);
};

//WRONG BELOW:
// const loginUser = (req, res, next) => {
//     passport.authenticate("local", {});
//     const authenticate = passport.authenticate("local", (err, user, info) => {
//         if (err) {
//             res.status(500).send("error");
//         } else {
//             console.log("REQQQ", req.body)
//             res.status(200).send({...req.body, password_digest: null });
//         }
//     });
//     return authenticate(req, res, next);
// };

/**
 * @author Greg
 * @function logoutUser Logs out a user.
 * @arg {object}
 */
const logoutUser = (req, res, next) => {
    req.logout();
    res.status(200).send("log out success");
};

/**
 * @author Greg
 * @function createUser Creates a new user.
 * @arg {array of objects}
 */
const createUser = (req, res, next) => {
    const hash = authHelpers.createHash(req.body.password);
    console.log("createuser hash: ", hash);
    db
        .none(
            "INSERT INTO users (username, firstname, lastname, zipcode, imgurl, email, age, password_digest, ismentor) VALUES (${username}, ${firstname}, ${lastname}, ${zipcode}, ${imgURL}, ${email}, ${age}, ${bio}, ${occupation}, ${password}, ${gender}, ${ismentor})", {
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
                ismentor: req.body.ismentor,
                age: req.body.age,
                bio: req.body.bio,
                occupation: req.body.occupation,
                zipcode: req.body.zipcode,
                gender: req.body.gender,
                imgurl: req.body.imgurl,
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

function registerUser(req, res, next) {
    return authHelpers
        .createUser(req)
        .then(response => {
            passport.authenticate("local", (err, user, info) => {
                if (user) {
                    res.status(200).json({
                        status: "success",
                        data: user,
                        message: "Registered one user"
                    });
                }
            })(req, res, next);
        })
        .catch(err => {
            console.log(error);
            res.status(500).json({
                status: "error",
                error: err
            });
        });
}

/**
 * @author Gerson
 * @function getUserByUsername Grabs a user according to their username.
 * @returns {user object}
 */
function getUserByUsername(req, res, next) {
    db
        .one(
            "SELECT * FROM users WHERE LOWER(username) = LOWER(${username})",
            req.params
        )
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
                res.status(500).send("Oops, something went wrong.");
            }
        });
}

/**
 * @author Greg
 * @function getAllUsers Grabs the following from the db:
 * ID,
 * username ,
 * firstname ,
 * lastname ,
 * zipcode ,
 * imgURL ,
 * email ,
 * password_digest ,
 * ismentor
 * @arg {array of objects}
 */

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
        .catch(err => next(err));
}

/**
 * @author Greg
 * @function getAllSurveyQuestionsAndAnswers Grabs all the questions and answer options from the db.
 * @arg {array of objects}
 */
const getAllSurveyQuestionsAndAnswers = (req, res, next) => {
    db
        .any(
            "SELECT questions.id, the_question, answer_1, answer_2, answer_3, answer_4 FROM questions"
        )
        .then(data => {
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

/**
 * @author Greg
 * @function getAnswersFromUsers Submits all survey answers, their corresponding questions and the user id into the db.
 * @arg {array of objects} answers:[{answerBody, questionID, userID}]
 */
const getAnswersFromUsers = (req, res, next) => {
    req.body.answers.forEach(answer => {
        db
            .none(
                "INSERT INTO answers (answer_selection, question_id, username, user_id) VALUES (${answer_selection}, ${question_id}, ${username}, ${user_id})", {
                    answer_selection: answer.answer_selection,
                    question_id: answer.question_id,
                    username: answer.username,
                    user_id: answer.user_id
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
    });
};
/**
 * @author Greg
 * @function getAllLocations Gets all usernames and their zipcodes from user
 * @arg {array of objects}
 */
const getAllLocations = (req, res, next) => {
    let query = "SELECT username, zipcode FROM users";
    db
        .any(query)
        .then(function(data) {
            res.status(200).json({
                status: "success",
                data: data,
                message: `Retrieved all ${data.length} usernames and zipcodes!`
            });
        })
        .catch(err => {
            if (err.code === 0) {
                res.status(500).send(`Information not found.`);
            } else {
                res.status(500).send("Oops, something went wrong.");
            }
        });
};

/**
 * @author Gerson
 * @func getUserThreads Gets all threads from the logged in user.
 * @return {array}
 */
const getUserThreads = (req, res, next) => {
    db
        .any(
            "SELECT * FROM threads WHERE user_1=${username} OR user_2 =${username}",
            req.user
        )
        .then(data => {
            res.status(200).json({
                status: "success",
                threads: data,
                message: `Retrieved all threads involving ${req.user.username}`
            });
        })
        .catch(err => {
            res.status(500).send("error retrieving threads");
        });
};

/**
 * @author Gerson
 * @func getThreadMessages Gets all messages associated with the given thread id
 */
const getThreadMessages = (req, res, next) => {
    db
        .any(
            "SELECT messages.id, sender, body, date_sent, isread FROM messages JOIN threads ON thread_id = threads.id WHERE thread_id = ${thread_id} AND (user_1 = ${username} OR user_2 = ${username}) ORDER BY date_sent", { username: req.user.username, thread_id: req.body.thread_id }
        )
        .then(data => {
            res.status(200).json({
                status: "success",
                threadMessages: data,
                message: `Retrieved all messages within thread`
            });
        })
        .catch(err => {
            res.status(500).send("error retrieving threads");
        });
}

const updateMessageRead = (req, res, next) => {
    db
        .none("UPDATE messages SET isread = TRUE WHERE id = ${id}", { id: req.body.messageId })
        .then(() => {
            res.send("Message marked as read")
        })
}

const getUnreadMessages = (req, res, next) => {
    let query = "SELECT * FROM messages JOIN threads on thread_id = threads.id WHERE (threads.user_1 = ${username} OR threads.user_2 = ${username}) AND sender != ${username} AND isread = FALSE ORDER BY date_sent";
    db
        .any(query, req.user)
        .then(data => {
            res.status(200).json({
                status: "Success",
                unreadMessages: data,
                message: "Retrieved unread messages"
            })
        })
}

/**
 * @author nick
 */
const getUserInterests = (req, res, next) => {
    db
        .any(
            "SELECT interest FROM interests WHERE username = ${username}",
            req.user
        )
        .then(data => {
            res
                .status(200)
                .json({
                    status: "success",
                    interests: data,
                    message: `Retrieved all user interests`
                })
                .catch(err => {
                    res.status(500).send("error retrieving interests");
                });
        });
};
/**
 * @author Greg
 * @func getSameAnswers Gets all the users with the same answers to questions!
 * @return {array of objects}
 */

const getSameAnswers = (req, res, next) => {
    db
        .any(
            "SELECT DISTINCT b.user_id AS matches FROM answers a INNER JOIN answers b ON a.question_id = b.question_id AND a.user_id != b.user_id AND a.user_id = ${id} AND a.answer_selection = b.answer_selection INNER JOIN questions ON a.question_id = questions.id",
            req.user
        ) /**b.user_id AS answer  */
        .then(data => {
            res
                .status(200)
                .json({
                    status: "success",
                    data: data,
                    message: `Retrieved all user with same answers to questions`
                })
                .catch(err => {
                    res.status(500).send("Error retrieving users");
                });
        });
}

module.exports = {
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    createUser: createUser,
    updateSingleUser: updateSingleUser,
    loginUser: loginUser,
    logoutuser: logoutUser,
    getAnswersFromUsers: getAnswersFromUsers,
    getAllSurveyQuestionsAndAnswers: getAllSurveyQuestionsAndAnswers,
    fetchNewThread: fetchNewThread,
    submitMessage: submitMessage,
    getAllMessages: getAllMessages,
    getUserByUsername: getUserByUsername,
    getAllLocations: getAllLocations,
    getUserThreads: getUserThreads,
    getThreadMessages: getThreadMessages,
    updateMessageRead: updateMessageRead,
    getUnreadMessages: getUnreadMessages,
    registerUser: registerUser,
    getUserInterests: getUserInterests,
    getSameAnswers: getSameAnswers,
    getSingleUserById: getSingleUserById
};