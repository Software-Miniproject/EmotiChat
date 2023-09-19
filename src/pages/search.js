import React, { useState, useEffect, useRef} from "react";
import { db } from "../firebase";
import { query, where, collection, getDocs } from "firebase/firestore";

const Search = () => {
    const [users, setUsers] = useState();
    const [userInput, setUserInput] = useState('');
    const handleButtonClick = () => {
      const inputValue = document.getElementById('userInputField').value;
      setUserInput(inputValue);
    }

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("name", "==", userInput));

    const getUsers = async () => {
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map(doc => ({id: doc.id, ... doc.data()}))
        setUsers(users);
    }

    getUsers();
    
    useEffect(() => {
        getUsers()
    }, []);
    
    return (
        <div>
            <br></br>
    <div>
      <p>Search: {userInput}</p>
      <input type="text" id="userInputField" placeholder="Exact Name..."
      /><button onClick={handleButtonClick}>Submit</button>
      <button onClick={Search}>Search</button>
    </div>
            <br></br>
            <br></br>
            <table className="striped-table">
                <thead>
                    <tr>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users ? (
                        users.map((users) => (
                            <tr key={users.uid}>
                                <td>{users.pfp && <img src={users.pfp} alt="" />}</td>
                                <td>{users.name}</td>
                                <td>{users.username}</td>
                                <td>{users.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={40}></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Search;
