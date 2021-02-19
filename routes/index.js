const router = require('express').Router();
const passport = require('passport');

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    let user = {
        userName: req.user.userName,
        email: req.user.email,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt
    }
    res.status(200).send({
        message: "You are now authenticated",
        user: user,
    })
})


module.exports = router;