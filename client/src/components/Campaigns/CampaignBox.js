import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import format from 'date-fns/format';

import { useCampaigns } from "../../hooks/useCampaigns";
import { useGetUpdateBuyboxTime } from "../../hooks/useBuybox";
import  useUserInput  from '../../hooks/useUserInput';
import  useSearchable  from '../../hooks/useSearchable';

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
        {lastUpdate && <div className="c-p text-center">Last Buybox Update : {Date(lastUpdate)}</div>}

        <Row className="campaigns-nav-container">
              <Col lg={6} md={12} xs={12} className="sm-padding">
                    <button
                      className="c-btn"
                      onClick={(event) => sortProblemCampaigns(event)}
                    >
                      Problem Campaigns
                    </button>
                    <button
                      className="c-btn"
                      onClick={(event) => sortAllCampaigns(event)}
                    >
                      All Campaigns
                    </button>
                    <button className="c-btn" onClick={toggle}>
                      Add Campaign
                    </button>
              </Col>
              <Col lg={6} className="sm-padding">
                  <input placeholder="Search by Name"
                    type="text"
                    className="form-control text-center" 
                    {...searchText}
                    />
              </Col>
        </Row>
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
