const env = process.env.NODE_ENV || 'development';
if (env == 'development') {
    const dotenv = require('dotenv')
    //Load Configuration
    dotenv.config({ path: './config/config.env' });
}

const express = require("express");
const passport = require("passport");
const connectDB = require('./config/database-config');
const apiRoute = require('./routes/api');
const indexRoute = require('./routes/index')

const { initializePassport } = require('./config/passportConfig');
const { initializeJwt } = require('./config/passportJwtConfig');
const app = express()

//connect db
connectDB();
//initialize passport
initializePassport(passport);
initializeJwt(passport);

//receive json as a request body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize());

//routes
app.use('/', indexRoute)
app.use('/api', apiRoute)

const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Server at ${port}`) })