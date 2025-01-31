import React from 'react'

function Quizdisplaypage() {
   
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-sm-12 col-md-6'>
               <div className='card'>
                <p>1.Question</p>
                <input type='check'/><label>option1</label>
                <input type='check'/><label>option1</label>
                <input type='check'/><label>option1</label>
                <input type='check'/><label>option1</label>
                </div> 
                <button>Previous</button>
                <button>Next</button>
            </div>
            <div className='col-sm-12 col-md-6'>
            <div className='card'>

            </div> 
            </div>
        </div>
    </div>
  )
}

export default Quizdisplaypage