import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashborard from "./layouts/dashboard";
import Home from "./components/pages/Home";
import Authentication from "./layouts/Authentication";
import SignupPage from "./register-folder/sign-up";
import LoginPage from "./register-folder/login-page";
import Customer from "./components/pages/Customer";
import Support from "./components/pages/Support";
import Transtions from "./components/pages/Transtions";
import AddCustomerForm from "./components/pages/Customer/Addcustomer";
import EditCustomerForm from "./components/pages/Customer/Editcustomer";
const MyRouters = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Dashborard />}>
            <Route path="dashboard" element={<Home />} />
            <Route path="customer" element={<Customer />} />
            <Route path="addcustomer" element={<AddCustomerForm/>}/>
            <Route path="editcustomer/:userid" element={<EditCustomerForm/>}/>
            <Route path="support" element={<Support />} />
            <Route path="transtions" element={<Transtions/>}/>
          </Route>
      
        <Route element={<Authentication />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MyRouters;
