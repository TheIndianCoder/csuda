import React, { useState } from 'react'
import AddNewRenterForm from '@/Dashboard/formPagesAdmin/userChargesModule/addNewRenter/addNewRenterForm'
import SearchUserForAddRenter from '@/Dashboard/formPagesAdmin/userChargesModule/addNewRenter/searchUserForAddRenter'

const SEARCH_USER = `searchUser`
const ADD_NEW_RENTER = `addNewRenter`
const ADD_NEW_RENTER_SUCCESS_MODAL = `addNewRenterSuccessPage`

function MainPageAddNewRenter() {
  const [showModalsObj, setShowModalsObj] = useState({
    searchUser: true,
    addNewRenter: false,
    addNewRenterSuccessPage: false,
  })

  const [consumerItemForView, setConsumerItemForView] = useState(null)

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
      <SearchUserForAddRenter
        showModal={showModalsObj[SEARCH_USER]}
        currModal={SEARCH_USER}
        nextModal={ADD_NEW_RENTER}
        switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
        setConsumerItemForView={setConsumerItemForView}
      />
      {
        showModalsObj[ADD_NEW_RENTER] == true ? (
          <AddNewRenterForm
            showModal={showModalsObj[ADD_NEW_RENTER]}
            currModal={ADD_NEW_RENTER}
            nextModal={ADD_NEW_RENTER_SUCCESS_MODAL}
            prevModal={SEARCH_USER}
            switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
            consumerItemForView={consumerItemForView}
          />
        ) : null
      }
    </>
  )
}

export default MainPageAddNewRenter