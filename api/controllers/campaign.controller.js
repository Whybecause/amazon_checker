const Campaign = require('../models/campaign.model');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');
// MAJ .env if error on URL :
const uri1= process.env.uri1;
const uri2= process.env.uri2;

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
    puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080','--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'] })

    .then(async browser => {
        const campaigns = await Campaign.find();

        if (campaigns.length) {
            let data = [];

            for (let i=0; i<campaigns.length; i++) {
                const page = await browser.newPage();
                await page.goto(uri1 + campaigns[i].asin + uri2);
                await page.waitForSelector('body');

                const buybox = await page.evaluate(() => {
                    let vendor = document.body.querySelector('#merchant-info').innerText;
                    const regex = "Amazon";
                    let buyboxState = vendor.match(regex);
                    if (buyboxState !== null) {
                        buyboxState = true;
                    } else {
                        buyboxState = false;
                    }
                    return buyboxState;
                });

                if (buybox !== campaigns[i].state) {
                    data.push({id: campaigns[i].id, asin: campaigns[i].asin, campaignName: campaigns[i].campaignName, state: campaigns[i].state, buybox });
                } 
                else {console.log(campaigns[i].asin + ' ' + ':' + ' ' + 'noting to do');}
            }

            await browser.close();
            if (data.length) {
                return res.send(data);
            } 
            else {
                return res.status(200).send({message: 'Nothing to worry"'})
            }

        } else {
            return res.status(404).send({error: "No campaign added yet"});
        }

    })
    .catch( function (e) {
        console.log(e);
        return res.send({error: "Error fetching data", e : e});
    });
}

exports.getAllCampaigns = async (req, res) => {
    puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080','--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'] })

    .then(async browser => {
        const campaigns = await Campaign.find();

        if (campaigns.length) {
            let data = [];

            for (let i=0; i<campaigns.length; i++) {
                const page = await browser.newPage();
                await page.goto(uri1 + campaigns[i].asin + uri2);
                await page.waitForSelector('body');

                const buybox = await page.evaluate(() => {
                    let vendor = document.body.querySelector('#merchant-info').innerText;
                    const regex = "Amazon";
                    let buyboxState = vendor.match(regex);
                    if (buyboxState !== null) {
                        buyboxState = true;
                    } else {
                        buyboxState = false;
                    }
                    return buyboxState;
                });
                
                data.push({id: campaigns[i].id, asin: campaigns[i].asin, campaignName: campaigns[i].campaignName, state: campaigns[i].state, buybox });
            }

            await browser.close();
            return res.send(data);

        } else {
            return res.status(404).send({error: "No campaign added yet"});
        }
    })
    .catch( function (e) {
        console.log(e);
        return res.status(400).send({error: "Error fetching data", e : e});
    });
}

// exports.getAllCampaigns = async (req, res) => {
//     const campaigns = await Campaign.find();
//     let data = [];
//     for (let i=0; i<campaigns.length; i++) {
//         try {
//             const result = await axios.get(uri1 + '/' + campaigns[i].asin + uri2);
//             const $ = cheerio.load(result.data);
//             const vendor = $('#merchant-info').text();
//             const regex = "Amazon";
//             let buybox = vendor.match(regex);
//             if (buybox !== null) {
//                 buybox = true;
//             } else {
//                 buybox = false;
//             }
//             data.push({id: campaigns[i].id, asin: campaigns[i].asin, state: campaigns[i].state, buybox: buybox });
//         } catch(e) {
//             return res.send(e);
//         }
//     }
//         return res.send(data);
//     };

exports.toogleCampaignState = async (req, res) => {
    const campaignId = req.params.id;
    const foundCampaign = await Campaign.findById(campaignId)
    foundCampaign.state = !foundCampaign.state;
    try {
        foundCampaign.save();
        return res.status(200).send({message: 'campaign updated', state: foundCampaign.state});
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