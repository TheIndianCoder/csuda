import React, { Component } from 'react'

export class Manual extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { showManualModal, closeModal } = this.props
        return showManualModal ? (
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">


                <div className="w-11/12 px-0 pt-0 pb-4 m-auto bg-white rounded-md  ring-1 ring-black lg:max-w-7xl">
                    <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-2 bg-cyan-800 mb-3 ring-1 ring-black rounded-t-lg">
                        <h1 className="text-xl font-semibold text-center text-white">
                            How to apply online?
                        </h1>
                    </nav>
                    <form className="mt-6 ">
                        <div className="w-11/12 px-0 pt-0 pb-4 m-auto bg-white rounded-md ring-1 ring-black lg:max-w-7xl">
                            <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-2 bg-cyan-800 mb-3 ring-black ring-1 rounded-t-lg">
                                <h2 className="text-xl font-semibold text-center text-white ">
                                    Online Application Procedure
                                </h2>
                            </nav>

                            <div className='grid grid-cols-2 gap-10'>
                                <div className='relative w-full lg:max-w-md'>

                                    {<table className="table-fixed">
                                        <thead className="bg-gray-50">

                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="pl-6 pr-0 font-semibold text-sm font-medium text-gray-800">
                                                    STEP 1
                                                </td>
                                                <td className="pl-0 pr-0 text-sm text-gray-800">
                                                    :
                                                </td>
                                                <td className="pr-1 pl-0 text-sm text-gray-800">
                                                    Click on apply online for new porperty
                                                </td>

                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 font-semibold text-sm font-medium text-gray-800 whitespace-nowrap">
                                                    STEP 2
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                    :
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">

                                                    Fill (<span className='text-red-600'>*</span>) Mandatory field available on
                                                    Self Assessment Form.

                                                </td>

                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 font-semibold text-sm font-medium text-gray-800 whitespace-nowrap">
                                                    STEP 3
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                    :
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                    Click Submit button for save applicant personal details.

                                                </td>

                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 font-semibold text-sm font-medium text-gray-800 whitespace-nowrap">
                                                    STEP 4
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                    :
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">

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
                        <div className=" flex flex-col items-center mt-6 item-center" >
                            <button onClick={() => closeModal('showManualModal')}
                                className="w-32 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-indigo-600">
                                Apply Online
                            </button>
                        </div>

                    </form>


                </div>
            </div>
        ) : null
    }
}

export default Manual