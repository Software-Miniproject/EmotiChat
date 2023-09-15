import React, { useState, useEffect} from "react";
import { auth, db, firestore } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const SearchBar = () => {
    const [users, setUsers] = useState();

    const getUsers = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = querySnapshot.docs.map(doc => ({id: doc.id, ... doc.data()}))
        setUsers(users);
    }

    useEffect(() => {
        getUsers()
    }, []);
    
    return (
        <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users ? (
            users.map((users, i) => (
              <tr key={users.uid}>
                <td>{users.name}</td>
                <td>{users.username}</td>
                <td>{users.email}</td>
                <td className="text-right">
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    );
};

export default SearchBar;
