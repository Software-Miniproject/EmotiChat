import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { db } from '../firebase';
import { doc, updateDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';

const Username = () => {
    const [newUsername, setNewUsername] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { user } = UserAuth();
    const [otherUserEmailPrefixes, setOtherUserEmailPrefixes] = useState([]);

    useEffect(() => {
        // Query Firestore to get email prefixes of other users
        const fetchOtherUserEmailPrefixes = async () => {
            try {
                const usersCollection = collection(db, 'users');
                const querySnapshot = await getDocs(usersCollection);

                const emailPrefixes = querySnapshot.docs
                    .filter(doc => doc.id !== user.uid) // Exclude the current user's document
                    .map(doc => doc.data().email.split('@')[0]);

                setOtherUserEmailPrefixes(emailPrefixes);
            } catch (error) {
                console.error('Error fetching other users:', error);
            }
        };

        fetchOtherUserEmailPrefixes();
    }, [user.uid]);

    const handleUsernameChange = (e) => {
        const username = e.target.value;

        // Check if the username is valid (contains only letters, numbers, ., and _ and is no longer than 30 characters)
        const isValidUsername = /^[a-zA-Z0-9._]{1,30}$/.test(username);

        if (!isValidUsername) {
            setErrorMessage('Invalid username format. It can only contain letters, numbers, ., and _ and must be 3 to 30 characters long.');
        } else {
            setErrorMessage(''); // Clear the error message if the username is valid
        }

        setNewUsername(username);
    };

    const handleSaveUsername = async () => {
        try {
            // Validate that the username is not empty
            if (newUsername.trim() === '') {
                setErrorMessage('Username cannot be empty');
                return;
            }

            // Check if the username matches any other user's email prefix
            if (otherUserEmailPrefixes.includes(newUsername)) {
                setErrorMessage('Username is already in use by another user');
                return;
            }

            // Check if the username is valid (contains only letters, numbers, ., and _ and is no longer than 30 characters)
            const isValidUsername = /^[a-zA-Z0-9._]{3,30}$/.test(newUsername);

            if (!isValidUsername) {
                setErrorMessage('Invalid username format. It can only contain letters, numbers, ., and _ and must be 3 to 30 characters long.');
                return;
            }

            // Update the username in the Firestore document
            const uid = user.uid;
            const userRef = doc(db, 'users', uid);

            await updateDoc(userRef, {
                username: newUsername
            });

            setSuccessMessage('Username updated successfully');
        } catch (error) {
            console.error('Error updating username:', error);
            setErrorMessage('Error updating username: ' + error.message); // Include error message in the error state
        }
    };

    return (
        <div className='Username'>
            <h1>Create a Username</h1>
            <div>
                <input
                    type="text"
                    value={newUsername}
                    onChange={handleUsernameChange}
                />
                <button onClick={handleSaveUsername}>Save</button>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p><Link to="/account">My Account</Link></p>
            </div>
        </div>
    );
};

export default Username;
