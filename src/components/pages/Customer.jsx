import React from "react";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import MiniDrawer from "../sidebar/sidebar";
import CustomerList from "./Customer/Customerlist";
// import ProductsList from "./products/Customerlist";

const Customer = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* <MiniDrawer/> */}
      <CustomerList/>
      </Box>
    </>
  );
};

export default Customer;
