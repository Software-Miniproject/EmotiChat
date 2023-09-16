import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, getDocs, collection, serverTimestamp, orderBy, query, limit, where } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';

// To do: Beautify the chat bubbles, put in CSS for the submission form, add in user PFP

const CreateChatroom = ({ setChatroom }) => {
    
    const userRef = collection(db, 'users');
    const q = query(userRef, where("uid", "==", auth.currentUser?.uid));
    const [chatrooms, setChatrooms] = useState([]);
    const user = useCollectionData(q);
    

    // Asynchronously gather the chatrooms under the current user
    const getUserChatrooms = async () => {
        if (user) {
            if (user[0] && user[0][0]?.chatrooms) {
                setChatrooms(user[0][0].chatrooms);
            }
            else {
                setChatrooms([]);
            }
        }
        else{
            setChatrooms([]);
        }
        
    }
    useEffect(() => {
        getUserChatrooms();
    }, []);



    return (
        <div>
            {chatrooms.map((chatroom, index) => (
                <button key={index} onClick={() => setChatroom(chatroom)}>
                    {chatroom}
                </button>
            ))}
        </div>
    );

}

export default CreateChatroom;