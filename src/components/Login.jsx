import React, { useEffect } from 'react';
import { Box, Paper, Typography, Fab } from '@mui/material';
import { FcGoogle } from "react-icons/fc";
import LoginImg from '../images/login.jpg';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import firebaseapp from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { userAccessToken } from '../utils/fetchUser';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

const Login = () => {
    const firebaseAuth = getAuth(firebaseapp);
    const provider = new GoogleAuthProvider();
    const db = getFirestore(firebaseapp);
    const navigate = useNavigate();

    const login = async () => {
        const { user } = await signInWithPopup(firebaseAuth, provider);
        const { refreshToken, providerData } = user;

        localStorage.setItem('user', JSON.stringify(providerData));
        localStorage.setItem('accessToken', JSON.stringify(refreshToken));

        await setDoc(
            doc(
                db,
                "users",
                providerData[0].uid
            ), providerData[0]
        );

        navigate('/', { replace: true });
    }

    useEffect(() => {
        const accessToken = userAccessToken();
        if (accessToken) {
            navigate('/', { replace: true });
        }
    }, [])

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                background: '#f0f0f0'
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                {/* Image */}
                {/* <Paper elevation={3}> */}
                <Box
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        px:2
                    }}
                >
                    <img src={LoginImg} alt="Login" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
                    
                    {/* Sign-in box */}
                    <Paper
                        elevation={3}
                        sx={{
                            position: 'absolute',
                            padding: '20px',
                            textAlign: 'center',
                            maxWidth: '300px',
                            minWidth: '200px',
                            background: '#fff',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <Typography variant="h5"sx={{fontFamily:'Playfair Display',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:1}}  gutterBottom>
                            <PlayCircleFilledIcon sx={{color:'black',bgcolor:'orangered',borderRadius:'100%',overflow:'hidden'}}/>
                            VidShare
                            <PlayCircleFilledIcon sx={{color:'black',bgcolor:'orangered',borderRadius:'100%',overflow:'hidden'}}/>
                        </Typography>
                        <Box sx={{ display: "flex",flexDirection:'row',justifyContent:'center' }}>
                        <Fab variant="extended" size="small" aria-label="add" sx={{fontFamily:'Playfair Display',fontSize:'13px', display: "flex",flexDirection:'row',justifyContent:'center',alignItems:'center', gap: '10px', marginTop: '15px' }} onClick={login}>
                            Login With<FcGoogle style={{ fontSize: '20px' }} />
                        </Fab>
                        </Box>
                    </Paper>
                </Box>
                {/* </Paper> */}
            </Box>
        </Box>
    );
}

export default Login;
