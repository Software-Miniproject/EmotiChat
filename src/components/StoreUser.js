import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Function to store user data in Firestore, checking for existing document
export const storeUserData = async (uid, email, displayName, photoURL) => {
  try {
    const userRef = doc(db, 'users', uid);

    // Check if the document already exists
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Extract the email prefix from the email
      const emailPrefix = email.split('@')[0];

      // Document doesn't exist, so create it with the email prefix as the username
      await setDoc(userRef, {
        email: email,
        name: displayName,
        uid: uid,
        pfp: photoURL,
        username: emailPrefix, // Set the username to the email prefix
        chatrooms: []
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
