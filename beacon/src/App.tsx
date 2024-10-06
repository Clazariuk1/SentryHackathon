import './App.css'
import { useState, useEffect } from 'react';
import { SOSReport } from './types';

const data: SOSReport = {
  emergencyPhone: "",
  fullName: "",
  latitude: null,
  longitude: null,
  location: ""
}

function App() {

  const [sosName, setSOSName] = useState("");
  const [emergNumber, setEmergNumber] = useState("");
  const [longitude, setLongitude] = useState<number>();
  const [latitude, setLatitude] = useState<number>();
  const [location, setLocation] = useState("");
  const [hasLocation, setHasLocation] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        setHasLocation(true);
        setLongitude(pos.coords.longitude);
        setLatitude(pos.coords.latitude);
      }
    );
  })

  function handleSendData() {
    data.emergencyPhone = emergNumber;
    data.fullName = sosName;
    data.latitude = latitude as number;
    data.longitude = longitude as number;
    data.location = location;

    const payload = JSON.stringify(data);
    console.log("payload: ", payload)
    setMessage(payload);
    console.log(message);
    fetch("https://davidsawires.pythonanywhere.com/send_text", {
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((rslt) => {
        console.log('message went', rslt)
      })
      .catch((err) => {
        console.log('we flubbed', err)
      })

  }


  return (
    <>
      <div className="container">
        <div className="col">
          <div className="row">
            <div className="card" >
              <h1>SOS Beacon</h1>
              <h3>Fast, simple, discreet. Send your location and more by text message for faster safer emergency response</h3>
              <div className="card-body">

                {message.length > 0 &&
                  <div className='alert alert-success'>
                    Sent message to server from {latitude} {longitude} for {sosName}
                  </div>
                }


                {hasLocation ? <p>Your location is {latitude} {longitude}</p> :
                  <p>Note -- we cannot deterine your location</p>
                }
                <h5 className="card-title">Type in a phone number below and choose what data you send...</h5>

                <div className="d-flex flex-row">
                  <label className="form-label w-25 me-3 ">Name:</label>
                  <input className="form-text w-50" type="text" value={sosName}
                    onChange={evt => setSOSName(evt.target.value)}
                  />
                </div>

                <div className="d-flex flex-row">
                  <label className="form-label w-25 me-3">Emergency Contact Number:</label>
                  <input className="form-text w-50" type="text" value={emergNumber}
                    onChange={evt => setEmergNumber(evt.target.value)}
                  />
                </div>

                <div className="d-flex flex-row">
                  <label className="form-label w-25 me-3">Description of Your Location:</label>
                  <input className="form-text w-50" type="text" value={location}
                    onChange={evt => setLocation(evt.target.value)}
                  />
                </div>


                <div className="buttonCardList">
                  <div className="buttonCard">
                    <a className="btn btn-primary" onClick={handleSendData}>Send Location by Text</a>
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
