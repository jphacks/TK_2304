import React, { useState } from "react";
import { db, auth } from "../firebase";
import firebase from "firebase/compat/app";
import { Button } from "@mui/base";
import SendIcon from "@mui/icons-material/Send";
import {
  Container,
  Grid,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ApiKey from "../ApiKey";
import MessageSuggestion from "./MessageSuggestion";

//function to fix the translated text
function decodeHTMLEntities(text) {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(text, "text/html").body
    .textContent;
  return decodedString;
}

function SendMessage() {
  const [message, setMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("ja"); // Default to Japanese

  //for selecting your own language
  const handleLanguageChange = (event, newLanguage) => {
    if (newLanguage !== null) {
      setSelectedLanguage(newLanguage);
    }
  };

  const SendMessage = (e) => {
    e.preventDefault();

    if (message === "") {
      setMessage("");
      return;
    }

    const { uid, photoURL } = auth.currentUser;

    //翻訳機能
    let language = selectedLanguage;
    let toLang;
    let fromLang = selectedLanguage;
    if (selectedLanguage === "ja") toLang = "en";
    else toLang = "ja";
    let apiKey = ApiKey();
    var translation = "unable to translate";
    const URL =
      "https://translation.googleapis.com/language/translate/v2?key=" +
      apiKey +
      "&q=" +
      encodeURI(message) +
      "&source=" +
      fromLang +
      "&target=" +
      toLang;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", [URL], false);
    xhr.send();
    if (xhr.status === 200) {
      const res = JSON.parse(xhr.responseText);
      translation = res["data"]["translations"][0]["translatedText"];
      translation = decodeHTMLEntities(translation);
    }

    db.collection("messages")
      .add({
        text: message,
        language,
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
          <div>
            <MessageSuggestion></MessageSuggestion>
          </div>
          <Grid container>
            <Grid
              item
              xs={3}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "1rem",
                  alignItems: "flex-end",
                }}
              >
                Language/言語:
              </p>
              <ToggleButtonGroup
                exclusive
                value={selectedLanguage}
                onChange={handleLanguageChange}
                size="small"
              >
                <ToggleButton value="ja">JP</ToggleButton>
                <ToggleButton value="en">EN</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={8}>
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
