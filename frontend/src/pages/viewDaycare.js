import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const baseURL = "http://localhost:5000"

const ViewDaycare = () => {
    const [daycare_list, setDaycare] = useState([]);

    const [editTime, setEditTime] = useState("");
    const [editNote, setEditNote] = useState("");
    const [attendeeId, setAttendeeId] = useState(null);

    const edit = (bkend) => {
      setAttendeeId(bkend.id);
      setEditTime(bkend.pickup_time);
      setEditNote(bkend.note);
    }

    const checkOut = async (id) => {
    try {
      await axios.delete(`${baseURL}/checkout/${id}`);
      const new_list = daycare_list.filter(attendee => attendee.id !== id)
      setDaycare(new_list);
    } catch (er) {
      console.error(er.message);
    }
  }

    const getDaycare = async () => {
      axios
        .get(`${baseURL}/daycare_list`)
        .then(res => {
          setDaycare(res.data['Daycare List'])
        })
        .catch(err => {
          console.log(err)
        }, [])
    }

    useEffect(() => {
        getDaycare();
    }, [])

    const changeEditPTime = bkend => {
    setEditTime(bkend.target.value)
    }

    const changeEditNote = bkend => {
    setEditNote(bkend.target.value)
    }

    const submit = async (bkend) => {
    bkend.preventDefault();
    try {
      await axios.put(`${baseURL}/edit/${attendeeId}`, {"pickup_time":editTime, "note":editNote});
      const newDaycare_list = daycare_list.map(attendee => {
        if (attendee.id === attendeeId) {
          return {
            ...attendee,
            pickup_time: editTime,
            note: editNote
          };
        }
        return attendee
      });
      setDaycare(newDaycare_list)
      setAttendeeId(null)
      setEditTime("")
      setEditNote("")
    } catch (er) {
      console.error(er.message)
    }
    }

    return (
        <div>
          <div className="home-header">
            <h1 id="Title">Kidz Daycare</h1>
          </div>

          <div className="daycare-page">
            <h1>Daycare</h1>
            <ul>
              {daycare_list?.map(attendee => {
                if (attendeeId === attendee.id){
                  return (<li>
                    <form onSubmit={submit} key={attendee.id}>
                      <input onChange={changeEditPTime} type="text" name="editPickup" value={editTime}/>
                      <input onChange={changeEditNote} type="text" name="editNote" value={editNote}/>
                      <button type="submit">Submit</button>
                    </form>
                  </li>)
                }
                else { return (
                  <li key={attendee.id}>
                    {attendee.pickup_time.length !== 0 && (
                      <p><span className="list-item">Name:</span> {attendee.child_name}, <span className="list-item">Pick up time:</span>  {attendee.pickup_time} <button className="btn-daycare" onClick={() => checkOut(attendee.id)}>Check Out</button> <button className="btn-daycare" onClick={() => edit(attendee)}>Edit</button></p>
                    )}

                    {attendee.pickup_time.length === 0 && (
                      <p><span className="list-item">Name:</span> {attendee.child_name} <button className="btn-daycare" onClick={() => checkOut(attendee.id)}>Check Out</button></p>
                    )}

                    {attendee.note.length !== 0 && (
                    <p id="note"><span className="list-item">Note:</span> {attendee.note} <button className="btn-daycare" onClick={() => edit(attendee)}>Edit</button> </p>
                    )}
                  </li>
                  

                )}
              })}
            </ul>

            <button className="button" id="home-page-daycare"><Link to="/">Back to Home page</Link></button>
          </div>

            
        </div>
    )
}

export default ViewDaycare;