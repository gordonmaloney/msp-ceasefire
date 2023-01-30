import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router";
import { useNavigate } from "react-router";
import axios from "axios";
import { PostCode } from "./PostCode";

export const Redirector = () => {
  const params = useParams();
  const campaignName = params.campaign;

  const [campaign, setCampaign] = useState({});

  const getCampaign = async () => {
    const campaign = await axios.get(
      "http://localhost:8000/api/campaigns/" + campaignName
    );
    setCampaign(campaign.data);
  };
  useEffect(() => {
    getCampaign();
  }, []);

  if (campaign) {
    return <PostCode campaign={campaign} />;
  } else {
    return <>Loading...</>;
  }
};
