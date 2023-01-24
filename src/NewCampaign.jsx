import { FormLabel, TextField, Button } from "@mui/material";
import { useState } from "react";
import { BtnStyle, BtnStyleSmall } from "./Shared";
import React from "react";
import { useEffect } from "react";

export const NewCampaign = () => {
  const [tweetBody, setTweetBody] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [link, setLink] = useState("");

  const [shortLink, setShortLink] = useState("");
  const [uuid, setUuid] = useState('');


  const [links, setLinks] = useState();

  const API = 'https://python-shortlinkr.onrender.com/'

  const getLinks = async () => {
    const links = await fetch(API + "all_links");
    const data = await links.json();
    setLinks(data)
    setUuid(data.length + "-" + Math.floor(Math.random() * 1000));
  }

  useEffect(() => {
    getLinks()
  }, [])

  const createLink = async (short, long) => {
    console.log('creating: ', short, long)

    if (links.filter((datum) => datum.short == short).length == 0) {
      try {
        const link = await fetch(
          `${API}createlink?short=${short}&long=${long}`
        );
        const data = await link.json();
        console.log(data);
        setShortLink(window.location.host + "/" + data.short);
      } catch {
        console.log("something has gone wrong");
      }
    } else {
      return "Shortlink already in use";
    }
  };


  console.log(uuid);

  const newShortUrl = uuid
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
              "/" +
                encodeURIComponent(hashtag.replace("#", "")) +
                "/" +
                encodeURIComponent(tweetBody)
            );
            createLink(
              uuid,
              "/" +
                encodeURIComponent(hashtag.replace("#", "")) +
                "/" +
                encodeURIComponent(tweetBody)
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
            value={shortLink}
            InputProps={{
              style: {
                backgroundColor: "white",
              },
            }}
          />
          <center>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(shortLink);
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
