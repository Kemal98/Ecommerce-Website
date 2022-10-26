import React from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';

function Spinner() {
  return (
    <div className='d-flex justify-content-center'>
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    </div>
  );
}


export default Spinner