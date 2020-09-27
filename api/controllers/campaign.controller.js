const Campaign = require("../models/campaign.model");
const puppeteer = require("puppeteer");

// MAJ .env if error on URL :
const uri1 = process.env.uri1;
const uri2 = process.env.uri2;
let user_agent = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393',
  'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)',
  'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)',
  'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0;  Trident/5.0)',
  'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; MDDCJS)',
  'Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
  'Mozilla/5.0 (iPad; CPU OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  'Mozilla/5.0 (Linux; Android 6.0.1; SAMSUNG SM-G570Y Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36',
  'Mozilla/5.0 (Linux; Android 5.0; SAMSUNG SM-N900 Build/LRX21V) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/2.1 Chrome/34.0.1847.76 Mobile Safari/537.36',
  'Mozilla/5.0 (Linux; Android 6.0.1; SAMSUNG SM-N910F Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36',
  'Mozilla/5.0 (Linux; U; Android-4.0.3; en-us; Galaxy Nexus Build/IML74K) AppleWebKit/535.7 (KHTML, like Gecko) CrMo/16.0.912.75 Mobile Safari/535.7',
  'Mozilla/5.0 (Linux; Android 7.0; HTC 10 Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.83 Mobile Safari/537.36',
  'curl/7.35.0',
  'Wget/1.15 (linux-gnu)',
  'Lynx/2.8.8pre.4 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/2.12.23',
];
let random_number = Math.floor(Math.random() * 20);


exports.createCampaign = async (req, res) => {
  const campaign = new Campaign(req.body);
  try {
    const result = await campaign.save();
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

// FRONT SIDE MAKE REQUEST TO GET BUYBOX + PATCH UPDATEBUYBOX IN DB WHEN CLICKING BUTTON
// GET
exports.getBuyBox = async (req, res) => {
  try {

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
            `--user-agent=${user_agent[random_number]}`,
          ],
        });
        
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(60000);
        // PREVENT LAUNCHING CSS AND IMAGE TO SPEED UP REQUEST :
        await page.setRequestInterception(true);
        page.on('request', (req) => {
          if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
            req.abort();
          } else {
            req.continue();
          }
        });
        // ---------------
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
  } catch(e) {
    return console.log(e);
  }
  };
  
  // PATCH
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

// GET
exports.getAllCampaigns = async (req, res) => {
  const campaigns = await Campaign.find();
  getAllData(campaigns, function (response) {
    return res.send(response);
  });
};

// GET
exports.getProblematicCampaigns = async (req, res) => {
  const campaigns = await Campaign.find();
  getProblematicData(campaigns, function(response) {
      return res.send(response);
  })
}

// PATCH
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

// DELETE
exports.deleteCampaign = async (req, res) => {
  const campaignId = req.params.id;
  try {
    const deletedCampaign = await Campaign.deleteOne({ _id: campaignId });
    const allCampaigns = await Campaign.find();
    return res.status(200).json({ message: "Campaign deleted!", campaigns: allCampaigns });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

// ---------------FUNCTIONS ------------------------------

// GET ALL CAMPAIGNS
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
    return callback({ message: "No Campaign Added Yet" });
  }
};


// GET PROBLEMATIC CAMPAIGNS
getProblematicData = async (campaigns, callback) =>  {
  if (campaigns.length) {
      let problematic = [];
      let relax = [];
      await campaigns.map( (campaign) => {
          if (campaign.state !== campaign.buybox) {
              problematic.push({ id: campaign._id, campaignName: campaign.campaignName, asin: campaign.asin, state: campaign.state, buybox: campaign.buybox});
          } else {
            relax.push({ id: campaign._id, campaignName: campaign.campaignName, asin: campaign.asin, state: campaign.state, buybox: campaign.buybox});
          }
      })

      if (problematic.length) {
          return callback(problematic);
      } else {
          return callback({message: 'Nothing to worry'});
      }
  } else {
      return callback({ message: 'No Campaign Added Yet'});
  }
}
