const Campaign = require("../models/campaign.model");
const puppeteer = require("puppeteer");

// MAJ .env if error on URL :
const uri1 = process.env.uri1;
const uri2 = process.env.uri2;

exports.createCampaign = async (req, res) => {
  const campaign = new Campaign(req.body);
  try {
    const result = await campaign.save();
    res.status(201).json({
      message: "Campaign added successfully",
    });
  } catch (e) {
    res.status(500).json({
      error: "Something went wrong...",
    });
  }
};

exports.getBuyBox = async (req, res) => {
    const campaigns = await Campaign.find();
    if (campaigns.length) {
      let updated = [];
      let noChange= [];
  
      for (let i = 0; i < campaigns.length; i++) {
        const browser = await puppeteer.launch({
          headless: true,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--window-size=1920,1080",
            '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
          ],
        });
  
        const page = await browser.newPage();
        await page.goto(uri1 + campaigns[i].asin + uri2);
        await page.waitForSelector("body");
  
        const buybox = await page.evaluate(() => {
          let vendor = document.body.querySelector("#merchant-info").innerText;
          const regex = "Amazon";
          let buyboxState = vendor.match(regex);
          if (buyboxState !== null) {
            buyboxState = true;
          } else {
            buyboxState = false;
          }
          return buyboxState;
        });
  
        if (buybox !== campaigns[i].buybox) {
            updated.push({id: campaigns[i].id, asin: campaigns[i].asin, state: campaigns[i].state, oldbuybox: campaigns[i].buybox, newbuybox: buybox})
          
        } else {
            noChange.push({id: campaigns[i].id, asin: campaigns[i].asin,  state: campaigns[i].state, oldbuybox: campaigns[i].buybox, newbuybox: buybox})
        }
        await browser.close();
      }
  
        return res.send({updated: updated, noChange: noChange});
  
    } else {
      return res.status(404).send({ error: "No campaign added yet" });
    }
  };

  exports.updateBuyBoxInDb = async (req, res) => {
      const campaignId = req.params.id;
      const campaign = await Campaign.findById(campaignId);
      const newbuybox = req.body.newbuybox;
      campaign.buybox = newbuybox;
      try {
          campaign.save();
          return res.send({message: 'Buybox Updated'})
        } catch(e) {
            return console.log(e);
        }
  }
exports.getAllCampaigns = async (req, res) => {
  const campaigns = await Campaign.find();
  getAllData(campaigns, function (response) {
    return res.send(response);
  });
};


exports.getProblematicCampaigns = async (req, res) => {
  const campaigns = await Campaign.find();
  let data = [];
  getAllData(campaigns, function (response) {
    if (response.length) {
      response.map((item) => {
        if (item.state !== item.buybox) {
          data.push(item);
        } else {
          console.log(item.asin + " " + ":" + " " + "Nothing to do");
        }
      });
      if (data.length) {
        return res.send(data);
      } else {
        return res.send({message: 'Nothing To Do :)'});
      }
    }
  });
};

exports.toogleCampaignState = async (req, res) => {
  const campaignId = req.params.id;
  const foundCampaign = await Campaign.findById(campaignId);
  foundCampaign.state = !foundCampaign.state;
  try {
    foundCampaign.save();
    return res
      .status(200)
      .send({ message: "campaign updated", campaignName: foundCampaign.campaignName, asin: foundCampaign.asin, state: foundCampaign.state, buybox: foundCampaign.buybox });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.deleteCampaign = async (req, res) => {
  const campaignId = req.params.id;
  const deletedCampaign = await Campaign.deleteOne({ _id: campaignId });
  try {
    return res.status(200).json({ message: "Campaign deleted!" });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};


getAllData = async (campaigns, callback) => {
  if (campaigns.length) {
    const result = await campaigns.map((campaign, i) => {
      const asin = campaign.asin;
      const campaignName = campaign.campaignName;
      const state = campaign.state;
      const buybox = campaign.buybox;
      return {
        id: campaign._id,
        campaignName: campaignName,
        asin: asin,
        state: state,
        buybox: buybox,
      };
    });
    return callback(result);
  } else {
    return res.send({ mesage: "No Campaign Added Yet" });
  }
};


// TODO : USE THIS ONE IF NULL PROBLEM FIXED IN geetProblematicData function
// exports.getProblematicCampaigns = async (req, res) => {
//     const campaigns = await Campaign.find();
//     getProblematicData(campaigns, function(response) {
//         return res.send(response);
//     })
// }

// TODO : FIX THE NULL VARIABLE STORED IN RESULT
// getProblematicData = async (campaigns, callback) =>  {
// if (campaigns.length) {

//     const result = await campaigns.map( (campaign) => {
//         if (campaign.state !== campaign.buybox) {
//             return({ id: campaign._id, campaignName: campaign.campaignName, asin: campaign.asin, state: campaign.state, buybox: campaign.buybox});
//         } else {
//             console.log('ok');
//         }
//     })
//     if (result.length) {
//         return callback(result);
//     } else {
//         return res.send({message: 'Nothing to worry'});
//     }
// } else {
//     return res.send({ mesage: 'No Campaign Added Yet'});
// }
// }
