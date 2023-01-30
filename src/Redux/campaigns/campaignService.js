import axios from "axios";

//const API_URL = "/api/cards/";
//const API_URL = "https://cairtean.herokuapp.com/api/cards/"
const API_URL = 'http://localhost:8000/api/campaigns/'

//create campaign 
const createCampaign = async (campaignData) => {

  const response = await axios.post(API_URL, campaignData);

  return response.data;
};

//get all campaigns
const getCampaigns = async () => {

  const response = await axios.get(API_URL + 'all');

  return response.data;
};

//get user cards
const getCampaign = async (campaignName) => {

  const response = await axios.get(API_URL, campaignName);

  return response.data;
};

const cardService = {
  createCampaign,
  getCampaign,
  getCampaigns
};

export default campaignService;
