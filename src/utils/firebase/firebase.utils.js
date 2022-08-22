import { initializeApp } from "firebase/app";

import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(docRef, obj);
  });
  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");

  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

// * --------> GOOGLE <-------- * \\

const googleProvider = new GoogleAuthProvider();
//// googleProvider.setCustomParameters({
//  //   prompt:'select_account'
// //})
export const signInWithGooglePopup = async () =>
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
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
