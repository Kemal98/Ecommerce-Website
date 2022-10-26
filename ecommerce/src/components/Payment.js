import React from 'react'

const Payment = ({text}) => {
  return (
    <div className='payment'>
           {text ? (<div><p className='text-payment'>{text}</p></div>) : 
            <div>
            <p className='text-payment'> Card payment and credit up to 12 months. Delivery to your address in 24 hours. Latest products available now.</p>
       </div>}  
  </div>
  )
}

export default Payment