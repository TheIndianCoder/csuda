import React, { useState } from 'react'
import DemandReceipt from './demandReceipt'
import DemandReceiptHindi from './demandReceiptInHindi'
import PaymentReceipt from './paymentReceipt'
import PaymentReceiptHindi from './paymentReceiptInHindi'
import PropertyDetails from './propertyDetails'
import SearchProperty from './searchProperty'
import { ErrorBoundary, NotFoundErrorMessageCustom } from '@/utils/commonComponents'
import { SOMETHING_WENT_WRONG, SOMETHING_WENT_WRONG_WHILE_LOADING_RECEIPT } from '@/utils/appConstants'

const SEARCH_PROPERTY = `searchProperty`
const PROPERTY_DETAILS = `propertyDetails`
const PAYMENT_RECEIPT = `paymentReceipt`
const PAYMENT_RECEIPT_HINDI = `paymentReceiptHindi`
const DEMAND_RECEIPT = `demandReceipt`
const DEMAND_RECEIPT_HINDI = `demandReceiptHindi`

function MainPageSearchProperty() {
  const [showModalsObj, setShowModalsObj] = useState({
    searchProperty: true,
    propertyDetails: false,
    paymentReceipt: false,
    paymentReceiptHindi: false,
    demandReceipt: false,
    demandReceiptHindi: false,
  })

  const [propId, setPropId] = useState("")
  const [propertyNo, setPropertyNo] = useState("")
  const [receiptHeader, setReceiptHeader] = useState("")
  const [paymentDetailsForReceiptView, setPaymentDetailsForReceiptView] = useState(null)
  const [receiptDetailsForHindi, setReceiptDetailsForHindi] = useState([])

  const switchOnPrevModalNOffCurrModal = (currModalName, prevModalName) => {
    console.log(currModalName)
    console.log(prevModalName)
    if (prevModalName && currModalName) {
      console.log(showModalsObj)
      if (prevModalName == PROPERTY_DETAILS) {
        setReceiptDetailsForHindi([])
      }
      setShowModalsObj((prevState) => {
        return {
          ...prevState,
          [currModalName]: false,
          [prevModalName]: true
        }
      })
    }
  }
  // console.log("inside: MainPageSearchProperty:")
  return (
    <>
      <SearchProperty showModal={showModalsObj[SEARCH_PROPERTY]}
        currModal={SEARCH_PROPERTY} nextModal={PROPERTY_DETAILS}
        switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
        setPropId={setPropId} setPropertyNo={setPropertyNo}
      />
      {
        showModalsObj[PROPERTY_DETAILS] ? <PropertyDetails showModal={showModalsObj[PROPERTY_DETAILS]}
          currModal={PROPERTY_DETAILS} propId={propId} switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
          prevModal={SEARCH_PROPERTY} propertyNo={propertyNo} setPaymentDetailsForReceiptView={setPaymentDetailsForReceiptView}
          nextModal={PAYMENT_RECEIPT} paymentDetailsForReceiptView={paymentDetailsForReceiptView}
          setReceiptHeader={setReceiptHeader} demandReceiptModal={DEMAND_RECEIPT}
        /> : null
      }
      {
        showModalsObj[PAYMENT_RECEIPT] ? <ErrorBoundary
          errorComponent={<NotFoundErrorMessageCustom
            message={SOMETHING_WENT_WRONG_WHILE_LOADING_RECEIPT}
            text_size={`sm`}
          />}>
          <PaymentReceipt showModal={showModalsObj[PAYMENT_RECEIPT]}
            currModal={PAYMENT_RECEIPT} propId={propId} switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
            prevModal={PROPERTY_DETAILS} propertyNo={propertyNo} paymentDetailsForReceiptView={paymentDetailsForReceiptView}
            nextModal={PAYMENT_RECEIPT_HINDI} receiptHeader={receiptHeader}
            setReceiptDetailsForHindi={setReceiptDetailsForHindi}
            receiptDetailsForHindi={receiptDetailsForHindi}
          /> </ErrorBoundary> : null
      } 
      {
        showModalsObj[PAYMENT_RECEIPT_HINDI] ? 
        // <ErrorBoundary
        //   errorComponent={<NotFoundErrorMessageCustom
        //     message={SOMETHING_WENT_WRONG_WHILE_LOADING_RECEIPT}
        //     text_size={`sm`}
        //   />}> 
          <PaymentReceiptHindi showModal={showModalsObj[PAYMENT_RECEIPT_HINDI]}
            currModal={PAYMENT_RECEIPT_HINDI} propId={propId} switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
            prevModal={PROPERTY_DETAILS} propertyNo={propertyNo}
            nextModal={PAYMENT_RECEIPT} receiptHeader={receiptHeader}
            receiptDetails={receiptDetailsForHindi}
          /> 
          // </ErrorBoundary>
           : null
      }
      {
        showModalsObj[DEMAND_RECEIPT] ? <ErrorBoundary
          errorComponent={<NotFoundErrorMessageCustom
            message={SOMETHING_WENT_WRONG_WHILE_LOADING_RECEIPT}
            text_size={`sm`}
          />}> <DemandReceipt showModal={showModalsObj[DEMAND_RECEIPT]}
            currModal={DEMAND_RECEIPT} propId={propId} switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
            prevModal={PROPERTY_DETAILS} propertyNo={propertyNo} paymentDetailsForReceiptView={paymentDetailsForReceiptView}
            nextModal={DEMAND_RECEIPT_HINDI} receiptHeader={receiptHeader}
            setReceiptDetailsForHindi={setReceiptDetailsForHindi}
            receiptDetailsForHindi={receiptDetailsForHindi}
          /> </ErrorBoundary> : null
      }
      {
        showModalsObj[DEMAND_RECEIPT_HINDI] ? <ErrorBoundary
          errorComponent={<NotFoundErrorMessageCustom
            message={SOMETHING_WENT_WRONG_WHILE_LOADING_RECEIPT}
            text_size={`sm`}
          />}> <DemandReceiptHindi showModal={showModalsObj[DEMAND_RECEIPT_HINDI]}
            currModal={DEMAND_RECEIPT_HINDI} propId={propId} switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
            prevModal={PROPERTY_DETAILS} propertyNo={propertyNo}
            nextModal={DEMAND_RECEIPT} receiptHeader={receiptHeader}
            receiptDetails={receiptDetailsForHindi}
          /> </ErrorBoundary> : null
      }
    </>
  )
}

export default MainPageSearchProperty