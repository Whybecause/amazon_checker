import React from "react";
import ModalComponent from '../Modal';

const Campaign = ({campaign, markAsActive, removeCampaign, isLoading, showModal, handleShowModal, handleCloseModal}) => {
  return (
    <>
      <td>
        {campaign.campaignName}
      </td>
      <td>{campaign.asin}</td>
      <td>
        <div>
          {campaign.state ? (
            <span role="img" aria-label="active">
              ✔
            </span>
          ) : (
            <span role="img" aria-label="stopped">
              🔴
            </span>
          )}
        </div>
      </td>
      <td>
        {campaign.buybox ? (
          <span role="img" aria-label="active">
            ✔
          </span>
        ) : (
          <span role="img" aria-label="stopped">
            🔴
          </span>
        )}
      </td>
      <td className="c-flex1">
        {campaign.state ? (
          <button
            onClick={ () => markAsActive(campaign.id)}
            disabled={isLoading}
            className="btn btn-light tex-margin "
          >
            Stop
          </button>
        ) : (
          <button
            onClick={ () => markAsActive(campaign.id)}
            disabled={isLoading}
            className="btn btn-secondary tex-margin "
          >
            Activate
          </button>
        )}
       
        <button
          // id={campaign.id}
          // onClick={handleShowModal}
          onClick={() => removeCampaign(campaign.id)}

          className="btn btn-danger w-20"
        >
          X
        </button>
        {/* <ModalComponent
        showModal={showModal} 
        handleCloseModal={handleCloseModal}
        onClickFunction={() => removeCampaign(campaign.id)}
        modalHeader='Are you sure?'
        modalBody={campaign.asin}
        /> */}
      </td>
      </>
  );
};

export default Campaign;
