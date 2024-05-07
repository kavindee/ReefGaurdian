// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import cblogo from './CoralLogo.png';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ background: '#36949B', boxShadow: 'none', color: 'white' }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          ReefGuardian
        </Typography>
        
        <Link to="/" style={{ textDecoration: 'none', color: 'white', marginLeft: '20px' }}>
          <Typography variant="h6" noWrap component="div">
            Home
          </Typography>
        </Link>
        <Link to="/classification" style={{ textDecoration: 'none', color: 'white', marginLeft: '20px' }}>
          <Typography variant="h6" noWrap component="div">
            Classification
          </Typography>
        </Link>
        <Link to="/health" style={{ textDecoration: 'none', color: 'white', marginLeft: '20px' }}>
          <Typography variant="h6" noWrap component="div">
            Health
          </Typography>
        </Link>
        <Link to="/quality" style={{ textDecoration: 'none', color: 'white', marginLeft: '20px' }}>
          <Typography variant="h6" noWrap component="div">
            Quality
          </Typography>
        </Link>
        <Link to="/crowd" style={{ textDecoration: 'none', color: 'white', marginLeft: '20px' }}>
          <Typography variant="h6" noWrap component="div">
            Crowd Sourcing  .  
          </Typography>
          
        </Link>
        <Avatar marginRight='1000' src={cblogo} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
