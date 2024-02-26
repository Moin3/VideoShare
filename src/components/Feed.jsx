import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import  firebaseapp  from '../firebase-config';
import {  getAllFeeds } from "../utils/fetchData";
import Spinner from "./Spinner";
import  PinVideo  from "./PinVideo";
import { useParams } from "react-router-dom";
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

const Feed = () => {
  const db = getFirestore(firebaseapp);

  const [feeds, setFeeds] = useState(null);
  const [loading, setLoading] = useState(false);
  // const { categoryId } = useParams();

  // useEffect(() => {
  //   setLoading(true);
  //   if (categoryId) {
  //     categoryFeeds(db, categoryId).then((data) => {
  //       setFeeds(data);
  //       setLoading(false);
  //     });
  //   } else {
  //     getAllFeeds(db).then((data) => {
  //       setFeeds(data);
  //       setLoading(false);
  //     });
  //   }
  // }, [categoryId]);
  useEffect(()=>{
    setLoading(true);
    getAllFeeds(db).then((data) => {
            setFeeds(data);
            setLoading(false);
          });
  },[])

  if (loading) {
   return(
      <Box
        sx={{
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          height:'100%',
          mr:5
        }}
      >
       <Spinner msg={"Loading your feeds"} />
      </Box>
    )
  };
  if (!feeds?.length > 0) return <NotFound />;

  return (

    <Box sx={{
      py:4
    }}>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        { feeds && feeds.map((data, index) => (
          <Grid item  key={index}>
            <Item>
              <PinVideo key={data.id}  data={data} />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
    
  );
};


export default Feed

{/* <Grid container >
        <Grid item xs={3}>
          <Item>
          {feeds &&
            feeds.map((data) => (
              <PinVideo key={data.id} maxWidth={420} height="80px" data={data} />
            ))}
          </Item>
        </Grid>
      </Grid> */}