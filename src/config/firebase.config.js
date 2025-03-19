// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { toast } from "react-toastify";
import { getFirestore,doc,setDoc,} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZn1uER2Xhpc-_f1iGUUEILzVylvaR-PY",
  authDomain: "chat-app-f0f24.firebaseapp.com",
  projectId: "chat-app-f0f24",
  storageBucket: "chat-app-f0f24.firebasestorage.app",
  messagingSenderId: "979773765511",
  appId: "1:979773765511:web:5e0d7f6887068c14314522"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(username,email,password )=>{
  try{
    const res = await createUserWithEmailAndPassword(auth,email,password);
    const user = res.user;
    await setDoc(doc(db,"users",user.uid),{
      uid:user.uid,
      username:username.toLowerCase(),
      email,
      name:"",
      avatar:"",
      bio:"Hey, I'm using chat app",
      lastSeen:Date.now() 
    });
    await setDoc(doc(db,"Chats",user.uid),{
      chartData:[]
    });
    
  }catch(err){
    console.log(err);
    toast.error(err.code.split("/")[1].split("-").join(" "));
  }
}

// login function
const login = async(email,password)=>{
  try{
    await signInWithEmailAndPassword(auth,email,password);
  }catch(err){
    console.log(err);
    toast.error(err.code.split("/")[1].split("-").join(" "));
  }
}

//logout function
const logout = async()=>{
  try{
    await signOut(auth);
  }catch(err){
    console.log(err);
    toast.error(err.code.split("/")[1].split("-").join(" "));
  }
}

export {signup,login,logout,auth,db};