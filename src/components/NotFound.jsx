import React from "react";
import notFoundSvg from "../images/notfound.svg";
import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box
    sx={{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
    }}
    >
      <img src={notFoundSvg} style={{width:'600px'}} />
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
