import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Nav } from "react-bootstrap";

export default function Navbar() {
  const navigate = useNavigate();
  const [serverResponse, setServerResponse] = useState(null);

  const onCheckInHandler = async (e) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/employee/check-in",
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );
      setServerResponse(response.data.msg);
    } catch (error) {
      console.log(error.response.data);
      setServerResponse(error.response.data.msg);
    }
  };

  const onCheckOutHandler = async (e) => {
    const token = localStorage.getItem("token");
    console.log(token);
    console.log("clikd");
    try {
      const response = await axios.post(
        "http://localhost:5000/employee/check-out",
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );
      setServerResponse(response.data.msg);
    } catch (error) {
      console.log(error.response.data);
      setServerResponse(error.response.data.msg);
    }
  };

  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <Nav className="justify-content-center bg-dark">
        <Nav.Item>
          <Nav.Link>
            <NavLink to={"/employee/dashboard"}>All leave requests</NavLink>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">
            <NavLink to={"/employee/request-for-leave"}>
              Request for leave
            </NavLink>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              onCheckInHandler();
            }}
          >
            CheckIn
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              onCheckOutHandler();
            }}
          >
            CheckOut
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              onLogoutHandler();
            }}
          >
            Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {serverResponse && <Alert variant={"success"}>{serverResponse}</Alert>}
    </div>
  );
}
