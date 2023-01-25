import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const link = (
  <Link to="../newcampaign">
    <h3 className="bebas" style={{ margin: 0, paddingRight: "20px" }}>
      Launch a campaign
    </h3>
  </Link>
);

export const Header = () => {
  return (
    <div className="navBar">
      <Link to="../">
        <h2 className="bebas" style={{ margin: 0, paddingLeft: "20px" }}>
          Tweeter
        </h2>
      </Link>

      <a href="https://www.livingrent.org" target="_blank">
        <h3 className="bebas" style={{ margin: 0, paddingRight: "20px" }}>
          Living Rent
        </h3>
      </a>
    </div>
  );
};
