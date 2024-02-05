import { reasons } from '@/Dashboard/data/bank-reconciliation-reasons'
import { getCookieByName } from '@/utils/RequireAuth'
import { FILE_NAME_INVALID, FILE_NAME_VALID, SOMETHING_WENT_WRONG, SUDA_TOKEN, SUDA_USER_ID, TRANSACTION_DEACTIVATION_SUCCESSFUL } from '@/utils/appConstants'
import { ColorRingCustom, NotFoundErrorMessageCustom, SuccessMessageCustom } from '@/utils/commonComponents'
import { convertDateToAPIFormat, convertStringToLowerCaseNTrim, countWords, validateFilename } from '@/utils/commonUtils'
import FloatingMessage from '@/utils/floatingMessage'
import { isBlankString } from '@/utils/formValidatorUtils'
import { Button, Tooltip } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

function ViewOrDeleteTransaction({
  showModal, currModal, paymentDetails, switchOnPrevModalNOffCurrModal
}) {
  const [transactionDeactivateDetails, setTransactionDeactivateDetails] = useState({
    approval_letter: "",
    prop_id: "",
    reason: "",
    stampdate: "",
    transaction_id: "",
    user_id: "",
    ward_id: "",
    ward_count_reason: 0,
  })
  const [isFileNameValid, setIsFileNameValid] = useState(null)
  const [isTransactionDeactivateDetailsValid, setIsTransactionDeactivateDetailsValid] = useState(null)
  const [isDeactivationInprogress, setIsDeactivationInprogress] = useState(null)
  const [isDeactivationSuccessful, setIsDeactivationSuccessful] = useState(null)
  const [blockFurtherUpdate, setBlockFurtherUpdate] = useState(null)

  const handleTransactionDeactivateDetailsChange = (event) => {
    const eventId = event?.target?.id
    const eventVal = event?.target?.value
    // console.log(eventId)
    //console.log(event?.target?.files[0])
    // console.log(event?.target?.value)
    if (eventId == 'approval_letter') {
      const isValid = validateFilename(eventVal)
     // console.log(isValid)
      if (isValid == true) {
        setTransactionDeactivateDetails((prevState) => {
         // console.log("inside setTransactionDeactivateDetails")
          //console.log(prevState)
          return { ...prevState, [eventId]: event.target.files[0] }
        })
        setIsFileNameValid(isValid)
      } else {
        setIsFileNameValid(isValid)
      }
    } else {
      if (eventId == 'reason') {
        //let word_count = (eventVal + '').trim().replace(/ +/g, ' ').replace(/^a-zA-Z0-9 ]/g, '').split(' ').length;
        let word_count = countWords(eventVal + "")
        setTransactionDeactivateDetails(prevState => {
          return { ...prevState, [eventId]: eventVal, ward_count_reason: word_count }
        })
      }
    }
  }

  const handleTransactionDeactivation = async () => {
    // console.log(transactionDeactivateDetails)
    console.log(paymentDetails)
    setIsDeactivationInprogress(true)
    try {
      const { reason, approval_letter } = transactionDeactivateDetails
      const { transaction_no, ward_name, property_no, id, prop_id } = paymentDetails[0]
      let formData = new FormData()
      formData.append('approval_letter', approval_letter)
      const url = `${SUDA_API_BASE_URL}/user/transactionDeactivate?prop_id=${prop_id}&reason=${reason}&stampdate=${convertDateToAPIFormat(new Date())}&transaction_id=${id}&user_id=${getCookieByName(SUDA_USER_ID)}&ward_id=${ward_name}`
      const requestOptions = {
        method: "PUT",
        headers: { 'Authorization': `Bearer ${getCookieByName(SUDA_TOKEN)}` },
        body: formData,
      }
      //console.log(url)
      let response = null, responseBody = null;
      response = await fetch(url, requestOptions)
     // responseBody = await response.json()
      if (response?.status == '200') {
        console.log("deactivation success")
        setIsDeactivationSuccessful(true)
        setBlockFurtherUpdate(true)
      } else {
        setIsDeactivationSuccessful(false)
      }
    } catch (err) {
      console.error(err)
      setIsDeactivationSuccessful(false)
    } finally {
      setIsDeactivationInprogress(false)
    }
  }

  const handleCloseFloatingMessage = () => {
    setIsDeactivationSuccessful(null)
  }

  useEffect(() => {
    if (transactionDeactivateDetails != null) {
      let isValid = true
      const { approval_letter, ward_count_reason } = transactionDeactivateDetails
      isValid = !isBlankString(approval_letter) && (ward_count_reason >= 100)
      setIsTransactionDeactivateDetailsValid(isValid)
    }
  }, [transactionDeactivateDetails])

  return showModal == true ? (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-5 mb-10">
      <form className="mt-4">
        <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md overflow-hiddelg:max-w-full">
          <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-700 rounded-md h-10">
            <h2 className="text-sm font-semibold text-center text-white">
              Owner Details
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
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                          Property No.
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                          {paymentDetails[0]?.property_no}
                        </td>
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                          Ward No.
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                          {paymentDetails[0]?.ward_name}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                          Owner Name
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          {paymentDetails[0]?.owner_name}
                        </td>
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                          Address
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal ">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                          {paymentDetails[0]?.owner_address}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md min-h-screen overflow-hiddelg:max-w-full">
          <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-700 rounded-md h-10">
            <h2 className="text-sm font-semibold text-center text-white">
              Details Of Transaction No: {paymentDetails[0]?.transaction_no}
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
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                          Transaction No.
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                          {paymentDetails[0]?.transaction_no}
                        </td>
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                          Transaction Date
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                          {paymentDetails[0]?.transaction_date}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                          Transaction Paid Amount
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-green-700 font-bold whitespace-normal ">
                          {paymentDetails[0]?.payable_amt}
                        </td>
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                          Payment Mode
                        </td>
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">:
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 uppercase whitespace-normal">
                          {paymentDetails[0]?.payment_mode}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                          Transaction By
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          {paymentDetails[0]?.transaction_by}
                        </td>
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                          Transaction Mode
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          {paymentDetails[0]?.transaction_mode}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                          Bank Name
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal ">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          {paymentDetails[0]?.bank_name}
                        </td>
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                          Branch Name
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          {paymentDetails[0]?.branch_name}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 ">
                          Cheque No
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          {
                            convertStringToLowerCaseNTrim(paymentDetails[0]?.payment_mode) == 'cheque' ? (
                              paymentDetails[0]?.cheque_no
                            ) : 'N/A'
                          }
                        </td>
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 ">
                          Cheque Date
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          {
                            convertStringToLowerCaseNTrim(paymentDetails[0]?.payment_mode) == 'cheque' ? (
                              paymentDetails[0]?.cheque_dt
                            ) : 'N/A'
                          }
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 ">
                          DD No.
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          {
                            convertStringToLowerCaseNTrim(paymentDetails[0]?.payment_mode) == 'dd' ? (
                              paymentDetails[0]?.cheque_no
                            ) : 'N/A'
                          }
                        </td>
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 ">
                          DD Date.
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                          {
                            convertStringToLowerCaseNTrim(paymentDetails[0]?.payment_mode) == 'dd' ? (
                              paymentDetails[0]?.cheque_dt
                            ) : 'N/A'
                          }
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 ">
                          Card Type
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          {
                            convertStringToLowerCaseNTrim(paymentDetails[0]?.payment_mode) == 'card' ? (
                              paymentDetails[0]?.card_type
                            ) : 'N/A'
                          }
                        </td>
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 ">
                          APPR Code
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">

                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 ">
                          Card No.(last 4 Digits)
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          {
                            convertStringToLowerCaseNTrim(paymentDetails[0]?.payment_mode) == 'card' ? (
                              paymentDetails[0]?.card_no
                            ) : 'N/A'
                          }
                        </td>
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 ">
                          Card Holder Name
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                          {
                            convertStringToLowerCaseNTrim(paymentDetails[0]?.payment_mode) == 'card' ? (
                              paymentDetails[0]?.card_holder_name
                            ) : 'N/A'
                          }
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 ">
                          NEFT No.
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          {
                            convertStringToLowerCaseNTrim(paymentDetails[0]?.payment_mode) == 'neft' ? (
                              paymentDetails[0]?.cheque_no
                            ) : 'N/A'
                          }
                        </td>
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 ">
                          NEFT Date.
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                          {
                            convertStringToLowerCaseNTrim(paymentDetails[0]?.payment_mode) == 'neft' ? (
                              paymentDetails[0]?.cheque_dt
                            ) : 'N/A'
                          }
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 ">
                          RTGS No.
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          {
                            convertStringToLowerCaseNTrim(paymentDetails[0]?.payment_mode) == 'rtgs' ? (
                              paymentDetails[0]?.cheque_no
                            ) : 'N/A'
                          }
                        </td>
                        <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 ">
                          RTGS Date.
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                          :
                        </td>
                        <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                          {
                            convertStringToLowerCaseNTrim(paymentDetails[0]?.payment_mode) == 'rtgs' ? (
                              paymentDetails[0]?.cheque_dt
                            ) : 'N/A'
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4">
                    <div className="flex justify-center">
                      <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                                ${isFileNameValid == false ? `` : `hidden`}`}
                        placement='top'
                        content={`${FILE_NAME_INVALID}`}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }} >
                        <div className="mb-4 ml-3 mt-2 lg:w-96  gap-4">
                          <label htmlFor="formFile" className="form-label inline-block mb-0 text-xs font-bold text-gray-900">
                            Property Documents ( .jpg, .png, .jpeg, .pdf)
                            <p className='contents text-red-600 text-sm font-bold'>*</p>
                          </label>
                          <input
                            onChange={handleTransactionDeactivateDetailsChange}
                            // value={transactionDeactivateDetails.approval_letter}
                            className="text-xs  form-control
                                    block
                                    w-full
                                    px-3
                                    py-2
                                    font-normal
                                    text-gray-900
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-400
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none" type="file"
                            id="approval_letter" />
                        </div>
                      </Tooltip>

                      {/* {
                        isFileNameValid == false ? (
                          <NotFoundErrorMessageCustom
                            message={FILE_NAME_INVALID}
                            text_size={`sm`} />
                        ) : null
                      } */}
                      
                    </div>
                    {
                        isFileNameValid == true ? (
                          <SuccessMessageCustom
                            message={FILE_NAME_VALID}
                            text_size={`sm`} />
                        ) : null
                      }
                    {/* <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit gap-4 ">
                      <Button
                        id='floor_files_btn'
                        color="green" type='button'
                        className='h-6 w-16 px-2 py-1 bg-green-700 rounded custom_button_add'>Upload</Button>
                    </div> */}
                  </div>
                  <div className="mb-0 ml-3 mt-2 min-w-fit max-w-fit">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                      Justification(Min 100 Words)<p className='contents text-red-600 text-sm font-bold'>*</p>
                    </label>
                    <textarea
                      onChange={handleTransactionDeactivateDetailsChange}
                      className="bg-white-200 appearance-none border border-gray-500 rounded w-full h-10 py-2 px-4 text-white-700 
                      leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                      id="reason"
                      name="reason" rows="10" cols="50"></textarea>
                    <p className='contents text-green-700 text-xs font-bold'>Word(s): {transactionDeactivateDetails.ward_count_reason}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {
            isDeactivationInprogress == true ? (
              <ColorRingCustom />
            ) : null
          }
          {
            isDeactivationSuccessful == true ? (
              <FloatingMessage
                message={`${TRANSACTION_DEACTIVATION_SUCCESSFUL}`}
                showMessage={true}
                closeFloatingMessage={handleCloseFloatingMessage}
                color={`green`} />
            ) : null
          }
          {
            isDeactivationSuccessful == false ? (
              <FloatingMessage
                message={`${SOMETHING_WENT_WRONG}`}
                showMessage={true}
                closeFloatingMessage={handleCloseFloatingMessage}
                color={`red`} />
            ) : null
          }
          <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-10 lg:max-w-full">
            <div className="container py-2 px-10 mx-0 min-w-full flex flex-col items-center">
              <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                {
                  blockFurtherUpdate != true ? (
                    <button
                      type='button'
                      onClick={handleTransactionDeactivation}
                      disabled={!isTransactionDeactivateDetailsValid}
                      className={`w-36 h-10 px-0 py-0 mx-4 my-0 tracking-wide text-white text-sm 
                      font-semibold transition-colors duration-200 transform bg-red-500 rounded-md 
                      hover:bg-red-700 focus:outline-none focus:bg-blue-400
                      ${!isTransactionDeactivateDetailsValid ? 'cursor-not-allowed' : ''}`}>
                      Deactivate Transaction
                    </button>
                  ) : null
                }

              </div>
            </div>

          </div>

        </div>


      </form>


    </div>
  ) : null
}

export default ViewOrDeleteTransaction