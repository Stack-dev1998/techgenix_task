import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default function Navabr(props) {
  return (
    <Nav className="justify-content-center bg-dark">
      <Nav.Item>
        <Nav.Link>
          <NavLink to={"/HR/dashboard"}>Leave requests</NavLink>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">
          <NavLink to={"/HR/all-employees"}>All employee</NavLink>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <NavLink to={"/HR/employees-checkin-checkout"}>
            Employees Checkin/CheckOuts
          </NavLink>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <NavLink to={"/HR/today-emp-status"}>
           Today Employees Status
          </NavLink>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
