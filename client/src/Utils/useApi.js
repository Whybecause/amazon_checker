import React from 'react';
import axios from 'axios';


export const getAllCampaigns = () => {
  fetch("/api/campaigns/all")
  .then( (response) => {
    return response.json()
    });
}
export const apiStates = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
  };
  
  export const useCampaigns = (url, emptyList) => {
    const [data, setData] = React.useState({
      state: apiStates.LOADING,
      error: '',
      data: [],
    });
  


    const setPartData = (partialData) => setData({ ...data, ...partialData });
  
    React.useEffect(() => {
      setPartData({
        state: apiStates.LOADING,
      });
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setPartData({
            state: apiStates.SUCCESS,
            data
          });
        })
        .catch(() => {
         setPartData({
            state: apiStates.ERROR,
            error: 'fetch failed'
          });
        });
    }, [emptyList]);
  
    return (data) ;
  };

  export const patchCampaignState = async (
    event,
    url,
    setToggleLoading,
    data,
    setCampaignState
  ) => {
    setToggleLoading(true);
    event.preventDefault();
    const index = event.target.id;
    await axios
      .patch(url)
      .then((response) => {
        setToggleLoading(false);
        let newArr = [...data];
        newArr[index] = {
          id: response.data.id,
          campaignName: response.data.campaignName,
          asin: response.data.asin,
          state: response.data.state,
          buybox: response.data.buybox,
        };
        setCampaignState(newArr);
      })
      .catch((e) => {
        setToggleLoading(false);
        console.log(e);
      });
  };

