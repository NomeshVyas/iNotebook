const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectToMongo = () => {
    mongoose.connect(process.env.REACT_APP_MONGOURI).then(
        () => { console.log("connected to mongo successfully") }
    ).catch(
        ()=>{ console.log("connection error") }
    )
}

module.exports = connectToMongo