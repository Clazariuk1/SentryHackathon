import './App.css'
import { useState } from 'react';

function App() {
  const [sosName, setSOSName] = useState("");

  return (
    <>
      <div className="container">
        <div className="col">
          <div className="row">
            <div className="card" >
              <h1>SOS Beacon</h1>
              <h3>Fast, simple, discreet. Send your location and more by text message for faster safer emergency response</h3>
              <div className="card-body">
                <h5 className="card-title">Type in a phone number below and choose what data you send...</h5>
                <form>
                  <div className="form-item">
                    <label className="form-label">Emergency Contact Number:</label>
                    <input className="form-text" type="text" value={sosName} />
                  </div>
                </form>
                <h5 className="card-title">Please tell us your name so we can help identify you if your contact is unresponsive</h5>
                <form>
                  <div className="form-item">
                    <label className="form-label">Your</label>
                    <input className="form-text" type="text" value={sosName} />
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
                    <a href="#" className="btn btn-primary">Send Audio Message</a>
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
  )
}

export default App
