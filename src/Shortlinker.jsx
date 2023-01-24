import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router";
import { useNavigate } from "react-router";

export const Shortlinker = () => {
  const navigate = useNavigate();
  const params = useParams();
  const campaign = params.campaign;

  const [link, setLink] = useState(null);

  useEffect(() => {
    const getLink = async (campaign) => {
      try {
        const link = await fetch(
          `http://127.0.0.1:7779/link?campaign=${campaign}`
        );
        const data = await link.json();
        console.log(data.long);
        setLink(data.long);
        navigate(`/${data.long}`)
      } catch {
        console.log("uhhh");
      }
    };
    getLink(campaign);
  }, [params]);

  const getLinks = async () => {
    try {
      const links = await fetch("http://127.0.0.1:7779/all_links");
      const data = await links.json();
      console.log(data);
    } catch {
      console.log("uhhh");
    }
  };

  const createLink = async (short, long) => {
    const links = await fetch("http://127.0.0.1:7779/all_links");
    const data = await links.json();
    if (data.filter((datum) => datum.short == short).length == 0) {
      try {
        const link = await fetch(
          `http://127.0.0.1:7779/createlink?short=${short}&long=${long}`
        );
        const data = await link.json();
        console.log(data);
      } catch {
        console.log("something has gone wrong");
      }
    } else {
      return "Shortlink already in use";
    }
  };

  //getLinks();

  //getLink("short2");

  //createLink('short12', 'long12')
};
