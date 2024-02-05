import React, { useState } from 'react'
import SearchDeleteTransaction from './searchDeleteTransaction'
import ViewOrDeleteTransaction from './viewOrDeleteTransaction'
import { ColorRingCustom, NotFoundErrorMessageCustom } from '@/utils/commonComponents'
import { NO_DATA_FOUND, SOMETHING_WENT_WRONG } from '@/utils/appConstants'

const SEARCH_PAYMENT_DETAILS = `searchPaymentDetails`
const DELETE_PAYMENT_DETAILS = `deletePaymentDetails`

function MainPageDeleteTransaction() {
  const [showModalsObj, setShowModalsObj] = useState({
    searchPaymentDetails: true,
    deletePaymentDetails: true,
  })

  const [paymentDetails, setPaymentDetails] = useState(null)
  const [isPaymentDetailsLoading, setIsPaymentDetailsLoading] = useState(null)
  const [isPaymentDetailsLoaded, setIsPaymentDetailsLoaded] = useState(null)

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
      <SearchDeleteTransaction
        showModal={showModalsObj[SEARCH_PAYMENT_DETAILS]}
        currModal={SEARCH_PAYMENT_DETAILS}
        nextModal={DELETE_PAYMENT_DETAILS}
        switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
        setPaymentDetails={setPaymentDetails}
        setIsPaymentDetailsLoading={setIsPaymentDetailsLoading}
        setIsPaymentDetailsLoaded={setIsPaymentDetailsLoaded} />

      {
        isPaymentDetailsLoading == true ? (
          <ColorRingCustom />
        ) : null
      }
      {
        isPaymentDetailsLoaded == false ? (
          <NotFoundErrorMessageCustom
            message={SOMETHING_WENT_WRONG}
            text_size={`sm`} />
        ) : null
      }
      {
        isPaymentDetailsLoaded == true &&
          paymentDetails?.length < 1 ? (
          <NotFoundErrorMessageCustom
            message={NO_DATA_FOUND}
            text_size={`sm`} />
        ) : null
      }

      {
        isPaymentDetailsLoaded == true &&
          isPaymentDetailsLoading == false &&
          paymentDetails?.length > 0 ? (
          <ViewOrDeleteTransaction
            showModal={showModalsObj[DELETE_PAYMENT_DETAILS]}
            currModal={DELETE_PAYMENT_DETAILS}
            switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
            paymentDetails={paymentDetails}
          />
        ) : null
      }

    </>
  )
}

export default MainPageDeleteTransaction