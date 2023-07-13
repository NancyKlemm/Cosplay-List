const mongoose = require("mongoose")
const { userSchema } = require("./user.schema")

const User = mongoose.model("User", userSchema)

const cosplaySchema = new mongoose.Schema({
    character: {
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
   

})

module.exports = { cosplaySchema }