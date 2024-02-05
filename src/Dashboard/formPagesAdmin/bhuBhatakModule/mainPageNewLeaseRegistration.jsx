import React, { Component, useEffect, useState } from 'react'
import { addExistingConsumerMsgList,safInputValidatorMsgList } from '../../../Dashboard/data/saf-input-validator-list'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { convertDateToAPIFormat,convertDateFormat  } from '@/utils/commonUtils';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { CirclesWithBar, ColorRing } from 'react-loader-spinner'
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import { Select, Option, Button, Textarea, Checkbox, Tooltip, Switch } from "@material-tailwind/react";
import { paymentDetails, wardData } from '../utils/common';
import { getCookieByName } from '@/utils/RequireAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL
console.log(BACKEND_BASE_URL, "URL")
const NewLeaseRegistration = () => {
  const currUrl = window.location.href.toLowerCase()
  
  const isPublicSAF = currUrl.includes("dashboard") ? false : true
  const personalDetails = {                   
    honorific: '',
    name: '', 
    gender:'', 
    guardian_name:'',
    guardian_relation: '',
    mobile_number:'',
    aadhar_number: '',
    email_id: '',
    pan_number: ''
    }

    const landDetails = {
      area_name:'',
      ward_number:'',
      address:'',
      lease_number:'',
      registration_date:'',
      usage_type:'',
      plot_area:'',
      bhu_bhatak_rate:'',
      demand_amount:''
    }
  const [personalDetail, setPersonalDetail] = useState(personalDetails); 
  const [demandLoader, setDemandLoader] = useState(false)
  const [landDetail, setLandDetail] = useState(landDetails)
  const [disabled, setDisabled] = useState(true)
  useEffect(()=>{
    console.log(personalDetail, landDetail)
  },[personalDetail, landDetail])

  
  useEffect(()=>{

   if((personalDetail.honorific !== '' && personalDetail.name !=='' && personalDetail.gender!=='' && 
   personalDetail.guardian_name!=='' && personalDetail.guardian_relation!=='' && personalDetail.mobile_number!=='' 
   && landDetail.area_name !=='' && landDetail.ward_number !=='' && landDetail.address !=='' 
   && landDetail.lease_number !=='' && landDetail.registration_date !=='' && landDetail.usage_type 
   && landDetail.demand_amount !=='' ))
   {
    setDisabled(false)
   }
   else{
    setDisabled(true)
   }
  },[personalDetail.honorific , personalDetail.name  , personalDetail.gender, 
  personalDetail.guardian_name , personalDetail.guardian_relation , personalDetail.mobile_number  
  , landDetail.area_name , landDetail.ward_number , landDetail.address
  , landDetail.lease_number ,  landDetail.registration_date ,landDetail.usage_type, landDetail.demand_amount])

  const handleNewLeaseRegistrationHandler = (e,id) => {
    if (e.toString().includes("honorific")) {
      let honorific = e.toString().split("_")[1]
      setPersonalDetail((prevState) => {
          return {
              ...prevState,
              honorific: honorific
          }
      })
  }
  else if (e.toString().includes("gender")) {
    let gender = e.toString().split("_")[1]
    setPersonalDetail((prevState) => {
        return {
            ...prevState,
            gender: gender
        }
    })
 }
 else if (e.toString().includes("relation")) {
  let relation = e.toString().split("_")[1]
  setPersonalDetail((prevState) => {
      return {
          ...prevState,
          guardian_relation:relation
      }
  })
}
   else{
        setPersonalDetail({
        ...personalDetail,                                // spreading the unchanged values
        [e.target.name]: e.target.value,          // changing the state of *changed value*
      });
    }
  }

  const handleNewLeaseLandDetailsHandler = (e,id) => {
   if (e.toString().includes("usage")) {
  let usage = e.toString().split("_")[1]
  setLandDetail((prevState) => {
      return {
          ...prevState,
          usage_type:usage
      }
  })
}
else if (e.toString().includes("ward_name")) {
  const propertyTypeItem = JSON.parse(e)
  const pN = parseInt(propertyTypeItem.id)
  setLandDetail((prevState) => {
     return {
          ...prevState,
          ward_number:pN
      }
    })
  }
  else if (id.includes("registration_date")) {
    setLandDetail(prevState => {
      //const v = convertDateFormat(e.$d)
      const v = convertDateToAPIFormat(e.$d)
      console.log("DATE IN MAIN", v)
      
      return { ...prevState, registration_date: v }
    })
}
   else{
        setLandDetail({
        ...landDetail,                                // spreading the unchanged values
        [e.target.name]: e.target.value,          // changing the state of *changed value*
      });
    }
  }

  const newLeaseRegistrationHandler = async (e) => {
    e.preventDefault() 
    setDemandLoader(true)
    let personal = {}, land = {}
    personal.honorific = personalDetail.honorific 
    personal.name = personalDetail.name 
    personal.gender = personalDetail.gender 
    personal.guardian_name = personalDetail.guardian_name 
    personal.guardian_relation = personalDetail.guardian_relation 
    personal.mobile_number = personalDetail.mobile_number 
    if(personalDetail.aadhar_number !== ''){
        personal.aadhar_number = personalDetail.aadhar_number
    }
    if(personalDetail.email_id !== ''){
        personal.email_id = personalDetail.email_id
    }
    if(personalDetail.pan_number !== ''){
        personal.pan_number = personalDetail.pan_number
    }
    
    land.area_name = landDetail.area_name 
    land.ward_number = landDetail.ward_number 
    land.address = landDetail.address 
    land.lease_number = landDetail.lease_number 
    land.registration_date = landDetail.registration_date 
    land.usage_type = landDetail.usage_type 
    land.demand_amount = landDetail.demand_amount
    if(landDetail.plot_area !== ''){
        land.plot_area = landDetail.plot_area
    }
    if(landDetail.bhu_bhatak_rate !== ''){
        land.bhu_bhatak_rate = landDetail.bhu_bhatak_rate
    } 
   
    const userId = getCookieByName('SUDA_USER_ID') 
    let details = {...personal, ...land}
    try {
      
        const requestOptions = {
            method: "POST",
            headers: { 
            'Content-Type': 'application/json',
            //  'Authorization': 
            // `Bearer ${getCookieByName('SUDA_TOKEN')}` 
            },
            body: JSON.stringify({
             ...details
          }),
        }
        const safNewEntryUrl = `${BACKEND_BASE_URL}/bhubhatak/lease`
        //const response = await fetch(safNewEntryUrl, requestOptions)
        let response = null, responseBody = null
        response = await fetch(safNewEntryUrl, requestOptions)
        responseBody = await response.json()
        // console.log("woohooo")
        console.log(response, responseBody)
        if (response?.status == "201") { 
            toast.success("Registration Successful..!!!", {
            position: toast.POSITION.TOP_CENTER
            });          
            setDemandLoader(false)
        } 
        
        else{
            toast.error("Registration failed,try again later..!!!", {
                position: toast.POSITION.TOP_CENTER
                });   
                setDemandLoader(false)
        }
    } catch (err) {
        console.error(err)
    }
    setDemandLoader(false)
    setPersonalDetail(prevState => {
        return{
            ...prevState,
            honorific: '',
            name: '', 
            gender:'', 
            guardian_name:'',
            guardian_relation: '',
            mobile_number:'',
            aadhar_number: '',
            email_id: '',
            pan_number: ''
        }
    })
    setLandDetail(prevState => {
        return{
            ...prevState,
            area_name:'',
            ward_number:'',
            address:'',
            lease_number:'',
            registration_date:'',
            usage_type:'',
            plot_area:'',
            bhu_bhatak_rate:'',
            demand_amount:''
        }
    })
  }
  return (
    <>
      <ToastContainer autoClose={2000}/>
<div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10 mb-10">
 <form onSubmit={newLeaseRegistrationHandler}>
  <div className={`w-${isPublicSAF ? "11/12" : "full"} px-0 pt-0 pb-4 m-auto bg-white rounded-md border border-gray-500 lg:max-w-full`}>
    <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-2 navcustomproperty mb-2 ring-1 ring-black rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
            New Lease Registration Form
        </h2>
    </nav>
    <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 border border-gray-500 lg:max-w-full">
                            <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                                <h2 className="text-sm font-semibold text-center text-white">
                                    Personal Details
                                </h2>
                            </nav>
                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end">
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Honorific
                                        <p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <Tooltip className="text-xs bg-transparent text-black-900 inline w-64"
                                        placement='top'
                                        //content={safInputValidatorMsgList.validHonorificMsg}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <Select onChange={(e)=>handleNewLeaseRegistrationHandler(e,'honorific')}

                                            label="Select" className="w-72 pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                            ">
                                            <Option value='honorific_Mr.' >Mr</Option>
                                            <Option value='honorific_Mrs.' >Mrs</Option>
                                            <Option value='honorific_Ms.' >Ms</Option>
                                            <Option value='honorific_Mx.' >Mx</Option>
                                        </Select>
                                    </Tooltip>
                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                    Allottee Name<p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <Tooltip className="text-xs bg-transparent text-black-900 inline w-64 
                                "
                                        placement='top'
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <input 
                                        value={personalDetail.name}
                                            onChange={(e)=>handleNewLeaseRegistrationHandler(e,'name')}
                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 
                                            focus:border-blue-500 "
                                            id="name"
                                            name='name'
                                            type="text" placeholder="Allottee Name" />
                                    </Tooltip>
                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Gender<p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <Tooltip className="text-xs bg-transparent text-black-900 inline w-64 
                               "
                                        placement='top'
                                        //content={safInputValidatorMsgList.validOwnerGenderMsg}
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <Select onChange={(e)=>handleNewLeaseRegistrationHandler(e,'gender')}
                                            label="Select" className="w-72 pl-2 pr-3 py-1 font-bold text-xs text-gray-900
                                            ">
                                            <Option value='gender_Male' >Male</Option>
                                            <Option value='gender_Female' >Female</Option>
                                            <Option value='gender_Transgender' >Transgender</Option>
                                        </Select>
                                    </Tooltip>
                                </div>
                            </div>

                           

                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end">
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Guardian Name
                                        <p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <input 
                                            value={personalDetail.guardian_name}
                                            onChange={(e)=>handleNewLeaseRegistrationHandler(e, '')}
                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 
                                            focus:border-blue-500 "
                                            id="guardian_name"
                                            name="guardian_name"
                                            type="text" 
                                            placeholder="Guardian Name" />
                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                    Relation<p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <Tooltip className="text-xs bg-transparent text-black-900 inline w-64"
                                        placement='top'
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <Select onChange={(e)=>handleNewLeaseRegistrationHandler(e,'relation')}
                                            label="Select" className="w-72 pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                            ">
                                             <Option value='relation_M/O' >M/O</Option>
                                             <Option value='relation_F/O' >F/O</Option>
                                             <Option value='relation_S/O' >S/O</Option>
                                             <Option value='relation_D/O' >D/O</Option>
                                             <Option value='relation_W/O' >W/O</Option>
                                             <Option value='relation_C/O' >C/O</Option>
                                        </Select>
                                    </Tooltip>
                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Mobile Number<p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <input 
                                           value={personalDetail.mobile_number}
                                            onChange={(e)=>handleNewLeaseRegistrationHandler(e,'')}
                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 
                                            focus:border-blue-500 "
                                            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                            maxLength='10'
                                            id="mobile_number"
                                            name="mobile_number"
                                            type="text" placeholder="Mobile number" />
                                </div>
                            </div>


                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end">
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Aadhar number 
                                      
                                    </label>
                                    <input 
                                           value={personalDetail.aadhar_number}
                                            onChange={(e)=>handleNewLeaseRegistrationHandler(e,'')}
                                            id="aadhar_number"
                                          
                                            name="aadhar_number"
                                            maxLength='12'
                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 
                                            focus:border-blue-500 "
                                            type="text" placeholder="Aadhar number" />
                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                    Email id
                                    </label>
                                    <input 
                                            value={personalDetail.email_id}
                                            onChange={(e)=>handleNewLeaseRegistrationHandler(e,'')}
                                            name='email_id'
                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 
                                            focus:border-blue-500 "
                                            id="email_id" type="text" placeholder="Email id" />
                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                      PAN
                                    </label>
                                    <input 
                                            value={personalDetail.pan_number}
                                            onChange={(e)=>handleNewLeaseRegistrationHandler(e,'')}
                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 
                                            focus:border-blue-500 "
                                          
                                            id="pan_number"
                                            name='pan_number'
                                            maxLength='10'
                                            type="text" placeholder="PAN number" />
                                </div>
                            </div>

                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end">
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4 flex">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" 
                                    htmlFor="password">
                                        Consumer no
                                      
                                    </label>
                                    <span className='block text-gray-700 text-xs font-bold mb-2'>
                                    Auto generated
                                      </span>
                                   
                                </div>
                                </div>
                        </div>
                        <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 border border-gray-500 lg:max-w-full">
                            <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                                <h2 className="text-sm font-semibold text-center text-white">
                                   Land Details
                                </h2>
                            </nav>
                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end">
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                       Area Name
                                        <p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <input 
                                        value={landDetail.area_name}
                                            onChange={(e)=>handleNewLeaseLandDetailsHandler(e,'area_name')}
                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 
                                            focus:border-blue-500 "
                                            id="area_name"
                                            name='area_name'
                                            type="text" placeholder="Area Name" />
                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                             <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 "   htmlFor="password">
                                 Ward No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                             </label>
                             <Tooltip className="text-xs bg-transparent text-black-900 inline w-64
                          "
                                 placement='top'
                                 content={safInputValidatorMsgList.validWardMsg}
                                 animate={{
                                     mount: { scale: 1, y: 0 },
                                     unmount: { scale: 0, y: 25 },
                                 }} > 
                                 <Select  onChange={(e)=>handleNewLeaseLandDetailsHandler(e,'')}
                                  name="ward_number"
                                
                                     defaultValue={landDetail.ward_number}
                                     label="select" 
                                     className="pl-2 pr-3 py-2 font-bold text-xs text-gray-900"
                                    >
                                     {
                                         wardData.length > 0 ?
                                             (wardData.map((item) => {
                                                 const {id,zone_mstr_id,ward_name,area_name,stampdate,user_id,status} = item
                                                 return <Option key={id} value={JSON.stringify(item)}>{`${ward_name}`}</Option>
                                             })) : (<Option>Loading...</Option>)
                                     }
                                 </Select>
                             </Tooltip>
                         </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Address<p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                  
                                       <input 
                                        value={landDetail.address}
                                            onChange={(e)=>handleNewLeaseLandDetailsHandler(e,'')}
                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 
                                            focus:border-blue-500 "
                                            id="address"
                                            name='address'
                                            type="text" placeholder="Address" />
                              
                                </div>
                            </div>

                           

                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end">
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Registration Number
                                        <p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <input 
                                            value={landDetail.lease_number}
                                            onChange={(e)=>handleNewLeaseLandDetailsHandler(e, '')}
                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 
                                            focus:border-blue-500 "
                                            id="lease_number"
                                            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                            maxLength="10"
                                            name="lease_number"
                                            type="text" 
                                            placeholder="Registration Number" />
                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                    Registration Date<p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                   
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <Stack spacing={3}>
                   <DesktopDatePicker 
                         onChange={(e)=>handleNewLeaseLandDetailsHandler(e, "registration_date")}
                        
                                  name="registration_date"
                   
                     id="registration_date"
                    
                     inputFormat="YYYY-MM-DD" 
                  
                     renderInput={(params) => <TextField
                       {...params}
                     />}
                     disableFuture={true}
                     value={landDetail.registration_date}
                   />
                  
                 </Stack>
               </LocalizationProvider>
                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Usage Type<p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <Tooltip className="text-xs bg-transparent text-black-900 inline w-64"
                                        placement='top'
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }} >
                                        <Select onChange={(e)=>handleNewLeaseLandDetailsHandler(e,'')}
                                            label="Select" className="w-72 pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                            ">
                                             <Option value='usage_1' >Residential</Option>
                                             <Option value='usage_2' >Residential Cum Commercial</Option>
                                             <Option value='usage_3' >Commercial</Option>
                                            
                                        </Select>
                                    </Tooltip>
                                </div>
                            </div>


                            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end">
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                     Plot Area
                                    </label>
                                    <input 
                                           value={landDetail.plot_area}
                                            onChange={(e)=>handleNewLeaseLandDetailsHandler(e,'')}
                                            id="plot_area"
                                            name="plot_area"
                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 
                                            focus:border-blue-500 "
                                            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                            type="text" placeholder="Plot Area" />
                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                     Bhu Bhatak Rate
                                    </label>
                                    <input 
                                            value={landDetail.bhu_bhatak_rate}
                                            onChange={(e)=>handleNewLeaseLandDetailsHandler(e,'')}
                                            name='bhu_bhatak_rate'
                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 
                                            focus:border-blue-500 "
                                            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                            id="bhu_bhatak_rate" type="text" placeholder="Bhu Bhatak Rate" />
                                </div>
                                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                      Demand Amount
                                      <p className='contents text-red-600 text-sm font-bold'>*</p>
                                    </label>
                                    <input 
                                            value={landDetail.demand_amount}
                                            onChange={(e)=>handleNewLeaseLandDetailsHandler(e,'')}
                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 
                                            focus:border-blue-500 "
                                            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                            id="demand_amount"
                                            name='demand_amount'
                                            type="text" placeholder=" Demand Amount" />
                                </div>
                            </div>
 
                          
                        </div> 
                        <div>
  <button type='submit'
                             className={`w-36 h-8 px-4 py-1  mx-4 mb-2 tracking-wide text-white 
                             transition-colors
                             ${disabled ? `cursor-not-allowed ` : `cursor-pointer`}
                              duration-200 
                             transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none
                              focus:bg-green-400`}
                              disabled={disabled}
                             >
                             Submit
             </button>
             {
                        demandLoader ?  <div className="m-auto w-16 h-16">
                        <ColorRing
                          visible={true}
                          height="40"
                          width="40"
                          colors={['#2fa158', '#2fa158', '#2fa158', '#2fa158', '#2fa158']}
        
                        />
                      </div> : null
                      }
                    
  </div>
  </div> 

 
   
   
  
 
  </form>
</div>
   </>
  )
}

export default NewLeaseRegistration 