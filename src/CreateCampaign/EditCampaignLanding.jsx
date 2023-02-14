import { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { BtnStyle } from "../Shared";
import { useNavigate } from "react-router";
import { TopSecret } from "../TopSecret";
import { EditEmail } from "./EditEmail";
import { EditTweet } from "./EditTweet";
import axios from "axios";
import { API } from "../API";
import { useParams } from "react-router";

export const EditCampaignLanding = () => {

  const params = useParams();
  const campaignName = params.campaign;
  const [campaign, setCampaign] = useState({});

  console.log(campaign)

  const getCampaign = async () => {
    const campaign = await axios.get(
      API + '/' + campaignName
    );
    setCampaign(campaign.data);
  };
  useEffect(() => {
    getCampaign()
  }, campaignName)

  const [vanish, setVanish] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);


  

const handleSubmit = (e) => {
    e.preventDefault();
    if (password == TopSecret) {
      setLoggedIn(true);
    } else {
      setIncorrect(true);
    }
  };

  if (loggedIn) {
    return (
      <>
      {campaign.channel == "email" && <EditEmail campaign={campaign}/>}
      {campaign.channel == "tweet" && <EditTweet campaign={campaign}/>}
      </>
    );
  } else {

    return (
      <>
        <div className="landing" style={{ overFlowX: "hidden" }}>
          <div className={`landingContainerSmall ${vanish}`}>
            <div className="landingInner">
              <span className="bebas header header2">Log in to edit campaign: {campaignName}</span>

              <p>
                Only approved people can edit campaigns - just to stop
                landlords abusing our tool, ya see!
              </p>

              <center>
                <form>
                  <TextField
                    onSubmit={(e) => e.preventDefault()}
                    placeholder="Enter your password here"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(`${e.target.value}`)}
                    sx={{ marginTop: "3px", width: "230px" }}
                    InputProps={{
                      style: {
                        backgroundColor: "white",
                        maxWidth: "230px",
                      },
                    }}
                  ></TextField>
                  <br />
                  {incorrect && (
                    <em style={{ color: "red" }}>
                      <br />
                      Wrong password - try again!
                      <br />
                    </em>
                  )}
                  <br />
                  <Button onClick={(e) => handleSubmit(e)} sx={BtnStyle}>
                    Log in
                  </Button>
                </form>
              </center>
            </div>
          </div>
        </div>
      </>
    );

  }}
