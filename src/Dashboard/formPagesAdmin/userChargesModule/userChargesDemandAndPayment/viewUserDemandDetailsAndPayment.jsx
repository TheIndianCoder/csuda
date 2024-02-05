import React, { useEffect, useState } from 'react'
import { Select, Option, Button, Textarea, Checkbox, Tooltip, Switch } from "@material-tailwind/react";
import { PAYMENT_TRANSACTION_DETAILS_FOR_USER_CHARGES_CONSTANT, SOMETHING_WENT_WRONG, SUDA_TOKEN, SUDA_USER_ID } from '@/utils/appConstants';
import { getCookieByName } from '@/utils/RequireAuth';
import { convertDateToAPIFormat, convertStringToLowerCaseNTrim, fetchFromAPI, fetchFromAPIWithOutSetter, fetchFromAPIWithSetterForTextAsResponse, getIPAddressOfUser } from '@/utils/commonUtils';
import ViewConsumerDetails from '@/Dashboard/formPagesAdmin/userChargesModule/userChargesDemandAndPayment/viewConsumerDetails';
import ViewAreaDetails from '@/Dashboard/formPagesAdmin/userChargesModule/userChargesDemandAndPayment/viewAreaDetails';
import ViewMonthlyRateDetails from '@/Dashboard/formPagesAdmin/userChargesModule/userChargesDemandAndPayment/viewMonthlyRateDetails';
import ViewDueDemandDetails from '@/Dashboard/formPagesAdmin/userChargesModule/userChargesDemandAndPayment/viewDueDemandDetails';
import ViewPaymentDetails from '@/Dashboard/formPagesAdmin/userChargesModule/userChargesDemandAndPayment/viewPaymentDetails';
import PaymentModesPage from '@/Dashboard/formPagesAdmin/userChargesModule/userChargesDemandAndPayment/paymentModesPage';
import { isBlankString } from '@/utils/formValidatorUtils';
import { ColorRingCustom } from '@/utils/commonComponents';
import FloatingMessage from '@/utils/floatingMessage';

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

