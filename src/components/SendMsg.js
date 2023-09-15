import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const onSend = async(event) => {
    event.preventDefault();
}

// Function used to send messages by storing the information into firestore
const SendMsg = () => {
    const [message, setMessage] = useState("");
    return (
        <form className="send-message">
            <label htmlFor="messageIn" hidden>
                Enter Message
            </label>
            <input
                id="messageIn"
                name="messageIn"
                type="text"
                className="form-input__input"
                placeholder="type message..."
                value={message}
                // Dynamically set the message that will be sent to what's currently in the box
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default SendMsg;