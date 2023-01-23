import { TextField, Button, FormLabel } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Tweetr } from "./Tweetr";
import { regions } from "./REGIONS";
import { msps } from "./MSPS";
import { handles } from "./HANDLES";
import { BtnStyle, BtnStyleSmall } from "./Shared";

export const PostCode = () => {
  const [postcode, setPostcode] = useState(null);

  const [gotPostcode, setGotPostcode] = useState(false);

  const [constituency, setConstituency] = useState(null);
  const [region, setRegion] = useState(null);
  const [constMSPs, setConstMSPs] = useState([]);

  const fetchPostcodeDeets = async () => {
    const response = await fetch(
      `https://api.postcodes.io/scotland/postcodes/${postcode}`
    );

    const data = await response.json();
    setConstituency(data.result.scottish_parliamentary_constituency);
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

  return (
    <div>
      {!constituency ? (
        <>
          <div
            className="landingContainer"
            style={{
              width: "60%",
              minWidth: "250px",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: '25vh'
            }}
          >
            <span className="bebas header header2">Tweet your MSP</span>
            <br />
            <br />
            <center>
              <FormLabel sx={{ color: "white" }}>
                Enter your postcode to begin:
              </FormLabel>
              <br />
              <br />
              <TextField
                id="postcodeInput"
                sx={{ width: "75%" }}
                defaultValue={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                InputProps={{
                  style: {
                    backgroundColor: "white",
                  },
                }}
              />

              <br />
              <br />
              <Button sx={BtnStyle} onClick={() => fetchPostcodeDeets()}>
                Draft your tweet
              </Button>
            </center>
          </div>
        </>
      ) : (
        <>
          <div
            className="landingContainer"
            style={{
              marginTop: "20px",
              width: "60%",
              minWidth: "240px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
   
            <Tweetr
              constituency={constituency}
              region={region}
              setConstituency={() => setConstituency(null)}
              constMSPs={constMSPs}
              msp={
                msps.filter((msp) => msp.constituency == constituency)[0].msp
              }
            />
          </div>
        </>
      )}
    </div>
  );
};
