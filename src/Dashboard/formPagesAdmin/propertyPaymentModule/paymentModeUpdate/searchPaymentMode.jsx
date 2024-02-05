import { getCookieByName } from '@/utils/RequireAuth'
import React, { useState } from 'react'

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

function SearchPaymentMode({
  showModal, currModal, setIsPaymentDetailsLoading,
  setIsPaymentDetailsLoaded, nextModal, switchOnPrevModalNOffCurrModal,
  setPaymentDetails
}) {
  const [searchQueryObj, setSearchQueryObj] = useState({
    transaction_no: ""
  })
  const handleSearchQueryObjChange = (event) => {
    if (event?.target?.id) {
      setSearchQueryObj(prevState => {
        return {
          [event.target.id]: event.target.value
        }
      })
    }
  }

  const handleSearch = async () => {
    setIsPaymentDetailsLoading(true)
    try {
      const url = `${SUDA_API_BASE_URL}/user/transactionViewByTrnNo?transaction_no=${searchQueryObj.transaction_no}`
      const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
      }
      let response = null, responseBody = null
      response = await fetch(url, requestOptions)
      responseBody = await response.json()
      if (response?.status == "200") {
        setPaymentDetails(responseBody)
        setIsPaymentDetailsLoaded(true)
      } else {
        console.log(err)
        setPaymentDetails([])
        setIsPaymentDetailsLoaded(false)
      }
    } catch (err) {
      console.error(err)
      setPaymentDetails([])
      setIsPaymentDetailsLoaded(false)
    } finally {
      setIsPaymentDetailsLoading(false)
    }
  }

  return showModal == true ? (
    <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md   lg:max-w-full">
      <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-700 rounded-md h-10">
        <h2 className="text-sm font-semibold text-center text-white">
          Update Payment Mode
        </h2>
      </nav>
      <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end mt-3 mb-6">
        <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
          <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
            Enter Transaction No.<p className='contents text-red-600 text-xs font-bold'>*</p>
          </label>
          <input
            onChange={handleSearchQueryObjChange}
            id='transaction_no'
            className="bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
            type="text" placeholder="Transaction No." />

        </div>
        <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
          <button
          onClick={handleSearch}
            type='button'
            className="w-28 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
            Search
          </button>
        </div>
      </div>
      <div className="px-0 pt-0 pb-0 m-2 bg-white rounded-none mt-4 lg:max-w-full">
        <div className="container py-2 px-10 mx-0 min-w-full flex flex-col items-center">

        </div>
      </div>
    </div>
  ) : null
}

export default SearchPaymentMode