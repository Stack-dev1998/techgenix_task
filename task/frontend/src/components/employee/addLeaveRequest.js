import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Form, Button, Alert } from "react-bootstrap";
import Navbar from "./Navbar";

function AddLeaveRequest() {
  const navigate = useNavigate();
  const [reason, setReason] = useState();
  const [NoOfLeaves, setNoOfLeaves] = useState();
  const [serverResponse, setServerResponse] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios.post(
        "http://localhost:5000/employee/request-for-leave",
        {
          reason,
          NoOfLeaves,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
  setServerResponse(response.data.msg);
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
      setServerResponse(error.response.data.msg);
    }
  };

  return (
    <div>
      <Navbar />
      <Card className="mt-5 mx-auto" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Request for Leave</Card.Title>
          {serverResponse && <Alert variant={"success"}>{serverResponse}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reason"
                onChange={(e) => setReason(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>No Of Leaves</Form.Label>
              <Form.Control
                type="number"
                placeholder="No of leaves"
                onChange={(e) => setNoOfLeaves(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddLeaveRequest;
