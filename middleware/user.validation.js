const { validateToken } = require("../lib/security/token")
const { userRoles } = require("../lib/security/roles")
require("dotenv").config()

const secret = process.env.SECRET

// Token Authentifizieren => sonst Error
async function authenticateToken(req,res,next){
    const token = req.headers.authorization
    if(!token){
        const error = new Error("Invalid token")
        error.statusCode = 401
        res.json(error)
    }
    try {
        const decoded = await validateToken(token, secret)
        req.user = decoded
        next()
    } catch (error) {
        error.statusCode = 403
        return next(error)
    }
}

// Nur der Admin darf die Route passieren
function protectRoute(req,res,next){
    const user = req.user
    if(user.role === userRoles.ADMIN){
        next()
    } else {
const error = new Error("You have to be admin to enter this route!")
        error.statusCode = 403
        return next(error)
    }
}

module.exports = { authenticateToken, protectRoute }