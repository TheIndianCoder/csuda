import FloatingMessage from '@/utils/floatingMessage'
import { isBlankString } from '@/utils/formValidatorUtils'
import { getCookieByName } from '@/utils/RequireAuth'
import { Option, Select } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import ApplicationDetails from './applicationDetails'
import DemandDetails from './demandDetails'
import DueDetails from './dueDetails'
import OwnerDetails from './ownerDetails'
import PaymentDetails from './paymentDetails'
import PropertyPaymentConfirmationModal from './propertyPaymentConfirmationModal'
import TaxDetails from './taxDetails'
import UploadTearOffReceipt from './uploadTearOffReceipt'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import { useMaterialTailwindController } from '@/Dashboard/context'
import { convertDateToAPIFormat } from '@/utils/commonUtils'
import { SUDA_TOKEN, SUDA_USER_ID } from '@/utils/appConstants'

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL
let countOfFetchCalls = 0

function PropertyDetails({
  showModal, currModal, propId, prevModal, switchOnPrevModalNOffCurrModal, setPaymentDetailsForReceiptView,
  nextModal, paymentDetailsForReceiptView, setReceiptHeader, demandReceiptModal
}) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { paymentModeDetailsInputFromAPI } = controller;
  // console.log("inside property details+++++++++++++++++++++++++")
  // console.log(setPaymentDetailsForReceiptView)
  const [propertyDetails, setPropertyDetails] = useState(null)
  const [propertyOwnerDetails, setPropertyOwnerDetails] = useState(null)
  const [propertyOwnerTaxDetails, setPropertyOwnerTaxDetails] = useState(null)
  const [propertyDemandDetails, setPropertyDemandDetails] = useState(null)
  const [propertyPaymentDetails, setPropertyPaymentDetails] = useState(null)
  const [propertyDueDetails, setPropertyDueDetails] = useState(null)


  const [demandDetailsForDemandEntry, setDemandDetailsForDemandEntry] = useState([])
  const [isDemandCreationSuccessfull, setIsDemandCreationSuccessfull] = useState(null)
  const [isPaymentLoading, setIsPaymentLoading] = useState(null)
  const [isPaymentSuccessfull, setIsPaymentSuccessfull] = useState(null)
  const [trigger, setTrigger] = useState(false)
  const [paymentModeObj, setPaymentModeObj] = useState({
    payment_mode: "",
    payment_mode_id: ""
  })
  const [isPaymentViewBeforeTransactionLoading, setIsPaymentViewBeforeTransactionLoading] = useState(null)
  const [isPaymentViewBeforeTransactionLoaded, setIsPaymentViewBeforeTransactionLoaded] = useState(null)
  const [paymentViewBeforeTransactionObj, setPaymentViewBeforeTransactionObj] = useState(null)

  const [errorDetails, setErrorDetails] = useState({
    propDetailsErr: { errMsg: null, },
    propOwnerDetailsErr: { errMsg: null, },
    propOwnerTaxDetailsErr: { errMsg: null, },
    propDemandDetailsErr: { errMsg: null, },
    propPaymentDetailsErr: { errMsg: null, },
    propDueDetailsErr: { errMsg: null }
  })

  /**
   * All cashTransactio related state objects
   */
  const [isPaymentTransactionDetailsValid, setIsPaymentTransactionDetailsValid] = useState(null)
  const [paymentTransactionDetails, setPaymentTransactionDetails] = useState({
    appr_code: "",
    bank_name: "",
    branch: "",
    card_holder_name: "",
    card_no: "",
    card_type: "",
    cheque_date: "",
    cheque_no: "",
    dd_date: "",
    dd_no: "",
    demand_payment: "",
    discount: "",
    due_from_year: "",
    due_up_to_year: "",
    narration: "",
    neft_date: "",
    neft_no: "",
    others_bank_name: "",
    payment_mode: "",
    payment_mode_id: "",
    rtgs_date: "",
    rtgs_no: "",
    transaction_id: "",
  })

  useEffect(() => {
    console.log("Inside PropertyDetails module with prop id == " + propId)
    const getPropertyDetailsUrl = `${SUDA_API_BASE_URL}/user/getPropertyDetailsByPropId?prop_id=${propId}`
    const getPropertyOwnerDetailsUrl = `${SUDA_API_BASE_URL}/user/getPropertyOwnerDetailsByPropId?prop_id=${propId}`
    const getPropertyOwnerTaxUrl = `${SUDA_API_BASE_URL}/user/getPropertyOwnerTaxByPropId?prop_id=${propId}`
    const getDemandDetailsUrl = `${SUDA_API_BASE_URL}/user/getDemandDetailsByPropId?prop_id=${propId}`
    const getPaymentDetailsUrl = `${SUDA_API_BASE_URL}/user/getPaymentDetailsByPropId?prop_id=${propId}`
    const getDueDetailsUrl = `${SUDA_API_BASE_URL}/user/getDueDetailsByPropId?prop_id=${propId}`

    const requestOptions = {
      method: "GET",
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
    }

    const getAllPropertyNTaxDetails = async (reqUrl, reqOptions, dataSetter, errSetter, errDataType, errMsgArr) => {
      // dataSetter(null)
      let response = null, responseBody = null;
      //Property application details=========================
      try {
        response = await fetch(reqUrl, reqOptions)
        responseBody = await response.json()
      } catch (ex) {
        dataSetter(false)
        errSetter(prevState => {
          return {
            ...prevState, [errDataType]: { ...prevState[errDataType], errMsg: errMsgArr[0] }
          }
        })
        return;
      }
      if (response?.status == '200') {
        // console.log("property app details=================")
        // console.log(responseBody)
        dataSetter(responseBody)
        errSetter(prevState => {
          return {
            ...prevState, [errDataType]: { ...prevState[errDataType], errMsg: responseBody?.length > 0 ? null : errMsgArr[1] }
          }
        })
      } else {
        dataSetter(false)
        errSetter(prevState => {
          return {
            ...prevState, [errDataType]: { ...prevState[errDataType], errMsg: errMsgArr[1] }
          }
        })
      }
    }
    //Get property application details
    getAllPropertyNTaxDetails(getPropertyDetailsUrl, requestOptions, setPropertyDetails,
      setErrorDetails, "propDetailsErr", ['Unable to fetch data!', 'Property application details not found!'])
    //get property owner details
    getAllPropertyNTaxDetails(getPropertyOwnerDetailsUrl, requestOptions, setPropertyOwnerDetails,
      setErrorDetails, "propOwnerDetailsErr", ['Unable to fetch data!', 'Property owner details not found!'])
    //Get property tax details
    getAllPropertyNTaxDetails(getPropertyOwnerTaxUrl, requestOptions, setPropertyOwnerTaxDetails,
      setErrorDetails, "propOwnerTaxDetailsErr", ['Unable to fetch data!', 'Property tax details not found!'])
    //Get property Demand details
    getAllPropertyNTaxDetails(getDemandDetailsUrl, requestOptions, setPropertyDemandDetails,
      setErrorDetails, "propDemandDetailsErr", ['Unable to fetch data!', 'Property demand details not found!'])
    //Get property payment details
    getAllPropertyNTaxDetails(getPaymentDetailsUrl, requestOptions, setPropertyPaymentDetails,
      setErrorDetails, "propPaymentDetailsErr", ['Unable to fetch data!', 'Property payment details not found!'])
    //Get property due details
    getAllPropertyNTaxDetails(getDueDetailsUrl, requestOptions, setPropertyDueDetails,
      setErrorDetails, "propDueDetailsErr", ['Unable to fetch data!', 'Property due details not found!'])

  }, [trigger])

  const handlePaymentModeNNarrationChange = (event) => {
    // console.log("selected payment mode :: ")
    console.log(event)
    if (event?.target?.id) {
      if (event.target.id == 'narration') {
        // console.log(event.target.value)
        setPaymentTransactionDetails(prevState => {
          return { ...prevState, [event.target.id]: event.target.value }
        })
      }
    } else {
      console.log("setting paymentModeObj")
      let paymentModeObj = JSON.parse(event)
      setPaymentModeObj(prevState => {
        return {
          ...prevState,
          payment_mode: (paymentModeObj.mode_of_payment + "").trim(),
          payment_mode_id: paymentModeObj.id
        }
      })
    }
  }

  const handlePaymentTransactionDetailsChange = (event) => {
    // console.log(event)
    let paymentMode = (paymentModeObj.payment_mode + "").trim().toLowerCase()
    let eventStr = event + ""
    // console.log(eventStr)
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
    let payment_mode = (paymentModeObj?.payment_mode + "").trim().toLowerCase()
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

  useEffect(() => {
    console.log("isPaymentTransactionDetailsValid === " + isPaymentTransactionDetailsValid)
  }, [isPaymentTransactionDetailsValid])

  useEffect(() => {
    console.log("resetting setIsPaymentTransactionDetailsValid to null ====")
    setIsPaymentTransactionDetailsValid(null)
    setPaymentTransactionDetails({
      appr_code: "",
      bank_name: "",
      branch: "",
      card_holder_name: "",
      card_no: "",
      card_type: "",
      cheque_date: "",
      cheque_no: "",
      dd_date: "",
      dd_no: "",
      demand_payment: "",
      discount: "",
      due_from_year: "",
      due_up_to_year: "",
      narration: "",
      neft_date: "",
      neft_no: "",
      others_bank_name: "",
      payment_mode: "",
      payment_mode_id: "",
      rtgs_date: "",
      rtgs_no: "",
      transaction_id: "",
    })
  }, [paymentModeObj])

  /**
   * This is for fetching PaymentViewBeforeTransaction
   * @param {*} demandDetailsForDemandEntry 
   */
  const fetchPaymentViewBeforeTransaction = async (demandDetailsForDemandEntry) => {
    countOfFetchCalls += 1
    console.log("countOfFetchCalls::" + countOfFetchCalls)
    setIsPaymentViewBeforeTransactionLoading(true)
    setIsPaymentViewBeforeTransactionLoaded(null)
    const requestBody = {
      demand_payment: 0,
      discount: 0,
      form_fee: 0,
      id: demandDetailsForDemandEntry.map(item => {
        return item.id
      }),
      payable_amt: 0,
      penalty: 0
    }
    const url = `${SUDA_API_BASE_URL}/user/paymentViewBeforeTransaction`
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
      body: JSON.stringify(requestBody)
    }
    let response = null, responseBody = null;
    try {
      response = await fetch(url, requestOptions)
      responseBody = await response.json()
      setPaymentViewBeforeTransactionObj(responseBody)
      setIsPaymentViewBeforeTransactionLoaded(true)
    } catch (ex) {
      setPaymentViewBeforeTransactionObj(null)
      setIsPaymentViewBeforeTransactionLoaded(false)
    } finally {
      countOfFetchCalls -= 1
      if (countOfFetchCalls < 1) {
        setIsPaymentViewBeforeTransactionLoading(false)
        countOfFetchCalls = 0
      } else {
        setIsPaymentViewBeforeTransactionLoading(true)
      }
    }

  }

  useEffect(() => {
    setPaymentModeObj(null)

    //calling payment view before demand generation api
    if (demandDetailsForDemandEntry?.length > 0) {
      fetchPaymentViewBeforeTransaction(demandDetailsForDemandEntry)
    } else {

    }
  }, [demandDetailsForDemandEntry])

  const handleDemandEntry = async () => {
    // setTrigger(!trigger)
    setIsDemandCreationSuccessfull("loading")
    let requestBody = []
    try {
      console.log("bugg1111====")
      // console.log(propertyDetails)
      demandDetailsForDemandEntry.forEach(item => {
        requestBody.push({
          effect_year: item.effect_year,
          holding_no: propertyDetails[0].property_no
        })
      })
      const demandEntryUrl = `${SUDA_API_BASE_URL}/user/createDemandEntry?user_id=${getCookieByName(SUDA_USER_ID)}`
      const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName(SUDA_TOKEN)}` },
        body: JSON.stringify(requestBody)
      }
      let response = null, responseBody = null;
      try {
        response = await fetch(demandEntryUrl, requestOptions)
        responseBody = await response.json()
      } catch (err) {
        console.error(err)
      }
      if (response?.status == '200') {
        console.log("demand entry done============")
        setIsDemandCreationSuccessfull(true)
      } else {
        console.log("demand not done==============")
        setIsDemandCreationSuccessfull(false)
      }
    } catch (err) {
      console.error(err)
      setIsDemandCreationSuccessfull(false)
    }

  }

  const handleCashPaymentTransaction = async () => {
    // console.log("paymentModeObj == ")
    // console.log(paymentModeObj)
    setIsPaymentLoading('loading')
    setIsDemandCreationSuccessfull(null)
    let ipAddress = ""
    try {
      let responseIp = await fetch("https://geolocation-db.com/json/")
      let responseBodyOfIp = await responseIp.json()
      ipAddress = responseBodyOfIp?.IPv4 ? responseBodyOfIp.IPv4 : "0.0.0.0"
    } catch (err) {
      console.error(err)
      ipAddress = "0.0.0.0"
    }
    // console.log(`[handleCashPaymentTransaction] paymentTransactionDetails :`)
    // console.log(paymentTransactionDetails)
    let requestBody = {
      property_no: propertyDetails[0].property_no,
      user_id: parseInt(getCookieByName('SUDA_USER_ID')),
      ip_address: ipAddress,
      effective_date: demandDetailsForDemandEntry.map(item => {
        return item.effect_year
      }),
      ...paymentTransactionDetails,
      ...paymentModeObj,
      discount: paymentViewBeforeTransactionObj[0].discount,
      due_from_year: demandDetailsForDemandEntry[0].effect_year,
      due_up_to_year: demandDetailsForDemandEntry[demandDetailsForDemandEntry.length - 1].effect_year,
      form_fee: paymentViewBeforeTransactionObj[0].form_fee,
      id: paymentViewBeforeTransactionObj[0].id,
      payable_amt: paymentViewBeforeTransactionObj[0].payable_amt,
      penalty: paymentViewBeforeTransactionObj[0].penalty,
      demand_payment: paymentViewBeforeTransactionObj[0].demand_payment,
      //converting dates to api required formats
      cheque_date: convertDateToAPIFormat(paymentTransactionDetails.cheque_date),
      dd_date: convertDateToAPIFormat(paymentTransactionDetails.dd_date),
      rtgs_date: convertDateToAPIFormat(paymentTransactionDetails.rtgs_date),
      neft_date: convertDateToAPIFormat(paymentTransactionDetails.neft_date)
    }
    console.log(`[handleCashPaymentTransaction] requestBody :`)
    console.log(requestBody)
    // console.log("requestBody for cashTransaction :: ")
    // console.log(requestBody)
    const cashTransactionUrl = `${SUDA_API_BASE_URL}/user/cashTransaction`
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
      body: JSON.stringify(requestBody)
    }
    let respone = null, responseBody = null
    try {
      // throw new Error("cashTransaction blocked!")
      respone = await fetch(cashTransactionUrl, requestOptions)
      console.log("cash transaction api calling==============")
      console.log(respone)
      responseBody = await respone.json()
      console.log(responseBody)
    } catch (err) {
      console.log(err)
    } finally {
      setIsPaymentLoading(null)
    }

    if (respone?.status == 200) {
      console.log("cash transaction done===========")
      setPropertyDemandDetails(null)
      setPropertyPaymentDetails(null)
      setIsDemandCreationSuccessfull(null)
      setTrigger(!trigger)
      setIsPaymentSuccessfull(true)
      setDemandDetailsForDemandEntry([])

    } else {
      console.log("cash transaction not done=======")
      setIsDemandCreationSuccessfull(null)
      setIsPaymentSuccessfull(false)
    }

  }

  const handlePaymentReceiptView = (paymentDetailsObj, index) => {
    console.log(paymentDetailsObj)
    // setReceiptHeader(header)
    setPaymentDetailsForReceiptView(paymentDetailsObj)
    switchOnPrevModalNOffCurrModal(currModal, nextModal)
  }

  const handleDemandReceiptView = (paymentDetailsObj, index) => {
    console.log(paymentDetailsObj)
    // setReceiptHeader(header)
    setPaymentDetailsForReceiptView(paymentDetailsObj)
    switchOnPrevModalNOffCurrModal(currModal, demandReceiptModal)
  }

  // useEffect(() => {
  //   console.log("useEffect============================")
  //   console.log(paymentDetailsForReceiptView)
  //   switchOnPrevModalNOffCurrModal(currModal, prevModal)
  // }, [paymentDetailsForReceiptView])

  const handlePaymentFloatingMsgClose = () => {
    setIsPaymentSuccessfull(null)
  }

  return showModal ? (<div>

    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10 mb-10">
      <div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-md lg:max-w-full">

        <nav className="relative bg-orange-800 flex navcustomproperty flex-wrap items-center justify-between pl-2 pr-0 py-2 mb-2 ring-1 ring-red-700 rounded-md">
          <h2 className="text-sm font-semibold text-center text-white">
            Property Details
          </h2>
          <button onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
            className="w-24 h-8 px-0 py-0 mx-4 my-0 tracking-wide text-white text-sm font-semibold transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
            Back
          </button>
        </nav>
        <form className="mt-4 ">
          <ApplicationDetails
            propertyDetails={propertyDetails}
            propDetailsErr={errorDetails.propDetailsErr} />
          <div className="mb-6"></div>
          <OwnerDetails
            propertyOwnerDetails={propertyOwnerDetails}
            propOwnerDetailsErr={errorDetails.propOwnerDetailsErr} />
          <div className="mb-6"></div>
          <TaxDetails
            propertyOwnerTaxDetails={propertyOwnerTaxDetails}
            propOwnerTaxDetailsErr={errorDetails.propOwnerTaxDetailsErr} />
          <div className="mb-6"></div>
          {/* <UploadTearOffReceipt /> */}
          {/* <div className="mb-6"></div> */}
          <DueDetails
            propertyDueDetails={propertyDueDetails}
            propDueDetailsErr={errorDetails.propDueDetailsErr}
          />
          <div className="mb-6"></div>
          <DemandDetails
            propertyDemandDetails={propertyDemandDetails}
            propDemandDetailsErr={errorDetails.propDemandDetailsErr}
            setDemandDetailsForDemandEntry={setDemandDetailsForDemandEntry}
          />
          <div className="mb-6"></div>
          <PaymentDetails
            propertyPaymentDetails={propertyPaymentDetails}
            propPaymentDetailsErr={errorDetails.propPaymentDetailsErr}
            switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
            currModal={currModal} prevModal={prevModal}
            setPaymentDetailsForReceiptView={setPaymentDetailsForReceiptView}
            nextModal={nextModal}
            handlePaymentReceiptView={handlePaymentReceiptView}
            handleDemandReceiptView={handleDemandReceiptView}
          />
          <div className="mb-6"></div>
          {
            demandDetailsForDemandEntry?.length > 0 ? (
              <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md   lg:max-w-full">
                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-md">
                  <h2 className="text-sm font-semibold text-center text-white">
                    Select Payment Mode
                  </h2>
                </nav>
                <div className="flex flex-col">
                  <div className="overflow-x-auto">
                    <div className="p-2.5 2xl:w-full inline-block align-middle">
                      <div className="overflow-hidden">
                        {
                          isPaymentViewBeforeTransactionLoading == true ? (
                            <div className="m-auto w-24 h-24">
                              <ColorRing
                                visible={true}
                                height="40"
                                width="40"
                                colors={['#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000']}
                              />
                            </div>
                          ) : null
                        }
                        {
                          isPaymentViewBeforeTransactionLoaded == true ? (
                            <table className="min-w-full">
                              <thead className="bg-gray-50">
                              </thead>
                              <tbody>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="px-3 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                    Due From Year
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                    :
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                    {demandDetailsForDemandEntry[0].effect_year}
                                  </td>
                                  <td className="px-3 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                    Due Upto Year
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                    :
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900 font-medium  whitespace-normal">
                                    {demandDetailsForDemandEntry[demandDetailsForDemandEntry.length - 1].effect_year}
                                  </td>

                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="px-3 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                    Demand Amount
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                    :
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                    {paymentViewBeforeTransactionObj[0]?.demand_payment}
                                  </td>
                                  <td className="px-3 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                    Penalty
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                    :
                                  </td>
                                  <td className="px-4 py-2 text-sm text-red-700 font-bold  whitespace-normal">
                                    {paymentViewBeforeTransactionObj[0]?.penalty}
                                  </td>

                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="px-3 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                    Discount
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                    :
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                    {paymentViewBeforeTransactionObj[0]?.discount}
                                  </td>
                                  <td className="px-3 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                    Form Fee
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                    :
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900  whitespace-normal">
                                    {paymentViewBeforeTransactionObj[0]?.form_fee}
                                  </td>

                                </tr>

                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                  {/* <td className="px-3 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                    User Charge Amount
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                    :
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                    {}
                                  </td> */}
                                  <td className="px-3 py-2 font-semibold text-sm font-bold text-green-700 whitespace-normal">
                                    Paybale Amount
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                    :
                                  </td>
                                  <td className="px-4 py-2 text-sm text-green-700 font-bold  whitespace-normal">
                                    {paymentViewBeforeTransactionObj[0]?.payable_amt}
                                  </td>

                                </tr>

                              </tbody>
                            </table>
                          ) :
                            <p></p>
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end mt-3 mb-6">
                  <div className="mb-2 ml-4 mt-2 min-w-fit max-w-fit">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                      Mode Of Payment<p className='contents text-red-600 text-xs font-bold'>*</p>
                    </label>
                    <Select onChange={handlePaymentModeNNarrationChange}
                      label="select" className="pl-2 pr-3 py-2 font-bold text-xs text-gray-900" color='orange'>
                      {
                        paymentModeDetailsInputFromAPI?.length > 0 ? (
                          paymentModeDetailsInputFromAPI[0]?.modeOfPaymentBeans.map((item, index) => {
                            const { id, mode_of_payment, status } = item
                            return (
                              <Option key={index} value={JSON.stringify(item)} >{mode_of_payment}</Option>
                            )
                          })
                        ) : <Option>Loading...</Option>
                      }
                    </Select>

                  </div>
                  <div className="mb-0 ml-3 mt-2 min-w-fit max-w-fit">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                      Narration
                      {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
                    </label>
                    <textarea
                      onChange={handlePaymentModeNNarrationChange}
                      value={paymentTransactionDetails?.narration}
                      className="bg-white-200 appearance-none border border-gray-500 rounded w-64 h-10 py-2 px-4 text-white-700 
                  leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                      id="narration"
                      name="narration" rows="4" cols="20"></textarea>
                  </div>
                </div>
                <div className="mb-6"></div>
                {
                  ((paymentModeObj?.payment_mode + "").trim().toLowerCase() != "cash"
                    && paymentModeObj?.payment_mode) ? (
                    <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md   lg:max-w-full">
                      <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-md">
                        <h2 className="text-sm font-semibold text-center text-white">
                          Bank Details
                        </h2>
                      </nav>
                      <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                          <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                            Bank Name<p className='contents text-red-600 text-xs font-bold'>*</p>
                          </label>
                          <Select onChange={handlePaymentTransactionDetailsChange}
                            label="select" color='orange' className="pl-2 pr-3 py-2 w-full font-bold text-xs text-gray-900">
                            {
                              paymentModeDetailsInputFromAPI?.length > 0 ? (
                                paymentModeDetailsInputFromAPI[0]?.bankNameBeans.map((item, index) => {
                                  const { id, bank_name } = item
                                  return (
                                    <Option key={index} value={JSON.stringify(item)} >{bank_name}</Option>
                                  )
                                })
                              ) : <Option>Loading...</Option>
                            }
                          </Select>
                        </div>
                        {
                          (paymentTransactionDetails?.bank_name + "").trim().toLowerCase() == "others" ? (
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                              <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                                Please mention other bank name<p className='contents text-red-600 text-sm font-bold'>*</p>
                              </label>
                              <input onChange={handlePaymentTransactionDetailsChange}
                                value={paymentTransactionDetails.others_bank_name}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                                id="others_bank_name" type="text" placeholder="Branch" />
                            </div>
                          ) : null
                        }
                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                          <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                            Branch<p className='contents text-red-600 text-sm font-bold'>* </p>
                            <p className='contents text-red-600 text-xs font-bold whitespace-normal'>
                              Please leave empty if branch name is not applicable for selected payment mode.
                            </p>
                          </label>
                          <input onChange={handlePaymentTransactionDetailsChange}
                            value={paymentTransactionDetails.branch}
                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                            id="branch" type="text" placeholder="Branch" />
                        </div>
                      </div>
                      {
                        (paymentModeObj?.payment_mode + "").trim().toLowerCase() == "cheque" ? (
                          <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                              <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Cheque No.">
                                Cheque No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                              </label>
                              <input onChange={handlePaymentTransactionDetailsChange}
                                value={paymentTransactionDetails.cheque_no}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                                id="cheque_no" type="text" placeholder="Cheque No." />
                            </div>
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                              <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                Cheque Date
                                <p className='contents text-red-600 text-sm font-bold'>*</p>
                              </label>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                  <DesktopDatePicker
                                    // label="Date desktop"
                                    id="cheque_date"
                                    onChange={handlePaymentTransactionDetailsChange}
                                    inputFormat="MM/DD/YYYY"
                                    color='orange'
                                    renderInput={(params) => <TextField {...params} />}
                                    value={paymentTransactionDetails.cheque_date}
                                  />
                                </Stack>
                              </LocalizationProvider>
                            </div>
                          </div>
                        ) : null
                      }
                      {
                        (paymentModeObj?.payment_mode + "").trim().toLowerCase() == "rtgs" ? (
                          <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                              <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Cheque No.">
                                RTGS No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                              </label>
                              <input
                                onChange={handlePaymentTransactionDetailsChange}
                                value={paymentTransactionDetails.rtgs_no}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                                id="rtgs_no" type="text" placeholder="Cheque No." />
                            </div>
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                              <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                RTGS Date
                                <p className='contents text-red-600 text-sm font-bold'>*</p>
                              </label>

                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                  <DesktopDatePicker
                                    // label="Date desktop"
                                    id="rtgs_date"
                                    onChange={handlePaymentTransactionDetailsChange}
                                    inputFormat="YYYY-MM-DD"
                                    color='orange'
                                    renderInput={(params) => <TextField {...params} />}
                                    value={paymentTransactionDetails.rtgs_date}
                                  />
                                </Stack>
                              </LocalizationProvider>
                            </div>
                          </div>
                        ) : null
                      }
                      {
                        (paymentModeObj?.payment_mode + "").trim().toLowerCase() == "dd" ? (
                          <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                              <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Cheque No.">
                                DD No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                              </label>
                              <input
                                onChange={handlePaymentTransactionDetailsChange}
                                value={paymentTransactionDetails.dd_no}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                                id="dd_no" type="text" placeholder="Cheque No." />
                            </div>
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                              <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                DD Date
                                <p className='contents text-red-600 text-sm font-bold'>*</p>
                              </label>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                  <DesktopDatePicker
                                    // label="Date desktop"
                                    id="dd_date"
                                    onChange={handlePaymentTransactionDetailsChange}
                                    inputFormat="MM/DD/YYYY"
                                    color='orange'
                                    renderInput={(params) => <TextField {...params} />}
                                    value={paymentTransactionDetails.dd_date}
                                  />
                                </Stack>
                              </LocalizationProvider>
                            </div>
                          </div>
                        ) : null
                      }
                      {
                        (paymentModeObj?.payment_mode + "").trim().toLowerCase() == "upi" ? (
                          <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                              <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Cheque No.">
                                UPI No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                              </label>
                              <input
                                onChange={handlePaymentTransactionDetailsChange}
                                value={paymentTransactionDetails?.upi_no}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                                id="upi_no" type="text" placeholder="Cheque No." />
                            </div>
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                              <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                UPI Date
                                <p className='contents text-red-600 text-sm font-bold'>*</p>
                              </label>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                  <DesktopDatePicker
                                    // label="Date desktop"
                                    id="upi_date"
                                    onChange={handlePaymentTransactionDetailsChange}
                                    inputFormat="MM/DD/YYYY"
                                    color='orange'
                                    renderInput={(params) => <TextField {...params} />}
                                    value={paymentTransactionDetails?.upi_date}
                                  />
                                </Stack>
                              </LocalizationProvider>
                            </div>
                          </div>
                        ) : null
                      }
                      {
                        (paymentModeObj?.payment_mode + "").trim().toLowerCase() == "neft" ? (
                          <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                              <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Cheque No.">
                                NEFT No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                              </label>
                              <input
                                onChange={handlePaymentTransactionDetailsChange}
                                value={paymentTransactionDetails.neft_no}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                                id="neft_no" type="text" placeholder="Cheque No." />
                            </div>
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                              <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                NEFT Date
                                <p className='contents text-red-600 text-sm font-bold'>*</p>
                              </label>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                  <DesktopDatePicker
                                    // label="Date desktop"
                                    id="neft_date"
                                    onChange={handlePaymentTransactionDetailsChange}
                                    inputFormat="MM/DD/YYYY"
                                    color='orange'
                                    renderInput={(params) => <TextField {...params} />}
                                    value={paymentTransactionDetails.neft_date}
                                  />
                                </Stack>
                              </LocalizationProvider>
                            </div>
                          </div>
                        ) : null
                      }
                    </div>
                  ) : null
                }
                <div className="mb-6"></div>
                {
                  (paymentModeObj?.payment_mode + "").trim().toLowerCase() == "card" ? (
                    <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md  lg:max-w-full">
                      <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-blue-600 rounded-md">
                        <h2 className="text-sm font-semibold text-center text-white">
                          Card Details
                        </h2>
                      </nav>
                      <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                          <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                            Card Type<p className='contents text-red-600 text-xs font-bold'>*</p>
                          </label>
                          <Select
                            onChange={handlePaymentTransactionDetailsChange}
                            label="select" color='orange' className="pl-2 pr-3 py-2 sm:w-full lg:w-72 font-bold text-xs text-gray-900">
                            <Option value='card_type_credit' >Credit</Option>
                            <Option value='card_type_debit' >Debit</Option>
                          </Select>
                        </div>
                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                          <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Transaction ID">
                            Transaction ID<p className='contents text-red-600 text-sm font-bold'>*</p>
                          </label>
                          <input onChange={handlePaymentTransactionDetailsChange}
                            value={paymentTransactionDetails.transaction_id}
                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                            id="transaction_id" type="text" placeholder="Transaction ID" />
                        </div>
                      </div>
                      <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                          <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="APPR Code">
                            APPR Code<p className='contents text-red-600 text-sm font-bold'>*</p>
                          </label>
                          <input onChange={handlePaymentTransactionDetailsChange}
                            value={paymentTransactionDetails.appr_code}
                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                            id="appr_code" type="text" placeholder="APPR Code" />
                        </div>
                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                          <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Card No.">
                            Card No.(Last 4 Digits)<p className='contents text-red-600 text-sm font-bold'>*</p>
                          </label>
                          <input value={paymentTransactionDetails.card_no}
                            onChange={handlePaymentTransactionDetailsChange}
                            maxLength="4"
                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                            id="card_no" type="text" placeholder="Card No." />
                        </div>
                      </div>
                      <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                          <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Card Holder Name">
                            Card Holder Name<p className='contents text-red-600 text-sm font-bold'>*</p>
                          </label>
                          <input value={paymentTransactionDetails.card_holder_name}
                            onChange={handlePaymentTransactionDetailsChange}
                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                            id="card_holder_name" type="text" placeholder="Card Holder Name." />
                        </div>
                      </div>
                    </div>
                  ) : null
                }
                <div className="mb-6"></div>
              </div>
            ) : null
          }
        </form>
        {
          isDemandCreationSuccessfull == 'loading' ? (
            <div className="relative ...">
              <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
                <div className="flex items-center">
                  <span className="text-lg mr-4">Loading</span>
                  <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                </div>
              </div>
            </div>
          ) : null
        }
        {
          isPaymentLoading == 'loading' ? (<div className="m-auto w-24 h-24" >
            <p>Processing payment...</p>
            <ColorRing
              visible={isPaymentLoading == 'loading' ? true : false}
              height="40"
              width="40"
              colors={['#2fa158', '#2fa158', '#2fa158', '#2fa158', '#2fa158']}
            />
          </div>) : null
        }
        {
          isPaymentSuccessfull == true ? (
            <FloatingMessage message={`Payment is successful`}
              showMessage={true} closeFloatingMessage={handlePaymentFloatingMsgClose}
              color={`green`}
            />
          ) : isPaymentSuccessfull == false ? (
            <FloatingMessage message={`Payment is not successful, please try again!`}
              showMessage={true} closeFloatingMessage={handlePaymentFloatingMsgClose}
              color={`red`}
            />
          ) : null

        }
        {
          isDemandCreationSuccessfull == true ?
            <PropertyPaymentConfirmationModal
              handleCashPaymentTransaction={handleCashPaymentTransaction}
              setIsDemandCreationSuccessfull={setIsDemandCreationSuccessfull}
              isDemandCreationSuccessfull={isDemandCreationSuccessfull}
              message={`Demand generated successfully for property no. ${propertyDetails[0].property_no}. Do uou really want to proceed? If Yes then click 'Pay Property Tax' button or else click X button.`}
            /> : null
        }
        {
          isDemandCreationSuccessfull == false ? <PropertyPaymentConfirmationModal
            handleCashPaymentTransaction={null}
            setIsDemandCreationSuccessfull={setIsDemandCreationSuccessfull}
            isDemandCreationSuccessfull={isDemandCreationSuccessfull}
            message={`Demand generation failed for property no. ${propertyDetails[0]?.property_no}. Please try again.`}
          /> : null
        }
        <div className="px-0 pt-6 pb-4 m-4 bg-white rounded-none mt-4 lg:max-w-full">

          <div className="container py-2 px-10 mx-0 min-w-full flex flex-col items-center">
            {
              isPaymentTransactionDetailsValid == false ? (
                <p className='contents text-red-600 text-sm font-bold'>
                  {`Please fill all payment transaction related details before proceeding to pay property tax.`}
                </p>
              ) : null
            }
            <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">

              {/* <button className="w-48 h-8 px-4 py-1 mx-4 my-2 tracking-wide text-white text-xs font-semibold transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-indigo-600">
                Update Property Details
              </button> */}
              {/* <button className="w-48 h-8 px-4 py-1 mx-4 my-2 tracking-wide text-white text-xs font-semibold transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-indigo-600">
                Payment Hide
              </button> */}
              <button onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
                className="w-48 h-8 px-0 py-0 mx-4 my-0 tracking-wide text-white text-sm font-semibold transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                Back
              </button>
              <button onClick={handleDemandEntry} disabled={(isDemandCreationSuccessfull == 'loading') ||
                !(demandDetailsForDemandEntry?.length > 0) || isBlankString(paymentModeObj)
                || !isPaymentTransactionDetailsValid}
                className={`w-48 h-8 px-4 py-1 mx-4 my-2 tracking-wide text-white text-sm 
                ${((isDemandCreationSuccessfull == 'loading') ||
                    !(demandDetailsForDemandEntry?.length > 0)
                    || isBlankString(paymentModeObj) || !isPaymentTransactionDetailsValid) ? `cursor-not-allowed` : ``}
                font-semibold transition-colors duration-200 transform bg-green-400 rounded-md 
                hover:bg-green-700 focus:outline-none focus:bg-indigo-600`}>
                {/* {
                  isDemandCreationSuccessfull == 'loading' ? 
                  (<svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                </svg>) : null
                } */}
                Pay Property Tax
              </button>

              {/* <button onClick={() => switchOnNextModalNOffCurrModal(currModal, nextModal)}
                className="w-48 h-8 px-4 py-1 mx-4 my-2 tracking-wide text-white text-xs transition-colors font-semibold  duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-indigo-600">
                View Property Documents
              </button> */}
            </div>
          </div>


        </div>

      </div>


    </div>

  </div>) : null
}

export default PropertyDetails