import React, { Component, useEffect, useState } from 'react'
import { Select, Option, Button, Textarea, Checkbox } from "@material-tailwind/react";
import { CirclesWithBar, ColorRing } from 'react-loader-spinner'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { getCookieByName } from '@/utils/RequireAuth';
import { useMaterialTailwindController } from '@/Dashboard/context';

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

function SearchProperty({
  showModal, currModal, nextModal,
  switchOnPrevModalNOffCurrModal,
  setPropId, setPropertyNo
}) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { safAllInputFromAPI } = controller;
  const [safNewFormAllInputFromAPI, setSafNewFormAllInputFromAPI] = useState({
    ward: [],
  })
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [isSearchListEmptyOrErrorMsg, setIsSearchListEmptyOrErrorMsg] = useState({
    isEmpty: null,
    message: null,
  })
  const [safSearchQueryParamObj, setSAFSearchQueryParamObj] = useState({
    property_no: "",
    ward_id: "",
    owner_name: "",
  })
  const handleSearchQueryChange = (event) => {
    if (event?.target?.id) {
      setSAFSearchQueryParamObj((prevState) => {
        return {
          ...prevState,
          [event.target.id]: event.target.value
        }
      })
    } else if (event.toString().includes("area_name")) {
      let wardItem = JSON.parse(event)
      // console.log(wardItem)
      setSAFSearchQueryParamObj((prevState) => {
        return {
          ...prevState,
          ward_id: wardItem.id
        } 
      })
    }
  }
  const [safSearchObjectResult, setSAFSearchObjectResult] = useState([])

  const handleSearch = async () => {
    setIsSearchLoading(true)
    const { property_no, ward_id, owner_name } = safSearchQueryParamObj
    const requestOptions = {
      method: "GET",
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
    }

    const safSearchUrl = `${SUDA_API_BASE_URL}/searchAllProperty?property_no=${(property_no + "").trim()}&ward_id=${ward_id}&owner_name=${(owner_name + "").trim()}&application_no=`
    let response = null, responseBody = null
    try {
      response = await fetch(safSearchUrl, requestOptions)
      responseBody = await response?.json()
      console.log("searching with api...")
      console.log(response)
    } catch (exc) {

    } finally {
      setIsSearchLoading(false)
      setIsSearchListEmptyOrErrorMsg(prevState => {
        return {
          ...prevState, isEmpty: true, message: "Something went wrong while searching! Please try again"
        }
      })
    }

    if (response?.status == "200") {
      setSAFSearchObjectResult(responseBody)
      if (responseBody?.length < 1) {
        setIsSearchListEmptyOrErrorMsg(prevState => {
          return {
            ...prevState, isEmpty: true, message: "No property found!"
          }
        })

      } else {
        setIsSearchListEmptyOrErrorMsg(prevState => {
          return {
            ...prevState, isEmpty: false, message: null
          }
        })
      }
    }
  }

  const handleViewBtnClick = (id, property_no) => {
    setPropId(id)
    setPropertyNo(property_no)
    switchOnPrevModalNOffCurrModal(currModal, nextModal)
  }

  useEffect(() => {
    let fetchSAFDropDownLists = async () => {
      const url = `${SUDA_API_BASE_URL}/SAFAllDropDownList`
      const response = await fetch(url)
      const responseBody = await response.json()
      // console.log(responseBody)
      if (response.status == "200") {
        setSafNewFormAllInputFromAPI((prevState) => {
          return {
            ...prevState,
            ...responseBody
          }
        })
      }
    }
    // fetchSAFDropDownLists()
    setSafNewFormAllInputFromAPI((prevState) => {
      return {
        ...prevState,
        ...safAllInputFromAPI
      }
    })
  }, [safAllInputFromAPI])
  useEffect(() => {
    console.log(safSearchObjectResult)
    console.log(`isSearchLoading :: ${isSearchLoading}`)
  }, [safSearchObjectResult, isSearchLoading])

  return showModal ? (
    <div className={`relative flex flex-col justify-center ${safSearchObjectResult.length > 0 && isSearchLoading == false ? `min-h-screen` : ``} overflow-hidden mt-10 mb-10`}>
      <div className={`w-full ${safSearchObjectResult.length > 0 && isSearchLoading == false ? `min-h-screen` : `h-screen`} px-0 pt-0 pb-4 m-auto bg-white rounded-md border border-gray-500 lg:max-w-full`}>
        <form className="mt-4">
          <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md lg:max-w-full">
            <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red rounded-md h-10">
              <h2 className="text-sm font-semibold text-center text-white">
                Search Property
              </h2>
            </nav>
            <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end mt-3 mb-6">
              <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                  Ward No
                  {/* <p className='contents text-red-600 text-xs font-bold'>*</p> */}
                </label>
                <Select onChange={handleSearchQueryChange}
                  label="select" color='orange' className={`pl-2 pr-3 py-2 font-bold text-xs text-gray-900`}>
                  {
                    safNewFormAllInputFromAPI.ward.length > 0 ?
                      (safNewFormAllInputFromAPI.ward.map((item) => {
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
                  Property No.
                </label>
                <input value={safSearchQueryParamObj.property_no}
                  id='property_no' onChange={handleSearchQueryChange}
                  color='orange'
                  className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                  type="text" placeholder="Property No." />

              </div>
              <div className="mb-3 ml-3 mt-2 min-w-fit max-w-fit">
                <p className='text-red-600 text-xs font-bold'>OR</p>
              </div>
              <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                  Owner Name
                </label>
                <input value={safSearchQueryParamObj.owner_name}
                  id='owner_name' onChange={handleSearchQueryChange}
                  color='orange'
                  className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                  type="text" placeholder="Owner Name" />
              </div>
              <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                <button type='button' onClick={handleSearch}
                  className="w-36 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                  Search
                </button>
              </div>
            </div>
            <div className="px-0 pt-0 pb-0 m-2 bg-white rounded-none mt-4 lg:max-w-full">
              <div className="container py-2 px-10 mx-0 min-w-full flex flex-col items-center">

              </div>
            </div>
          </div>
          <div className="mb-6"></div>
          {
            isSearchLoading == true ? (
              <div className="m-auto w-16 h-16">
                <ColorRing
                  visible={true}
                  height="40"
                  width="40"
                  colors={['#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000']}

                />
              </div>
            ) : null
          }

          {!(isSearchListEmptyOrErrorMsg.isEmpty == false) && (isSearchLoading == false) ? 
          <p className="text-center font-semibold text-lg text-red-700">
            {isSearchListEmptyOrErrorMsg.message}
            </p> : null}
          {
            safSearchObjectResult.length && isSearchLoading == false > 0 ? (
              <>
                <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md mt-4 lg:max-w-full">
                  
                  <div className="px-0 pt-0 pb-2 m-4 bg-white rounded-md mt-4 lg:max-w-full">
                    <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-blue-700 rounded-md h-10">
                      <h2 className="text-sm font-semibold text-center text-white">
                        Property List
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
                                    Ward No.
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                                  >
                                    Property No.
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300 "
                                  >
                                    Owner Name
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700  whitespace-normal uppercase  border border-gray-300"
                                  >
                                    Address
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                                  >
                                    Entry Type
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                                  >
                                    Last Access. Year
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
                                  safSearchObjectResult?.length > 0 ? (
                                    safSearchObjectResult.map((searchResObj, index) => {
                                      const { id, ward_id, property_no, application_no, entry_type,
                                        owner_name, owner_address, entry_fy_id, ward_name, fy_name } =
                                        searchResObj
                                      return (
                                        <tr key={index}
                                          className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                          <td className="px-6 py-2 text-xs font-normal text-center text-gray-700 whitespace-normal border border-gray-300">
                                            {index + 1}
                                          </td>
                                          <td className="px-6 py-2 text-xs font-normal text-center text-gray-700 whitespace-normal border border-gray-300">
                                            {ward_name}
                                          </td>
                                          <td className="px-6 py-2 text-xs font-normal text-center text-gray-700 whitespace-normal border border-gray-300">
                                            {property_no}
                                          </td>
                                          <td className="px-6 py-2 text-xs font-normal text-gray-700 text-center whitespace-normal border border-gray-300">
                                            {owner_name}
                                          </td>

                                          <td className="px-6 py-2 text-xs font-normal text-gray-700 text-center whitespace-normal border border-gray-300">
                                            {owner_address}
                                          </td>
                                          <td className="px-6 py-2 text-xs font-normal text-gray-700 text-center whitespace-normal border border-gray-300">
                                            {entry_type}
                                          </td>
                                          <td className="px-6 py-2 text-xs font-normal text-gray-700 text-center whitespace-normal border border-gray-300">
                                            {fy_name ? fy_name : 'N/A'}
                                          </td>
                                          <td className="px-6 py-2 text-xs font-medium text-white text-center whitespace-normal border border-gray-300">
                                            <button type='button' color="green" className='h-6 w-16 px-2 py-1 bg-green-700 rounded custom_button_add'
                                              onClick={() => handleViewBtnClick(id, property_no)}
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

                {/* <div className="flex min-w-fit gap-4 text-xs mt-10 justify-end mx-4">
                  <nav aria-label="Page navigation example">
                    <ul className="inline-flex items-center -space-x-px">
                      <li>
                        <a href="#" className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                          <span className="sr-only">Previous</span>
                          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        </a>
                      </li>
                      <li>
                        <a href="#" aria-current="page" className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">1</a>
                      </li>

                      <li>
                        <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                      </li>
                      <li>
                        <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">3</a>
                      </li>

                      <li>
                        <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                      </li>
                      <li>
                        <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                      </li>
                      <li>
                        <a href="#" className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                          <span className="sr-only">Next</span>
                          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div> */}
              </>
            ) : null
          }
        </form>


      </div>

    </div>) : null
}

export default SearchProperty