import { useRef, useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { BtnStyle } from "./Shared";
import { PostCode } from "./PostCode";

export const Landing = () => {
  return (
    <div className="landing" style={{ overFlowX: "hidden" }}>
      <PostCode />
    </div>
  );
};
