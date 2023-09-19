import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { query, where, collection, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { arrayUnion } from "firebase/firestore";
import { Link } from "react-router-dom"; // Import Link

const Search = () => {
  const [users, setUsers] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [selectedValue, setSelectedValue] = useState('username'); 
  
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  
  const handleButtonClick = async () => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where(selectedValue, ">=", userInput));
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
  
      // Get the current user's UID and name (assuming it's stored in user.displayName)
      const currentUser = auth.currentUser;
      const currentUserId = currentUser.uid;
      const currentUserName = currentUser.displayName;
  
      // Get the selected user's UID and name
      const selectedUserId = user.id;
      const selectedUserName = user.name;
  
      // Create the chat name by combining the current user's name and the selected user's name
      const chatName = `${currentUserName}, ${selectedUserName}`;
  
      // Set the data for the chat document
      const chatData = {
        id: chatId.id,
        name: chatName,
        // Add other chat data as needed (e.g., participants, messages, etc.)
      };
  
      // Create the chat document in Firestore
      await setDoc(chatId, chatData);
  
      // Update the chatrooms array for both users
      const currentUserDocRef = doc(collection(db, "users"), currentUserId);
      const selectedUserDocRef = doc(collection(db, "users"), selectedUserId);
  
      // Update the chatrooms array for the current user
      await updateDoc(currentUserDocRef, {
        chatrooms: arrayUnion(chatId.id),
      });
  
      // Update the chatrooms array for the selected user
      await updateDoc(selectedUserDocRef, {
        chatrooms: arrayUnion(chatId.id),
      });
  
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
        <select value={selectedValue} onChange={handleSelectChange}>
          <option value="username"> Username </option>
          <option value="name"> Name </option>
          <option value="email"> Email </option>
        </select>
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
                  <td>
  <a href="/" onClick={() => startChat(user)}>Start Chat</a>
</td>

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
