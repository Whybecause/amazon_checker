import React, { useState, useEffect } from "react";
import { Container, Table, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

function Home() {
  const { register, handleSubmit } = useForm();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  let [ showCreateCampaign, setShowCreateCampaign ] = useState(false);
  const [ msgCheckSuccess, setMsgCheckSuccess ] = useState('');
  const [ msgCheckError, setMsgCheckError ] = useState('');
  const [ msgSaveSuccess, setMsgSaveSuccess ] = useState('');

  let updateBuyboxUrl = "/api/buybox";
  let allCampaignsUrl = "/api/campaigns/all";
  let problematicCampaignsUrl = "/api/campaigns/problem";
  let createCampaignUrl = "/api/campaigns";

  // WHEN CLICKING ON BUTTON CREATE CAMPAIGN: DISPLAY FORM
  const showFormCreateCampaign = () => {
    showCreateCampaign = !showCreateCampaign;
    setShowCreateCampaign(showCreateCampaign);
    setMessage('');
  }

  // POST REQUEST WHEN SUBMITING FORM TO CREATE CAMPAIGN
  const createCampaign = async (data, e) => {
    const result = await axios.post(createCampaignUrl, data);
    try {
      getCampaigns(allCampaignsUrl);
      e.target.reset();
    } catch (error) {
      console.log(result.data);
    }
  }

  // useEffect( () => {
  //   getCampaigns(allCampaignsUrl);
  // }, []);

  // CHANGE CAMPAIGN STATE WHEN CLICK BUTTON
  const toggleState = async (event, id) => {
    setToggleLoading(true);
    event.preventDefault();
    const index = event.target.id;
    await axios.patch(`/api/state/${id}`)
    .then( (response) => {
      setToggleLoading(false);
      let newArr = [...campaigns];
      newArr[index] = {id: response.data.id, campaignName: response.data.campaignName, asin: response.data.asin, state: response.data.state, buybox: response.data.buybox}
      setCampaigns(newArr)
    })
    .catch( (e) => {
      setToggleLoading(false);
      console.log(e);
    })
  }

  // DELETE CAMPAIGN WHEN CLICKING THE DELETE BUTTON
  const deleteCampaign = async (id) => {
    try {
      const result = await axios.delete(`/api/campaigns/${id}`)
      getCampaigns(allCampaignsUrl);
    } 
    catch (e) {
      console.log(e);
    }

  }

  const updateBuybox = async (url) => {
    // get all campaigns from db :
    await axios.get(url)
    .then( (campaigns) => {
      campaigns.data.map( async (campaign) => {
        // fetch buybox for each campaign : 
        await axios.get(`/api/buybox/${campaign.id}`)
        .then(async (result) => {
          if (result.data.updated.length) {
            setMsgCheckSuccess(result.data.updated[0].asin + 'Old :' + ' ' + result.data.updated[0].oldbuybox + 'New : ' + ' ' + result.data.updated[0].newbuybox);
            const newbuybox = result.data.updated[0].newbuybox;
            await axios.patch(`/api/buybox/${result.data.updated[0].id}`, {newbuybox}, {headers: {}})
            .then( (response) => {
              console.log(response.data.message);
              setMsgSaveSuccess(response.data.message);
            })
            .catch( (error) => {
              console.log(error);
            })
          } 
          else {
            setMsgCheckError(result.data.noChange[0].asin + ' ' + 'No change...');
          }
        })
        .catch( (error) => {
          console.log(error);
        })
      })
    })
    .catch( (error) => {
      console.log(error);
    })
  }

  // FETCH BUYBOX ON AMAZON : GET REQUEST TO HAVE DATE THEN PATCH REQUEST TO STORE BUYBOX STATE IN DB
  // const updateBuybox = async (url) => {
  //   setLoading(true);
  //   await axios.get(url)
  //   .then( (response) => {
  //       if (response.data.updated) {
  //         const updated = response.data.updated;
  //         updated.map( (up) => {
  //           const id = up.id
  //           const newbuybox = up.newbuybox;
  //           axios.patch(
  //             `/api/buybox/${id}`, {newbuybox}, {headers: {}}
  //             )
  //             .then( (response) => {
  //               setCampaigns('')
  //               setMessage(response.data.message);
  //               setLoading(false);
  //             })
  //             .catch( (error) => {
  //               setLoading(false);
  //               setCampaigns('');
  //               setError('error saving buybox');
  //               console.log(error);
  //             })
  //           })
  //         } if (response.data.updated.length === 0) {
  //           setLoading(false);
  //           setCampaigns('');
  //           setMessage('Nothing to update');
  //         }

  //   })
  //   .catch( (error) => {
  //     setLoading(false);
  //     setCampaigns('');
  //     setError(error.response.data.error);
  //     console.log(error);
  //   })
  // }

  // GET CAMPAIGNS AND PROBLEMATIC CAMPAIGNS
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
      <a href="/campaigns">Campaigns</a>
      <button className="btn btn-secondary" onClick={ () => updateBuybox(allCampaignsUrl)}>Check Buybox</button>
      <button className="btn btn-danger" onClick={ () => getCampaigns(problematicCampaignsUrl)}>Problematic Campaigns</button>
      <button className="btn btn-primary" onClick={ () => getCampaigns(allCampaignsUrl)}>All Campaigns</button>
      <button className="btn btn-primary" onClick={showFormCreateCampaign}>Create Campaign</button>
      
      {/* After Click the button "create campaign", form is displayed */}
      {showCreateCampaign && (
        <Form onSubmit={handleSubmit(createCampaign)} className="d-flex">
          <Form.Control
          type="text"
          name="campaignName"
          placeholder="Campaign Name"
          ref={register({ required: true })}
          />
          <Form.Control
          type="text"
          name="asin"
          placeholder="ASIN"
          ref={register({ required: true })}
          />
          <button className="btn btn-primary" type="submit">Create</button>
        </Form>
        )}
      
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr key={index}>
                <td>{index} {campaign.campaignName} </td>
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
                    <button id={index} disabled={toggleLoading} onClick={ (event) => toggleState(event, campaign.id)} className="btn btn-secondary">Stop</button>
                  ) : (
                    <button id={index} disabled={toggleLoading} onClick={ (event) => toggleState(event, campaign.id)} className="btn btn-success">Activate</button>
   
                  )}
                  
                
                  <button id={campaign.id} onClick={ () => deleteCampaign(campaign.id)} className="btn btn-danger">Delete</button>
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

  <div>{msgCheckSuccess}</div>
  <div>{msgCheckError}</div>
  <div>{msgSaveSuccess}</div>



    </Container>
  );
}

export default Home;





