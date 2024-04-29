import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import  firebaseapp  from '../firebase-config';
import {  categoryFeeds, getAllFeeds } from "../utils/fetchData";
import Spinner from "./Spinner";
import  PinVideo  from "./PinVideo";
import NotFound from "./NotFound";
import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Feed = () => {
  const db = getFirestore(firebaseapp);
  const [feeds, setFeeds] = useState(null);
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();



  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      categoryFeeds(db, categoryId).then((data) => {
        setFeeds(data);
        setLoading(false);
      });
    } else {
      getAllFeeds(db).then((data) => {
        setFeeds(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) {
   return(
      <Box
        sx={{
          width:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          height:'100%',
        }}
      >
       <Spinner msg={"Loading your feeds"} />
      </Box>
    )
  };
  if (!feeds?.length > 0) return (
    <Box sx={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <NotFound />
    </Box>
  );

  return (

    <Box sx={{
      py:4,
      width:'100%'
    }}>

      <Grid container spacing={{ xs: 2,sm:2, md: 2 }} sx={{display:'flex',justifyContent:{xs:'center',sm:'flex-start',md:'flex-start'},alignItems:'center'}} >
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


export default Feed
