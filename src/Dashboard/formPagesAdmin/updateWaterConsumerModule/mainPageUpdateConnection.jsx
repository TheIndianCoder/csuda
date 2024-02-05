import React, { Component, useEffect, useState } from 'react'
import { Select, Option, Button, Textarea, Checkbox } from "@material-tailwind/react";
import { CirclesWithBar, ColorRing } from 'react-loader-spinner'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { convertDateToAPIFormat } from '@/utils/commonUtils';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { getCookieByName } from '@/utils/RequireAuth';
import { useMaterialTailwindController } from '@/Dashboard/context';
import PaymentReceipt from '../propertyPaymentModule/searchProperty/paymentReceipt';



const MainPageUpdateConnection = () => {

  const wardData = [
    {
        id: 124,
        zone_mstr_id: 16,
        ward_name: "1",
        area_name: "JANUWANI",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 125,
        zone_mstr_id: 16,
        ward_name: "2",
        area_name: "ISMRITI NAGAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 126,
        zone_mstr_id: 16,
        ward_name: "3",
        area_name: "KOSANAGAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 127,
        zone_mstr_id: 16,
        ward_name: "4",
        area_name: "RADHIKA NAGAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 128,
        zone_mstr_id: 16,
        ward_name: "5",
        area_name: "LAXMI NAGAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 129,
        zone_mstr_id: 16,
        ward_name: "6",
        area_name: "SUPAILA BAZAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 130,
        zone_mstr_id: 16,
        ward_name: "7",
        area_name: "FARID NAGAR KOHAKA",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 131,
        zone_mstr_id: 16,
        ward_name: "8",
        area_name: "RANI AWANTIKABAI KOHAKA",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 132,
        zone_mstr_id: 16,
        ward_name: "9",
        area_name: "PURANI BASTI KHOHKA",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 133,
        zone_mstr_id: 16,
        ward_name: "12",
        area_name: "CONTACTOR COLONY",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 134,
        zone_mstr_id: 16,
        ward_name: "67",
        area_name: "SECTOR-08",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 135,
        zone_mstr_id: 16,
        ward_name: "69",
        area_name: "SHAHID KHAUSHAL NAGAR SOUTH",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 136,
        zone_mstr_id: 16,
        ward_name: "70",
        area_name: "SHAHID KHAUSHAL NAGAR NORTH",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 137,
        zone_mstr_id: 16,
        ward_name: "10",
        area_name: "SHANTI NAGAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 138,
        zone_mstr_id: 16,
        ward_name: "11",
        area_name: "AMBEDKAR NAGAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 139,
        zone_mstr_id: 16,
        ward_name: "13",
        area_name: "RAJIV NAGAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 140,
        zone_mstr_id: 17,
        ward_name: "14",
        area_name: "RAMNAGAR MUKTIDHAM",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 141,
        zone_mstr_id: 17,
        ward_name: "15",
        area_name: "VAISHALI NAGAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 142,
        zone_mstr_id: 16,
        ward_name: "16",
        area_name: "KURUD",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 143,
        zone_mstr_id: 16,
        ward_name: "17",
        area_name: "VIRNDA NAGAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 144,
        zone_mstr_id: 17,
        ward_name: "18",
        area_name: "PREM NAGAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 145,
        zone_mstr_id: 17,
        ward_name: "19",
        area_name: "SHASTRI NAGAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 146,
        zone_mstr_id: 17,
        ward_name: "26",
        area_name: "HOUSING BOARD",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 147,
        zone_mstr_id: 17,
        ward_name: "27",
        area_name: "GHASHIDAS NAGAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 148,
        zone_mstr_id: 17,
        ward_name: "20",
        area_name: "PRAGTI NAGAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 149,
        zone_mstr_id: 17,
        ward_name: "21",
        area_name: "SUNDAR NAGAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 150,
        zone_mstr_id: 17,
        ward_name: "22",
        area_name: "SHYAM NAGAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 151,
        zone_mstr_id: 17,
        ward_name: "23",
        area_name: "RAVIDAS NAGAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 152,
        zone_mstr_id: 17,
        ward_name: "24",
        area_name: "SHARDAPARA",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 153,
        zone_mstr_id: 17,
        ward_name: "25",
        area_name: "SANTOSHIPARA",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 154,
        zone_mstr_id: 19,
        ward_name: "46",
        area_name: "SECTOR-03",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 155,
        zone_mstr_id: 19,
        ward_name: "47",
        area_name: "SECTOR-01 SOUTH",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 156,
        zone_mstr_id: 19,
        ward_name: "48",
        area_name: "SECTOR-01 NORTH",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 157,
        zone_mstr_id: 19,
        ward_name: "49",
        area_name: "SECTOR-02 EAST",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 158,
        zone_mstr_id: 19,
        ward_name: "50",
        area_name: "SECTOR-02 WEST",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 159,
        zone_mstr_id: 17,
        ward_name: "28",
        area_name: "CHHAWANI BASTI",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 160,
        zone_mstr_id: 17,
        ward_name: "29",
        area_name: "KHURSIPAR ZONE-2 BAPU NAGAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 161,
        zone_mstr_id: 18,
        ward_name: "30",
        area_name: "KHURSI ZONE-2 BALAJEE NAGAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 162,
        zone_mstr_id: 18,
        ward_name: "31",
        area_name: "KHURSI ZONE-3 DURGA MANDIR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 163,
        zone_mstr_id: 18,
        ward_name: "32",
        area_name: "NEW KHURSI RADHAKRISHN MANDIR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 164,
        zone_mstr_id: 18,
        ward_name: "33",
        area_name: "KHURSI ZONE-3  ",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 165,
        zone_mstr_id: 18,
        ward_name: "34",
        area_name: "SUBHASH NAGAR KHURSI ZONE-2",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 166,
        zone_mstr_id: 18,
        ward_name: "35",
        area_name: "SHASTRI NAGAR KHURSI ZONE-2",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 167,
        zone_mstr_id: 18,
        ward_name: "36",
        area_name: "GAUTAM NAGAR KHURSI ZONE-1",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 168,
        zone_mstr_id: 18,
        ward_name: "37",
        area_name: "CHANDR SHEKHAR AZAD NAGAR KHURSI ZONE-1",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 169,
        zone_mstr_id: 19,
        ward_name: "38",
        area_name: "S. V.R. NAGAR KHURSI",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 170,
        zone_mstr_id: 19,
        ward_name: "39",
        area_name: "PURAINA",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 171,
        zone_mstr_id: 19,
        ward_name: "51",
        area_name: "SECTOR-04 EAST",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 172,
        zone_mstr_id: 18,
        ward_name: "52",
        area_name: "SECTOR-04 WEST",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 173,
        zone_mstr_id: 18,
        ward_name: "53",
        area_name: "SECTOR-05 EAST ",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 174,
        zone_mstr_id: 18,
        ward_name: "54",
        area_name: "SECTOR-05 WEST",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 175,
        zone_mstr_id: 18,
        ward_name: "55",
        area_name: "SECTOR-06 EAST",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 176,
        zone_mstr_id: 18,
        ward_name: "56",
        area_name: "SECTOR-06 MIDDLE ",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 177,
        zone_mstr_id: 24,
        ward_name: "57",
        area_name: "SECTOR-06 WEST",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 178,
        zone_mstr_id: 24,
        ward_name: "64",
        area_name: "SECTOR-10",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 179,
        zone_mstr_id: 24,
        ward_name: "65",
        area_name: "SECTOR-07 EAST",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 180,
        zone_mstr_id: 24,
        ward_name: "66",
        area_name: "SECTOR-07 WEST",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 181,
        zone_mstr_id: 24,
        ward_name: "68",
        area_name: "SECTOR-09 HOUSING SECTOR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 182,
        zone_mstr_id: 19,
        ward_name: "40",
        area_name: "JORATARAI",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 183,
        zone_mstr_id: 19,
        ward_name: "41",
        area_name: "DUNDERA",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 184,
        zone_mstr_id: 19,
        ward_name: "42",
        area_name: "NEWAI BHATHA",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 185,
        zone_mstr_id: 19,
        ward_name: "43",
        area_name: "STATION MARODA",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 186,
        zone_mstr_id: 19,
        ward_name: "44",
        area_name: "MARODA CAMP MOHARI MATHA",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 187,
        zone_mstr_id: 19,
        ward_name: "45",
        area_name: "MARODA SECTOR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 188,
        zone_mstr_id: 19,
        ward_name: "58",
        area_name: "RISALI SECTOR NORTH",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 189,
        zone_mstr_id: 19,
        ward_name: "59",
        area_name: "RISALI SECTOR SOUTH",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 190,
        zone_mstr_id: 19,
        ward_name: "60",
        area_name: "RISALI BASTI",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 191,
        zone_mstr_id: 19,
        ward_name: "61",
        area_name: "PRAGATI NAGAR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 192,
        zone_mstr_id: 19,
        ward_name: "62",
        area_name: "RUWABANDHA SECTOR",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 193,
        zone_mstr_id: 19,
        ward_name: "63",
        area_name: "RUWABANDHA BASTI",
        stampdate: "2017-07-28",
        user_id: 1,
        status: "1"
    },
    {
        id: 426,
        zone_mstr_id: 19,
        ward_name: "0",
        area_name: "RUWABANDHA BASTI",
        stampdate: "2022-02-23",
        user_id: 1,
        status: "1"
    }
]

const monthList = [
  {
    id: 1,
    month: "January",
  },
  {
    id: 2,
    month: "February",
  },
  {
    id: 3,
    month: "March",
  },
  {
    id: 4,
    month: "April",
  },
  {
    id: 5,
    month: "May",
  },
  {
    id: 6,
    month: "June",
  },
  {
    id: 7,
    month: "July",
  },
  {
    id: 8,
    month: "August",
  },
  {
    id: 9,
    month: "September",
  },
  {
    id: 10,
    month: "October",
  },
  {
    id: 11,
    month: "November",
  },
  {
    id: 12,
    month: "December",
  },
]

useEffect(()=>{
console.log(monthList)
},[])


const searchConsumerDetails = {                 
  ward_id:'',
  propertyNo:'',
  ConsumerNo:'',
  MobileNUmber:'',
  name:'',
  }

  const connectionDetails = {
    month_name:'',
    receipt_number:'',
    book_number:'',
    receipt_date: ''
  }
  
  const [connectionDetail, setConnectionDetail] = useState(connectionDetails); 

    const [searchConsumerDetail, setSearchConsumerDetail] = useState(searchConsumerDetails); 
    const [searchConsumerDetailResult, setSearchConsumerDetailResult] = useState([])
    const [displayTable, setDisplayTable] = useState(false)
    const [displayDetails, setDisplayDetails] = useState(false)
    const [consumerDetails, setConsumerDetails] = useState([])
    const [toggle, setToggle] = useState(true)
    const[displayDemandTableView, setDisplayDemandTableView] = useState(false)
    const [ownerImageFile, setOwnerImageFile] = useState()

  useEffect(()=>{
  console.log(ownerImageFile)
  }, [ownerImageFile])
  
  useEffect(()=>{
    console.log(connectionDetail)
  },[connectionDetail])

  const handleSearchQueryChange = (e) => {
  if (e.toString().includes("ward_name")) {
      let wardItem = JSON.parse(e)
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

const handleFileChange = (event) => {
  // console.log(event?.target?.id)
  const eventId = event?.target?.id
  if (eventId?.toString().includes('owner')) {
    setOwnerImageFile(event.target.files[0])
}
  // if (!eventId.toString().includes('floor')) {
  //     console.log(event?.target?.files?.length)
  //     if (eventId?.toString().includes('owner')) {
  //         setOwnerImageFile(event.target.files[0])
  //     } else if (eventId?.toString().includes('rain')) {
  //         setRainWaterFile(event.target.files[0])
  //     }
  // } 
  else {
      let files = event.target.files
      console.log(files.length)
      console.log(files)

      for (let i = 0; i < files.length; i++) {
          console.log("inside set floor files loop")
          console.log(files[i])
          setFloorImageFiles(prevState => {
              return [
                  ...prevState,
                  files[i]
              ]
          })
      }
  }
}

const uploadFile = async (event) => {
  console.log("uploading file with fy_id=====" + safNewFormOtherDetails.fy_id)
  const userID = getCookieByName('SUDA_USER_ID')
  const fileUploadUrl = `${SUDA_API_BASE_URL}/user/SAFDocumentUpload?doc_mstr_id=103&fy_id=${safNewFormOtherDetails.fy_id}&prop_id=${safNewFormBasicDetails.prop_id}&user_id=${userID}`

  const eventId = event?.target?.id.toString()
  let uploadTypeFlag = null
  let formData = new FormData()
  console.log("upload id::" + event.target.id)
  if (eventId.includes('floor')) {
      setIsFloorImageUploading(true)
      uploadTypeFlag = "floor"
      console.log(floorImageFiles)
      floorImageFiles.forEach(item => {
          formData.append('file', item)
      })
  } else if (eventId.includes('owner')) {
      setIsOwnerImageUploading(true)
      uploadTypeFlag = "owner"
      formData.append('file', ownerImageFile)
  } else if (eventId.includes('rain')) {
      setIsRainWaterFIleUploading(true)
      uploadTypeFlag = "rain"
      formData.append('file', rainWaterFile)
  }

  const requestOptions = {
      method: "POST",
      headers: {
          'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}`,
      },
      body: formData
  }

  let response = null
  try {
      response = await fetch(fileUploadUrl, requestOptions)
  } catch (ex) {
      if (uploadTypeFlag == 'floor') {
          setIsFloorImageUploading(false)
          setIsFloorImageUploaded(false)
      } else if (uploadTypeFlag == 'owner') {
          setIsOwnerImageUploading(false)
          setIsOwnerImageUploaded(false)
      } else if (uploadTypeFlag == 'rain') {
          setIsRainWaterFIleUploading(false)
          setIsRainWaterFIleUploaded(false)
      }
      console.log(ex)
  }
  let responseBody = null
  try {
      responseBody = await response?.json()
  } catch (ex) {
      console.log(ex)
  }
  console.log("wooohooo file uploading.........")
  console.log(response)
  console.log(responseBody)
  if (response?.status == '200') {
      if (uploadTypeFlag == 'floor') {
          setIsFloorImageUploading(false)
          setIsFloorImageUploaded(true)
      } else if (uploadTypeFlag == 'owner') {
          setIsOwnerImageUploading(false)
          setIsOwnerImageUploaded(true)
      } else if (uploadTypeFlag == 'rain') {
          setIsRainWaterFIleUploading(false)
          setIsRainWaterFIleUploaded(true)
      }
  } else {
      if (uploadTypeFlag == 'floor') {
          setIsFloorImageUploading(false)
          setIsFloorImageUploaded(false)
      } else if (uploadTypeFlag == 'owner') {
          setIsOwnerImageUploading(false)
          setIsOwnerImageUploaded(false)
      } else if (uploadTypeFlag == 'rain') {
          setIsRainWaterFIleUploaded(false)
      }
  }
}

const displayDemandTable = () =>{
  setDisplayDemandTableView(true)
}
const handleSearchConnectionDetail =(e, id) => {
  if (id.includes("month_name")) {
    let wardItem = JSON.parse(e) 
    setConnectionDetail((prevState) => {
      return {
        ...prevState,
        month_name: wardItem
      }
    })
  }
  else if (id.includes("receipt_date")) {
    setConnectionDetail(prevState => {
      return { ...prevState, receipt_date: convertDateToAPIFormat(e.$d) }
    })
}
  else{
    setConnectionDetail({
    ...connectionDetail,                                // spreading the unchanged values
    [e.target.name]: e.target.value,          // changing the state of *changed value*
  });
}
}

  const handleViewBtnClick = (e,b) => {
    setDisplayDetails(true)
    setToggle(false)
  }
const updateBasicDetailFormHandler = (e) => {
  e.preventDefault()
  setDisplayTable(true)
  console.log(searchConsumerDetail)
}
  return (
   <>
  
    <div className="relative flex flex-col justify-center  overflow-hidden mt-10 mb-10">
      {
        toggle ? <>
        <div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-md border border-gray-500 lg:max-w-full">
        <form className="mt-4 h-screen" onSubmit={updateBasicDetailFormHandler}>
        <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
            <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
              <h2 className="text-sm font-semibold text-center text-white">
                Search Property
              </h2>
            </nav>
            <div className=" md:flex-1 flex-col justify-center items-center lg:flex mt-3 mb-6">
              <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                  Ward No
                
                </label>
                <Select 
                 onChange={(e)=>handleSearchQueryChange(e)}
                                     name="ward_name"
                                     defaultValue={searchConsumerDetail.ward_id}
                                        label="select" 
                                        className="pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                       ">
                                        {
                                            wardData.length > 0 ?
                                                (wardData.map((item) => {
                                                    const {id,zone_mstr_id,ward_name,area_name,stampdate,user_id,status} = item
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
               
                onChange={(e)=>handleSearchQueryChange(e)}
                name="propertyNo"
                defaultValue={searchConsumerDetail.propertyNo}
                  className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                  type="text" placeholder="Property No." />
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
                name="ConsumerNo"
                defaultValue={searchConsumerDetail.ConsumerNo}
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
                defaultValue={searchConsumerDetail.MobileNUmber}
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
                 defaultValue={searchConsumerDetail.name}
                  className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                  type="text" placeholder="" />
              </div>
            </div>
            <div className='flex justify-center items-center'>
            <button type='submit'
                               
                               className="w-36 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white 
                               transition-colors duration-200  
                               transform bg-green-400 rounded-md hover:bg-green-700 
                               focus:outline-none focus:bg-green-400">
                               Submit
                           </button>
                           </div>
          </div>
         
        </form>
       </div>
        </> : null
      }


       {
        displayTable ? <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-2.5">
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
                      Consumer No
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 text-xs font-bold text-center text-gray-700  whitespace-normal uppercase  border border-gray-300"
                    >
                      Consumer name
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                    >
                      Mobile No
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 text-xs font-bold text-center text-gray-700 whitespace-normal uppercase border border-gray-300"
                     
                      onClick={handleViewBtnClick}
                   >
                      View
                    </th>

                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {
                    searchConsumerDetailResult?.length > 0 ? (
                      searchConsumerDetailResult.map((searchResObj, index) => {
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
      </div> : null
       }
     </div>


    {
      displayDetails ? <>
       <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
      <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
          Consumer Details
        </h2>
      </nav>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-2.5 lg:w-full inline-block align-middle">
            <div className="overflow-hidden">
              {!consumerDetails?.length > 0 ? (
                <table className="min-w-full">
                  <thead className="bg-gray-50">

                  </thead>

                  <tbody>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                        Consumer No
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        {/* {propertyDetails[0].ward_id ? propertyDetails[0].ConsumerNo : 'N/A'} */}
                      </td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                        Old Consumer No(if any)
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        {/* {propertyDetails[0].entry_type ? propertyDetails[0].entry_type : 'N/A'} */}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Consumer Name
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        {/* {propertyDetails[0].property_no ? propertyDetails[0].property_no : 'N/A' } */}
                      </td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Mobile No.
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal ">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        {/* {propertyDetails[0].consumer_no ? propertyDetails[0].consumer_no : 'N/A' } */}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Relation
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                     
                      </td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Gaurdian Name
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                        {/* {propertyDetails[0].uses_type_name ? propertyDetails[0].uses_type_name : 'N/A'} */}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Ward No
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                        {/* {propertyDetails[0].totalbuilbup_area ? propertyDetails[0].totalbuilbup_area : 'N/A'} */}
                      </td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal"></td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal"></td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal"></td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Property Type
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        {/* {propertyDetails[0].property_address ? propertyDetails[0].property_address : 'N/A'} */}
                      </td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Holding No
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        {/* {propertyDetails[0].mohalla ? propertyDetails[0].mohalla : 'N/A'} */}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Property Address
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal ">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        {/* {propertyDetails[0].fy_name ? propertyDetails[0].fy_name : 'N/A'} */}
                      </td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        No of connection/room
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        {/* {propertyDetails[0].building_name ? propertyDetails[0].building_name : 'N/A'} */}
                      </td>
                    </tr>
                  </tbody>

                </table>) : 
                <p className='text-center font-semibold text-sm text-red-700' >
                  {/* {propDetailsErr.errMsg} */}
                  </p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
      <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
          Consumer Connection Details
        </h2>
      </nav>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-2.5 lg:w-full inline-block align-middle">
            <div className="overflow-hidden">
              {!consumerDetails?.length > 0 ? (
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                        Property Type
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        {/* {propertyDetails[0].ward_id ? propertyDetails[0].ConsumerNo : 'N/A'} */}
                      </td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                       Initial Meter Reading
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        {/* {propertyDetails[0].entry_type ? propertyDetails[0].entry_type : 'N/A'} */}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Connection Type
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        {/* {propertyDetails[0].property_no ? propertyDetails[0].property_no : 'N/A' } */}
                      </td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        No of Connection/Room
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal ">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        {/* {propertyDetails[0].consumer_no ? propertyDetails[0].consumer_no : 'N/A' } */}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Meter No
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                        {/* {propertyDetails[0].property_type_name ? propertyDetails[0].property_type_name : "N/A"} */}
                      </td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Effect of Connection
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal ">
                        {/* {propertyDetails[0].uses_type_name ? propertyDetails[0].uses_type_name : 'N/A'} */}
                      </td>
                    </tr>
                  </tbody>
                </table>) : 
                <p className='text-center font-semibold text-sm text-red-700' >
                  {/* {propDetailsErr.errMsg} */}
                  </p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
      <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
          Consumer Unit Rate Details
        </h2>
      </nav>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-2.5 lg:w-full inline-block align-middle">
            <div className="overflow-hidden">
              {!consumerDetails?.length > 0 ? (
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                        Unit Rate
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        {/* {propertyDetails[0].ward_id ? propertyDetails[0].ConsumerNo : 'N/A'} */}
                      </td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                       Date of effect
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        {/* {propertyDetails[0].entry_type ? propertyDetails[0].entry_type : 'N/A'} */}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Extra Charge
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        {/* {propertyDetails[0].property_no ? propertyDetails[0].property_no : 'N/A' } */}
                      </td>
                      <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900  whitespace-normal">
                        Status
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal ">
                        :
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        {/* {propertyDetails[0].consumer_no ? propertyDetails[0].consumer_no : 'N/A' } */}
                      </td>
                    </tr>
                   
                  </tbody>
                </table>) : 
                <p className='text-center font-semibold text-sm text-red-700' >
                  {/* {propDetailsErr.errMsg} */}
                  </p>
              }
            </div>
          </div>
        </div>
      </div>
    
    </div>

    <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
      <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 
      navcustomproperty mb-1 ring-1 ring-black rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
        Last Payment Details
        </h2>
      </nav>
      {/* <div className="flex flex-col"> 
        <div className="overflow-x-auto">
          <div className="p-2.5 lg:w-full inline-block align-middle"> */}
            <div className="overflow-hidden">
              {!consumerDetails?.length > 0 ? (
                // <table className="min-w-full">
                //   <thead className="bg-gray-50">
                //   </thead>
                //   <tbody>
                //     <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                //       <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                //        
                //       </td>
                //       <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                //         :
                //       </td>
                //       <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal h-screen">
                   <>
                   <div className='flex h-60 w-96'>                     
                    <p className='px-4 py-2 font-semibold text-xs w-60 text-gray-900 whitespace-normal'> 
                    Update Upto Month 
                    </p>
                    <Select 
                                     name="month_name"
                                     id="month_name"
                                     defaultValue={connectionDetail.month_name}
                                     onChange={(e)=> handleSearchConnectionDetail(e,"month_name")}
                                        label="select"  
                                        className="pl-2 pr-3 py-2 font-bold text-xs text-gray-900">
                                        {
                                            monthList.length > 0 ?
                                                (monthList.map((item) => {
                                                    const { id, month } = item
                                                    return <Option key={id} value={JSON.stringify(item)}>
                                                      {`${month}`}
                                                    </Option>
                                                })) : (<Option>Loading...</Option>)
                                        }
                                    </Select>
                        <button type='button' 
                         className='h-6 w-16 px-2 py-3 flex items-center bg-gray-600 text-sm rounded ml-2 mt-2'
                                onClick={displayDemandTable}
                              >View</button>
                        </div>
                        {
                          displayDemandTableView ? 
                          <>
                           <table className="min-w-full">
                  <thead className="bg-gray-50">
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600 bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs  text-gray-900 whitespace-normal">
                        Sl no
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        Demand from
                      </td>
                      
                      <td className="px-4 py-2 font-semibold text-xs text-gray-900 whitespace-normal">
                      Demand upto
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                        Amount
                      </td>
                    
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs  text-gray-900  whitespace-normal">
                        1.
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        01-Jan-2023
                      </td>
                     
                      <td className="px-4 py-2 font-semibold text-xs text-gray-900  whitespace-normal">
                        31-Jan-2023
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal ">
                        210.00
                      </td>
                    </tr>
                      
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-4 py-2 font-semibold text-xs  text-gray-900  whitespace-normal">
                        2.
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal">
                        01-Jan-2023
                      </td>
                     
                      <td className="px-4 py-2 font-semibold text-xs text-gray-900  whitespace-normal">
                       {connectionDetail?.month_name?.month}
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-900  whitespace-normal ">
                        210.00
                      </td>
                    </tr>
                   

                  </tbody>
                </table>
                          </> :null
                        }
                   </>
                //       </td>
                //     </tr>       
                //   </tbody>
                // </table>
                ) : 
                <p className='text-center font-semibold text-sm text-red-700' >
                  {/* {propDetailsErr.errMsg} */}
                  </p>
              }
            </div>
          {/* </div>
        </div>
      </div> */}
    
    </div>
   
      <div className='px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full'>
      <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 
      navcustomproperty mb-1 ring-1 ring-black rounded-none">
        <h2 className="text-sm font-semibold text-center text-white">
        Receipt Details
        </h2>
      </nav>
      <div className='flex md:mb-12 gap-3'>
      <div className='flex'>
      <p className='x-4 py-2 text-xs font-medium text-gray-900 whitespace-normal w-40'>
        Receipt Details
      </p>
      <input type='text' className='bg-white-200 appearance-none border 
                                        border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight 
                                            focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500' 
                                            name="receipt_number"
                                            id="receipt_number"
                                            defaultValue={connectionDetail.receipt_number}
                                            onChange={(e)=> handleSearchConnectionDetail(e,"receipt_number")}
       />
      </div>
        <div className='flex'>
          <p className='x-4 py-2 text-xs font-medium text-gray-900 whitespace-normal w-40'>
            Book no
          </p>
          <input type='text' className='bg-white-200 appearance-none border 
                                        border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight 
                                            focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500' 
                                            name="book_number"
                                            id="book_number"
                                            defaultValue={connectionDetail.book_number}
                                            onChange={(e)=> handleSearchConnectionDetail(e,"book_number")}
          />
        </div>
      </div>
      <div className='flex md:mb-12 gap-3'>
      <div className='flex'>
      <p className='x-4 py-2 text-xs font-medium text-gray-900 whitespace-normal w-40'>
        Receipt Date
      </p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}> 
                      <DesktopDatePicker
                        // label="Date desktop"
                        onChange={(e)=> handleSearchConnectionDetail(e, "receipt_date")}
                        name="receipt_date"
                        id="receipt_date"
                        inputFormat="YYYY-MM-DD"
                        renderInput={(params) => <TextField
                          {...params}
                        />}
                        //disableFuture={true}
                        value={connectionDetail.receipt_date}
                      />
                    </Stack>
                  </LocalizationProvider>
                          
            </div>
        </div>

        <div className='flex md:mb-12 gap-3'>
      <div className='flex'>
      <p className='x-4 py-2 text-xs font-medium text-gray-900 whitespace-normal w-40'>
        Upload Receipt
      </p>
      <input onChange={handleFileChange}
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
                                            id="owner_file" />
                          
            </div>
        </div>
      </div>
    </> : null
      
    }


   </>
  )
}

export default MainPageUpdateConnection