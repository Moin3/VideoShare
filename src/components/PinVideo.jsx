import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gertUserInfo } from "../utils/fetchData";
import { getFirestore } from "firebase/firestore";
import  firebaseapp  from "../firebase-config";
import moment from "moment";
import { Avatar, Box, Typography } from "@mui/material";



const avatar =
  "https://ak.picdn.net/contributors/3038285/avatars/thumb.jpg?t=164360626";

const PinVideo = ({ data }) => {
  const db = getFirestore(firebaseapp);
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (data) setUserId(data.userId);
    if (userId)
      gertUserInfo(db, userId).then((data) => {
        setUserInfo(data);
      });
  }, [userId]);

  return (
    <Box>
    <Box
       sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        cursor:'pointer',
        overflow:"hidden",
        maxWidth:'300px',
        height:'120px',
        bgcolor:'#e7fcfc'
       }}
    >
      <Box sx={{
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      }}>
        <Link to={`/videoDetail/${data?.id}`}>
          <video
            src={data.videoUrl}
            muted
            onMouseOver={(e) => e.target.play()}
            onMouseOut={(e) => e.target.pause()}
            style={{width:'100%'}}
          />
        </Link>
      </Box>
    </Box>
    <Box
      sx={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
        maxWidth:'300px',
      }}>
        <Link to={`/userDetail/${userId}`}>
            <Avatar
              src={userInfo?.photoURL ? userInfo?.photoURL : avatar}
              sx={{ width: 25, height: 25 }}
            />
          </Link>
        <Box 
          sx={{
            display:'flex',
            justifyContent:'flex-end',
            flexDirection:'column'
          }}
        >
          <Typography 
              sx={{
                fontSize:'13px',
                color:'black',
                textAlign:'right',
                fontWeight:'bold'
              }}>
                {data.title}
          </Typography>

          <Typography sx={{
              fontSize:'11px',
              color:'black',
              textAlign:'right',
              fontStyle: 'italic'
              
            }}>
              {moment(new Date(parseInt(data.id)).toISOString()).fromNow()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PinVideo;

