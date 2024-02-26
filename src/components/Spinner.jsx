import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { Triangle } from 'react-loader-spinner'
import LinearProgress from '@mui/material/LinearProgress';

const Spinner = ({msg,progressState}) => {


    useEffect(() => {
     
    }, [progressState ])
    
  return (
    <>
    <Box sx={{width:'80%',display:'flex',flexDirection:'column',alignContent:'center',justifyContent:'center'}}>
        <Box
            sx={{display:'flex',alignContent:'center',justifyContent:'center'}}
        >
        <Triangle
            height="70"
            width="70"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
            />
        </Box>
        <Box sx={{textAlign:'center'}}>
            {msg}
        </Box>
        {
            progressState && (
                <Box sx={{ width: '100%',mt:4 }}>
                    <LinearProgress variant="determinate" value={progressState} />
                </Box>
           )
      }
    </Box>
        
    </>
  )
}

export default Spinner