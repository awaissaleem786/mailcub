import React from 'react'

import { styled } from "@mui/material";
import MiniDrawer from '../components/sidebar/sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/sidebar/Navbar';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden',
  });

const Main = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP + 24,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}));
const Dashborard = () => {

    
  return (
    <>
    <StyledRoot>
    <MiniDrawer/>
    <Main>
    <Navbar/>
        <Outlet />
    </Main>
</StyledRoot>

</>
  )
}

export default Dashborard;
