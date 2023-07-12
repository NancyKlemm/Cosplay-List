const {
    createCosplay,
    getAllCosplays,
    getSingleCosplay,
    updateCosplay,
    deleteCosplay,
} = require("../model/cosplay.model");

// Cosplay erstellen
async function httpCreateCosplay(req,res,next){
    try {
        const userData = req.body
        const newCosplay = await createCosplay(userData)
        res.json(newCosplay)
    } catch (error) {
        next(error)
    }
}

// Alle Cosplays finden

// bestimmtes Cosplay finden

// bestimmtes Cosplay finden und updaten

// bestimmtes Cosplay finden und löschen

module.exports = { httpCreateCosplay }