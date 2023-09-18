import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// To do: Beautify the chat bubbles, put in CSS for the submission form, add in user PFP

// Function that displays the chatrooms the logged in user has access to and sets the current chatroom to what the user clicks
const DisplayChatrooms = ({ setChatroom }) => {
    // State setter and value for the chatrooms associated with current user
    const [chatrooms, setChatrooms] = useState([]);
    
    // Asynchronously gather the chatrooms under the current user
    const getUserChatrooms = async () => {
        // If there is a current user, query firestore "users" for the chatrooms associated with user that is currently logged in
        if (auth.currentUser) {
            const userRef = collection(db, "users");
            const q = query(userRef, where("uid", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(q);

            // If the query is successful (not empty), set the chatrooms to the chatrooms array associated with the user
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
    // Function that will getUserChatrooms when currentUser is changed
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserChatrooms();
            }
            else {
                setChatrooms([]);
            }
        });
        return () => unsubscribe();
    }, []);

    // Chatroom selection handler that sets chatroom for page and for what to display
    const [selectedChatroom, setSelectedChatroom] = useState("");
    const handleSelectChatroom = (chatroom) => {
        setChatroom(chatroom);
        setSelectedChatroom(chatroom);
    }

    // Returns HTML code that displays buttons corresponding to the chatroom id's, if clicked it will set the chatroom to the selected one
    return (
        <div>
            {chatrooms.map((chatroom, index) => (
                <>
                    <button key={index} onClick={() => handleSelectChatroom(chatroom)}>
                        {chatroom}
                    </button>
                </>
            ))}
            {selectedChatroom && (
                <div>
                    <h3>Selected Chatroom: {selectedChatroom}</h3>
                </div>
            )}
        </div>
    );

}

export default DisplayChatrooms;