import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
const firebaseConfig = {
  apiKey: "AIzaSyCp7y6c0L-ea3PUOiwxv6tjAZxYgq30jFE",
  authDomain: "myawe-91958.firebaseapp.com",
  projectId: "myawe-91958",
  storageBucket: "myawe-91958.appspot.com",
  messagingSenderId: "415162198994",
  appId: "1:415162198994:web:a00b5775f2f8424304b60b"
};
export const fbApp = initializeApp(firebaseConfig);
export const fbDB = getFirestore(fbApp);

export const login = async () => {
  const auth = getAuth(fbApp);
  await signInWithEmailAndPassword(auth, 'dev-admin-awe@gmail.com', '232as@@#dsd')
  console.log('logged')
}
