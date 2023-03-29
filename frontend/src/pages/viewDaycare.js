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

    const [edit_time_active, setEdit_time_active] = useState(false);
    const [edit_note_active, setEdit_note_active] = useState(false);

    const edit_time = (bkend) => {
      setEdit_time_active(true);
      setAttendeeId(bkend.id);
      setEditTime(bkend.pickup_time);
      console.log(edit_time_active);
    }

    const edit_note = (bkend) => {
      setEdit_note_active(true);
      setAttendeeId(bkend.id);
      setEditNote(bkend.note);
      console.log(edit_note_active);
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

    const submit_time = async (bkend) => {
    bkend.preventDefault();
    try {
      await axios.put(`${baseURL}/edit-pickup-time/${attendeeId}`, {"pickup_time":editTime});
      const newDaycare_list = daycare_list.map(attendee => {
        if (attendee.id === attendeeId) {
          return {
            ...attendee,
            pickup_time: editTime,
          };
        }
        return attendee
      });
      setDaycare(newDaycare_list)
      setAttendeeId(null)
      setEditTime("")
      setEdit_time_active(false)
    } catch (er) {
      console.error(er.message)
    }
    }

    const submit_note = async (bkend) => {
      bkend.preventDefault();
      try {
      await axios.put(`${baseURL}/edit-note/${attendeeId}`, {"note":editNote});
      const newDaycare_list = daycare_list.map(attendee => {
        if (attendee.id === attendeeId) {
          return {
            ...attendee,
            note: editNote
          };
        }
        return attendee
      });
      setDaycare(newDaycare_list)
      setAttendeeId(null)
      setEditNote("")
      setEdit_note_active(false)
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
                if (attendeeId === attendee.id && edit_time_active){
                  return (<li> 
                    <form onSubmit={submit_time} key={attendee.id}>
                      <input onChange={changeEditPTime} type="text" name="editPickup" value={editTime}/>
                      <button type="submit" className="btn-daycare">Submit</button>
                    </form>
                  </li>)
                }
                if (attendeeId === attendee.id && edit_note_active){
                  return (<li> 
                    <form onSubmit={submit_note} key={attendee.id}>
                      <input onChange={changeEditNote} type="text" name="editNote" value={editNote}/>
                      <button type="submit" className="btn-daycare">Submit</button>
                    </form>
                  </li>)
                }
                else { return (
                  <li key={attendee.id}>
                    {attendee.pickup_time.length !== 0 && (
                      <p>
                        <span className="list-item">Name:</span> {attendee.child_name}, 
                        <span className="list-item"> Pick up time:</span>  {attendee.pickup_time} 
                        <button className="btn-daycare" onClick={() => checkOut(attendee.id)}>Check Out</button> 
                        <button className="btn-daycare" onClick={() => edit_time(attendee)}>Edit Pickup Time</button>
                        {attendee.note.length === 0 && (
                          <button className="btn-daycare" onClick={() => edit_note(attendee)}>Add Note</button> 
                        )}
                      </p>
                    )}

                    {attendee.pickup_time.length === 0 && (
                      <p>
                        <span className="list-item">Name:</span> {attendee.child_name} 
                        <button className="btn-daycare" onClick={() => checkOut(attendee.id)}>Check Out</button>
                        
                        {attendee.note.length === 0 && (
                          <button className="btn-daycare" onClick={() => edit_note(attendee)}>Add Note</button> 
                        )}
                      </p>
                    )}

                    {attendee.note.length !== 0 && (
                      <p id="note">
                        <span className="list-item"> {attendee.child_name}'s Note:</span> {attendee.note} 
                        <button className="btn-daycare" onClick={() => edit_note(attendee)}>Edit Note</button>
                      </p>
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