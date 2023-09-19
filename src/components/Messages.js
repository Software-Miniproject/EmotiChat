import React, { useRef, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp, orderBy, query, limit, where, getDocs } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';

// To do: Beautify the chat bubbles, put in CSS for the submission form, add in user PFP

// Function that displays messages associated with inputted chatroom and allows user to send messages in selected chatroom
const Chatroom = (props) => {

    const chat_id = props.chat_id;
    const dummy = useRef();
    const messagesRef = collection(db, "messages");
    
    // Query for the 25 more recent messages in the current chatroom
    const q = query(messagesRef, where("chatroom_id", "==", chat_id), orderBy("timestamp"));
    const [messages] = useCollectionData(q);

    const [formValue, setFormValue] = useState('');
    const [chatName, setChatName] = useState("");

    // Asynchronously fetch the chat name
    const fetchChatName = async (chat_id) => {
        const chatRef = collection(db, "chats");
        const q = query(chatRef, where("id", "==", chat_id));
        const chatSnapshot = await getDocs(q);

        if (!chatSnapshot.empty) {
            const chat_data = chatSnapshot.docs[0];
            const chatName = chat_data.data().name || chat_id;
            setChatName(chatName);
        } else {
            setChatName(chat_id);
        }
    }
    
    // Asynchronous function that will send messages using the value of the inputted text, current user, and timestamp
    const sendMsg = async(e) => {
        if (auth.currentUser) {
            e.preventDefault();
            const {uid} = auth.currentUser;
            await addDoc(messagesRef, {
                message: formValue,
                timestamp: serverTimestamp(),
                sender_id: uid,
                chatroom_id: chat_id
            })
        }

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth'});
    }

    fetchChatName(chat_id);

    // If the user is logged in and there is a selected chatroom, display the messages and message handler
    if (auth.currentUser && props.chat_id) {
        return (
            <div>
              <div className="chat_title">
                <h3>{chatName}</h3>
              </div>
              <div id="hehe">
                <div className="messages_container">
                  {messages && messages.map(msg => <ChatMessage key={msg.sender_id} message={msg}/>)}
                  <span ref={dummy}></span>
                </div>
              </div>
              <form className="input_bar" onSubmit={sendMsg}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type a message..." />
                <button type="submit" disabled={!formValue} className="send-button">Send!</button>
              </form>
            </div>
          );
          
    }

    
    // Otherwise, display it as empty
    else {
        return (<div></div>)
    }

}

// Function for displaying the chat messages in the chatroom
const ChatMessage = (props) => {
    // Grab the message text and sender's id for the message
    const { message, sender_id } = props.message;
    const messageClass = sender_id === auth.currentUser.uid ? 'sent' : 'received';
    const [username, setUsername] = useState('');

    // Asynchronously gather the chatrooms under the current user
    const getSenderInfo = async () => {
        const userRef = collection(db, "users");
        const q = query(userRef, where("uid", "==", sender_id));
        const querySnapshot = await getDocs(q);

        // If the query is successful (not empty), set the chatrooms to the chatrooms array associated with the user
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const user = userDoc.data();
            setUsername(user.username);
        }
        else{
            setUsername("undefined");
        }
    }

    // Function that will getUserChatrooms when currentUser is changed
    useEffect(() => {
        getSenderInfo();
    }, []);

    return (
        <>
            <div className={`username_${messageClass}`}>
                <p className="username">{username}</p>
            </div>
            <div className={`message_${messageClass}`}>
                <p className="message">{message}</p>
            </div>

        </>
    )
}

export default Chatroom;