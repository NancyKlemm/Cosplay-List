const { promisify } = require("util")
const jwt = require("jsonwebtoken")

// Funktion wird in ein Promise umgewandelt
const sign = promisify(jwt.sign)

// Token wird erstellt
const createToken = async (payload, secret) => {
    const token = await sign(payload, secret)
    return token
}

// Funktion wird in ein promise umgewandelt
const verify = promisify(jwt.verify)

const validateToken = async (token, secret) => {
    try {
        const decoded = await verify(token, secret)
        return decoded
    } catch (error) {
        throw new Error("Invalid token")
    }
}

module.exports = { createToken, validateToken }