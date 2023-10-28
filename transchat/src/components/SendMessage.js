import React, { useState } from 'react'
import { db, auth } from "../firebase"
import firebase from "firebase/compat/app";
import { Button } from '@mui/base';
import SendIcon from "@mui/icons-material/Send"
import { Grid, IconButton, TextField } from '@mui/material';

function SendMessage() {
  const [message, setMessage] = useState("");
  const SendMessage = (e) => {
    e.preventDefault();

    if (message === "") {
      return;
    }

    const { uid, photoURL } = auth.currentUser;

    db.collection("messages").add({
      text: message,
      photoURL,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
      .then(
        setMessage("")
      )
  };

  return (
    <div>
      <form onSubmit={SendMessage}>
        <div className='sendMsg'>
          <Grid container>
            <Grid item>
              <TextField
                id="standard-basic"
                variant="standard"
                label='Enter a message'
                type='text'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </Grid>
            <Grid item>
              <Button variant="outlined" color='primary'>
                <IconButton>
                  <SendIcon
                    color='primary'
                  />
                </IconButton>
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  )
}

export default SendMessage
