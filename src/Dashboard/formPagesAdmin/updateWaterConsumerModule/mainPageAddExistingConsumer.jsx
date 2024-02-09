import React, { useEffect, useRef, useState } from 'react'
import { addExistingConsumerMsgList, safInputValidatorMsgList } from '../../../Dashboard/data/saf-input-validator-list'
import { Select, Option, Button, Textarea, Checkbox, Tooltip, Switch } from "@material-tailwind/react";
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { CirclesWithBar, ColorRing } from 'react-loader-spinner'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import { convertDateToAPIFormat, convertDateFormat } from '@/utils/commonUtils';
import { useMaterialTailwindController } from '@/Dashboard/context'
import { useNavigate } from 'react-router-dom';
import { dashboardRoutesObject } from '@/Dashboard/data/routes-dashboard-constants';
import PaymentReceipt from './paymentReceipt';
import PaymentReceiptHindi from './paymentReceiptInHindi';
import { compareAsc, format } from 'date-fns'
import { getCookieByName } from '@/utils/RequireAuth';
import AddConsumerModal from './AddConsumerModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

let floorStack = []
let finalReqObjForAddExistingCustomer = {}
const MainPageAddExistingConsumer = () => {
  const [controller, dispatch] = useMaterialTailwindController();
  const { paymentModeDetailsInputFromAPI } = controller;
  const currUrl = window.location.href.toLowerCase()

  const isPublicSAF = currUrl.includes("dashboard") ? false : true
  const [safNewFormAllInputFromAPI, setSafNewFormAllInputFromAPI] = useState({
    // zone: [],
    ward: [],
    // floor: [],
    // building_type: [],
    property_type: [],
    // occupation_type: [],
    // uses_type: [],
    // roadType: [],
    // entry_type: [],
    // financial_year: [],
  })
  const propertyTypeData = [
    {
      id: 1,
      prop_type: "DOMESTIC CONN",
      status: 1
    },
    {
      id: 2,
      prop_type: "DOMESTIC CONN (NON-PROPERTY TAX PAYER)",
      status: 1
    },
    {
      id: 3,
      prop_type: "HOTEL",
      status: 1
    },
    {
      id: 4,
      prop_type: "RESTAURANT",
      status: 1
    },
    {
      id: 5,
      prop_type: "RESIDENCE CUM SHOP",
      status: 1
    },
    {
      id: 6,
      prop_type: "COMMERCIAL",
      status: 1
    },
    {
      id: 7,
      prop_type: "INDUSTRIAL  GOVT.",
      status: 1
    },
    {
      id: 8,
      prop_type: "INSTITUTIONAL GOVT.",
      status: 1
    },
    {
      id: 9,
      prop_type: "INSTITUTIONAL PVT.",
      status: 1
    },
    {
      id: 10,
      prop_type: "INDUSTRIAL PVT.",
      status: 1
    },
    {
      id: 11,
      prop_type: "TEMPORARY CONNECTION",
      status: 1
    }
  ]
  const connectionTypeData = [
    {
      id: 1,
      conn_type: "METERED",
      status: 1
    },
    {
      id: 2,
      conn_type: "NON-METER",
      status: 1
    }
  ]

  const rate = [
    {
      id: 12,
      prop_type_id: 1,
      conn_type_id: 2,
      range_mstr_id: 0,
      amount: 200.00,
      date_of_effect: "1965-04-01",
      status: 1
    },
    {
      id: 13,
      prop_type_id: 2,
      conn_type_id: 2,
      range_mstr_id: 0,
      amount: 60.00,
      date_of_effect: "1965-04-01",
      status: 1
    },
    {
      id: 14,
      prop_type_id: 6,
      conn_type_id: 2,
      range_mstr_id: 0,
      amount: 800.00,
      date_of_effect: "1965-04-01",
      status: 1
    },
    {
      id: 15,
      prop_type_id: 3,
      conn_type_id: 2,
      range_mstr_id: 5,
      amount: 800.00,
      date_of_effect: "1965-04-01",
      status: 1
    },
    {
      id: 16,
      prop_type_id: 4,
      conn_type_id: 2,
      range_mstr_id: 6,
      amount: 800.00,
      date_of_effect: "1965-04-01",
      status: 1
    },
    {
      id: 17,
      prop_type_id: 4,
      conn_type_id: 2,
      range_mstr_id: 7,
      amount: 1200.00,
      date_of_effect: "1965-04-01",
      status: 1
    },
    {
      id: 18,
      prop_type_id: 4,
      conn_type_id: 2,
      range_mstr_id: 8,
      amount: 2000.00,
      date_of_effect: "1965-04-01",
      status: 1
    },
    {
      id: 19,
      prop_type_id: 7,
      conn_type_id: 2,
      range_mstr_id: 0,
      amount: 1000.00,
      date_of_effect: "1965-04-01",
      status: 1
    },
    {
      id: 20,
      prop_type_id: 8,
      conn_type_id: 2,
      range_mstr_id: 0,
      amount: 800.00,
      date_of_effect: "1965-04-01",
      status: 1
    },
    {
      id: 21,
      prop_type_id: 9,
      conn_type_id: 2,
      range_mstr_id: 0,
      amount: 800.00,
      date_of_effect: "1965-04-01",
      status: 1
    },
    {
      id: 32,
      prop_type_id: 5,
      conn_type_id: 2,
      range_mstr_id: 0,
      amount: 350.00,
      date_of_effect: "1965-04-01",
      status: 1
    },
    {
      id: 34,
      prop_type_id: 10,
      conn_type_id: 2,
      range_mstr_id: 0,
      amount: 1000.00,
      date_of_effect: "1965-04-01",
      status: 1
    }
  ]

  const range = [
    {
      id: 5,
      prop_type_id: 3,
      ws_range: "1-5",
      status: 1,
      date_of_effect: "1965-04-01"
    },
    {
      id: 6,
      prop_type_id: 4,
      ws_range: "1-10",
      status: 1,
      date_of_effect: "1965-04-01"
    },
    {
      id: 7,
      prop_type_id: 4,
      ws_range: "11-15",
      status: 1,
      date_of_effect: "1965-04-01"
    },
    {
      id: 8,
      prop_type_id: 4,
      ws_range: "16-999",
      status: 1,
      date_of_effect: "1965-04-01"
    }
  ]
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

  const modeOfPayment = [
    {
      id: 1,
      mode_of_payment: "Cash",
      status: 1
    },
    {
      id: 2,
      mode_of_payment: "Cheque",
      status: 1
    },
    {
      id: 3,
      mode_of_payment: "DD",
      status: 1
    },
    {
      id: 4,
      mode_of_payment: "Card",
      status: 1
    },
    {
      id: 5,
      mode_of_payment: "NEFT",
      status: 1
    },
    {
      id: 6,
      mode_of_payment: "RTGS",
      status: 1
    }
  ]

  const fetchAmount = [
    {
      id: 3,
      prop_type_id: 3,
      amount: 100.00,
      date_of_effect: "1965-04-01"
    }
  ]


  //new added
  // const [paymentTransactionDetails, setPaymentTransactionDetails] = useState({
  //     appr_code: "",
  //     bank_name: "",
  //     branch: "",
  //     card_holder_name: "",
  //     card_no: "",
  //     card_type: "",
  //     cheque_date: "",
  //     cheque_no: "",
  //     dd_date: "",
  //     dd_no: "",
  //     demand_payment: "",
  //     discount: "",
  //     due_from_year: "",
  //     due_up_to_year: "",
  //     narration: "",
  //     neft_date: "",
  //     neft_no: "",
  //     others_bank_name: "",
  //     payment_mode: "",
  //     payment_mode_id: "",
  //     rtgs_date: "",
  //     rtgs_no: "",
  //     transaction_id: "",
  //   })

  const handlePaymentTransactionDetailsChange = (event) => {
    // console.log(event)
    let paymentMode = (paymentModeObj.payment_mode + "").trim().toLowerCase()
    let eventStr = event + ""
    // console.log(eventStr)
    if (event?.target?.id) {
      let eventId = event.target.id;
      let eventVal = event.target.value
      setPaymentTransactionDetails(prevState => {
        return { ...prevState, [eventId]: eventVal }
      })
    } else if (event?.$d) {
      // console.log("setting payment date======")
      if (paymentMode == "cheque") {
        setPaymentTransactionDetails(prevState => {
          return {
            ...prevState, cheque_date: event.$d,
            dd_date: "", neft_date: "", rtgs_date: ""
          }
        })
      } else if (paymentMode == "dd") {
        setPaymentTransactionDetails(prevState => {
          return {
            ...prevState, dd_date: event.$d,
            cheque_date: "", neft_date: "", rtgs_date: ""
          }
        })
      } else if (paymentMode == "neft") {
        setPaymentTransactionDetails(prevState => {
          return {
            ...prevState, neft_date: event.$d,
            dd_date: "", cheque_date: "", rtgs_date: ""
          }
        })
      } else if (paymentMode == "rtgs") {
        setPaymentTransactionDetails(prevState => {
          return {
            ...prevState, rtgs_date: event.$d,
            neft_date: "", dd_date: "", cheque_date: ""
          }
        })
      }
    } else if (eventStr.includes("card_type")) {
      let cardType = eventStr.split("_")[2]
      setPaymentTransactionDetails(prevState => {
        return { ...prevState, card_type: cardType }
      })
    } else if (eventStr.includes("bank_name")) {
      let eventItem = JSON.parse(event)
      setPaymentTransactionDetails(prevState => {
        return { ...prevState, bank_name: eventItem.bank_name }
      })
    }
  }

  const viewDemandPayment = async (e) => {
    e.preventDefault()
    setDemandLoader(true)
    let parameterValue = ''
    if (consumerDetail.noOfRoom !== '') {
      parameterValue = consumerDetail.noOfRoom
    }
    else if (consumerDetail.noOfConnection !== '') {
      parameterValue = consumerDetail.noOfConnection
    }
    else if (consumerDetail.noOfTables !== '') {
      parameterValue = consumerDetail.noOfTables
    }
    else {
      parameterValue = 0
    }

    try {
      const paymentReceiptDetailsGetUrl = `${SUDA_API_BASE_URL}/user/Water/ViewDemandAmount/${demandDetailWater.demandFrom}/${demandDetailWater.demandUpTo}/${demandDetailWater.arrearAmount}/${consumerDetail.propertyType}/${parameterValue}/${connectionValue}`
      const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
      }
      let response = null, responseBody = null
      response = await fetch(paymentReceiptDetailsGetUrl, requestOptions)
      responseBody = await response.json()
      console.log("receipt in main form", response, responseBody)
      if (response?.status == '200' && !responseBody?.errors) {
        console.log("receipt in main form 200", response, responseBody)
        setDemandLoader(false)
        setDemandValue(responseBody)
      }
      else if (response?.status == "200" && responseBody?.errors) {
        toast.error(responseBody.errors.message, {
          position: toast.POSITION.TOP_CENTER
        });
        setDemandLoader(false)
        setDemandValue('')
      }
      else {
        // toast.error(responseBody.errors.message, {
        //   position: toast.POSITION.TOP_CENTER
        //   });  
      }
    } catch (err) {
      console.log(err)
      // toast.error(err, {
      //   position: toast.POSITION.TOP_CENTER
      //   });   
    }
    finally { }
  }

  const [paymentModeObj, setPaymentModeObj] = useState({
    payment_mode: "",
    payment_mode_id: ""
  })
  //   const paymentDetails = {
  //     paymentMethod:''
  //   }

  //new dded ends
  const consumerDetails = {
    oldConsumerNo: '',
    newConsumerNo: '',
    // wardNo: '',
    holdingNo: '',
    propertyTypeId: '',
    propertyType: '',
    propertyAddress: '',
    noOfConnection: '',
    noOfRoom: '',
    noOfTables: '',
    isNigamEmp: "No"
  }

  const consumerBasicDetails = {
    name: '',
    mobileNo: '',
    relation: '',
    guardianName: ''
  }

  const consumerConnectionDetails = {
    connectionType: '',
    dateOfConnection: ''
  }

  const demandDetailsWater = {
    demandFrom: '',
    //demandUpTo:'',
    // unitRate: '',
    connectionType: '',
    arrearAmount: '',
    connectionType: ''
  }

  const paymentDetails = {
    consumerNo: '',
    //null
    //  effectiveDate: '',
    consumerDetailsId: '',
    //null
    narration: '',
    paymentMode: '',
    paymentModeId: '',
    //  userId: '',
    ipAddress: '',
    narration: '',
    dueFrom: '',
    dueUpTo: '',
    bankName: '',
    othersBankName: '',
    branch: '',
    chequeNo: '',
    chequeDate: '',
    cardType: '',
    transactionId: '',
    apprCode: '',
    cardNo: '',
    cardHolderName: '',
    neftNo: '',
    neftDate: '',
    arrearAmt: '',
    payableAmt: '',
    penalty: '',
    discount: '',
    demandPayment: '',
    demandId: '',
    ddNo: '',
    ddDate: '',
    rtgsNo: '',
    rtgsDate: '',
  }
  const [consumerDetail, setConsumerDetail] = useState(consumerDetails);
  const [wardId, setWardId] = useState('')
  const [consumerBasicDetail, setConsumerBasicDetail] = useState(consumerBasicDetails);
  const [consumerConnectionDetail, setConsumerConnectionDetail] = useState(consumerConnectionDetails)
  const [demandDetailWater, setDemandDetailWater] = useState(demandDetailsWater)
  const [paymentDetail, setPaymentDetail] = useState(paymentDetails)
  const [showReceipt, setShowReceipt] = useState(false)
  const [consumerNumberAfterCreation, setConsumerNumberAfterCreation] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [receiptDetails, setReceiptDetails] = useState([])
  const [displayHindiForm, setDisplayHindiForm] = useState(false)
  const [unitRate, setUnitRate] = useState('')
  const [connectionValue, setConnectionValue] = useState('')
  const [demandValue, setDemandValue] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [demandLoader, setDemandLoader] = useState(false)
  const [disabledemand, setDisabledDemand] = useState(true)
  const [paymentModeSelector, setpaymentModeSelector] = useState('')
  const [extraroom, setExtraRoom] = useState('')
  const [extraRange, setExtraRange] = useState('')
  const [toggleRoom, setToggleRoom] = useState(false)
  const [toggleRange, setToggleRange] = useState(false)
  const [test, setTest] = useState('')

  const [extraRoomCharge, setExtraRoomCharge] = useState(0)

  const [rateId, setRateId] = useState('')

  const [file, setfile] = useState(null)

  const inputRef = useRef()

  const handlePaymentDetails = (e, id) => {
    console.log(e)

    if (e.toString().includes("mode_of_payment")) {
      let connItem = JSON.parse(e)
      // console.log(wardItem)
      setPaymentDetail((prevState) => {
        return {
          ...prevState,
          paymentMode: connItem.mode_of_payment,
          paymentModeId: connItem.id
        }
      })
      setpaymentModeSelector(connItem.mode_of_payment)
    } else if (e.toString().includes("bank_name")) {
      let connItem = JSON.parse(e)
      // console.log(wardItem)
      setPaymentDetail((prevState) => {
        return {
          ...prevState,
          bankName: connItem.bank_name,
        }
      })
    }
    else if (id.includes("chequeDate")) {
      setPaymentDetail(prevState => {
        return { ...prevState, chequeDate: convertDateToAPIFormat(e.$d) }
      })
    }
    else if (id.includes("ddDate")) {
      setPaymentDetail(prevState => {
        return { ...prevState, ddDate: convertDateToAPIFormat(e.$d) }
      })
    }
    else if (e.toString().includes("cardType")) {
      let relation = e.toString().split("_")[1]
      // console.log(zoneItem)
      setPaymentDetail((prevState) => {
        return {
          ...prevState,
          cardType: relation
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
    else if (id.includes("transactionId")) {
      setPaymentDetail(prevState => {
        return {
          ...prevState,
          transactionId: parseInt(e.target.value)
        }
        //transactionId: e.target.value}
      })
    }
    else if (id.includes("apprCode")) {
      setPaymentDetail(prevState => {
        return {
          ...prevState,
          //apprCode: (e.target.value)}
          apprCode: parseInt(e.target.value)
        }
      })
    }
    else if (id.includes("cardNo")) {
      setPaymentDetail(prevState => {
        return {
          ...prevState,
          // cardNo: (e.target.value)}
          cardNo: parseInt(e.target.value)
        }
      })
    }
    else {
      setPaymentDetail({
        ...paymentDetail,                                // spreading the unchanged values
        [e.target.name]: e.target.value,          // changing the state of *changed value*
      });
    }

  }
  const handleDemandDetailsWater = (e, id) => {
    console.log("DEMAND", e, consumerConnectionDetail)
    // if (e.toString().includes("range_mstr_id")) {
    //     let connItem = JSON.parse(e)
    //     // console.log(wardItem)
    //     setDemandDetailWater((prevState) => {
    //         return {
    //             ...prevState,
    //             unitRate: connItem.amount,

    //         }
    //     })
    // }
    if (id.includes("demandFrom")) {
      setDemandDetailWater(prevState => {
        return {
          ...prevState,
          demandFrom: convertDateToAPIFormat(e.$d),
          // connectionType:consumerConnectionDetail.connectionType
        }
      })
    }
    //   else if (id.includes("demandUpTo")) {
    //     setDemandDetailWater(prevState => {
    //       return { 
    //         ...prevState, 
    //         demandUpTo: convertDateToAPIFormat(e.$d),
    //         // connectionType:consumerConnectionDetail.connectionType
    //       }
    //     })
    // }
    else {
      setDemandDetailWater({
        ...demandDetailWater,                                // spreading the unchanged values
        [e.target.name]: e.target.value,          // changing the state of *changed value*
      });
    }
  }

  const handleConsumerConnectionDetails = (e, id) => {
    console.log(e)
    if (e.toString().includes("conn_type")) {
      let connItem = JSON.parse(e)
      // console.log(wardItem)
      setConsumerConnectionDetail((prevState) => {
        return {
          ...prevState,
          connectionType: connItem.id
        }
      })
      setConnectionValue(connItem.conn_type)
    }
    else if (id.includes("dateOfConnection")) {
      setConsumerConnectionDetail(prevState => {
        //const v = convertDateFormat(e.$d)
        const v = convertDateToAPIFormat(e.$d)
        console.log("DATE IN MAIN", v)

        return { ...prevState, dateOfConnection: v }
      })
    }
    else {
      setConsumerConnectionDetail({
        ...consumerConnectionDetail,                                // spreading the unchanged values
        [e.target.name]: e.target.value,          // changing the state of *changed value*
      });
    }
  }

  const handleConsumerBasicDetail = (e, id) => {
    if (e.toString().includes("relation")) {
      let relation = e.toString().split("_")[1]
      // console.log(zoneItem)
      setConsumerBasicDetail((prevState) => {
        return {
          ...prevState,
          relation: relation
        }
      })
    }
    else if (id.includes("mobileNo")) {
      setConsumerBasicDetail(prevState => {
        return {
          ...prevState,
          // mobileNo: parseInt(e.target.value)}
          mobileNo: (e.target.value)
        }
      })
    }
    else {
      setConsumerBasicDetail({
        ...consumerBasicDetail,                                // spreading the unchanged values
        [e.target.name]: e.target.value,          // changing the state of *changed value*
      });
    }

  }
  const handleAddExistingCustomerHandler = (e, id) => {
    const splitParam = e.toString().includes('_') ? e.toString().split('_') : null
    console.log(e)
    if (e.toString().includes("ward_name")) {
      const propertyTypeItem = JSON.parse(e)
      const pN = parseInt(propertyTypeItem.id)
      setWardId((pN))
    }
    // if (e.toString().includes("ward_name")) {
    //   const propertyTypeItem = JSON.parse(e)
    //     setWardId(

    //              parseInt(propertyTypeItem.id)

    //     )
    // }
    else if (e.toString().includes("prop_type")) {
      const propertyTypeItem = JSON.parse(e)
      setConsumerDetail((prevState) => {
        return {
          ...prevState,
          propertyTypeId: parseInt(propertyTypeItem.id),
          //propertyTypeId: (propertyTypeItem.id),
          propertyType: propertyTypeItem.prop_type,
          noOfConnection: '',
          noOfRoom: '',
          noOfTables: ''
        }
      })
      setExtraRange('')
      setExtraRoom('')
      setToggleRange(false)
      setToggleRoom(false)


    }
    else if (e.target.id.includes('isNigamEmp')) {
      setConsumerDetail((prevState) => {
        return {
          ...prevState,
          isNigamEmp: prevState.isNigamEmp == 'Yes' ? 'No' : 'Yes'
        }
      })
    }
    else if (e.target.id.includes('noOfRoom')) {
      //const noOfRoom = JSON.parse(e)
      setConsumerDetail((prevState) => {
        return {
          ...prevState,
          // noOfRoom:  parseInt(e.target.value)
          noOfRoom: (e.target.value)
        }
      })
    }
    else if (e.target.id.includes('noOfConnection')) {
      //const noOfConnection = JSON.parse(e)
      setConsumerDetail((prevState) => {
        return {
          ...prevState,
          noOfConnection: e.target.value
        }
      })
    }
    else if (e.target.id.includes('noOfTables')) {
      //const noOfConnection = JSON.parse(e)
      setConsumerDetail((prevState) => {
        return {
          ...prevState,
          noOfTables: e.target.value
        }
      })
    }
    else if (e.target.id.includes('oldConsumerNo')) {
      //const noOfConnection = JSON.parse(e)
      setConsumerDetail((prevState) => {
        return {
          ...prevState,
          noOfTables: e.target.value
        }
      })
    }
    else {
      setConsumerDetail({
        ...consumerDetail,                                // spreading the unchanged values
        [e.target.name]: e.target.value,          // changing the state of *changed value*
      });
    }
  }

  useEffect(() => {
    console.log(test, "test")
  }, [test])
  useEffect(() => {
    console.log(consumerDetail, consumerBasicDetail, consumerConnectionDetail, demandDetailWater, paymentDetail)
  }, [consumerDetail, consumerBasicDetail, consumerConnectionDetail, demandDetailWater, paymentDetail])

  const [addExistingCustomerValidator, setaddExistingCustomerValidator] = useState({
    //isBuildingConstPeriodFromValid: null, isBuildingConstPeriodToValid: null,
    isOldConsumerValid: null,
    isHoldingNoValid: null,
    isWardValid: null,
    isPropertyTypeValid: null,
    isPropertyAddressValid: null,
    isNameValid: null,
    isMobileNumberValid: null,
    isOwnerGenderValid: null,
    isOwnerRelationValid: null,
    isOwnerGuardianNameValid: null,
    isConnectionTypeValid: null,
    isArrearAmountValid: null,



    isEntryTypeValid: null,
    isOwnerHonorificValid: null,
    isOwnerNameValid: null,
    isOwnerMobileNumValid: null, isOwnerAadharValid: null, isOwnerEmailValid: null, isOwnerPanValid: null,
    isPlotNumValid: null, isKhataNumValid: null, isPlotAreaValid: null,
    isPropAddressValid: null, isPropDistrictValid: null, isPropPinValid: null, isPropMohallaValid: null, isPropCityValid: null,
    isPropertyTypeValid: null, isRoadTypeValid: null, isFloorDetailsValid: null, isOtherDetailsValid: null,
  })

  const [addExistingCustomer, setAddExistingCustomer] = useState({
    oldconsumer_no: "",
    newconsumer_no: "",
    holding_no: "",
    ward_id: "",
    prop_address: "",
    name: "",
    mobile_no: "",
    guardian_name: "",
    dateOfConnection: "",
    demandFrom: "",
    arrear_amount: "",


    entry_type_id: "1",
    entry_type_name: "New Assessment",
    old_property_no: "",
  })

  useEffect(() => {
    floorStack = []
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
    fetchSAFDropDownLists()
  }, [])

  useEffect(() => {
    console.log(unitRate, "unitRateeee")
  }, [unitRate, extraRange])
  const navigate = useNavigate()

  const handleSAFNewFormSubmission = async (e) => {
    e.preventDefault()

    //commented now

    const userId = getCookieByName('SUDA_USER_ID')
    demandDetailWater.connectionType = consumerConnectionDetail.connectionType
    if (demandDetailWater.arrearAmount === '') {
      demandDetailWater.arrearAmount = 0
    }

    //paymentDetail.arrearAmt = demandDetailWater.arrearAmount 
    // paymentDetail.dueUpTo = demandDetailWater.demandUpTo
    // if(unitRate = ''){
    //   setUnitRate(0)
    // }
    demandDetailWater.unitRate = unitRate
    let noOfRoomsTableConnection = ''
    if (consumerDetail.noOfRoom !== '') {
      noOfRoomsTableConnection = consumerDetail.noOfRoom
    }
    else if (consumerDetail.noOfConnection !== '') {
      noOfRoomsTableConnection = consumerDetail.noOfConnection
    }
    else if (consumerDetail.noOfTables !== '') {
      noOfRoomsTableConnection = consumerDetail.noOfTables
    }
    else {
      noOfRoomsTableConnection = 0
    }
    if (consumerDetail.noOfRoom === '') {
      consumerDetail.noOfRoom = 0
    }
    if (consumerDetail.noOfConnection === '') {
      consumerDetail.noOfConnection = 0
    }
    if (consumerDetail.noOfTables === '') {
      consumerDetail.noOfTables = 0
    }
    let rate = ""
    rate = demandDetailWater.unitRate
    let ipAddress = ""
    try {
      let responseIp = await fetch("https://geolocation-db.com/json/")
      let responseBodyOfIp = await responseIp.json()
      paymentDetail.ipAddress = responseBodyOfIp?.IPv4 ? responseBodyOfIp.IPv4 : "0.0.0.0"
    } catch (err) {
      console.error(err)
      paymentDetail.ipAddress = "0.0.0.0"
    }
    const consumerBasicDetails = consumerBasicDetail
    const consumerConnectionDetails = consumerConnectionDetail
    const consumerDetails = consumerDetail
    const demandDetailsWater = demandDetailWater
    const paymentDetails = paymentDetail

    finalReqObjForAddExistingCustomer = {
      consumerBasicDetails,
      consumerConnectionDetails,
      consumerDetails,
      demandDetailsWater,
      extraRoomCharge,
      noOfRoomsTableConnection,
      rate,
      rateId,
      // paymentDetails, 
      userId,
      wardId
    }
    // console.log("Rate", rate)
    // console.log(JSON.stringify(finalReqObjForAddExistingCustomer))
    //navigate('/dashboard/updateWaterConsumer/updateWaterConsumerPaymentReceipt')
    try {
      //setIsSAFFormSubmissionLoading(true)
      const requestOptions = {
        //mode:'cors',
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization':
            `Bearer ${getCookieByName('SUDA_TOKEN')}`
        },
        body: JSON.stringify({
          consumerBasicDetails,
          consumerConnectionDetails,
          consumerDetails,
          demandDetailsWater,
          extraRoomCharge,
          noOfRoomsTableConnection,
          rate: unitRate,
          rateId,
          // paymentDetails, 
          userId,
          wardId
        }),
      }
      const waterNewEntryUrl = `${SUDA_API_BASE_URL}/user/Water/AddWaterEntry`
      //const response = await fetch(safNewEntryUrl, requestOptions)
      let response = null, responseBody = null
      response = await fetch(waterNewEntryUrl, requestOptions)
      responseBody = await response.json()
      // console.log("woohooo")
      console.log(response, responseBody)
      if (response?.status == "200" && responseBody?.errors?.message) {
        toast.error(responseBody.errors.message, {
          position: toast.POSITION.TOP_CENTER
        });
        //setShowReceipt(true) 

      } else if (response?.status == "200" && responseBody?.consumerNo) {
        setShowModal(true)
        console.log(response, responseBody)
        setConsumerNumberAfterCreation(responseBody.consumerNo)
        console.log("new consumer no", consumerNumberAfterCreation)
      }
      else { }
    } catch (err) {
      console.error(err)
    }
    setConsumerDetail(prevState => {
      return {
        ...prevState,
        oldConsumerNo: '',
        newConsumerNo: '',
        // wardNo: '',
        holdingNo: '',
        propertyTypeId: '',
        propertyType: '',
        propertyAddress: '',
        noOfConnection: '',
        noOfRoom: '',
        noOfTables: '',
        // isNigamEmp: "No"
      }
    })
    setConsumerConnectionDetail(prevState => {
      return {
        ...prevState,
        connectionType: '',
        dateOfConnection: ''
      }
    })
    setConsumerBasicDetail(prevState => {
      return {
        ...prevState,
        name: '',
        mobileNo: '',
        relation: '',
        guardianName: ''
      }
    })
    setDemandDetailWater(prevState => {
      return {
        ...prevState,
        demandFrom: '',
        //demandUpTo:'',
        unitRate: '',
        connectionType: '',
        arrearAmount: '',
        connectionType: ''
      }
    })
    setPaymentDetail(prevState => {
      return {
        ...prevState,
        consumerNo: '',
        //null
        //  effectiveDate: '',
        consumerDetailsId: '',
        //null
        narration: '',
        paymentMode: '',
        paymentModeId: '',
        //  userId: '',
        ipAddress: '',
        narration: '',
        dueFrom: '',
        dueUpTo: '',
        bankName: '',
        othersBankName: '',
        branch: '',
        chequeNo: '',
        chequeDate: '',
        cardType: '',
        transactionId: '',
        apprCode: '',
        cardNo: '',
        cardHolderName: '',
        neftNo: '',
        neftDate: '',
        arrearAmt: '',
        payableAmt: '',
        penalty: '',
        discount: '',
        demandPayment: '',
        demandId: '',
        ddNo: '',
        ddDate: '',
        rtgsNo: '',
        rtgsDate: '',
      }
    })
  }

  // useEffect(()=>{
  //   console.log("test", paymentModeSelector)
  //   if(consumerNumberAfterCreation !==''){
  //     const loadPaymentReceiptDetails = async () => {
  //     try {
  //       const paymentReceiptDetailsGetUrl = `${SUDA_API_BASE_URL}/user/Water/GetReceipt/${consumerNumberAfterCreation}/${paymentModeSelector}`
  //       const requestOptions = {
  //           method: "GET",
  //           headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
  //       }
  //       let response = null, responseBody = null
  //       response = await fetch(paymentReceiptDetailsGetUrl, requestOptions)
  //       responseBody = await response.json()
  //       console.log("receipt in main form", response, responseBody)
  //       if (response?.status == '200') {
  //         console.log("receipt in main form 200", response, responseBody)
  //         setReceiptDetails(responseBody)
  //       } else {}
  //   } catch (err) {
  //       console.error(err)   
  //   }
  //   finally {}
  //   }
  //   loadPaymentReceiptDetails()
  // }},[consumerNumberAfterCreation])

  useEffect(() => {
    if (consumerNumberAfterCreation !== '' && consumerDetail.isNigamEmp === 'Yes') {
      console.log("entered", consumerNumberAfterCreation, consumerDetail.isNigamEmp)
      const formData = new FormData();
      if (file) {
        formData.append("file", file)
      }
      formData.append("consumerNo", consumerNumberAfterCreation)
      console.log(formData.get("file"))
      const fetchData = async () => {
        try {
          //setIsSAFFormSubmissionLoading(true)
          const requestOptions = {
            //mode:'cors',
            method: "POST",
            headers: {
              // 'Content-Type': 'application/json',
              'Authorization':
                `Bearer ${getCookieByName('SUDA_TOKEN')}`
            },
            body: formData
          }
          const safNewEntryUrl = `${SUDA_API_BASE_URL}/user/water/empDocUpload`
          //const response = await fetch(safNewEntryUrl, requestOptions)
          let response = null, responseBody = null
          response = await fetch(safNewEntryUrl, requestOptions)
          responseBody = await response.json()
          // console.log("woohooo")
          console.log(response, response.status, responseBody)
          if (response?.status === "200") {
            // console.log("responseBody", responseBody)
            //   toast.error(responseBody?.message, {
            //   position: toast.POSITION.TOP_CENTER
            //   });           
          }
          // else if(response?.status == "200" &&  responseBody?.consumerNo){
          //   setShowModal(true)
          //   console.log(response, responseBody)
          //   setConsumerNumberAfterCreation(responseBody.consumerNo)
          //   console.log("new consumer no", consumerNumberAfterCreation)       
          // }
          else {
            toast.error("File size too large..!", {
              position: toast.POSITION.TOP_CENTER
            });
          }
        } catch (err) {
          console.error(err)
        }
      }
      fetchData()
    }
  }, [consumerNumberAfterCreation, consumerDetail.isNigamEmp])


  useEffect(() => {
    if (demandDetailWater.demandFrom !== '' &&
      // demandDetailWater.demandUpTo !== '' && 
      //demandDetailWater.arrearAmount !== '' &&
      consumerDetail.propertyType !== '' && connectionValue !== '' &&
      (consumerDetail.noOfRoom !== '' || consumerDetail.noOfConnection !== '' || consumerDetail.noOfTables !== '')) {
      setDisabledDemand(false)
    }
    else {
      setDisabledDemand(true)
    }
  }, [
    demandDetailWater.demandFrom,
    // demandDetailWater.demandUpTo,
    demandDetailWater.arrearAmount, consumerDetail.propertyType, connectionValue,
    consumerDetail.noOfRoom, consumerDetail.noOfConnection, consumerDetail.noOfRoom
  ])
  useEffect(() => {
    if (
      consumerDetail.propertyAddress !== '' &&
      consumerDetail.holdingNo !== '' &&
      consumerDetail.propertyType !== '' &&
      consumerDetail.propertyAddress !== '' &&
      (consumerDetail.noOfConnection !== '' ||
        consumerDetail.noOfRoom !== '' ||
        consumerDetail.noOfTables !== '')
      &&
      consumerBasicDetail.name !== '' &&
      consumerBasicDetail.mobileNo !== '' &&
      consumerBasicDetail.relation !== '' &&
      consumerBasicDetail.guardianName !== ''
      &&
      consumerConnectionDetail.connectionType !== '' &&
      consumerConnectionDetail.dateOfConnection !== ''
      &&
      demandDetailWater.demandFrom !== ''
      //  demandDetailWater.demandUpTo !== '' && 
      //  demandDetailWater.arrearAmount !== ''

      // paymentDetail.narration !== '' && 
      //paymentDetail.paymentMode !== '' 
    )
    // if(paymentDetail.paymentMode === 'Cheque'){
    //   if(paymentDetail.bankName!== '' && paymentDetail.branch!== '' && paymentDetail.chequeNo!== '' && 
    //   paymentDetail.chequeDate!== '' )
    {
      setDisabled(false)
    }

    //}
    // else  if(paymentDetail.paymentMode === 'DD'){
    //   if(paymentDetail.bankName!== '' && paymentDetail.branch!== '' && paymentDetail.ddNo !== '' && 
    //   paymentDetail.ddDate !== '' )
    //   {
    //     setDisabled(false)
    //   }
    //   else{
    //     setDisabled(true)
    //   }
    // }
    // else  if(paymentDetail.paymentMode === 'Card'){
    //   if( paymentDetail.cardType !== '' && 
    //   paymentDetail.transactionId !== '' && 
    //   paymentDetail.apprCode !== '' && 
    //   paymentDetail.cardNo !== '' && 
    //   paymentDetail.cardHolderName !== '' &&
    //   paymentDetail.bankName!== '' && paymentDetail.branch!== '' )
    //   {
    //     setDisabled(false)
    //   }
    //   else{
    //     setDisabled(true)
    //   }
    // }
    // else if(paymentDetail.paymentMode === 'NEFT'){
    //   if(paymentDetail.bankName!== '' && paymentDetail.branch!== '' && 
    //   paymentDetail.neftNo !== '' && 
    //   paymentDetail.neftDate !== '' )
    //   {
    //     setDisabled(false)
    //   }
    //   else{
    //     setDisabled(true)
    //   }
    // }
    // else if(paymentDetail.paymentMode === 'RTGS'){
    //   if(paymentDetail.bankName!== '' && paymentDetail.branch!== '' && 
    //   paymentDetail.rtgsNo !== '' &&  paymentDetail.rtgsDate !== '' )
    //   {
    //     setDisabled(false)
    //   }
    //   else{
    //     setDisabled(true)
    //   }
    // }
    else {
      setDisabled(true)
    }



    console.log(
      consumerDetail.propertyAddress,
      consumerDetail.holdingNo,
      consumerDetail.propertyType,
      consumerDetail.propertyAddress,
      consumerDetail.noOfConnection,
      consumerDetail.noOfRoom,
      consumerDetail.noOfTables,
      consumerBasicDetail.name,
      consumerBasicDetail.mobileNo,
      consumerBasicDetail.relation,
      consumerBasicDetail.guardianName,
      consumerConnectionDetail.connectionType,
      consumerConnectionDetail.dateOfConnection,
      demandDetailWater.demandFrom,
      // demandDetailWater.demandUpTo , 
      // demandDetailWater.arrearAmount ,  
      //paymentDetail.paymentMode 
    )
  }, [
    consumerDetail.propertyAddress,
    consumerDetail.holdingNo,
    consumerDetail.propertyType,
    consumerDetail.propertyAddress,
    consumerDetail.noOfConnection,
    consumerDetail.noOfRoom,
    consumerDetail.noOfTables,
    consumerBasicDetail.name,
    consumerBasicDetail.mobileNo,
    consumerBasicDetail.relation,
    consumerBasicDetail.guardianName,
    consumerConnectionDetail.connectionType,
    consumerConnectionDetail.dateOfConnection,
    demandDetailWater.demandFrom,
    //  demandDetailWater.demandUpTo , 
    //  demandDetailWater.arrearAmount , 
    //   paymentDetail.narration , 
    //   paymentDetail.paymentMode,
    //   paymentDetail.bankName,
    //   paymentDetail.branch,
    //   paymentDetail.chequeNo,
    //   paymentDetail.chequeDate, 
    //   paymentDetail.ddNo,
    //   paymentDetail.ddDate, 
    //   paymentDetail.cardType,
    //   paymentDetail.transactionId , 
    //   paymentDetail.apprCode , 
    //   paymentDetail.cardNo , 
    //   paymentDetail.cardHolderName,
    //   paymentDetail.neftNo,
    //   paymentDetail.neftDate,
    //   paymentDetail.rtgsNo,
    //   paymentDetail.rtgsDate 
  ])

  useEffect(() => {
    console.log(consumerDetail.noOfRoom)

    if ((consumerDetail.propertyTypeId === 3)) {
      setToggleRange(false)
      if (consumerDetail.noOfRoom > 5) {
        setToggleRoom(true)
        let val = consumerDetail.noOfRoom - 5
        setExtraRoom(val)
      }
      else {
        setToggleRoom(false)
        setExtraRoom('')
      }
    }else {
      setToggleRoom(false)
      setExtraRoom('')
    }
    let calculatedAmount = fetchAmount[0].amount * extraroom
    setExtraRoomCharge(calculatedAmount)
    console.log(calculatedAmount)
    rate.map((rate) => {
      if ((consumerConnectionDetail.connectionType === 2) && (consumerDetail.propertyTypeId === 3)) {
        console.log("hotel")
        //HOTEL   
        // let cardType = eventStr.split("_")[2]
        range.map((range) => {
          let ws = range.ws_range
          let rangeFirstVal = ws.split("-")[0]
          let rangeSecondVal = ws.split("-")[1]

          console.log(consumerDetail.noOfRoom, rangeFirstVal, rangeSecondVal)
          if (range.prop_type_id === 3) {
            if ((Number(consumerDetail.noOfRoom) > Number(rangeFirstVal)) &&
              (Number(consumerDetail.noOfRoom) < Number(rangeSecondVal))) {
              setExtraRange(range.id)
            }
            else if (consumerDetail.noOfRoom === rangeFirstVal) {
              setExtraRange(range.id)
            }
            else if (consumerDetail.noOfRoom === rangeSecondVal) {
              setExtraRange(range.id)
            }
            else { }

          }
          if (extraRange === '') {
            setExtraRange(5)
          }
          if ((consumerConnectionDetail.connectionType === rate.conn_type_id) &&
            (consumerDetail.propertyTypeId === rate.prop_type_id) && (extraRange === rate.range_mstr_id)) {
            console.log("matchedddd", extraroom)
            if (extraroom === '') {
              console.log("extraroom 0")
              setUnitRate(rate.amount)
              inputRef.current.value = rate.amount
              setRateId(rate.id)
            }
            else {
              if (range.prop_type_id === 3) {
                let cal = calculatedAmount + rate.amount
                console.log(rate.amount + (fetchAmount[0].amount * extraroom), "reach")
                //let rate= rate.amount + (fetchAmount[0].amount * extraroom)
                setTest(cal)
                console.log(inputRef.current.value, "ref")
                rate.amount = rate.amount + fetchAmount[0].amount * extraroom
                inputRef.current.value = rate.amount + (fetchAmount[0].amount * extraroom)
                setRateId(rate.id)
                setUnitRate(rate.amount + (fetchAmount[0].amount * extraroom))
              }
            }
          }
        })
        setToggleRange(true)
      }
      if ((consumerConnectionDetail.connectionType === 2) &&
        (consumerDetail.propertyTypeId === 4)) {
        setToggleRange(false)
        console.log("Restaurant")
        range.map((range) => {
          let ws = range.ws_range
          let rangeFirstVal = ws.split("-")[0]
          let rangeSecondVal = ws.split("-")[1]



          if (range.prop_type_id === 4) {
            console.log(Number(consumerDetail.noOfTables) > Number(rangeFirstVal), Number(consumerDetail.noOfTables) < Number(rangeSecondVal), rangeFirstVal, consumerDetail.noOfTables, rangeSecondVal)
            if (Number(consumerDetail.noOfTables) > Number(rangeFirstVal) && Number(consumerDetail.noOfTables) < Number(rangeSecondVal)) {
              console.log("match")
              setExtraRange(range.id)
            }
            else if (consumerDetail.noOfTables === rangeFirstVal) {
              setExtraRange(range.id)
            }
            else if (consumerDetail.noOfTables === rangeSecondVal) {
              setExtraRange(range.id)
            }
            // else if((consumerDetail.noOfTables > rangeFirstVal) && (consumerDetail.noOfTables < rangeSecondVal))
            // {

            // }
            // else if()
            // {

            // }
            else { }
            if ((consumerConnectionDetail.connectionType === rate.conn_type_id) &&
              (consumerDetail.propertyTypeId === rate.prop_type_id) && (extraRange === rate.range_mstr_id)) {
              setUnitRate(rate.amount)
              inputRef.current.value = rate.amount
              setRateId(rate.id)
            }
          }
        })
        setToggleRange(true)
      }
      else if ((consumerConnectionDetail.connectionType === rate.conn_type_id) &&
        (consumerDetail.propertyTypeId === rate.prop_type_id)) {
        setToggleRange(false)
        setUnitRate(rate.amount)
        inputRef.current.value = rate.amount
        setRateId(rate.id)
      }
      else {

      }
    })
  }, [consumerConnectionDetail.connectionType, consumerDetail.propertyTypeId, consumerDetail.noOfRoom,
  consumerDetail.noOfTables, consumerDetail.propertyType, extraroom, unitRate, range, toggleRange, toggleRoom,
    extraRange, fetchAmount])

  const handleFileChange = (e) => {
    console.log(e.target.files[0].size)
    if (e.target.files[0].size > 1 * 1000 * 1024) {
      // console.log("File with maximum size of 1MB is allowed");
      toast.error("File with maximum size of 1MB is allowed", {
        position: toast.POSITION.TOP_CENTER
      });
      return false;
    }
    else {
      setfile(e.target.files[0])
    }
  }
  return (
    <>
      <ToastContainer autoClose={2000} />
      {/* <PaymentReceiptHindi/> */}
      {
        showModal ? <AddConsumerModal setShowModal={setShowModal} setShowReceipt={setShowReceipt}
          consumerNumberAfterCreation={consumerNumberAfterCreation} /> : null
      }
      {
        !showReceipt ?
          <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10 mb-10">
            <div className={`w-${isPublicSAF ? "11/12" : "full"} px-0 pt-0 pb-4 m-auto bg-white rounded-lg lg:max-w-full`}>
              <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-2 navcustomproperty mb-2 ring-1 ring-red-500 rounded-lg h-10">
                <h2 className="text-sm font-semibold text-center text-white">
                  Consumer Details
                </h2>
              </nav>
              <form className="mt-4" onSubmit={handleSAFNewFormSubmission}>
                <div className="px-4 pt-0 pb-4 m-4 bg-white rounded-none  
         lg:max-w-full">
                  <div className="md:flex-1 lg:flex  
           items-end lg:justify-between">
                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                      <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 " htmlFor="password">
                        Old Consumer No(If Any)
                        {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
                      </label>
                      <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                             ${addExistingCustomerValidator.isOldConsumerValid == false ? `` : `hidden`}`}
                        placement='top'
                        content={addExistingConsumerMsgList.validOldConsumerNoMsg}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }} >
                        <input
                          onChange={(e) => handleAddExistingCustomerHandler(e, '')}
                          //value={addExistingCustomer.oldconsumer_no}
                          name="oldConsumerNo"
                          value={consumerDetail.oldConsumerNo}
                          onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                          maxLength='10'
                          className={`bg-white-200 appearance-none border
                                     ${addExistingCustomerValidator.isOldConsumerValid == false ?
                              `border-red-900` : `border-gray-500`} rounded w-full py-2 px-4 text-white-700 leading-tight 
                                         focus:outline-none focus:bg-white focus:border-2 focus:border-gray-500`}
                          id="oldconsumer_no" type="text" placeholder="" />
                      </Tooltip>
                    </div>
                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                      <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 " >
                        Property Address
                        <p className=' contents text-red-600 text-sm font-bold'>*</p>
                      </label>

                      <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                             ${addExistingCustomerValidator.isPropertyAddressValid == false ? `` : `hidden`}`}
                        placement='top'
                        content={safInputValidatorMsgList.validPropAddressMsg}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }} >
                        <textarea
                          onChange={(e) => handleAddExistingCustomerHandler(e, '')}
                          color="orange"
                          name="propertyAddress"
                          value={consumerDetail.propertyAddress}
                          className={`bg-white-200 appearance-none border border-gray-500 rounded w-full h-10 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-700
                                     ${addExistingCustomerValidator.isPropertyAddressValid == false ?
                              `border-red-900` : `border-gray-500`}`}
                          id="prop_address" rows="4" cols="20"></textarea>
                      </Tooltip>
                    </div>
                  </div>

                  {/* NEXT ROW */}
                  <div className="md:flex-1 lg:flex  
           items-end lg:justify-between">
                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                      <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2">
                        Ward No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                      </label>
                      <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64
                             ${addExistingCustomerValidator.isWardValid == false ? `` : `hidden`}`}
                        placement='top'
                        content={safInputValidatorMsgList.validWardMsg}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }} >
                        <Select onChange={(e) => handleAddExistingCustomerHandler(e, '')}
                          name="wardNo"
                          //  defaultValue={consumerDetail.wardNo}
                          defaultValue={wardId}
                          label="select"
                          color='gray'
                          className={`pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                     ${addExistingCustomerValidator.isWardValid == false ?
                              `border-red-900` : ``}`}>
                          {
                            wardData.length > 0 ?
                              (wardData.map((item) => {
                                const { id, zone_mstr_id, ward_name, area_name, stampdate, user_id, status } = item
                                return <Option key={id} value={JSON.stringify(item)}>{`${ward_name}`}</Option>
                              })) : (<Option>Loading...</Option>)
                          }
                        </Select>
                      </Tooltip>
                    </div>

                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                      <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 " htmlFor="password">
                        Holding No<p className='contents text-red-600 
                                 text-sm font-bold'>*</p>
                      </label>
                      <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                             ${addExistingCustomerValidator.isHoldingNoValid == false ? `` : `hidden`}`}
                        placement='top'
                        content={addExistingConsumerMsgList.validHoldingNoMsg}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }} >
                        <input
                          onChange={(e) => handleAddExistingCustomerHandler(e, '')}
                          name="holdingNo"
                          color='orange'
                          onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                          maxLength='10'
                          value={consumerDetail.holdingNo}
                          className={`bg-white-200 appearance-none border 
                                     ${addExistingCustomerValidator.isHoldingNoValid == false ?
                              `border-red-900` : `border-gray-500`} rounded w-full py-2 px-4 text-white-700 leading-tight 
                                         focus:outline-none focus:bg-white focus:border-2 focus:border-gray-700`}
                          id="oldconsumer_no" type="text" placeholder="" />
                      </Tooltip>
                    </div>

                  </div>

                  <div className="md:flex-1 lg:flex  
           items-end lg:justify-between">
                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                      <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 " htmlFor="password">
                        Property Type
                        <p className=' contents text-red-600 text-sm font-bold'>*</p>
                      </label>
                      <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                             ${addExistingCustomerValidator.isPropertyTypeValid == false ? `` : `hidden`}`}
                        placement='top'
                        content={safInputValidatorMsgList.validPropertyTypeMsg}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }} >
                        <Select
                          onChange={(e) => handleAddExistingCustomerHandler(e, '')}
                          defaultValue={consumerDetail.propertyType}
                          label="Select" color='gray' className={`pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                     ${addExistingCustomerValidator.isPropertyTypeValid == false ?
                              `border-red-900` : ``}`}>
                          {
                            propertyTypeData?.length > 0 ?
                              (propertyTypeData?.map((item) => {
                                const { id, prop_type, status } = item
                                return <Option key={id} value={JSON.stringify(item)}>{prop_type}</Option>
                              })) : (<Option>Loading...</Option>)
                          }
                        </Select>
                      </Tooltip>
                    </div>
                    {
                      consumerDetail.propertyTypeId === 3 ?
                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                          <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 " htmlFor="password">
                            No of room
                            <p className=' contents text-red-600 text-sm font-bold'>*</p>
                          </label>
                          <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                             ${addExistingCustomerValidator.isHoldingNoValid == false ? `` : `hidden`}`}
                            placement='top'
                            content={addExistingConsumerMsgList.validHoldingNoMsg}
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }} >
                            <input
                              onChange={(e) => handleAddExistingCustomerHandler(e, "noOfRoom")}
                              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                              name="noOfRoom"
                              value={consumerDetail.noOfRoom}
                              className={`bg-white-200 appearance-none border 
                                     ${addExistingCustomerValidator.isHoldingNoValid == false ?
                                  `border-red-900` : `border-gray-500`} rounded w-full py-2 px-4 text-white-700 leading-tight 
                                         focus:outline-none focus:bg-white focus:border-2 focus:border-gray-800`}
                              id="noOfRoom" type="text" placeholder="" />
                          </Tooltip>
                        </div>
                        : consumerDetail.propertyTypeId === 11 ?
                          " " :
                          consumerDetail.propertyTypeId === 4 ?
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                              <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 " htmlFor="password">
                                No of tables
                                <p className=' contents text-red-600 text-sm font-bold'>*</p>
                              </label>
                              <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                             ${addExistingCustomerValidator.isHoldingNoValid == false ? `` : `hidden`}`}
                                placement='top'
                                content={addExistingConsumerMsgList.validHoldingNoMsg}
                                animate={{
                                  mount: { scale: 1, y: 0 },
                                  unmount: { scale: 0, y: 25 },
                                }} >
                                <input
                                  onChange={(e) => handleAddExistingCustomerHandler(e, "noOfTables")}

                                  name="noOfTables"
                                  onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                  value={consumerDetail.noOfTables}
                                  className={`bg-white-200 appearance-none border 
                                     ${addExistingCustomerValidator.isHoldingNoValid == false ?
                                      `border-red-900` : `border-gray-500`} rounded w-full py-2 px-4 text-white-700 leading-tight 
                                         focus:outline-none focus:bg-white focus:border-2 focus:border-gray-700`}
                                  id="noOfTables" type="text" placeholder="" />
                              </Tooltip>
                            </div> :
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                              <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 " htmlFor="password">
                                No of connection
                                <p className=' contents text-red-600 text-sm font-bold'>*</p>
                              </label>
                              <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                             ${addExistingCustomerValidator.isHoldingNoValid == false ? `` : `hidden`}`}
                                placement='top'
                                content={addExistingConsumerMsgList.validHoldingNoMsg}
                                animate={{
                                  mount: { scale: 1, y: 0 },
                                  unmount: { scale: 0, y: 25 },
                                }} >
                                <input
                                  onChange={(e) => handleAddExistingCustomerHandler(e, "noOfConnection")}
                                  name="noOfConnection"
                                  onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                  value={consumerDetail.noOfConnection}
                                  className={`bg-white-200 appearance-none border 
                                     ${addExistingCustomerValidator.isHoldingNoValid == false ?
                                      `border-red-900` : `border-gray-500`} rounded w-full py-2 px-4 text-white-700 leading-tight 
                                         focus:outline-none focus:bg-white focus:border-2 focus:border-gray-700`}
                                  id="noOfConnection" type="text" placeholder="" />
                              </Tooltip>
                            </div>
                    }
                  </div>

                  <div className="md:flex-1 lg:flex  
           items-end lg:justify-between">
                    {
                      toggleRange ? <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                        <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 " htmlFor="password">
                          Range
                          <p className=' contents text-red-600 text-sm font-bold'>*</p>
                        </label>
                        <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
          ${addExistingCustomerValidator.isPropertyAddressValid == false ? `` : `hidden`}`}
                          placement='top'
                          content={safInputValidatorMsgList.validPropAddressMsg}
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }} >
                          <input
                            // onChange={(e)=>handleConsumerBasicDetail(e,"mobileNo")}
                            id="extraRange"
                            name="extraRange"
                            value={extraRange}
                            // onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                            maxLength='10'
                            className={`bg-white-200 appearance-none border 
                  ${addExistingCustomerValidator.isMobileNumberValid == false ?
                                `border-red-900` : `border-gray-500`} rounded w-full py-2 px-4 text-white-700 leading-tight 
                      focus:outline-none focus:bg-white focus:border-2 focus:border-gray-700`}
                            type="text" placeholder="" />
                        </Tooltip>
                      </div> : null
                    }

                    {
                      toggleRoom ? <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                        <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 " htmlFor="password">
                          Extra Room
                          {/* <p className=' contents text-red-600 text-sm font-bold'>*</p> */}
                        </label>
                        <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                          ${addExistingCustomerValidator.isPropertyAddressValid == false ? `` : `hidden`}`}
                          placement='top'
                          content={safInputValidatorMsgList.validPropAddressMsg}
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }} >
                          <input
                            //  onChange={(e)=>handleConsumerBasicDetail(e,"mobileNo")}
                            id="extraroom"
                            name="extraroom"
                            value={extraroom}
                            disabled={true}
                            maxLength='10'
                            className={`bg-white-200 appearance-none border 
                                  ${addExistingCustomerValidator.isMobileNumberValid == false ?
                                `border-red-900` : `border-gray-500`} rounded w-full py-2 px-4 text-white-700 leading-tight 
                                      focus:outline-none focus:bg-white focus:border-2 focus:border-gray-700`}
                            type="text" placeholder="" />
                        </Tooltip>
                      </div> : null
                    }

                  </div>

                </div>
                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-2 navcustomproperty mb-2 ring-1 ring-red-600 rounded-lg bg-orange-800">
                  <h2 className="text-sm font-semibold text-center text-white">
                    Consumer Basic Details
                  </h2>
                </nav>
                <div className="px-4 pt-0 pb-4 m-4 bg-white rounded-none
         lg:max-w-full">
                  <div className="md:flex-1 lg:flex  
           items-end lg:justify-between">
                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                      <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 " htmlFor="password">
                        Name<p className='contents text-red-600 
                                 text-sm font-bold'>*</p>
                      </label>
                      <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                             ${addExistingCustomerValidator.isNameValid == false ? `` : `hidden`}`}
                        placement='top'
                        content={addExistingConsumerMsgList.validNameMsg}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }} >
                        <input
                          onChange={(e) => handleConsumerBasicDetail(e, '')}

                          name="name"
                          value={consumerBasicDetail.name}
                          className={`bg-white-200 appearance-none border 
                                     ${addExistingCustomerValidator.isNameValid == false ?
                              `border-red-900` : `border-gray-500`} rounded w-full py-2 px-4 text-white-700 leading-tight 
                                         focus:outline-none focus:bg-white focus:border-2 focus:border-gray-700`}
                          id="oldconsumer_no" type="text" placeholder="" />
                      </Tooltip>
                    </div>
                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                      <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 " htmlFor="password">
                        Mobile Number<p className='contents text-red-600 
                                 text-sm font-bold'>*</p>
                      </label>
                      <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                             ${addExistingCustomerValidator.isMobileNumberValid == false ? `` : `hidden`}`}
                        placement='top'
                        content={addExistingConsumerMsgList.validisMobileNumberMsg}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }} >
                        <input
                          onChange={(e) => handleConsumerBasicDetail(e, "mobileNo")}
                          id="mobileNo"
                          name="mobileNo"
                          value={consumerBasicDetail.mobileNo}
                          onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                          maxLength='10'
                          className={`bg-white-200 appearance-none border 
                                     ${addExistingCustomerValidator.isMobileNumberValid == false ?
                              `border-red-900` : `border-gray-500`} rounded w-full py-2 px-4 text-white-700 leading-tight 
                                         focus:outline-none focus:bg-white focus:border-2 focus:border-gray-500`}
                          type="text" placeholder="" />
                      </Tooltip>
                    </div>
                  </div>
                  <div className="md:flex-1 lg:flex  
           items-end lg:justify-between">
                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                      <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 " htmlFor="password">
                        Relation<p className='contents text-red-600 
                                 text-sm font-bold'>*</p>
                      </label>
                      <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                             ${addExistingCustomerValidator.isOwnerRelationValid == false ? `` : `hidden`}`}
                        placement='top'
                        content={safInputValidatorMsgList.validOwnerRelationMsg}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }} >
                        <Select
                          onChange={(e) => handleConsumerBasicDetail(e, '')}
                          label="Select"
                          color='gray'
                          className={`w-full pl-2 pr-3 py-1 font-bold text-xs 
                                               text-gray-900
                                             ${addExistingCustomerValidator.isOwnerGenderValid == false ?
                              `border-red-900` : ``}`}>
                          <Option value='relation_M/O' >M/O</Option>
                          <Option value='relation_F/O' >F/O</Option>
                          <Option value='relation_S/O' >S/O</Option>
                          <Option value='relation_D/O' >D/O</Option>
                          <Option value='relation_W/O' >W/O</Option>
                          <Option value='relation_C/O' >C/O</Option>
                        </Select>
                      </Tooltip>
                    </div>
                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                      <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 " htmlFor="password">
                        Guardian Name<p className='contents text-red-600 
                                 text-sm font-bold'>*</p>
                      </label>
                      <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                             ${addExistingCustomerValidator.isOwnerGuardianNameValid == false ? `` : `hidden`}`}
                        placement='top'
                        content={safInputValidatorMsgList.validOwnerGuardianNameMsg}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }} >
                        <input
                          onChange={(e) => handleConsumerBasicDetail(e, '')}

                          name="guardianName"
                          value={consumerBasicDetail.guardianName}
                          className={`bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-gray-500
                                         ${addExistingCustomerValidator.isOwnerGuardianNameValid == false ?
                              `border-red-900` : `border-gray-500`}`}
                          id="father_name" type="text" placeholder="Guardian Name" />
                      </Tooltip>
                    </div>
                  </div>
                </div>



                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-2 navcustomproperty mb-2 ring-1 ring-red-600 rounded-lg bg-orange-800">
                  <h2 className="text-sm font-semibold text-center text-white">
                    Consumer Connection Details
                  </h2>
                </nav>
                <div className="px-4 pt-0 pb-4 m-4 bg-white rounded-none 
         lg:max-w-full">
                  <div className="md:flex-1 lg:flex  
           items-end lg:justify-between">
                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                      <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 " htmlFor="password">
                        Connection Type<p className='contents text-red-600 
                                 text-sm font-bold'>*</p>
                      </label>
                      <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                             ${addExistingCustomerValidator.isConnectionTypeValid == false ? `` : `hidden`}`}
                        placement='top'
                        content={addExistingConsumerMsgList.validConnectionTypeMsg}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }} >
                        <Select
                          name="connectionType"
                          id="connectionType"
                          defaultValue={consumerConnectionDetail.connectionType}
                          onChange={(e) => handleConsumerConnectionDetails(e, '')}
                          color='gray'
                          label="select"
                          className={`pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                     ${addExistingCustomerValidator.isWardValid == false ?
                              `border-red-900` : ``}`}>
                          {
                            connectionTypeData.length > 0 ?
                              (connectionTypeData.map((item) => {
                                const { id, conn_type, status } = item
                                return <Option key={id} value={JSON.stringify(item)}>{`${conn_type}`}</Option>
                              })) : (<Option>Loading...</Option>)
                          }
                        </Select>
                      </Tooltip>
                    </div>
                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                      <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 "
                        htmlFor="password">
                        Date Of Connection
                        <p className='contents text-red-600 
                                 text-sm font-bold'>*</p>
                      </label>
                      {/* <input
     type="date"
     value={value}
     onChange={onChangeDate} 
  /> */}


                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3}>
                          <DesktopDatePicker
                            onChange={(e) => handleConsumerConnectionDetails(e, "dateOfConnection")}

                            name="dateOfConnection"

                            id="dateOfConnection"

                            inputFormat="YYYY-MM-DD"
                            color='gray'

                            renderInput={(params) => <TextField
                              {...params}
                            />}
                            disableFuture={true}
                            value={consumerConnectionDetail?.dateOfConnection}
                          />

                        </Stack>
                      </LocalizationProvider>
                      {/* <input type="date"  onChange={(e)=>handleConsumerConnectionDetails(e, "dateOfConnection")}
                        
                        name="dateOfConnection" id="dateOfConnection" 
                        value={consumerConnectionDetail.dateOfConnection}
           /> */}
                    </div>
                  </div>

                </div>
                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-2 navcustomproperty mb-2 ring-1 ring-red-600 rounded-lg bg-orange-700">
                  <h2 className="text-sm font-semibold text-center text-white">
                    Add Demand Details
                  </h2>
                </nav>
                <div className="px-4 pt-0 pb-4 m-4 bg-white rounded-none
         lg:max-w-full">
                  <div className="md:flex-1 lg:flex  
           items-end lg:justify-between">
                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                      <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 "
                        htmlFor="password">
                        Demand From
                        <p className='contents text-red-600 
                                 text-sm font-bold'>*</p>
                      </label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3}>
                          <DesktopDatePicker
                            // label="Date desktop"
                            onChange={(e) => handleDemandDetailsWater(e, "demandFrom")}
                            minDate={consumerConnectionDetail.dateOfConnection}
                            name="demandFrom"
                            color='gray'
                            // value={consumerConnectionDetails.dateOfConnection}
                            id="demandFrom"
                            inputFormat="YYYY-MM-DD"
                            renderInput={(params) => <TextField
                              {...params}
                            />}
                            //disableFuture={true}
                            value={demandDetailWater?.demandFrom}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </div>
                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                      <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 " htmlFor="password">
                      Monthly Rate
                      </label>
                      <input
                        name="arrearAmount"
                        id="arrearAmount"
                        defaultValue={unitRate}
                        ref={inputRef}
                        readOnly
                        // disabled={true}
                        //onChange={(e)=>handleDemand}
                        className={`bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-gray-500
                                         ${addExistingCustomerValidator.isArrearAmountValid == false ?
                            `border-red-900` : `border-gray-500`}`}
                        type="text" />
                    </div>

                  </div>
                  <div className="md:flex-1 lg:flex items-end lg:justify-between">

                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                      <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 "
                        htmlFor="password">
                        Arrear Amount
                        {/* <p className='contents text-red-600 
                                 text-sm font-bold'>*</p> */}
                      </label>
                      <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                             ${addExistingCustomerValidator.isArrearAmountValid == false ? `` : `hidden`}`}
                        placement='top'
                        content={addExistingConsumerMsgList.validArearAmountMsg}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }} >
                        <input
                          name="arrearAmount"
                          id="arrearAmount"
                          onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                          defaultValue={demandDetailWater.arrearAmount}
                          onChange={(e) => handleDemandDetailsWater(e, '')}
                          className={`bg-white-200 appearance-none border border-gray-500 rounded w-72 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-gray-500
                                         ${addExistingCustomerValidator.isArrearAmountValid == false ?
                              `border-red-900` : `border-gray-500`}`}
                          type="text" />
                      </Tooltip>
                    </div>


                  </div>
                  {/* <div className="md:flex-1 lg:flex  
           items-end lg:justify-between">
             
             <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                             <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 "  
                              htmlFor="password">
                             Demand Payment
                             <p className='contents text-red-600 
                                 text-sm font-bold'>*</p>
                             </label>
                             <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                             ${addExistingCustomerValidator.isArrearAmountValid == false ? `` : `hidden`}`}
                                     placement='top'
                                     content={addExistingConsumerMsgList.validArearAmountMsg}
                                     animate={{
                                         mount: { scale: 1, y: 0 },
                                         unmount: { scale: 0, y: 25 },
                                     }} >
                                     <input 
                                      name="demandPayment"
                                      id="demandPayment"
                                      disabled
                                      defaultValue={demandValue}
                                      onChange={(e)=>handleDemandDetailsWater(e,'')}
                                         className={`bg-gray-200 appearance-none border border-gray-500 rounded w-72 py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500
                                         ${addExistingCustomerValidator.isArrearAmountValid== false ?
                                                 `border-red-900` : `border-gray-500`}`}
                                       type="text"  />
                                 </Tooltip>
                                 <button type='submit'
                             className={`h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white transition-colors duration-200 
                             transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400 
                            ${disabledemand ? `cursor-not-allowed` : `cursor-pointer`}
                             `}
                           disabled={disabledemand}
                             onClick={(e)=>viewDemandPayment(e)}>
                             View Demand Payment
             </button>
             
                       </div>
                       
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
                      */}


                </div>
                {/* 4th grade nigam employe */}
                {/* <div className="md:flex-1 lg:flex items-end ">
                  <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                    <Checkbox
                      id="isNigamEmp"
                      checked={consumerDetail.isNigamEmp === 'Yes'}
                      onChange={(e) => handleAddExistingCustomerHandler(e)}
                      color="teal"
                      className="custom-checkbox font-bold text-sm"
                      label="Is Consumer a 4th Grade Nigam Employee?" />
                  </div>
                  <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                    {
                      consumerDetail.isNigamEmp === 'Yes' ? <>
                        <label htmlFor="formFile" className="form-label inline-block mb-0 text-xs font-bold text-gray-900">Identification Document(jpg,png,pdf (max size 1MB))
                          <p className='contents text-red-600 text-sm font-bold'>*</p>
                        </label>
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
                                            focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none"
                          type="file"
                          name='nigam_file'
                          data-max-size="1000"
                          defaultValue={file}
                          accept="image/jpeg,image/png,application/pdf"
                          id="nigam" />
                      </> : null
                    }
                  </div>
                </div> */}
                {/* <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-2 navcustomproperty mb-2 ring-1 ring-black rounded-none">
                 <h2 className="text-sm font-semibold text-center text-white">
                   Select Payment Mode
                 </h2>
         </nav> */}
                {/* <div className="px-4 pt-0 pb-4 m-4 bg-white rounded-none  border border-gray-500 
         lg:max-w-full">
           <div className="md:flex-1 lg:flex  
           items-end lg:justify-between">
                       <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                             <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 "   htmlFor="password">
                                 Mode Of Payment<p className='contents text-red-600 
                                 text-sm font-bold'>*</p>
                              </label>
                             <Tooltip className={`text-xs bg-red-300 text-black-900 inline w-64 
                             ${addExistingCustomerValidator.isConnectionTypeValid == false ? `` : `hidden`}`}
                                         placement='top'
                                         content={addExistingConsumerMsgList.validConnectionTypeMsg}
                                         animate={{
                                             mount: { scale: 1, y: 0 },
                                             unmount: { scale: 0, y: 25 },
                                         }} >
                             <Select 
                                  name="paymentDetail"
                                  id="connectionType"
                                  defaultValue={paymentDetail.paymentMode}
                                  onChange={(e)=>handlePaymentDetails(e,'')}
                                     label="select" 
                                     className={`pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                     ${addExistingCustomerValidator.isWardValid == false ?
                                             `border-red-900` : ``}`}>
                                     {
                                         modeOfPayment.length > 0 ?
                                             (modeOfPayment.map((item) => {
                                                 const { id, mode_of_payment, status } = item
                                                 return <Option key={id} value={JSON.stringify(item)}>{`${mode_of_payment}`}</Option>
                                             })) : (<Option>Loading...</Option>)
                                     }
                                 </Select>
                                 </Tooltip>
                       </div>

                       <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit flex">
                             <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2 "   htmlFor="password">
                                 Narration
                               
                              </label>
                              <input 
                         name="narration"
                         id="narration"
                         defaultValue={paymentDetail.narration}
                         onChange={(e)=>handlePaymentDetails(e,'')}
                             className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                     focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                            type="text" placeholder="" />
                       </div>

                   </div>
                  
                 </div>

             {paymentDetail.paymentMode === 'Cheque' ? 
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
                     <Select 
                     name="bank_name"
                     id="bank_name"
                     defaultValue={paymentDetail.bankName}
                     onChange={(e)=>handlePaymentDetails(e,'')}
                         label="select" className="pl-2 pr-3 py-2 w-full font-bold text-xs text-gray-900">
                         {
                           paymentModeDetailsInputFromAPI?.length > 0 ? (
                             paymentModeDetailsInputFromAPI[0]?.bankNameBeans.map((item, index) => {
                               const { id, bank_name } = item
                               return (
                                 <Option key={index} value={JSON.stringify(item)} >{bank_name}</Option>
                               )
                             })
                           ) : <Option>Loading...</Option>
                         }
                       </Select>
                     </div>
                  <div className='mb-4 ml-3 mt-2 flex'>
                           <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                            Branch name<p className='contents text-red-600 text-sm font-bold'>*</p>
                           </label>
                           <input 
                           name="branch"
                           id="branch"
                           defaultValue={paymentDetail.branch}
                           onChange={(e)=>handlePaymentDetails(e,'')}
                             className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                     focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                            type="text" placeholder="Branch" />
                         </div>
                     
             </div>
             {
                       paymentDetail.bankName === 'OTHERS' ?   
                       <div className='mb-4 ml-3 mt-2 flex'>
                       <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                       Please mention other bank name
                    
                       </label>
                       <input 
                       name="othersBankName"
                       id="othersBankName"
                       defaultValue={paymentDetail.othersBankName}
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
                         name="chequeNo"
                         id="chequeNo"
                         defaultValue={paymentDetail.chequeNo}
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
                                
                                 onChange={(e)=>handlePaymentDetails(e, "chequeDate")}
                                 name="chequeDate"
                                 id="chequeDate"
                                 inputFormat="YYYY-MM-DD"
                                 renderInput={(params) => <TextField {...params} />}
                                 value={paymentDetail.chequeDate}
                               />
                             </Stack>
                           </LocalizationProvider>
                         </div>
                       </div>
              </>
             : paymentDetail.paymentMode === 'DD' ? 
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
                    <Select 
                    name="bank_name"
                    defaultValue={paymentDetail.bankName}
                    onChange={(e)=>handlePaymentDetails(e,'')}
                        label="select" className="pl-2 pr-3 py-2 w-full font-bold text-xs text-gray-900">
                        {
                          paymentModeDetailsInputFromAPI?.length > 0 ? (
                            paymentModeDetailsInputFromAPI[0]?.bankNameBeans.map((item, index) => {
                              const { id, bank_name } = item
                              return (
                                <Option key={index} value={JSON.stringify(item)} >{bank_name}</Option>
                              )
                            })
                          ) : <Option>Loading...</Option>
                        }
                      </Select>
                    </div>
                 <div className='mb-4 ml-3 mt-2 flex'>
                          <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                           Branch name<p className='contents text-red-600 text-sm font-bold'>*</p>
                          </label>
                          <input
                             name="branch"
                             id="branch"
                             defaultValue={paymentDetail.branch}
                             onChange={(e)=>handlePaymentDetails(e,'')}
                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                    focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                          type="text" placeholder="Branch" />
                        </div>
                  </div>
                  {
                       paymentDetail.bankName === 'OTHERS' ?   
                       <div className='mb-4 ml-3 mt-2 flex'>
                       <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                       Please mention other bank name
                     
                       </label>
                       <input 
                       name="othersBankName"
                       id="othersBankName"
                       defaultValue={paymentDetail.othersBankName}
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
                          name="ddNo"
                          defaultValue={paymentDetail.ddNo}
                          onChange={(e)=>handlePaymentDetails(e,'')}
                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                    focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                            id="cheque_no" type="text" placeholder="Cheque No." />
                        </div>
                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                          <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                            DD Date
                            <p className='contents text-red-600 text-sm font-bold'>*</p>
                          </label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                              <DesktopDatePicker
                              
                                onChange={(e)=>handlePaymentDetails(e, "ddDate")}
                                 name="ddDate"
                                 id="ddDate"
                                inputFormat="YYYY-MM-DD"
                                renderInput={(params) => <TextField {...params} />}
                                value={paymentDetail.ddDate}
                              />
                            </Stack>
                          </LocalizationProvider>
                        </div>
                      </div>
             </>
             :  paymentDetail.paymentMode === 'NEFT' ? 
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
                    <Select 
                    name="bank_name"
                    defaultValue={paymentDetail.bankName}
                    onChange={(e)=>handlePaymentDetails(e,'')}
                        label="select" className="pl-2 pr-3 py-2 w-full font-bold text-xs text-gray-900">
                        {
                          paymentModeDetailsInputFromAPI?.length > 0 ? (
                            paymentModeDetailsInputFromAPI[0]?.bankNameBeans.map((item, index) => {
                              const { id, bank_name } = item
                              return (
                                <Option key={index} value={JSON.stringify(item)} >{bank_name}</Option>
                              )
                            })
                          ) : <Option>Loading...</Option>
                        }
                      </Select>
                    </div>
                 <div className='mb-4 ml-3 mt-2 flex'>
                          <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                           Branch name<p className='contents text-red-600 text-sm font-bold'>*</p>
                          </label>
                          <input 
                         name="branch"
                         id="branch"
                         defaultValue={paymentDetail.branch}
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
                      
                       </label>
                       <input 
                       name="othersBankName"
                       id="othersBankName"
                       defaultValue={paymentDetail.othersBankName}
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
                            NEFT No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                          </label>
                          <input 
                        name="neftNo"
                        id="neftNo"
                        defaultValue={paymentDetail.neftNo}
                        onChange={(e)=>handlePaymentDetails(e,'')} 
                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                    focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                         type="text" placeholder="" />
                        </div>
                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                          <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                            NEFT Date
                            <p className='contents text-red-600 text-sm font-bold'>*</p>
                          </label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                              <DesktopDatePicker
                               
                                onChange={(e)=>handlePaymentDetails(e, "neftDate")}
                                 name="neftDate"
                                 id="neftDate"
                                inputFormat="YYYY-MM-DD" 

                                renderInput={(params) => <TextField {...params} />}
                                value={paymentDetail.neftDate}
                              />
                            </Stack>
                          </LocalizationProvider>
                        </div>
                      </div>
             </>
             : paymentDetail.paymentMode === 'RTGS' ?  
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
                    <Select
                      name="bank_name"
                      defaultValue={paymentDetail.bankName}
                      onChange={(e)=>handlePaymentDetails(e,'')}

                        label="select" className="pl-2 pr-3 py-2 w-full font-bold text-xs text-gray-900">
                        {
                          paymentModeDetailsInputFromAPI?.length > 0 ? (
                            paymentModeDetailsInputFromAPI[0]?.bankNameBeans.map((item, index) => {
                              const { id, bank_name } = item
                              return (
                                <Option key={index} value={JSON.stringify(item)} >{bank_name}</Option>
                              )
                            })
                          ) : <Option>Loading...</Option>
                        }
                      </Select>
                    </div>
                 <div className='mb-4 ml-3 mt-2 flex'>
                          <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                            Branch name<p className='contents text-red-600 text-sm font-bold'>*</p>
                          </label>
                          <input 
                            name="branch"
                            id="branch"
                            defaultValue={paymentDetail.branch}
                            onChange={(e)=>handlePaymentDetails(e,'')} 
                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                    focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                            type="text" placeholder="Branch" />
                        </div>
                  </div>
                  {
                       paymentDetail.bankName === 'OTHERS' ?   
                       <div className='mb-4 ml-3 mt-2 flex'>
                       <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                       Please mention other bank name
                     
                       </label>
                       <input 
                       name="othersBankName"
                       id="othersBankName"
                       defaultValue={paymentDetail.othersBankName}
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
                          name="rtgsNo"
                          id="rtgsNo"
                          defaultValue={paymentDetail.rtgsNo}
                          onChange={(e)=>handlePaymentDetails(e,'')} 
                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                    focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                            type="text" placeholder="Cheque No." />
                        </div>
                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                          <label className=" w-[11rem]  block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                            RTGS Date
                            <p className='contents text-red-600 text-sm font-bold'>*</p>
                          </label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                              <DesktopDatePicker
                              
                             
                                onChange={(e)=>handlePaymentDetails(e, "rtgsDate")}
                                name="rtgsDate"
                                id="rtgsDate"
                               inputFormat="YYYY-MM-DD" 

                               renderInput={(params) => <TextField {...params} />}
                               value={paymentDetail.rtgsDate}

                              
                              />
                            </Stack>
                          </LocalizationProvider>
                        </div>
                      </div>
             </>
             : paymentDetail.paymentMode === 'Card' ? 
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
                    <Select 
                   name="bank_name"
                   defaultValue={paymentDetail.bankName}
                   onChange={(e)=>handlePaymentDetails(e,'')} 

                        label="select" className="pl-2 pr-3 py-2 w-full font-bold text-xs text-gray-900">
                        {
                          paymentModeDetailsInputFromAPI?.length > 0 ? (
                            paymentModeDetailsInputFromAPI[0]?.bankNameBeans.map((item, index) => {
                              const { id, bank_name } = item
                              return (
                                <Option key={index} value={JSON.stringify(item)} >{bank_name}</Option>
                              )
                            })
                          ) : <Option>Loading...</Option>
                        }
                      </Select>
                    </div>
                 <div className='mb-4 ml-3 mt-2 flex'>
                          <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                            Branch name<p className='contents text-red-600 text-sm font-bold'>*</p>
                          </label>
                          <input 
                          name="branch"
                          id="branch"
                          defaultValue={paymentDetail.branch}
                          onChange={(e)=>handlePaymentDetails(e,'')} 
                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                    focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                            type="text" placeholder="Branch" />
                        </div>
                  </div>
                  {
                       paymentDetail.bankName === 'OTHERS' ?   
                       <div className='mb-4 ml-3 mt-2 flex'>
                       <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                       Please mention other bank name
                    
                       </label>
                       <input 
                       name="othersBankName"
                       id="othersBankName"
                       defaultValue={paymentDetail.othersBankName}
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
                                         name="cardType"
                                         defaultValue={paymentDetail.cardType}
                                         onChange={(e)=>handlePaymentDetails(e,'')} 
                   
                                             label="Select" 
                                             className="w-full pl-2 pr-3 py-1 font-bold text-xs 
                                               text-gray-900
                                             ">
                                             <Option value='cardType_credit' >credit</Option>
                                             <Option value='cardType_debit' >debit</Option>
                                         </Select>
                    </div>
                 <div className='mb-4 ml-3 mt-2 flex'>
                          <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                            Transaction id<p className='contents text-red-600 text-sm font-bold'>*</p>
                          </label>
                          <input 
                        name="transactionId"
                        id="transactionId"
                        defaultValue={paymentDetail.transactionId}
                        onChange={(e)=>handlePaymentDetails(e,"transactionId")} 
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
                    name="apprCode"
                    id="apprCode"
                    defaultValue={paymentDetail.apprCode}
                    onChange={(e)=>handlePaymentDetails(e,"apprCode")} 
                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                    focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                           type="text" placeholder="" />
                    </div>
                 <div className='mb-4 ml-3 mt-2 flex'>
                          <label className=" w-[11rem]   text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                            Card No.(Last 4 Digits)<p className='contents text-red-600 text-sm font-bold'>*</p>
                          </label>
                          <input 
                         name="cardNo"
                         id="cardNo"
                         defaultValue={paymentDetail.cardNo}
                         onChange={(e)=>handlePaymentDetails(e,"cardNo")} 
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
                     name="cardHolderName"
                     id="cardHolderName"
                     defaultValue={paymentDetail.cardHolderName}
                     onChange={(e)=>handlePaymentDetails(e,'')} 
                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                    focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                  type="text" placeholder="" />
                    </div>
                  </div>         
             </> : null} */}
                <div>
                  <button type='submit'
                    className={`w-36 h-8 px-4 py-1  mx-4 mb-2 tracking-wide text-white transition-colors
                             ${(consumerDetail.propertyType === 'TEMPORARY CONNECTION') || (disabled) ? `cursor-not-allowed ` : `cursor-pointer`}
                            //  ${disabled ? `cursor-not-allowed ` : `cursor-pointer`}
                              duration-200 
                             transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400`}
                    disabled={disabled}
                  >
                    Submit
                  </button>
                </div>

              </form>
            </div>
          </div>
          :

          displayHindiForm ? <PaymentReceiptHindi setDisplayHindiForm={setDisplayHindiForm}
            setShowModal={setShowModal}
            setShowReceipt={setShowReceipt}
            receiptDetails={receiptDetails} /> :
            <PaymentReceipt
              setShowReceipt={setShowReceipt}
              setDisplayHindiForm={setDisplayHindiForm}
              setShowModal={setShowModal}
              receiptDetails={receiptDetails} />




        // : <PaymentReceipt
        // consumerNumberAfterCreation={"BHMC3031222305439"} 
        // modeOfPayment={"cash"}/>
      }

    </>
  )
}

export default MainPageAddExistingConsumer 