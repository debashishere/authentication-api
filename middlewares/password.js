module.exports = {

    validatePassword: (req, res, next) => {

        if (req.body.password != req.body.confromPassword) {
            return res.json(422, {
                status: 422,
                message: 'Passwords did not matched'
            });
        } else {
            next();
        }

    },

}