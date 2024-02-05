import React, { useEffect, useState } from 'react'
import { Select, Option, Button, Textarea, Checkbox, Tooltip, Switch } from "@material-tailwind/react";
import { consumerConnectionDetails, consumerUnitRateDetails, lastPaymentDetails, wardData } from '../../utils/common';
import Table from '../../utils/Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

const UserDetailsContainer = ({title,consumerdetailLists,addressdetailLists}) => {
console.log(consumerdetailLists,addressdetailLists)
    const consumerUnitRateColumns  = [
        { field: "unitrate", header: "Unit Rate" },
        { field: "extracharge", header: "Extra Charge" },
        { field: "dateOfEffect", header: "Date of Effect" },
        { field: "status", header: "Status" },
    ]
 const [consmerdetailList, setconsumerdetailList] = useState(consumerdetailLists) 
 const [consumerNo, setConsumerNo] = useState('')
 const [consumerName, setConsumerName] = useState('')  
 const [mobileNo, setMobileNo] = useState('')
 const [houseFlatNo, setHouseFlatNo] = useState('')
 const [consumerType, setConsumerType] = useState('')
 const [guardianName, setGuardianName] = useState('')
 const [relation, setRelation] = useState('') 
 
 const[wardNo, setWardNo] = useState('') 
 const [holdingno, setHoldingNo] = useState('') 
 const [address, setAddress] = useState('')
 const [landmark, setLandMark] = useState('')
 const [policeStation, setPoliceStation] = useState('')
 const [editDetails, seteditDetails] = useState(true)
 const [editDetailsBtn, seteditDetailsBtn] = useState(true)
 useEffect(()=>{
 // console.log(consmerdetailList,consmerdetailList.length, "consmerdetailList")
 
  if(consumerdetailLists.length > 0){
    const selectedRelation = document.getElementById("selectedRelation")
    setConsumerNo(consumerdetailLists[0].consumer_no)
    setConsumerName(consumerdetailLists[0].consumer_name)
    setMobileNo(consumerdetailLists[0].mobile_no) 
    setHouseFlatNo(consumerdetailLists[0].house_flat_no)
    setConsumerType(consumerdetailLists[0].consumer_type) 
    setGuardianName(consumerdetailLists[0].gradian_name) 
    // setRelation(consumerdetailLists[0].relation)
    selectedRelation.innerHTML = consumerdetailLists[0].relation
  }
  if(addressdetailLists.length > 0){
    const categoryElement = document.getElementById("wardNameId");
    categoryElement.innerHTML = addressdetailLists[0].ward_no
    // setWardNo(addressdetailLists[0].ward_no)
    setHoldingNo(addressdetailLists[0].holding_no) 
    setAddress(addressdetailLists[0].address) 
    setLandMark(addressdetailLists[0].land_mark)
    setPoliceStation(addressdetailLists[0].police_station)
  }
 },[consumerdetailLists, addressdetailLists])
 
 useEffect(()=>{
  console.log(wardNo,"wardNo")
 },[wardNo])
 const test = () => {}
 const changeHandler = (e,id) => {

  // if(id.includes("wardNo")){
  //   setWardNo(e.target.value)
  // }
  if (e.toString().includes("ward_name")) {
    console.log('clk')
    let wardItem = JSON.parse(e)
    let wardId = wardItem.id
    // console.log(wardItem)
    const categoryElement = document.getElementById("wardNameId");
    categoryElement.innerHTML = wardItem.ward_name
    setWardNo(wardId)
  }
  else  if(id.includes("holdingno")){
    setHoldingNo(e.target.value)
  }
  else  if(id.includes("address")){
    setAddress(e.target.value)
  }
  else  if(id.includes("landmark")){
    setLandMark(e.target.value)
  }
  else  if(id.includes("policeStation")){
    setPoliceStation(e.target.value)
  }
  else{
  }
  seteditDetails(false)

 }
 
 const changeDetailHandler = (e,id) => {

  seteditDetailsBtn(false)
  if(id.includes("consumerNo")){
    setConsumerNo(e.target.value)
  }
  else  if(id.includes("consumerName")){
    setConsumerName(e.target.value)
  }
  else  if(id.includes("mobileNo")){
    setMobileNo(e.target.value)
  }
  else  if(id.includes("house_flat_no")){
    setHouseFlatNo(e.target.value)
  }
  else  if(id.includes("consumerType")){
    setConsumerType(e.target.value)
  }
  else  if(id.includes("guardianName")){
    console.log('guardddddddd')
    setGuardianName(e.target.value)
  }
  // else  if(id.includes("relation")){
  //   setRelation(e.target.value)
  // }
  else if (id.includes("relation")) {
    const selectedRelation = document.getElementById("selectedRelation")
    let relation = e.toString().split("_")[1]
    // console.log(zoneItem)
    setRelation(relation)
    selectedRelation.innerHTML = relation
}
  else{
  }
  seteditDetails(false)

 }

 const addressSubmitHandler = async(e) => {
   e.preventDefault() 
   console.log(wardNo , addressdetailLists[0], consmerdetailList)
   let editDetails = {}
   editDetails.consumerMmasterId = addressdetailLists[0].consumer_master_id
   if(wardNo !== addressdetailLists[0].ward_no){
    editDetails.wardNo = wardNo
   }
   if(holdingno !== addressdetailLists[0].holding_no){
    editDetails.holdingNo = holdingno
   }
   if(address !== addressdetailLists[0].address){
    editDetails.address = address
   }
   if(landmark !== addressdetailLists[0].land_mark){
    editDetails.landmark = landmark
   }
   if(policeStation !== addressdetailLists[0].police_station){
    editDetails.policeStation = policeStation
   }
  
   console.log(editDetails)

   try {
    const paymentReceiptDetailsGetUrl = `${BACKEND_BASE_URL}/wastemanagement/consumerAddress`
    const requestOptions = {
        method: "PUT",
        headers: { 
          'Content-Type': 'application/json', 
          // 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}`
         },
         body: JSON.stringify({
          ...editDetails
       }),
    }
    let response = null, responseBody = null 
    response = await fetch(paymentReceiptDetailsGetUrl, requestOptions)
    responseBody = await response.json()
    console.log("edit area", response, responseBody)
   
    if (response?.status == '200') {
      console.log('200',responseBody)
      // setLoader(false)
      // setSearchConsumerDetailResult(responseBody.data)
       toast.success("Details edited successfully!", {
          position: toast.POSITION.TOP_CENTER
          });  
    } else {
      toast.error("Edit failed!", {
        position: toast.POSITION.TOP_CENTER
        });  
    }
} catch (err) {
    console.error(err)
    toast.error("Edit failed!", {
      position: toast.POSITION.TOP_CENTER
      });  
}
finally {
  //setLoader(false)
} 
 }

 const detailSubmitHandler = async(e) => {
  e.preventDefault() 
  console.log(consumerdetailLists[0])
  let editDetails = {}
  editDetails.consumerDetailsId = consumerdetailLists[0].consumer_details_id
  // if(consumerNo !== consumerdetailLists[0].consumer_no){
  //  editDetails.consumer_no = consumerNo
  // }
  if(consumerName !== consumerdetailLists[0].consumer_name){
    editDetails.consumerName = consumerName
   }
   if(mobileNo !== consumerdetailLists[0].mobile_no){
    editDetails.mobileNo = mobileNo
   }
    if(houseFlatNo !== consumerdetailLists[0].house_flat_no){
    editDetails.houseFlatNo = houseFlatNo
   }
    if(consumerType !== consumerdetailLists[0].consumer_type){
    editDetails.consumerType = consumerType
   }
    if(guardianName !== consumerdetailLists[0].gradian_name){
    editDetails.gradianName = guardianName
   }
    if(relation !== consumerdetailLists[0].relation){
    editDetails.relation = relation
   }
  
  console.log(editDetails)

  try {
    const paymentReceiptDetailsGetUrl = `${BACKEND_BASE_URL}/wastemanagement/consumerDetails`
    const requestOptions = {
        method: "PUT",
        headers: { 
          'Content-Type': 'application/json', 
         
         },
         body: JSON.stringify({
          ...editDetails
       }),
    }
    let response = null, responseBody = null 
    response = await fetch(paymentReceiptDetailsGetUrl, requestOptions)
    responseBody = await response.json()
    console.log("edit detail", response, responseBody)
   
    if (response?.status == '200') {
      console.log('200',responseBody)
      toast.success("Edited successfully!", {
        position: toast.POSITION.TOP_CENTER
        });  
    } else {
      toast.error("Edit failed!", {
        position: toast.POSITION.TOP_CENTER
        });  
    }
} catch (err) {
  toast.error("Edit failed!", {
    position: toast.POSITION.TOP_CENTER
    });  
   
}
finally {
 
} 

 }
  return (
    <>
      <ToastContainer autoClose={2000}/>
     <>
      {/* <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
          {title}
        </h2>
        <button className='text-sm py-1 px-4 rounded-md ml-4
        font-semibold text-center text-white mr-2 bg-red-500'
      
        >Back</button>
      </nav> */}

      <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black mt-3 rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
          Area Details
        </h2>
      </nav>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-2.5 lg:w-full inline-block align-middle">
            <form onSubmit={addressSubmitHandler}>
            <div className="overflow-hidden">
           
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3 px-2 py-3 md:px-6">
        <div className='py-2 text-xs font-normal  text-gray-700 whitespace-normal flex gap-3 '>
         <span>Ward No</span> 
        
                <Select 
                  onChange={(e)=> changeHandler(e, "wardNo")}
                                     name="ward_name"
                                    defaultValue={wardNo}
                                    id="wardNameId"
                                         label="" 
                                         className="pl-2 pr-3 py-2 font-bold text-xs text-gray-900">
                                       
                                        {
                                          
                                            wardData.length > 0 ?
                                                (wardData.map((item) => {
                                                    const {id,zone_mstr_id,ward_name,area_name,stampdate,user_id,status} = item
                                                    return <Option key={id} 
                                                    value={JSON.stringify(item)}
                                                    >{`${ward_name}`}</Option>
                                                })) : (<Option>Loading...</Option>)
                                        }
                  </Select>
                  {/* <select defaultValue={'DEFAULT'} >
        <option value="DEFAULT" disabled>Choose a salutation ...</option>
        <option value="1">Mr</option>
        <option value="2">Mrs</option>
        <option value="3">Ms</option>
        <option value="4">Miss</option>
        <option value="5">Dr</option>
      </select> */}


        </div>
        <div className='py-2 text-xs font-normal  text-gray-700 whitespace-normal flex gap-3 '>
        <span>Holding No</span> 
         <input 
                              name="holdingno"
                              id="holdingno"
                             defaultValue={holdingno}
                             onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                             maxLength='10'
                             onChange={(e)=> changeHandler(e, "holdingno")}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3 px-2 py-3 md:px-6">
        <div className='py-2 text-xs font-normal  text-gray-700 whitespace-normal flex gap-3 '>
         <span>Address</span> 
         <input 
                              name="address"
                              id="address"
                             defaultValue={address}
                            onChange={(e)=> changeHandler(e,"address")}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
        </div>
        <div className='py-2 text-xs font-normal  text-gray-700 whitespace-normal flex gap-3 '>
        <span>Landmark</span> 
         <input 
                              name="landmark"
                              id="landmark"
                              defaultValue={landmark}
                              onChange={(e)=> changeHandler(e,"landmark")}
                          
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
        </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3 px-2 py-3 md:px-6">
        <div className='py-2 text-xs font-normal  text-gray-700 whitespace-normal flex gap-3 '>
         <span>Police Station</span> 
         <input 
                              name="policeStation"
                              id="policeStation"
                            defaultValue={policeStation}
                          onChange={(e)=> changeHandler(e,"policeStation")}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
        </div>
       
        </div>
        <button type='submit'
                               
                               className={`w-36 h-8 px-4 py-1  mb-2 tracking-wide text-white 
                               text-center mr-auto
                               transition-colors duration-200  
                               transform bg-green-400 rounded-md hover:bg-green-700 
                               focus:outline-none focus:bg-green-400  
                               ${editDetails ? `cursor-not-allowed ` : `cursor-pointer`}
                               `}
                              disabled={editDetails}
                               >
                               Edit
                           </button>
        </div>
        </form>
        </div>
        </div>
        </div>



        <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black mt-3 rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
          Consumer Details
        </h2>
      </nav>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-2.5 lg:w-full inline-block align-middle">
            <form onSubmit={detailSubmitHandler}>
            <div className="overflow-hidden">
           
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3 px-2 py-3 md:px-6">
        <div className='py-2 text-xs font-normal  text-gray-700 whitespace-normal flex gap-3 '>
         <span>Consumer No</span> 
         <input 
                              name="narration"
                              id="narration"
                               defaultValue={consumerNo}
                          // onChange={(e)=> changeDetailHandler(e, "consumerNo")}
                          disabled
                                className="bg-gray-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
        </div>
        <div className='py-2 text-xs font-normal  text-gray-700 whitespace-normal flex gap-3 '>
        <span>Consumer Name</span> 
         <input 
                              name="narration"
                              id="narration"
                              defaultValue={consumerName}
                              onChange={(e)=> changeDetailHandler(e, "consumerName")}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3 px-2 py-3 md:px-6">
        <div className='py-2 text-xs font-normal  text-gray-700 whitespace-normal flex gap-3 '>
         <span>Mobile no</span> 
         <input 
                              name="narration"
                              id="narration"
                              defaultValue={mobileNo}
                              onChange={(e)=> changeDetailHandler(e, "mobileNo")}
                              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                              maxLength='10'
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
        </div>
        <div className='py-2 text-xs font-normal  text-gray-700 whitespace-normal flex gap-3 '>
        <span>House/Flat no</span> 
        <input 
                              name="narration"
                              id="narration"
                              defaultValue={houseFlatNo}
                              onChange={(e)=> changeDetailHandler(e, "house_flat_no")}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
        </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3 px-2 py-3 md:px-6">
        <div className='py-2 text-xs font-normal  text-gray-700 whitespace-normal flex gap-3 '>
         <span>Consumer type</span> 
         <input 
                              name="narration"
                              id="narration"
                              defaultValue={consumerType}
                              // onChange={(e)=> changeDetailHandler(e, "consumerType")}
                              disabled
                                className="bg-gray-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
        </div>
       
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3 px-2 py-3 md:px-6">
        <div className='py-2 text-xs font-normal  text-gray-700 whitespace-normal flex gap-3 '>
         <span>Guardian name</span> 
         <input 
                              name="narration"
                              id="narration"
                              defaultValue={guardianName}
                              onChange={(e)=> changeDetailHandler(e, "guardianName")}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
        </div>
        <div className='py-2 text-xs font-normal  text-gray-700 whitespace-normal flex gap-3 '>
        <span>Relation</span> 
        <Select 
                                          onChange={(e)=>changeDetailHandler(e,'relation')}
                                             label="" 
                                             id={`selectedRelation`}
                                             className="w-full pl-2 pr-3 py-1 font-bold text-xs 
                                               text-gray-900
                                             ">
                                             <Option value='relation_M/O' >M/O</Option>
                                             <Option value='relation_F/O' >F/O</Option>
                                             <Option value='relation_S/O' >S/O</Option>
                                             <Option value='relation_D/O' >D/O</Option>
                                             <Option value='relation_W/O' >W/O</Option>
                                             <Option value='relation_C/O' >C/O</Option>
                                         </Select>
        </div>
        <div className='py-2 text-xs font-normal  text-gray-700 whitespace-normal flex gap-3 '>
        <button type='submit'
                               
                               className={`w-36 h-8 px-4 py-1  mb-2 tracking-wide text-white 
                               text-center mr-auto
                               transition-colors duration-200  
                               transform bg-green-400 rounded-md hover:bg-green-700 
                               focus:outline-none focus:bg-green-400  
                               ${editDetailsBtn ? `cursor-not-allowed ` : `cursor-pointer`}
                               `}
                              disabled={editDetailsBtn}
                               >
                               Edit
                           </button>
            </div>
        </div>


      
        </div>
        </form>
        </div>
        </div>
        </div>


        
        {/* <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black mt-3 rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
          Demand Details
        </h2>
      </nav>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-2.5 lg:w-full inline-block align-middle">
            <div className="overflow-hidden">
           
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3 px-2 py-3 md:px-6">
        <div className='py-2 text-xs font-normal  text-gray-700 whitespace-normal flex gap-3 '>
         <span>Consumer Category</span> 
         <input 
                              name="narration"
                              id="narration"
                            //   defaultValue={mobileNo.narration}
                            //   onChange={(e)=>handlemobileNos(e,"narration")}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
        </div>
        <div className='py-2 text-xs font-normal  text-gray-700 whitespace-normal flex gap-3 '>
        <span>Consumer Range Date</span> 
         <input 
                              name="narration"
                              id="narration"
                            //   defaultValue={mobileNo.narration}
                            //   onChange={(e)=>handlemobileNos(e,"narration")}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3 px-2 py-3 md:px-6">
        <div className='py-2 text-xs font-normal  text-gray-700 whitespace-normal flex gap-3 '>
         <span>Mobile no</span> 
         <input 
                              name="narration"
                              id="narration"
                            //   defaultValue={mobileNo.narration}
                            //   onChange={(e)=>handlePaymentDetails(e,"narration")}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
        </div>
        <div className='py-2 text-xs font-normal  text-gray-700 whitespace-normal flex gap-3 '>
        <span>Monthly Amount</span> 
         <input 
                              name="narration"
                              id="narration"
                            //   defaultValue={paymentDetail.narration}
                            //   onChange={(e)=>handlePaymentDetails(e,"narration")}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
        </div>
        </div>
        </div>
        </div>
        </div> 
        </div> */}

        {/* <div className="px-0 pt-0 pb-0 bg-white rounded-none  border border-gray-500 lg:max-w-full">
      <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
          Consumer Unit Rate Details
        </h2>
      </nav>
      <Table data={consumerUnitRateDetails} columns={consumerUnitRateColumns} hover={true} striped={true} />
      </div> */}


        




      </>
    </>
  )
}

export default UserDetailsContainer