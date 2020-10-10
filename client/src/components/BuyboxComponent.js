import React from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

import { useCampaigns } from "../hooks/useCampaigns";
let url = "/api/campaigns/all";

const BuyboxComponent = () => {
  const { campaigns } = useCampaigns(url);

  const [checkingProgress, setCheckingProgress] = React.useState("");

  const checkBuybox = async () => {
    for (let i = 0; i < campaigns.length; i++) {
      await axios
        .get(`/api/buybox/${campaigns[i].asin}`)
        .then(async (result) => {
          const foundBuybox = result.data;
          setCheckingProgress("Checking..." + [i + 1] + "/" + campaigns.length);
          if (campaigns[i].buybox !== foundBuybox) {
            console.log(campaigns[i].id + " CHANGE");
            const update = await axios.patch(`/api/buybox/${campaigns[i].id}`)
            console.log(update.data);
          } else {
            console.log(campaigns[i].id + " NO CHANGE");
          }
        })
        .catch((err) => console.log("Error Checking Buybox"));
    }
  };

      
  
  return (
    <div>
      <h1>Coucou</h1>
      {campaigns && <button onClick={checkBuybox}>Check</button>}
      {checkingProgress && <div>{checkingProgress}</div>}
    </div>
  );
};

export default BuyboxComponent;
