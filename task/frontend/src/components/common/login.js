import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Form, Button, Alert } from "react-bootstrap";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loader, setLoader] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    setLoader(true);
    try {
      const response = await axios.post("http://localhost:5000/common/login", {
        email,
        password,
      });
      setLoader(false);
      console.log(response.data.role);
      localStorage.setItem("token", response.data.token);
      if (response.data.role == "Employee") {
        navigate("/employee/dashboard");
      } else {
        navigate("/HR/dashboard");
      }
    } catch (error) {
      console.log(error.response.data);
      setLoader(false);
      setServerResponse(error.response.data.msg);
    }
  };

  return (
    <Card className="mt-5 mx-auto" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Login Form</Card.Title>
        {serverResponse && <Alert variant={"danger"}>{serverResponse}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;
