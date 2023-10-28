import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import SendMessage from "./SendMessage";

function GetMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Query the "messages" collection to get the three most recent messages
    db
      .collection("messages")
      .orderBy("createdAt", "desc") // Order by creation timestamp in descending order
      .limit(3) // Limit the result to the three most recent documents
      .onSnapshot((snapshot) => {
        // Update the state with the fetched messages
        setMessages(snapshot.docs.map((doc) => doc.data()));
      })
  }, []);

  return messages;

  // return (
  //   <div className="msgs">
  //     {messages.map((message, index) => (
  //       <div key={index}>
  //         <p>{message.text}</p>
  //         {/* You can access the message text with message.text */}
  //       </div>
  //     ))}
  //   </div>
  // );
}

export default GetMessages;


