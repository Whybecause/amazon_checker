import axios from 'axios';

export const postCampaign = async (data) => {
  const result = await axios.post("/api/campaigns", data);
  return result;
}

export const getAllCampaigns = async (url) => {
  return fetch(url).then(response => httpResponseToJSON(response));
};

export const patchCampaignStatus = (id) => {
  return fetch(`/api/state/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  }).then((response) => httpResponseToJSON(response));
};

export const deleteCampaign = (id) => {
   return axios.delete(`/api/campaigns/${id}`)
    .then( response => response.data);
  
}

function httpResponseToJSON(response) {
  if (response.status !== 200) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

