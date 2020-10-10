const Update = require("../models/buyboxUpdateTime.model");
const Campaign = require("../models/campaign.model");

const { searchBuybox } = require('../functions/buybox.functions');

exports.getBuyBox = async (req, res) => {
    const asin = req.params.id;
    searchBuybox(asin)
    .then( (foundBuybox) => {
      res.send(foundBuybox)
    })
    .catch(e => res.send({message: 'Error getting Buybox'}));
};


// PATCH
exports.updateBuyBoxInDb = async (req, res) => {
  const campaignId = req.params.id;
  const { foundBuybox } = req.body;
  const newbuybox = { buybox: foundBuybox }
  await Campaign.findByIdAndUpdate(campaignId, {$set: newbuybox})
  .then( campaign => res.send({message: campaign.asin + ' Buybox Updated : ' + foundBuybox }) )
  .catch( err => res.send({message: 'Error saving buybox' }) )
}

exports.getUpdateTime = async (req, res) => {
const result = await Update.findOne({ name : "buyboxUpdate"})
try {
  return res.status(200).send({update: result.lastUpdate})
} catch(e) {
  return res.send('Error getting last buybox update time');
}
}

exports.patchUpdateTime = async (req, res) => {
await Update.findOne({name: "buyboxUpdate"})
.then( (foundUpdate) => {
  foundUpdate.lastUpdate = Date.now();
  foundUpdate.save();
  return res.status(200).send('New buybox update time saved');
})
.catch( (error) => {
  return res.send('Error saving update time');
})
}