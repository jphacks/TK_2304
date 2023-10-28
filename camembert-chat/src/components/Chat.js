import React, { useEffect, useState } from 'react';
import SingOut from "./SignOut";
import { db, auth } from "../firebase";
import SendMessage from './SendMessage';

function Chat() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    db.collection("messages").orderBy("createdAt").limit(50).onSnapshot((snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])

  return (
    <div>
      {console.log(messages)}
      <SingOut></SingOut>
      <div className='msgs'>
        {messages.map(({ id, text, photoURL, uid }) => (
          <div key={id} className={`msg ${uid === auth.currentUser.uid ? "sent" : "recieved"}`}>
            <img src={photoURL} alt=''></img>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <SendMessage></SendMessage>
    </div>
  )
}

export default Chat;
