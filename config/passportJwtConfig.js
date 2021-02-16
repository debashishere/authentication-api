//**************CLIENT WILL IMPLEMENT THIS TO VERIFY JWT****************** */

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
var Mongoose = require('mongoose');
const fs = require('fs');
const USER = require('../models/userSchema');


// helper FUNCTIONS
const getPublicKey = () => {

    const publicKey = fs.readFileSync('./keys/public.key', 'utf8');
    return publicKey;

}

const getJwt = () => {

    const jwt = ExtractJWT.fromAuthHeaderAsBearerToken();
    return jwt;

}

const getVarifyOptions = (jwt, publicKey) => {

    //SAME AS SIGN OPTINS
    const iss = "MyApp";
    const sub = "authenticationWithjwt";
    const aud = "thirdpartry";
    const exp = "24h";
    let verifyOptions = {
        jwtFromRequest: jwt,
        secretOrKey: publicKey,
        issuer: iss,
        subject: sub,
        audience: aud,
        expiresIn: exp,
        algorithm: "RS256",
    }
    return verifyOptions;

}

//***************************************EXPORTS******************************* */

module.exports = {

    initializeJwt: async (passport) => {

        try {
            const publicKey = getPublicKey();
            const jwt = getJwt();
            const verifyOptions = getVarifyOptions(jwt, publicKey);

            passport.use(new JWTStrategy(verifyOptions, async function (jwtPayLoad, done) {
                const UserId = Mongoose.Types.ObjectId(jwtPayLoad._id)
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
