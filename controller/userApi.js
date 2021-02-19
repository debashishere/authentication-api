const bcrypt = require('bcrypt');
const USER = require('../models/userSchema')
const jwt = require('jsonwebtoken');
const fs = require('fs');




//***********************************EXPORTS******************** */

module.exports = {
    createUser: async (newUser) => {

        try {
            let existingUser = await USER.findOne({ email: newUser.email });
            if (!existingUser) {
                const hashedPassword = await bcrypt.hash(newUser.password, 10);
                const inserData = {
                    userName: newUser.userName,
                    email: newUser.email,
                    password: hashedPassword
                }
                let createdUser = await USER.create(inserData);
                const accessToken = generateToken(createdUser);
                const resData = prepareResponse(200, 'User Registered Successfully!', createdUser, accessToken);
                return resData;

            } else {

                const resData = prepareResponse(409, 'User already exists!', existingUser);
                return resData;
            }
        }

        catch (err) {
            const resData = prepareResponse(500, 'Internal Server Error');
            console.log("err", err)
            return resData;
        }

    },

    logUserIn: async (user) => {

        try {
            const accessToken = generateToken(user);
            return accessToken;
        }

        catch (err) {
            console.log("err", err)
            return false;
        }
    }
}



//************************FUNCTIONS********************** */

const getPrivateKey = () => {

    const privateKey = fs.readFileSync('./keys/private.key', 'utf8');
    return privateKey;

}


const getPayload = (user) => {

    const payload = {
        _id: user._id,
        userName: user.userName,
        email: user.email,
    }
    return payload;

}


const getSignOptions = () => {

    const iss = "MyApp";
    const sub = "authenticationWithjwt";
    const aud = "thirdpartry";
    const exp = "24h";
    const signOptions = {
        issuer: iss,
        subject: sub,
        audience: aud,
        expiresIn: exp,
        algorithm: "RS256"
    }
    return signOptions;

}

//generate jwt
const generateToken = (user) => {

    const payload = getPayload(user);
    const signOptions = getSignOptions();
    const privateKey = getPrivateKey();
    const token = jwt.sign(payload, privateKey, signOptions);
    return token;

}


// prepare response data
const prepareResponse = (status, message, returnUser = {}, accessToken = '') => {

    let resData = {}
    resData.status = status;
    resData.message = message;
    if (returnUser) {
        resData.data = {
            user: {
                userName: returnUser.userName,
                email: returnUser.email,
            },
        }
        if (accessToken != '') {
            resData.data.token = accessToken;
        }
    }
    return resData;

}

