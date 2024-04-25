import { Alert, Avatar, Box, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteVideo, gertUserInfo, getSpecificVideo } from '../utils/fetchData';
import { getFirestore } from 'firebase/firestore';
import firebaseapp from '../firebase-config';
import Spinner from './Spinner';
import ReactPlayer from 'react-player/lazy'
import moment from 'moment';
import { fetchUser } from '../utils/fetchUser';






const avatar ="https://ak.picdn.net/contributors/3038285/avatars/thumb.jpg?t=164360626";

const VideoPinDetails = () => {
    const db = getFirestore(firebaseapp);
    const {videoId}=useParams()
    const navigate = useNavigate();
    const [localUser] = fetchUser();

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [videoInfo, setVideoInfo] = useState(null);
    const [userInfo, setUserInfo] = useState(null);


    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
      };
    
    const deleteSpecificVideo=(videoId)=>{
        setIsLoading(true);
        deleteVideo(db,videoId)
        setIsLoading(false);
        navigate("/", { replace: true });

    }


    


    useEffect(()=>{

        if (videoId) {
            setIsLoading(true);
            getSpecificVideo(db, videoId).then((data) => {
              setVideoInfo(data);
              gertUserInfo(db, data.userId).then((user) => {
                setUserInfo(user);
              });
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
           {
            videoInfo?.id && (
                <>
                 <Typography sx={{
                    fontSize:'11px',
                    color:'black',
                    fontStyle: 'italic'
                }}>
                    {moment(new Date(parseInt(videoInfo.id)).toISOString()).fromNow()}
                </Typography>
                </>
            )
           }
          </Box>

          <Box sx={{fontWeight:'bold',fontSize:'25px',mt:1}}>
            🎬 {videoInfo?.title} 📽️
          </Box>
          <Paper elevation={0} sx={{height:"100%",display:'flex',alignItems:'center',p:1,mt:2,bgcolor:'#edf0f7'}}>
            <Box sx={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center'}}>
                <Link to={`/userDetail/${videoInfo?.userId}`} style={{textDecoration:'none',color:'black',display:'flex',flexDirection:'row',gap:4,alignItems:'center'}}>
                    <Avatar
                        src={userInfo?.photoURL ? userInfo?.photoURL : avatar}
                        sx={{ width: 35, height: 35 }}
                    />
                    <Typography sx={{fontSize:'20px',fontWeight:'bold'}}>
                        {userInfo?.displayName}
                    </Typography>
                </Link>
                {
                    userInfo?.uid === localUser.uid && (
                        <Button>
                            <DeleteIcon sx={{color:'orangered'}} onClick={handleClickOpen}/>
                        </Button>
                    )
                }
                <Button>
                    <DownloadForOfflineIcon sx={{color:'teal'}}/>
                </Button>
            </Box>  
          </Paper>
          {
            open && (
                <Alert 
                    sx={{mt:2}}
                    severity="error"
                    action={
                        <>
                            <Button color="inherit" size="small" onClick={()=>deleteSpecificVideo(videoId)}>
                                <DoneIcon/>
                            </Button>
                            <Button color="inherit" size="small" onClick={handleClose}>
                                <CloseIcon/>
                            </Button>
                        </>
                      }
                >
                      Do you want to Delete this video?
                </Alert>
            )
          }
        </Box>
    </Box>
  )
}

export default VideoPinDetails