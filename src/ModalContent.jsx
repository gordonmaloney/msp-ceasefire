import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { BtnStyleSmall } from "./Shared";
import { shareOnMobile } from "react-mobile-share";

//tooltip
import Tooltip from "@mui/material/Tooltip";
import { useEffect } from "react";

export const mobileStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  minWidth: "270px",
  bgcolor: "rgba(255,255,255,0.9)",
  border: "2px solid green",
  boxShadow: 20,
  p: 3,
  paddingBottom: 2,
};

export const ModalContent = () => {
  //tooltip
  const [tooltipOpen, setTooltipOpen] = useState(false);
  useEffect(() => {
    if (tooltipOpen) {
      setTimeout(() => {
        setTooltipOpen(false);
      }, 1000);
    }
  }, [tooltipOpen]);

  return (
    <div>
      <span className="bebas header header2" style={{ color: "black" }}>
        Build the power
      </span>

      <p>
        The more of us who message our elected representatives, the stronger our
        voice will be.
        <br />
        <br />
        Will you share the campaign link with some friends? The most effective
        way is to message people directly over WhatsApp or Messenger.
      </p>

      <TextField
        fullWidth
        className="notFlash"
        id="link"
        value={window.location}
        InputProps={{
          style: {
            backgroundColor: "white",
          },
        }}
      />
      <center>
        <Tooltip
          title="copied"
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
          open={tooltipOpen}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          placement="top"
          arrow
        >
          <Button
            onClick={() => {
              navigator.clipboard.writeText(window.location);
              setTooltipOpen(true);
            }}
            sx={{ ...BtnStyleSmall, marginBottom: "-30px" }}
          >
            Copy Link
          </Button>
        </Tooltip>
        <br />

        <Button
          sx={{ ...BtnStyleSmall, marginTop: "30px" }}
          className="showOnMob"
          onClick={() =>
            shareOnMobile({
              text: "Heya! Will you take a moment to tell your elected reps to stand with tenants?",
              url: window.location,
              title: "Tenant Shout",
            })
          }
        >
          Share
        </Button>
      </center>
    </div>
  );
};
