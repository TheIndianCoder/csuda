import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import CustomBackButton from '@/formPages/PropertyOrHoldingTaxForms/saf_form_for_new_property/customBackButton';
import { isBlankString } from '@/utils/formValidatorUtils';
import { getCookieByName } from '@/utils/RequireAuth';

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

function ChangePassword({
    switchOnPrevModalNOffCurrModal, userIdForPwdChange,
    currModal, prevModal
}) {
    const [passwordObj, setPasswordObj] = useState({
        password: "", confirm_password: ""
    })
    const [isPasswordValid, setIsPasswordValid] = useState(null)
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(null)
    const [isPwdNConfirmPwdSame, setIsPwdNConfirmPwdSame] = useState(null)
    const [isPasswordResetInProgress, setIsPasswordResetInProgress] = useState(null)
    const [isPasswordResetSuccess, setIsPasswordResetSuccess] = useState(null)
    const [isPasswordShown, setIsPasswordShown] = useState(false)
    const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)


    const handlePasswordChange = (event) => {
        setPasswordObj(prevState => {
            return {
                ...prevState, [event.target.id]: event.target.value
            }
        })
    }

    const handleShowPassword = (event) => {
        // console.log(event.target)
        if (event.target.id == 'show_password') {
            setIsPasswordShown(!isPasswordShown)
        } else if (event.target.id == 'show_confirm_password') {
            setIsConfirmPasswordShown(!isConfirmPasswordShown)
        }
    }

    const handlePasswordReset = async () => {
        setIsPasswordResetInProgress(true)
        let response = null, responseBody = null, responseClone = null, responseText = null
        try {
            const changePasswordURL = `${SUDA_API_BASE_URL}/admin/changePassword`
            const reqBody = {
                id: userIdForPwdChange,
                userPassword: passwordObj.password
            }
            const requestOptions = {
                method: "PUT",
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
                body: JSON.stringify(reqBody)
            }
            response = await fetch(changePasswordURL, requestOptions)
            responseClone = response.clone()
            responseBody = await response.json()
            if (response?.status == 200 || response?.status == 201) {
                setIsPasswordResetSuccess(true)
                console.log(responseBody)
            } else {
                setIsPasswordResetSuccess(false)
            }

        } catch (err) {
            console.log(err)
            responseText = await responseClone.text()
            if( responseText.toString().trim() == 'Success' ) {
                setIsPasswordResetSuccess(true)
            } else {
                setIsPasswordResetSuccess(false)
            }
            
        } finally {
            setIsPasswordResetInProgress(false)
        }
    }

    useEffect(() => {
        if ((passwordObj.password == passwordObj.confirm_password) &&
            !isBlankString(passwordObj.password) && !isBlankString(passwordObj.confirm_password)) {
            setIsPwdNConfirmPwdSame(true)
        } else if (isBlankString(passwordObj.password) || isBlankString(passwordObj.confirm_password)) {
            setIsPwdNConfirmPwdSame(null)
        } else {
            setIsPwdNConfirmPwdSame(false)
        }
    }, [passwordObj])

    return (
        <div className={`relative flex flex-col justify-center  overflow-hidden mt-10 mb-10`}>
            <div className={`w-full  px-0 pt-0 pb-4 m-auto bg-white rounded-md  lg:max-w-full`}>
                <form className="mt-4">
                    <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md  lg:max-w-full">
                        <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-300 rounded-md bg-orange-800 h-10">
                            <h2 className="text-sm font-semibold text-center text-white">
                                Reset Password
                            </h2>
                        </nav>
                        <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end mt-3 mb-6">
                            <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                    Password<p className='contents text-red-600 text-sm font-bold'>*</p>
                                </label>

                                <div class="relative">
                                    <input
                                        onChange={handlePasswordChange}
                                        value={passwordObj.password}
                                        id='password'
                                        className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                        type={isPasswordShown == true ? `text` : `password`} placeholder="Password" />
                                    <i id='show_password'
                                        onClick={handleShowPassword} class={`fa ${isPasswordShown == true ? `fa-eye` : `fa-eye-slash`} eye_2 absolute top-3 right-3 cursor-pointer`}></i>
                                </div>

                            </div>
                            <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                    Confirm Password<p className='contents text-red-600 text-sm font-bold'>*</p>
                                </label>

                                <div class="relative">
                                    <input onChange={handlePasswordChange}
                                        value={passwordObj.confirm_password}
                                        id='confirm_password'
                                        className="fa-eye-slash bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                        type={isConfirmPasswordShown == true ? `text` : `password`} placeholder="Confirm Password" />
                                    <i id='show_confirm_password'
                                        onClick={handleShowPassword} class={`fa ${isConfirmPasswordShown == true ? `fa-eye` : `fa-eye-slash`} eye_2 absolute top-3 right-3 cursor-pointer`}></i>
                                </div>
                            </div>
                            <div className="mb-0 ml-2 mr-2 mt-2 min-w-fit max-w-fit">
                                <button disabled={isPwdNConfirmPwdSame ? false : true}
                                    onClick={handlePasswordReset}
                                    type='button'
                                    className={`w-40 h-8 px-4 py-1 mx-2 mb-2 tracking-wide text-white transition-colors 
                                    ${isPwdNConfirmPwdSame ? `` : `cursor-not-allowed`}
                                    duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400`}>
                                    Submit
                                </button>
                            </div>
                            {/* <div className="mb-0 ml-2 mr-2 mt-2 min-w-fit max-w-fit">
                                <button
                                    onClick={handleShowPassword}
                                    type='button'
                                    className="w-40 text-left h-8 px-4 py-1 mx-2 mb-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                                    Show Password
                                </button>
                            </div> */}
                            <div className="mb-0 ml-2 mr-2 mt-2 min-w-fit max-w-fit">
                                <button
                                    onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
                                    type='button'
                                    className="w-40 h-8 px-4 py-1 mx-2 mb-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                                    Back
                                </button>
                            </div>
                        </div>

                        <div className="px-0 pt-0 pb-0 m-0 bg-white rounded-none mt-4 lg:max-w-full">
                            <div className="container py-2 px-4 mx-0 min-w-full flex flex-col items-left">
                                {
                                    isPwdNConfirmPwdSame == false ? (
                                        <p className="text-left font-semibold text-sm text-red-700">
                                            Password and Confirm Password should be same and not empty !
                                        </p>
                                    ) : null
                                }
                                {
                                    isPasswordResetSuccess == true ? (
                                        <p className="text-left font-semibold text-lg text-green-700">
                                            Password has been changed successfully !
                                        </p>
                                    ) : isPasswordResetSuccess == false ? (
                                        <p className="text-left font-semibold text-sm text-red-700">
                                            Password could not changed, please try again !
                                        </p>
                                    ) : null
                                }
                            </div>
                        </div>
                    </div>

                    {
                        isPasswordResetInProgress == true ? (
                            <div className="m-auto w-16 h-16">
                                <ColorRing
                                    visible={true}
                                    height="40"
                                    width="40"
                                    colors={['#2fa158', '#2fa158', '#2fa158', '#2fa158', '#2fa158']}

                                />
                            </div>
                        ) : null
                    }
                </form>


            </div>

        </div>
    )
}

export default ChangePassword