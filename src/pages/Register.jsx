import React, { useState } from "react";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HOST } from "../api";

const Register = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSucesssNavigation = () => {
    navigate("/login");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const username = event.target[1].value;
    const password = event.target[2].value;
    const password_confirmation = event.target[3].value;
    const formObject = { email, username, password, password_confirmation };

    // send formObject to api
    setLoading(true);
    // async function then = Promise:resolved, catch = Promise:reject, finally = Promise:fetched
    axios
      .post(`${HOST}/api/register`, {
        email,
        username,
        password,
        password_confirmation,
      })
      .then(function (response) {
        console.info(response.data);
        // navigate to my account page when success
        handleSucesssNavigation();
      })
      .catch(function (error) {
        console.error(error.response.data);
      })
      .finally(function () {
        setLoading(false);
      });

  };
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div
        style={{
          width: "100%",
          height: "80px",
          backgroundColor: "#171A21",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Logo />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "400px",
          alignItems: "center",
          padding: "3rem",
        }}
      >
        <h1>Join our tech club</h1>
        <form
          style={{ width: "100%", maxWidth: "400px" }}
          onSubmit={handleSubmit}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "3rem",
            }}
          >
            <label htmlFor="email">Email</label>
            <input id="email" type="text" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "1rem",
            }}
          >
            <label htmlFor="username">Username</label>
            <input id="username" type="text" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "1rem",
            }}
          >
            <label htmlFor="password">Password</label>
            <input id="password" type="password" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "1rem",
            }}
          >
            <label htmlFor="passwordConfirmation">Repeat password</label>
            <input id="password_confirmation" type="password" />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#171A21",
              color: "white",
              marginTop: "1rem",
              width: "100%",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Sending request..." : "Register"}
          </button>
          <Link
            to="/login"
            style={{
              marginTop: "1rem",
              display: "block",
              width: "100%",
              textAlign: "center",
            }}
          >
            Return as existing user
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
