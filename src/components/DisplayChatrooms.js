import '../App.css';
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { getDocs, collection, query, where, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// ... (other code)

const DisplayChatrooms = ({ setChatroom }) => {
    const [chatrooms, setChatrooms] = useState([]);
    const [chatNames, setChatNames] = useState([]);

    const getUserChatrooms = async () => {
        if (auth.currentUser) {
            const userRef = collection(db, "users");
            const q = query(userRef, where("uid", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userChatrooms = userDoc.data().chatrooms || [];
                setChatrooms(userChatrooms);
            } else {
                setChatrooms([]);
            }
        } else {
            setChatrooms([]);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserChatrooms();
            } else {
                setChatrooms([]);
            }
        });
        return () => unsubscribe();
    }, []);

    // Function to get the chat name based on chat ID
    const getChatName = async (chatId) => {
        const chatRef = doc(db, "chats", chatId);
        const chatSnapshot = await getDoc(chatRef);
        if (chatSnapshot.exists()) {
            return chatSnapshot.data().name;
        }
        return ""; // Return an empty string if the chat doesn't exist
    }

    useEffect(() => {
        // Fetch chat names for all chatrooms
        Promise.all(chatrooms.map(async (chatroomId) => {
            return getChatName(chatroomId);
        })).then((names) => {
            setChatNames(names);
        });
    }, [chatrooms]);

    return (
        <div className="chatrooms_container">
            <h3 style={{ textAlign: 'center' }}>Chatrooms</h3>
            {chatNames.map((chatName, index) => (
                <button key={index} onClick={() => setChatroom(chatrooms[index])}>
                    {chatName}
                </button>
            ))}
        </div>
    );
}

export default DisplayChatrooms;
