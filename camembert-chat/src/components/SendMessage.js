import React, { useState } from "react";
import { db, auth } from "../firebase";
import firebase from "firebase/compat/app";
import { Button } from "@mui/base";
import SendIcon from "@mui/icons-material/Send";
import { Container, Grid, IconButton, TextField } from "@mui/material";

function SendMessage() {
  const [message, translation, setMessage] = useState("");
  const SendMessage = (e) => {
    e.preventDefault();

    if (message === "") {
      setMessage("");
      return;
    }

    const { uid, photoURL } = auth.currentUser;

    const translation = "hi"; //ここにtranslationを入力できるようにする

    db.collection("messages")
      .add({
        text: message,
        photoURL,
        uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        translation,
      })
      .then(setMessage(""));
  };

  return (
    <div>
      <form onSubmit={SendMessage}>
        <div className="sendMsg">
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <TextField
                id="standard-basic"
                variant="standard"
                label="Enter a message"
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={SendMessage}>
                <SendIcon color="primary" />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
}

export default SendMessage;
