// GET ALL CAMPAIGNS STORED IN DB
exports.mapAllData = async (campaigns, callback) => {
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
exports.mapProblematicData = async (campaigns, callback) =>  {
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
            return callback({message: 'Nothing to worry 😊'});
        }
    } else {
        return callback({ message: 'No Campaign Added Yet'});
    }
  }