import axios from "axios";


export const fetchBuybox = async (campaign) => {
    const result = await axios.get(`/api/buybox/${campaign.id}`)
    return result.data;
}

export const saveBuyboxInDb = async (campaign) => {
    const newbuybox = campaign.updated[0].newbuybox
    const result = await axios.patch(`/api/buybox/${campaign.updated[0].id}`,
      { newbuybox },
      { headers: {} }
    )

    return result.data;
}

export const saveUpdateBuyboxTime = async () => {
  const result = await axios.patch("/api/newupdate")
  return result.data;
}

export const getUpdateBuyboxTime = async () => {
  const result = await axios.get("/api/lastupdate")
  console.log(result.data.update);
  return result.data.update;
}

