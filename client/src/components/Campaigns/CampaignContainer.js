import React from "react";
import { Container } from "react-bootstrap";

import { useCampaigns } from "../../hooks/useCampaigns";
import { useGetUpdateBuyboxTime } from "../../hooks/useBuybox";
import  useUserInput  from '../../hooks/useUserInput';
import  useSearchable  from '../../hooks/useSearchable';

import CampaignList from "./CampaignList";
import CampaignForm from "./CampaignForm";
import CampaignButtons from './CampaignButtons';

const CampaignContainer = () => {
  // GET UPDATE TIME
  const {lastUpdate } = useGetUpdateBuyboxTime();

  // DEFAULT URL = PROBLEM CAMPAIGNS
  const [url, setUrl] = React.useState("/api/campaigns/problem");

  // SHOW MODAL ------------
  const [ showModal, setShowModal ] = React.useState(false);
  const handleCloseModal= () => setShowModal(false);
  const handleShowModal= () => setShowModal(true);

  // CRUD FOR CAMPAIGNS ----------------
  const {
    campaigns,
    message,
    error,
    isPending,
    markAsActive,
    createCampaign,
    removeCampaign,
    isLoading,
  } = useCampaigns(url, handleCloseModal);
  
  // SEARCH BAR --------------
  const searchText = useUserInput("");
  const searchableCampaigns = useSearchable(campaigns, searchText.value, (campaign) => [campaign.campaignName]);
 
  // SHOW ADD CAMPAIGN FORM ---------------
  let [toggleForm, setToggleForm] = React.useState(false);
  const toggleFormState = () => {
        toggleForm = !toggleForm;
        setToggleForm(toggleForm);
      };
 
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


  return (
    <React.Fragment>
      <Container>
        {lastUpdate && <div className="c-flex2 text-center p-discret"><strong>Last Buybox Update</strong>: {lastUpdate}</div>}
        {/* BUTTONS ----------------------- */}
        <CampaignButtons 
        sortProblemCampaigns={sortProblemCampaigns}
        sortAllCampaigns={sortAllCampaigns}
        toggleFormState={toggleFormState}
        searchText={searchText}
        />

        <div className="campaign-nav-form">
          {toggleForm && (
            <div className="p-top-1">
              <CampaignForm createCampaign={createCampaign} />
            </div>
          )}
        </div>

        {/* LOADING OR MESSAGES OR ERRORS---------------------- */}
        {isPending && <div className="spinner-svg c-flex1"></div>}
        {isLoading && <div className="spinner-svg c-flex1"></div>}
        {error && <pre>{error}</pre>}
        {message ? <div className="m-top-3 text-center">{message}</div> : null}

        {/* TABLE WITH CAMPAIGNS------------------------------ */}
        {searchableCampaigns  ? (
          <CampaignList
            searchableCampaigns={searchableCampaigns}
            markAsActive={markAsActive}
            removeCampaign={removeCampaign}
            isLoading={isLoading}
            showModal={showModal}
            handleShowModal={handleShowModal}
            handleCloseModal={handleCloseModal}
          />
        ) : null}
      </Container>
    </React.Fragment>
  );
};

export default CampaignContainer;
