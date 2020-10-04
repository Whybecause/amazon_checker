import React from "react";
import { fetchBuybox, saveBuyboxInDb } from '../services/buyboxClientAPI';

export const useBuybox = (campaigns) => {
  const [buyboxMsg, setBuyboxMsg] = React.useState("");
  const [ isBuyboxBtnDisabled, setBuyboxBtnDisabled ] = React.useState(false);
  const patchBuybox = (campaign) => {
    if (campaign.updated.length) {
      saveBuyboxInDb(campaign)
      .then( (success) => {
        setBuyboxMsg(oldArray => [...oldArray, success.message]);

      })
      .catch( (error) => {
        setBuyboxMsg(oldArray => [...oldArray, error + 'Error saving Buybox']);
      })
    } else {
      setBuyboxMsg(oldArray => [...oldArray, campaign.noChange[0].asin + ':' + ' ' + 'No Change']);
    }
  }
  const checkBuybox = async () => {
    setBuyboxBtnDisabled(true)
    if (!campaigns.length) {
      setBuyboxBtnDisabled(false)
      return console.log("No campaigns");
    }
    await campaigns.map((campaign) => {
        fetchBuybox(campaign)
        .then(patchBuybox)
        .then(res => setBuyboxBtnDisabled(false))
        .catch( (error) => {
          setBuyboxMsg(oldArray => [...oldArray, error + 'Error checking Buybox']);
        })   
    })
  };
  return {
    checkBuybox,
    buyboxMsg,
    isBuyboxBtnDisabled
  };
};
