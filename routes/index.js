const router = require('express').Router();
const passport = require('passport');

router.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('user', req.user)
    res.send("you are authenticated now")
})


module.exports = router;