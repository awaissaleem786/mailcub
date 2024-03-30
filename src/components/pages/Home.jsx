import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MiniDrawer from "../sidebar/sidebar";
// import Navbar from '../sidebar/Navbar';
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Stack } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';
import PublicIcon from '@mui/icons-material/Public';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
const Home = () => {
  return (
    <>
    {/* background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%); */}
      {/* <Navbar/> */}
      <Box>
        {/* <MiniDrawer /> */}
        <Box component="main" >
          <Grid container spacing={2} >
            <Grid xs={12} >
              <Stack spacing={4} direction={"row"} paddingTop={12}>
              <Card sx={{ minWidth: 30+"%",height:200,background:'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)' }}>
                <CardContent>
                  <Box textAlign={"center"}>
                  <GroupsIcon sx={{boxShadow:4, borderRadius:50,width:50,height:50}} fontSize="large"/>
                  </Box>
                  <Typography variant="h3" textAlign={"center"}>
                    363
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign={"center"}>
                    Total User
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ minWidth: 30+"%",height:200,background:"linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)" }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
                    <PublicIcon sx={{boxShadow:4, borderRadius:50,width:50,height:50}} fontSize="large"/>
                  </Typography>
                  <Typography variant="h3" textAlign={"center"}>
                    94
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign={"center"}>
                    Verified Domains
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ minWidth: 30+"%",height:200,background: "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)"}}>
                <CardContent>
                  <Box gutterBottom variant="h5" component="div" textAlign={"center"} >
                    <DoNotDisturbAltIcon sx={{boxShadow:4, borderRadius:50,width:50,height:50}} fontSize="large"/>
                  </Box>
                  <Typography variant="h3" textAlign={"center"}>
                    104
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign={"center"}>
                    unverified Domains
                  </Typography>
                </CardContent>
              </Card>

              </Stack>
            </Grid>
            {/* <Grid xs={4}></Grid> */}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Home;
