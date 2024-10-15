import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import ReactDOM from "react-dom";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import LoanApp from "./Loan/LoanApp";
import LoanAppList from "./Loan/LoanAppList";
import LoanDetailsPage from "./Loan/LoanDeatilsPage";
import EditLoanApplication from "./Loan/EditLoanApplication";
import ViewBanks from "./Loan/ViewBanks";
import AddNewBank from "./Loan/AddNewBank";
import EditBank from "./Loan/EditBank";
import LoanAppView from "./Loan/LoanAppView";
import Home from "./pages/Home";
import EducationLoan from "./Loan/EducationLoan";
import Home2 from "./pages/Home2";
import AboutUs from "./pages/AboutUs";

const App = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Home2 />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/loan-app" element={<LoanApp />} />
          <Route path="/loan-app-list" element={<LoanAppList />} />
          <Route path="/loan-app-view/:id" element={<LoanAppView />} />
          <Route path="/loan-app-edit/:id" element={<EditLoanApplication />} />
          <Route path="/loan-app-web" element={<EducationLoan />} />
          <Route path="/bank-list" element={<ViewBanks />} />
          <Route path="/bank-add" element={<AddNewBank />} />
          <Route path="/bank-edit/:id" element={<EditBank />} />{" "}
          <Route path="/loan-app-view" element={<LoanDetailsPage />} />
          <Route path="/loan-app-edit" element={<EditLoanApplication />} />
          </Routes>
      </Router>
      <Footer />
    </div>
  );
};
export default App;
