import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { BtnStyle } from "../Shared";
import { useNavigate } from "react-router";
import { TopSecret } from "../TopSecret";
import { CreateEmail } from "./CreateEmail";
import { CreateTweet } from "./CreateTweet";

export const CreateCampaignLanding = () => {
  const navigate = useNavigate();

  const [vanish, setVanish] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);

  const [show, setShow] = useState("");

  const handleEmail = () => {
    setVanish("vanishLeft");
    setTimeout(() => {
      setShow("email");
      //navigate("../create/email");
    }, 500);
  };
  const handleTweet = () => {
    setVanish("vanishRight");
    setTimeout(() => {
      setShow("tweet");
      //navigate("../create/tweet");
    }, 500);
  };
  

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
      {show == "" &&
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
      </div>} 
      {show == "email" && <CreateEmail />}
      {show == "tweet" && <CreateTweet />}
      </>
    );
  } else {

    return (
      <>

      {show == "" && 
        <div className="landing" style={{ overFlowX: "hidden" }}>
          <div className={`landingContainerSmall ${vanish}`}>
            <div className="landingInner">
              <span className="bebas header header2">Log in</span>

              <p>
                Only approved people can create campaigns - just to stop
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
  }

      </>
    );

  }}
