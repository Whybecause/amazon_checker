const mongoose = require('mongoose');

const buyboxUpdateSchema = mongoose.Schema({
    name: { type: String, default: "buyboxUpdate"},
    lastUpdate : { type : Date, default : Date.now() }
});

module.exports = mongoose.model('Update', buyboxUpdateSchema);

