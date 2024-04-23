import React from "react";
import notFoundSvg from "../images/notfound.svg";
import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box
    sx={{
        width:'100%',
        height:'70vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        mt:6
    }}
    >
      <img src={notFoundSvg} style={{widht:'100%',height:'90%',objectFit:'contain'}} />
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
