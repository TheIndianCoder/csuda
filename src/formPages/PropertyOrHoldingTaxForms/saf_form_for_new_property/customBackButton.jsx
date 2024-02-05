import React from 'react'
function CustomBackButton(props) {
    const {switchOnPrevModalNOffCurrModal, prevModal, currModal} = props
    return (
        // <div className="mt-10 px-0">
        <button onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
            className="w-36 h-8 px-4 py-1 mx-4 mb-2  tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-indigo-600">
            Back
        </button>
        // </div>
    )
}

export default CustomBackButton