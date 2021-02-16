const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
var Mongoose = require('mongoose');



const USER = require('../models/userSchema');
const tokenSecret = process.env.TOKEN_SECRET


module.exports = {
    initializeJwt: async (passport) => {

        try {
            let opts = {
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                secretOrKey: tokenSecret,
            }
            console.log("here")
            // authenticate using passport-jwt
            passport.use(new JWTStrategy(opts, async function (jwtPayLoad, done) {
                const UserId = Mongoose.Types.ObjectId(jwtPayLoad.data._id)
                await USER.findById(UserId, function (err, user) {
                    if (err) {
                        return done(err, false);
                    }

                    if (user) {
                        return done(null, user);

                    } else {
                        return done(null, false);
                    }
                })

            }));

        }

        catch (err) {
            console.log(err);
            return done(null, false);
        }
    }
}
