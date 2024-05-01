import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { Avatar, Tooltip } from '@mui/material';
import { Link, useNavigate  } from 'react-router-dom';
import { useSearchValue } from './context/SearchProvider';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));




export default function Navbar({user}) { 
  const { setSearchText } = useSearchValue();
  const navigate=useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout=()=>{
    localStorage.clear()
    navigate('/login')
  }




  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><Link to={`/userDetail/${user?.uid}`} style={{ textDecoration: 'none' ,color:'black' }}>Profile</Link></MenuItem>
      <MenuItem onClick={()=>handleLogout()}>Logout</MenuItem>
    </Menu>
  );

 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{bgcolor:'#2baeff',boxShadow:'none'}} >
        <Toolbar>
          <Link  to={'/'} style={{ textDecoration: 'none', color: 'white' }} >
            <MenuItem>
                <PlayCircleFilledIcon sx={{color:'black',bgcolor:'orangered',borderRadius:'100%',overflow:'hidden'}}/>
                <Typography
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' },ml:1 }}
                >
                VidShare
            </Typography>
            </MenuItem>
          </Link>
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              onChange={(e)=>setSearchText(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <Link  to={'/create'} style={{ textDecoration: 'none', color: 'white' }} >
              <Tooltip title={'Upload Video'} placement="left" arrow>
                  <IconButton size="small" style={{marginTop:'12px',backgroundColor:'white',color:'blue'}}>
                      <AddIcon />
                  </IconButton>
                </Tooltip>
            </Link>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
                {user && (<Avatar alt="Remy Sharp" style={{width:'35px',height:'35px'}} src={user?.photoURL}  />)}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
