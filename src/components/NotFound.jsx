import React from "react";
import notFoundSvg from "../images/notfound.svg";
import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box
    sx={{
        maxWidth:'400px',
        height:'300px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        mt:6
    }}
    >
      <img src={notFoundSvg} style={{width:'100%',height:'100%',objectFit:'contain'}} />
      <Typography sx={{
        fontSize:'40px',
        fontWeight:'semibold',
        fontFamily:'cursive'
      }} >
        Not Found
      </Typography>
    </Box>
  );
};

export default NotFound;
