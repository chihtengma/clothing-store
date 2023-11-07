import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyADrPywAoFqYg09VkzAIXvLItePoxQ_7lw",
   authDomain: "clothing-store-db-6f70e.firebaseapp.com",
   projectId: "clothing-store-db-6f70e",
   storageBucket: "clothing-store-db-6f70e.appspot.com",
   messagingSenderId: "136314948495",
   appId: "1:136314948495:web:d03aaa7bb2196ec6add9fa"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
   prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
   const userDocRef = doc(db, "users", userAuth.uid);

   const userSnapshot = await getDoc(userDocRef);

   if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt
         });
      } catch (error) {
         console.log("Error creating the user", error.message);
      }
   }

   return userDocRef;
};
