import { db } from '../firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';

// Function to store user data in Firestore
export const storeUserData = async (uid, email, displayName, photoURL) => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      email: email,
      name: displayName,
      uid: uid,
      pfp: photoURL
    });
    console.log('User data stored successfully');
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

