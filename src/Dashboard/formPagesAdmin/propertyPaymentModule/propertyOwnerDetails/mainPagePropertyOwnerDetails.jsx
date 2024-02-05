import React from 'react'
import SearchPropertyOwner from '@/Dashboard/formPagesAdmin/propertyPaymentModule/propertyOwnerDetails/searchPropertyOwner'
import { useState } from 'react'

const SEARCH_PROPERTY_OWNER = `searchPropertyOwner`

function MainPagePropertyOwnerDetails() {
  const [showModalsObj, setShowModalsObj] = useState({
    searchPropertyOwner: true,
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
      <SearchPropertyOwner showModal={showModalsObj[SEARCH_PROPERTY_OWNER]}
        currModal={SEARCH_PROPERTY_OWNER} />
    </>
  )
}

export default MainPagePropertyOwnerDetails