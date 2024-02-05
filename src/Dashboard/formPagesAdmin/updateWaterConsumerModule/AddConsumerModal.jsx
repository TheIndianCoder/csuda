import React, { useEffect } from 'react'

const AddConsumerModal = ({setShowModal, consumerNumberAfterCreation, setShowReceipt}) => {
 
  return (
    <>
     <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
<div className='flex justify-center bg-gray-50 items-center'>
 <div className="w-full">
 <button className="p-1 ml-auto border-0 text-black  float-right text-3xl 
 leading-none font-semibold outline-none focus:outline-none"
    onClick={() => setShowModal(false)}>
  <span className="bg-transparent text-blue-900  h-6 w-6 text-2xl block outline-none 
  focus:outline-none">
  ×</span> 
  </button>
    <div className='p-10'>
    <p>Consumer no {consumerNumberAfterCreation} has been saved.</p>
      <div className='flex pt-6'>
      {/* <button type='submit'
                             className="w-36 h-8 px-4 py-1 mb-2 tracking-wide text-white transition-colors duration-200 
                             transform bg-red-400 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-400" 
                             onClick={() => setShowModal(false)}>
                             Cancel
             </button> */}
             {/* <button type='submit'
                             className="w-36 h-8 px-4 py-1  mx-4 mb-2 tracking-wide text-white transition-colors duration-200 
                             transform bg-blue-800 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-900" 
                            onClick={()=>setShowReceipt(true)}
                            >
                            View Receipt
             </button> */}
      </div>
    </div>
</div>
</div>
</div>
</div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default AddConsumerModal