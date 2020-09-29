import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import { apiStates, useApi, patchCampaignState } from "../../Utils/useApi";
import Campaign from "./Campaign";
import axios from 'axios';

// Component is used in Wrapper to render different pages (all campaigns, problematic campaigns)
const CampaignBox = (props) => {
  const [ campaignState, setCampaignState ] = useState();
  const { state, error, data } = useApi(props.url, campaignState);
  const [toggleLoading, setToggleLoading] = useState(false);
  // Function makes PATCH request to update Campaign State in DB
  const toggleState = (event, id) => {
    let url = `/api/state/${id}`
    patchCampaignState(event, url, setToggleLoading, data, setCampaignState);
  }




  const deleteCampaign = async (id) => {
    try {
      const result = await axios.delete(`/api/campaigns/${id}`)
      setCampaignState(result)
    } 
    catch (e) {
      console.log(e);
    }

  }

  switch (state) {
    case apiStates.ERROR:
      return <p>ERROR: {error || "General error"}</p>;
    case apiStates.SUCCESS:
      return (
        <React.Fragment>
          <Container>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Campaign Name</th>
                  <th>ASIN</th>
                  <th>Campaign State</th>
                  <th>Buybox</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length &&
                  data.map((campaign, index) => (
                    <tr key={index}>
                      <Campaign
                        index={index}
                        id={campaign.id}
                        campaignName={campaign.campaignName}
                        asin={campaign.asin}
                        state={campaign.state}
                        buybox={campaign.buybox}
                        toggleLoading={toggleLoading}
                        toggleState={toggleState}
                        deleteCampaign={deleteCampaign}
                      />
                    </tr>
                  ))}
              </tbody>
            </Table>
            {data.message && <div>{data.message}</div>}
          </Container>
        </React.Fragment>
      );
    default:
      return (
        <Container>
          <div className="spinner-svg"></div>
        </Container>
      );
  }
};

export default CampaignBox;
