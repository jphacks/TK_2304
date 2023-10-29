import React, { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";
import { db, auth } from "../firebase";
import { Button, CircularProgress } from "@mui/material";
import SendMessage from "./SendMessage";
import ChatGPTApi from "../ChatGptApi";

const API_URL = "https://api.openai.com/v1/";
const MODEL = "gpt-3.5-turbo";
const API_KEY = ChatGPTApi();

const MessageSuggestion = (props) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ans, setAns] = useState([]);

  const getResponse = async () => {
    if (loading) {
      return;
    }
    if (messages.length === 0) {
      return;
    }

    setLoading(true);

    console.log(messages);

    try {
      setAns([]);
      const lang = props.lang === "ja" ? "日本語" : "英語";

      var msgs = {};

      if (messages > 2) {
        msgs = [
          {
            role: "user",
            content: `以下の連続した会話に対する適切な返答を${lang}語で1つ考えなさい.`,
          },
          {
            role: "user",
            content: messages[0].text
          },
          {
            role: "system",
            content: `2つの返答の間は#を使って分けなさい. 改行はしなさい. またメッセージは30文字以内にしなさい. ${lang}語で答えなさい`
          },
          {
            role: "assistant",
            content: `2つ前のメッセージ: ${messages[1].txt}  3つ前のメッセージ: ${messages[2].txt}`
          }
        ];
      } else {
        msgs = [
          {
            role: "user",
            content: `以下の連続した会話に対する適切な返答を${lang}語で1つ考えなさい.`,
          },
          {
            role: "user",
            content: messages[0].text
          },
          {
            role: "system",
            content: `2つの返答の間は#を使って分けなさい. 改行はしなさい. またメッセージは30文字以内にしなさい. ${lang}語で答えなさい`
          }
        ]
      }

      const response = await axios.post(
        `${API_URL}chat/completions`,
        {
          model: MODEL,
          messages: msgs,
        },
        {
          // HTTPヘッダー(認証)
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      const answers = response.data.choices[0].message.content.trim().split("#");
      let new_answers = [];
      answers.forEach(element => {
        element.trim();
        if (element != "") {
          new_answers.push(element);
        }
      });
      setAns(new_answers);
    } catch (e) {
      console.log("error" + e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt", "desc")
      .limit(3)
      .onSnapshot((snapshot) => {
        const new_msgs = snapshot.docs.map((doc) => doc.data());
        setMessages(new_msgs);
      });
  }, []);

  return (
    <div className="gpt-style">
      {props.lang === "ja" && <Button onClick={getResponse}>おすすめ</Button>}
      {props.lang === "en" && <Button onClick={getResponse}>Suggestion</Button>}
      {loading && <CircularProgress size={23}></CircularProgress>}
      {!loading &&
        ans.map((a) => (
          <Button
            variant="contained"
            onClick={() => {
              props.setMessage(a);
            }}
            className="customButton"
          >
            {a}
          </Button>
        ))}
    </div>
  );
};

export default MessageSuggestion;
