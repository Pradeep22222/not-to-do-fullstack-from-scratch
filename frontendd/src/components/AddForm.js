import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  task: "",
  hr: "",
  type:"entry",
}
export const AddForm = ({ addTask }) => {
  const [form,setForm]=useState(initialState)
  const handleOnChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]:value})
  }
  const handleOnSubmit = e => {
    e.preventDefault();
    addTask({...form, id:uuidv4()});
  }
  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Row className="g-2">
          <Col md={6}>
            <Form.Control
              placeholder="Task name"
              required
              name="task"
              onChange={handleOnChange}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="hrs"
              required
              type="number"
              name="hr"
              onChange={handleOnChange}
            />
          </Col>
          <Col md={2}>
            <Button variant="success"  type="submit">
              Add task
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
