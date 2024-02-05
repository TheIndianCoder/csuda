import React from 'react'
import { useNavigate } from 'react-router-dom'

function PropertyPaymentConfirmationModal(props) {
    const { isDemandCreationSuccessfull, message, setIsDemandCreationSuccessfull, handleCashPaymentTransaction  } = props
    const navigate = useNavigate()
    const closeModalNRedirectToAnotherPage = () => {
        navigate('/dashboard/dashboard/home')
    }
    console.log("confirm =============")
    console.log(isDemandCreationSuccessfull)
    return (
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border border-gray-500 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start navcustomproperty justify-between p-1 border-b border-solid border-slate-200 rounded-t">
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setIsDemandCreationSuccessfull(null)}
                        >
                            <span className="bg-transparent text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                            </span>
                        </button>
                    </div>

                    {/*body*/}
                    <div className="relative p-4 flex-auto">
                        <p className="my-4 text-gray-900 text-sm whitespace-normal break-all leading-relaxed">
                            {message}
                        </p>
                        <div className="w-20 h-20 border-none m-auto">
                            {
                                isDemandCreationSuccessfull == true ?
                                    <img src="/img/success_image.png" className="w-20 h-20 rounded-full" alt=""></img>
                                    : null
                            }
                            {
                                isDemandCreationSuccessfull == false ?
                                    <img src="/img/failure.png" className="w-20 h-20 rounded-full" alt=""></img>
                                    : null
                            }
                        </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                        {
                            isDemandCreationSuccessfull == false ? (
                                <button
                                    className={`text-red-500 background-transparent font-bold uppercase px-2 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                                    type="button"
                                    onClick={() => setIsDemandCreationSuccessfull(null)}
                                >
                                    Close
                                </button>
                            ) : null
                        }
                        {
                            isDemandCreationSuccessfull == true ? (
                                <button
                                    className={`h-8 w-36 px-1 py-1 bg-green-700 text-xs text-white font-bold uppercase rounded custom_button_add`}
                                    type="button"
                                    onClick={handleCashPaymentTransaction}
                                >
                                    Pay Property Tax
                                </button>
                            ) : null
                        }
                        {/* <button
                            className="custom_button_add text-white active:bg-emerald-600 font-bold uppercase text-xs px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Save Changes
                        </button> */}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PropertyPaymentConfirmationModal