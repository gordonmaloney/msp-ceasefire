import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router";
import { useNavigate } from "react-router";
import {API} from './API'

export const Redirector = () => {
  const navigate = useNavigate();
  const params = useParams();
  const campaign = params.campaign;


  useEffect(() => {
    const getLink = async (campaign) => {
      try {
        const link = await fetch(
          `${API}link?campaign=${campaign}`
        );
        const data = await link.json();

        navigate(`../${data.long}`)
      } catch {
        console.log("uhhh");
      }
    };
    getLink(campaign);
  }, []);


};