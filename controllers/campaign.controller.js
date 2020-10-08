const Campaign = require("../models/campaign.model");

const { mapAllData, mapProblematicData } = require('../functions/campaigns.functions');

exports.createCampaign = async (req, res) => {
  const campaign = new Campaign(req.body);
  try {
    await campaign.save();
    const allCampaigns = await Campaign.find();
    res.status(201).json({
      message: "Campaign added successfully",
      result: allCampaigns
    });
  } catch (e) {
    res.status(500).json({
      error: "Something went wrong...",
    });
  }
};

const getCampaignsFromDb = async () => {
  const result = await Campaign.find().sort({"createdAt": -1})
  return result;
}

// GET ALL
exports.getAllCampaigns = async (req, res) => {
  getCampaignsFromDb()
  .then( (campaigns) => {
    mapAllData(campaigns, function(response) {
      return res.status(200).send(response);
    })
  })
 };

// GET ALL SORTED WITH PROBLEM
exports.getProblematicCampaigns = async (req, res) => {
  await Campaign.find()
  .sort({"createdAt": -1})
  .then( (campaigns) => {
    mapProblematicData(campaigns, function(response) {
      return res.status(200).send(response);
    })
  })
}

// PATCH CAMPAIGN STATE
exports.toogleCampaignState = async (req, res) => {
  try {
    const campaignId = req.params.id;
    const foundCampaign = await Campaign.findById(campaignId);
    foundCampaign.state = !foundCampaign.state;
    foundCampaign.save();
    return res
      .status(200)
      .send({ message: "campaign updated", id: foundCampaign.id, campaignName: foundCampaign.campaignName, asin: foundCampaign.asin, state: foundCampaign.state, buybox: foundCampaign.buybox });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

// DELETE CAMPAIGN
exports.deleteCampaign = async (req, res) => {
  const campaignId = req.params.id;
  try {
    const deletedCampaign = await Campaign.findOne({_id: campaignId});
    const result = await Campaign.deleteOne({ _id: campaignId });
    return res.status(200).json({ message: "Campaign deleted!",  id: deletedCampaign.id, campaignName: deletedCampaign.campaignName, asin: deletedCampaign.asin, state: deletedCampaign.state, buybox: deletedCampaign.buybox  });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};







