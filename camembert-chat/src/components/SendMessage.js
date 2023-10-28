import React, { useState } from 'react'
import { db, auth } from "../firebase"
import firebase from "firebase/compat/app";
import { Button } from '@mui/base';
import SendIcon from "@mui/icons-material/Send"
import { Container, Grid, IconButton, TextField } from '@mui/material';

function SendMessage() {
  const [message, setMessage] = useState("");
  const SendMessage = (e) => {
    e.preventDefault();

    if (message === "") {
      setMessage("");
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

  let text = "明日天気になーれ"
  let fromLang = 'ja'
  let toLang = 'en'
  let apiKey = "";

  // 翻訳
  const URL = "https://translation.googleapis.com/language/translate/v2?key=" + apiKey +
    "&q=" + encodeURI(text) + "&source=" + fromLang + "&target=" + toLang
  let xhr = new XMLHttpRequest()
  xhr.open('POST', [URL], false)
  xhr.send();
  if (xhr.status === 200) {
    const res = JSON.parse(xhr.responseText);
    alert(res["data"]["translations"][0]["translatedText"])
  }

  return (
    <div>
      <form onSubmit={SendMessage}>
        <div className='sendMsg'>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <TextField
                id="standard-basic"
                variant="standard"
                label='Enter a message'
                type='text'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={SendMessage}>
                <SendIcon
                  color='primary'
                />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  )
}

export default SendMessage
