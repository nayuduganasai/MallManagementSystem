import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import Sidebar from "./Sidebar";

const Complaint = () => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [spaceId, setSpaceId] = useState("");
  const [userId, setUserId] = useState(0);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const userRole1 = localStorage.getItem("userRole");
    setUserRole(userRole1);
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("jwtToken");

    try {
      const response = await axios.post(
        "http://localhost:8080/emall/complaints",
        {
          date,
          description,
          subject,
          spaceId,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Complaint submitted successfully:", response.data);
      // Handle success, e.g., show a success message or redirect the user
    } catch (error) {
      console.error("Error submitting complaint:", error);
      // Handle error, e.g., show an error message to the user
    }
  };
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar (20%) */}
      <div style={{ flex: "0 0 15%", backgroundColor: "#darkblue" }}>
        {/* Add your sidebar components here */}
        <Sidebar userRole={userRole} />
      </div>

      {/* Main Content (80%) */}
      <div style={{ flex: "1", padding: "20px" }}>
        <div>
          <h2>Complaint Form</h2>
          <Form onSubmit={handleComplaintSubmit}>
            <FormGroup>
              <Label for="date">Create Date</Label>
              <Input
                type="textarea"
                name="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="subject">Subject</Label>
              <Input
                type="textarea"
                name="subject"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="spaceId">Space ID</Label>
              <Input
                type="textarea"
                name="spaceId"
                id="spaceId"
                value={spaceId}
                onChange={(e) => setSpaceId(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="userId">User ID</Label>
              <Input
                type="number"
                name="userId"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" color="primary">
              Submit Complaint
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
