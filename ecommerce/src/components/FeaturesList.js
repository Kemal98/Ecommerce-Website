import React from 'react'
import { TbTruckDelivery } from 'react-icons/tb';
import { GiAutoRepair } from 'react-icons/gi';
import { RiEmotionHappyLine } from 'react-icons/ri';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { MdOutlinePhonelink } from 'react-icons/md';

const FeaturesList = () => {
  return (  
    <div className='features-list'>
     <div className='features'>
      <div className='feature'>
        <div className='media_'>
          <TbTruckDelivery/>
         <div className='media-body'>
           <h5 className='mt-0'>10$</h5>
          <span>Delivery throughout Bosnia and Herzegovina</span>
          </div>
        </div>
      </div>
      <div className='feature'>
        <div className='media_'>
        <RiEmotionHappyLine/>
          <div className='media-body'>
           <h5 className='mt-0'>99%</h5>
             <span>recommendation</span>
           </div>
         </div>
       </div>
      <div className='feature'>
        <div className='media_'>
          <GiAutoRepair/>
          <div className='media-body'>
            <h5 className='mt-0'> Up to 3 years</h5>
           <span>guarantees</span>
          </div>
         </div>
      </div>
      <div className='feature left_feature'>
        <div className='media_ '>
          <RiSecurePaymentFill/>
          <div className='media-body'>
            <h5 className='mt-0'>100% Safe</h5>
             <span>payment</span>
            </div>
           </div>
         </div>
       <div className='feature'>
      <div className='media_'>
        <MdOutlinePhonelink/>
        <div className='media-body'>
          <h5 className='mt-0'>Only the best</h5>
            <span>brands</span>
         </div>
       </div>
     </div>
   </div>
 </div> 
  )
}

export default FeaturesList