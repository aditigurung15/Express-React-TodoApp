import React, { useEffect, useState } from "react";
import "./Todo.css";
import axios from "axios";

const Todoupdate = ({ display, update }) => {

  const [inputs, setInputs] = useState({ title: "", body: "" });

  const change = (e) => {
    const { name, value } = e.target;

    setInputs({ ...inputs, [name]: value });
  };

  useEffect(() => {
    setInputs({ title: update.title, body: update.body });
  }, [update]);

  const submit = async () => {
    await axios
      .put(`$(window.location.origin)/api/v2/updateTask/${update._id}`, inputs)
      .then((response) => {
       alert("task updated")
      });
    // console.log(inputs)
    // display(none);
  };
  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
      <h3>update your task</h3>
      <input
        type="text"
        name="title"
        id=""
        className="todo-inputs my-4 w-100 p-3"
        value={inputs.title}
        onChange={change}
      />
      <textarea
        name="body"
        id=""
        className="todo-inputs w-100 p-3"
        value={inputs.body}
        onChange={change}
      ></textarea>

      <div>
        <button className="btn btn-dark my-4" onClick={submit}>
          Update
        </button>
        <button
          className="btn btn-danger my-4 mx-3"
          onClick={() => {
            display("none");
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Todoupdate;
