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
    if (data) setUserId(data?.userId);
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
        width:{xs:'300px',sm:'200px',md:'240px',lg:'300px'},
        height:'150px',
        bgcolor:'#e7fcfc',
        position:'relative'
       }}
    >
        <Link to={`/videoDetail/${data?.id}`}>
          <video
            src={data?.videoUrl}
            muted
            onMouseOver={(e) => e.target.play()}
            onMouseOut={(e) => e.target.pause()}
            style={{width: '100%',height: '100%',position:'absolute',top:0,left:0,objectFit:'cover',borderRadius:'5px'}}
          />
        </Link>
    </Box>
    <Box
      sx={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
        maxWidth:'300px'
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
              fontSize:'12px',
              color:'black',
              textAlign:'right',
              fontWeight:'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '150px',
              mt:'8px'
            }}
          >
            {data?.title}
          </Typography>


          <Typography sx={{
              fontSize:'11px',
              color:'black',
              textAlign:'right',
              fontStyle: 'italic'
              
            }}>
              {moment(new Date(parseInt(data?.id)).toISOString()).fromNow()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PinVideo;

