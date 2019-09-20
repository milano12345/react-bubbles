import React, { useState } from "react";
import { axiosWithAuth } from "./AxiosWithAuth";
import { Redirect } from "react-router-dom";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({});

  const handleLogin = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`http://localhost:5000/api/login`, credentials)
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.data.payload);
        props.history.push("/bubblepage");
      })
      .catch(err => console.log(err));
  };

  const handleChanges = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form>
          <input
            placeholder={"username"}
            name="username"
            type="text"
            value={credentials.username}
            onChange={handleChanges}
          />
          <input
            placeholder={"password"}
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChanges}
          />
          <button onClick={handleLogin} type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
