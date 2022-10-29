import React from 'react'
import Modal from '../ModalPoUp.js/Modal'
import { useState } from 'react'
import ModalOthers from '../ModalPoUp.js/ModalOthers'

const TopBar = () => {

const [modalState, setModalState] = useState(false)

const [modalOthers, setOpenModalOthers] = useState(false)

const openModal = () => {
  setModalState(!modalState)
}

const closeModal = () => {
  setModalState(false)
}


const closeOthers = () => {
  setOpenModalOthers(false)
}

const ModalOthes = () => {
  setOpenModalOthers(!modalOthers)
}

  return (
    <div className='top-bar'>
    <div className='col-full'>
       <ul>
        <li><span> CONTACT CENTER: 0800 3 35445 / DIGITAL CODES: 034435344 </span></li>
       </ul>
       <ul>

        <li><a className='before_none' onClick={ModalOthes}>DELIVERY</a></li>

        
        <li><a onClick={openModal}>HOW TO BUY THE PRODUCT</a></li>
        <Modal toggle={modalState} closeModal={closeModal}/>
        <ModalOthers modalOthers={modalOthers} closeOthers={closeOthers}/>
       </ul>
    </div>
  </div>
  )
}

export default TopBar