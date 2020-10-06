import React from "react";
import { Table } from "react-bootstrap";
import Campaign from "./Campaign";


const CampaignList = ({searchableCampaigns, markAsActive, removeCampaign, isLoading, showModal, handleShowModal, handleCloseModal}) => {
    return (
          <>
          <div>{searchableCampaigns.length} results </div>
        <Table striped bordered hover variant="dark" responsive="sm">
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
            {searchableCampaigns.map((campaign) => (
              <tr key={campaign.id}>
              <Campaign
                campaign={campaign}
                markAsActive={markAsActive}
                removeCampaign={removeCampaign}
                isLoading={isLoading}
                showModal={showModal}
                handleShowModal={handleShowModal}
                handleCloseModal={handleCloseModal}
                />
            </tr>
            ))}
          
        </tbody>
      </Table>
      </>
    )
}

export default CampaignList;
