import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import db from "./firebase";
import firebase from "firebase";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function SidebarChat({ id, messageId, name, addNewChat }) {

  const [message, setMessage] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("message_section")
        .doc(messageId)
        .collection("messages")
        .orderBy("added", "desc")
        .onSnapshot((snapshot) =>
          setMessage(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id, messageId]);

  const togglePopup = () => setIsOpen(!isOpen);

  const createChat = (e) => {
    e.preventDefault();

    if (newName && email) {
      db.collection("message_section").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      }).then(async () => {
        const data = await db.collection("message_section").orderBy("timestamp", "desc").limit(1).get();
        data.docs.forEach(async item => {
          db.collection("Users").doc(user.email).collection("chats")
            .add({
              messageId: item.id,
              recieverName: newName,
            });
          const userRef = await db.collection("Users").doc(email);
          userRef.get()
            .then(docSnapshot => {
              if(!docSnapshot.exists)
                userRef.set({});
              userRef.collection("chats")
                .add({
                  messageId: item.id,
                  recieverName: user.displayName,
                });
              setNewName("");
              setEmail("");
            });
        });
      });
    }
    togglePopup();
  };

  return !addNewChat ? (
    <Link to={`/chat/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
        <div className="sidebarChat_info">
          <h2>{name}</h2>
          <p>{message[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div>
      {isOpen ? (
        <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={togglePopup}>x</span>
          <form>
            <h2>Add New Chat</h2>
            <hr />
            
            <label htmlFor="email"><strong>Email</strong></label>
            <input onChange={e => setEmail(e.target.value)} value={email} placeholder="Enter email" className="form-input" id="email" required type="email" />

            <label htmlFor="name"><strong>Name</strong></label>
            <input onChange={e => setNewName(e.target.value)} value={newName} placeholder="Enter Name" className="form-input" id="name" required type="text" />
            <hr />

            <button onClick={e => createChat(e)} className="registerbtn">Add Chat</button>
          </form>
        </div>
      </div>
      ) : (
        <div onClick={togglePopup} className="sidebarChat">
          <h2>Add new chat</h2>
        </div>
      )}
    </div>
  )
}

export default SidebarChat;
