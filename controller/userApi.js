const bcrypt = require('bcrypt');
const USER = require('../models/userSchema')
const jwt = require('jsonwebtoken');
const tokenSecret = process.env.TOKEN_SECRET


// prepare response data
const prepareResponse = (status, message, returnUser = {}) => {

    let resData = {
        status: status,
        message: message,
        data: {
            user: {
                _id: returnUser._id,
                userName: returnUser.userName,
                email: returnUser.email
            }
        }
    }
    return resData;

}

//generate jwt
const generateToken = (user) => {
    return jwt.sign({ data: user }, tokenSecret, { expiresIn: '24h' })
}

module.exports = {
    createUser: async (newUser) => {

        try {
            let existingUser = await USER.findOne({ userName: newUser.userName });
            if (!existingUser) {
                const hashedPassword = await bcrypt.hash(newUser.password, 10);
                const inserData = {
                    userName: newUser.userName,
                    email: newUser.email,
                    password: hashedPassword
                }
                let createdUser = await USER.create(inserData);
                const resData = prepareResponse(200, 'User Registered Successfully!', createdUser);
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
            const token = generateToken(user);
            return token;
        }

        catch (err) {
            console.log("err", err)
            return false;
        }
    }
}