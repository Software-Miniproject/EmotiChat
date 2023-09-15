

import React, { useRef, useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp, orderBy, query, limit, where } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';

// To do: Beautify the chat bubbles, put in CSS for the submission form, add in user PFP

const Chatroom = (props) => {
    const chat_id = props.chat_id;
    const dummy = useRef();
    const messagesRef = collection(db, "messages");
    
    // Query for the 25 more recent messages in the current chatroom (requires the 2 filters because can't have where and orderBy in the same)
    const q = query(messagesRef, where("chatroom_id", "==", chat_id), orderBy("timestamp"), limit(25));
    const [messages] = useCollectionData(q);

    const [formValue, setFormValue] = useState('');

    // Asynchronous function that will send messages using the value of the inputted text
    const sendMsg = async(e) => {
        e.preventDefault();
        const {uid, photoURL} = auth.currentUser;
        await addDoc(messagesRef, {
            message: formValue,
            timestamp: serverTimestamp(),
            sender_id: uid,
            chatroom_id: chat_id
        })

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth'});
    }

    return (
        <>
        <main>
            {messages && messages.map(msg => <ChatMessage key={msg.sender_id} message={msg}/>)}
            <span ref={dummy}></span>
        </main>
        <form className="input_bar" onSubmit={sendMsg}>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="hehe"/>
            <button type="submit" disabled={!formValue}>send</button>
        </form>          
        </>
    );

}

// Function for displaying the chat messages in the chatroom
const ChatMessage = (props) => {
    // Grab the message text and sender's id for the message
    const { message, sender_id } = props.message;
    const messageClass = sender_id === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <>
            <div className={`message ${messageClass}`}>
                <p>{message}</p>
            </div>
        </>
    )
}

export default Chatroom;