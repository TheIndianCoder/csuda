import React, { useState } from 'react'
import { Select, Option, Button, Textarea, Checkbox, Tooltip, Switch } from "@material-tailwind/react";
import { useMaterialTailwindController } from '@/Dashboard/context';
import { getCookieByName } from '@/utils/RequireAuth';
import { NO_DATA_FOUND, SOMETHING_WENT_WRONG, SUDA_TOKEN } from '@/utils/appConstants';
import { ColorRingCustom, NotFoundErrorMessageCustom } from '@/utils/commonComponents';

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

function SearchUserForDemandNPayment({
  showModal, currModal, nextModal, switchOnPrevModalNOffCurrModal, prevModal,
  setConsumerItemForView
}) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { safAllInputFromAPI } = controller;

  const [isSearchLoading, setIsSearchLoading] = useState(null)
  const [isSearchListLoaded, setIsSearchListLoaded] = useState(null)
  const [consumerSearchQueryParamObj, setConsumerSearchQueryParamObj] = useState({
    consumer_name: "",
    ward_id: "",
    consumer_no: "",
    holding_no: "",
  })

  const [consumerList, setConsumerList] = useState([])

  const handleSearchQueryChange = (event) => {
    if (event?.target?.id) {
      setConsumerSearchQueryParamObj((prevState) => {
        return {
          ...prevState,
          [event.target.id]: event.target.value
        }
      })
    } else if ((event + "").includes("ward")) {
      let wardItem = JSON.parse(event)
      // console.log(wardItem)
      setConsumerSearchQueryParamObj((prevState) => {
        return {
          ...prevState,
          ward_id: wardItem.id
        }
      })
    }
  }

  const handleSearch = async () => {
    setIsSearchListLoaded(null)
    setIsSearchLoading(true)
    try {
      const { ward_id, consumer_name, consumer_no, holding_no } = consumerSearchQueryParamObj
      const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName(SUDA_TOKEN)}` },
      }

      const safSearchUrl = `${SUDA_API_BASE_URL}/user/fetchAllConsumer?consumer_name=${(consumer_name + "").trim()}&consumer_no=${consumer_no}&holding_no=${(holding_no + "").trim()}&ward_id=${ward_id}`
      let response = null, responseBody = null
      response = await fetch(safSearchUrl, requestOptions)
      responseBody = await response?.json()
      console.log("searching with api...")
      console.log(response)
      if (response?.status == '200') {
        setIsSearchListLoaded(true)
        setConsumerList(responseBody)
      } else {
        setConsumerList([])
        setIsSearchListLoaded(false)
      }
    } catch (err) {
      console.error(err)
      setIsSearchListLoaded(false)
    } finally {
      setIsSearchLoading(false)
    }
  }

  const handleViewBtnClick = (consumerItem) => {
    setConsumerItemForView(consumerItem)
    switchOnPrevModalNOffCurrModal(currModal, nextModal)
  }

  return showModal == true ? (
    <>

      <div className="w-full px-0 pt-0 pb-4 m-auto mt-6 bg-white rounded-none border border-gray-500 lg:max-w-full">
        <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
          <h2 className="text-sm font-semibold text-center text-white">
            Search Property
          </h2>
        </nav>
        <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end mt-3 mb-6">
          <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
              Ward No<p className='contents text-red-600 text-sm font-bold'>*</p>
              {/* <p className='contents text-red-600 text-xs font-bold'>*</p> */}
            </label>
            <Select
              onChange={handleSearchQueryChange}
              id='ward_id'
              label="select" className="pl-2 pr-3 py-2 font-bold text-xs text-gray-900">
              {
                safAllInputFromAPI?.ward?.length > 0 ?
                  (safAllInputFromAPI.ward.map((item) => {
                    const { id, zone_mstr_id, ward_name, area_name, stampdate, user_id, status } = item
                    return <Option key={id} value={JSON.stringify(item)}>{ward_name}</Option>
                  })) : (<Option>Loading...</Option>)
              }
            </Select>

          </div>
          <div className="mb-3 ml-3 mt-2 min-w-fit max-w-fit">
            <p className='text-red-600 text-xs font-bold'>OR</p>
          </div>
          <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
              Holding No.<p className='contents text-red-600 text-sm font-bold'>*</p>
            </label>
            <input
              onChange={handleSearchQueryChange}
              id='holding_no'
              value={consumerSearchQueryParamObj?.holding_no}
              className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
              type="text" placeholder="Property No." />

          </div>
          <div className="mb-3 ml-3 mt-2 min-w-fit max-w-fit">
            <p className='text-red-600 text-xs font-bold'>OR</p>
          </div>
          <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
              Consumer No.<p className='contents text-red-600 text-sm font-bold'>*</p>
            </label>
            <input
              value={consumerSearchQueryParamObj?.consumer_no}
              onChange={handleSearchQueryChange}
              id='consumer_no'
              className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
              type="text" placeholder="Owner Name" />
          </div>
          <div className="mb-3 ml-3 mt-2 min-w-fit max-w-fit">
            <p className='text-red-600 text-xs font-bold'>OR</p>
          </div>
          <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
              Consumer Name<p className='contents text-red-600 text-sm font-bold'>*</p>
            </label>
            <input
              value={consumerSearchQueryParamObj?.consumer_name}
              onChange={handleSearchQueryChange}
              id='consumer_name'
              className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
              type="text" placeholder="Owner Name" />
          </div>
        </div>
        <div className="px-0 pt-0 pb-0 m-2 bg-white rounded-none mt-4 lg:max-w-full">
          <div className="container py-2 px-0 mx-0 min-w-full flex flex-col items-start">
            <div className="mb-0 ml-0 mr-4 mt-2 min-w-fit max-w-fit">
              <button type='button'
                onClick={handleSearch}
                className="w-36 h-8 px-4 py-1 mx-2 mb-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                Search
              </button>
            </div>
          </div>
        </div>

      </div>
      <div className="mb-6"></div>
      {
        isSearchLoading == true ? (
          <ColorRingCustom />
        ) : null
      }
      {
        isSearchListLoaded == false ? (
          <NotFoundErrorMessageCustom 
          message={SOMETHING_WENT_WRONG}
          text_size={`sm`}
          />
        ) : null
      }
      {
        consumerList?.length < 1 && isSearchListLoaded == true ? (
          <NotFoundErrorMessageCustom 
          message={NO_DATA_FOUND}
          text_size={`sm`}
          />
        ) : null
      }
      {
        isSearchListLoaded == true && consumerList?.length > 0 ? (
          <>
                <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  mt-4 border border-gray-500 lg:max-w-full">
                  <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                    <h2 className="text-sm font-semibold text-center text-white">
                      View Consumer List
                    </h2>
                  </nav>
                  <div className="px-0 pt-0 pb-2 m-4 bg-white rounded-none mt-4 border border-gray-500 lg:max-w-full">
                    <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                      <h2 className="text-sm font-semibold text-center text-white">
                        Consumer List
                      </h2>
                    </nav>
                    <div className="flex flex-col">
                      <div className="overflow-x-auto">
                        <div className="p-2.5 3xl:w-full inline-block align-middle">
                          <div className="overflow-hidden">
                            <table className="min-w-full">
                              <thead className="preview-saf-form-table-laypout">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                                  >
                                    Sl. No.
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700  whitespace-normal uppercase border border-gray-300"
                                  >
                                    Consumer No.
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                                  >
                                    Consumer Name
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300 "
                                  >
                                    Mobile No.
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700  whitespace-normal uppercase  border border-gray-300"
                                  >
                                    Ward No.
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                                  >
                                    Holding No.
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                                  >
                                    View
                                  </th>

                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {
                                  consumerList?.length > 0 ? (
                                    consumerList.map((searchResObj, index) => {
                                      const { consumer_name, consumer_no, consumer_type, holding_no,
                                              id, mobile_no, ward_no, ward_id } =
                                        searchResObj
                                      return (
                                        <tr key={index}
                                          className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                          <td className="px-6 py-2 text-xs font-normal text-center text-gray-700 whitespace-normal border border-gray-300">
                                            {index + 1}
                                          </td>
                                          <td className="px-6 py-2 text-xs font-normal text-center text-gray-700 whitespace-normal border border-gray-300">
                                            {consumer_no}
                                          </td>
                                          <td className="px-6 py-2 text-xs font-normal text-center text-gray-700 whitespace-normal border border-gray-300">
                                            {consumer_name}
                                          </td>
                                          <td className="px-6 py-2 text-xs font-normal text-gray-700 text-center whitespace-normal border border-gray-300">
                                            {mobile_no}
                                          </td>

                                          <td className="px-6 py-2 text-xs font-normal text-gray-700 text-center whitespace-normal border border-gray-300">
                                            {ward_no}
                                          </td>
                                          <td className="px-6 py-2 text-xs font-normal text-gray-700 text-center whitespace-normal border border-gray-300">
                                            {holding_no}
                                          </td>
                                          <td className="px-6 py-2 text-xs font-medium text-white text-center whitespace-normal border border-gray-300">
                                            <button type='button' color="green" className='h-6 w-16 px-2 py-1 text-xs text-white font-medium  bg-green-700 rounded custom_button_add'
                                              onClick={() => handleViewBtnClick(searchResObj)}
                                            >View</button>
                                          </td>
                                        </tr>
                                      )
                                    }))
                                    : null
                                }
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6"></div>
                  
                </div>
              </>
        ) : null
      }
    </>
  ) : null
}

export default SearchUserForDemandNPayment