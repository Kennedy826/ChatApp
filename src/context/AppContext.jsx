import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
const navigate = useNavigate();
 const [userData, setUserData] = useState(null);
 const[chatData, setChatData] = useState(null);


const loadUserData = async (uid) => {
    try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        setUserData(userData);
        if(userData.avatar && userData.name){
            navigate("/chat");
        } else {
            navigate("/profile");
        }
           await updateDoc(userRef, {lastSeen:Date.now()});
           setInterval(async () => {
               if (auth.chatUser) {
                   await updateDoc(userRef, {lastSeen:Date.now()});
               }
           }, 6000);

        } catch (error) {
            
        }
}
   useEffect(() => {
           if (userData) {
               const chatRef = doc(db, "users", userData.uid);
               const unSub = onSnapshot(chatRef, async(res) => {
                const chatItems = res.data().chatData;
                const tempData = [];
                for(const items of chatItems){
                    const userRef = doc(db, "users", items.uid);
                    const userSnap = await getDoc(userRef);
                    const userData = userSnap.data();
                    tempData.push({...items, userData});
                }
                   setChatData(tempData.sort((a,b) => b.updatedAt - a.updatedAt));
               })
                  return () =>{
                      unSub();
                  }
           }
   }, [userData])

    const value = {
        userData, setUserData,
        chatData,setChatData,
        loadUserData,
        
    };
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider