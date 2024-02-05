
import React, { Component, useEffect, useState,useRef } from 'react'
import { Select, Option, Button, Textarea, Checkbox, Tooltip, Switch, useTabs } from "@material-tailwind/react";
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
import { SwapStringPlaces, convertDateToAPIFormat } from '@/utils/commonUtils';
import { consumerConnectionDetails, consumerUnitRateDetails, lastPaymentDetails, wardData } from '../../utils/common';
import { tableData } from '../../utils/tableData';
import Table from '../../utils/Table';
import DetailContainer from '../../utils/DetailContainer';
const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL


const MainPageUserChargesLastPaymentUpdate = () => {
    const searchConsumerDetails = {                 
        ward_id:'',
        holding_no:'',
        consumer_no:'',
        MobileNUmber:'',
        consumer_name:'',
        } 
    const receiptDetails = {
      receipt_no:'',
      receipt_date:'',
      book_no:'',
      file:null
    }
// const details = [
//     {
//     consumer_no : "PC00GYF78787",
//     },
//     ]
    
//     const detailLists = ["consumer_no", "Holdingno"]
    
    const details = [
        {
        "consumer_no" : "PC00GYF78787",
        consumername: "Namrata Das",
        oldconsumer_no: "Old Consumer no",
        mobileno: "9101043391",
        gaurdianname: "Guardian name",
        wardno: "Ward no",
        holdingno: "Holding no",
        propertytype: "Property type",
        propertyaddress : "Property address"
        },
        ]

      
                                                                                      
      
     
       
                                                                                    
      
      
      
    const detailLists = [
        { field: "consumer_no", header: "Consumer no" },
        { field: "consumer_name", header: "Consumer name" },
        { field: "consumer_type", header: "Consumer type" },
        { field: "mobile_no", header: "Mobile no" },
        { field: "relation", header: "Relation" },
        { field: "gradian_name", header: "Guardian name" },
        { field: "ward_no", header: "Ward no" },
        { field: "ward_id", header: "Ward id" },
        { field: "holding_no", header: "Holding no" },
        { field: "land_mark", header: "Landmark" },
        { field: "police_station", header: "Police Station" },
        { field: "house_flat_no", header: "House/Flat No" },
        { field: "propertytype", header: "Property type" },
        { field: "address", header: "Property address" },
      ];

        const columns = [
            { field: "id", header: "Sl No" },
            { field: "consumer_no", header: "Consumer No" },
            { field: "consumer_name", header: "Consumer Name" },
            { field: "holding_no", header: "Holding No" },
            { field: "mobile_no", header: "Mobile No" },
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

        const consumerUnitRateColumns  = [
            { field: "unitrate", header: "Unit Rate" },
            { field: "extracharge", header: "Extra Charge" },
            { field: "dateOfEffect", header: "Date of Effect" },
            { field: "status", header: "Status" },
        ] 

        const lastPaymentDetailColumns = [
            { field: "id", header: "Sl No" },
            { field: "month", header: "Month" },
            { field: "amount", header: "Amount" },
        ]
    const [searchConsumerDetail, setSearchConsumerDetail] = useState(searchConsumerDetails); 
    const [receiptDetail, setReceiptDetail] = useState(receiptDetails)
    const [searchConsumerDetailResult, setSearchConsumerDetailResult] = useState(null)
    const [searchConsumer, setsearchConsumer] = useState([]) 
    const [toggle, setToggle] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [loader, setLoader] = useState(false) 
    const [displayTable, setDisplayTable] = useState(false)
    const [displayDetails, setDisplayDetails] = useState(false)
    const [consumerDetails, setConsumerDetails] = useState([])  
    const [consumerData,setConsumerData] = useState([])
    const [month, setMonth] = useState([])
     const [fetchedMonth,setFetchedMonth] = useState([])
     const [displayMonth, setDisplayMonth] = useState([])
     const [totalAmount, setTotalAmount] = useState([])
     const [demandTableLoader, setDemandTableLoader] = useState(false);
     const [paymentLoader, setPaymentLoader] = useState(false);
    const backbuttonHandler = () =>{
      setDisplayTable(true) 
      // setDisplayDemandAndPayment(true) 
      setDisplayDetails(false) 
      // setviewAndPayDemandDetails(false) 
      // setPaymentDetail(false)
      // setdisplayPaymentDetail(false)
      setToggle(true)
    }

    const handleMonthChange = (e) => {
      if (e.toString().includes("month")) {
        let wardItem = JSON.parse(e)
       
        // setSearchConsumerDetail((prevState) => {
        //   return {
        //     ...prevState,
        //     ward_id: wardItem.id
        //   }
        // })
        setMonth(wardItem)
      }
    }
    useEffect(()=>{
      console.log(month)
    ,[month]})
    useEffect(()=>{
      console.log(fetchedMonth,"fetchedMonth")
    },fetchedMonth)
    const handleSearchQueryChange = (e) => {
        if (e.toString().includes("ward_name")) {
            let wardItem = JSON.parse(e)
            // console.log(wardItem)
            setSearchConsumerDetail((prevState) => {
              return {
                ...prevState,
                ward_id: wardItem.id
              }
            })
          }
          else{
            setSearchConsumerDetail({
            ...searchConsumerDetail,                                // spreading the unchanged values
            [e.target.name]: e.target.value,          // changing the state of *changed value*
          });
        }
      }

    const updateBasicDetailFormHandler = async(e) => {
  
        e.preventDefault()
        console.log('clicked')
        console.log(searchConsumerDetail)
        setLoader(true)
        // setTemp('Loading...')
                  try {
                      const paymentReceiptDetailsGetUrl = `${SUDA_API_BASE_URL}/user/fetchAllConsumer?consumer_name=${searchConsumerDetail.consumer_name}&consumer_no=${searchConsumerDetail.consumer_no}&mobile_no=${searchConsumerDetail.MobileNUmber}&holding_no=${searchConsumerDetail.holding_no}&ward_id=${searchConsumerDetail.ward_id}`
                      const requestOptions = {
                          method: "GET",
                          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
                      }
                      let response = null, responseBody = null 
                      response = await fetch(paymentReceiptDetailsGetUrl, requestOptions)
                      responseBody = await response.json()
                      console.log("Search consumer", response, responseBody)
                     
                      if (response?.status == '200' &&  responseBody.length > 0) {
                        console.log('200',responseBody)
                        setSearchConsumerDetailResult(responseBody)
                        setLoader(false)
                        
                      }
                      else if (response?.status == '200' && responseBody.length === 0) {
                        toast.error("No records found.!!!", {
                          position: toast.POSITION.TOP_CENTER
                          });  
                        setLoader(false)
                        
                      }
                      else {
                        setLoader(false)
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
                  } 
                
                  setSearchConsumerDetail(prevState => {
                    return { ...prevState,  
                    holding_no : '', 
                    consumer_no:'',
                    consumer_name:'',
                    MobileNUmber:'',
                    ward_id:''
                  }
          })
      }   
    
      const handleReceiptDetails = (e,id) => {
        if (id.includes("file")) {
          setReceiptDetail(prevState => { 
            return { ...prevState, file: e.target.files[0]}
          })
      }
       else if (id.includes("receipt_date")) {
          setReceiptDetail(prevState => {
            const v = convertDateToAPIFormat(e.$d) 
            return { ...prevState, receipt_date: v }
          })
      }
      else{
        setReceiptDetail({
        ...receiptDetail,                                // spreading the unchanged values
        [e.target.name]: e.target.value,          // changing the state of *changed value*
      });
    }}

    useEffect(()=>{
      console.log(receiptDetail)
    },[receiptDetail])
    const viewMonthHandler = async() => {
      setDemandTableLoader(true);
      console.log(consumerData, "consumerData")
      try {
        const paymentReceiptDetailsGetUrl = `${SUDA_API_BASE_URL}/user/userCharge/lastPaymentUpdateView?consumerNo=${consumerData[0]?.consumer_no}&demandUpto=${month?.monthId}`
        const requestOptions = {
            method: "GET",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
        }
        let response = null, responseBody = null 
        response = await fetch(paymentReceiptDetailsGetUrl, requestOptions)
        responseBody = await response.json()
        console.log("view result", response, responseBody)
       
        if (response?.status == '200') {
          console.log('200',responseBody)
          setFetchedMonth(responseBody)
          setDemandTableLoader(false);
          
        } else {
          setDemandTableLoader(false);
          toast.error("Failed to fetch ..!!!", {
            position: toast.POSITION.TOP_CENTER
            });  
        }
    } catch (err) {
        console.error(err)
        setDemandTableLoader(false);
        toast.error("Failed to fetch ..!!!", {
          position: toast.POSITION.TOP_CENTER
          });  
      
    }
    finally {
    } 
  
    }                                                                    
    
                                                                                          
   
      useEffect(()=>{
        console.log("consumerDetails consumerDetails", consumerDetails, consumerDetails?.length)
        let arr = []
        if(consumerDetails?.length > 0){
         consumerDetails.map((testData,index) => {
           let val ={}
           val.id = index + 1
           val.consumer_no = testData?.consumer_no
           val.consumer_name = testData?.consumer_name 
           val.holding_no = testData?.holding_no
           val.mobile_no = testData?.mobile_no
           val.gradian_name = testData?.gradian_name 
           val.ward_no = testData?.ward_no 
           val.consumer_type = testData?.consumer_type 
           val.relation = testData?.relation 
           val.house_flat_no = testData?.house_flat_no 
           val.police_station = testData?.police_station 
           val.land_mark = testData?.land_mark 
           val.address = testData?.address 
           val.ward_id = testData?.ward_id 
           val.consumer_mstr_id =  testData?.consumer_mstr_id
           arr.push(val)
         },
         )}
         console.log(arr,"array fetched")
        setConsumerData(arr)
      },[consumerDetails])

      // const [fetchedMonth,setFetchedMonth] = useState([])
      // const [displayMonth, setDisplayMonth] = useState([]) 
      useEffect(()=>{
        let arr = [], total = 0
        if(fetchedMonth?.length > 0){
         fetchedMonth.map((testData,index) => {
          let val ={}
          val.id = index + 1
          val.month = testData?.month
          val.amount = testData?.amount 
          total = total + testData?.amount 
          arr.push(val) 
         },
         )}
         setDisplayMonth(arr)
         setTotalAmount(total)
         console.log(total, "Total")
      },[fetchedMonth])
      useEffect(()=>{
        console.log("consumerData",consumerData)
      },[consumerData])
      
      // useEffect(()=>{
      //   console.log('searching...', searchConsumerDetail)
      //  if((searchConsumerDetail.ward_id !=='' && searchConsumerDetail.holding_no !=='' ))
      //  {
      //   setDisabled(false)
      //  }
      //  else if((searchConsumerDetail.ward_id !=='' && searchConsumerDetail.consumer_no !=='' ) )
      //  {
      //      setDisabled(false)
      //  }
      //  else if((searchConsumerDetail.ward_id !=='' &&  searchConsumerDetail.MobileNUmber !=='' ))
      //  {
      //      setDisabled(false)
      //  }
      //  else if((searchConsumerDetail.ward_id !=='' &&  searchConsumerDetail.name !==''))
      //  {
      //      setDisabled(false)
      //  }
      //  else{
      //   setDisabled(true)
      //  }
      // },[searchConsumerDetail.ward_id,searchConsumerDetail.holding_no,searchConsumerDetail.consumer_no,
      //   searchConsumerDetail.MobileNUmber,searchConsumerDetail.name])

      useEffect(()=>{
        console.log('searching...', searchConsumerDetail)
       if((searchConsumerDetail.ward_id !=='' || searchConsumerDetail.holding_no !=='' || searchConsumerDetail.consumer_no !=='' || 
       searchConsumerDetail.MobileNUmber !=='' ||  searchConsumerDetail.consumer_name !=='' ))
       {
        setDisabled(false)
       }
       else{
        setDisabled(true)
       }
      },[searchConsumerDetail.ward_id,searchConsumerDetail.holding_no,searchConsumerDetail.consumer_no,
        searchConsumerDetail.MobileNUmber,searchConsumerDetail.consumer_name])

        useEffect(()=>{
          console.log(searchConsumerDetailResult,"searchConsumerDetailResult")
          let arr = []
            if(searchConsumerDetailResult?.length > 0){
             setDisplayTable(true)
             searchConsumerDetailResult.map((testData,index) => {
              let val ={}
              val.id = index + 1
              val.consumer_no = testData?.consumer_no
              val.consumer_name = testData?.consumer_name 
              val.holding_no = testData?.holding_no
              val.mobile_no = testData?.mobile_no
              val.view =  <button type='button' className='h-6 w-16 px-2 py-1 bg-green-700
               text-white rounded custom_button_add'  
               onClick={()=>viewConsumerDetailHandler(val.consumer_no)}
               >View</button>
              arr.push(val)
            },
            )}
           setsearchConsumer(arr)
           },[searchConsumerDetailResult]) 

           const viewConsumerDetailHandler = async(id)=>{
        
            //setFetchedData(data)
            setLoader(true)
            // setToggle(false)
            // setDisplayDetails(true)
            try {
              const searchDetails = 
               `${SUDA_API_BASE_URL}/user/fetchConsumerDetailByConsumerNo?consumer_no=${id}`
               const requestOptions = {
                method: "GET",
                headers: { 
                  'Content-Type': 'application/json', 'Authorization':
                 `Bearer ${getCookieByName('SUDA_TOKEN')}` },
            }
              let response = null, responseBody = null
              response = await fetch(searchDetails, requestOptions)
              responseBody = await response.json()
              console.log("receipt in main form", response, responseBody)
              let allotteearr = []
              if (response?.status == '200') {
                setToggle(false)
                setDisplayDetails(true)
                console.log("receipt in main form 200", response, responseBody, responseBody[0])
                setConsumerDetails(responseBody)
                setDisplayTable(false) 
                setLoader(false)
              } else {
                setLoader(false)
                setDisplayDetails(false)
                toast.error("Failed to fetch details..!!!", {
                  position: toast.POSITION.TOP_CENTER
                  });  
              }
          } catch (err) {
              console.error(err)   
              setLoader(false)
              setDisplayDetails(false)
              toast.error("Failed to fetch details..!!!", {
                position: toast.POSITION.TOP_CENTER
                });  
          }
          finally {}
        }    
        useEffect(()=>{
            if(searchConsumerDetailResult?.length > 0){
             setDisplayTable(true)
            //  setTemp('')
            }
            // else if(searchConsumerDetailResult?.length === 0){
            //  setDisplayTable(false)
            //  setTemp('No results found')
            // }
            // else{
            //  setTemp('')
            // }
           },[searchConsumerDetailResult])

        const receiptSubmitHandler = async(e) => {
          e.preventDefault()
          setPaymentLoader(true)
          const formData = new FormData(); 
         
          formData.append("consumer_details_id", consumerData[0]?.consumer_mstr_id)
          formData.append("receipt_no",receiptDetail?.receipt_no) 
          formData.append("book_no",receiptDetail?.book_no) 
          formData.append("receipt_date", receiptDetail?.receipt_date )
          formData.append("frm_month",consumerDetails[0]?.dropDown[0]?.fullDate) 
          formData.append("upto_month",SwapStringPlaces(month?.monthId))  
          // formData.append("upto_month", "02-2018")  
          // formData.append("fromDate",consumerDetails[0]?.dropDown[0]?.fullDate )  
          formData.append("fromDate",consumerDetails[0]?.dropDown[0]?.fromDate)  
          formData.append("upToDate",month?.fullDate ) 
          formData.append("user_id",getCookieByName('SUDA_USER_ID'))  
          formData.append("tot_amount", totalAmount )
          formData.append("file", receiptDetail.file) 
         
          console.log(
          "consumer_details_id",formData.get("consumer_details_id"),
          "receipt_no",formData.get("receipt_no"), 
          "book_no",formData.get("book_no"),
          "receipt_date",formData.get("receipt_date"),
          "frm_month",formData.get("frm_month"),
          "upto_month",formData.get("upto_month"), 
          "fromDate",formData.get("fromDate"),
          "upToDate",formData.get("upToDate"),
          "user_id",formData.get("user_id"),
          "tot_amount",formData.get("tot_amount"),
          "file",formData.get("file")
          )
          try {
      
            const requestOptions = { 
                method: "POST",
                
                headers: { 
                  // "Content-Type": "application/json",
                 'Authorization': 
                `Bearer ${getCookieByName('SUDA_TOKEN')}` 
                },
                // body: json_data, formData
                body: formData
              
              
            }
            const safNewEntryUrl = `${SUDA_API_BASE_URL}/user/userCharge/lastPaymentUpdate`
            //const response = await fetch(safNewEntryUrl, requestOptions)
            let response = null, responseBody = null
            response = await fetch(safNewEntryUrl, requestOptions)
            //responseBody = await response.json()
            // console.log("woohooo")
            console.log(response)
            if (response.status === 200) { 
              setPaymentLoader(false)
                toast.success("Updated Successfully..!!!", {
                position: toast.POSITION.TOP_CENTER
                });           
            } 
            else{
              setPaymentLoader(false)
                toast.error("Updation failed,try again later..!!!", {
                    position: toast.POSITION.TOP_CENTER
                    });   
            }
        } catch (err) {
            console.error(err)
        }
        }
  return ( 
    <>
   <ToastContainer autoClose={2000}/>
   
    <div className="relative flex flex-col justify-center  overflow-hidden mt-10 mb-10">
        {
        toggle ? <> 
        <div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-md border border-gray-500 lg:max-w-full">
        <form className="mt-4 h-screen" onSubmit={updateBasicDetailFormHandler}>
        <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
            <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
              <h2 className="text-sm font-semibold text-center text-white">
                Last Payment Update
              </h2>
            </nav>
            <div className=" md:flex-1 flex-col justify-center items-center lg:flex mt-3 mb-6">
              <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                  Ward No
                  {/* <p className='contents text-red-600 text-xs font-bold'>*</p> */}
                </label>
                <Select 
                 onChange={(e)=>handleSearchQueryChange(e)}
                                     name="ward_name"
                                     defaultValue={searchConsumerDetail.ward_id}
                                         label="select" 
                                         className="pl-2 pr-3 py-2 font-bold text-xs text-gray-900">
                                        {
                                            wardData.length > 0 ?
                                                (wardData.map((item) => {
                                                    const {id,zone_mstr_id,ward_name,area_name,stampdate,user_id,status} = item
                                                    return <Option key={id} value={JSON.stringify(item)}>{`${ward_name}`}</Option>
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
                <input 
               
                onChange={(e)=>handleSearchQueryChange(e)}
                name="holding_no"
                value={searchConsumerDetail.holding_no}
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
                onChange={(e)=>handleSearchQueryChange(e)}
                name="consumer_no"
                value={searchConsumerDetail.consumer_no}
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
                onChange={(e)=>handleSearchQueryChange(e)}
                name="MobileNUmber"
                value={searchConsumerDetail.MobileNUmber}
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
                 onChange={(e)=>handleSearchQueryChange(e)}
                 name="consumer_name"
                 value={searchConsumerDetail.consumer_name}
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
                        loader ?  <div className="m-auto w-16 h-16">
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
        Consumer Details
        </h2>
        <button className='text-sm py-1 px-4 rounded-md ml-4
        font-semibold text-center text-white mr-2 bg-red-500'
        onClick={backbuttonHandler}
        >Back</button>
      </nav>
         <DetailContainer detailLists={detailLists} details={consumerData}/>
    {/* <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
      <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
          Consumer Connection Details
        </h2>
      </nav>
      <Table data={consumerConnectionDetails}
       columns={consumerConnectionColumns}
        hover={true} striped={true} />
      </div> */}
      </div>
    
     
    
      <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
      <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
          Last Payment Details
        </h2>
      </nav>
     
      <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                             <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 "   htmlFor="password">
                                 Update Upto Month<p className='contents text-red-600 
                                 text-sm font-bold'>*</p>
                             </label>

                            

                             <Tooltip className="text-xs bg-transparent text-black-900 inline w-64 
                            "
                                         placement='top'
                                         
                                         animate={{
                                             mount: { scale: 1, y: 0 },
                                             unmount: { scale: 0, y: 25 },  
                                         }} >
                                         <Select 
                                         onChange={(e)=>handleMonthChange(e,'')}
                                             label="Select" 
                                             className="w-full pl-2 pr-3 py-1 font-bold text-xs 
                                               text-gray-900
                                             ">
                                             {
                                            consumerDetails[0]?.dropDown.length > 0 ?
                                                (consumerDetails[0]?.dropDown.map((item) => {
                                                    const {month,monthId, fullDate} = item
                                                    return <Option key={monthId} value={JSON.stringify(item)}>{`${month}`}</Option>
                                                })) : (<Option>Loading...</Option>)
                                        }
                                           
                                         </Select>
                                 </Tooltip>
                                 <button type='submit'
                               
                               className="w-36 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white 
                              cursor-pointer
                               transition-colors duration-200  
                               transform bg-green-400 rounded-md hover:bg-green-700 
                               focus:outline-none focus:bg-green-400"
                               onClick={viewMonthHandler}
                               >
                               View
                           </button>
                           {demandTableLoader ? (
                  <div className="m-auto h-16 w-16">
                    <ColorRing
                      visible={true}
                      height="40"
                      width="40"
                      colors={[
                        "#2fa158",
                        "#2fa158",
                        "#2fa158",
                        "#2fa158",
                        "#2fa158",
                      ]}
                    />
                  </div>
                ) : null}
                       </div>
        <Table data={displayMonth} columns={ lastPaymentDetailColumns } hover={true} striped={true} />
        </div>
        <form onSubmit={receiptSubmitHandler}>
      <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
      <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
          Receipt Details
        </h2>
      </nav> 
   
      <div className="px-4 pt-0 pb-4 m-4 bg-white rounded-none  border border-gray-500 
            lg:max-w-full">
              <div className="md:flex-1 lg:flex  
              items-end lg:justify-between">
      <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                             <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 "   htmlFor="password">
                                 Receipt No<p className='contents text-red-600 
                                 text-sm font-bold'>*</p>
                             </label>
                             <Tooltip className="text-xs bg-red-300 text-black-900 inline w-64 
                            "
                                         placement='top'
                                        
                                         animate={{
                                             mount: { scale: 1, y: 0 },
                                             unmount: { scale: 0, y: 25 },  
                                         }} >
                                         <input 
                              name="receipt_no"
                              id="receipt_no"
                              defaultValue={receiptDetail.receipt_no}
                              onChange={(e)=>handleReceiptDetails(e,"receipt_no")}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
                                 </Tooltip>
                                 
                       </div>

                       <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                             <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 "   htmlFor="password">
                                 Book No<p className='contents text-red-600 
                                 text-sm font-bold'>*</p>
                             </label>
                             <Tooltip className="text-xs bg-red-300 text-black-900 inline w-64 
                            "
                                         placement='top'
                                        
                                         animate={{
                                             mount: { scale: 1, y: 0 },
                                             unmount: { scale: 0, y: 25 },  
                                         }} >
                                          <input 
                               name="book_no"
                               id="book_no"
                               defaultValue={receiptDetail.book_no}
                               onChange={(e)=>handleReceiptDetails(e,"book_no")}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
                                 </Tooltip>
                                
                       </div>
                    </div> 

                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                             <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 "   htmlFor="password">
                                 Receipt Date<p className='contents text-red-600 
                                 text-sm font-bold'>*</p>
                             </label>
                             <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                  <DesktopDatePicker
                                    // label="Date desktop"
                                    // onChange={(e)=>handlePaymentDetails(e, "chequeDDDate")}
                                    name="receipt_date"
                              id="receipt_date"
                              value={receiptDetail.receipt_date}
                              onChange={(e)=>handleReceiptDetails(e,"receipt_date")}
                                    inputFormat="YYYY-MM-DD"
                                    renderInput={(params) => <TextField {...params} />}
                                    // value={paymentDetail.chequeDDDate}
                                  />
                                </Stack>
                              </LocalizationProvider>
                                 
                       </div>


                       
      <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                             <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 "   htmlFor="password">
                                 Upload Receipt<p className='contents text-red-600 
                                 text-sm font-bold'>*</p>
                             </label>
                             <input 
                              onChange={(e)=>handleReceiptDetails(e,"file")}
                                            className="text-xs form-control
                                            block
                                            w-full
                                            px-3
                                            py-2
                                            font-normal
                                            text-gray-900
                                            bg-white bg-clip-padding 
                                            border border-solid border-gray-400
                                            rounded
                                            transition
                                            ease-in-out
                                            m-0
                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file"
                                            id="owner_file" 
                                           
                                            name='file'
                                          
                                           // defaultValue={nigam_emp_doc}
                                            accept="image/*"
                                            />
                                 
                       </div>

                      
                     
                </div>
                </div>
               
               
                <button type='submit'
                               
                               className="w-36 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white 
                              cursor-pointer
                               transition-colors duration-200  
                               transform bg-green-400 rounded-md hover:bg-green-700 
                               focus:outline-none focus:bg-green-400"
                             
                               >
                               Upload
                           </button>
                           {paymentLoader ? (
                  <div className="m-auto h-16 w-16">
                    <ColorRing
                      visible={true}
                      height="40"
                      width="40" 
                      colors={[
                        "#2fa158",
                        "#2fa158",
                        "#2fa158",
                        "#2fa158",
                        "#2fa158",
                      ]}
                    />
                  </div>
                ) : null}
                           </form>
        </> : <></>
      }
    </div>
    </>
  )
}

export default MainPageUserChargesLastPaymentUpdate