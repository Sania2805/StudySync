import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link} from "react-router-dom"
import Home from "./pages/Home";
import Notes from "./pages/Notes"
import Pomodoro from "./pages/Pomodoro"
import Todo from "./pages/To-do"
import Navbar from "./components/Navbar";

function App(){
  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/pomodoro" element = {<Pomodoro/>}/>
          <Route path="/to-do" element = {<Todo/>}/>
          <Route path="/notes" element = {<Notes/>}/>
          
         
        </Routes>
        
    </div>
    </BrowserRouter>
    
  )
}
export default App;