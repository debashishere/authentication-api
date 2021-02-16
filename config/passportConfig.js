const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const USER = require('../models/userSchema');


module.exports = {
    initializePassport: async (passport) => {

        try {

            async function authenticateUser(email, password, done) {
                try {

                    const user = await USER.findOne({ email: email });
                    if (!user) {
                        return done(null, false, { message: 'No user with that email' })
                    }
                    if (await bcrypt.compare(password, user.password)) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message: "Password incorrect" })
                    }

                }

                catch (err) {
                    console.log(err);
                    return done(null, false, { message: "Error finding user" })
                }

            }

            passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

        }

        catch (err) {
            console.log(err);
            return null;
        }
    }
}