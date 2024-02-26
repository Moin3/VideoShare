import { firebaseapp } from "../firebase-config";

import {collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, where} from 'firebase/firestore';

// fetch all document from firebase
export const getAllFeeds = async (firestoreDb) => {
  const feeds = await getDocs(
    query(collection(firestoreDb, "videos"), orderBy("id", "desc"))
  );

  return feeds.docs.map((doc) => doc.data());
};


export const gertUserInfo = async (firestoreDb, userId) => {
    const userRef = doc(firestoreDb, "users", userId);
  
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      return "No Such Document";
    }
  };
  