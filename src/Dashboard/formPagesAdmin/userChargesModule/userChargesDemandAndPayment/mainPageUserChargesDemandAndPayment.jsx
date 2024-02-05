import React, { useState } from 'react'
import SearchUserForDemandNPayment from '@/Dashboard/formPagesAdmin/userChargesModule/userChargesDemandAndPayment/searchUserForDemandNPayment'
import ViewUserDemandDetailsAndPayment from '@/Dashboard/formPagesAdmin/userChargesModule/userChargesDemandAndPayment/viewUserDemandDetailsAndPayment'
import ViewUserPaymentReceipt from '@/Dashboard/formPagesAdmin/userChargesModule/userChargesDemandAndPayment/viewUserPaymentReceipt'

const SEARCH_USER = `searchUser`
const VIEW_USER_DEMAND_DETAILS_AND_PAYMENT = `viewUserDemandDetailsAndPayment`
const VIEW_CONSUMER_PAYMENT_RECEIPT = `viewConsumerPaymentReceipt`

function MainPageUserChargesDemandAndPayment() {
  const [showModalsObj, setShowModalsObj] = useState({
    searchUser: true,
    viewUserDemandDetailsAndPayment: false,
    viewConsumerPaymentReceipt: false,
  })

  const [consumerItemForView, setConsumerItemForView] = useState(null)
  const [paymentDetailsItemForReceiptView, setPaymentDetailsItemForReceiptView] = useState(null)

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
      <SearchUserForDemandNPayment
        showModal={showModalsObj[SEARCH_USER]}
        currModal={SEARCH_USER}
        nextModal={VIEW_USER_DEMAND_DETAILS_AND_PAYMENT}
        switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
        setConsumerItemForView={setConsumerItemForView} />
      {
        showModalsObj[VIEW_USER_DEMAND_DETAILS_AND_PAYMENT] == true ? (
          <ViewUserDemandDetailsAndPayment
            showModal={showModalsObj[VIEW_USER_DEMAND_DETAILS_AND_PAYMENT]}
            currModal={VIEW_USER_DEMAND_DETAILS_AND_PAYMENT}
            prevModal={SEARCH_USER}
            nextModal={VIEW_CONSUMER_PAYMENT_RECEIPT}
            switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
            consumerItemForView={consumerItemForView} 
            setPaymentDetailsItemForReceiptView={setPaymentDetailsItemForReceiptView}
            />
        ) : null
      }
      {
        showModalsObj[VIEW_CONSUMER_PAYMENT_RECEIPT] == true ? (
          <ViewUserPaymentReceipt
            showModal={showModalsObj[VIEW_CONSUMER_PAYMENT_RECEIPT]}
            currModal={VIEW_CONSUMER_PAYMENT_RECEIPT}
            prevModal={VIEW_USER_DEMAND_DETAILS_AND_PAYMENT}
            switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
            consumerItemForView={consumerItemForView} 
            paymentDetailsItemForReceiptView={paymentDetailsItemForReceiptView}
            />
        ) : null
      }
    </>
  )
}

export default MainPageUserChargesDemandAndPayment