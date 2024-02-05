import { useMaterialTailwindController } from '@/Dashboard/context';
import { convertDateToAPIFormat, convertStringToLowerCaseNTrim } from '@/utils/commonUtils';
import React, { useEffect, useState } from 'react'
import { Option, Select } from '@material-tailwind/react'
import { isBlankString } from '@/utils/formValidatorUtils';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import { CHEQUE_DATE, CHEQUE_NO, DD_DATE, DD_NO, NEFT_DATE, NEFT_NO, PAYMENT_DETAILS_UPDATE_SUCCESS, RTGS_DATE, RTGS_NO } from '@/utils/appConstants';
import { getCookieByName } from '@/utils/RequireAuth';
import { ColorRingCustom } from '@/utils/commonComponents';
import FloatingMessage from '@/utils/floatingMessage';

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

function ViewOrEditPaymentMode({
  showModal, currModal, paymentDetails, switchOnPrevModalNOffCurrModal,
}) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { paymentModeDetailsInputFromAPI } = controller;

  const [paymentUpdateDetails, setPaymentUpdateDetails] = useState({
    bank_name: "",
    others_bank_name: "",
    branch_name: "",
    card_holder_name: "",
    card_no: "",
    card_type: "",
    cheque_dt: "",
    cheque_no: "",
    id: 0,
    owner_address: "",
    owner_name: "",
    payable_amt: "",
    payment_mode: "",
    property_no: "",
    transaction_by: "",
    transaction_date: "",
    transaction_mode: "",
    transaction_no: "",
    ward_name: ""
  })
  const [dateObjectsToDisplay, setDateObjectsToDisplay] = useState({
    cheque_dt: "",
  })
  const [isPaymentUpdateDetailsValid, setIsPaymentUpdateDetailsValid] = useState(null)
  const [isPaymentUpdateInProgress, setIsPaymentUpdateInProgress] = useState(null)
  const [isPaymentUpdateSuccessFul, setIsPaymentUpdateSuccessful] = useState(null)

  const handlePaymentUpdateDetailsChange = (event, id) => {
    const eventId = event?.target?.id;
    const eventStr = event + ""
    const eventVal = event?.target?.value

    if (eventId) {
      if (eventId == 'payment_mode') {
        const eventObj = JSON.parse(eventVal)
        // console.log("inside payment_mode change")
        // console.log(eventVal)
        setPaymentUpdateDetails(prevState => {
          // console.log("inside of setState: prevState : ")
          // console.log(prevState)
          // console.log(convertStringToLowerCaseNTrim(eventObj.payment_mode))
          const new_bank_name = convertStringToLowerCaseNTrim(eventObj.mode_of_payment) == 'cash' ? '' : prevState.bank_name
          const new_branch_name = convertStringToLowerCaseNTrim(eventObj.mode_of_payment) == 'cash' ? '' : prevState.branch_name
          return {
            ...prevState,
            [eventId]: eventObj.mode_of_payment,
            transaction_mode: eventObj.mode_of_payment,
            transaction_date: "",
            cheque_dt: "",
            cheque_no: "",
            card_holder_name: "",
            card_no: "",
            card_type: "",
            bank_name: new_bank_name,
            branch_name: new_branch_name,
          }
        })
        setDateObjectsToDisplay(prevState => {
          return {
            ...prevState, cheque_dt: "",
          }
        })
      } else {
        setPaymentUpdateDetails(prevState => {
          return { ...prevState, [eventId]: eventVal, }
        })
      }
    } else if (eventStr.includes('bank_name')) {
      const eventObj = JSON.parse(event)
      setPaymentUpdateDetails(prevState => {
        return { ...prevState, bank_name: eventObj.bank_name }
      })
    } else if (id == 'cheque_dt') {
      setPaymentUpdateDetails(prevState => {
        return { ...prevState, [id]: convertDateToAPIFormat(event.$d), transaction_date: convertDateToAPIFormat(event.$d), }
      })
      setDateObjectsToDisplay(prevState => {
        return { ...prevState, [id]: event }
      })
    } else if (eventStr.includes("card_type")) {
      setPaymentUpdateDetails(prevState => {
        const card_type = eventStr.split('_')[2]
        return { ...prevState, card_type: card_type }
      })
    }

  }

  useEffect(() => {
    if (paymentUpdateDetails != null) {
      const { bank_name, branch_name, cheque_no, cheque_dt, card_holder_name,
        card_no, card_type, others_bank_name } = paymentUpdateDetails
      const actual_bank_name = convertStringToLowerCaseNTrim(bank_name) == 'others' ? others_bank_name : bank_name
      let isValid = false
      if (convertStringToLowerCaseNTrim(paymentUpdateDetails.payment_mode) == 'cash') {
        isValid = true;
      } else if (convertStringToLowerCaseNTrim(paymentUpdateDetails.payment_mode) == 'card') {
        isValid = !isBlankString(actual_bank_name) && !isBlankString(card_holder_name) &&
          !isBlankString(card_no) && !isBlankString(card_type)
      } else {
        isValid = !isBlankString(actual_bank_name) && !isBlankString(cheque_no) &&
          !isBlankString(cheque_dt) && !isBlankString(branch_name)
      }
      setIsPaymentUpdateDetailsValid(isValid)
    }
  }, [paymentUpdateDetails])

  const handlePaymentDetailsUpdate = async () => {
    setIsPaymentUpdateInProgress(true)
    try {
      const requestBody = {
        ...paymentUpdateDetails,
        id: paymentDetails[0].id,
        owner_name: paymentDetails[0].owner_name,
        owner_address: paymentDetails[0].owner_address,
        payable_amt: paymentDetails[0].payable_amt,
        property_no: paymentDetails[0].property_no,
        transaction_by: paymentDetails[0].transaction_by,
        transaction_no: paymentDetails[0].transaction_no,
        ward_name: paymentDetails[0].ward_name,
      }
      delete requestBody.others_bank_name
      //console.log("[handlePaymentDetailsUpdate] requestBody : ")
      //console.log(requestBody)
      const url = `${SUDA_API_BASE_URL}/user/transactionModeUpdate`
      const requestOptions = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
        body: JSON.stringify(requestBody)
      }
      let response = null, responseBody = null
      // throw new Error('testing request body')
      response = await fetch(url, requestOptions)
      // responseBody = await response.json()
      if (response?.status == '200') {
        setIsPaymentUpdateSuccessful(true)
      } else {
        setIsPaymentUpdateSuccessful(false)
      }
    } catch (err) {
      console.error(err)
      setIsPaymentUpdateSuccessful(false)
    } finally {
      setIsPaymentUpdateInProgress(false)
    }
  }

  const handleCloseFloatingMessage = () => {
    setIsPaymentUpdateSuccessful(null)
  }

  return showModal == true ? (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-5 mb-10">
      <form className="mt-4">
        <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md min-h-screen overflow-hidde lg:max-w-full">
          <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-700 rounded-md h-10">
            <h2 className="text-sm font-semibold text-center text-white">
              Details Of Transaction No: {paymentDetails[0].transaction_no}
            </h2>
          </nav>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="p-2.5 lg:w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">

                    </thead>

                    <tbody>
                      {
                        paymentDetails?.length > 0 ? (
                          paymentDetails?.map((item, index) => {
                            return (
                              <>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                                    Property No.
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                                    {item?.property_no}
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                                    Ward No.
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                                    {item?.ward_name}
                                  </td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                                    Owner Name
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    {item?.owner_name}
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                                    Address
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900 ">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                                    {item?.owner_address}
                                  </td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                                    Transaction No.
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                                    {item?.transaction_no}
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                                    Transaction Date
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                                    {item?.transaction_date}
                                  </td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                                    Transaction Amount
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                                    {item?.payable_amt}
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                                    Payment Mode
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-2 py-2 text-xs font-bold font-semibold uppercase text-green-700">
                                    <div className="mb-4 ml-3 mr-2 mt-2 min-w-fit max-w-fit">
                                      <select
                                        onChange={
                                          handlePaymentUpdateDetailsChange
                                        }
                                        //value={}
                                        id="payment_mode"
                                        color='orange'
                                        className="fold-bold w-full rounded-md border border-blue-gray-200 bg-white p-2 text-xs text-gray-900 shadow-sm outline-none focus:border-orange-500 "
                                      >
                                        {paymentModeDetailsInputFromAPI?.length >
                                        0 ? (
                                          paymentModeDetailsInputFromAPI[0]
                                            .modeOfPaymentBeans?.length > 0 ? (
                                            paymentModeDetailsInputFromAPI[0].modeOfPaymentBeans.map(
                                              (item1) => {
                                                const {
                                                  id,
                                                  mode_of_payment,
                                                  status,
                                                } = item1;
                                                let isSelected = false;
                                                if (
                                                  (mode_of_payment + "")
                                                    .trim()
                                                    .toLowerCase() ==
                                                  (item?.payment_mode + "")
                                                    .trim()
                                                    .toLowerCase()
                                                ) {
                                                  isSelected = true;
                                                }
                                                return (
                                                  <option
                                                    value={JSON.stringify(
                                                      item1
                                                    )}
                                                    selected={isSelected}
                                                  >
                                                    {mode_of_payment}
                                                  </option>
                                                );
                                              }
                                            )
                                          ) : (
                                            <option value="">Loading...</option>
                                          )
                                        ) : (
                                          <option value="">Loading...</option>
                                        )}
                                      </select>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                                    Transaction By
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    {item?.transaction_by}
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                                    Transaction Mode
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    {item?.payment_mode}
                                  </td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                                    Bank Name
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900 ">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    {(item?.payment_mode + "")
                                      .trim()
                                      .toLowerCase() == "cash"
                                      ? "N/A"
                                      : item?.bank_name}
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                                    Branch Name
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    {(item?.payment_mode + "")
                                      .trim()
                                      .toLowerCase() == "cash"
                                      ? "N/A"
                                      : item?.branch_name}
                                  </td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="px-4 py-2 text-xs font-medium font-semibold text-gray-900 ">
                                    Cheque No
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    {(item?.payment_mode + "")
                                      .trim()
                                      .toLowerCase() == "cheque"
                                      ? item?.cheque_no
                                      : "N/A"}
                                  </td>
                                  <td className="px-4 py-2 text-xs font-medium font-semibold text-gray-900 ">
                                    Cheque Date
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    {(item?.payment_mode + "")
                                      .trim()
                                      .toLowerCase() == "cheque"
                                      ? item?.cheque_dt
                                      : "N/A"}
                                  </td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="px-4 py-2 text-xs font-medium font-semibold text-gray-900 ">
                                    DD No.
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    {(item?.payment_mode + "")
                                      .trim()
                                      .toLowerCase() == "dd"
                                      ? item?.cheque_no
                                      : "N/A"}
                                  </td>
                                  <td className="px-4 py-2 text-xs font-medium font-semibold text-gray-900 ">
                                    DD Date.
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                                    {(item?.payment_mode + "")
                                      .trim()
                                      .toLowerCase() == "dd"
                                      ? item?.cheque_dt
                                      : "N/A"}
                                  </td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="px-4 py-2 text-xs font-medium font-semibold text-gray-900 ">
                                    Card Type
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    {(item?.payment_mode + "")
                                      .trim()
                                      .toLowerCase() == "card"
                                      ? item?.card_type
                                      : "N/A"}
                                  </td>
                                  <td className="px-4 py-2 text-xs font-medium font-semibold text-gray-900 ">
                                    APPR Code
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                                    ''
                                  </td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="px-4 py-2 text-xs font-medium font-semibold text-gray-900 ">
                                    Card No.(last 4 Digits)
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    {(item?.payment_mode + "")
                                      .trim()
                                      .toLowerCase() == "card"
                                      ? item?.card_no
                                      : "N/A"}
                                  </td>
                                  <td className="px-4 py-2 text-xs font-medium font-semibold text-gray-900 ">
                                    Card Holder Name
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                                    {(item?.payment_mode + "")
                                      .trim()
                                      .toLowerCase() == "card"
                                      ? item?.card_holder_name
                                      : "N/A"}
                                  </td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="px-4 py-2 text-xs font-medium font-semibold text-gray-900 ">
                                    NEFT No.
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    {(item?.payment_mode + "")
                                      .trim()
                                      .toLowerCase() == "neft"
                                      ? item?.cheque_no
                                      : "N/A"}
                                  </td>
                                  <td className="px-4 py-2 text-xs font-medium font-semibold text-gray-900 ">
                                    NEFT Date.
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                                    {(item?.payment_mode + "")
                                      .trim()
                                      .toLowerCase() == "neft"
                                      ? item?.cheque_dt
                                      : "N/A"}
                                  </td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="px-4 py-2 text-xs font-medium font-semibold text-gray-900 ">
                                    RTGS No.
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    {(item?.payment_mode + "")
                                      .trim()
                                      .toLowerCase() == "rtgs"
                                      ? item?.cheque_no
                                      : "N/A"}
                                  </td>
                                  <td className="px-4 py-2 text-xs font-medium font-semibold text-gray-900 ">
                                    RTGS Date.
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                    :
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                                    {(item?.payment_mode + "")
                                      .trim()
                                      .toLowerCase() == "rtgs"
                                      ? item?.cheque_dt
                                      : "N/A"}
                                  </td>
                                </tr>
                              </>
                            );
                          })
                        ) : null
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {
            convertStringToLowerCaseNTrim(paymentDetails[0].payment_mode) !=
              convertStringToLowerCaseNTrim(paymentUpdateDetails.payment_mode) &&
              !isBlankString(paymentUpdateDetails.payment_mode) &&
              convertStringToLowerCaseNTrim(paymentUpdateDetails.payment_mode) != 'cash' ? (
              <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md lg:max-w-full">
                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-md h-10">
                  <h2 className="text-sm font-semibold text-center text-white">
                    Enter New Payment Mode Details
                  </h2>
                </nav>
                {/* <div className="mb-0 ml-3 mt-2 min-w-fit max-w-fit">
                  <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                    Narration
                  </label>
                  <textarea
                    value={paymentTransactionDetails?.narration}
                    className="bg-white-200 appearance-none border border-gray-500 rounded w-64 h-10 py-2 px-4 text-white-700 
                  leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                    id="narration"
                    name="narration" rows="4" cols="20"></textarea>
                </div> */}

                {
                  convertStringToLowerCaseNTrim(paymentUpdateDetails.payment_mode) != 'cash' ? (
                    <>
                      <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                          Bank Name<p className='contents text-red-600 text-xs font-bold'>*</p>
                        </label>
                        <Select onChange={handlePaymentUpdateDetailsChange}
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
                        convertStringToLowerCaseNTrim(paymentUpdateDetails.bank_name) == "others" ? (
                          <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                              Please mention other bank name<p className='contents text-red-600 text-sm font-bold'>*</p>
                            </label>
                            <input onChange={handlePaymentUpdateDetailsChange}
                              value={paymentUpdateDetails.others_bank_name}
                              className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                              id="others_bank_name" type="text" placeholder="Branch" />
                          </div>
                        ) : null
                      }
                      <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                          Branch<p className='contents text-red-600 text-sm font-bold'> * </p>
                          <p className='contents text-red-600 text-xs font-bold whitespace-normal'>
                            Please leave empty if branch name is not applicable for selected payment mode.
                          </p>
                        </label>
                        <input onChange={handlePaymentUpdateDetailsChange}
                          value={paymentUpdateDetails.branch_name}
                          className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                          id="branch_name" type="text" placeholder="Branch" />
                      </div>
                    </>
                  ) : null
                }

                {
                  convertStringToLowerCaseNTrim(paymentUpdateDetails.payment_mode) == 'cheque' ||
                    convertStringToLowerCaseNTrim(paymentUpdateDetails.payment_mode) == 'dd' ||
                    convertStringToLowerCaseNTrim(paymentUpdateDetails.payment_mode) == 'rtgs' ||
                    convertStringToLowerCaseNTrim(paymentUpdateDetails.payment_mode) == 'neft' ?
                    (
                      <>
                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                          <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Cheque No.">
                            {
                              convertStringToLowerCaseNTrim(paymentUpdateDetails.payment_mode) == 'cheque' ? CHEQUE_NO : ""
                            }
                            {
                              convertStringToLowerCaseNTrim(paymentUpdateDetails.payment_mode) == 'dd' ? DD_NO : ""
                            }
                            {
                              convertStringToLowerCaseNTrim(paymentUpdateDetails.payment_mode) == 'rtgs' ? RTGS_NO : ""
                            }
                            {
                              convertStringToLowerCaseNTrim(paymentUpdateDetails.payment_mode) == 'neft' ? NEFT_NO : ""
                            }
                            <p className='contents text-red-600 text-sm font-bold'>*</p>
                          </label>
                          <input onChange={handlePaymentUpdateDetailsChange}
                            value={paymentUpdateDetails.cheque_no}
                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                            id="cheque_no" type="text" placeholder="Cheque No." />
                        </div>
                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                          <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                            {
                              convertStringToLowerCaseNTrim(paymentUpdateDetails.payment_mode) == 'cheque' ? CHEQUE_DATE : ""
                            }
                            {
                              convertStringToLowerCaseNTrim(paymentUpdateDetails.payment_mode) == 'dd' ? DD_DATE : ""
                            }
                            {
                              convertStringToLowerCaseNTrim(paymentUpdateDetails.payment_mode) == 'rtgs' ? RTGS_DATE : ""
                            }
                            {
                              convertStringToLowerCaseNTrim(paymentUpdateDetails.payment_mode) == 'neft' ? NEFT_DATE : ""
                            }
                            <p className='contents text-red-600 text-sm font-bold'>*</p>
                          </label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                              <DesktopDatePicker
                                // label="Date desktop"
                                id="cheque_dt"
                                color='orange'
                                onChange={(e) => handlePaymentUpdateDetailsChange(e, "cheque_dt")}
                                inputFormat="MM/DD/YYYY"
                                renderInput={(params) => <TextField {...params} />}
                                value={dateObjectsToDisplay.cheque_dt}
                              />
                            </Stack>
                          </LocalizationProvider>
                        </div>
                      </>
                    ) : null
                }

                {
                  convertStringToLowerCaseNTrim(paymentUpdateDetails.payment_mode) == 'card' ?
                    (
                      <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md lg:max-w-full">
                        <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-md h-10">
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
                              onChange={handlePaymentUpdateDetailsChange}
                              label="select" color='orange' className="pl-2 pr-3 py-2 sm:w-full lg:w-72 font-bold text-xs text-gray-900">
                              <Option value='card_type_credit' >Credit</Option>
                              <Option value='card_type_debit' >Debit</Option>
                            </Select>
                          </div>
                          {/* <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Transaction ID">
                              Transaction ID<p className='contents text-red-600 text-sm font-bold'>*</p>
                            </label>
                            <input onChange={handlePaymentTransactionDetailsChange}
                              value={paymentTransactionDetails.transaction_id}
                              className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                              focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                              id="transaction_id" type="text" placeholder="Transaction ID" />
                          </div> */}
                        </div>
                        <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                          {/* <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="APPR Code">
                              APPR Code<p className='contents text-red-600 text-sm font-bold'>*</p>
                            </label>
                            <input onChange={handlePaymentTransactionDetailsChange}
                              value={paymentTransactionDetails.appr_code}
                              className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                              focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                              id="appr_code" type="text" placeholder="APPR Code" />
                          </div> */}
                          <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Card No.">
                              Card No.(Last 4 Digits)<p className='contents text-red-600 text-sm font-bold'>*</p>
                            </label>
                            <input value={paymentUpdateDetails.card_no}
                              onChange={handlePaymentUpdateDetailsChange}
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
                            <input value={paymentUpdateDetails.card_holder_name}
                              onChange={handlePaymentUpdateDetailsChange}
                              className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                              focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                              id="card_holder_name" type="text" placeholder="Card Holder Name." />
                          </div>
                        </div>
                      </div>
                    ) : null
                }

                {
                  isPaymentUpdateInProgress == true ? (
                    <ColorRingCustom />
                  ) : null
                }

                <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 lg:max-w-full">
                  <div className="container py-2 px-10 mx-0 min-w-full flex flex-col items-center">
                    <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                      <button
                        disabled={!isPaymentUpdateDetailsValid}
                        onClick={handlePaymentDetailsUpdate}
                        type='button'
                        className={`w-36 h-8 px-0 py-0 mx-4 my-0 tracking-wide text-white text-sm 
                        font-semibold transition-colors duration-200 transform bg-green-400 rounded-md 
                        hover:bg-green-700 focus:outline-none focus:bg-green-400
                        ${!isPaymentUpdateDetailsValid ? `cursor-not-allowed` : ``}`}>
                        Update
                      </button>
                      {/* <button
                  className="w-36 h-8 px-0 py-0 mx-4 my-0 tracking-wide text-white text-sm font-semibold transition-colors duration-200 transform bg-blue-400 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-400">
                  Cancel
                  </button> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          }

          {
            isPaymentUpdateSuccessFul == true ? (
              <FloatingMessage
                message={PAYMENT_DETAILS_UPDATE_SUCCESS}
                showMessage={true}
                closeFloatingMessage={handleCloseFloatingMessage}
                color={`green`} />
            ) : null
          }
          {
            isPaymentUpdateSuccessFul == false ? (
              <FloatingMessage
                message={PAYMENT_DETAILS_UPDATE_SUCCESS}
                showMessage={true}
                closeFloatingMessage={handleCloseFloatingMessage}
                color={`red`} />
            ) : null
          }

          {
            convertStringToLowerCaseNTrim(paymentUpdateDetails.payment_mode) == 'cash' ?
              (
                <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 lg:max-w-full">
                  <div className="container py-2 px-10 mx-0 min-w-full flex flex-col items-center">
                    <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                      <button
                        disabled={!isPaymentUpdateDetailsValid}
                        onClick={handlePaymentDetailsUpdate}
                        type='button'
                        className={`w-36 h-8 px-0 py-0 mx-4 my-0 tracking-wide text-white text-sm 
                        font-semibold transition-colors duration-200 transform bg-green-400 rounded-md 
                        hover:bg-green-700 focus:outline-none focus:bg-green-400
                        ${!isPaymentUpdateDetailsValid ? `cursor-not-allowed` : ``}`}>
                        Update
                      </button>
                      {/* <button
                  className="w-36 h-8 px-0 py-0 mx-4 my-0 tracking-wide text-white text-sm font-semibold transition-colors duration-200 transform bg-blue-400 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-400">
                  Cancel
                  </button> */}
                    </div>
                  </div>
                </div>
              ) : null
          }


        </div>


      </form>


    </div>

  ) : null
}

export default ViewOrEditPaymentMode