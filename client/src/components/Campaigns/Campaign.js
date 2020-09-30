import React from "react";

const Campaign = ({campaign, toggleState, toggleLoading, deleteCampaign}) => {
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
      <td>
        {campaign.state ? (
          <button
            id={campaign.index}
            disabled={campaign.toggleLoading}
            onClick={(event) => toggleState(event, campaign.id)}
            className="btn btn-secondary"
          >
            Stop
          </button>
        ) : (
          <button
            id={campaign.index}
            disabled={campaign.toggleLoading}
            onClick={(event) => toggleState(event, campaign.id)}
            className="btn btn-success"
          >
            Activate
          </button>
        )}

        <button
          id={campaign.id}
          onClick={() => deleteCampaign(campaign.id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
      </>
  );
};

export default Campaign;
