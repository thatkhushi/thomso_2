import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FormModal(props) {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userConatct, setUserContact] = useState("");

  //post data
  const onSubmit = async (e) => {
    e.preventDefault();
    if (props.editable) {
      props.setShowEditModal(false);
      try {
        const response = axios.put(
          `https://api.thomso.in/apiV1/assignment/${props.editable.id}`,
          { name: userName, email: userEmail, contact: userConatct }
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      props.setViewModal(false);
      const post = { name: userName, email: userEmail, contact: userConatct };
      try {
        const res = await axios.post(
          "https://api.thomso.in/apiV1/assignment",
          post
        );
        setUserEmail("");
        setUserName("");
        setUserContact("");
      } catch (e) {
        alert("Please fill all the required fields");
      }
    }
  };

  useEffect(() => {
    if (props.editable != null) {
      setUserName(props.editable.name);
      setUserEmail(props.editable.email);
      setUserContact(props.editable.contact);
    }
  }, [props.editable]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3 mt-3 ms-3 me-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={userEmail}
            onChange={(event) => {
              setUserEmail(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3 mt-3 ms-3 me-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="name"
            value={userName}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3 mt-3 ms-3 me-3">
          <Form.Label>Contact number</Form.Label>
          <Form.Control
            type="tel"
            controlId="ind_phone"
            value={userConatct}
            onChange={(event) => {
              setUserContact(event.target.value);
            }}
          />
        </Form.Group>
        <div class="text-center">
          <Button variant="primary" type="submit" className="mb-3 mt-3">
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
