import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { useCampaigns } from "../hooks/useCampaigns";
import { useGetAndUpdateBuybox } from "../hooks/useBuybox";
let url = "/api/campaigns/all";

const BuyboxContainer = () => {
  const { campaigns, message } = useCampaigns(url);
  const { getAndUpdateBuybox, checkingProgress, updatedMsg, noChangeMsg, isLoading } = useGetAndUpdateBuybox(campaigns);
  return (
    <Container>
      <div className="c-flex2">
        {message.length ? (
          <div>{message}</div>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => getAndUpdateBuybox(campaigns)}
            disabled={isLoading}
          >
            {isLoading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Check</span>
          </button>
        )}
      </div>
      <div className="c-flex2 m-top-1">
        {checkingProgress && <div>{checkingProgress}</div>}
      </div>
      <Row>
        <Col lg={6} sm={6} className="m-top-1 text-center">
          {updatedMsg &&
            updatedMsg.map((updated, index) => (
              <div key={index}>{updated}</div>
            ))}
        </Col>
        <Col lg={6} sm={6} className="m-top-1 text-center">
          {noChangeMsg &&
            noChangeMsg.map((noChange, index) => (
              <div key={index}>{noChange} No Change</div>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default BuyboxContainer;
