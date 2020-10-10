const Update = require("../models/buyboxUpdateTime.model");
const Campaign = require("../models/campaign.model");

const { searchBuybox } = require('../functions/buybox.functions');

exports.getBuyBox = async (req, res) => {
    const asin = req.params.id;
    searchBuybox(asin)
    .then( (foundBuybox) => {
      console.log(foundBuybox);
      res.send(foundBuybox)
    })
    .catch(e => res.send({message: 'Error getting Buybox'}));
};


// PATCH
exports.updateBuyBoxInDb = async (req, res) => {
  const campaignId = req.params.id;
  const campaign = await Campaign.findById(campaignId);
  campaign.buybox = !campaign.buybox;
  try {
      campaign.save();
      return res.send({message: campaign.asin + ':' + ' ' + 'Buybox Updated' })
    } catch(e) {
        return res.send({message: 'Error saving new buybox'});
    }
}

exports.getUpdateTime = async (req, res) => {
const result = await Update.findOne({ name : "buyboxUpdate"})
try {
  return res.status(200).send({update: result.lastUpdate})
} catch(e) {
  return res.send(e);
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
  return console.log(error);
})
}