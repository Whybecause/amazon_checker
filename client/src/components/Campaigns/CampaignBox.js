import React from "react";
import { useCampaigns } from "../../hooks/useCampaigns";
import { Container } from "react-bootstrap";
import CampaignList from "./CampaignList";
import CampaignForm from "./CampaignForm";
import { useBuybox } from "../../hooks/useBuybox";

const CampaignBox = () => {
  const [url, setUrl] = React.useState("/api/campaigns/all");
  const [showBuyboxBtn, setBuyboxBtn] = React.useState(true);

  const {
    campaigns,
    message,
    error,
    isPending,
    markAsActive,
    createCampaign,
    removeCampaign,
    isLoading,
  } = useCampaigns(url);
  const {checkBuybox, buyboxMsg, isBuyboxBtnDisabled} = useBuybox(campaigns);
  let [toggleForm, setToggleForm] = React.useState(false);

  // All Campaigns Button
  const sortAllCampaigns = (event) => {
    event.preventDefault();
    setUrl("/api/campaigns/all");
    setBuyboxBtn(true);
  };
  // Problem Campaigns Button
  const sortProblemCampaigns = (event) => {
    event.preventDefault();
    setUrl("/api/campaigns/problem");
    setBuyboxBtn(false);
  };
  // Add Campaign Button
  const toggle = () => {
    toggleForm = !toggleForm;
    setToggleForm(toggleForm);
  };

  return (
    <React.Fragment>
      <Container>
        {/* BUTTONS ----------------------- */}
        <div className="nav-container">
          <div className="nav-campaigns">
            <button
              className="btn btn-light"
              onClick={(event) => sortAllCampaigns(event)}
            >
              All Campaigns
            </button>
            <button
              className="btn btn-light"
              onClick={(event) => sortProblemCampaigns(event)}
            >
              Problem Campaigns
            </button>
            <button className="btn btn-warning" onClick={toggle}>
              Add Campaign
            </button>
          </div>
          {showBuyboxBtn && (
            <div className="nav-buybox">
              <button
                onClick={checkBuybox}
                disabled={isBuyboxBtnDisabled}
                className="btn btn-danger"
              >
                Check Buybox
              </button>
            </div>
          )}
        </div>
        <div className="campaign-nav-form">
          {toggleForm && (
            <div className="p-top-1">
              <CampaignForm createCampaign={createCampaign} />
            </div>
          )}
        </div>

        {/* MESSAGES OR ERRORS---------------------- */}
        {isPending && <div className="spinner-svg"></div>}
        {error && <pre>{error}</pre>}
        {message ? <div className="m-top-3 text-center">{message}</div> : null}
        <div>
        {buyboxMsg && (
          buyboxMsg.map( (bbMsg, index) => (
            <p key={index}>{bbMsg}</p>
            ))
          )}
        </div>


        {/* TABLE WITH CAMPAIGNS------------------------------ */}
        {campaigns.length ? (
          <CampaignList
            campaigns={campaigns}
            markAsActive={markAsActive}
            removeCampaign={removeCampaign}
            isLoading={isLoading}
          />
        ) : null}
      </Container>
    </React.Fragment>
  );
};

export default CampaignBox;
