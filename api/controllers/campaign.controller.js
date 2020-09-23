const Campaign = require('../models/campaign.model');
const Uri = require('../models/uri.model');
const axios = require('axios');
const cheerio = require('cheerio');


exports.createCampaign = async (req, res) => {
    const campaign = new Campaign(req.body);
    try {
        const result = await campaign.save();
        res.status(201).json({
            message: 'Campaign added successfully',
        });
    } catch(e) {
        res.status(500).json({
            error: 'Something went wrong...'
        });
    }
}

exports.getCampaigns = async (req, res) => {
    const uris = await Uri.findOne({_id: '5f6bd8296cef6f40097f8657'});
    const uri1 = uris.uri1;
    const uri2 = uris.uri2;
    const campaigns = await Campaign.find();
    let data = [];
    for (let i=0; i<campaigns.length; i++) {
        try {
            const result = await axios.get(uri1 + '/' + campaigns[i].asin + uri2);
            const $ = cheerio.load(result.data);
            const vendor = $('#merchant-info').text();
            const regex = "Amazon";
            let buybox = vendor.match(regex);
            if (buybox !== null) {
                buybox = true;
            } else {
                buybox = false;
            }
            data.push({id: campaigns[i].id, asin: campaigns[i].asin, state: campaigns[i].state, buybox: buybox });
        } catch(e) {
            return res.send(e);
        }
    }
        return res.send(data);
    };

exports.toogleCampaignState = async (req, res) => {
    const campaignId = req.params.id;
    const foundCampaign = await Campaign.findById(campaignId)
    foundCampaign.state = !foundCampaign.state;
    try {
        foundCampaign.save();
        return res.status(200).send({message: 'campaign updated'});
    } catch(error) {
        return res.status(500).send({ error: error})
    }
}

exports.deleteCampaign = async (req, res) => {
    const campaignId = req.params.id;
    const deletedCampaign = await Campaign.deleteOne({_id: campaignId});
    try {
        return res.status(200).json ({ message: 'Campaign deleted!'});
    } catch(error) {
        return res.status(500).send({ error: error})
    }
}