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

    const getUsers = async () => {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("name", ">=", userInput));
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map(doc => ({id: doc.id, ... doc.data()}))
        setUsers(users);
    }

    getUsers();
    
    useEffect(() => {
    }, []);
    
    return (
        <div>
            <br></br>
            <div>
                <input type="text" id="userInputField" placeholder="Enter Search..."/>
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
