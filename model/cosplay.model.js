const mongoose = require("mongoose");

const { cosplaySchema } = require("../model/cosplay.schema");
const { cosplayNotFound } = require('../middleware/error.handler');

const Cosplay = mongoose.model("Cosplay", cosplaySchema);

// Cosplay erstellen
async function createCosplay(userData) {
    return await Cosplay.create(userData);
}

// Alles Cosplays finden
async function getAllCosplays() {
    return await Cosplay.find({});
}

// ein bestimmtes Cosplay finden
async function getSingleCosplay(id) {
    await cosplayNotFound(Cosplay, id)
    return await Cosplay.findById(id);
}

// ein bestimmtes Cosplay finden und updaten
async function updateCosplay(id, data) {
    await cosplayNotFound(Cosplay, id)
    return await Cosplay.findByIdAndUpdate({ _id: id }, data, { new: true });
}

// ein bestimmtes Cosplay finden und löschen
async function deleteCosplay(id) {
    await cosplayNotFound(Cosplay, id)
   return await Cosplay.findByIdAndDelete({ _id: id });
}

module.exports = {
    Cosplay,
    createCosplay,
    getAllCosplays,
    getSingleCosplay,
    updateCosplay,
    deleteCosplay,
};
