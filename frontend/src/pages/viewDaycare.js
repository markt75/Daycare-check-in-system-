import React from "react";

const baseURL = "http://localhost:5000"

const viewDaycare = () => {
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
      const new_list = daycare_list.filter(attendee => attendee.id != id)
      setDaycare(new_list);
    } catch (er) {
      console.error(er.message);
    }
  }

    const getDaycare = async () => {
        const data = await axios.get(`${baseURL}/daycare_list`);
        const daycare = data.data
        setDaycare(daycare)
        
        console.log("data",data.data)
        console.log("daycare",daycare)
        console.log("list", daycare_list)
        console.log("type", typeof(daycare_list))

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
                  <li key={attendee.id}>Name: {attendee.child_name}
                    <button onClick={() => checkOut(attendee.id)}>Check Out</button>
                    <button onClick={() => edit(attendee)}>Edit</button>
                  </li>
                )}
              })}
            </ul>
        </div>
    )
}