import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Button, Alert, Modal, Form } from "react-bootstrap";
import Navbar from "./navbar";

export default function AllEmployees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [employeeId, setemployeeId] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  const [addFormData, setAddFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    var token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    axios
      .get("http://localhost:5000/HR/all-employees", {
        headers: {
          authorization: token,
        },
      })
      .then((result) => {
        console.log(result);
        setEmployees(result.data.employees);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   const handleApprove = async (id) => {
  //     console.log(id);
  //     try {
  //       var token = localStorage.getItem("token");
  //       await axios.post(
  //         "http://localhost:5000/HR/approve-leave",
  //         {
  //           leaveId: id,
  //         },
  //         {
  //           headers: {
  //             authorization: token,
  //           },
  //         }
  //       );
  //       var newleaves = leaves.filter((item) => item._id != id);
  //       setLeaves(newleaves);
  //     } catch (error) {}
  //   };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    console.log(addFormData);
    try {
      var token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/HR/add-employee",
        addFormData,
        {
          headers: {
            authorization: token,
          },
        }
      );
console.log(response)
      setEmployees([...employees, addFormData]);
      console.log(response.data);
      setServerResponse(response.data.msg);
      setShowAddModal(false);
    } catch (error) {
      console.log(error.response.data);
      setServerResponse(error.response.data.msg);
    }
  };

  const handelShowUpdateModal = (id) => {
    var selectedEmployee = employees.filter((item) => item._id == id);
    console.log(selectedEmployee);
    setEmail(selectedEmployee[0].email);
    setUsername(selectedEmployee[0].username);
    setemployeeId(selectedEmployee[0]._id);
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      var token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/HR/update-employee",
        { employeeId, email, username },
        {
          headers: {
            authorization: token,
          },
        }
      );
      var newEmployees = employees.map((item) => {
        if (item._id === employeeId) {
          return {
            ...item,
            email: email,
            username: username,
          };
        } else {
          return item;
        }
      });
      setEmployees(newEmployees);
      console.log(response.data);
      setServerResponse(response.data.msg);
      setShowUpdateModal(false);
    } catch (error) {
      console.log(error.response.data);
      setServerResponse(error.response.data.msg);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      var token = localStorage.getItem("token");
      const response = await axios.delete(
        "http://localhost:5000/HR/delete-employee/" + id,
        {
          headers: {
            authorization: token,
          },
        }
      );
      var newEmployees = employees.filter((item) => item._id != id);
      setEmployees(newEmployees);
      console.log(response.data);
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
      <Navbar />
      <br />
      {serverResponse && <Alert variant={"success"}>{serverResponse}</Alert>}
      <Button
        variant="primary"
        className="btn-sm"
        onClick={() => {
          setShowAddModal(true);
        }}
      >
        Add Employee
      </Button>
      <br />
      <Table striped bordered hover className="w-100 mx-auto mt-1">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{formateDate(item.createdAt)}</td>
                <td>
                  <Button
                    className="btn btn-sm btn-dark"
                    onClick={(e) => handelShowUpdateModal(item._id)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {showUpdateModal && (
        <Modal show={showUpdateModal} onHide={setShowUpdateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  defaultValue={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
      {showAddModal && (
        <Modal show={showAddModal} onHide={setShowAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddEmployee}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) =>
                    setAddFormData({ ...addFormData, email: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  onChange={(e) =>
                    setAddFormData({ ...addFormData, username: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="passord"
                  onChange={(e) =>
                    setAddFormData({ ...addFormData, password: e.target.value })
                  }
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
