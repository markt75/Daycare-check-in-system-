import axios from "axios";
import React from "react";
import { useState } from 'react'
import { Link } from "react-router-dom";

const baseURL = "http://localhost:5000"

const CheckIn = () => {

    const [name, setName] = useState("");
    const [pickup_time, setPickup] = useState("");
    const [note, setNote] = useState("");

    const changeName = bkend => {
    setName(bkend.target.value)
    }

    const changePTime = bkend => {
    setPickup(bkend.target.value)
    }

    const changeNote = bkend => {
    setNote(bkend.target.value)
    }

    const submit =  async (bkend) => {
    bkend.preventDefault();
    try {
        await axios.post(`${baseURL}/checkin`, {'child_name':name, 'pickup_time':pickup_time, 'note':note});
    } catch (er) {
        console.error(er.message)
    }
    }

    return (
        <div>

        <div className="home-header">
          <h1 id="Title">Kidz Daycare</h1>
        </div>

        <div className="checkin-page">
            <h1>Checkin</h1>
            <form onSubmit={submit}>
                <label htmlFor="name">Name: </label>
                <input onChange={changeName} type="text" name="name" value={name}/><br></br>
                <label htmlFor="pickup">Pick up Time (Optional): </label>
                <input onChange={changePTime} type="text" name="pickup" value={pickup_time}/><br></br>
                <label htmlFor="note">Note (Optional): </label>
                <input onChange={changeNote} type="text" name="note" value={note}/><br></br>
                <button type="submit" className="button" id="btn-checkin">Checkin</button>
            </form>
        
        <button className="button" id="home-page-checkin"><Link to="/">Back to Home page</Link></button>

        </div>
            
        </div>
    )
}

export default CheckIn;