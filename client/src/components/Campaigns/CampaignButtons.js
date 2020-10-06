import React from 'react';
import { Container, Col, Row } from "react-bootstrap";

const CampaignButtons = ({sortProblemCampaigns, sortAllCampaigns, toggleFormState, searchText}) => {
    return (
        <Row lg={12} className="campaigns-nav-container">
              <Col lg={6} md={12} xs={12} className="sm-padding c-flex2">
                    <button
                      className="btn btn-danger tex-margin"
                      onClick={(event) => sortProblemCampaigns(event)}
                    >
                      Problem
                    </button>
                    <button
                      className="btn btn-light tex-margin"
                      onClick={(event) => sortAllCampaigns(event)}
                    >
                      All Campaigns
                    </button>
                    <button className="btn btn-warning tex-margin" onClick={toggleFormState}>
                      Add Campaign
                    </button>
              </Col>
              <Col lg={6} className="sm-padding ">
                  <input placeholder="Search by Name"
                    type="text"
                    className="form-control text-center" 
                    {...searchText}
                    />
              </Col>
        </Row>
    )
}

export default CampaignButtons;