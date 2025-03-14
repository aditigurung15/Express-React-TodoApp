import React, { useEffect } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Footer from './Components/Footer/Footer'
import About from './Components/About/About'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Signup from './Components/Signup/Signup'
import Signin from './Components/Signup/Signin'
import Todo from './Components/Todo/Todo'
import { useDispatch } from "react-redux";
import { authActions } from "./store";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const id= sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login());
    }
    

  }, [])
  

  return (

    <div>
<Router>
<Navbar />

  <Routes>
    
    <Route exact path='/' element={<Home />}/>
    <Route path='/about' element={<About />}/>
    <Route path='/todo' element={<Todo />}/>
    <Route path='/signup' element={<Signup />}/>
    <Route path='/signin' element={<Signin />}/>

  </Routes>
</Router>
  
   
    <Footer />
    </div>
  )
}

export default App