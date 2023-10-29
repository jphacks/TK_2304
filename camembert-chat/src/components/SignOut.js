import { Button, Grid } from "@mui/material";
import React from "react";
import { auth } from "../firebase";

function SignOut() {
  return (
    <div className="header">
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <h3 align="center" style={{ fontFamily: "system-ui" }}>
            {auth.currentUser.displayName}
          </h3>
        </Grid>
        <Grid item xs={3}>
          <Button
            style={{ color: "black", fontSize: "16px", marginTop: "10px" }}
            onClick={() => auth.signOut()}
          >
            Sign out
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignOut;
