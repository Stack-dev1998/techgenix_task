import React from "react";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import HRDashboard from "./components/HR/dashboard";
import AllEmployees from "./components/HR/allEmployees";
import EmpCheckInCheckOut from "./components/HR/empCheckinCheckout";
import TodayEmpStatus from "./components/HR/todayEmpStatus";

import EmployeeDashboard from "./components/employee/dashboard";
import LeaveRequest from "./components/employee/addLeaveRequest";
import Login from "./components/common/login";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />

          <Route
            exact
            path="/employee/dashboard"
            element={<EmployeeDashboard />}
          />
          <Route
            exact
            path="/employee/request-for-leave"
            element={<LeaveRequest />}
          />

          <Route exact path="/HR/dashboard" element={<HRDashboard />} />
          <Route exact path="/HR/all-employees" element={<AllEmployees />} />
          <Route
            exact
            path="/HR/employees-checkin-checkout"
            element={<EmpCheckInCheckOut />}
          />
          <Route
            exact
            path="/HR/today-emp-status"
            element={<TodayEmpStatus />}
          />

          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
