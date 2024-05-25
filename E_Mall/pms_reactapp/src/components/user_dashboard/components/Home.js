import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const backgroundImageStyle = {
    backgroundImage:
      'url("https://i.pinimg.com/originals/50/1a/a5/501aa50e4277346c3f799f10e0e0475b.jpg")', // Replace with your image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh", // Set the height as needed
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white", // Set the text color for better visibility
  };

  return (
    <div style={backgroundImageStyle}>
      <div className="container text-center">
        <h1 className="display-4 text-black ">
          <b>Property Management System (E-Mall)</b>
        </h1>
      </div>
    </div>
  );
}

export default Home;
