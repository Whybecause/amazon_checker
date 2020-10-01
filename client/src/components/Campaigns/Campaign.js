import React from "react";

const Campaign = ({campaign, markAsActive, removeCampaign, isLoading}) => {
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
            className="btn btn-light w-50"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={ () => markAsActive(campaign.id)}
            disabled={isLoading}
            className="btn btn-secondary w-50"
          >
            Activate
          </button>
        )}
       
        <button
          id={campaign.id}
          disabled={isLoading}
          onClick={() => removeCampaign(campaign.id)}
          className="btn btn-danger w-20"
        >
          X
        </button>
      </td>
      </>
  );
};

export default Campaign;
