import { Box, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';
import { Link, useParams } from 'react-router-dom';
import { getSpecificVideo } from '../utils/fetchData';
import { getFirestore } from 'firebase/firestore';
import firebaseapp from '../firebase-config';
import Spinner from './Spinner';
import ReactPlayer from 'react-player/lazy'








const VideoPinDetails = () => {
    const db = getFirestore(firebaseapp);
    const {videoId}=useParams()
    

    const [isLoading, setIsLoading] = useState(false);
    const [videoInfo, setVideoInfo] = useState(null);


    useEffect(()=>{

        if (videoId) {
            setIsLoading(true);
            getSpecificVideo(db, videoId).then((data) => {
              setVideoInfo(data);
              setIsLoading(false);
            });
          }
    
    },[videoId])


  if (isLoading) return (
    <Box
        sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        mr:5
        }}
    >
        <Spinner />
    </Box>
    );

  return ( 
    <Box sx={{display:'flex',flexDirection:'column',gap:3}}>
        <Box sx={{mt:5}}>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                >
                <Link to="/">
                    <CameraIndoorIcon/> 
                </Link>
                <Typography>{videoInfo?.category}</Typography>
            </Stack>
        </Box>
        <Box>
            <ReactPlayer url={`${videoInfo?.videoUrl}`} />
        </Box>
    </Box>
  )
}

export default VideoPinDetails