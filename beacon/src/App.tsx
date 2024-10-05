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
              <div className="card-body">
                <h5 className="card-title">Ask For Help</h5>
                <form>
                  <div className="form-item">
                    <label className="form-label">Your Name</label>
                    <input className="form-text" type="text" value={sosName} />
                  </div>
                </form>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
