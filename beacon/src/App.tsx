// App.tsx
import './App.css';
import { useState } from 'react';
import AudioRecorder from './AudioRecorder'; // Import the AudioRecorder component

function App() {
  const [sosName, setSOSName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Track phone number

  return (
    <>
      <div className="container">
        <div className="col">
          <div className="row">
            <div className="card">
              <h1>SOS Beacon</h1>
              <h3>Fast, simple, discreet. Get help when you need it.</h3>
              <div className="card-body">
                <h5 className="card-title">Type in a phone number below to contact...</h5>
                <form className="formBox">
                  <div className="form-item">
                    <label className="form-label">Emergency Contact:</label>
                    <input
                      className="form-text"
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)} // Update phone number state
                    />
                  </div>
                </form>
                <h5 className="card-title">Please tell us your name below so we can help identify you...</h5>
                <form className="formBox">
                  <div className="form-item">
                    <label className="form-label">Your Reference Name:</label>
                    <input
                      className="form-text"
                      type="text"
                      value={sosName}
                      onChange={(e) => setSOSName(e.target.value)} // Update SOS name state
                    />
                  </div>
                </form>
                <div className="buttonCardList">
                  <div className="buttonCard">
                    <a href="#" className="btn btn-primary">Send Location by Text</a>
                    <div className="buttonTextBox">
                      Send a text message to your chosen phone contact containing your location data and a request for immediate help.
                    </div>
                  </div>
                  <div className="buttonCard">
                    <a href="#" className="btn btn-primary">Initiate Phone Call</a>
                    <div className="buttonTextBox">
                      Call your selected contact and share critical information about your situation on the spot.
                    </div>
                  </div>
                  <div className="buttonCard">
                    <AudioRecorder /> {/* Pass the phone number to AudioRecorder */}
                    <div className="buttonTextBox">
                      Record and send an audio message by text to your chosen phone contact so they will have record of your situation.
                    </div>
                  </div>
                  <div className="buttonCard">
                    <a href="#" className="btn btn-primary">Send Video Message</a>
                    <div className="buttonTextBox">
                      Record and send a video message by text to your chosen phone contact so they will have record of your situation.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
