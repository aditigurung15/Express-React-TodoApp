import React, { useState } from "react";
import "./Signup.css";
import HeadingComp from "./HeadingComp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/api/v1/register`, inputs).then((response) => {
        alert(response.data.message);
      });

      setInputs({ email: "", username: "", password: "" });
      history("/signin");
    } catch (error) {
      if (error.response) {
        console.log("Error Response:", error.response.data);
        alert(error.response.data.message || "An error occurred");
      } else {
        console.log("Error Message:", error.message);
        alert("An unexpected error occurred");
      }
    }
    history("/signin");
  };
  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 d-flex justify-content-center align-items-center column">
            <div className="d-flex flex-column w-100 p-5">
              <input
                className="p-2 my-3"
                type="email"
                name="email"
                id=""
                placeholder="Enter your Email"
                onChange={change}
                value={inputs.email}
              />

              <input
                className="p-2 my-3"
                type="username"
                name="username"
                id=""
                placeholder="Enter your Username"
                onChange={change}
                value={inputs.username}
              />

              <input
                className="p-2 my-3"
                type="password"
                name="password"
                id=""
                placeholder="Enter your Password"
                onChange={change}
                value={inputs.password}
              />

              <button className="btn-signup p-2" onClick={submit}>
                Sign Up
              </button>
            </div>
          </div>
          <div className="col-lg-4 d-flex justify-content-center align-items-center column col-left">
            <HeadingComp first="Sign" second="Up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
