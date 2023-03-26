import axios from "axios"
import {format} from "date-fns"
import { useState, useEffect } from 'react'
import './App.css';
import { id } from "date-fns/locale";
import { Link } from "react-router-dom";

const baseURL = "http://localhost:5000"

function App() {



  return (
    <div className="App">
      <header className="App-header">

        <div>
          <h1>Welcome to the Daycare Check In System</h1>
          <button><Link to="CheckIn">Check In</Link></button><br></br>
          <button><Link to="ViewDaycare">View Daycare</Link></button>
        </div>

      </header>
    </div>
  );
}

export default App;
