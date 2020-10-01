import React from "react";
import { Container } from "react-bootstrap";
import CampaignList from "./CampaignList";
import CampaignForm from "./CampaignForm";
const CampaignBox = ({
  campaigns,
  message,
  error,
  isPending,
  markAsActive,
  createCampaign,
  removeCampaign,
  isLoading
}) => {
  let [toggleForm, setToggleForm ] = React.useState(false);

  const toggle = () => {
    toggleForm = !toggleForm;
    setToggleForm(toggleForm);
  }
  return (
    <React.Fragment>
      <Container>
        <div className="campaign-nav">
          <div className="campaign-nav-btn">

        <a className="btn btn-light" href="/campaigns/all">All Campaigns</a>
        <a className="btn btn-light" href="/campaigns/problem">Problems</a>
        <button className="btn btn-warning" onClick={toggle}>Add Campaign</button>
        {isPending && <div className="spinner-svg"></div>}
          </div>
          <div className="campaign-nav-form">
        {toggleForm &&<CampaignForm createCampaign={createCampaign}/>}
          </div>
        </div>
        {error && <pre>{error}</pre>}
        {message ? ( <div className="m-top-3 text-center">{message}</div> ) : ( null)}
        {campaigns.length ? (
          <CampaignList campaigns={campaigns} markAsActive={markAsActive} removeCampaign={removeCampaign} isLoading={isLoading}/>
        ) : (
          null
        )}
      </Container>
    </React.Fragment>
  );
};

export default CampaignBox;
