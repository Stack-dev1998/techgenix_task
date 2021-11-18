import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Alert } from "react-bootstrap";
import Navbar from "./Navbar";


export default function Dashboard() {
  const navigate = useNavigate();
  const [isCheckIn, setCheckIn] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [serverResponse, setServerResponse] = useState(null);
  useEffect(() => {
    var token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    axios
      .get("http://localhost:5000/employee/get-all-leave-requests", {
        headers: {
          authorization: token,
        },
      })
      .then((result) => {
        console.log(result);
        setLeaves(result.data.leaves);
      })
      .catch((err) => {
        console.log(err);
         navigate("/");
      });
  }, []);

  const onCheckInHandler = async (e) => {
    const token = localStorage.getItem("token");
    console.log(token);
    console.log("clikd");
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

  const formateDate = function (dateAndTime) {
    const d = new Date(dateAndTime);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  };

  return (
    <div>
      <Navbar
        onCheckInHandler={onCheckInHandler}
        onCheckOutHandler={onCheckOutHandler}
      />
      <br />
      {serverResponse && <Alert variant={"success"}>{serverResponse}</Alert>}
      <Table striped bordered hover className="w-75 mx-auto">
        <thead>
          <tr>
            <th>#</th>
            <th>No Of Leaves</th>
            <th>Reason</th>
            <th>Is Approved</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.NoOfLeaves}</td>
                <td>{item.reason}</td>
                <td>{item.isApproved}</td>
                <td>{formateDate(item.createdAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
