import useSWR from "swr";
import {
  postCampaign,
  getAllCampaigns,
  patchCampaignStatus,
  deleteCampaign
} from "../services/campaignClientAPI";

import React from 'react';

const useFetchedCampaigns = (url) => {
  const { data, error, mutate } = useSWR(url, getAllCampaigns);
  const campaigns = data || [];
  const isPending = !data;
  const setCampaigns = mutate;
  const message = campaigns.message || [];
  return { campaigns, setCampaigns, error, isPending, message };
};

export const useCampaigns = (url) => {
  const {
    campaigns,
    error,
    isPending,
    setCampaigns,
    message,
  } = useFetchedCampaigns(url);
  const [ isLoading, setIsLoading ] = React.useState(false);


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

  const createCampaign = (data) => {
    setIsLoading(true);
    postCampaign(data)
    .then( (response) => {
      setCampaigns(response);
      setIsLoading(false);

    })
    .catch( (error) => {
      setIsLoading(false);
      console.log(error);
    })
  }

  const markAsActive = (id) => {
    patchCampaignStatus(id)
      .then(updateCampaign)
      .catch((error) => alert("Error" + error));
  };

  const removeCampaign = (id) => {
    setIsLoading(true);
    deleteCampaign(id)
    .then((campaign) => {
      updateCampaign(campaign);
      setIsLoading(false);
    })
    .catch(error => console.log(error));
  }
  return {
    campaigns,
    message,
    error,
    isPending,
    markAsActive,
    createCampaign,
    removeCampaign,
    isLoading
  };
};
