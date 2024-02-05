import React, { Component, useEffect, useRef, useState } from 'react'
import { CirclesWithBar, ColorRing } from 'react-loader-spinner'
import { addExistingConsumerMsgList,safInputValidatorMsgList } from '../../../Dashboard/data/saf-input-validator-list'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { convertDateToAPIFormat,convertDateFormat  } from '@/utils/commonUtils';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useMaterialTailwindController } from '@/Dashboard/context' 
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import { Select, Option, Button, Textarea, Checkbox, Tooltip, Switch } from "@material-tailwind/react";
import { wardData } from '../utils/common';
import { tableData } from '../utils/tableData' 
import Table from '../utils/Table';
import DetailContainer from '../utils/DetailContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentDetailsReceiptEnglish from './paymentDetailsReceiptEnglish';
import PaymentDetailsReceiptHindi from './paymentDetailsReceiptHindi';
import ViewPaymentDetails from '@/formPages/PropertyOrHoldingTaxForms/pay_property_tax/viewPaymentDetails';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL 
const DemandandPayment = () => {
 
const searchConsumerDetails = {                 
    wardNo:'',
    leaseNumber:'',
    mobileNumber:'',  
    name:'',
    } 
   

  
    const demandcolumns = [
      { field: "id", header: "Sl No" },
      { field: "demand_from", header: "Date From" },
      { field: "demand_upto", header: "Date Upto" },
      { field: "demand_amount", header: "Demand Amount" },
      { field: "status", header: "Status" }
    ];  

  

    const landdetails = [
      {
      areaName : "area name",
      wardNo: "PC0048984984",
      address: "address",
      lease_number: "2787827872",
      registration_date:"27-02-9999",
      usage_type: "Residential",
      plot_area:"660",
      bhu_bhatak_rate: "1000",
      demand_amount: "500",
      },
      ]


    const landdetailLists = [
      { field: "area_name", header: "Area Name" },
      { field: "ward_number", header: "Ward No" },
      { field: "address", header: "Address" },
      { field: "consumer_number", header: "Consumer No" },
      { field: "registration_date", header: "Registration Date" },
      { field: "usage_type", header: "Usage Type" },
      { field: "plot_area", header: "Plot Area" },
      { field: "bhu_bhatak_rate", header: "Bhu Bhatak Rate"},
      { field: "demand_amount", header: "Demand Amount"},
   
    ];

  



    const  modeOfPayment = [
      {
          id: 1,
          mode_of_payment: "Cash",
          mode:"cash",
          status: 1
      },
      {
          id: 2,
          mode_of_payment: "Cheque",
          mode:"cheque",
          status: 1
      },
      {
          id: 3,
          mode_of_payment: "DD",
          mode:"dd",
          status: 1
      },
      {
          id: 4,
          mode_of_payment: "Card",
          mode:"card",
          status: 1
      },
      {
          id: 5,
          mode_of_payment: "NEFT",
          mode:"neft",
          status: 1
      },
      {
          id: 6,
          mode_of_payment: "RTGS",
          mode:"rtgs",
          status: 1
      }
    ]

    const paymentDetails =  {
    
       apprCode: '',
       bankName: '',
       branch: '',
       cardHolderName:'',
       cardNo: '',
       cardType:'',
       chequeDDNo:'',
       chequeDDDate:'',
       narration: '',
       neftDate: '',
       neftNo: '',
       othersBankName: '',
       payableAmt: '',
       paymentMode:'' ,
       paymentModeId: '',
       rtgsNo: '',
       rtgsDate: '',
    }

    const viewAndPayDetail = {
      transaction_number: '',
      payment_date: '',
      total_payable_amount: '',
      payable_amount_gst_percent:'',
      payment_mode: '',
      mode:'',
      remarks: '',
      bank_name:'',
      branch_name:'',
      othersBankName:'',
      cheque_number:'',
      cheque_date:'',
      dd_number:'',
      dd_date:'',
      neft_number:'',
      narration:'',
      neft_date:'',
      rtgs_number:'',
      rtgs_date:'',
      card_type:'',
      card_transaction_Id:'',
      appr_code:'',
      last_four_digits_of_card_number:'',
      card_holder_name:''
      //paymentDetails: {}
    }

  const [searchConsumerDetail, setSearchConsumerDetail] = useState(searchConsumerDetails); 
  const [viewAndPayDetails, setviewAndPayDetails] = useState(viewAndPayDetail)

  const [displayTable, setDisplayTable] = useState(false) 
  const [loader, setLoader] = useState(false)  
  const [displayDetails, setDisplayDetails] = useState(false) 
  const [viewAndPayDemandDetails, setviewAndPayDemandDetails] = useState(false)
  const [paymentDetail, setPaymentDetail] = useState(paymentDetails) 
  const [displayPaymentDetail, setdisplayPaymentDetail] = useState(false)
  const [receiptDetails, setReceiptDetails] = useState([]) 
  const [testData, setTestData] = useState([])
  const [searchAllotteeDetails, setSearchAlloteeDetails] = useState('')
  const [searchpaymentDetails, setSearchPaymentDetails] = useState('')
  const [AllotteeDetails, setAlloteeDetails] = useState([])
  const [LandDetails, setLandDetails] = useState([])
  const [demandDetails, setDemandDetails] = useState([])
  const [displayDemandAndPayment, setDisplayDemandAndPayment] = useState(true)
  const [landAllotmentId,setLandAllotmentId] = useState('')
  const [generateDemandData, setGenerateDemandData] = useState('')
  const [viewReceipt,setViewReceipt] = useState(false)
  const [demandBtnToggler, setDemandBtnToggler]  = useState('') 
  const [totalAmount, setTotalAmount] = useState('')
  const [receiptDetail, setReceiptDetail] = useState('')
  const [paymentTableData, setPaymentTableData] = useState([])
  const [displayHindiForm,setDisplayHindiForm] = useState(false)
  const [controller, dispatch] = useMaterialTailwindController();
  const [demandLoader, setDemandLoader] = useState(false)
  const [demand, setDemand] = useState([])
  const [btnToggler, setbtnToggler] = useState(true)
  const [disableSubmit, setdisableSubmit] = useState(true)
  const { paymentModeDetailsInputFromAPI } = controller;

  const backbuttonHandler = () =>{
    setDisplayTable(true) 
    setDisplayDemandAndPayment(true)
    setDisplayDetails(false) 
    setviewAndPayDemandDetails(false) 
    setPaymentDetail(false)
    setdisplayPaymentDetail(false)
  }

  useEffect(()=>{
    console.log("viewAndPayDetails", viewAndPayDetails,viewAndPayDetail.payment_mode)
  },[viewAndPayDetails])

  const handleSearchQueryChange = (e) => {
    if (e.toString().includes("ward_name")) {
        let wardItem = JSON.parse(e)
        setSearchConsumerDetail((prevState) => {
          return {
            ...prevState,
            wardNo: wardItem.id
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

  const handlePaymentDetails = (e,id) =>{
    console.log(e)
    if (e.toString().includes("mode_of_payment")) {
        let connItem = JSON.parse(e)
        console.log("connItem",connItem)
        setviewAndPayDetails((prevState) => {
            return {
                ...prevState,
                payment_mode: connItem.mode,
                mode: connItem.mode_of_payment
            }
        }) 
    } 
    else if (id.includes("payment_date")) {
      setviewAndPayDetails(prevState => {
        const v = convertDateToAPIFormat(e.$d) 
        return { ...prevState, payment_date: v }
      })
  }
    else if(e.toString().includes("narration")) {
      let connItem = JSON.parse(e)
      // console.log(wardItem)
      setPaymentDetail((prevState) => {
          return {
              ...prevState,
              narration: e.target.value,
          }
      })
  } 
  else if(e.toString().includes("bank_name")) {
      let connItem = JSON.parse(e)
      // console.log(wardItem)
      setviewAndPayDetails((prevState) => {
        
          return {
              ...prevState,
            bankName: connItem.bank_name,
          }
      })
  } 
  else if (id.includes("dd_date")) {
    setviewAndPayDetails(prevState => {
      return { ...prevState, 
        dd_date : convertDateToAPIFormat(e.$d) }
    })
  }
  else if (id.includes("rtgs_date")) {
    setviewAndPayDetails(prevState => {
      return { ...prevState, 
        rtgs_date : convertDateToAPIFormat(e.$d) }
    })
  }
  else if (id.includes("neft_date")) {
    setviewAndPayDetails(prevState => {
      return { ...prevState, 
        neft_date : convertDateToAPIFormat(e.$d) }
    })
  }
 
  else if (id.includes("cheque_date")) {
        setviewAndPayDetails(prevState => {
          return { ...prevState, 
            cheque_date: convertDateToAPIFormat(e.$d) }
        })
  }
  else if (id.includes("cardType")) {
        let relation = e.toString().split("_")[1]
        console.log(relation)
        setviewAndPayDetails((prevState) => {
            return {
                ...prevState,
                card_type: relation 
            }
        })
  }
  else if (id.includes("neftDate")) {
        setPaymentDetail(prevState => {
          return { ...prevState, neftDate: convertDateToAPIFormat(e.$d) }
        })
  }
  else if (id.includes("rtgsDate")) {
        setPaymentDetail(prevState => {
          return { ...prevState, rtgsDate: convertDateToAPIFormat(e.$d) }
        })
  }
  else{
      setviewAndPayDetails({
      ...viewAndPayDetails,                                // spreading the unchanged values
      [e.target.name]: e.target.value,          // changing the state of *changed value*
    });
  }}

  
  const viewAndPayDemandHandler = (e) => {
    e.preventDefault()
    setLoader(true)
    setviewAndPayDemandDetails(prevState => !prevState)
    setLoader(false)
  }

  const columns = [
    { field: "id", header: "Sl No" },
    { field: "AllotteeDetail", header: "Allotee Name" },
    { field: "lease_number", header: "Lease Number" },
    { field: "AreaName", header: "Area Name" },
    { field: "ward_number", header: "Ward Number" },
    { field: "view", header: "View" },
  ];   
  useEffect(()=>{
    console.log("testData",testData)
  },[testData])
  useEffect(()=>{
    let arr = []
    if(testData.length > 0){
      testData.map((testData,index) => {
        let val ={}
        val.id = index + 1
        val.AllotteeDetail = testData?.AllotteeDetail?.name 
        val.lease_number = testData?.lease_number 
        val.land_allottment_id = testData?.land_allottment_id
        val.ward_number = testData?.LandDetail?.ward_name
        val.AreaName = testData?.LandDetail?.area_name
        val.view =  <button type='button' className='h-6 w-16 px-2 py-1 bg-green-700
         text-white rounded custom_button_add'  
         onClick={()=>viewConsumerDetailHandler(val.land_allottment_id)}
         >View</button>
        arr.push(val)
      },
      )}
    console.log(arr,"arrar")
    setReceiptDetails(arr)
  },[testData])

  useEffect(()=>{
    console.log("receiptDetails", receiptDetails)
  },[receiptDetails])
  
useEffect(()=>{
  console.log(AllotteeDetails, "AllotteeDetails")
},[AllotteeDetails])

useEffect(()=>{
  let arr = [] 
  let val={} 
// if(generateDemandData !==''){
 
//   val.demand_status = generateDemandData.demand_status 
//   val.demand_from = generateDemandData.demand_from 
//   val.demand_amount = generateDemandData?.AllotteeLandDetail?.demand_amount
// }
// setDemandDetails(prevState => [...prevState, val])

},[generateDemandData])
const generateDemandHandler = async(e) => {
  e.preventDefault()
   console.log(landAllotmentId,"landAllotmentId")
   setDemandLoader(true)
   try {
    const requestOptions = {
        method: "POST",
        headers: { 
        'Content-Type': 'application/json',
        //  'Authorization': 
        // `Bearer ${getCookieByName('SUDA_TOKEN')}` 
        },
      //   body: JSON.stringify({
      //    ...details
      // }),
    }
    const safNewEntryUrl = `${BACKEND_BASE_URL}/bhubhatak/lease/${landAllotmentId}/demand`
    //const response = await fetch(safNewEntryUrl, requestOptions)
    let response = null, responseBody = null
    response = await fetch(safNewEntryUrl, requestOptions)
    responseBody = await response.json()
    // console.log("woohooo")
    console.log(response, responseBody)
    if (response?.status == "201") { 
        toast.success("Demand generated successful..!!!", {
        position: toast.POSITION.TOP_CENTER
        });   

        setDemandDetails(responseBody?.data)       
        //setGenerateDemandData(responseBody?.data)
        setDemandLoader(false)

        try {
          const searchDetails = 
           `${BACKEND_BASE_URL}/bhubhatak/lease/${landAllotmentId}`
          const requestOptions = {
              method: "GET",
              headers: { 'Content-Type': 'application/json',},
          }
          let response = null, responseBody = null
          response = await fetch(searchDetails, requestOptions)
          responseBody = await response.json()
          console.log("receipt in main form", response, responseBody)
          let allotteearr = []
          if (response?.status == '200') {
            
            console.log("receipt in main form 200", response, responseBody)
            setSearchAlloteeDetails(responseBody.data)
            setDemandDetails(responseBody?.data?.DemandDetails)
            setDemandBtnToggler(responseBody?.data?.canGenerateDemand)
          
            if(responseBody?.data?.totalAmount > 0){
              setTotalAmount(false)
            }
            else{
              setTotalAmount(true)
            }
            allotteearr.push(responseBody?.data?.AllotteeDetail)
            // setDisplayTable(false) 
            // setDisplayDemandAndPayment(false)
            // setDisplayDetails(true)


            // landarr.push(responseBody?.data?.LandDetail)
            // setLoader(false)
            // setDisplayTable(true)
            // setTestData(responseBody.data)
          } else {
            //setLoader(false)
          }
           if(allotteearr.length > 0){
            setAlloteeDetails(allotteearr)
           }
          
      } catch (err) {
          console.error(err)   
          setLoader(false)
      }
      finally {}
      
      


    } 
    else{
        toast.error("Failed to generate demand..!!!", {
            position: toast.POSITION.TOP_CENTER
            });   
           setDemandLoader(false)
    }
} catch (err) {
    console.error(err)
}


}
const viewConsumerDetailHandler = async(id) => {
  console.log(id)
  setLandAllotmentId(id)
  try {
    const searchDetails = 
     `${BACKEND_BASE_URL}/bhubhatak/lease/${id}`
    const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json',},
    }
    let response = null, responseBody = null
    response = await fetch(searchDetails, requestOptions)
    responseBody = await response.json()
    console.log("receipt in main form", response, responseBody)
    let allotteearr = []
    if (response?.status == '200') {
      
      console.log("receipt in main form 200", response, responseBody)
      setSearchAlloteeDetails(responseBody.data)
      setDemandDetails(responseBody?.data?.DemandDetails)
      setDemandBtnToggler(responseBody?.data?.canGenerateDemand)
    
      if(responseBody?.data?.totalAmount > 0){
        setTotalAmount(false)
      }
      else{
        setTotalAmount(true)
      }
      allotteearr.push(responseBody?.data?.AllotteeDetail)
      setDisplayTable(false) 
      setDisplayDemandAndPayment(false)
      setDisplayDetails(true)
      // landarr.push(responseBody?.data?.LandDetail)
      // setLoader(false)
      // setDisplayTable(true)
      // setTestData(responseBody.data)
    } else {
      //setLoader(false)
    }
     if(allotteearr.length > 0){
      setAlloteeDetails(allotteearr)
     }
    
} catch (err) {
    console.error(err)   
    setLoader(false)
}
finally {}
}
useEffect(()=>{
  console.log(demandDetails,"demandDetails")
},[demandDetails])
useEffect(()=>{
  console.log("toggle clicked")
  let arr = []
  
 if(demandDetails.length > 0){
  
    demandDetails.map((demandDetail,index) => {
      let val = {}
      val.id = index + 1
      val.status = demandDetail.demand_status === 0 ? "Paid" : demandDetail.demand_status === 1 ? "Current" : "Outstanding" 
      val.demand_from = demandDetail?.demand_from 
      val.demand_upto = demandDetail.demand_upto 
      val.demand_amount = demandDetail.demand_amount
      val.consumer_demand_id = demandDetail.consumer_demand_id
      val.land_allottment_id = demandDetail.land_allottment_id
      val.transaction_id = demandDetail.transaction_id
      console.log("value", val)
      arr.push(val)
    }) 
    console.log("array", arr)
    setDemand(arr)
 }
},[demandDetails, demandBtnToggler,setDemandDetails])
const details = [
  {
  honorific : "PC00GYF78787",
  name: "Namrata Das",
  gender: "Gender",
  gaurdian_name: "Guardian name",
  gaurdian_relation: "Ward no",
  mobile_number: "Mobile no",
  aadhar_number: "Aadhar Number",
  email_id:"test@gmail.com",
  pan_number:"FY78787VYHVV",
  consumer_number: "FCTFT78778N"
  },
  ]

const detailLists = [
  { field: "honorific", header: "Honorific" },
  { field: "name", header: "Allottee Name" },
  { field: "gender", header: "Gender" },
  { field: "guardian_name", header: "Guardian name" },
  { field: "guardian_relation", header: "Relation" },
  { field: "mobile_number", header: "Mobile no" },
  { field: "aadhar_number", header: "Aadhar Number" },
  { field: "email_id", header: "Email Id"},
  { field: "pan_number", header: "PAN No"},
  { field: "consumer_id", header: "Consumer Id" },
];

useEffect(()=>{
  console.log(searchAllotteeDetails,"searchAllotteeDetails")
   let landarr = []
   let val = {}
  if(searchAllotteeDetails !== ''){
   
    val.area_name = searchAllotteeDetails?.LandDetail?.area_name 
    val.address = searchAllotteeDetails?.LandDetail?.address 
    val.registration_date = searchAllotteeDetails?.registration_date 
    val.plot_area = searchAllotteeDetails.LandDetail?.plot_area 
    val.demand_amount = searchAllotteeDetails?.demand_amount
    val.ward_number = searchAllotteeDetails?.LandDetail?.ward_name
    val.consumer_number = searchAllotteeDetails?.LandDetail?.consumer_number 
    val.usage_type = searchAllotteeDetails?.UsageType?.usage_name 
    val.bhu_bhatak_rate = searchAllotteeDetails?.LandDetail?.bhu_bhatak_rate
  }
  landarr.push(val)
  setLandDetails(landarr)
},[searchAllotteeDetails])
const wardRef = useRef("")
  const updateBasicDetailFormHandler = async(e) => {
    e.preventDefault()
    setLoader(true)
    try {
      const searchDetails = 
       `${BACKEND_BASE_URL}/bhubhatak/lease?wardNo=${searchConsumerDetail.wardNo}&leaseNumber=${searchConsumerDetail.leaseNumber}&mobileNumber=${searchConsumerDetail.mobileNumber}&name=${searchConsumerDetail.name}`
      const requestOptions = {
          method: "GET",
          headers: { 'Content-Type': 'application/json',
          //  'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` 
          },
      }
      let response = null, responseBody = null
      response = await fetch(searchDetails, requestOptions)
      responseBody = await response.json()
      console.log("receipt in main form", response, responseBody)
      if (response?.status == '200') {
        console.log("receipt in main form 200", response, responseBody)

        //setReceiptDetails(responseBody)
        setLoader(false)
        setDisplayTable(true)
        setTestData(responseBody.data)
      } else {
        setLoader(false)
      }

  } catch (err) {
      console.error(err)   
      setLoader(false)
  }
   
  finally {}
  setLoader(false)
  // wardRef.current.textContent = <div></div>
  setSearchConsumerDetail(prevState => {
    return { 
      ...prevState,  
      wardNo:'', 
      leaseNumber:'',
      mobileNumber:'',
      name:''
    }
  })
 
  }
 useEffect(()=>{
  console.log(wardRef, "wardRef")
 },[wardRef])

const viewAndPayDemandDetailPaymentHandler = async(e)=>{
  e.preventDefault()
  setDemandLoader(true)
  viewAndPayDetails.total_payable_amount = searchAllotteeDetails?.totalAmount
  viewAndPayDetails.payable_amount_gst_percent = searchAllotteeDetails?.gst 
  console.log(viewAndPayDetails, "viewAndPayDetails final")
  let paymentDetails={}
  if(viewAndPayDetails.payment_mode === 'cash'){
    paymentDetails.narration = viewAndPayDetails.narration
  }
  else if((viewAndPayDetails.payment_mode === 'cheque')){
    paymentDetails.bank_name = viewAndPayDetails.bank_name
    paymentDetails.branch_name = viewAndPayDetails.branch_name
    paymentDetails.cheque_number = viewAndPayDetails.cheque_number
    paymentDetails.cheque_date = viewAndPayDetails.cheque_date
  }
  else if((viewAndPayDetails.payment_mode === 'dd')){
    paymentDetails.bank_name = viewAndPayDetails.bank_name
    paymentDetails.branch_name = viewAndPayDetails.branch_name
    paymentDetails.dd_number = viewAndPayDetails.dd_number
    paymentDetails.dd_date = viewAndPayDetails.dd_date
  }
  else if((viewAndPayDetails.payment_mode === 'card')){
    paymentDetails.bank_name = viewAndPayDetails.bank_name
    paymentDetails.branch_name = viewAndPayDetails.branch_name
    paymentDetails.card_type = viewAndPayDetails.card_type
    paymentDetails.card_holder_name = viewAndPayDetails.card_holder_name
    paymentDetails.card_transaction_Id = viewAndPayDetails.branch_name
    paymentDetails.appr_code = viewAndPayDetails.appr_code
    paymentDetails.last_four_digits_of_card_number = viewAndPayDetails.last_four_digits_of_card_number
  }
  else if((viewAndPayDetails.payment_mode === 'neft')){
    paymentDetails.bank_name = viewAndPayDetails.bank_name
    paymentDetails.branch_name = viewAndPayDetails.branch_name
    paymentDetails.neft_number = viewAndPayDetails.neft_number
    paymentDetails.neft_date = viewAndPayDetails.neft_date
  }
  else if((viewAndPayDetails.payment_mode === 'rtgs')){
    paymentDetails.bank_name = viewAndPayDetails.bank_name
    paymentDetails.branch_name = viewAndPayDetails.branch_name
    paymentDetails.rtgs_date = viewAndPayDetails.rtgs_date
    paymentDetails.rtgs_number = viewAndPayDetails.rtgs_number
  }
  else{}
  let finalObj = {

  }
   finalObj.transaction_number =  viewAndPayDetails.transaction_number
   finalObj.payment_date = viewAndPayDetails.payment_date
   finalObj.total_payable_amount = viewAndPayDetails.total_payable_amount
   finalObj.payable_amout_gst_percent = viewAndPayDetails.payable_amount_gst_percent
   finalObj.payment_mode = viewAndPayDetails.payment_mode
   finalObj.outstanding_amount = viewAndPayDetails.outstanding_amount
   finalObj.remarks = viewAndPayDetails.remarks

   try {
      
    const requestOptions = {
        method: "POST",
        headers: { 
        'Content-Type': 'application/json',
        //  'Authorization': 
        // `Bearer ${getCookieByName('SUDA_TOKEN')}` 
        },
        body: JSON.stringify({
         ...finalObj, paymentDetails
      }),
    }
    const safNewEntryUrl = `${BACKEND_BASE_URL}/bhubhatak/lease/${landAllotmentId}/demands/payments`
    //const response = await fetch(safNewEntryUrl, requestOptions)
    let response = null, responseBody = null
    response = await fetch(safNewEntryUrl, requestOptions)
    responseBody = await response.json()
    // console.log("woohooo")
    console.log(response, responseBody)
    if (response?.status == "201") { 
        toast.success("Payment Successful..!!!", {
        position: toast.POSITION.TOP_CENTER
        });          
        setDemandLoader(false)
        setTotalAmount(true)
    } 
    
    else{
        toast.error("Payment failed,try again later..!!!", {
            position: toast.POSITION.TOP_CENTER
            });   
           setDemandLoader(false)
    }
} catch (err) {
    console.error(err)
}
}
  const viewPaymentDetailsHandler = async(e) => {
    e.preventDefault()
    setDemandLoader(true)
    setdisplayPaymentDetail(prevState => !prevState)


    try {
      const searchDetails = 
       `${BACKEND_BASE_URL}/bhubhatak/lease/${landAllotmentId}/demands/payments`
      const requestOptions = {
          method: "GET",
          headers: { 'Content-Type': 'application/json',},
      }
      let response = null, responseBody = null
      response = await fetch(searchDetails, requestOptions)
      responseBody = await response.json()
      console.log("receipt in main form", response, responseBody)
      let allotteearr = []
      if (response?.status == '200') {
        
        console.log("receipt in main form 200", response, responseBody)
        setSearchPaymentDetails(responseBody.data)
        setDemandLoader(false)
        // setSearchAlloteeDetails(responseBody.data)
        // setDemandDetails(responseBody?.data?.DemandDetails)
        // setDemandBtnToggler(responseBody?.data?.canGenerateDemand)
      
        // if(responseBody?.data?.totalAmount > 0){
        //   setTotalAmount(false)
        // }
        // else{
        //   setTotalAmount(true)
        // }
        // allotteearr.push(responseBody?.data?.AllotteeDetail)
        // setDisplayTable(false) 
        // setDisplayDemandAndPayment(false)
        // setDisplayDetails(true)
      
      } else {
        //setLoader(false)
        setDemandLoader(false)
      }

      //  if(allotteearr.length > 0){
      //   setAlloteeDetails(allotteearr)
      //  }
      
  } catch (err) {
      console.error(err)   
      //setLoader(false)
  }
  finally {}
  }

 const viewReceiptHandler = (e,searchpaymentDetail) => {
  e.preventDefault() 
  setDisplayDetails(false)
  setdisplayPaymentDetail(false)
  setViewReceipt(true)
  setReceiptDetail(searchpaymentDetail)
  console.log(searchpaymentDetail)
 }
  const columnsPaymentDetails = [  
    { field: "id", header: "Sl No" },
    { field: "payable_amout_gst_percent", header: "G.S.T" },
    { field: "total_payable_amount", header: "Total Amount" },
    { field: "transaction_number", header: "Receipt/Transaction no" },
    { field: "payment_date", header: "Payment Date" },
    { field: "payment_receipt", header: "Payment Receipt" },
  ]


  // useEffect(()=>{
  // console.log(searchpaymentDetails,"searchpaymentDetails")
  // if(searchpaymentDetails.length > 0){
  //   searchpaymentDetails.map((searchpaymentDetail, index) => {
  //     searchpaymentDetail.id = index + 1
  //     searchpaymentDetail.payment_receipt =  <button type='button'
  //      className='h-6 w-16 px-2 py-1 bg-green-700 
  //     text-white rounded custom_button_add'  

  //     onClick={(e)=>viewReceiptHandler(e,searchpaymentDetail)}
  //     >View</button>
  //   }) 
  // }
  // },[searchpaymentDetails, displayPaymentDetail])

  useEffect(()=>{
    if(viewAndPayDetails.transaction_number!== '' && viewAndPayDetails.payment_date!=='' && 
    viewAndPayDetails.payment_mode !==''){
      if(viewAndPayDetails.payment_mode === 'cheque'){
        if(viewAndPayDetails.bank_name !=='' && viewAndPayDetails.branch_name !== '' && 
        viewAndPayDetails.cheque_number !=='' && viewAndPayDetails.cheque_date !==''
        )
        {
          setbtnToggler(false)
        }
        else{
          setbtnToggler(true)
        }
      }
      else  if(viewAndPayDetails.payment_mode === 'dd'){
        if(viewAndPayDetails.bank_name !=='' && viewAndPayDetails.branch_name !== '' && 
        viewAndPayDetails.dd_date !=='' && viewAndPayDetails.dd_number !==''
        )
        {
          setbtnToggler(false)
        }
        else{
          setbtnToggler(true)
        }
      }
      else  if(viewAndPayDetails.payment_mode === 'neft'){
        if(viewAndPayDetails.bank_name !=='' && viewAndPayDetails.branch_name !== '' && 
        viewAndPayDetails.neft_date !=='' && viewAndPayDetails.neft_number !==''
        )
        {
          setbtnToggler(false)
        }
        else{
          setbtnToggler(true)
        }
      }
      else  if(viewAndPayDetails.payment_mode === 'rtgs'){
        if(viewAndPayDetails.bank_name !=='' && viewAndPayDetails.branch_name !== '' && 
        viewAndPayDetails.rtgs_date !=='' && viewAndPayDetails.rtgs_number !==''
        )
        {
          setbtnToggler(false)
        }
        else{
          setbtnToggler(true)
        }
      }
      else  if(viewAndPayDetails.payment_mode === 'card'){
        if(viewAndPayDetails.bank_name !=='' && viewAndPayDetails.branch_name !== '' && 
        viewAndPayDetails.card_transaction_Id !=='' && viewAndPayDetails.appr_code !=='' && 
        viewAndPayDetails.last_four_digits_of_card_number !== '' && viewAndPayDetails.card_holder_name !== ''
        )
        {
          setbtnToggler(false)
        }
        else{
          setbtnToggler(true)
        }
      }
      else  if(viewAndPayDetails.payment_mode === 'cash'){
        setbtnToggler(false)
      }
      else{
        setbtnToggler(true)
      }
     
    }
    else{
      setbtnToggler(true)
    }
  },[viewAndPayDetails.transaction_number,viewAndPayDetails.payment_date, viewAndPayDetails.payment_mode, 
    viewAndPayDetails.bank_name , viewAndPayDetails.branch_name ,
    viewAndPayDetails.cheque_number , viewAndPayDetails.cheque_date, 
    viewAndPayDetails.dd_date, viewAndPayDetails.dd_number,
    viewAndPayDetails.neft_date , viewAndPayDetails.neft_number ,
    viewAndPayDetails.rtgs_date, viewAndPayDetails.rtgs_number,
    viewAndPayDetails.card_transaction_Id , viewAndPayDetails.appr_code , 
    viewAndPayDetails.last_four_digits_of_card_number, viewAndPayDetails.card_holder_name
  ])
  useEffect(()=>{
    let arr = []
    if(searchpaymentDetails.length > 0){
      searchpaymentDetails.map((searchpaymentDetail, index) => {
        let val = {}
        val.id = index + 1
        val.payment_receipt =  <button type='button'
         className='h-6 w-16 px-2 py-1 bg-green-700 
        text-white rounded custom_button_add'  
        onClick={(e)=>viewReceiptHandler(e,searchpaymentDetail)}
        >View</button>
        val.transaction_id = searchpaymentDetail?.transaction_id 
        val.transaction_number  = searchpaymentDetail?.transaction_number 
        val.payment_date = searchpaymentDetail?.payment_date 
        val.total_payable_amount = searchpaymentDetail?.total_payable_amount 
        val.payable_amout_gst_percent = searchpaymentDetail?.payable_amout_gst_percent 
        val.payment_mode = searchpaymentDetail?.payment_mode 
        val.remarks = searchpaymentDetail?.remarks 
        arr.push(val)
      }) 
    }
    setPaymentTableData(arr)
  },[searchpaymentDetails])
 useEffect(()=>{
  if(searchConsumerDetail.wardNo !=='' || searchConsumerDetail.leaseNumber || 
  searchConsumerDetail.mobileNumber !=='' || searchConsumerDetail.name !==''
  ){
    setdisableSubmit(false)
  }
  else{
    setdisableSubmit(true)
  }
 },[searchConsumerDetail.wardNo,searchConsumerDetail.leaseNumber,searchConsumerDetail.mobileNumber, 
  searchConsumerDetail.name])
  return (
    <>
    {
      viewReceipt ? <>
      {
        displayHindiForm ?  <PaymentDetailsReceiptHindi setDisplayHindiForm={setDisplayHindiForm} 
        receiptDetail={receiptDetail}
        searchAllotteeDetails={searchAllotteeDetails}
        setDisplayDetails = {setDisplayDetails}
        setviewAndPayDemandDetails = {setviewAndPayDemandDetails}
        setdisplayPaymentDetail = {setdisplayPaymentDetail}
        setViewReceipt = {setViewReceipt}
        /> :
        <PaymentDetailsReceiptEnglish 
        receiptDetail={receiptDetail}
        searchAllotteeDetails={searchAllotteeDetails}
        setDisplayDetails = {setDisplayDetails}
        setviewAndPayDemandDetails = {setviewAndPayDemandDetails}
        setdisplayPaymentDetail = {setdisplayPaymentDetail}
        setViewReceipt = {setViewReceipt}
        setDisplayHindiForm={setDisplayHindiForm}/>
      }
     
      </> : <>
       <ToastContainer autoClose={2000}/>
   <div className="relative flex flex-col justify-center  overflow-hidden mt-10 mb-10">
  {displayDemandAndPayment ? <>
  
    <div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-md border border-gray-500 lg:max-w-full">
        <form className="mt-4 h-screen" onSubmit={updateBasicDetailFormHandler}>
        <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
           
            <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
              <h2 className="text-sm font-semibold text-center text-white">
                Demand and Payment
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
                                     name="wardNo"
                                     ref={wardRef}
                                    defaultValue={searchConsumerDetail.wardNo}
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
                <p className='text-red-600 text-xs font-bold mx-auto'>OR</p>
              </div>
              <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                 Lease Number
                </label>
                <input 
               
                onChange={(e)=>handleSearchQueryChange(e)}
                name="leaseNumber"
                value={searchConsumerDetail.leaseNumber}
                  className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                  type="text" placeholder="" />
              </div>
              <div className="mb-3 ml-3 mt-2 min-w-fit max-w-fit">
                <p className='text-red-600 text-xs font-bold'>OR</p>
              </div>


              <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                  Mobile Number
                </label>
                <input 
                onChange={(e)=>handleSearchQueryChange(e)}
                name="mobileNumber"
                value={searchConsumerDetail.mobileNumber}
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
                name="name"
                value={searchConsumerDetail.name}
                  className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                  type="text" placeholder="" />
              </div>

            </div>
            <div className='flex justify-center items-center'>
          <button type='submit'
                               
            className={`w-36 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white 
           
            transition-colors duration-200  
            transform bg-green-400 rounded-md hover:bg-green-700 
            focus:outline-none focus:bg-green-400
            ${disableSubmit ? `cursor-not-allowed ` : `cursor-pointer`}
            `}
      
          disabled={disableSubmit}
          
           
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
        </div></> : null}
        {
        displayTable ? <>
             <Table data={receiptDetails} columns={columns} hover={true} striped={true} />
        </> : <></>
      }
        {
        displayDetails ? <>
<div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
        <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
        Personal Details
        </h2>
        <button className='text-sm py-1 px-4 rounded-md ml-4
        font-semibold text-center text-white mr-2 bg-red-500'
        onClick={backbuttonHandler}
        >Back</button>
      </nav>
      <DetailContainer detailLists={detailLists} details={AllotteeDetails} title="Personal Details"/> 
</div>

<div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
<nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
        Land Details
        </h2>
      </nav>
         <DetailContainer detailLists={landdetailLists} details={LandDetails} title="Land Details"/>  
  </div>    
       
      <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
      <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
          Demand Details
        </h2>
      </nav>
      {/* <Table data={demandDetails} columns={demandcolumns} hover={true}  
      striped={true} /> */}
      <Table data={demand} columns={demandcolumns} hover={true}  
      striped={true} />
      </div>
         </> 
         : null }
         {
          viewAndPayDemandDetails ? <>
          <form onSubmit={viewAndPayDemandDetailPaymentHandler}>
            <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
      <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
          Demand and Pay
        </h2>
      </nav>
      <div className='px-6 py-2 text-xs font-normal  text-gray-700 whitespace-normal'>
        Total Payable Amount (Including {searchAllotteeDetails?.gst}% gst )
        
        <span className='mx-6'>{searchAllotteeDetails?.totalAmount}</span>
      </div>
      <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
          Payment Summary
        </h2>
        </nav>
        <div className='px-6 py-2 text-xs font-normal  text-gray-700 whitespace-normal'>
        Transaction/Receipt Number 
        <p className='contents text-red-600 text-xs font-bold'>*</p>
        <input 
                                        value={viewAndPayDetails.transaction_number}
                                            onChange={(e)=>handlePaymentDetails(e,'transaction_number')}
                                            className="bg-white-200 appearance-none border
                                             border-gray-500 rounded w-72 py-2 px-4
                                              text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 
                                            focus:border-blue-500 "
                                            id="transaction_number"
                                            name='transaction_number'
                                            type="text" 
                                            placeholder="" /> 

      </div>
      <div className='px-6 py-2 text-xs font-normal  text-gray-700 whitespace-normal flex items-center'>
      Payment Date
      <p className='contents text-red-600 text-xs font-bold'>*</p>
      <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit gap-4">
                                   
                                   
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <Stack spacing={3}>
                   <DesktopDatePicker 
                     onChange={(e)=>handlePaymentDetails(e,'payment_date')}
                    name="payment_date"
                     id="payment_date"
                     inputFormat="YYYY-MM-DD" 
                     renderInput={(params) => <TextField
                       {...params}
                     />}
                     disableFuture={true}
                     value={viewAndPayDetails.payment_date}
                   />
                   
                 </Stack>
               </LocalizationProvider>
                                </div>
      </div>


      <div className="px-4 pt-0 pb-4 m-4 bg-white rounded-none  border border-gray-500 
            lg:max-w-full">
              <div className="md:flex-1 lg:flex  
              items-end lg:justify-between">
                          <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                                <label className=" w-[11rem]  block text-gray-700 
                                text-xs font-bold mb-2 "   htmlFor="password">
                                    Mode Of Payment
                                    <p className='contents text-red-600 
                                    text-sm font-bold'>*</p>
                                 </label>
                                <Tooltip className="text-xs bg-transparent text-black-900 inline w-64"
                                            placement='top'
                                            animate={{ 
                                                mount: { scale: 1, y: 0 },
                                                unmount: { scale: 0, y: 25 },
                                            }} >
                                <Select 
                                     name="payment_mode"
                                     id="connectionType"
                                     defaultValue={viewAndPayDetail.mode}
                                     onChange={(e)=>handlePaymentDetails(e,'')}
                                        label="select" 
                                        className="pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                      ">
                                        {
                                            modeOfPayment.length > 0 ?
                                                (modeOfPayment.map((item) => {
                                                    const { id, mode_of_payment,mode, status } = item
                                                    return <Option key={id} value={JSON.stringify(item)}>{`${mode_of_payment}`}</Option>
                                                })) : (<Option>Loading...</Option>)
                                        }
                                    </Select>
                                    </Tooltip>
                          </div>
                          <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                                <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 "   htmlFor="password">
                                 Remarks
                                 </label>
                                <Tooltip className="text-xs bg-transparent text-black-900 inline w-64"
                                            placement='top'
                                            animate={{
                                                mount: { scale: 1, y: 0 },
                                                unmount: { scale: 0, y: 25 },
                                            }} >
                              <input 
                              name="remarks"
                              id="remarks"
                              defaultValue={paymentDetail.remarks}
                            onChange={(e)=>handlePaymentDetails(e,"remarks")}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
                                    </Tooltip>
                          </div>
                      </div>
                     {
                      viewAndPayDetails.payment_mode === 'cash' ?
                      <>
                       <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                                <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 "   htmlFor="password">
                          Narration
                                 </label>
                                <Tooltip className="text-xs bg-transparent text-black-900 inline w-64"
                                            placement='top'
                                            animate={{
                                                mount: { scale: 1, y: 0 },
                                                unmount: { scale: 0, y: 25 },
                                            }} >
                              <input 
                              name="narration"
                              id="narration"
                              defaultValue={viewAndPayDetails.narration}
                            onChange={(e)=>handlePaymentDetails(e,"narration")}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
                                    </Tooltip>
                          </div>
                      </> : null
                     }
                    </div>
                    {viewAndPayDetails.payment_mode === 'cheque' ? 
                 <>
                 <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-2 navcustomproperty mb-2 ring-1 ring-black rounded-none">
                 <h2 className="text-sm font-semibold text-center text-white">
                   Bank Details
                 </h2>
         </nav> 
                 <div className="md:flex-1 lg:flex">
               
                        <div className="mb-4 ml-3 mt-2 flex">
                          <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                            Bank Name<p className='contents text-red-600 text-xs font-bold'>*</p>
                          </label>
                          <input 
                              name="bank_name"
                              id="bank_name"
                              defaultValue={viewAndPayDetails.bank_name}
                              onChange={(e)=>handlePaymentDetails(e,'')}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
                        </div>
                     <div className='mb-4 ml-3 mt-2 flex'>
                              <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                               Branch name<p className='contents text-red-600 text-sm font-bold'>*</p>
                              </label>
                              <input 
                              name="branch_name"
                              id="branch_name"
                              defaultValue={viewAndPayDetails.branch_name}
                              onChange={(e)=>handlePaymentDetails(e,'')}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
                            </div>
                </div>
                {
                       viewAndPayDetails.bank_name === 'OTHERS' ?   
                       <div className='mb-4 ml-3 mt-2 flex'>
                       <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                       Please mention other bank name
                       <p className='contents text-red-600 text-sm font-bold'>*</p>
                       </label>
                       <input 
                       name="othersBankName"
                       id="othersBankName"
                       defaultValue={viewAndPayDetails.othersBankName}
                       onChange={(e)=>handlePaymentDetails(e,'')}
                         className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                 focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                        type="text" placeholder="" /> 
                        </div>
                        : ''
                      }
                <div className="md:flex-1 lg:flex  ">
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                              <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2" htmlFor="Cheque No.">
                                Cheque No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                              </label>
                              <input 
                            name="cheque_number"
                            id="cheque_number"
                            defaultValue={viewAndPayDetails.cheque_number}
                       onChange={(e)=>handlePaymentDetails(e,'')}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="Cheque No." />
                            </div>
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                              <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                Cheque Date
                                <p className='contents text-red-600 text-sm font-bold'>*</p>
                              </label>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                  <DesktopDatePicker
                                    // label="Date desktop"
                                    onChange={(e)=>handlePaymentDetails(e, "cheque_date")}
                                    name="cheque_date"
                                    id="cheque_date"
                                    inputFormat="YYYY-MM-DD"
                                    renderInput={(params) => <TextField {...params} />}
                                    value={viewAndPayDetails.cheque_date}
                                  />
                                </Stack>
                              </LocalizationProvider>
                            </div>
                          </div> 
                 </>
                : viewAndPayDetails.payment_mode === 'dd' ? 
                <>
                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-2 navcustomproperty mb-2 ring-1 ring-black rounded-none">
                <h2 className="text-sm font-semibold text-center text-white">
                  Bank Details
                </h2>
        </nav>
                <div className="md:flex-1 lg:flex ">
                <div className="md:flex-1 lg:flex  ">
                       <div className="mb-4 ml-3 mt-2 flex">
                         <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                           Bank Name<p className='contents text-red-600 text-xs font-bold'>*</p>
                         </label>
                         <input 
                              name="bank_name"
                              id="bank_name"
                              defaultValue={viewAndPayDetails.bank_name}
                              onChange={(e)=>handlePaymentDetails(e,'')}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
                       </div>
                    <div className='mb-4 ml-3 mt-2 flex'>
                             <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                              Branch name<p className='contents text-red-600 text-sm font-bold'>*</p>
                             </label>
                             <input
                                name="branch_name"
                                id="branch_name"
                                defaultValue={viewAndPayDetails.branch_name}
                                onChange={(e)=>handlePaymentDetails(e,'')}
                               className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                       focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                             type="text" placeholder="" />
                           </div>
                     </div>
                     {
                       paymentDetail.bankName === 'OTHERS' ?   
                       <div className='mb-4 ml-3 mt-2 flex'>
                       <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                       Please mention other bank name
                       <p className='contents text-red-600 text-sm font-bold'>*</p>
                       </label>
                       <input 
                       name="othersBankName"
                       id="othersBankName"
                       defaultValue={viewAndPayDetails.othersBankName}
                       onChange={(e)=>handlePaymentDetails(e,'')}
                         className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                 focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                        type="text" placeholder="" /> 
                        </div>
                        : ''
                      }
               </div>
               <div className="md:flex-1 lg:flex  ">
                           <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                             <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2" htmlFor="Cheque No.">
                               DD No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                             </label>
                             <input 
                             name="dd_number"
                             defaultValue={viewAndPayDetails.dd_number}
                             onChange={(e)=>handlePaymentDetails(e,"dd_number")}
                               className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                       focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               id="dd_number" type="text" placeholder="" />
                           </div>
                           <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                             <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                               DD Date
                               <p className='contents text-red-600 text-sm font-bold'>*</p>
                             </label>
                             <LocalizationProvider dateAdapter={AdapterDayjs}>
                               <Stack spacing={3}>
                                 <DesktopDatePicker
                                   // label="Date desktop"
                                   onChange={(e)=>handlePaymentDetails(e, "dd_date")}
                                    name="dd_date"
                                    id="dd_date"
                                   inputFormat="YYYY-MM-DD"
                                   renderInput={(params) => <TextField {...params} />}
                                   value={viewAndPayDetails.dd_date}
                                 />
                               </Stack>
                             </LocalizationProvider>
                           </div>
                         </div>
                </>
                :  viewAndPayDetails.payment_mode === 'neft' ? 
                <>
                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-2 navcustomproperty mb-2 ring-1 ring-black rounded-none">
                <h2 className="text-sm font-semibold text-center text-white">
                  Bank Details
                </h2>
        </nav>
                <div className="md:flex-1 lg:flex ">
                <div className="md:flex-1 lg:flex  ">
                       <div className="mb-4 ml-3 mt-2 flex">
                         <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                           Bank Name<p className='contents text-red-600 text-xs font-bold'>*</p>
                         </label>
                         <input 
                              name="bank_name"
                              id="bank_name"
                              defaultValue={viewAndPayDetails.bank_name}
                              onChange={(e)=>handlePaymentDetails(e,'')}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
                       </div>
                    <div className='mb-4 ml-3 mt-2 flex'>
                             <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                              Branch name<p className='contents text-red-600 text-sm font-bold'>*</p>
                             </label>
                             <input 
                             name="branch_name"
                             defaultValue={viewAndPayDetails.branch_name}
                             onChange={(e)=>handlePaymentDetails(e,"branch_name")}
                               className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                       focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                             type="text" placeholder="" />
                           </div>
                     </div>
                     {
                       paymentDetail.bankName === 'OTHERS' ?   
                       <div className='mb-4 ml-3 mt-2 flex'>
                       <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                       Please mention other bank name
                       <p className='contents text-red-600 text-sm font-bold'>*</p>
                       </label>
                       <input 
                       name="othersBankName"
                       id="othersBankName"
                       defaultValue={viewAndPayDetails.othersBankName}
                       onChange={(e)=>handlePaymentDetails(e,"othersBankName")}
                         className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                 focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                        type="text" placeholder="" /> 
                        </div>
                        : ''
                      }
               </div>
               <div className="md:flex-1 lg:flex  ">
                           <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                             <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2" htmlFor="Cheque No.">
                               NEFT No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                             </label>
                             <input 
                           name="neft_number"
                           id="neft_number"
                           defaultValue={viewAndPayDetails.neft_number}
                           onChange={(e)=>handlePaymentDetails(e,"neft_number")}
                               className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                       focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                            type="text" placeholder="Cheque No." />
                           </div>
                           <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                             <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                               NEFT Date
                               <p className='contents text-red-600 text-sm font-bold'>*</p>
                             </label>
                             <LocalizationProvider dateAdapter={AdapterDayjs}>
                               <Stack spacing={3}>
                                 <DesktopDatePicker
                                   // label="Date desktop"
                                   name="neft_date"
                       id="neft_date"
                       onChange={(e)=>handlePaymentDetails(e,"neft_date")}
                                   
                                   inputFormat="YYYY-MM-DD" 

                                   renderInput={(params) => <TextField {...params} />}
                                   value={viewAndPayDetails.neft_date}
                                 />
                               </Stack>
                             </LocalizationProvider>
                           </div>
                         </div>
                </>
                : viewAndPayDetails.payment_mode === 'rtgs' ?  
                <>
                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-2 navcustomproperty mb-2 ring-1 ring-black rounded-none">
                <h2 className="text-sm font-semibold text-center text-white">
                  Bank Details
                </h2>
        </nav>
                <div className="md:flex-1 lg:flex ">
                <div className="md:flex-1 lg:flex  ">
                       <div className="mb-4 ml-3 mt-2 flex">
                         <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                           Bank Name<p className='contents text-red-600 text-xs font-bold'>*</p>
                         </label>
                         <input 
                              name="bank_name"
                              id="bank_name"
                              defaultValue={viewAndPayDetails.bank_name}
                              onChange={(e)=>handlePaymentDetails(e,'')}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
                       </div>
                    <div className='mb-4 ml-3 mt-2 flex'>
                             <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                               Branch name<p className='contents text-red-600 text-sm font-bold'>*</p>
                             </label>
                             <input 
                             
                               id="branch_name"
                               name="branch_name"
                         defaultValue={viewAndPayDetails.branch_name}
                         onChange={(e)=>handlePaymentDetails(e,'')}
                               className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                       focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
                           </div>
                     </div>
                     {
                       paymentDetail.bankName === 'OTHERS' ?   
                       <div className='mb-4 ml-3 mt-2 flex'>
                       <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                       Please mention other bank name
                       <p className='contents text-red-600 text-sm font-bold'>*</p>
                       </label>
                       <input 
                       name="othersBankName"
                       id="othersBankName"
                       defaultValue={viewAndPayDetails.othersBankName}
                       onChange={(e)=>handlePaymentDetails(e,'')}
                         className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                 focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                        type="text" placeholder="" /> 
                        </div>
                        : ''
                      }
               </div>
               <div className="md:flex-1 lg:flex  ">
                           <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                             <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2" htmlFor="Cheque No.">
                             RTGS No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                             </label>
                             <input 
                             name="rtgs_number"
                             id="rtgs_number"
                             defaultValue={viewAndPayDetails.rtgs_number}
                             onChange={(e)=>handlePaymentDetails(e,'')} 
                               className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                       focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="Rtgs No." />
                           </div>
                           <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                             <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                               RTGS Date
                               <p className='contents text-red-600 text-sm font-bold'>*</p>
                             </label>
                             <LocalizationProvider dateAdapter={AdapterDayjs}>
                               <Stack spacing={3}>
                                 <DesktopDatePicker
                                  name="rtgs_date"
                                  id="rtgs_date"
                                  defaultValue={viewAndPayDetails.rtgs_date}
                                  onChange={(e)=>handlePaymentDetails(e,"rtgs_date")} 
                                  inputFormat="YYYY-MM-DD" 
                                  renderInput={(params) => <TextField {...params} />}
                                  value={viewAndPayDetails.rtgs_date}
                                 />
                               </Stack>
                             </LocalizationProvider>
                           </div>
                         </div>
                </>
                : viewAndPayDetails.payment_mode === 'card' ? 
                <>
                 <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-2 navcustomproperty mb-2 ring-1 ring-black rounded-none">
                <h2 className="text-sm font-semibold text-center text-white">
                  Bank Details
                </h2>
        </nav>
                <div className="md:flex-1 lg:flex ">
                <div className="md:flex-1 lg:flex  ">
                       <div className="mb-4 ml-3 mt-2 flex">
                         <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                           Bank Name<p className='contents text-red-600 text-xs font-bold'>*</p>
                         </label>
                         <input 
                              name="bank_name"
                              id="bank_name"
                              defaultValue={viewAndPayDetails.bank_name}
                              onChange={(e)=>handlePaymentDetails(e,'')}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
                       </div>
                    <div className='mb-4 ml-3 mt-2 flex'>
                             <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                               Branch name<p className='contents text-red-600 text-sm font-bold'>*</p>
                             </label>
                             <input 
                              name="branch_name"
                              defaultValue={viewAndPayDetails.branch_name}
                              onChange={(e)=>handlePaymentDetails(e,'')}
     
                               className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                       focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" />
                           </div>
                     </div>
                     {
                       paymentDetail.bankName === 'OTHERS' ?   
                       <div className='mb-4 ml-3 mt-2 flex'>
                       <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                       Please mention other bank name
                       <p className='contents text-red-600 text-sm font-bold'>*</p>
                       </label>
                       <input 
                       name="othersBankName"
                       id="othersBankName"
                
                              defaultValue={viewAndPayDetails.othersBankName}
                              onChange={(e)=>handlePaymentDetails(e,'')}
                         className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                 focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                        type="text" placeholder="" /> 
                        </div>
                        : ''
                      }
               </div>
               <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-2 navcustomproperty mb-2 ring-1 ring-black rounded-none">
                <h2 className="text-sm font-semibold text-center text-white">
                  Card Details
                </h2>
             </nav>
              
                <div className="md:flex-1 lg:flex  ">
                       <div className="mb-4 ml-3 mt-2 flex">
                         <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                           Card type<p className='contents text-red-600 text-xs font-bold'>*</p>
                         </label>
                         <Select 
                                            name="card_type"
                                            defaultValue={viewAndPayDetails.card_type}
                                            onChange={(e)=>handlePaymentDetails(e,'cardType')}
                                                id="cardType"
                                                label="Select" 
                                                className="w-full pl-2 pr-3 py-1 font-bold text-xs 
                                                  text-gray-900
                                                ">
                                                <Option value='cardType_1' >credit</Option>
                                                <Option value='cardType_2' >debit</Option>
                                            </Select>
                       </div>
                    <div className='mb-4 ml-3 mt-2 flex'>
                             <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                               Transaction id<p className='contents text-red-600 text-sm font-bold'>*</p>
                             </label>
                             <input 
                             name="card_transaction_Id"
                             defaultValue={viewAndPayDetails.card_transaction_Id}
                             onChange={(e)=>handlePaymentDetails(e,'')}
                               className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                       focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                            type="text" placeholder="" />
                           </div>
                     </div>
               
                     <div className="md:flex-1 lg:flex  ">
                       <div className="mb-4 ml-3 mt-2 flex">
                         <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                           APPR Code<p className='contents text-red-600 text-xs font-bold'>*</p>
                         </label>
                         <input
                       name="appr_code"
                       defaultValue={viewAndPayDetails.appr_code}
                       onChange={(e)=>handlePaymentDetails(e,'')}
                               className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                       focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                              type="text" placeholder="" />
                       </div>
                    <div className='mb-4 ml-3 mt-2 flex'>
                             <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                               Card No.(Last 4 Digits)<p className='contents text-red-600 text-sm font-bold'>*</p>
                             </label>
                             <input 
                                name="last_four_digits_of_card_number"
                                defaultValue={viewAndPayDetails.last_four_digits_of_card_number}
                                onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                maxLength="4"
                                onChange={(e)=>handlePaymentDetails(e,'')}
                               className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                       focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                             type="text" placeholder="" />
                           </div>
                     </div>

                     <div className="md:flex-1 lg:flex  ">
                       <div className="mb-4 ml-3 mt-2 flex">
                         <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                           Card Holder Name<p className='contents text-red-600 text-xs font-bold'>*</p>
                         </label>
                         <input 
                        name="card_holder_name"
                        defaultValue={viewAndPayDetails.card_holder_name}
                        onChange={(e)=>handlePaymentDetails(e,'')}
                               className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                       focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                     type="text" placeholder="" />
                       </div>
                     </div>         
                </> : null}

      </div>
      <button type='submit'
                             className={`file:w-36 h-8 px-4 py-1  mx-4 mb-2 tracking-wide text-white 
                             transition-colors
                         
                              duration-200 
                             transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none
                              focus:bg-green-400 
                              ${btnToggler ? `cursor-not-allowed ` : `cursor-pointer`}
                              `}
                             
                              disabled={btnToggler}
                              
                            
                             >
                             Submit
             </button>
      </form>

          </> : null
         }

{
  displayPaymentDetail ? <>
   <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
           
           <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
             <h2 className="text-sm font-semibold text-center text-white">
               Payment Details
             </h2>
           </nav>
           <Table data={paymentTableData} columns={columnsPaymentDetails} hover={true} striped={true} />
           </div>
     
  </> : null
}
{
  displayDetails ? <> 
  <div className='flex justify-center items-center my-12'>
      <button type='submit'
                                className={`h-8 px-4 py-1  mx-4 mb-2 tracking-wide text-white transition-colors duration-200 
                                transform bg-[#204562] rounded-md hover:bg-[#204562] 
                                focus:outline-none focus:bg-blue-400 
                                ${!demandBtnToggler ? `cursor-not-allowed ` : `cursor-pointer`}
                                `}
                                onClick={(e)=>generateDemandHandler(e)}
                                disabled={!demandBtnToggler}
                                >
                              Generate Demand
                </button>
                <button type='submit'
                                className={`h-8 px-4 py-1  mx-4 mb-2 tracking-wide text-white transition-colors duration-200 
                                transform bg-[#204562] rounded-md hover:bg-[#204562] 
                                focus:outline-none focus:bg-blue-400  
                                ${totalAmount ? `cursor-not-allowed ` : `cursor-pointer`}
                                `}
                              onClick={(e)=>viewAndPayDemandHandler(e)}
                              disabled={totalAmount}
                                >
                             View and Pay Demand
                </button>
                <button type='submit'
                                className=" h-8 px-4 py-1  mx-4 mb-2 tracking-wide text-white transition-colors duration-200 
                                transform bg-[#204562] rounded-md hover:bg-[#204562] 
                                focus:outline-none focus:bg-blue-400" 
                                onClick={(e)=>viewPaymentDetailsHandler(e)}
                                >
                             View Payment Details
                </button>
          </div>
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
  </> : null
}

   </div>
       </>
    }
   
   </>
  )
}

export default DemandandPayment