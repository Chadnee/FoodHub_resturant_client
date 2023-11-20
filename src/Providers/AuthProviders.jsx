import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from "axios";


export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProviders = ({children}) => {
     const [user , setUser] = useState(null)
     const [loading, setLoading] = useState(true)
     
     const signedIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
     }

     const createUser = (email, password) => {
         setLoading(true)
         return createUserWithEmailAndPassword(auth, email, password)
     }
     
     const googleLogin = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider)
     }

      const userProfileUpdate = (name) => {
         return updateProfile(auth.currentUser, {
            displayName: name 
            //photoURL: "https://example.com/jane-q-user/profile.jpg"
          })
          
      }

     const logOut=()=>{
        return signOut(auth)
     }

     const verifiedEmail = () => {
        return sendEmailVerification(auth.currentUser);
     }

     useEffect(()=>{
         const unsubscribe =   onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('current User', currentUser);

            if(currentUser){
               axios.post('https://food-hub-server-pi.vercel.app/jwt', {email: currentUser.email})
               .then(data => {
                  console.log(data.data.token)
                  localStorage.setItem("access-token", data.data.token)
                  setLoading(false)
               })
            }
            else{
               localStorage.removeItem("access-token");
            }
            
         })
         return () => {
            return unsubscribe();
         }
     }, [])
     const getInfo = {
        user,
        loading,
        signedIn,
        createUser,
        googleLogin,
        logOut,
        verifiedEmail,
        userProfileUpdate
     }
    
     return (
        <AuthContext.Provider value={getInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;