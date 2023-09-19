import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { query, where, collection, getDocs, doc, setDoc } from "firebase/firestore";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleButtonClick = async () => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("name", ">=", userInput));
      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const startChat = async (user) => {
    try {
      // Generate a unique ID for the chat document
      const chatId = doc(collection(db, "chats"));
  
      // Get the current user's name (assuming it's stored in user.displayName)
      const currentUser = auth.currentUser;
      const currentUserName = currentUser.displayName;
  
      // Create the chat name by combining the current user's name and the selected user's name
      const chatName = `${currentUserName}, ${user.name}`;
  
      // Set the data for the chat document
      const chatData = {
        id: chatId.id,
        name: chatName,
        // Add other chat data as needed (e.g., participants, messages, etc.)
      };
  
      // Create the chat document in Firestore
      await setDoc(chatId, chatData);
  
      // You can now use the generated chatId and chatName for further chat-related functionality.
      console.log("Chat created with ID:", chatId.id);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };
  

  useEffect(() => {
    // You can add any initial setup code here if needed.
  }, []);

  return (
    <div>
      <br></br>
      <div>
        <input
          type="text"
          id="userInputField"
          placeholder="Enter Search..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleButtonClick}>Submit</button>
        <br></br>
      </div>
      <br></br>
      <table className="striped-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th> {/* Added a column for the "Start Chat" button */}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.pfp && <img src={user.pfp} alt="" />}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => startChat(user)}>Start Chat</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Search;
