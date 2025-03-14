import React, { useEffect, useState } from "react";
import "./Todo.css";
import Todocards from "./Todocards";
import { ToastContainer, toast } from "react-toastify";
import TodoUpdate from "./Todoupdate";
import axios from "axios";

let id = sessionStorage.getItem("id");
let toupdateArray= [];

const Todo = () => {
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const submit = async () => {
    if (inputs.title == "" || inputs.body == "") {
      toast.error("please fill title and body section");
    } else {
      if (id) {
        await axios
          .post(`$(window.location.origin)/api/v2/addTask`, {
            title: inputs.title,
            body: inputs.body,
            id: id,
          })
          .then((response) => {
            console.log(response);
          });

        // setArray([...Array, inputs]);
        setInputs({ title: "", body: "" });
        toast.success("task added successfully");
      } else {
        setArray([...Array, inputs]);
        setInputs({ title: "", body: "" });
        toast.success("task added successfully");
        toast.error("your task is not saved. please sign up");
      }
    }
  };

  const del = async (cardid) => {

    if (id){
    await axios
      .delete(`$(window.location.origin)/api/v2/deleteTask/${cardid}`, {
        data: { id: id },
      })
      .then(() => {
        toast.success("task deleted successfully");
      });
    // Array.splice(id, "1");
    // setArray([...Array]);
  }else{
    toast.error("please sign up first")
  }

}


  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
  };


 const update=(value)=>{
  toupdateArray = Array[value];
 }


  useEffect(() => {
if (id){

  const fetch = async () => {
    await axios
      .get(`$(window.location.origin)/api/v2/getTask/${id}`)
      .then((response) => {
        setArray(response.data.list);
      });
  };
  fetch();
}
  }, [submit]);




  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
          <div className="d-flex flex-column todo-inputs-div w-50 p-1">
            <input
              type="text"
              name="title"
              value={inputs.title}
              id=""
              placeholder="Title"
              className="my-2 p-2 todo-inputs"
              onClick={show}
              onChange={change}
            />
            <textarea
              type="text"
              name="body"
              value={inputs.body}
              id="textarea"
              placeholder="Body"
              className="p-2 todo-inputs"
              onChange={change}
            />
          </div>
          <div className="w-50 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>
              Add
            </button>
          </div>
        </div>

        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {Array &&
                Array.map((item, index) => (
                  <div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                    <Todocards
                      title={item.title}
                      body={item.body}
                      id={item._id}
                      delid={del}
                      display={dis}
                      updateid={index}
                      tobeupdate={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="container update">
          <TodoUpdate display={dis} update={toupdateArray}/>
        </div>
      </div>
    </>
  );
};

export default Todo;
