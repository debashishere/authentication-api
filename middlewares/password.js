

module.exports = {

    validatePassword: (req, res, next) => {

        if (req.body.password.length < 6) {
            return res.status(422).send("Passwords length must be greater then 6 character");
        }
        if (req.body.password != req.body.confromPassword) {
            return res.status(422).send("Passwords did not matched");
        }
        else {
            next();
        }

    },

}