const mongoose = require("mongoose")

const cosplaySchema = new mongoose.Schema({
    cosplay: {
        type: String,
        required: true
    },
    fandom: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
   

})

module.exports = { cosplaySchema }