import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react'

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

    const submit = async (bkend, id) => {
    bkend.preventDefault();
    try {
      const data = await axios.put(`${baseURL}/edit/${id}`, {'pickup_time':editTime, 'note':editNote});
    } catch (er) {
      console.error(er.message)
    }
    }

    return (
        <div>
            <h1>Daycare</h1>
            <ul>
              {daycare_list?.map(attendee => {
                if (attendeeId === attendee.id){
                  return (<li>
                    <form onSubmit={submit} key={attendee.id}>
                      <input onChange={changeEditPTime} type="text" name="editPickup" value={editTime}/>
                      <input onChange={changeEditNote} type="text" name="editNote" value={editNote}/>
                    </form>
                  </li>)
                }
                else { return (
                  <li key={attendee.id}>Name: {attendee.child_name}, Pick up time: {attendee.pickup_time}, Note: {attendee.note}
                    <button onClick={() => checkOut(attendee.id)}>Check Out</button>
                    <button onClick={() => edit(attendee)}>Edit</button>
                  </li>
                )}
              })}
            </ul>
        </div>
    )
}

export default ViewDaycare;