import React from "react";
import { Container, Table } from "react-bootstrap";
import { useCampaigns } from "./useCampaigns";

import Campaign from "./Campaign";

const CampaignBox = () => {
  const { campaigns, message, error, isPending, markAsActive, fetchProblematicCampaigns, refetchCampaigns } = useCampaigns();

  return (
    <React.Fragment>
      <Container>
      <button className="btn btn-success" onClick={ () => refetchCampaigns()}>All Campaigns</button>
      <button className="btn btn-danger" onClick={ () => fetchProblematicCampaigns()}>Problems</button>
      {error && <pre>ERROR! {error}</pre>}
      {message && <pre>{message}</pre>}
      {isPending && <div className="spinner-svg">LOADING...</div>}

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
            {campaigns ? (
              campaigns.map((campaign, index) => (
                <tr key={index}>
                <Campaign
                  campaign={campaign}
                  markAsActive={markAsActive}
                  />
              </tr>
              ))
            ) : (
              null
            )}
          </tbody>
        </Table>
        {campaigns.message && <div>{campaigns.message}</div>}
      </Container>
    </React.Fragment>
  );
};

export default CampaignBox;
