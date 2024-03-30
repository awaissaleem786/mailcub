import React, { useState } from "react";
import { Container, TextField, Button, Grid, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const AddCustomerForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [industrytype, setIndustry_type] = useState("");
  const [customertype, setcutomer_type] = useState("");
    const navigate=useNavigate()
  // Random data for countries and cities
  const countries = [
    { label: "USA", value: "USA" },
    { label: "Canada", value: "Canada" },
    { label: "Australia", value: "Australia" },
    { label: "UK", value: "UK" },
  ];

  const cities = [
    { label: "New York", value: "New York" },
    { label: "Los Angeles", value: "Los Angeles" },
    { label: "Toronto", value: "Toronto" },
    { label: "London", value: "London" },
  ];
  
  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://146.190.164.174:4000/api/customer/signup_customer",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          industry_type: industrytype,
          customer_type: customertype,
        }
      );
      if(response.status===200)
      {
        Swal.fire("Saved!", "Customer Data Save Successfully", "success");
        navigate("/customer");

        console.log("Customer saved successfully:", response.data);

      }
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  const handleCancel = () => {
    // Handle canceling form action
  };

  return (
    <Container maxWidth="md">
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        sx={{ padding: "20px" }}
      >
        Add Customer
      </Typography>
      <form>

{/* Same as */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              fullWidth
              options={countries}
              getOptionLabel={(option) => option.label}
              onChange={(e, value) =>
                setIndustry_type(value ? value.label : "")
              }
              renderInput={(params) => (
                <TextField {...params} label="Country" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              fullWidth
              options={cities}
              getOptionLabel={(option) => option.label}
              onChange={(e, value) => setcutomer_type(value ? value.label : "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  variant="outlined"
                  PopperProps={{ placement: "bottom-start" }} // Set placement to 'bottom-start'
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container paddingTop={5} spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddCustomerForm;
