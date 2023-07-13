const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const { userRoles } = require("../lib/security/roles")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: Object.values(userRoles),
        default: userRoles.USER
    }

})

// beim modifizieren des Passwortes wird es gehasht
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

// beim Update des Passworts wird es jedesmal gehasht
userSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate()
    if(update.password) {
        try {
            const hashedPassword = await bcrypt.hash(update.password, 10)
            this.setUpdate({ password: hashedPassword})
        } catch (error) {
            return next(error)
        }
    }

    next()
})

// Vergleich der Passwörter
userSchema.methods.authenticate = async function(password){
    return await bcrypt.compare(password, this.password)
}

// Passwort wird nicht mitgeliefert
userSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = { userSchema }