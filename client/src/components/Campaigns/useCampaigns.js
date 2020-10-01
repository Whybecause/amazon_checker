import React from "react";
import { useAsyncFunction } from "../../Utils/useAsyncFunc";
import {
  getAllCampaigns,
  getProblematicCampaigns,
  patchCampaignStatus,
} from "../Campaigns/campaignClientAPI";

const emptyList = [];

// ------------------------------ DEFAFULT ONE PAGE : GET ALL CAMPAIGNS 
const useFetchedCampaigns = () => {
  const [fetchedCampaigns, error, isPending] = useAsyncFunction(
    getAllCampaigns,
    emptyList
  );
  const [campaigns, setCampaigns] = React.useState(emptyList);

  React.useEffect(() => {
    setCampaigns(fetchedCampaigns);
  }, [fetchedCampaigns]);

  return { campaigns, setCampaigns, error, isPending };
};

// -------------------------------

export const useCampaigns = () => {
  const { campaigns, error, isPending, setCampaigns } = useFetchedCampaigns();
    const [ message, setMessage ] = React.useState('');
  //   -------------------------------GET REQUESTS

  const refreshCampaigns = (campaigns) => {
    if (campaigns.message) {
        setMessage(campaigns.message)
        setCampaigns('')

    } else {
        setCampaigns(campaigns)
        setMessage('')
    }
  }
  const fetchProblematicCampaigns = () => {
    getProblematicCampaigns()
    .then(refreshCampaigns)
    .catch( (error) => {
        console.log(error);
    })
  };
  
  const refetchCampaigns = () => {
    getAllCampaigns()
    .then(refreshCampaigns);
  }
//   ----------------------------------PATCH : RENDER CAMPAIGN STATE AND PATCH REQUEST --------------------------------------
  const updateCampaign = (campaign) => {
    const index = campaigns.findIndex((g) => g.id === campaign.id);
    if (index >= 0) {
      const newArr = [...campaigns];
      newArr[index] = {
        id: campaign.id,
        campaignName: campaign.campaignName,
        asin: campaign.asin,
        state: campaign.state,
        buybox: campaign.buybox,
      };
      setCampaigns(newArr);
    }
  };

  const markAsActive = (id) => {
    patchCampaignStatus(id)
      .then(updateCampaign)
      .catch((error) => alert("Error"));
  };



  return {
    campaigns,
    message,
    error,
    isPending,
    markAsActive,
    fetchProblematicCampaigns,
    refetchCampaigns
  };
};
