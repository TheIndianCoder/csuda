import { dashboardRoutesObject } from '@/Dashboard/data/routes-dashboard-constants'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function SafSuccessPage(props) {
    const { showSAFSuccessModal, currModal, prevModal, switchOnPrevModalNOffCurrModal, propId } = props
    const navigate = useNavigate()
    const closeModalNRedirectToAnotherPage = () => {
        // navigate('/dashboard/dashboard/home')
        navigate(`/dashboard/${dashboardRoutesObject.propertyPaymentLayout}${dashboardRoutesObject.propertyPaymentSearchPropertyNDemandPayment}`)
    }
    console.log("prop id inside success modal================")
    console.log(propId)
    return showSAFSuccessModal ? (
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border border-gray-500 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start navcustomproperty justify-between p-1 border-b border-solid border-gray-500 rounded-t">
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={closeModalNRedirectToAnotherPage}
                        >
                            <span className="hover:border-red-900 text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                            </span>
                        </button>
                    </div>

                    {/*body*/}
                    <div className="relative p-4 flex-auto">
                        <p className="my-4 text-gray-900 text-xs whitespace-normal font-semibold leading-relaxed">
                            Self Assesment Form for Property Id - {propId} has been submitted successfully.
                        </p>
                        <div className="w-20 h-20 border-none m-auto"> 
                        <img src="/img/success_image.png" className="w-20 h-20 rounded-full" alt=""></img>
                        </div>
                        
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-2 border-t border-solid border-gray-500 rounded-b">
                        <button
                            type='button' color="green" className='h-8 w-20 px-2 py-1 bg-red-700 rounded text-white text-xs uppercase font-semibold FailureFloatingMsg'
                            onClick={closeModalNRedirectToAnotherPage}
                        >
                            Close
                        </button>
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

    ) : null
}

export default SafSuccessPage