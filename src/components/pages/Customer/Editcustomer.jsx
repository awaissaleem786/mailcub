import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Grid, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Bounce } from "react-toastify"; // Import Bounce transition
import Swal from "sweetalert2";

const EditCustomerForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [industryType, setIndustryType] = useState("");

  // const [customerType, setCustomerType] = useState("");
  const [customer, setCustomer] = useState({});

  const { userid } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const headers = {
    "x-sh-auth": token,
  };

  const getUsers = async (userid) => {
    try {
      const response = await axios.get(
        `http://146.190.164.174:4000/api/customer/detail_customer_by_admin/${userid}`,
        { headers: headers }
      );
      const userData = response.data.data;
      setCustomer(userData);
      setFirstName(userData.first_name);
      setLastName(userData.last_name);
      setEmail(userData.user.email);
      setIndustryType(userData.industry_type);
      // setCustomerType(userData.customer_type);
      console.log("cheker", userData);
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://146.190.164.174:4000/api/customer/edit_customer_by_admin/${userid}`,
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          industry_type: industryType,
          // customer_type: customerType
        },
        { headers: headers }
      );
      if (response.status === 200) {
        Swal.fire("Updated!", "Customer Profile Updated Successfully", "success");
        navigate("/customer");
        console.log("Customer updated successfully:", response.data);
      }
    } catch (error) {
      console.error("Error updated customer:", error);
    }
  };

  const handleCancel = () => {
    // Handle canceling form action
  };

  useEffect(() => {
    getUsers(userid);
  }, [userid]);

  return (
    <>

      <Container maxWidth="md">
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          sx={{ padding: "20px" }}
        >
          Edit Customer
        </Typography>
        <form>
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
                label="industry"
                variant="outlined"
                value={industryType}
                onChange={(e) => setIndustryType(e.target.value)}
                required
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
    </>
  );
};

export default EditCustomerForm;
