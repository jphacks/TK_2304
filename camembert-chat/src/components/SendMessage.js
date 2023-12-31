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
import TranslateApi from "../TranslateApi";
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

  const dict = { fr: "まじで?", wyd: "何してるん？", lmao: "www", af: "間違いない", lol: "笑", idk: "知らんがな", gg: "ナイスゲーム", brb: "すぐ帰る", ily: "愛してる♡", jk: "冗談冗談", np: "大丈夫", nw: "大丈夫", omg: "やば", omw: "もうすぐ着く", rly: "ほんと？", ty: "あざっす", ik: "そうだね", lil: "ちっちゃい" };

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
    let apiKey = TranslateApi();
    var translation = "unable to translate";
    const lower_case_msg = message.toLowerCase();
    if (dict[lower_case_msg] && selectedLanguage === "en") {
      translation = dict[lower_case_msg];
    } else {
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
            <MessageSuggestion setMessage={setMessage} lang={selectedLanguage}></MessageSuggestion>
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
              {selectedLanguage === "ja" && (
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "1rem",
                    alignItems: "flex-end",
                  }}
                >
                  Language
                </p>
              )}
              {selectedLanguage === "en" && (
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "1rem",
                    alignItems: "flex-end",
                  }}
                >
                  言語
                </p>
              )}
              <ToggleButtonGroup
                exclusive
                value={selectedLanguage}
                onChange={handleLanguageChange}
                size="small"
              >
                <ToggleButton value="ja">日本語</ToggleButton>
                <ToggleButton value="en">ENGLISH</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="standard-basic"
                variant="standard"
                label= {(selectedLanguage === "ja") ? "メッセージを入力" : "Enter a text"}
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
