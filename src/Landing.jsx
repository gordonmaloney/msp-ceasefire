import {useState} from "react";
import { Button, Grid } from "@mui/material";
import { BtnStyle } from "./Shared";
import { useNavigate } from "react-router";

export const Landing = () => {
  const navigate = useNavigate();

    const [vanish, setVanish] = useState('')


    const handleEmail = () => {
        setVanish('vanishLeft')
        setTimeout(() => {
            navigate('../email')
        }, 500)
    }
    const handleTweet = () => {
        setVanish('vanishRight')
        setTimeout(() => {
            navigate('../tweet')
        }, 500)
    }
  return (
    <div className="landing" style={{overFlowX: 'hidden'}}>
      <div className={`landingContainerSmall ${vanish}`}>
        <div className="landingInner">
          <span className="bebas header header2">Raise your voice</span>

          <p>
            This is a tool for Living Rent members and allies to make demands of
            our elected representatives. Use the buttons below to start:
          </p>

          <Grid container justifyContent={"space-between"}>
            <Grid item>
              {" "}
              <Button onClick={handleTweet} sx={BtnStyle}>
                Tweet your MSPs
              </Button>
            </Grid>
            <Grid item>
              {" "}
              <Button onClick={handleEmail} sx={BtnStyle}>
                Email your MSPs
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
