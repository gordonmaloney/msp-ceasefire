import { FormLabel, TextField, Button } from "@mui/material";
import { useState } from "react";
import { BtnStyle, BtnStyleSmall } from "./Shared";
import React from "react";

export const NewCampaign = () => {
  const [tweetBody, setTweetBody] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [link, setLink] = useState("");

  return (
    <div
      className="landingContainer"
      style={{
        width: "60%",
        minWidth: "250px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "25vh",
      }}
    >
      <span className="bebas header header2">Create a new campaign</span>

      <br />
      <FormLabel sx={{ color: "white" }}>Template tweet</FormLabel>
      <br />
      <TextField
        className={"notFlash"}
        fullWidth
        required
        id="user-tweet"
        multiline
        minRows={3}
        defaultValue={tweetBody}
        inputProps={{ maxLength: 280 - (hashtag.length + 2) }}
        onChange={(e) => setTweetBody(e.target.value)}
        InputProps={{
          style: {
            backgroundColor: "white",
          },
        }}
      />
      <br />

      <FormLabel sx={{ color: "white" }}>Hashtag</FormLabel>
      <br />
      <TextField
        className="notFlash"
        fullWidth
        id="hashtag"
        defaultValue={"#" + hashtag}
        InputProps={{
          style: {
            backgroundColor: "white",
          },
        }}
        onChange={(e) => setHashtag(e.target.value)}
      />

      <br />
      <br />

      <center>
        <Button
          sx={BtnStyle}
          onClick={() => {
            setLink(
             (window.location.origin +
                "/" +
                encodeURIComponent(hashtag.replace("#", "")) +
                "/" +
                encodeURIComponent(tweetBody))
            );
          }}
        >
          Generate link
        </Button>
      </center>

      {link && (
        <>
          <br />

          <TextField
            className="notFlash"
            fullWidth
            id="link"
            defaultValue={link}
            InputProps={{
              style: {
                backgroundColor: "white",
              },
            }}
          />
          <center>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
              }}
              sx={BtnStyleSmall}
            >
              Copy
            </Button>
          </center>
        </>
      )}
    </div>
  );
};
