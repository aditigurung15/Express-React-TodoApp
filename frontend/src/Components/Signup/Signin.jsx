import React, { useState } from "react";
import "./Signup.css";
import HeadingComp from "./HeadingComp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const Signin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    await axios.post(`/api/v1/signin`, inputs).then((response) => {
      sessionStorage.setItem("id", response.data.user._id);

      dispatch(authActions.login());
      history("/todo");
    });
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 d-flex justify-content-center align-items-center column col-left">
            <HeadingComp first="Sign" second="In" />
          </div>

          <div className="col-lg-8 d-flex justify-content-center align-items-center column">
            <div className="d-flex flex-column w-100 p-5">
              <input
                className="p-2 my-3"
                type="email"
                name="email"
                id=""
                placeholder="Enter your Email"
                value={inputs.email}
                onChange={change}
              />

              {/* <input className="p-2 my-3" type="username" name="username" id="" placeholder='Enter your Username' /> */}

              <input
                className="p-2 my-3"
                type="password"
                name="password"
                id=""
                placeholder="Enter your Password"
                value={inputs.password}
                onChange={change}
              />

              <button className="btn-signup p-2" onClick={submit}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
