import React from "react";
import {
  fetchBuybox,
  saveBuyboxInDb,
  saveUpdateBuyboxTime,
  getUpdateBuyboxTime,
} from "../services/buyboxClientAPI";
import useSWR from "swr";
import moment from "moment";

export const useBuybox = (campaigns) => {
  const [buyboxMsg, setBuyboxMsg] = React.useState("");
  const [buyboxMsgSuccess, setBuyboxMsgSuccess] = React.useState("");
  const [buyboxLoading, setBuyboxLoading] = React.useState(false);
  const [ serverMsg, setServerMsg ] = React.useState(undefined);
  const patchBuybox = (campaign) => {
    if (campaign.updated.length) {
      saveBuyboxInDb(campaign)
        .then((success) => {
          setBuyboxMsgSuccess((oldArray) => [...oldArray, success.message]);
        })
        .catch((error) => {
          setBuyboxMsg((oldArray) => [
            ...oldArray,
            error + "Error saving Buybox",
          ]);
        });
    } else {
      setBuyboxMsg((oldArray) => [
        ...oldArray,
        campaign.noChange[0].asin + "No Change",
      ]);
    }
  };
  const checkBuybox = async () => {
    setBuyboxLoading(true);
    setServerMsg(campaigns.message)
    if (!campaigns.length) {
      setBuyboxLoading(false);
      return;
    }
    await campaigns.map((campaign) => {
      fetchBuybox(campaign)
        .then(patchBuybox)
        .then((res) => {
          setBuyboxLoading(false);
          saveUpdateBuyboxTime();
        })
        .catch((error) => {
          setBuyboxMsg((oldArray) => [
            ...oldArray,
            error + "Error checking Buybox",
          ]);
        });
    });
    
  };
  return {
    checkBuybox,
    buyboxMsg,
    buyboxMsgSuccess,
    buyboxLoading,
    serverMsg
  };
};

export const useGetUpdateBuyboxTime = () => {
  const { data, error } = useSWR("update", getUpdateBuyboxTime);
  const lastUpdate = moment(data).format("DD MMM YYYY - HH:mm");
  const errorTime = error;
  return { lastUpdate, errorTime };
};
