import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";

export default function EmpCheckinCheckout(props) {
  const navigate = useNavigate();
  const [empAttendance, setEmpAttendance] = useState([]);
  useEffect(() => {
    var token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    axios
      .get("http://localhost:5000/HR/get-employees-checkin-checkout", {
        headers: {
          authorization: token,
        },
      })
      .then((result) => {
        const response = result.data.result;
        const attendance = response.map((item) => {
          var checkin;
          var checkout;
          const lastAttendance = item.attendance[item.attendance.length - 1];
          if (lastAttendance != undefined) {
            if (
              lastAttendance.checkIn != undefined ||
              lastAttendance.checkIn != null
            ) {
              checkin = formateDate(lastAttendance.checkIn);
            }
          }

          if (lastAttendance != undefined) {
            if (
              lastAttendance.checkOut != undefined ||
              lastAttendance.checkOut != null
            ) {
              checkout = formateDate(lastAttendance.checkOut);
            }
          }

          return {
            id: item._id,
            username: item.username,
            checkin: checkin,
            checkout: checkout,
          };
        });
        setEmpAttendance(attendance);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formateDate = (date) => {
    const d = new Date(date);
    const checkoutYear = d.getFullYear();
    const checkoutMonth = d.getMonth();
    const checkoutDay = d.getDate();
    const checkoutTime = d.toLocaleTimeString("en-US");
    return `${checkoutYear}/${checkoutMonth}/${checkoutDay}/${checkoutTime}`;
  };
  return (
    <div>
      <Navbar />
      <br />
      <Table striped bordered hover className="w-75 mx-auto">
        <thead>
          <tr>
            <th>#</th>
            <th>Empoyee Name</th>
            <th>Check In</th>
            <th>Check Out</th>

          </tr>
        </thead>
        <tbody>
          {empAttendance.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.checkin && item.checkin}</td>
                <td>{item.checkout && item.checkout}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
