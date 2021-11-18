import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default function Navabr(props) {
 
  return (
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
            props.onCheckInHandler();
          }}
        >
          CheckIn
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => {
            props.onCheckOutHandler();
          }}
        >
          CheckOut
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
