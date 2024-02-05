import React from 'react'
import { useState } from 'react'
import SearchPaymentModeReport from '@/Dashboard/formPagesAdmin/propertyReportModule/paymentModeReport/searchPaymentModeReport'

const SEARCH_PROPERTY_PAYMENT_REPORT = `searchPropertyPaymentReport`

function MainPagePaymentModeReport() {
  const [showModalsObj, setShowModalsObj] = useState({
    searchPropertyPaymentReport: true,
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
    <SearchPaymentModeReport showModal={showModalsObj[SEARCH_PROPERTY_PAYMENT_REPORT]}
    currModal={SEARCH_PROPERTY_PAYMENT_REPORT} />
    </>
  )
}

export default MainPagePaymentModeReport