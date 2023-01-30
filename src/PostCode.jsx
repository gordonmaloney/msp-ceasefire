import { TextField, Button, FormLabel } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Tweetr } from "./Tweetr";
import { Emailer } from "./Emailer";

import { regions } from "./Data/REGIONS";
import { msps } from "./Data/MSPS";
import { handles } from "./Data/HANDLES";
import { BtnStyle, BtnStyleSmall } from "./Shared";
import { useParams } from "react-router-dom";

export const PostCode = ({ campaign }) => {
  const params = useParams();

  console.log(params.channel)
  const [channel, setChannel] = useState('')
  useEffect(() => {
    if (campaign?.channel) setChannel(campaign.channel)
    if (params?.channel) setChannel(params.channel)
  }, [campaign, params])

  const {target, name, hashtag, template, talkingPoints } = campaign || {target: '', channel: ''};



  const [postcode, setPostcode] = useState(null);

  const [gotPostcode, setGotPostcode] = useState(false);

  const [constituency, setConstituency] = useState(null);
  const [region, setRegion] = useState(null);
  const [constMSPs, setConstMSPs] = useState([]);

  const [invalid, setInvalid] = useState(false);

  const fetchPostcodeDeets = async () => {
    try {
      const response = await fetch(
        `https://api.postcodes.io/scotland/postcodes/${postcode}`
      );

      const data = await response.json();
      invalid && setInvalid(false);
      setConstituency(data.result.scottish_parliamentary_constituency);
    } catch {
      setInvalid(true);
      console.log("invalid postcode");
    }
  };

  useEffect(() => {
    if (constituency) {
      setRegion(
        regions.filter((region) => region.constituency == constituency)[0]
          .region
      );
    }
  }, [constituency]);

  useEffect(() => {
    setConstMSPs(
      msps.filter(
        (msp) => msp.constituency == constituency || msp.constituency == region
      )
    );
  }, [region]);

  //fade in
  const [fade, setFade] = useState("fadeIn");
  useEffect(() => {
    setFade("fadeFinished");
  }, []);

  return (
    <>
      <div className={`landing ${fade}`}>
        {!constituency && (!target || target == "msps") ? (
          <>
            <div className="landingContainerSmall">
              <span className="bebas header header2">
                {channel == "email" ? "Email your MSP" : "Tweet your MSP"}
              </span>
              <br />
              <br />
              <center>
                <FormLabel sx={{ color: "white" }}>
                  Enter your postcode to begin:
                </FormLabel>
                <br />
                <br />
                <TextField
                  autoFocus
                  id="postcodeInput"
                  sx={{
                    width: "75%",
                    border: invalid && "red 2px solid",
                    borderRadius: invalid && "5px",
                  }}
                  defaultValue={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  InputProps={{
                    style: {
                      backgroundColor: "white",
                    },
                  }}
                />
                {invalid && (
                  <h5>This postcode doesn't seem to be valid! Try again</h5>
                )}
                <br />
                <br />
                <Button sx={BtnStyle} onClick={() => fetchPostcodeDeets()}>
                  Draft your {channel == "email" ? "email" : "tweet"}
                </Button>
              </center>
            </div>
          </>
        ) : (
          <>
            <div className="landingContainer">
              {channel == "tweet" ? (
                <Tweetr
                  campaign={campaign}
                  constituency={constituency}
                  region={region}
                  setConstituency={() => setConstituency(null)}
                  constMSPs={constMSPs}
                  mspProp={
                    msps.filter((msp) => msp.constituency == constituency)[0]
                  }
                />
              ) : (
                <Emailer
                  campaign={campaign}
                  constituency={constituency}
                  region={region}
                  setConstituency={() => setConstituency(null)}
                  constMSPs={constMSPs}
                  mspProp={
                    msps.filter((msp) => msp.constituency == constituency)[0]
                  }
                />
              )}
            </div>
          </>
        )}
      </div>

      <br />
      <br />
    </>
  );
};
