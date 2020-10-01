export const getAllCampaigns = () => {
    return fetch("/api/campaigns/all")
    .then(response => 
        httpResponseToJSON(response)
    );
  };
export const getProblematicCampaigns = () => {
    return fetch("/api/campaigns/problem")
    .then(response => 
        httpResponseToJSON(response)
    );
  };

export const patchCampaignStatus = (id) => {
  return fetch(`/api/state/${id}`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
})
.then(response =>        
    httpResponseToJSON(response));
};

function httpResponseToJSON(response) {
    if (response.status !== 200) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  }
