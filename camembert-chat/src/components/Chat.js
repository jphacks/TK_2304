import React, { useEffect, useState, useRef } from "react";
import SignOut from "./SignOut";
import { db, auth } from "../firebase";
import SendMessage from "./SendMessage";

function Chat() {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = () => {
      db.collection("messages")
        .orderBy("createdAt")
        .limit(50)
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    };

    fetchMessages();

    // Scroll to the bottom of the chat when messages are updated
    scrollToBottom();
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat when messages are updated
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
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
        <div ref={messagesEndRef}></div>
      </div>
      <SendMessage></SendMessage>
    </div>
  );
}

export default Chat;
