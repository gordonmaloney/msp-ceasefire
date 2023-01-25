import { Button, FormLabel, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { useState } from "react";
import { handles } from "./HANDLES";
import { BtnStyle, BtnStyleSmall } from "./Shared";

import { useParams } from "react-router-dom";

//accordion imports
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { msps } from "./MSPS";

export const Tweetr = ({
  mspProp,
  constMSPs,
  constituency,
  region,
  setConstituency,
}) => {
  const params = useParams();

  const hashtag = "#" + (params.hashtag || "RentControlsNow");
  const template = params.template || "what are you doing for tenants? ";

  const { target } = params;

  const [mspHandle, setMspHandle] = useState("");
  const [tweetBody, setTweetBody] = useState("");
  const [msp, setMsp] = useState(mspProp);

  useEffect(() => {
    (!target || target == "msps") &&
      setMspHandle(handles.filter((hand) => hand.msp == msp.msp)[0].handle);
    target &&
      target !== "msps" &&
      target !== "none" &&
      setMspHandle("@" + target);
  }, [msp, mspProp, constMSPs]);

  useEffect(() => {
    target !== "none"
      ? setTweetBody(`Hi ${mspHandle}, ` + template)
      : setTweetBody(template);
  }, [mspHandle]);

  const [flash, setFlash] = useState("");
  const refresh = () => {
    window.scrollTo(0, 0);
    setFlash("flash");
    setTimeout(() => {
      setFlash("");
    }, 1000);
  };

  return (
    <div>
      <span className="bebas header header2">
        {target == "msps" ? "Tweet your MSP" : "Write your tweet"}
      </span>
      {(target == "msps" || !target) && (
        <>
          <br />
          <br /> It looks like you live in{" "}
          <b>
            {constituency}, {region}
          </b>
          . If that's wrong,{" "}
          <span onClick={() => setConstituency()} style={{ cursor: "pointer" }}>
            <u>click here to go back.</u>
          </span>
        </>
      )}
      {mspHandle !== "none" ? (
        <>
          {target == "msps" || !target ? (
            <span>
              <br />
              <br />
              You're tweeting:{" "}
              <b>
                {msp.msp}, {msp.party}
              </b>
            </span>
          ) : target == "none" ? (
            <></>
          ) : (
            <>
              <br />
              <br />
              You're tweeting <b>@{target}</b>
            </>
          )}
          <br />
          <br />
          <FormLabel sx={{ color: "white" }}>Your tweet</FormLabel>
          <br />
          <TextField
            className={flash == "flash" ? "flash" : "notFlash"}
            fullWidth
            required
            id="user-tweet"
            multiline
            minRows={3}
            value={tweetBody}
            inputProps={{ maxLength: 280 - (hashtag.length + 2) }}
            onChange={(e) => setTweetBody(e.target.value)}
            InputProps={{
              style: {
                backgroundColor: "white",
              },
            }}
          />
          <TextField
            disabled
            className="notFlash"
            fullWidth
            id="hashtag"
            defaultValue={hashtag}
            InputProps={{
              style: {
                backgroundColor: "white",
              },
            }}
          />
          <div
            style={{
              textAlign: "right",
              color: `rgb(${255}, ${
                255 - (tweetBody.length + hashtag.length - 250) * 10
              }, ${255 - (tweetBody.length + hashtag.length - 250) * 10})`,
            }}
          >
            {tweetBody.length + hashtag.length + 2}/280
          </div>
        </>
      ) : (
        <>It looks like this MSP isn't on Twitter.</>
      )}
      <br />
      <br />
      <center>
        <Button
          sx={BtnStyle}
          target="_blank"
          href={`https://twitter.com/intent/tweet?text=${(
            tweetBody +
            " " +
            hashtag
          )
            .replace("#", "%23")
            .replace(/\n/g, "%0A")}`}
        >
          Send Tweet
        </Button>
      </center>
      <br />
      <br />
      <div style={{ marginLeft: "10px" }}>
        <Accordion
          className="otherMSPs"
          sx={{ backgroundColor: "rgba(255,255,255,0.9)" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="details"
            sx={{ padding: "0px" }}
          >
            <div
              className="bebas header3 header"
              style={{ color: "black", marginLeft: "10px" }}
            >
              Your other MSPs:
            </div>{" "}
          </AccordionSummary>
          <AccordionDetails sx={{ paddingTop: "-20px", paddingX: "10px" }}>
            <p>
              Each area in Scotland is represented by multiple MSPs. One for the
              constituency, and several for the list. By default, this tool
              targets your constituency MSP, but you can choose to tweet a
              different one by selecting them from the list:
              <br />
              <br />
              <Grid
                container
                spacing={2}
                sx={{ justifyContent: "space-around" }}
              >
                {constMSPs.map((filtMsp) => (
                  <Grid
                    item
                    sx={{ width: "120px", cursor: 'pointer' }}
                    onClick={() => {
                      handles.filter((hand) => hand.msp == filtMsp.msp)[0]
                        .handle !== "none" && setMsp(filtMsp);
                      refresh();
                    }}
                  >
                    <b>{filtMsp.msp}</b>
                    <br />
                    {filtMsp.party}
                    <br />
                    {handles.filter((hand) => hand.msp == filtMsp.msp)[0]
                      .handle !== "none" ? (
                      <Button
                        sx={{
                          ...BtnStyleSmall,
                          fontSize: "small",
                          paddingX: "4px",
                          paddingTop: "2px",
                        }}
                        onClick={() => {
                          handles.filter((hand) => hand.msp == filtMsp.msp)[0]
                            .handle !== "none" && setMsp(filtMsp);
                          refresh();
                        }}
                      >
                        {
                          handles.filter((hand) => hand.msp == filtMsp.msp)[0]
                            .handle
                        }
                      </Button>
                    ) : (
                      "It looks like this MSP is not on twitter"
                    )}
                  </Grid>
                ))}
              </Grid>
            </p>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
