import React from 'react';
import './Purchased.css';

function Purchased() {
  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      <h3 className="text-center py-3 purchasedhead">PURCHASED EXAMS</h3>
      <div className="card p-5 text-center purchasecard">
        {/* <div className='row'>
            <div className='col'>
            <p className="purchase_para">ENROLLED TEST: </p> 
            <p className="purchase_para">EXAM TYPE:</p> 
            </div>
            <div className='col'>
            <p className="purchase_para">1. Past Papers-5 Years</p>
            <p className="purchase_para">SBI CBO</p>
            </div>
        </div> */}
        <table className='tablepart'>
            <tr className="purchase_para bg-light ">
                <td><b>ENROLLED TEST:</b></td>
                <td>1. Past Papers-5 Years</td>
            </tr>
            <tr className="purchase_para bg-light">
                <td><b>EXAM TYPE:</b></td>
                <td>SBI CBO</td>
            </tr>
        </table>
       
        <div className="d-flex justify-content-center">
          <button className="paybutton px-5 py-2">Pay</button>
        </div>
      </div>
    </div>
  );
}

export default Purchased;
