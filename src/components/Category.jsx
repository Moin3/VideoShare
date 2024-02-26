import { Tooltip } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'

const Category = ({data}) => {
  return (
        <Link to={`/category/${data.name}`} style={{ textDecoration: 'none' ,color:'black' }}>
            <Tooltip title={data.name} placement="left" arrow>
                <Box sx={{height:'50px' ,width:'50px',display:'flex',flexDirection:'column',alignItems:'center',marginLeft:{xs:'0px',sm:'15px'},justifyContent:{xs:"center",sm:"space-evenly"},border:'.1px solid white',bgcolor:'#2baeff',color:'white',p:{xs:'0px',sm:'5px'}}}>
                    {data.iconSrc}
                </Box>
            </Tooltip>
        </Link>
    
  )
}

export default Category