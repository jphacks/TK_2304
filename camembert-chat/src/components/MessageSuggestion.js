import React, { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";
import { db, auth } from "../firebase";
import { Button, CircularProgress } from "@mui/material";
import SendMessage from "./SendMessage"

const API_URL = "https://api.openai.com/v1/";
const MODEL = "gpt-3.5-turbo";
const API_KEY = "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";

const MessageSuggestion = () => {
  const [messages, setMessages] = useState([]);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ans, setAns] = useState([]);

  const getResponse = async (new_msgs) => {
    if (finished || loading) {
      return;
    }
    if (new_msgs.length === 0) {
      return;
    }
    setLoading(true);
    setFinished(true);
    try {
      setAns([]);
      console.log(new_msgs[0].text);
      const response = await axios.post(
        `${API_URL}chat/completions`,
        {
          model: MODEL,
          messages: [
            {
              role: "user",
              content: "以下の連続した会話に対する適切な返答を1つ考えなさい.",
            },
            {
              role: "user",
              content: new_msgs[0].text
            },
            {
              role: "system",
              content: "2つの返答の間は#を使って分けなさい. 改行はしなさい. またメッセージは30文字以内にしなさい."
            }
          ],
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
      setAns(answers);
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
        getResponse(new_msgs);
        // setFinished(false);
      })
  }, []);

  console.log(finished);

  return (
    <div>
      <div>Suggestion: </div>
      {loading && (
        <CircularProgress></CircularProgress>
      )}
      {!loading && (
        ans.map((a) => <Button variant="contained">{a}</Button>
        )
      )}
    </div>
  );
}

export default MessageSuggestion;
