
import React, { Component, useEffect, useState, useRef } from 'react'
import { Select, Option, Button, Textarea, Checkbox, Tooltip, Switch } from "@material-tailwind/react";
import { CirclesWithBar, ColorRing } from 'react-loader-spinner'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { getCookieByName } from '@/utils/RequireAuth';
import { useMaterialTailwindController } from '@/Dashboard/context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { convertDateToAPIFormat } from '@/utils/commonUtils';
import { consumerConnectionDetails, consumerUnitRateDetails, lastPaymentDetails, wardData } from '../../utils/common';
import { tableData } from '../../utils/tableData';
import Table from '../../utils/Table';
import DetailContainer from '../../utils/DetailContainer';
import UserDetailsContainer from './UserDetailsContainer';
// const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

const MainPageUserChargesUpdateConsumer = () => {
  const searchConsumerDetails = {
    wardNo: '',
    propertyNo: '',
    consumerNo: '',
    mobileNo: '',
    name: '',
  }

  // const details = [
  //     {
  //     Consumerno : "PC00GYF78787",
  //     },
  //     ]

  //     const detailLists = ["Consumerno", "Holdingno"]

  const details = [
    {
      "consumerno": "PC00GYF78787",
      consumername: "Namrata Das",
      oldconsumerno: "Old Consumer no",
      mobileno: "9101043391",
      gaurdianname: "Guardian name",
      wardno: "Ward no",
      holdingno: "Holding no",
      propertytype: "Property type",
      propertyaddress: "Property address"
    },
  ]


  const columns = [
    { field: "id", header: "Sl No" },
    { field: "consumer_no", header: "Consumer No" },
    { field: "consumer_name", header: "Consumer Name" },
    { field: "consumer_type", header: "Consumer Type" },
    { field: "holding_no", header: "Holding No" },
    { field: "view", header: "View" },
  ];

  const consumerConnectionColumns = [
    { field: "propertyType", header: "Property Type" },
    { field: "connnectionType", header: "Connnection Type" },
    { field: "meterno", header: "Meter No" },
    { field: "Initialmeterreading", header: "Initial Meter Reading" },
    { field: "noofconn", header: "No of Connection" },
    { field: "effectofconn", header: "Effect of Connection" },

  ]

  const consumerUnitRateColumns = [
    { field: "unitrate", header: "Unit Rate" },
    { field: "extracharge", header: "Extra Charge" },
    { field: "dateOfEffect", header: "Date of Effect" },
    { field: "status", header: "Status" },
  ]

  const lastPaymentDetailColumns = [
    { field: "slno", header: "Sl No" },
    { field: "demandfrom", header: "Demand From" },
    { field: "demandupto", header: "Demand Upto" },
    { field: "amount", header: "Amount" },
  ]
  const [searchConsumerDetail, setSearchConsumerDetail] = useState(searchConsumerDetails);
  const [searchConsumerDetailResult, setSearchConsumerDetailResult] = useState([])
  const [searchConsumer, setsearchConsumer] = useState([])
  const [toggle, setToggle] = useState(true)
  const [disabled, setDisabled] = useState(true)
  const [loader, setLoader] = useState(false)
  const [displayTable, setDisplayTable] = useState(false)
  const [displayDetails, setDisplayDetails] = useState(false)
  const [consumerDetails, setConsumerDetails] = useState([])
  const [consumerDetail, setConsumerDetail] = useState([])
  const [addressDetail, setAddressDetail] = useState([])

  const handleSearchQueryChange = (e) => {
    if (e.toString().includes("ward_name")) {
      let wardItem = JSON.parse(e)
      // console.log(wardItem)
      setSearchConsumerDetail((prevState) => {
        return {
          ...prevState,
          wardNo: wardItem.id
        }
      })
    }
    else {
      setSearchConsumerDetail({
        ...searchConsumerDetail,                                // spreading the unchanged values
        [e.target.name]: e.target.value,          // changing the state of *changed value*
      });
    }
  }

  const backbuttonHandler = () => {
    setDisplayDetails(false)
    setToggle(true)
  }
  const updateBasicDetailFormHandler = async (e) => {

    e.preventDefault()
    console.log('clicked') 
    console.log(searchConsumerDetail)
    setLoader(true)
    // setTemp('Loading...')
    try {
      const paymentReceiptDetailsGetUrl = `${BACKEND_BASE_URL}/wastemanagement/consumers?consumerNo=${searchConsumerDetail.consumerNo}&wardNo=${searchConsumerDetail.wardNo}&mobileNo=${searchConsumerDetail.mobileNo}&propertyNo=${searchConsumerDetail.propertyNo}&name=${searchConsumerDetail.name}`
      const requestOptions = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}`
        },
      }
      let response = null, responseBody = null
      response = await fetch(paymentReceiptDetailsGetUrl, requestOptions)
      responseBody = await response.json()
      console.log("Search consumer result", response, responseBody)

      if (response?.status == '200') {
        console.log('200', responseBody)
        setLoader(false)
        setSearchConsumerDetailResult(responseBody?.data)


      } else {
        toast.error("Failed to fetch details..!!!", {
          position: toast.POSITION.TOP_CENTER
        });
      }
    } catch (err) {
      console.error(err)
      setLoader(false)
      toast.error("Failed to fetch details..!!!", {
        position: toast.POSITION.TOP_CENTER
      });
    }
    finally {
      setLoader(false)
    }

    setSearchConsumerDetail(prevState => {
      return {
        ...prevState,
        propertyNo: '',
        consumerNo: '',
        mobileNo: '',
        name: ''
      }
    })

  }

  const viewConsumerDetailHandler = async (id) => {
    setLoader(false)
    setToggle(false)
    try {
      const searchDetails =
        `${BACKEND_BASE_URL}/wastemanagement/consumer/${id}`
      const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json', },
      }
      let response = null, responseBody = null
      response = await fetch(searchDetails, requestOptions)
      responseBody = await response.json()
      console.log("receipt in main form", response, responseBody)
      let allotteearr = []
      if (response?.status == '200') {
        setDisplayDetails(true)
        console.log("receipt in main form 200", response, responseBody)
        setConsumerDetails(responseBody.data)

        setDisplayTable(false)

      } else {
        //setLoader(false)
        setDisplayDetails(false)
      }
    } catch (err) {
      console.error(err)
      setLoader(false)
      setDisplayDetails(false)
    }
    finally { }

  }
  useEffect(() => {
    console.log('searching...', searchConsumerDetail)
    if ((searchConsumerDetail.wardNo !== '')) {
      setDisabled(false)
    }
    else if (searchConsumerDetail.propertyNo !== '') {
      setDisabled(false)
    }
    else if ((searchConsumerDetail.consumerNo !== '')) {
      setDisabled(false)
    }
    else if ((searchConsumerDetail.mobileNo !== '')) {
      setDisabled(false)
    }
    else if ((searchConsumerDetail.name !== '')) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }, [searchConsumerDetail.wardNo, searchConsumerDetail.propertyNo, searchConsumerDetail.consumerNo,
  searchConsumerDetail.mobileNo, searchConsumerDetail.name])

  useEffect(() => {
    console.log(consumerDetails, "ConsumerDetails")
    let con = [], detail = []
    if (consumerDetails.length > 0) {
      // const categoryElement = document.getElementById("wardNameId");
      consumerDetails.map((consumer, index) => {
        let val = {}, add = {}
        val.ward_no = consumer.ward_no
        val.holding_no = consumer.holding_no
        val.address = consumer.address
        val.land_mark = consumer.land_mark
        val.police_station = consumer.police_station
        val.consumer_master_id = consumer.consumer_master_id

        add.consumer_master_id = consumer.consumer_master_id
        add.consumer_no = consumer.consumer_no
        add.consumer_details_id = consumer.consumer_details_id
        add.consumer_name = consumer.consumer_name
        add.mobile_no = consumer.mobile_no
        add.house_flat_no = consumer.house_flat_no
        add.consumer_type = consumer.consumer_type
        add.gradian_name = consumer.gradian_name
        add.relation = consumer.relation
        detail.push(val)
        con.push(add)
      })
    }
    setConsumerDetail(con)
    setAddressDetail(detail)
  }, [consumerDetails])

  const consumerdetailLists = [
    { field: "consumer_no", header: "Consumer no" },
    { field: "consumer_name", header: "Consumer name" },
    { field: "mobile_no", header: "Mobile no" },
    { field: "gradian_name", header: "Guardian name" },

    { field: "house_flat_no", header: "House/Flat No" },
    { field: "consumer_type", header: "Consumer type" },
    { field: "mobile_no", header: "Mobile no" },
    { field: "relation", header: "Relation" },
  ];

  const addressdetailLists = [
    { field: "ward_no", header: "Consumer no" },
    { field: "holding_no", header: "Consumer name" },
    { field: "address", header: "Mobile no" },
    { field: "land_mark", header: "Guardian name" },
    { field: "police_station", header: "House/Flat No" },

  ];
  useEffect(() => {
    console.log(displayTable, "displayTable")
  }, [displayTable])
  useEffect(() => {
    console.log(searchConsumerDetailResult, "searchConsumerDetailResult")
    let arr = []
    if (searchConsumerDetailResult?.length > 0) {
      setDisplayTable(true)
      searchConsumerDetailResult.map((testData, index) => {
        let val = {}
        val.id = index + 1
        val.consumer_no = testData?.consumer_no
        val.consumer_name = testData?.consumer_name
        val.holding_no = testData?.holding_no
        val.consumer_type = testData?.consumer_type
        val.view = <button type='button' className='h-6 w-16 px-2 py-1 bg-green-700
               text-white rounded custom_button_add'
          onClick={() => viewConsumerDetailHandler(val.consumer_no)}
        >View</button>
        arr.push(val)
      },
      )
    }
    setsearchConsumer(arr)
  }, [searchConsumerDetailResult])
  return (
    <>
      <ToastContainer autoClose={2000} />

      <div className="relative flex flex-col justify-center  overflow-hidden mt-10 mb-10">
        {
          toggle ? <>
            <div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-md border border-gray-500 lg:max-w-full">
              <form className="mt-4 h-screen" onSubmit={updateBasicDetailFormHandler}>
                <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
                  <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                    <h2 className="text-sm font-semibold text-center text-white">
                      Update Consumer
                    </h2>
                  </nav>
                  <div className=" md:flex-1 flex-col justify-center items-center lg:flex mt-3 mb-6">
                    <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                      <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                        Ward No
                        {/* <p className='contents text-red-600 text-xs font-bold'>*</p> */}
                      </label>
                      <Select
                        onChange={(e) => handleSearchQueryChange(e)}
                        name="ward_name"
                        //  defaultValue={searchConsumerDetail.wardNo}
                        value='3'
                        label="select"
                        className="pl-2 pr-3 py-2 font-bold text-xs text-gray-900">
                        {
                          wardData.length > 0 ?
                            (wardData.map((item) => {
                              const { id, zone_mstr_id, ward_name, area_name, stampdate, user_id, status } = item
                              return <Option key={id} value={JSON.stringify(item)}>{`${ward_name}`}</Option>
                            })) : (<Option>Loading...</Option>)
                        }
                      </Select>

                    </div>

                    <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                      <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                        Property No.
                      </label>
                      <input
                        //value={safSearchQueryParamObj.propertyNo}
                        onChange={(e) => handleSearchQueryChange(e)}
                        name="propertyNo"
                        value={searchConsumerDetail.propertyNo}
                        className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                        type="text" placeholder="" />
                    </div>
                    <div className="mb-3 ml-3 mt-2 min-w-fit max-w-fit">
                      <p className='text-red-600 text-xs font-bold'>OR</p>
                    </div>
                    <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                      <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                        Consumer No
                      </label>
                      <input
                        onChange={(e) => handleSearchQueryChange(e)}
                        name="consumerNo"
                        value={searchConsumerDetail.consumerNo}
                        className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                        type="text" placeholder="" />
                    </div>
                    <div className="mb-3 ml-3 mt-2 min-w-fit max-w-fit">
                      <p className='text-red-600 text-xs font-bold'>OR</p>
                    </div>
                    <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                      <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                        Mobile No
                      </label>
                      <input
                        onChange={(e) => handleSearchQueryChange(e)}
                        name="mobileNo"
                        value={searchConsumerDetail.mobileNo}
                        className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                        type="text" placeholder="" />
                    </div>
                    <div className="mb-3 ml-3 mt-2 min-w-fit max-w-fit">
                      <p className='text-red-600 text-xs font-bold'>OR</p>
                    </div>
                    <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                      <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                        Name
                      </label>
                      <input
                        onChange={(e) => handleSearchQueryChange(e)}
                        name="name"
                        value={searchConsumerDetail.name}
                        className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                        type="text" placeholder="" />
                    </div>
                  </div>
                  <div className='flex justify-center items-center'>
                    <button type='submit'

                      className={`w-36 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white 
            ${disabled ? `cursor-not-allowed ` : `cursor-pointer`}
            transition-colors duration-200  
            transform bg-green-400 rounded-md hover:bg-green-700 
            focus:outline-none focus:bg-green-400`}
                      disabled={disabled}
                    >
                      Submit
                    </button>

                  </div>
                </div>
                {
                  loader ? <div className="m-auto w-16 h-16">
                    <ColorRing
                      visible={true}
                      height="40"
                      width="40"
                      colors={['#2fa158', '#2fa158', '#2fa158', '#2fa158', '#2fa158']}

                    />
                  </div> : null
                }

              </form>
            </div>
          </> : null
        }
        {
          displayTable ? <>
            <Table data={searchConsumer} columns={columns} hover={true} striped={true} />
          </> : <></>
        }
        {
          displayDetails ? <>
            <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
              <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                <h2 className="text-sm font-semibold text-center text-white">
                  Update Consumer Details
                </h2>
                <button className='text-sm py-1 px-4 rounded-md ml-4
        font-semibold text-center text-white mr-2 bg-red-500'
                  onClick={backbuttonHandler}
                >Back</button>
              </nav>

              <UserDetailsContainer consumerdetailLists={consumerDetail} addressdetailLists={addressDetail}
              />
              {/* <UserDetailsContainer detailLists={addressdetailLists} details={addressDetail}/> */}
            </div>


          </> : <></>
        }
      </div>
    </>
  )
}

export default MainPageUserChargesUpdateConsumer   