import { Button } from '@material-tailwind/react'
import React, { Component, useCallback, useEffect, useRef, useState } from 'react'


const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL
export function Saf_form_otp(props) {
  const { switchOnNextModalNOffCurrModal, nextModal, currModal, showSAFOtpForm } = props
  const inputRef1 = useRef()
  const inputRef2 = useRef()
  const inputRef3 = useRef()
  const inputRef4 = useRef()

  const [OTPObject, setOTPObject] = useState({
    showOTPModal: false,
    showOTPCountdownMsg: false,
    message: "OTP has been sent to your registered mobile number. You can request for another OTP in : ",
  })

  const [otpValueObj, setOTPValuePbj] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
  })

  const [otpVerifyMsg, setOtpVerifyMsg] = useState(null)
  const [otpFromAPI, setOtpFromAPI] = useState("")
  const [isOtpValid, setIsOTPValid] = useState("null")

  const [mobileNum, setMobileNum] = useState("")
  const [mobileNumValidationErrorMsg, setMobileNumValidationErrorMsg] = useState(null)
  const [mobileNumSubmitDisabled, setMobileNumSubmitDisabled] = useState(true)
  const [otpTimer, setOTPTimer] = useState(30) //otp cooldown timer
  const timeOutCallback = useCallback(() => setOTPTimer(currTimer => currTimer - 1), [])

  let handleOTPChange = async () => {
    setOTPObject((prevState) => ({
      ...prevState,
      showOTPModal: true,
      showOTPCountdownMsg: true,
      isOTPSentOnce: false,
    }))
    // intervalObj = setInterval(() => {
    //   setOTPTimer((prevTimer) => prevTimer - 1 )
    // }, 1000)
    setMobileNumSubmitDisabled(true)

    const url = `${SUDA_API_BASE_URL}/getUserOTP/${mobileNum}`
    let response = null
    let responseBody = null
    try {
      response = await fetch(url)
      responseBody = await response.json()
      console.log("otp from api :: " + responseBody)
      setOtpFromAPI(responseBody)
    }catch(ex){
      console.log(ex)
      setOtpVerifyMsg("Something went wrong while fetching OTP, please try after sometime. If issue persists please contact support team")
    } finally {
      inputRef1?.current?.focus()
    }
  }

  let handleOTPValueChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    // console.log(id)
    // console.log(value)
    setOTPValuePbj((prevState) => ({
      ...prevState,
      [id]: value
    }))
    if( id == "otp1" ) {
      console.log("inputRef2 input ref")
      console.log(inputRef2)
      console.log("==============")
      inputRef2?.current?.focus()
    } else if( id == "otp2" ) {
      inputRef3?.current?.focus()
    } else if( id == "otp3" ) {
      inputRef4?.current?.focus()
    }
    setIsOTPValid("null")
  }

  const handleMobileNumSubmit = async () => {
    const otpValue = otpValueObj.otp1 + otpValueObj.otp2 + otpValueObj.otp3 + otpValueObj.otp4
    console.log("handleMobileNumSubmit")
    console.log("otp input value :: " + otpValue)
    setOtpVerifyMsg("Verifying OTP, please wait...")

    if (otpValue == otpFromAPI.toString()) {
      setIsOTPValid(true)
      switchOnNextModalNOffCurrModal(currModal, nextModal)
      setOtpVerifyMsg(null)
    } else {
      setIsOTPValid(false)
      setOtpVerifyMsg(null)
    }
  }

  const handleMobileNumberChange = (e) => {
    const phoneNumValidationRegex = /^\d{10}$/
    const phoneNum = parseInt(e.target.value)
    setMobileNum(phoneNum)
    // console.log("inside handleMobileNumberChange")
    if (!phoneNumValidationRegex.test(phoneNum)) {
      // console.log("phone number not valid")
      setMobileNumSubmitDisabled(true)
      setMobileNumValidationErrorMsg("Please enter valid mobile containing 10 digits!")
    } else {
      setMobileNumSubmitDisabled(false)
      setMobileNumValidationErrorMsg(null)
    }
  }

  useEffect(() => {
    // console.log("inside useEffect");
    (otpTimer > -1 && OTPObject.showOTPCountdownMsg) && setTimeout(timeOutCallback, 1000);
    if (otpTimer === -1 && OTPObject.showOTPCountdownMsg) {
      setOTPObject(prevState => ({
        ...prevState,
        showOTPCountdownMsg: false,
        isOTPSentOnce: true
      }));
      setOTPTimer(30)
      setMobileNumSubmitDisabled(false)
    }
  }, [otpTimer, timeOutCallback, OTPObject.showOTPCountdownMsg])

  return showSAFOtpForm ? (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10 mb-10">


      <div className="w-11/12 px-0 pt-0 pb-4 m-auto bg-white rounded-md border border-gray-500 lg:max-w-full">
        <nav className="relative flex navcustomproperty flex-wrap items-center justify-between pl-2 pr-0 py-1 mb-2 ring-1 ring-black rounded-none">
          <h2 className="text-sm font-semibold text-center text-white">
            Property Module
          </h2>
        </nav>
        <form className="mt-4 ">
          <div className="h-screen bg-white py-10 px-2">
            <div className="container mx-auto">
              <div className="max-w-sm mx-auto md:max-w-lg">
                <div className="w-full">
                  <div className="bg-white h-96 border border-gray-900 shadow-md shadow-gray-700 py-3 rounded text-center">
                    <h1 className="text-lg font-bold text-blue-700 ">OTP Verification</h1>
                    <div className="flex flex-col mt-2">
                      <span className="text-sm font-bold text-center">
                        Enter Mobile No.
                        <p className='contents text-red-600 text-sm font-bold'>*</p>
                      </span>
                      <span className="font-bold mt-2">
                        <input type='number' id="phone" disabled={OTPObject.showOTPCountdownMsg} maxLength="10"
                          value={mobileNum} onChange={handleMobileNumberChange}
                          className={`w-64 h-8 bg-white-200 appearance-none ${OTPObject.showOTPCountdownMsg ? `cursor-not-allowed` : ``} border border-gray-500 rounded-md py-2 px-2 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500`} placeholder="9675-XX-XXXX" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" ></input>
                        {
                          mobileNumValidationErrorMsg ? <p>{mobileNumValidationErrorMsg}</p> : null
                        }
                      </span>
                      <span className="font-bold mt-4">
                        <button type='button'
                          disabled={mobileNumSubmitDisabled || OTPObject.showOTPCountdownMsg}
                          className={`w-28 h-8 px-4 py-1 tracking-wide text-white text-xs transition-colors duration-200 transform bg-green-400 rounded-md 
                          ${!mobileNumSubmitDisabled ? `hover:bg-green-700` : `cursor-not-allowed`} 
                          focus:outline-none focus:bg-indigo-600`} variant="gradient" onClick={handleOTPChange} fullwidth="tru" >
                          {!OTPObject.isOTPSentOnce ? "Request OTP" : "Resend OTP"}
                        </button>
                      </span>
                      {
                        OTPObject.showOTPCountdownMsg ? <p className="text-xs mt-3 px-10">{OTPObject.message} <p className="text-red-700 font-bold contents">{otpTimer}</p> seconds</p> : null
                      }
                    </div>

                    {OTPObject.showOTPModal ? (<div className="flex flex-col mt-4">
                      <span className="text-xs font-bold  text-center">Enter OTP<p className='contents text-red-600 text-sm font-bold'>*</p></span>
                      <div id="otp" className="flex flex-row justify-center text-center px-2 mt-2">

                        <input onChange={handleOTPValueChange} value={otpValueObj.otp1} ref={inputRef1}
                          className="m-2 border h-10 w-10 text-center form-control rounded border border-gray-900 "
                          type="text" id="otp1" maxLength="1" />
                        <input onChange={handleOTPValueChange} value={otpValueObj.otp2} ref={inputRef2}
                          className="m-2 border h-10 w-10 text-center form-control rounded border border-gray-900 "
                          type="text" id="otp2" maxLength="1" />
                        <input onChange={handleOTPValueChange} value={otpValueObj.otp3} ref={inputRef3}
                          className="m-2 border h-10 w-10 text-center form-control rounded border border-gray-900"
                          type="text" id="otp3" maxLength="1" />
                        <input onChange={handleOTPValueChange} value={otpValueObj.otp4} ref={inputRef4}
                          className="m-2 border h-10 w-10 text-center form-control rounded border border-gray-900 "
                          type="text" id="otp4" maxLength="1" />
                      </div>
                      <span className="font-bold mt-4 mb-2">
                        <button onClick={handleMobileNumSubmit}
                          type='button' disabled={!OTPObject.showOTPCountdownMsg}
                          className={`w-24 h-8 px-4 py-1 tracking-wide text-white text-xs mb-2 transition-colors duration-200 transform bg-green-400 rounded-md ${OTPObject.showOTPCountdownMsg ? `hover:bg-green-700` : `cursor-not-allowed`} focus:outline-none focus:bg-indigo-60`}>
                          Verify
                        </button>
                        {
                          isOtpValid === false ? <p className="text-xs font-semibold text-red-700">The OTP entered is not valid, please enter a valid otp!</p> : null
                        }
                        {
                          otpVerifyMsg != null ? <p>{otpVerifyMsg}</p> : null
                        }
                      </span>
                    </div>) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>



      </div>

    </div>
  ) : null
}

export default Saf_form_otp