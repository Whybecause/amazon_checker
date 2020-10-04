import React from "react";
import { useCampaigns } from "../../hooks/useCampaigns";
import { useGetUpdateBuyboxTime } from "../../hooks/useBuybox";
import  useUserInput  from '../../hooks/useUserInput';
import  useSearchable  from '../../hooks/useSearchable';
import { Container } from "react-bootstrap";
import CampaignList from "./CampaignList";
import CampaignForm from "./CampaignForm";
const CampaignBox = () => {
  const { lastUpdate, failUpdate } = useGetUpdateBuyboxTime();
  const [url, setUrl] = React.useState("/api/campaigns/problem");
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
  

  const searchText = useUserInput("");
  const searchableCampaigns = useSearchable(campaigns, searchText.value, (campaign) => [campaign.campaignName]);
  let [toggleForm, setToggleForm] = React.useState(false);

  // All Campaigns Button
  const sortAllCampaigns = (event) => {
    event.preventDefault();
    setUrl("/api/campaigns/all");
  };
  // Problem Campaigns Button
  const sortProblemCampaigns = (event) => {
    event.preventDefault();
    setUrl("/api/campaigns/problem");
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
          <div className="nav-btns">
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
          <input placeholder="Search by Name"
            type="text"
            className="form-control text-center" 
            {...searchText}
            />
          </div>
        </div>
        <div className="campaign-nav-form">
          {toggleForm && (
            <div className="p-top-1">
              <CampaignForm createCampaign={createCampaign} />
            </div>
          )}
          {lastUpdate && <div>Last Buybox Update : {lastUpdate}</div>}

        </div>

        {/* MESSAGES OR ERRORS---------------------- */}
        {isPending && <div className="spinner-svg"></div>}
        {error && <pre>{error}</pre>}
        {message ? <div className="m-top-3 text-center">{message}</div> : null}
        {/* TABLE WITH CAMPAIGNS------------------------------ */}
        {searchableCampaigns  ? (
          <CampaignList
            searchableCampaigns={searchableCampaigns}
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
