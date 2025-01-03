const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log("process.env.MONGO_URI, process.env.MONGO_URI")
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log(`MongoDb connected ${conn.connection.host}`)
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB