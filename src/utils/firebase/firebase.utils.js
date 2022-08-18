import { initializeApp } from "firebase/app";

import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8C7LOljwYDihJCKmfzpgkv6dn-C56WpM",
  authDomain: "my-e-commerce-7584d.firebaseapp.com",
  projectId: "my-e-commerce-7584d",
  storageBucket: "my-e-commerce-7584d.appspot.com",
  messagingSenderId: "55626124849",
  appId: "1:55626124849:web:69c8222152341fd04a8f10",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore(app);

// * --------> GOOGLE <-------- * \\

const googleProvider = new GoogleAuthProvider();
//// googleProvider.setCustomParameters({
//  //   prompt:'select_account'
// //})
export const signInWithGoogle = async () =>
  signInWithPopup(auth, googleProvider);

// * --------> EMAIL-PASSWORD <-------- * \\

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

// * --------> create user <-------- * \\

export const createUserDocument = async (
  userAuth,
  additionalInformation = {}
) => {
  const userRef = doc(db, "users", userAuth.uid);
  // const userSnapshot = setDoc(userRef, {
  //   email,
  //   displayName,
  //   createdAt: new Date(),
  // });
  const userSnapshot = await getDoc(userRef);
  console.log(userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        email,
        displayName,
        createdAt,
        ...additionalInformation,
      });
      return userSnapshot;
    } catch (e) {
      console.log("error creating the user", e);
    }
  }

  return userSnapshot;

  //if user data exists -> return userRef
  //if user data !exists
  //create-set the document with the data from userAuth in my collection
};
