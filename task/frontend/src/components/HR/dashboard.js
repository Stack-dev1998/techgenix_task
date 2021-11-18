import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import Navbar from "./navbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    var token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    axios
      .get("http://localhost:5000/HR/leave-requests", {
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

  const handleApprove = async (id) => {
    console.log(id);
    try {
      var token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/HR/approve-leave",
        {
          leaveId: id,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      var newleaves = leaves.filter((item) => item._id != id);
      setLeaves(newleaves);
    } catch (error) {}
  };

  const handleReject = async (id) => {
    try {
      console.log(id);
      var token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/HR/reject-leave",
        {
          leaveId: id,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      var newleaves = leaves.filter((item) => item._id != id);
      setLeaves(newleaves);
    } catch (error) {}
  };

  const formateDate = function (dateAndTime) {
    const d = new Date(dateAndTime);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
  };

  return (
    <div>
      <Navbar />
      <br />
      <Table striped bordered hover className="w-75 mx-auto">
        <thead>
          <tr>
            <th>#</th>
            <th>No Of Leaves</th>
            <th>Reason</th>
            <th>Is Approved</th>
            <th>Time</th>
            <th>Actions</th>
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
                <td>
                  <Button
                    className="btn btn-sm btn-dark"
                    onClick={(e) => handleApprove(item._id)}
                  >
                    Approve
                  </Button>{" "}
                  <Button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => handleReject(item._id)}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
