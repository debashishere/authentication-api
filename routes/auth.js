const router = require('express').Router();
const passport = require("passport");
const validateNewUser = require('../middlewares/joi.js');
const { validatePassword } = require('../middlewares/password');
const schemas = require('../models/joiSchemas')
const { createUser, logUserIn } = require('../controller/userApi');




//signup a user
//@desc route POST /api/auth/signup
router.post('/signup', validateNewUser(schemas.USER), validatePassword, async (req, res) => {

    try {
        const newUser = req.body;
        const { status, message, data = {} } = await createUser(newUser);
        const resData = {
            message: message,
            data: data,
        }
        res.status(`${status}`).send(resData);
    }

    catch (err) {
        res.status(500).send("Server Error");
    }

});

//signup a user
//@desc route POST /api/auth/signup
router.post('/login', passport.authenticate('local', { session: false }), async (req, res) => {

    try {
        const user = req.user;
        const jwt = await logUserIn(user);
        const resData = {
            message: "save the token for future request",
            token: jwt,
        }
        res.status(200).send(resData);
    }

    catch (err) {
        res.status(500).send('Error While generating the Token');
    }
})

module.exports = router