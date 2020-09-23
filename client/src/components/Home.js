import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCampaigns() {
      await axios.get("http://localhost:8080/api/campaigns")
          .then((response) => {
            setCampaigns(response.data);
              setLoading(false);
              console.log(response.data);
          })
          .catch((e) => {
              setLoading(false);
              console.log(e);
          })
  }

  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <div>coucou</div>
  );
}

export default Home;
