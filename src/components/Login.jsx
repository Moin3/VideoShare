import React, { useEffect } from 'react'
import {Box}from '@mui/material';
import Fab from '@mui/material/Fab';
import { FcGoogle } from "react-icons/fc";
import LoginImg from '../images/login.jpg'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore ,setDoc,doc} from "firebase/firestore";
import  firebaseapp  from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { userAccessToken } from '../utils/fetchUser';

const Login = () => {
    const firebaseAuth=getAuth(firebaseapp)
    const provider=new GoogleAuthProvider()
    const db = getFirestore(firebaseapp);
    const navigate=useNavigate()

    const login=async()=>{
        const {user}=await signInWithPopup(firebaseAuth,provider)
        const {refreshToken,providerData}=user

        localStorage.setItem('user',JSON.stringify(providerData))
        localStorage.setItem('accessToken',JSON.stringify(refreshToken))
        
        await setDoc(
            doc(
                db,
                "users",
                providerData[0].uid
            ),providerData[0]
        )
        
        navigate('/',{replace:true})
    }

    useEffect(() => {
     const accessToken=userAccessToken()
     if(accessToken){
      navigate('/', { replace: true })
     }
    },[])

  return (
   
    <>
        <Box
            sx={{
                display:'flex',
                alignItems:'center',
                justifyContent:"center",
                width:"100vw",
                height:'100vh',
                backgroundRepeat:'no-repeat',
                backgroundSize:"cover",
                backgroundPosition:'center',
                backgroundImage:`url(${LoginImg})`
            }}
        >

                <Fab variant="extended" size="medium" aria-label="add" sx={{display:"flex",gap:'10px'}} onClick={()=>login()}>
                    <FcGoogle style={{fontSize:'25px'}}/>
                    Login With Google
                </Fab>

        </Box>
    </>
    
  )
}

export default Login