import { TextField, Button, FormLabel } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Tweetr } from "./Tweetr";

import { regions } from "./Data/REGIONS";
import { msps } from "./Data/MSPS";
import { handles } from "./Data/HANDLES";
import { BtnStyle, BtnStyleSmall } from "./Shared";
import { useParams } from "react-router-dom";


export const PostCode = ({ campaign }) => {
  const params = useParams();

  const channel = "twitter"

  const { target, name, hashtag, template, talkingPoints } = campaign || {
    target: "",
    channel: "",
  };

  const [postcode, setPostcode] = useState(null);

  const [gotPostcode, setGotPostcode] = useState(false);

  const [constituency, setConstituency] = useState(null);
  const [ward, setWard] = useState(null);
  const [region, setRegion] = useState(null);
  const [constMSPs, setConstMSPs] = useState([]);
  const [cllrs, setCllrs] = useState([]);

  const [invalid, setInvalid] = useState(false);

  const fetchPostcodeDeets = async () => {
    try {
      const response = await fetch(
        `https://api.postcodes.io/scotland/postcodes/${postcode}`
      );

      const wardResponse = await fetch(
        `https://api.postcodes.io/postcodes/${postcode}`
      );

      const data = await response.json();
      const wardData = await wardResponse.json();

      setConstituency(data.result.scottish_parliamentary_constituency);
    } catch {
      setInvalid(true);
      console.log("invalid postcode");
    }
  };



  useEffect(() => {
    invalid && setInvalid(false)
    if (constituency) {
      setRegion(
        regions.filter((region) => region.constituency == constituency)[0]
          .region
      );
    }
  }, [constituency]);

  let Parties = ["SNP", "Labour", "Tory", "LibDem", "Green"];

  useEffect(() => {
    if (Parties.includes(target)) {
      let partyMSPs = msps
        .filter(
          (msp) =>
            msp.constituency == constituency || msp.constituency == region
        )
        .filter((msp) => msp.party == target);
      setConstMSPs(partyMSPs);
      if (partyMSPs.length == 0) setInvalid(true)
    } else {
      let tempConstMSPs = msps.filter(
        (msp) => msp.constituency == constituency || msp.constituency == region
      );
      setConstMSPs(tempConstMSPs);
    }
  }, [region, constituency]);

  //fade in
  const [fade, setFade] = useState("fadeIn");
  useEffect(() => {
    setFade("fadeFinished");
  }, []);



  return (
    <>
      <div className={`landing ${fade}`}>
        {invalid ||
        (region && constMSPs.length == 0) ||
        (!constituency &&
          (!target ||
            target == "msps" ||
            Parties.includes(target))) ? (
          <>
            <div className="landingContainerSmall">
              <span className="bebas header header2">
                DEMAND YOUR MSP CALLS FOR A CEASEFIRE
              </span>
              <br />
              <center>
                <p>Use this tool to message your MSPs on Twitter/X and demand they back a ceasefire in Gaza, and an end to UK and Scottish arms sales to Israel.</p>
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
                  <h5 style={{ marginBottom: "-10px" }}>
                    This postcode doesn't seem to be valid!
                    <br />
                    <br />
                    That might be because this campaign is only targeting people
                    in a specific area, or because you don't have any
                    representatives from the party it's targeting. If you think
                    that's wrong then try again.
                  </h5>
                )}
                <br />
                <br />
                <Button sx={BtnStyle} onClick={() => fetchPostcodeDeets()}>
                  Send your {channel == "email" ? "email" : "tweet"}
                </Button>
              </center>
            </div>
          </>
        ) : (
          <>
            <div className="landingContainer">
              {channel == "twitter" ? (
                <Tweetr
                  campaign={campaign}
                  constituency={constituency}
                  region={region}
                  ward={ward}
                  cllrs={cllrs}
                  setConstituency={() => setConstituency(null)}
                  constMSPs={constMSPs}
                  mspProp={
                    msps.filter((msp) => msp.constituency == constituency)[0]
                  }
                />
              ) : <></>}
            </div>
          </>
        )}
      </div>

      <br />
      <br />
    </>
  );
};
