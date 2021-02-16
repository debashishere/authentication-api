const router = require('express').Router();
const passport = require('passport');

router.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
    const user = req.user;
    res.status(200).send({
        message: "You are now authenticated",
        user: user,
    })
})


module.exports = router;