import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "#333", color: "white" }}>
      <Container>
        <Row>
          <Col md={5}>
            <h5>Contact Us</h5>
            <p>Address: 5-25/12 Property Street, Madhapur, HightechCity Hyd 500032</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: satyam@property.emall.com</p>
          </Col>
          <Col md={6}>
            <h5>Follow Us</h5>
            <p>
              Stay connected with us on social media:{" "}
              <a
                href="#"
                className="text-white"
                style={{ textDecoration: "underline", color: "#61dafb" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              ,{" "}
              <a
                href="#"
                className="text-white"
                style={{ textDecoration: "underline", color: "#1da1f2" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
              ,{" "}
              <a
                href="#"
                className="text-white"
                style={{ textDecoration: "underline", color: "#833ab4" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </p>
          </Col>
        </Row>
        <hr className="bg-white" />
        <p className="text-white text-center" style={{ fontSize: "10px", margin: "0" }}>
          © 2023 Property E-Mall System. All rights reserved.
        </p>
      </Container>
    </div>
  );
};

export default Footer;
