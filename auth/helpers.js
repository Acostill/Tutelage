const bcrypt = require("bcryptjs");
const db = require("../db/index");

// Compare userPassword from the request to databasePassword from the database
function comparePass(userPassword, databasePassword) {
    // databasePassword has hash and salt
    return bcrypt.compareSync(userPassword, databasePassword);
}

function createHash(password) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function createUser(req, res) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    return db.none(
        "INSERT INTO users (username, firstname, lastname, zipcode, email, password_digest, ismentor) VALUES (${username}, ${firstname}, ${lastname}, ${zipcode}, ${email}, ${password}, ${ismentor})", {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            zipcode: req.body.zipcode,
            email: req.body.email,
            password: hash,
            ismentor: req.body.ismentor
        }
    )
}

function loginRequired(req, res, next) {
    // if the user is logged in, passport will have attached
    // the user to it
    if (!req.user) {
        return res.status(401).json({ status: "Please log in." });
    }
    return next();
}

module.exports = {
    comparePass,
    createHash,
    loginRequired,
    createUser: createUser
};