function ViewUserDemandDetailsAndPayment({
  showModal, currModal, nextModal, switchOnPrevModalNOffCurrModal, prevModal,
  consumerItemForView, setPaymentDetailsItemForReceiptView
}) {

  const [trigger, setTrigger] = useState(null)
  const [transactionNumber, setTransactionNumber] = useState(null)

  /**
   * consumer details
   */
  const [consumerDetails, setConsumerDetails] = useState(null)
  const [isConsumerDetailsLoading, setIsConsumerDetailsLoading] = useState(null)
  const [isConsumerDetailsLoaded, setIsConsumerDetailsLoaded] = useState(null)

  /**
   * Area details
   */
  const [areaDetails, setAreaDetails] = useState(null)
  const [isAreaDetailsLoading, setIsAreaDetailsLoading] = useState(null)
  const [isAreaDetailsLoaded, setIsAreaDetailsLoaded] = useState(null)

  /**
   * monthly rate details
   */
  const [monthlyRateDetails, setMonthlyRateDetails] = useState(null)
  const [isMonthlyRateDetailsLoading, setIsMonthlyRateDetailsLoading] = useState(null)
  const [isMonthlyRateDetailsLoaded, setIsMonthlyRateDetailsLoaded] = useState(null)

  /**
   * due details
   */
  const [dueDetails, setDueDetails] = useState(null)
  const [isDueDetailsLoading, setIsDueDetailsLoading] = useState(null)
  const [isDueDetailsLoaded, setIsDueDetailsLoaded] = useState(null)

  /**
   * demand details
   */
  const [demandDetails, setDemandDetails] = useState(null)
  const [isDemandDetailsLoading, setIsDemandDetailsLoading] = useState(null)
  const [isDemandDetailsLoaded, setIsDemandDetailsLoaded] = useState(null)

  /**
  * due demand details
  */
  const [paymentDetails, setPaymentDetails] = useState(null)
  const [isPaymentDetailsLoading, setIsPaymentDetailsLoading] = useState(null)
  const [isPaymentDetailsLoaded, setIsPaymentDetailsLoaded] = useState(null)

  /**
   * payment transaction details
   */
  const [isPaymentTransactionDetailsValid, setIsPaymentTransactionDetailsValid] = useState(null)
  const [paymentModeObj, setPaymentModeObj] = useState({
    payment_mode: ""
  })
  const [paymentTransactionDetails, setPaymentTransactionDetails] = useState(PAYMENT_TRANSACTION_DETAILS_FOR_USER_CHARGES_CONSTANT)
  const [isPaymentTransactionInProgress, setIsPaymentTransactionInProgress] = useState(null)
  const [isPaymentTransactionSuccessful, setIsPaymentTransactionSuccessful] = useState(null)

  const handlePaymentModeChange = (event) => {
    let eventStr = event + ""
    //=============payment mode change handling============= 
    if (eventStr.includes('mode_of_payment')) {
      let eventItem = JSON.parse(event)
      setPaymentModeObj(prevState => {
        return { ...prevState, payment_mode: eventItem.mode_of_payment }
      })
    }
  }

  const handlePaymentTransactionDetailsChange = (event) => {
    // console.log(event)
    let paymentMode = convertStringToLowerCaseNTrim(paymentModeObj.payment_mode)
    let eventStr = event + ""
    // console.log(eventStr)
    //===========normal id handling==========================
    if (event?.target?.id) {
      let eventId = event.target.id;
      let eventVal = event.target.value
      setPaymentTransactionDetails(prevState => {
        return { ...prevState, [eventId]: eventVal }
      })
    } else if (event?.$d) {
      // console.log("setting payment date======")
      if (paymentMode == "cheque") {
        setPaymentTransactionDetails(prevState => {
          return {
            ...prevState, cheque_date: event.$d,
            dd_date: "", neft_date: "", rtgs_date: ""
          }
        })
      } else if (paymentMode == "dd") {
        setPaymentTransactionDetails(prevState => {
          return {
            ...prevState, dd_date: event.$d,
            cheque_date: "", neft_date: "", rtgs_date: ""
          }
        })
      } else if (paymentMode == "neft") {
        setPaymentTransactionDetails(prevState => {
          return {
            ...prevState, neft_date: event.$d,
            dd_date: "", cheque_date: "", rtgs_date: ""
          }
        })
      } else if (paymentMode == "rtgs") {
        setPaymentTransactionDetails(prevState => {
          return {
            ...prevState, rtgs_date: event.$d,
            neft_date: "", dd_date: "", cheque_date: ""
          }
        })
      }
    } else if (eventStr.includes("card_type")) {
      let cardType = eventStr.split("_")[2]
      setPaymentTransactionDetails(prevState => {
        return { ...prevState, card_type: cardType }
      })
    } else if (eventStr.includes("bank_name")) {
      let eventItem = JSON.parse(event)
      setPaymentTransactionDetails(prevState => {
        return { ...prevState, bank_name: eventItem.bank_name }
      })
    }
  }

  useEffect(() => {
    console.log("paymentTransactionDetails :: ")
    console.log(paymentTransactionDetails)
    const { narration, bank_name, others_bank_name, branch, cheque_date, cheque_no,
      dd_no, dd_date, neft_no, neft_date, rtgs_no, rtgs_date, appr_code, card_type,
      card_no, card_holder_name, transaction_id } = paymentTransactionDetails
    let payment_mode = convertStringToLowerCaseNTrim(paymentModeObj?.payment_mode)
    let isValid = true
    let transaction_bank_name = bank_name.toString().trim().toLowerCase() == "others" ? others_bank_name :
      bank_name.toString().trim().toLowerCase()
    if (payment_mode == 'cash') {
      // isValid = !isBlankString(narration)
      isValid = true
    } else if (payment_mode == 'cheque') {
      console.log(transaction_bank_name + "++" + branch + "++" + cheque_no + "++" + cheque_date)
      isValid = !isBlankString(transaction_bank_name) && !isBlankString(branch) &&
        !isBlankString(cheque_no) && !isBlankString(cheque_date)
    } else if (payment_mode == 'dd') {
      isValid = !isBlankString(transaction_bank_name) && !isBlankString(branch) &&
        !isBlankString(dd_no) && !isBlankString(dd_date)
    } else if (payment_mode == 'neft') {
      isValid = !isBlankString(transaction_bank_name) && !isBlankString(branch) &&
        !isBlankString(neft_no) && !isBlankString(neft_date)
    } else if (payment_mode == 'rtgs') {
      isValid = !isBlankString(transaction_bank_name) && !isBlankString(branch) &&
        !isBlankString(rtgs_no) && !isBlankString(rtgs_date)
    }
    // else if (payment_mode == 'upi') {
    //   isValid = !isBlankString(transaction_bank_name) && !isBlankString(branch) &&
    //     !isBlankString(upi_no) && !isBlankString(upi_date)
    // } 
    else if (payment_mode == 'card') {
      isValid = !isBlankString(transaction_bank_name) &&
        !isBlankString(appr_code) && !isBlankString(transaction_id) &&
        !isBlankString(card_no) && !isBlankString(card_holder_name) && !isBlankString(card_type)
    } else {
      isValid = null
    }
    console.log("isPaymentTransactionDetailsValid isValid === " + isValid)
    setIsPaymentTransactionDetailsValid(isValid)
  }, [paymentTransactionDetails])

  const handleConsumerChargesPayment = async () => {
    const requestBody = {
      ...paymentModeObj,
      ...paymentTransactionDetails,
      //converting dates to api required formats
      cheque_date: convertDateToAPIFormat(paymentTransactionDetails.cheque_date),
      dd_date: convertDateToAPIFormat(paymentTransactionDetails.dd_date),
      rtgs_date: convertDateToAPIFormat(paymentTransactionDetails.rtgs_date),
      neft_date: convertDateToAPIFormat(paymentTransactionDetails.neft_date),
      //adding ip address of user
      ip_address: await getIPAddressOfUser(),
      user_id: getCookieByName(SUDA_USER_ID),
      consumer_mstr_id: consumerDetails[0].consumer_mstr_id,
      consumer_no: consumerDetails[0].consumer_no,
      payable_amt: dueDetails[0].demand_amount,
      effective_date: demandDetails.flatMap(item => {
        return [item.demand_from, item.demand_to]
      }),
      id: demandDetails.map(item => {
        return item.id
      })
    }
    console.log(requestBody)
    // throw new Error("test")
    const url = `${SUDA_API_BASE_URL}/user/consumerPayment`
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName(SUDA_TOKEN)}` },
      body: JSON.stringify(requestBody),
    }
    fetchFromAPIWithSetterForTextAsResponse(url, requestOptions, setTransactionNumber, setIsPaymentTransactionInProgress, setIsPaymentTransactionSuccessful)
    setTrigger(true)
  }

  //resetting the paymentTransactionDetails if payment was successful
  useEffect(() => {
    if (isPaymentTransactionSuccessful == true) {
      setPaymentTransactionDetails(PAYMENT_TRANSACTION_DETAILS_FOR_USER_CHARGES_CONSTANT)
    }
  }, [isPaymentTransactionSuccessful])

  const closeFloatingMessage = () => {
    setIsPaymentTransactionSuccessful(null)
  }

  useEffect(() => {
    console.log(consumerItemForView)
    const requestOptions = {
      method: "GET",
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName(SUDA_TOKEN)}` },
    }
    //consumer details
    let url = `${SUDA_API_BASE_URL}/user/fetchConsumerDetailByConsumerNo?consumer_no=${consumerItemForView?.consumer_no}&id=${consumerItemForView?.id}`
    fetchFromAPI(url, requestOptions, setConsumerDetails, setIsConsumerDetailsLoading, setIsConsumerDetailsLoaded)

    //area details
    // url = `${SUDA_API_BASE_URL}/user/fetchAreaDetailByConsumerNo?consumer_no=${consumerItemForView?.consumer_no}&id=${consumerItemForView?.id}`
    url = `${SUDA_API_BASE_URL}/user/fetchAreaDetailByConsumerNo?consumer_no=${consumerItemForView?.consumer_no}`
    fetchFromAPI(url, requestOptions, setAreaDetails, setIsAreaDetailsLoading, setIsAreaDetailsLoaded)

    //monthly rate details
    // url = `${SUDA_API_BASE_URL}/user/fetchMonthlyRateByConsumerNo?consumer_no=${consumerItemForView?.consumer_no}&id=${consumerItemForView?.id}`
    url = `${SUDA_API_BASE_URL}/user/fetchMonthlyRateByConsumerNo?consumer_no=${consumerItemForView?.consumer_no}`
    fetchFromAPI(url, requestOptions, setMonthlyRateDetails, setIsMonthlyRateDetailsLoading, setIsMonthlyRateDetailsLoaded)

    //due details
    // url = `${SUDA_API_BASE_URL}/user/fetchDeuDetailsByConsumerNo?consumer_no=${consumerItemForView?.consumer_no}&id=${consumerItemForView?.id}`
    url = `${SUDA_API_BASE_URL}/user/fetchDueDetailsByConsumerNo?consumer_no=${consumerItemForView?.consumer_no}`
    fetchFromAPI(url, requestOptions, setDueDetails, setIsDueDetailsLoading, setIsDueDetailsLoaded)
 
    //demand details
    url = `${SUDA_API_BASE_URL}/user/getDemandByConsumerNo?consumer_no=${consumerItemForView?.consumer_no}&id=${consumerItemForView?.id}`
    fetchFromAPI(url, requestOptions, setDemandDetails, setIsDemandDetailsLoading, setIsDemandDetailsLoaded)

    //payment details
    url = `${SUDA_API_BASE_URL}/user/fetchPaymentDetailsByConsumerNo?consumer_no=${consumerItemForView?.consumer_no}&id=${consumerItemForView?.id}`
    fetchFromAPI(url, requestOptions, setPaymentDetails, setIsPaymentDetailsLoading, setIsPaymentDetailsLoaded)

  }, [consumerItemForView, trigger])

  /**
   * resetting setIsPaymentTransactionDetailsValid and paymentTransactionDetails to default state if payment mode changes
   */
  useEffect(() => {
    console.log("resetting setIsPaymentTransactionDetailsValid to null ====")
    setIsPaymentTransactionDetailsValid(null)
    setPaymentTransactionDetails(PAYMENT_TRANSACTION_DETAILS_FOR_USER_CHARGES_CONSTANT)
  }, [paymentModeObj])

  const handleViewPaymentReceipt = (paymentDetailsItem) => {
    console.log(paymentDetailsItem)
    setPaymentDetailsItemForReceiptView(paymentDetailsItem)
    switchOnPrevModalNOffCurrModal(currModal, nextModal)
  }

  return showModal == true ? (
    <div>
      <ViewConsumerDetails
        consumerDetails={consumerDetails}
        isConsumerDetailsLoading={isConsumerDetailsLoading}
        isConsumerDetailsLoaded={isConsumerDetailsLoaded}
      />
      <div className="mb-6"></div>
      <ViewAreaDetails
        areaDetails={areaDetails}
        isAreaDetailsLoading={isAreaDetailsLoading}
        isAreaDetailsLoaded={isAreaDetailsLoaded}
      />
      <div className="mb-6"></div>
      <ViewMonthlyRateDetails 
        monthlyRateDetails={monthlyRateDetails}
        isMonthlyRateDetailsLoading={isMonthlyRateDetailsLoading}
        isMonthlyRateDetailsLoaded={isMonthlyRateDetailsLoaded}
      />
      <div className="mb-6"></div>
      <ViewDueDemandDetails
        dueDetails={dueDetails}
        isDueDetailsLoading={isDueDetailsLoading}
        isDueDetailsLoaded={isDueDetailsLoaded}
        demandDetails={demandDetails}
        isDemandDetailsLoading={isDemandDetailsLoading}
        isDemandDetailsLoaded={isDemandDetailsLoaded}
      />
      <div className="mb-6"></div>
      <ViewPaymentDetails
        paymentDetails={paymentDetails}
        isPaymentDetailsLoading={isPaymentDetailsLoading}
        isPaymentDetailsLoaded={isPaymentDetailsLoaded}
        handleViewPaymentReceipt={handleViewPaymentReceipt}
      />
      <div className="mb-6"></div>
      {
        isDueDetailsLoaded == true && dueDetails?.length > 0 ? (
          !isBlankString(dueDetails[0].demand_amount) &&
            parseInt(dueDetails[0].demand_amount) > 0 ? (
            <PaymentModesPage
              paymentTransactionDetails={paymentTransactionDetails}
              handlePaymentTransactionDetailsChange={handlePaymentTransactionDetailsChange}
              paymentModeObj={paymentModeObj}
              handlePaymentModeChange={handlePaymentModeChange}
            />
          ) : null
        ) : null
      }

      {
        isPaymentTransactionInProgress == true ? (
          <ColorRingCustom />
        ) : null
      }
      {
        isPaymentTransactionSuccessful == true && transactionNumber ? (
          <FloatingMessage
            message={`Payment has been made successfully ! The Transaction No. is ${transactionNumber}`}
            showMessage={true}
            color={`green`}
            closeFloatingMessage={closeFloatingMessage}
          />
        ) : null
      }
      {
        isPaymentTransactionSuccessful == false ? (
          <FloatingMessage
            message={SOMETHING_WENT_WRONG}
            showMessage={true}
            color={`red`}
            closeFloatingMessage={closeFloatingMessage}
          />
        ) : null
      }
      <div className="container py-2 px-10 mb-10 mx-0 min-w-full flex flex-col items-center">
        <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
          <button
            onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
            className="w-36 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
            Back
          </button>
          <button
            onClick={handleConsumerChargesPayment}
            disabled={!isPaymentTransactionDetailsValid}
            className={`w-356 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white transition-colors 
                    duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none 
                    focus:bg-green-400 ${isPaymentTransactionDetailsValid == false || 
                      isPaymentTransactionDetailsValid == null
                ? `cursor-not-allowed` : ``}`}>
            Pay User Charges
          </button>
        </div>
      </div>

    </div>
  ) : null
}

export default ViewUserDemandDetailsAndPayment