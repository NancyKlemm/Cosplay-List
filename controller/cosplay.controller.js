const {
    createCosplay,
    getAllCosplays,
    getSingleCosplay,
    getUserCosplays,
    updateCosplay,
    deleteCosplay,
    Cosplay,
} = require("../model/cosplay.model");

// Cosplay erstellen
async function httpCreateCosplay(req, res, next) {
    try {
        const userData = req.body;
        const userId = req.user.id
        const newCosplay = await createCosplay(userId, userData);
        res.json(newCosplay);
    } catch (error) {
        next(error);
    }
}

// Alle Cosplays finden
async function httpGetAllCosplays(req, res, next) {
    const cosplays = await getAllCosplays();
    res.json(cosplays);
}

// bestimmtes Cosplay finden
async function httpGetSingleCosplay(req, res, next) {
    try {
        const { id } = req.params;
        const cosplay = await getSingleCosplay(id);
        // console.log(id);
        res.json(cosplay);
    } catch (error) {
        next(error);
    }
}

// Die Cosplays des jeweiligen Users finden
async function httpGetUserCosplays( req,res,next){
    try {
        const userId = req.params.id
        console.log(userId);
        const cosplays = await getUserCosplays(userId)
        res.json(cosplays)
    } catch (error) {
        next(error)
    }
}

// bestimmtes Cosplay finden und updaten
async function httpUpdateCosplay(req, res, next) {
    try {
        const { id } = req.params;
        const userData = req.body
        const updatedCosplay = await updateCosplay(id,userData);
        res.json(updatedCosplay);
    } catch (error) {
        next(error);
    }
}

// bestimmtes Cosplay finden und löschen
async function httpDeleteCosplay(req, res, next) {
    try {
        const { id } = req.params;
        const role = req.user.role
        await deleteCosplay(id, role);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    httpCreateCosplay,
    httpGetAllCosplays,
    httpGetSingleCosplay,
    httpGetUserCosplays,
    httpUpdateCosplay,
    httpDeleteCosplay,
};
