const Update = require("../models/buyboxUpdateTime.model");
const Campaign = require("../models/campaign.model");

const { searchBuybox } = require('../functions/buybox.functions');

exports.getBuyBox = async (req, res) => {
    const campaignId = req.params.id;
    const campaign = await Campaign.findById(campaignId);
    const asin = campaign.asin;
    searchBuybox(asin, campaign)
    .then(result => res.send(result))
    .catch(e => res.send(e));
};


// PATCH
exports.updateBuyBoxInDb = async (req, res) => {
  const campaignId = req.params.id;
  const campaign = await Campaign.findById(campaignId);
  const newbuybox = req.body.newbuybox;
  campaign.buybox = newbuybox;
  try {
      campaign.save();
      return res.send({message: campaign.asin + ':' + ' ' + 'Buybox Updated' })
    } catch(e) {
        return console.log(e);
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