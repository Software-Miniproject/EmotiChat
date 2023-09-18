import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Function to store user data in Firestore, checking for existing document
export const storeUserData = async (uid, email, displayName, photoURL) => {
  try {
    const userRef = doc(db, 'users', uid);

    // Check if the document already exists
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Document doesn't exist, so create it
      await setDoc(userRef, {
        email: email,
        name: displayName,
        uid: uid,
        pfp: photoURL
      });
      console.log('User data stored successfully');
    } else {
      // Document already exists, do nothing
      console.log('User data already exists in Firestore');
    }
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

