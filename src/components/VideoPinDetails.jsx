import { Box, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';
import { Link, useParams } from 'react-router-dom';
import { getSpecificVideo } from '../utils/fetchData';
import { getFirestore } from 'firebase/firestore';
import firebaseapp from '../firebase-config';
import Spinner from './Spinner';
import ReactPlayer from 'react-player/lazy'
import moment from 'moment';








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
    <Box sx={{display:'flex',flexDirection:'column',gap:{xs:1,sm:2,md:3}}}>
        <Box sx={{mt:{xs:1,sm:3,md:5}}}>
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
        <Box sx={{maxWidth:'640px',display:'flex',flexDirection:'column'}}>
            <ReactPlayer
                url={`${videoInfo?.videoUrl}`}
                controls={true}
                volume={0.2}
                width='100%'
                // height={'100%'}
            />
            <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',mx:1,mt:1}}>
            <Typography sx={{
                fontSize:'11px',
                color:'black'
            }}>
              🌍 {videoInfo?.location}
            </Typography>
            <Typography sx={{
                fontSize:'11px',
                color:'black',
                fontStyle: 'italic'
            }}>
                {moment(new Date(parseInt(videoInfo?.id)).toISOString()).fromNow()}
            </Typography>
          </Box>

          <Box sx={{fontWeight:'Bold',fontSize:'25px',mt:1}}>
            🎬 {videoInfo?.title} 📽️
          </Box>
            
        </Box>
    </Box>
  )
}

export default VideoPinDetails