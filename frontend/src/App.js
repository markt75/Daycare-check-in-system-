import './App.css';
import { Link } from "react-router-dom";

function App() {



  return (
    <div className="App">
      <header className="App-header">

        <div className="home-header">
          <h1 id="Title">Kidz Daycare</h1>
        </div>

        <div className="home">
          <h2 id="welcome-message">Welcome to Kidz Daycare System</h2>
          <button className="button" id="checkin"><Link to="CheckIn">Check In</Link></button><br></br>
          <button className="button" id="view"><Link to="ViewDaycare">View Daycare</Link></button>

        </div>

      </header>
    </div>
  );
}

export default App;
