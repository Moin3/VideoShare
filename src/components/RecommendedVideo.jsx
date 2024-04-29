import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import  firebaseapp  from '../firebase-config';
import {  getAllFeeds } from "../utils/fetchData";
import Spinner from "./Spinner";
import  PinVideo  from "./PinVideo";
import NotFound from "./NotFound";
import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const RecommendedVideo = ({feeds}) => {

  return (

    <Box sx={{
      py:4,
      width:'100%'
    }}>

      <Grid container spacing={{ xs: 2, md: 3 }} sx={{display:'flex',justifyContent:'flex-start',alignItems:'center',flexDirection:{xs:'column',sm:'row',md:'column'}}} >
        { feeds && feeds.map((data, index) => (
          <Grid item  key={index} >
            <Item>
              <PinVideo key={data?.id}  data={data} />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
    
  );
};


export default RecommendedVideo
