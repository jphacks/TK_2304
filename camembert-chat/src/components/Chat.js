import React, { useEffect, useState } from "react";
import SignOut from "./SignOut";
import { db, auth } from "../firebase";
import SendMessage from "./SendMessage";
import GetMessage from "./GetMessage";

function Chat() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div>
      {console.log(messages)}
      <SignOut></SignOut>
      <div className="msgs">
        {messages.map(({ id, text, photoURL, uid, translation }) => (
          <div
            key={id}
            className={`msg ${
              uid === auth.currentUser.uid ? "sent" : "recieved"
            }`}
          >
            <img src={photoURL} alt="" />
            <div className="message-content">
              {translation && <p className="translation">{translation}</p>}
              <p className="original-text">{text}</p>
            </div>
          </div>
        ))}
      </div>
      <SendMessage></SendMessage>
    </div>
  );
}

export default Chat;
