import React from 'react';
import './Successpayment.css';

function Successpayment() {
  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-5 text-center cardbrd">
        <h1 className="successtext">Payment</h1>
        <h1 className="successtext">Successful!!!</h1>
        <div className="d-flex justify-content-center mt-4">
          <button className="paybutton px-5 py-2 okbutton">OK</button>
        </div>
      </div>
    </div>
  );
}

export default Successpayment;
