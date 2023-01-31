import { useState } from "react";
import { Button, Grid } from "@mui/material";
import { BtnStyle } from "../Shared";
import { useNavigate } from "react-router";

export const CreateCampaignLanding = () => {
  const navigate = useNavigate();

  const [vanish, setVanish] = useState("");

  const handleEmail = () => {
    setVanish("vanishLeft");
    setTimeout(() => {
      navigate("../create/email");
    }, 500);
  };
  const handleTweet = () => {
    setVanish("vanishRight");
    setTimeout(() => {
      navigate("../create/tweet");
    }, 500);
  };


  return (
    <div className="landing" style={{ overFlowX: "hidden" }}>
      <div className={`landingContainerSmall ${vanish}`}>
        <div className="landingInner">
          <span className="bebas header header2">Create a campaign</span>

          <p>Use the buttons below to start building your campaign:</p>

          <Grid spacing={3} container justifyContent={"space-around"}>
            <Grid item>
              {" "}
              <Button onClick={handleTweet} sx={BtnStyle}>
                Tweet campaign
              </Button>
            </Grid>
            <Grid item>
              {" "}
              <Button onClick={handleEmail} sx={BtnStyle}>
                Email campaign
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
