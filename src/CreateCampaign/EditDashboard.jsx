import React from "react";
import { Grid, Button } from "@mui/material";
import { BtnStyleSmall } from "../Shared";
import { Link } from "react-router-dom";

export const EditDashboard = ({ campaigns }) => {
  const campaignReverse = [...campaigns].reverse();

  return (
    <div className="landingContainerSmall">
      <div className="landingInner">
        <span className="bebas header header2">Edit an existing campaign</span>

        <br />
        <br />
        {campaignReverse.length > 0 ? (
          <Grid container>
            {campaignReverse.map((camp) => {
              let date = new Date(camp.createdAt);

              return (
                <Grid item xs={12} style={{ fontSize: "large" }}>
                  <div className="hoverCampBox">
                    <Grid
                      container
                      alignItems="center"
                      sx={{ padding: "15px" }}
                    >
                      <Grid item xs={10}>
                        Campaign name: <b>{camp.name}</b>
                        <br />
                        Channel: <b>{camp.channel}</b>
                        <br />
                        Created:{" "}
                        <b>
                          {date.toLocaleTimeString("en-UK", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          - {date.toLocaleDateString("en-UK")}
                        </b>
                        <br />
                        Link:{" "}
                        <b>
                          <Link to={`../campaign/${camp.name}`}>
                          {window.location.host}/campaign/{camp.name}
                          </Link>
                        </b>
                      </Grid>
                      <Grid item xs={2}>
                        <center>
                          <Link to={`../campaign/${camp.name}/edit`}>
                            <Button sx={BtnStyleSmall}>EDIT</Button>
                          </Link>
                        </center>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <>Loading...</>
        )}
      </div>
    </div>
  );
};
