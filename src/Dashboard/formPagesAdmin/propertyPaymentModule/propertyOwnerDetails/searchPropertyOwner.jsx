import { getCookieByName } from '@/utils/RequireAuth'
import { ColorRingCustom, NotFoundErrorMessageCustom } from '@/utils/commonComponents'
import FloatingMessage from '@/utils/floatingMessage'
import { isBlankString, isStringContainOnlyDigits } from '@/utils/formValidatorUtils'
import React, { useState } from 'react'
import { useEffect } from 'react'

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

function SearchPropertyOwner({
  showModal, currModal
}) {
  const [searchQueryObj, setSearchQueryObj] = useState({
    property_no: ""
  })
  const [propOwnerDetaillsFromAPI, setPropOwnerDetaillsFromAPI] = useState([])
  const [isPropOwnerDetaillsFromAPILoading, setIsPropOwnerDetaillsFromAPILoading] = useState(null)
  const [isPropOwnerDetaillsFromAPILoaded, setIsPropOwnerDetaillsFromAPILoaded] = useState(null)
  const [propOwnerDetaillsForUpdate, setPropOwnerDetaillsForUpdate] = useState(null)
  const [isOwnerDetailsUpdateInProgress, setIsOwnerDetailsUpdateInProgress] = useState(null)
  const [isOwnerDetailsUpdateInSuccess, setIsOwnerDetailsUpdateSuccess] = useState(null)
  const [ispropOwnerDetaillsForUpdateValid, setIspropOwnerDetaillsForUpdateValid] = useState(null)
 const [disabled, setDisabled] = useState(true)
  const handleSearchQueryChange = (event) => {
    if (event?.target?.id) {
      setSearchQueryObj(prevState => {
        return { ...prevState, [event.target.id]: event.target.value }
      })
    }
  }

  const handlePropOwnerDetailsSearch = async () => {
    setIsPropOwnerDetaillsFromAPILoading(true)
    if (isOwnerDetailsUpdateInSuccess == true) {
      setIsOwnerDetailsUpdateSuccess(null)
    }
    try {
      const url = `${SUDA_API_BASE_URL}/user/getPropertyOwnerDetailsByPropNo?property_no=${searchQueryObj.property_no}`
      const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
      }
      let response = null, responseBody = null;
      response = await fetch(url, requestOptions)
      responseBody = await response.json()
      if (response.status == "200") {
        setPropOwnerDetaillsFromAPI(responseBody)
        let responseBodyCopy = { ...responseBody[0] }
        responseBodyCopy.aadhar_no = !isBlankString(responseBodyCopy?.aadhar_no) ? responseBodyCopy?.aadhar_no : ""
        responseBodyCopy.email_id = !isBlankString(responseBodyCopy?.email_id) ? responseBodyCopy?.email_id : ""
        responseBodyCopy.pan_no = !isBlankString(responseBodyCopy?.pan_no) ? responseBodyCopy?.pan_no : ""
        setPropOwnerDetaillsForUpdate(responseBodyCopy)
        setIsPropOwnerDetaillsFromAPILoaded(true)
      } else {
        setPropOwnerDetaillsFromAPI([])
        setPropOwnerDetaillsForUpdate([])
        setIsPropOwnerDetaillsFromAPILoaded(false)
      }
    } catch (err) {
      console.error(err)
      setPropOwnerDetaillsFromAPI([])
      setPropOwnerDetaillsForUpdate(null)
      setIsPropOwnerDetaillsFromAPILoaded(false)
    } finally {
      setIsPropOwnerDetaillsFromAPILoading(false)
    }

  }

  const handleOwnerDetailsChange = (event) => {
    const eventId = event?.target?.id;
    const eventVal = event?.target?.value
    console.log(eventVal)
    if (eventId) {
      setPropOwnerDetaillsForUpdate(prevState => {
        return { ...prevState, [eventId]: eventVal }
      })
    }
  }

  useEffect(() => {
    console.log(propOwnerDetaillsForUpdate)
    if (!isBlankString(propOwnerDetaillsForUpdate)) {
      const { title, owner_name, gender, guardian_name, relation,
        mobile_no, aadhar_no, email_id, pan_no, owner_address } = propOwnerDetaillsForUpdate
      let isValid = true
      isValid = !isBlankString(title) && !isBlankString(owner_name) && !isBlankString(gender) &&
        !isBlankString(guardian_name) && !isBlankString(relation) && !isBlankString(mobile_no)
        && isStringContainOnlyDigits(mobile_no) && ((mobile_no + "").length == 10)
        && !isBlankString(owner_address)
      console.log("isValid ============")
      console.log(isValid)
      setIspropOwnerDetaillsForUpdateValid(isValid)
    } else {
      setIspropOwnerDetaillsForUpdateValid(null)
    }
  }, [propOwnerDetaillsForUpdate])

  const handleOwnerDetailsUpdate = async () => {
    setIsOwnerDetailsUpdateInProgress(true)
    try {
      let requestBody = { ...propOwnerDetaillsForUpdate }
      requestBody.user_id = getCookieByName("SUDA_TOKEN")
      const url = `${SUDA_API_BASE_URL}/admin/ownerUpdate`
      const requestOptions = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
        body: JSON.stringify(propOwnerDetaillsForUpdate)
      }
      let response = null, responseBody = null;
      response = await fetch(url, requestOptions)
      // responseBody = await response.json()
      if (response.status == "200") {
        setIsOwnerDetailsUpdateSuccess(true)
        handlePropOwnerDetailsSearch()
      } else {
        setIsOwnerDetailsUpdateSuccess(false)
      }
    } catch (err) {
      console.error(err)
      setIsOwnerDetailsUpdateSuccess(false)
    } finally {
      setIsOwnerDetailsUpdateInProgress(false)
    }

  }

  const closeFloatingMessage = () => {
    setIsOwnerDetailsUpdateSuccess(null)
  }

  return showModal == true ? (
    <>
      <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md  lg:max-w-full">
        <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-700 rounded-md h-10">
          <h2 className="text-sm font-semibold text-center text-white">
            Search Property
          </h2>
        </nav>
        <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end mt-3 mb-6">
          <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
              Property No.<p className='contents text-red-600 text-xs font-bold'>*</p>
            </label>
            <input
              onChange={handleSearchQueryChange}
              value={searchQueryObj.property_no}
              id='property_no'
              className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
              type="text" placeholder="Property No." />

          </div>
          <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
            <button onClick={handlePropOwnerDetailsSearch}
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

      {
        isPropOwnerDetaillsFromAPILoading == true ? (
          <ColorRingCustom />
        ) : null
      }

      {
        isPropOwnerDetaillsFromAPILoaded == false ? (
          <NotFoundErrorMessageCustom
            message={`Unable to load property owner details !`}
            text_size={`lg`} />
        ) : null
      }

      {
        isOwnerDetailsUpdateInSuccess == true ? (
          <FloatingMessage
            color='green'
            closeFloatingMessage={closeFloatingMessage}
            showMessage={true}
            message='Owner details have been updated successfully !' />
        ) : null
      }
      {
        isOwnerDetailsUpdateInSuccess == false ? (
          <FloatingMessage
            color='red'
            closeFloatingMessage={closeFloatingMessage}
            showMessage={true}
            message='Something went wrong! Please try again.' />
        ) : null
      }

      {
        propOwnerDetaillsForUpdate &&
          isPropOwnerDetaillsFromAPILoading != true ? (
          <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-md mt- lg:max-w-full">
            <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-700 rounded-md h-10">
              <h2 className="text-sm font-semibold text-center text-white">
                Owner Details
              </h2>
            </nav>
            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end">
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                  Honorific<p className='contents text-red-600 text-sm font-bold'>*</p>
                </label>
                <select value={propOwnerDetaillsForUpdate?.title}
                  onChange={handleOwnerDetailsChange}
                  disabled={true}
                  id="title"
                  color='orange'
                  className={`w-56 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                     dark:focus:border-orange-500  
                                     ${disabled ? `cursor-not-allowed ` : `cursor-pointer`}
                                     `}>
                  <option value='Mr.'>Mr</option>
                  <option value='Mrs.'>Mrs</option> 
                  <option value='Ms.'>Ms</option>
                  <option value='Mx.'>Mx</option>
                </select>
              </div>
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                  Owner Namee<p className='contents text-red-600 text-sm font-bold'>*</p>
                </label>
                <input value={propOwnerDetaillsForUpdate?.owner_name}
                  onChange={handleOwnerDetailsChange}
                  disabled={true}
                  className={`bg-white-200 appearance-none border border-gray-500 rounded w-56
                                             py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 
                                            focus:border-orange-500 
                                            ${disabled ? `cursor-not-allowed ` : `cursor-pointer`}
                                            `}
                  id="owner_name" type="text" placeholder="Owner Name" />
              </div>
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                  Gender<p className='contents text-red-600 text-sm font-bold'>*</p>
                </label>
                <select id="gender"
                  onChange={handleOwnerDetailsChange}
                  value={propOwnerDetaillsForUpdate?.gender}
                  disabled={true}
                  className={`w-56  border border-gray-500 text-gray-900 text-sm rounded-lg 
                                    focus:ring-blue-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-orange-500 
                                    ${disabled ? `cursor-not-allowed ` : `cursor-pointer`}
                                    `}>
                  <option value='Male' >Male</option>
                  <option value='Female' >Female</option>
                  <option value='Transgender' >Transgender</option>
                </select>
              </div>


            </div>
            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                  Guardian Name<p className='contents text-red-600 text-sm font-bold'>*</p>
                </label>
                <input value={propOwnerDetaillsForUpdate?.guardian_name}
                  onChange={handleOwnerDetailsChange}
                  className="bg-white-200 appearance-none border border-gray-500 rounded w-56
                       py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                  id="guardian_name" type="text" placeholder="Guardian Name" />
              </div>
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                  Relation<p className=' contents text-red-600 text-sm font-bold'>*</p>
                </label>
                <div className='flex w-full items-end '>
                  <select value={propOwnerDetaillsForUpdate?.relation}
                    onChange={handleOwnerDetailsChange}
                    id='relation'
                    color='orange'
                    disabled={true}
                    className={`w-56 border border-gray-500 text-gray-900 text-sm rounded-lg 
                                    focus:ring-blue-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-orange-500 
                                    ${disabled ? `cursor-not-allowed ` : `cursor-pointer`}
                                    `}>
                    <option value='S/O' >S/O</option>
                    <option value='D/O'>D/O</option>
                    <option value='W/O'  >W/O</option>
                    <option value='C/O' >C/O</option>
                  </select>
                </div>

              </div>
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                  Mobile No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                </label>
                <input value={propOwnerDetaillsForUpdate?.mobile_no}
                  onChange={handleOwnerDetailsChange}
                  type="tel" id="mobile_no"
                  className="bg-white-200 appearance-none border border-gray-500 rounded w-56 py-2 px-2 
                                        text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 
                                        focus:border-orange-500" placeholder="0123-45-6789" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
              </div>

            </div>
            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                  Aadhar No.
                </label>
                <input value={propOwnerDetaillsForUpdate?.aadhar_no}
                  onChange={handleOwnerDetailsChange}
                  id="aadhar_no"
                  className="bg-white-200 appearance-none border border-gray-500 rounded w-56 py-2 px-2 
                                        text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 
                                        focus:border-orange-500" placeholder="0123-2545-6789" pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}" />
              </div>
              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                  Email Id
                </label>
                <input value={propOwnerDetaillsForUpdate?.email_id}
                  onChange={handleOwnerDetailsChange}
                  className="bg-white-200 appearance-none border border-gray-500 rounded w-56
                                             py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                  id="email_id" type="text" placeholder="Email Id" />
              </div>

              <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                  PAN No.
                </label>
                <input value={propOwnerDetaillsForUpdate?.pan_no}
                  onChange={handleOwnerDetailsChange}
                  className="bg-white-200 appearance-none border border-gray-500 rounded w-56
                                             py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                  id="pan_no" type="text" placeholder="PAN No." />
              </div>

            </div>
            <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
              <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                Property Address
                <p className='contents text-red-600 text-sm font-bold'>*</p>
              </label>
              <textarea onChange={handleOwnerDetailsChange}
                value={propOwnerDetaillsForUpdate?.owner_address}
                className={`bg-white-200 appearance-none border border-gray-500 rounded w-full 
                    h-10 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white 
                    focus:border-2 focus:border-orange-500`}
                id="owner_address" name="w3review" rows="4" cols="20"></textarea>
            </div>
            {
              isOwnerDetailsUpdateInProgress == true ? (
                <ColorRingCustom />
              ) : null
            }

            {
              ispropOwnerDetaillsForUpdateValid == false ? (
                <NotFoundErrorMessageCustom
                  message={`Please enter all mandatory fields marked with * and enter valid owner details.`}
                  text_size={`sm`} />
              ) : null
            }
            <div className="m-auto p-10 min-w-fit max-w-fit">
              <button
                disabled={!ispropOwnerDetaillsForUpdateValid}
                onClick={handleOwnerDetailsUpdate}
                className={`w-28 h-8 px-0 py-0 mx-4 my-0 tracking-wide text-white text-sm font-semibold 
                transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 
                focus:outline-none focus:bg-green-400 ${!ispropOwnerDetaillsForUpdateValid ? `cursor-not-allowed` : ``}`}>
                Save
              </button>


            </div>
          </div>
        ) : null
      }

    </>
  ) : null
}

export default SearchPropertyOwner