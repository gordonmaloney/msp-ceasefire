import { Button, FormLabel, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { useState } from "react";
import { handles } from "./Data/HANDLES";
import { BtnStyle, BtnStyleSmall } from "./Shared";

import { useParams } from "react-router-dom";

//accordion imports
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { msps } from "./Data/MSPS";

//modal imports
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ModalContent } from "./ModalContent";
import { mobileStyle } from "./ModalContent";
import { EDINBURGHCLLRS } from "./Data/EDINBURGHCLLRS";

export const Tweetr = ({
  campaign,
  mspProp,
  constMSPs,
  constituency,
  region,
  setConstituency,
  ward,
  cllrs,
}) => {
  const params = useParams();

  const template =
    campaign?.template ||
    "what's happening in Gaza is a genocide. We urgently need a ceasefire and an end to Scottish and UK arms sales to Israel. What are you doing to demand that?";

  const [target, setTarget] = useState(campaign?.target);

  const [mspHandle, setMspHandle] = useState("");
  const [tweetBody, setTweetBody] = useState("");
  const [msp, setMsp] = useState(mspProp);

  const [targetCllrs, setTargetCllrs] = useState([]);

  let Parties = ["SNP", "Labour", "Tory", "LibDem", "Green"];

  useEffect(() => {
    (!target || target == "msps" || Parties.includes(target)) &&
      setMspHandle(handles.filter((hand) => hand.name == msp.name)[0].handle);

    target == "Edinburgh" &&
      setMspHandle(targetCllrs.map((cllr) => cllr.twitter).join(", "));

    target &&
      !Parties.includes(target) &&
      target !== "msps" &&
      target !== "Edinburgh" &&
      target !== "none" &&
      setMspHandle("@" + target);
  }, [msp, mspProp, constMSPs, targetCllrs]);

  useEffect(() => {
    target !== "none"
      ? setTweetBody(`Hi ${mspHandle}, ` + template)
      : setTweetBody(template);
  }, [mspHandle]);

  useEffect(() => {
    if (target && target == "Edinburgh") {
      setTargetCllrs(cllrs.filter((cllr) => cllr.twitter !== "none"));
    }
  }, [target, cllrs, ward]);

  const [flash, setFlash] = useState("");
  const refresh = () => {
    window.scrollTo(0, 0);
    setFlash("flash");
    setTimeout(() => {
      setFlash("");
    }, 1000);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const openModal = () => {
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  };

  const handleSend = () => {
    const sendLink = `https://twitter.com/intent/tweet?text=${tweetBody
      .replace("#", "%23")
      .replace(/\n/g, "%0A")}`;

    const width = 550;
    const height = 400;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    const windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;

    window.open(sendLink, "twitter", windowFeatures);

    handleOpen();
  };

  return (
    <div>
      <span className="bebas header header2">Tweet your MSP</span>
      {(target == "msps" || !target || Parties.includes(target)) && (
        <>
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
      {target == "Edinburgh" && (
        <>
          <br />
          <br /> It looks like you live in <b>{ward}</b>. If that's wrong,{" "}
          <span onClick={() => setConstituency()} style={{ cursor: "pointer" }}>
            <u>click here to go back.</u>
          </span>
        </>
      )}
      {mspHandle !== "none" ? (
        <>
          {target == "msps" || !target || Parties.includes(target) ? (
            <span>
              <br />
              <br />
              You're tweeting:{" "}
              <b>
                {msp.name} - {msp.party}
              </b>
            </span>
          ) : target == "none" ? (
            <></>
          ) : target == "Edinburgh" ? (
            <>
              <br />
              <br />
              You're tweeing{" "}
              {targetCllrs.map((cllr, idx) => (
                <>
                  <b>
                    {cllr.name} - {cllr.party}
                  </b>
                  {idx == targetCllrs.length - 1
                    ? " "
                    : idx == targetCllrs.length - 2
                    ? " and "
                    : ", "}
                </>
              ))}
              <br />
              <br />
              <em>
                Note - not all councillors use Twitter, which is why you might
                not see all of yours here.
              </em>
            </>
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
            inputProps={{ maxLength: 280 }}
            onChange={(e) => setTweetBody(e.target.value)}
            InputProps={{
              style: {
                backgroundColor: "white",
              },
            }}
          />
          <div
            style={{
              textAlign: "right",
              color: `rgb(${255}, ${255 - tweetBody.length * 10}, ${
                255 - tweetBody.length * 10
              })`,
            }}
          >
            {tweetBody.length}/280
          </div>
        </>
      ) : (
        <>It looks like this MSP isn't on Twitter.</>
      )}
      <center>
        <Button sx={BtnStyle} target="_blank" onClick={handleSend}>
          Send Tweet
        </Button>
      </center>
      <br />
      <br />
      {(!target || target == "msps") && (
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
            <AccordionDetails sx={{ marginTop: "-30px", paddingX: "10px" }}>
              <p>
                Each area in Scotland is represented by multiple MSPs. One for
                the constituency, and several for the list. By default, this
                tool targets your constituency MSP, but you can choose to tweet
                a different one by selecting them from the list:
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
                      sx={{ width: "120px", cursor: "pointer" }}
                      onClick={() => {
                        handles.filter((hand) => hand.name == filtMsp.name)[0]
                          .handle !== "none" && setMsp(filtMsp);
                        refresh();
                      }}
                    >
                      <b>{filtMsp.name}</b>
                      <br />
                      {filtMsp.party}
                      <br />
                      {handles.filter((hand) => hand.name == filtMsp.name)[0]
                        .handle !== "none" ? (
                        <Button
                          sx={{
                            ...BtnStyleSmall,
                            fontSize: "small",
                            paddingX: "4px",
                            paddingTop: "2px",
                          }}
                          onClick={() => {
                            handles.filter(
                              (hand) => hand.name == filtMsp.name
                            )[0].handle !== "none" && setMsp(filtMsp);
                            refresh();
                          }}
                        >
                          {
                            handles.filter(
                              (hand) => hand.name == filtMsp.name
                            )[0].handle
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
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={mobileStyle}>
          <span
            style={{
              float: "right",
              marginTop: "-23px",
              marginRight: "-20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpen(false);
            }}
          >
            x
          </span>
          <ModalContent setOpen={setOpen} />
        </Box>
      </Modal>
    </div>
  );
};
