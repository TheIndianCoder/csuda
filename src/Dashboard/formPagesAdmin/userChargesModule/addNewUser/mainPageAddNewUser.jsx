import React, { useState } from 'react'
import AddNewUserForm from '@/Dashboard/formPagesAdmin/userChargesModule/addNewUser/addNewUserForm'

const ADD_NEW_USER = `addNewUser`
const ADD_NEW_USER_SUCCESS_MODAL = `addNewUserSuccessPage`

function MainPageAddNewUser() {
  const [showModalsObj, setShowModalsObj] = useState({
    addNewUser: true,
    addNewUserSuccessPage: false,
  })

  const switchOnPrevModalNOffCurrModal = (currModalName, prevModalName) => {
    console.log(currModalName)
    console.log(prevModalName)
    if (prevModalName && currModalName) {
      console.log(showModalsObj)
      setShowModalsObj((prevState) => {
        return {
          ...prevState,
          [currModalName]: false,
          [prevModalName]: true
        }
      })
    }
  }
  return (
    <>
      <AddNewUserForm
        showModal={showModalsObj[ADD_NEW_USER]}
        currModal={ADD_NEW_USER}
        nextModal={ADD_NEW_USER_SUCCESS_MODAL}
        switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal} />
    </>
  )
}

export default MainPageAddNewUser