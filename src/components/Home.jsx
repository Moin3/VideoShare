import React from 'react'
import Navbar from './Navbar'
import { Route, Routes } from 'react-router-dom'
import Feed from './Feed'
import Create from './Create'
import Category from './Category'
import Box from '@mui/material/Box';
import { categories } from '../data'
import VideoPinDetails from './VideoPinDetails'
import UserDetails from './UserDetails'



const Home = ({user}) => {
  return (
    <div>
        <Navbar user={user}/>
        <Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row'},height:'calc(100vh - 64px)',columnGap:2,py:3}}>
          <Box sx={{display:'flex',flexDirection:{xs:'row',sm:'column'},flex:2,justifyContent:'center',alignItems:'center',mt:{xs:4,sm:7}}}>
            {categories && categories.map(data=> <Category key={data.id} data={data}/>)}
          </Box>
          <Box sx={{flex:10,overflowY:'scroll',py:3}}>
            <Routes>
                <Route path='/' element={<Feed/>}/>
                <Route path='/category/:categoryId' element={<Feed/>}/>
                <Route path='/create' element={<Create/>}/>
                <Route path='/videoDetail/:videoId' element={<VideoPinDetails/>}/>
                <Route path='/userDetail/:userId' element={<UserDetails/>}/>
            </Routes>
        </Box>
        </Box>
        
    </div>
  )
}

export default Home