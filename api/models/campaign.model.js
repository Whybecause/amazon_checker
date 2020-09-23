const mongoose = require('mongoose');

const campaignSchema = mongoose.Schema({
    campaignName: { type: String, required: true},
    asin: { type: String, required: true},
    state: { type: Boolean, default: true},
});

module.exports = mongoose.model('Campaign', campaignSchema);