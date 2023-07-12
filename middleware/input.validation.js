const { validationResult } = require("express-validator")
const createError = require("http-errors")

// Bei Validationsproblemen werden Fehler geworfen
function validationInputs(inputs){
    return [
        ...inputs, (req,res,next) => {
            const errors = validationResult(req)

            if(errors.isEmpty()){
                return next()
            }

            const validationErrors = errors.array().map((err) => err.msg)
            const err = createError(422, validationErrors.join(", "))
            return next(err)
        }
    ]
}

module.exports = { validationInputs }