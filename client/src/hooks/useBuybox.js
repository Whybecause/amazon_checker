import React from "react";
import useSWR from "swr";
import moment from "moment";
import {
  getBuybox,
  patchBuyboxInDb,
  saveUpdateBuyboxTime,
  getUpdateBuyboxTime,
} from "../services/buyboxClientAPI";

export const useGetAndUpdateBuybox = () => {
  const [checkingProgress, setCheckingProgress] = React.useState("");
  const [updatedMsg, setUpdatedMsg] = React.useState("");
  const [noChangeMsg, setNoChangeMsg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const updateBuybox = (foundBuybox, campaigns, i) => {
    if (campaigns[i].buybox !== foundBuybox) {
      patchBuyboxInDb(campaigns, i, foundBuybox)
      .then(update => setUpdatedMsg((oldArr) => [...oldArr, update.data.message]))
      .catch(err => console.log(err));
    } else {
      setNoChangeMsg((oldArr) => [...oldArr, campaigns[i].asin]);
    }
  }
  const getAndUpdateBuybox = async (campaigns) => {
    if (!campaigns.length) {
      return setCheckingProgress(campaigns.message)
    }
    for (let i = 0; i < campaigns.length; i++) {
      setIsLoading(true);
      await getBuybox(campaigns, i)
      .then((result) => {
        setCheckingProgress("Checking..." + [i + 1] + "/" + campaigns.length);
        const foundBuybox = result.data;
        updateBuybox(foundBuybox, campaigns, i);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("Error Checking Buybox");
        });
    }
    setIsLoading(false);
    saveUpdateBuyboxTime();
  };
  return {getAndUpdateBuybox, checkingProgress, updatedMsg, noChangeMsg, isLoading }
}

export const useGetUpdateBuyboxTime = () => {
  const { data, error } = useSWR("update", getUpdateBuyboxTime);
  const lastUpdate = moment(data).format("DD MMM YYYY - HH:mm");
  const errorTime = error;
  return { lastUpdate, errorTime };
};
