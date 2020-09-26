import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";

import axios from "axios";

function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  let updateBuyboxUrl = "/api/buybox";
  let allCampaignsUrl = "/api/campaigns/all";
  let problematicCampaignsUrl = "/api/campaigns/problem";

  const toggleState = async (id) => {
    setToggleLoading(true);
    await axios.patch(`/api/state/${id}`)
    .then( (response) => {
      setToggleLoading(false);
      // setMessage(response.data.message);
      setCampaigns[id](response.data.state);
      console.log(response.data);
    })
    .catch( (e) => {
      setToggleLoading(false);
      console.log(e);
    })
  }

  const updateBuybox = async (url) => {
    setLoading(true);
    await axios.get(url)
    .then( (response) => {
        if (response.data.updated) {
          const updated = response.data.updated;
          updated.map( (up) => {
            const id = up.id
            const newbuybox = up.newbuybox;
            axios.patch(
              `/api/buybox/${id}`, {newbuybox}, {headers: {}}
              )
              .then( (response) => {
                setCampaigns('')
                setMessage(response.data.message);
                setLoading(false);
              })
              .catch( (error) => {
                setLoading(false);
                setCampaigns('');
                setError('error saving buybox');
              })
            })
          } if (response.data.updated.length === 0) {
            setLoading(false);
            setCampaigns('');
            setMessage('Nothing to update');
          }

    })
    .catch( (error) => {
      setLoading(false);
      setCampaigns('');
      setError('Error getting buybox');
    })
  }
  const getCampaigns = async (url) => {
    setLoading(true);
    await axios
      .get(url)
      .then((response) => {
        if (response.data.length) {
          setCampaigns(response.data);
          setLoading(false);
        } else {
          setLoading(false);
          setCampaigns('');
          setMessage(response.data.message);
          setError(response.data.error)
        }
      })
      .catch((error) => {
        setLoading(false);
        setCampaigns('');
        setError(error.response.data.error);
      });
  }

  return (
    <Container>

      <h1 className="text-center jumbotron">Amazon Checker</h1>
      <button className="btn btn-secondary" onClick={ () => updateBuybox(updateBuyboxUrl)}>Check Buybox</button>
      <button className="btn btn-danger" onClick={ () => getCampaigns(problematicCampaignsUrl)}>Problematic Campaigns</button>
      <button className="btn btn-primary" onClick={ () => getCampaigns(allCampaignsUrl)}>All Campaigns</button>
      {loading ? (
        <div className="spinner-svg"></div>
      ) : campaigns.length ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Campaign Name</th>
              <th>ASIN</th>
              <th>Campaign State</th>
              <th>Buybox</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td>{campaign.campaignName}</td>
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
                  <div>
                    <button id={campaign.asin} disabled={toggleLoading} onClick={ () => toggleState(campaign.id)} className="btn btn-primary">Change State</button>
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
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          message ? (
            <div className="alert alert-success text-center">{message}</div>
          ) : (
            null
          )
        )
      )
}


    </Container>
  );
}

export default Home;





