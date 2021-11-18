import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";

export default function TodayEmnpStatus(props) {
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
          var isPresent = false;
          const lastAttendance = item.attendance[item.attendance.length - 1];
          if (lastAttendance != undefined) {
            if (
              lastAttendance.checkIn != undefined ||
              lastAttendance.checkIn != null
            ) {
              var LA = new Date(lastAttendance.checkIn);
              var CD = new Date();
              if (
                LA.getFullYear() == CD.getFullYear() &&
                LA.getMonth() == CD.getMonth() &&
                LA.getDate() == CD.getDate()
              ) {
                isPresent = true;
              }
            }
          }
          return {
            id: item._id,
            username: item.username,
            isPresent: isPresent,
          };
        });
        setEmpAttendance(attendance);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <br />
      <Table striped bordered hover className="w-75 mx-auto">
        <thead>
          <tr>
            <th>#</th>
            <th>Empoyee Name</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {empAttendance.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.isPresent ? "Present" : "Absent"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
