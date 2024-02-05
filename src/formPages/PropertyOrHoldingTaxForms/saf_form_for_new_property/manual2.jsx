import React, { Component } from 'react'
import CustomBackButton from './customBackButton';

export class Manual2 extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { showManualModal, switchOnNextModalNOffCurrModal, nextModal, currModal,
        switchOnPrevModalNOffCurrModal, prevModal } = this.props
        return showManualModal ? (
            <div className="relative flex flex-col justify-center overflow-hidden mt-10 mb-10">
                <div className="w-11/12 px-0 pt-0 pb-4 m-auto bg-white rounded-md border border-gray-500 lg:max-w-full">
                    <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-2 navcustomproperty mb-2 ring-1 ring-black rounded-none">
                        <h2 className="text-sm font-semibold text-center text-white">
                            How To Apply?
                        </h2>
                    </nav>
                    <form className="mt-4 ">
                        <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
                            <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                                <h2 className="text-sm font-semibold text-center text-white">
                                    Online Application Procedure
                                </h2>
                            </nav>
                            <div className='grid grid-cols-1 gap-10'>
                                <div className='relative w-full'>

                                    {<table className="table-auto">
                                        <thead className="bg-gray-50">

                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="px-4 py-4 font-semibold text-xs font-medium text-gray-900 whitespace-nowrap">
                                                    STEP 1
                                                </td>
                                                <td className="px-4 py-4 text-xs text-gray-900 whitespace-nowrap">
                                                    :
                                                </td>
                                                <td className="px-4 py-4 text-xs text-gray-900 whitespace-nowrap">
                                                    Click on Apply Online for new porperty
                                                </td>

                                            </tr>
                                            <tr>
                                                <td className="px-4 py-4 font-semibold text-xs font-medium text-gray-900 ">
                                                    STEP 2
                                                </td>
                                                <td className="px-4 py-4 text-xs text-gray-900 ">
                                                    :
                                                </td>
                                                <td className="px-4 py-4 text-xs text-gray-900">

                                                    Fill (<span className='text-red-900'>*</span>) Mandatory field available on
                                                    Self Assessment Form.

                                                </td>

                                            </tr>
                                            <tr>
                                                <td className="px-4 py-4 font-semibold text-xs font-medium text-gray-900 ">
                                                    STEP 3
                                                </td>
                                                <td className="px-4 py-4 text-xs text-gray-900 ">
                                                    :
                                                </td>
                                                <td className="px-4 py-4 text-xs text-gray-900 ">
                                                    Click Submit button for save applicant personal details.

                                                </td>

                                            </tr>
                                            <tr>
                                                <td className="px-4 py-4 font-semibold text-xs font-medium text-gray-900 ">
                                                    STEP 4
                                                </td>
                                                <td className="px-4 py-4 text-xs text-gray-900 ">
                                                    :
                                                </td>
                                                <td className="px-4 py-4 text-xs text-gray-900 ">

                                                    Upload all necessary documents required for Assessment.
                                                    Note: Click Here to  View Necessary Documents.
                                                    Click on  button to apply.

                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>}
                                    <div className="mt-6">

                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* <div className=" flex flex-col items-center mt-6 item-center" >
                            <button onClick={() => switchOnNextModalNOffCurrModal(currModal, nextModal)}
                                className="w-32 h-8 px-4 py-1 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-indigo-600">
                                Apply Online
                            </button>
                            <CustomBackButton showCustomBackButton={true}  />
                        </div> */}

                        <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 lg:max-w-full">

                            <div className="container py-2 px-10 mx-0 min-w-full flex flex-col items-center">
                                <div class="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                                   <CustomBackButton showCustomBackButton={true}
                                   switchOnPrevModalNOffCurrModal={switchOnPrevModalNOffCurrModal}
                                   prevModal={prevModal} currModal={currModal} />
                                    <button onClick={() => switchOnNextModalNOffCurrModal(currModal, nextModal)} class="w-36 h-8 px-4 py-1 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-indigo-600">
                                        Apply Online
                                    </button>
                                    
                                </div>



                            </div>

                        </div>
                        <div className="mb-6"></div>
                    </form>
                </div>
            </div>) : null

    }
}

export default Manual2