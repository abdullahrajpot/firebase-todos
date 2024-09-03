import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { auth, firestore } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';


 const Auth = createContext();
 
const initialState={isAuthenticated:false, user: {}};



const reducer =(state, {type, payload}) =>{
    switch(type){
        case "SET_LOGGED_IN":
        return {isAuthenticated:true , user: payload.user}
        case "SET_PROFILE":
            return {...state , user: payload.user}
              case "SET_LOGGED_OUT":
            return initialState;
            default:
              return state
    }
}


export default function AuthContext({children}) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isAppLoading, setIsAppLoading] = useState(true)

  const readProfile = useCallback(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
     readUserProfile(user);
        
      } else {
        
             }
    });
      setTimeout(() => {
          setIsAppLoading(false)
      }, 3000);
  }, [])
  useEffect(() => { readProfile() }, [readProfile])
  



  const readUserProfile = async (user)=>{
    const docSnap = await getDoc(doc(firestore, "users", user.uid));

if (docSnap.exists()) {
const user=docSnap.data()
  dispatch({type: "SET_LOGGED_IN", payload:{user: user} } )
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
  }



  const handleLogout = async (e) =>
    {
      signOut(auth).then(() => {
        dispatch({type: "SET_LOGGED_OUT" } )
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}



  return (
    <Auth.Provider value={{state ,  dispatch, isAppLoading, setIsAppLoading, handleLogout}}>
      {children}
    </Auth.Provider>
  )
}
export const useAuthContext = () => useContext(Auth)