import {
  FormLabel,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { BtnStyle, BtnStyleSmall } from "./Shared";
import React from "react";
import { useEffect } from "react";
import { Tooltip } from "@mui/material";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import {API} from './API'

export const NewCampaign = () => {
  const [tweetBody, setTweetBody] = useState("");
  const [hashtag, setHashtag] = useState("#");
  const [target, setTarget] = useState("msps");
  const [customTarget, setCustomTarget] = useState("@");
  const [link, setLink] = useState("");

  const [shortLink, setShortLink] = useState("");
  const [uuid, setUuid] = useState("");

  const [links, setLinks] = useState();

  const [length, setLength] = useState(0);

  useEffect(() => {
    target == "msps" && setLength(tweetBody.length + hashtag.length + 2 + 21);

    target == "custom" &&
      setLength(
        tweetBody.length + hashtag.length + 2 + customTarget.length + 5
      );

    target == "none" && setLength(tweetBody.length + hashtag.length + 2);
  }, [tweetBody, hashtag, target, customTarget]);



  const getLinks = async () => {
    const links = await fetch(API + "all_links");
    const data = await links.json();
    setLinks(data);
  };


  useEffect(() => {
    const refreshUuid = async () => {
      const links = await fetch(API + "all_links");
      const data = await links.json();
      setUuid(data.length + "-" + Math.floor(Math.random() * 1000));
    };
    refreshUuid();
  }, [tweetBody, target, hashtag, customTarget]);

  useEffect(() => {
    getLinks();
  }, []);

  const createLink = async (short, long) => {
    console.log("creating: ", short, long);

    if (links.filter((datum) => datum.short == short).length == 0) {
      try {
        const link = await fetch(
          `${API}createlink?short=${short}&long=${long}`, {method: "POST"}
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

  return (
    <div className="landing">
      <div className="landingContainer">
        <span className="bebas header header2">Create a new campaign</span>

        <br />

        <div
          style={{
            textAlign: "right",
            color: `rgb(${255}, ${255 - (length - 250) * 10}, ${
              255 - (length - 250) * 10
            })`,
          }}
        >
          {length}/280
          <Tooltip
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "green",
                  "& .MuiTooltip-arrow": {
                    color: "green",
                  },
                },
              },
            }}
            placement="left"
            arrow
            title="This number includes a few things that get added after the tweet is generated, which is why it's longer than you'd expect."
          >
            <HelpCenterIcon sx={{ marginBottom: "-6px" }} />
          </Tooltip>
        </div>
        <FormLabel sx={{ color: "white" }}>
          <Tooltip
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "green",
                  "& .MuiTooltip-arrow": {
                    color: "green",
                  },
                },
              },
            }}
            placement="right"
            arrow
            title="Draft your tweet here - don't include hashtags or your target - they'll get added!"
          >
            <HelpCenterIcon sx={{ marginBottom: "-6px" }} />
          </Tooltip>
          Template tweet{" "}
        </FormLabel>
        <br />
        <TextField
          className={"notFlash"}
          fullWidth
          required
          id="user-tweet"
          multiline
          minRows={3}
          value={tweetBody}
          inputProps={{ maxLength: 280 - (length - tweetBody.length) }}
          onChange={(e) => {
            setTweetBody(`${e.target.value}`);
          }}
          InputProps={{
            style: {
              backgroundColor: "white",
            },
          }}
        />
        <br />

        <FormLabel sx={{ color: "white" }}>
          <Tooltip
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "green",
                  "& .MuiTooltip-arrow": {
                    color: "green",
                  },
                },
              },
            }}
            placement="right"
            arrow
            title="Your hashtag will be in all the tweets sent using this tool - it will help you analyse performance and see how people are using it."
          >
            <HelpCenterIcon sx={{ marginBottom: "-6px" }} />
          </Tooltip>
          Hashtag
        </FormLabel>
        <br />
        <TextField
          className="notFlash"
          fullWidth
          id="hashtag"
          value={hashtag}
          InputProps={{
            style: {
              backgroundColor: "white",
            },
          }}
          inputProps={{ maxLength: 280 - (length - hashtag.length + 1) }}
          onChange={(e) =>
            setHashtag(
              `${e.target.value[0] !== "#" ? "#" : ""}${e.target.value}`
            )
          }
        />

        <br />
        <FormLabel sx={{ color: "white" }}>
          <Tooltip
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "green",
                  "& .MuiTooltip-arrow": {
                    color: "green",
                  },
                },
              },
            }}
            sx={{ backgroundColor: "green" }}
            placement="right"
            arrow
            title="Choose your target (if you want one!). If you pick MSPs, it will filter by postcode so users only message their own MSPs."
          >
            <HelpCenterIcon sx={{ marginBottom: "-6px" }} />
          </Tooltip>
          Pick a target
        </FormLabel>
        <br />
        <Select
          value={target}
          className="notFlash"
          onChange={(e) => setTarget(e.target.value)}
          sx={{
            backgroundColor: "white",
            marginTop: "3px",
            marginBottom: "5px",
            marginLeft: "5px",

            width: target == "custom" ? "40px" : "100px",
            color: target == "custom" ? "transparent" : "black",
            transition: "0s !important",

            "& .MuiInputBase-input": {
              padding: "11.5px",
              paddingLeft: "10px",
              paddingRight: "0",
            },
          }}
        >
          <MenuItem value="msps">MSPs</MenuItem>
          <MenuItem value="custom">Custom</MenuItem>
          <MenuItem value="none">None</MenuItem>
        </Select>

        {target == "custom" && (
          <>
            {" "}
            <TextField
              id="customTarget"
              value={customTarget}
              onChange={(e) =>
                setCustomTarget(
                  `${e.target.value[0] !== "@" ? "@" : ""}${e.target.value}`
                )
              }
              sx={{ marginTop: "3px", width: "230px" }}
              InputProps={{
                style: {
                  backgroundColor: "white",
                  maxWidth: "230px",
                },
              }}
              inputProps={{
                maxLength: 280 - (length - customTarget.length + 1),
              }}
            ></TextField>
          </>
        )}

        <br />
        <br />

        <center>
          <Button
            disabled={length > 280}
            sx={BtnStyle}
            onClick={() => {
              const newLink =
                "/" +
                (target !== "custom"
                  ? encodeURIComponent(target.replace("@", ""))
                  : encodeURIComponent(customTarget.replace("@", ""))) +
                "/" +
                encodeURIComponent(hashtag.replace("#", "")) +
                "/" +
                encodeURIComponent(tweetBody);
              link !== newLink && setLink(newLink);
              link !== newLink && createLink(uuid, newLink);
            }}
          >
            Generate link
          </Button>
          <br />
          <br />
          <Button
            disabled={length > 280}
            sx={BtnStyle}
            href={
              "https://twitter.com/intent/tweet?text=" +
              encodeURIComponent(
                (target == "msps"
                  ? "Hi @PatrickHarvie, "
                  : target == "custom"
                  ? `Hi @${customTarget.replace("@", "")}, `
                  : ``) +
                  tweetBody +
                  " #" +
                  hashtag.replace("#", "")
              )
            }
            target="_blank"
          >
            Preview tweet
          </Button>
        </center>

        {link && (
          <>
            <br />

            <TextField
              fullWidth
              className="notFlash"
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
    </div>
  );
};
