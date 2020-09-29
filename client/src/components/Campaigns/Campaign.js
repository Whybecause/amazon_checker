import React from "react";

const Campaign = (props) => {
  return (
    <>
      <td>
        {props.campaignName}
      </td>
      <td>{props.asin}</td>
      <td>
        <div>
          {props.state ? (
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
        {props.buybox ? (
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
        {props.state ? (
          <button
            id={props.index}
            disabled={props.toggleLoading}
            onClick={(event) => props.toggleState(event, props.id)}
            className="btn btn-secondary"
          >
            Stop
          </button>
        ) : (
          <button
            id={props.index}
            disabled={props.toggleLoading}
            onClick={(event) => props.toggleState(event, props.id)}
            className="btn btn-success"
          >
            Activate
          </button>
        )}

        <button
          id={props.id}
          onClick={() => props.deleteCampaign(props.id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
      </>
  );
};

export default Campaign;
