
import React, { Component, useEffect, useState,useRef } from 'react'
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
const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL


const MainPagePropertyLastPaymentUpdate  = () => {
    const searchConsumerDetails = {                 
        ward_id:'',
        property_no:'',
        ConsumerNo:'',
        MobileNUmber:'',
        owner_name:'',
        } 
         
// const details = [
//     {
//     Consumerno : "PC00GYF78787",
//     },
//     ]
    
//     const detailLists = ["Consumerno", "Holdingno"]
const backbuttonHandler = () =>{
  setDisplayTable(true) 
 
  setDisplayDetails(false) 
 
  setToggle(true)
}

    const details = [
        {
        "consumerno" : "PC00GYF78787",
        consumername: "Namrata Das",
        oldconsumerno: "Old Consumer no",
        mobileno: "9101043391",
        gaurdianname: "Guardian name",
        wardno: "Ward no",
        holdingno: "Holding no",
        propertytype: "Property type",
        propertyaddress : "Property address"
        },
        ]

    const detailLists = [
        { field: "wardNo", header: "Ward no" },
        { field: "propertyNo", header: "Property No" },
        { field: "propertyAddress", header: "Property Address" },
        { field: "mohalla", header: "Mohalla" },
        { field: "gaurdianname", header: "Guardian name" },
        { field: "entryType", header: "Entry Type" },
        { field: "totalArea", header: "Total Area" },
        { field: "orderDate", header: "Order Date" },
        { field: "plotNo", header: "Plot No" },
        { field: "khataNo", header: "Khata No" },
        { field: "memoNo", header: "Memo No" },
      ];
    
        const columns = [
            { field: "id", header: "Sl No" },
            { field: "property_no", header: "Property No" },
            { field: "owner_name", header: "Owner Name" },
            { field: "ward_name", header: "Ward No" },
            { field: "view", header: "View" },
          ]; 

        const consumerConnectionColumns = [
            { field: "guardian_name", header: "Guardian Name" },
            { field: "owner_name", header: "Owner Name" },
            { field: "relation", header: "Relation" },
          
        ]

      

        const consumerUnitRateColumns  = [
            { field: "id", header: "Sl No" },
            { field: "effect_from", header: "Effect From" },
            { field: "property_tax", header: "Property Tax" },
            { field: "sanitation_tax", header: "Sanitation Tax" },
            { field: "composite_tax", header: "Composite Tax" },
            { field: "common_wtr_tax", header: "Common Water Tax" },
            { field: "personal_wtr_tax", header: "Personal Water Tax" },
            { field: "education_cess", header: "Education Cess" },
            { field: "otheramt", header: "Other Amount" },
            { field: "tot_yearly_tax", header: "Yearly Tax" },
        ]

        const lastPaymentDetailColumns = [
            { field: "year", header: "Year" },
            { field: "dueDate", header: "Due Date" },
            { field: "amount", header: "Amount" },
            { field: "penalty", header: "Penalty" },
        ]
        const receiptDetails = { 
          receipt_no:'',
          receipt_date:'',
          book_no:'',
          file:null
        }
    const [searchConsumerDetail, setSearchConsumerDetail] = useState(searchConsumerDetails); 
    const [searchConsumerDetailResult, setSearchConsumerDetailResult] = useState(null)
    const [searchConsumer, setsearchConsumer] = useState([]) 
    const [toggle, setToggle] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [loader, setLoader] = useState(false) 
    const [displayTable, setDisplayTable] = useState(false)
    const [displayDetails, setDisplayDetails] = useState(false)
    const [consumerDetails, setConsumerDetails] = useState([])  
    const [tableData, setTableData] = useState()
    const [consumerData,setConsumerData] = useState([]) 
    const [ownerDetails, setOwnerDetails] = useState([])
    const [tax, setTax] = useState([])
    const [lastPaymentDropdown, setLastPaymentDropdown] = useState([])
    const [year, setYear] = useState('')
    const [fetchedYear,setFetchedYear] = useState([]) 
    const [receiptDetail, setReceiptDetail] = useState(receiptDetails)
    const [demandTableLoader, setDemandTableLoader] = useState(false);
    const [paymentLoader, setPaymentLoader] = useState(false); 

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
    console.log(fetchedYear)
  },[fetchedYear])

  useEffect(()=>{
    console.log(searchConsumerDetail)
  },[searchConsumerDetail])
    const handleSearchQueryChange = (e,id) => {
      console.log(e)
        if (id.includes("ward_name")) {
            let wardItem = JSON.parse(e)
          console.log(wardItem)
            setSearchConsumerDetail((prevState) => {
              return {
                ...prevState,
                ward_id: wardItem.id
              }
            })
          }
          else if (id.includes("name")) {
          
            setSearchConsumerDetail((prevState) => {
              return {
                ...prevState,
                owner_name: e.target.value
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

      const receiptSubmitHandler = async(e) => { 
        e.preventDefault()
        console.log(receiptDetail, consumerData)
        setPaymentLoader(true)
        const formData = new FormData(); 
       
        formData.append("propertyNo", consumerData[0]?.propertyNo)
        formData.append("receiptNo",receiptDetail?.receipt_no) 
        formData.append("bookNo",receiptDetail?.book_no) 
        formData.append("receiptDate", receiptDetail?.receipt_date )
        // formData.append("frm_month",consumerDetails[0]?.dropDown[0]?.fullDate) 
        // formData.append("upto_month",SwapStringPlaces(month?.monthId))  
        // formData.append("upto_month", "02-2018")  
        formData.append("fromYear",consumerDetails?.upToYear)  
        formData.append("upToYear", year ) 
        formData.append("userId",getCookieByName('SUDA_USER_ID'))  
        formData.append("totalAmount", fetchedYear[0]?.amount )
        formData.append("fineAmount", fetchedYear[0]?.penalty) 
        formData.append("file", receiptDetail?.file)  

        // console.log(
        // "consumer_details_id",formData.get("consumer_details_id"),
        // "receipt_no",formData.get("receipt_no"), 
        // "book_no",formData.get("book_no"),
        // "receipt_date",formData.get("receipt_date"),
        // "frm_month",formData.get("frm_month"),
        // "upto_month",formData.get("upto_month"), 
        // "fromDate",formData.get("fromDate"),
        // "upToDate",formData.get("upToDate"),
        // "user_id",formData.get("user_id"),
        // "tot_amount",formData.get("tot_amount"),
        // "file",formData.get("file")
        // )
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
          const safNewEntryUrl = `${SUDA_API_BASE_URL}/user/property/lastPaymentUpdate`
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

    const updateBasicDetailFormHandler = async(e) => {
  
        e.preventDefault()
        console.log('clicked')
        console.log(searchConsumerDetail)
           setLoader(true)
        // setTemp('Loading...')
                  try {
                      const paymentReceiptDetailsGetUrl = `${SUDA_API_BASE_URL}/searchAllProperty?property_no=${searchConsumerDetail.property_no}&ward_id=${searchConsumerDetail.ward_id}&owner_name=${searchConsumerDetail.owner_name}`
                      
                      const requestOptions = {
                          method: "GET",
                          headers: { 
                            'Content-Type': 'application/json',
                             'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
                      }
                      let response = null, responseBody = null 
                      response = await fetch(paymentReceiptDetailsGetUrl, requestOptions)
                      responseBody = await response.json()
                      console.log("Search consumer", response, responseBody)
                     
                      if (response?.status == '200' &&  responseBody.length > 0) {
                        setLoader(false)
                        console.log('200',responseBody)
                        setSearchConsumerDetailResult(responseBody)
                      } 
                      else if (response?.status == '200' && responseBody.length === 0) {
                        toast.error("No records found.!!!", {
                          position: toast.POSITION.TOP_CENTER
                          });  
                        setLoader(false)
                        
                      }
                      else {
                        toast.error("Failed to fetch details ..!!!", {
                          position: toast.POSITION.TOP_CENTER
                          });  
                      }
                  } catch (err) {
                      console.error(err)
                      setLoader(false)
                  }
                  finally {
                  } 
                
                  setSearchConsumerDetail(prevState => {
                    return { ...prevState,  
                    property_no : '', 
                    // ConsumerNo:'',
                    ward_id:'',
                    owner_name:''
                  }
          })
      }   

      const viewMonthHandler = async() => {
    
        setDemandTableLoader(true);
        console.log("consumerData", consumerData[0]?.propertyNo, year)
        try {
          const paymentReceiptDetailsGetUrl = `${SUDA_API_BASE_URL}/user/property/lastPaymentDetails?propertyNo=${consumerData[0]?.propertyNo}&upToYear=${year}`
          const requestOptions = {
              method: "GET",
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
          }
          let response = null, responseBody = null 
          response = await fetch(paymentReceiptDetailsGetUrl, requestOptions)
          responseBody = await response.json()
          console.log("view result", response, responseBody)
          let arr = []
          if (response?.status == '200') {
            console.log('200',responseBody)
            arr.push(responseBody)
            setFetchedYear(arr)
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
        console.log(searchConsumerDetailResult,"searchConsumerDetailResult")
        let arr = []
          if(searchConsumerDetailResult?.length > 0){
           setDisplayTable(true)
           searchConsumerDetailResult.map((testData,index) => {
            let val ={}
            val.id = index + 1
            val.property_no = testData?.property_no
            val.owner_name = testData?.owner_name 
            val.ward_name = testData?.ward_name
            val.view =  <button type='button' className='h-6 w-16 px-2 py-1 bg-green-700
             text-white rounded custom_button_add'  
             onClick={()=>viewConsumerDetailHandler(val.property_no)}
             >View</button>
            arr.push(val)
          },
          )}
         setsearchConsumer(arr)
         },[searchConsumerDetailResult]) 

         const viewConsumerDetailHandler = async(id)=>{
        
          //setFetchedData(data)
          setLoader(true)
        
          try {
            const searchDetails = 
             `${SUDA_API_BASE_URL}/user/property/lastPaymentView?propertyNo=${id}`
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
              setDisplayDetails(true)
              setToggle(false)
           
              console.log("receipt in main form 200", response, responseBody)
              setConsumerDetails(responseBody)
              setDisplayTable(false) 
              
            } else {
              //setLoader(false)
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
        console.log("consumerDetails consumerDetails", consumerDetails, consumerDetails?.length)
        let arr = [], ownerarr = [], taxArr = []
        if(consumerDetails){
        //  consumerDetails.map((testData,index) => {
           let val ={}, owner = {}
          //  val.id = index + 1
           val.wardNo = consumerDetails?.wardNo
           val.propertyNo = consumerDetails?.propertyNo 
           val.propertyAddress = consumerDetails?.propertyAddress
           val.mohalla = consumerDetails?.mohalla
           val.entryType = consumerDetails?.entryType 
           val.totalArea = consumerDetails?.totalArea 
           val.orderDate = consumerDetails?.orderDate 
           val.plotNo = consumerDetails?.plotNo 
           val.khataNo = consumerDetails?.khataNo 
           val.memoNo = consumerDetails?.memoNo 
           val.gaurdianname = consumerDetails?.ownerDetails?.guardian_name

           owner.guardian_name = consumerDetails?.ownerDetails?.guardian_name
           owner.owner_name = consumerDetails?.ownerDetails?.owner_name
           owner.relation = consumerDetails?.ownerDetails?.relation
           arr.push(val)
           ownerarr.push(owner)
        //  },
         }
         if(consumerDetails?.taxDetails?.length > 0){
          consumerDetails?.taxDetails.map((testData, index) => {
            let val = {} 
            val.id = index +1
            val.effect_from = testData?.effect_year 
            val.property_tax = testData?.property_tax 
            val.sanitation_tax = testData?.sanitation_tax 
            val.composite_tax = testData?.composite_tax 
            val.common_wtr_tax = testData?.common_wtr_tax 
            val.personal_wtr_tax = testData?.personal_wtr_tax 
            val.education_cess = testData?.education_cess 
            val.otheramt = testData?.otheramt 
            val.tot_yearly_tax = testData?.tot_yearly_tax 
            taxArr.push(val)
          })
         }
         if(consumerDetails?.upToYear?.length > 0){
          setLastPaymentDropdown(consumerDetails?.upToYear)
         }
       
         console.log(arr)
        setConsumerData(arr)
        setOwnerDetails(ownerarr)
        setTax(taxArr)
      },[consumerDetails])

      useEffect(()=>{
        console.log(lastPaymentDropdown)
      },[lastPaymentDropdown])
      // useEffect(()=>{
      //   console.log('searching...', searchConsumerDetail)
      //  if((searchConsumerDetail.ward_id !=='' || searchConsumerDetail.property_no !=='' || searchConsumerDetail.ConsumerNo !=='' 
      //  || searchConsumerDetail.MobileNUmber !=='' || searchConsumerDetail.name !==''))
      //  {
      //   setDisabled(false)
      //  }
      //  else if((searchConsumerDetail.ward_id !=='' && searchConsumerDetail.ConsumerNo !=='' ) )
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
      // },[searchConsumerDetail.ward_id,searchConsumerDetail.property_no,searchConsumerDetail.ConsumerNo,
      //   searchConsumerDetail.MobileNUmber,searchConsumerDetail.name])

      const handleMonthChange = (e) => {
        let wardItem = JSON.parse(e)
          setYear(wardItem)
        
      }

      useEffect(()=>{
        console.log('searching...', searchConsumerDetail)
       if((searchConsumerDetail.ward_id !=='' || searchConsumerDetail.property_no !=='' || 
      //  searchConsumerDetail.ConsumerNo !=='' 
      //  || searchConsumerDetail.MobileNUmber !=='' ||
        searchConsumerDetail.owner_name !==''))
       {
        setDisabled(false)
       }
       else{
        setDisabled(true)
       }
      },[searchConsumerDetail.ward_id,searchConsumerDetail.property_no,searchConsumerDetail.owner_name])
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

           useEffect(()=>{
            console.log(consumerData,"consumerData") 
           },[consumerData])
  return (
    <>
   <ToastContainer autoClose={2000}/>
   
    <div className="relative flex flex-col justify-center  overflow-hidden mt-10 mb-10">
        {
        toggle ? <>
        <div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-mdlg:max-w-full">
        <form className="mt-4 h-screen" onSubmit={updateBasicDetailFormHandler}>
        <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md lg:max-w-full">
            <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-700 rounded-md h-10">
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
                 onChange={(e)=>handleSearchQueryChange(e,'ward_name')}
                                     name="ward_name"
                                     defaultValue={searchConsumerDetail.ward_id}
                                         label="select" 
                                         color='orange'
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
                //value={safSearchQueryParamObj.property_no}
                onChange={(e)=>handleSearchQueryChange(e,'')}
                name="property_no"
                value={searchConsumerDetail.property_no}
                  className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                  type="text" placeholder="" />
              </div>
             
              {/* <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                  Consumer No
                </label>
                <input 
                onChange={(e)=>handleSearchQueryChange(e)}
                name="ConsumerNo"
                value={searchConsumerDetail.ConsumerNo}
                  className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                  type="text" placeholder="" />
              </div> */}
              {/* <div className="mb-3 ml-3 mt-2 min-w-fit max-w-fit">
                <p className='text-red-600 text-xs font-bold'>OR</p>
              </div>
              <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                  Mobile No
                </label> 
                <input 
                onChange={(e)=>handleSearchQueryChange(e,'')}
                name="MobileNUmber"
                value={searchConsumerDetail.MobileNUmber}
                  className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                  type="text" placeholder="" />
              </div> */}
              <div className="mb-3 ml-3 mt-2 min-w-fit max-w-fit">
                <p className='text-red-600 text-xs font-bold'>OR</p>
              </div>
              <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                <label className="block text-gray-700 text-xs font-bold mb-2">
                  Name
                </label>
                <input 
                 onChange={(e)=>handleSearchQueryChange(e,'name')}
                 name="name"
                 value={searchConsumerDetail.owner_name}
                  className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
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
                          colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
         
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
         <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-mdlg:max-w-full">
        <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-700 rounded-md h-10">
        <h2 className="text-sm font-semibold text-center text-white">
        Consumer Details
        </h2>
        <button className='text-sm py-1 px-4 rounded-md ml-4
        font-semibold text-center text-white mr-2 bg-red-500'
        onClick={backbuttonHandler}
        >Back</button>
      </nav>
         <DetailContainer detailLists={detailLists} details={consumerData} />
         </div>
    <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-m lg:max-w-full">
      <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-700 rounded-md h-10">
        <h2 className="text-sm font-semibold text-center text-white">
          Owner Details
        </h2>
      </nav>
      <Table data={ownerDetails} columns={consumerConnectionColumns} hover={true} striped={true} />
      </div>
    
      <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md lg:max-w-full">
      <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-700 rounded-md h-10">
        <h2 className="text-sm font-semibold text-center text-white">
          Tax Details
        </h2> 
      </nav>
      <Table data={tax} columns={consumerUnitRateColumns} hover={true} striped={true} />
      </div>
    
      <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md lg:max-w-full">
      <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-700 rounded-md h-10">
        <h2 className="text-sm font-semibold text-center text-white">
          Last Payment Details
        </h2>
      </nav>
     
      <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                             <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 "   htmlFor="password">
                                 Update Upto Year<p className='contents text-red-600 
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
                                             color='orange'
                                             className="w-full pl-2 pr-3 py-1 font-bold text-xs 
                                               text-gray-900
                                             ">
                                             {
                                            lastPaymentDropdown?.length > 0 ?
                                                (lastPaymentDropdown?.map((item) => {
                                                    // const {month,monthId, fullDate} = item
                                                    return <Option key={item} value={JSON.stringify(item)}>{item}</Option>
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
                        "#ff0000",
                        "#ff0000",
                        "#ff0000",
                        "#ff0000",
                        "#ff0000",
                      ]}
                    />
                  </div>
                ) : null}
                           
                       </div>
        <Table data={fetchedYear} columns={ lastPaymentDetailColumns } hover={true} striped={true} />
        </div>
        <form onSubmit={receiptSubmitHandler}>
      <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md   lg:max-w-full">
      <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-700 rounded-md h-10">
        <h2 className="text-sm font-semibold text-center text-white">
          Receipt Details
        </h2>
      </nav> 
    
      <div className="px-4 pt-0 pb-4 m-4 bg-white rounded-none  
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
                        focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
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
                        focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
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
                                     name="receipt_date"
                                     id="receipt_date"
                                     color='orange'
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
                                            focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none" type="file"
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
                        "#ff0000",
                        "#ff0000",
                        "#ff0000",
                        "#ff0000",
                        "#ff0000",
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

export default MainPagePropertyLastPaymentUpdate 