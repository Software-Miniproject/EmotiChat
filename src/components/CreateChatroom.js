import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import { getDocs, doc, collection, serverTimestamp, orderBy, query, limit, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useCollectionData } from 'react-firebase-hooks/firestore';

// To do: Beautify the chat bubbles, put in CSS for the submission form, add in user PFP

const CreateChatroom = ({ setChatroom }) => {

    const [chatrooms, setChatrooms] = useState([]);
    
    // Asynchronously gather the chatrooms under the current user
    const getUserChatrooms = async () => {
        // If there is a current user, display the 
        if (auth.currentUser) {
            const userRef = collection(db, "users");
            const q = query(userRef, where("uid", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userChatrooms = userDoc.data().chatrooms || [];
                setChatrooms(userChatrooms);
            }
            else{
                setChatrooms([]);
            }
        }
        else {
            setChatrooms([]);
        }     
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserChatrooms(user);
            }
            else {
                setChatrooms([]);
            }
        });
        return () => unsubscribe();
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