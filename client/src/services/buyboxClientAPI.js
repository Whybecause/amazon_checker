import axios from "axios";

export const getBuybox = (campaigns, i) => {
  return axios.get(`/api/buybox/${campaigns[i].asin}`)
}
export const patchBuyboxInDb = async (campaigns, i, foundBuybox) => {
  return await axios.patch(`/api/buybox/${campaigns[i].id}`, { foundBuybox })
}

export const saveUpdateBuyboxTime = async () => {
  const result = await axios.patch("/api/newupdate");
  return console.log(result.data);
};

export const getUpdateBuyboxTime = async () => {
  const result = await axios.get("/api/lastupdate");
  return result.data.update;
};
