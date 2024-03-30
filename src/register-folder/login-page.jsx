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
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import loginbanner from "../assets/duong-ngan-bTJCc2zVW7k-unsplash.jpg";
import logoimg from "../assets/LOGO 3.png";
import Button from "@mui/material/Button";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
    const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://146.190.164.174:4000/api/app_api/login",
          {
            email: email, // Use email state
            password: password, // Use password state
            type: 0,
          }
        );
        if(response.status===200)
        {
          localStorage.setItem("token",response.data.token)
          console.log("sign-in successful:",response.data)
          toast.success("Login successful")
          navigate("/dashboard")
          
        }
        else{
          console.error("Error fetching data",response.status.text)
        }
      } catch(error) {

        toast.error("Error: " + error.response.data.message);
        
          console.error("Sign-in error:",error.response)
        
      }
      // Proceed with form submission
      console.log("Form submitted:", { email, password });
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
        <div className="container" style={{ height: "100vh" }}>
          <div className="row">
            <div className="col-md-7 pt-5">
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
                  variant="h4"
                  style={{ fontWeight: "bold", paddingTop: "100px" }}
                >
                  Sign in to your Mailcub <br /> account
                </Typography>
                <Typography
                  variant="h6"
                  style={{ fontWeight: "bold" }}
                  className="pt-2 "
                >
                  Don't have an account yet?
                  <span style={{ color: "#FBA834", fontWeight: "normal" }}>
                    <NavLink to={"/signup"}> Sign up</NavLink>
                  </span>
                </Typography>
              </ThemeProvider>
              <form onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  sx={{ pb: 2, width: "40ch" }}
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email ? true : false}
                  helperText={errors.email}
                />
                <FormControl sx={{ width: "40ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" fullWidth>
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
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password ? true : false}
                    helperText={errors.password}
                  />
                  <Typography
                    variant="h7"
                    style={{ fontWeight: "bold" }}
                    className="pt-2 "
                  >
                    <span
                      style={{
                        color: "#FBA834",
                        fontWeight: "normal",
                        float: "right",
                      }}
                    >
                      {" "}
                      Forget Password?
                    </span>
                  </Typography>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: "#FBA834" }}
                  >
                    Login In
                  </Button>
                </FormControl>
              </form>
            </div>
            <div className="col-md-5 ">
              <img
                src={loginbanner}
                alt=""
                className="img-fluid w-100 "
                style={{ height: "100vh" }}
              />
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default LoginPage;
