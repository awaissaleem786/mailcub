import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Grid from "@mui/material/Grid";
import Box  from "@mui/material/Box";
import axios from "axios";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import logoimg from "../assets/LOGO 3.png";
import Button from "@mui/material/Button";
import CircleIcon from '@mui/icons-material/Circle';
import { useNavigate } from "react-router-dom";
let theme = createTheme();
theme = responsiveFontSizes(theme);

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [firstName, setfirstname] = useState("");
  const [lastname,setlastname]=useState("")
  const [lower,setlower]=useState(false)
  const [number,setnumber]=useState(false);
  const [upper,setupper]=useState(false)
  const [length,setlength]=useState(false)
  const validateForm = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(firstName)) {
      errors.firstName = "First Name can only contain letters and spaces";
    } else if(firstName.length>8)
      {
        errors.firstName="name limit exeeded"
      }
      else if(firstName.length<3)
      {
        errors.firstName="name has tosmall"
      }
       if(!password.trim())
       {
        errors.password="password has requird"
       }
       else if(!lower||!number||!upper||!length)
       {
        errors.password= "Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long";
       }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleChange=(value)=>{
    setPassword(value)
    const lower = new RegExp('(?=.*[a-z])');
  const upper = new RegExp('(?=.*[A-Z])');
  const number = new RegExp('(?=.*[0-9])');
  const length = new RegExp('(?=.{8,})')
     
  if(lower.test(value))
  {
    setlower(true)
  }
  else{
    setlower(false)
  }
  if(upper.test(value))
  {
    setupper(true)
  }
  else{
    setupper(false)
  }
  if(number.test(value))
  {
    setnumber(true)
  }
  else{
    setnumber(false)
  }
  if(length.test(value))
  {
    setlength(true)
  }
  else
  {
    setlength(false)
  }
  }
  const navigate=useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const headers = { "Content-Type": "application/json" };
      try {
        const response =await axios.post(
          "http://146.190.164.174:4000/api/admin/signup_admin",
          {
            first_name: firstName, // Use state variable for first name
            last_name: lastname,
            email: email, // Use state variable for email
            password: password,
            status: true,
          },
          {headers}
        );
        if (response.status === 200) {
          // Signup successful
          // console.log("Signup successful");
          localStorage.setItem("token", response.data.token);
          console.log("SignUp successful:", response.data);
          toast.success("Signup successful");
          navigate('/')
        } else {
          // Signup failed
          console.error("Signup failed");
        }
      } catch (error) {
        console.error("Error:", error.response);
        toast.error("Error: " + error.response.data.message);

      }
    }
  
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
          <ToastContainer position="top-right" autoClose={3000} />
      <div className="container-fluid">
        <div
          className="container"
          style={{ height: "100vh", maxWidth: "1200", margin: "0 auto" }}
        >
          <div className="row">
            <div className="col-md-7 ">
              <ThemeProvider theme={theme}>
                <div
                  style={{
                    position: "absolute",
                    height: "60px",
                    width: "60px",
                  }}
                >
                  <img src={logoimg} alt="" className="img-fluid " />
                </div>
                <Typography
                  variant="h5"
                  style={{ fontWeight: "bold", paddingTop: "80px" }}
                >
                  Get started with a Forever <br /> Free plan
                </Typography>
                <Typography variant="caption" className="pt-2 ">
                  Sign up in seconds.No credit card requird.
                </Typography>
              </ThemeProvider>
              <form onSubmit={handleSubmit}>
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  size="small"
                  id="name"
                  label="first name"
                  name="name"
                  autoComplete="name"
                  sx={{ mb: 0, width: "40ch" }}
                  autoFocus
                  value={firstName}
                  onChange={(e) => setfirstname(e.target.value)}
                  error={errors.firstName ? true : false}
                  helperText={errors.firstName}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  size="small"
                  id="name"
                  label="last name"
                  name="lastname"
                  autoComplete="lastname"
                  onChange={(e)=>setlastname(e.target.name)}
                  sx={{ mb: 0, width: "40ch" }}
                  autoFocus
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  size="small"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  sx={{ mb: 0, width: "40ch" }}
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email ? true : false}
                  helperText={errors.email}
                />
                <TextField
                  margin="normal"
                  id="number"
                  label="Phone"
                  name="number"
                  size="small"
                  autoComplete="number"
                  sx={{ pb: 1, width: "40ch" }}
                  autoFocus
                />

                <FormControl sx={{ width: "40ch",pt:1 }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    value={password}
                    size="small"
                    // onChange={(e) => setPassword(e.target.value)}
                    onChange={(e)=>handleChange(e.target.value)}
                    error={errors.password ? true : false}
                    helperText={errors.password}
                  />
                  <Grid container spacing={1} pt={2}>
                    <Grid item sm={6}>
                      <Typography variant="button" display="block" gutterBottom>
                    {lower?<CircleIcon sx={{color:'#e1a143'}} fontSize="small"/>:<CircleIcon color="disabled" fontSize="small"/>}One lowercase 
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <Typography variant="button" display="block" gutterBottom>
                      {number?<CircleIcon sx={{color:'#e1a143'}} fontSize="small"/>:<CircleIcon color='disabled' fontSize="small"/>}  one numbercase
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <Typography variant="button" display="block" gutterBottom>
                        {upper?<CircleIcon sx={{color:'#e1a143'}} fontSize="small"/>:<CircleIcon color="disabled" fontSize="small"/>}one uppercase
                      </Typography>
                    </Grid>
                    <Grid item sm={6}>
                      <Typography variant="button" display="block" gutterBottom>
                       {length?<CircleIcon sx={{color:'#e1a143'}} fontSize="small"/>:<CircleIcon color="disabled" fontSize="small"/>} 8 minimum 
                      </Typography>
                    </Grid>
                    <Grid item sm={12}>
                      <Typography variant="button" display="block" gutterBottom>
                        By clicking,you agree to Terms of Use,Privacy Policy and  Anti-Spam Policy.
                      </Typography>
                    </Grid>
                    
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: "#FBA834" }}
                  >
                    Sign up
                  </Button>
                </FormControl>
              </form>
            </div>
            <div className="col-md-5" style={{backgroundColor: "#FBA834"}}>
              <ThemeProvider theme={theme}>
                <Box sx={{pt:10}}>
                <Typography variant="h4" sx={{fontWeight:"bold"}}>
                  Try advandced feature htmlFor 30 days
                </Typography>
                <Typography sx={{pt:2}}>
                  Your 30-days trial of Advancd feature includes: 
                </Typography>
                <Typography variant="h5" sx={{pt:1}}>
                <CheckCircleIcon/> Acess to Premium features
                </Typography>
                <Typography sx={{pt:1}}>
                  Live Chat,template library,auto resend,promotion pop-ups,Al writing  assistant and more
                </Typography>
                <Typography variant="h5" sx={{pt:1}}>
                <CheckCircleIcon/>  Access to main feature
                </Typography>
                <Typography sx={{pt:1}}>
                  Email automation,landin pages,website builder and more
                </Typography>
                <Typography variant="h5" sx={{pt:1}}>
                <CheckCircleIcon/>  UP to 1,000 subcribers
                </Typography>
                <Typography variant="h5" sx={{pt:1}}>
                <CheckCircleIcon/> Send up to 12,000 emails per month
                </Typography>
                <Typography variant="h5" sx={{pt:1}}>
                <CheckCircleIcon/> 24/7 live chat support
                </Typography>
                <Typography variant="h5" sx={{pt:1}}>
                <CheckCircleIcon/> Upgrade anytime
                </Typography>
                </Box>
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
