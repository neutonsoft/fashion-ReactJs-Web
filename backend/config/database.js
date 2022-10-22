const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URL;
console.log("MONGO_URI==",MONGO_URI)
const connectDatabase = () => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        });
}

module.exports = connectDatabase;