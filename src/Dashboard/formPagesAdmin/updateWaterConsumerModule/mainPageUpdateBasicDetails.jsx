import React, { Component, useEffect, useState, useRef } from "react";
import {
  Select,
  Option,
  Button,
  Textarea,
  Checkbox,
  Tooltip,
  Switch,
} from "@material-tailwind/react";
import { CirclesWithBar, ColorRing } from "react-loader-spinner";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { getCookieByName } from "@/utils/RequireAuth";

import PaymentReceipt from "./paymentReceipt";
import PaymentReceiptHindi from "./paymentReceiptInHindi";
import { useMaterialTailwindController } from "@/Dashboard/context";
import PaymentReceiptViewPaymentDetails from "./paymentReceiptViewPaymentDetails";
import PaymentReceiptViewPaymentDetailsInHindi from "./paymentReceiptViewPaymentDetailsInHindi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { convertDateToAPIFormat } from "@/utils/commonUtils";
import PrintReceiptViewPaymentDetailsInHindi from "./printReceiptViewPaymentDetailsInHindi";
import PrintReceiptViewPaymentDetails from "./printReceiptViewPaymentDetails";

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL;

const MainPageUpdateBasicDetails = () => {
  const wardData = [
    {
      id: 124,
      zone_mstr_id: 16,
      ward_name: "1",
      area_name: "JANUWANI",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 125,
      zone_mstr_id: 16,
      ward_name: "2",
      area_name: "ISMRITI NAGAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 126,
      zone_mstr_id: 16,
      ward_name: "3",
      area_name: "KOSANAGAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 127,
      zone_mstr_id: 16,
      ward_name: "4",
      area_name: "RADHIKA NAGAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 128,
      zone_mstr_id: 16,
      ward_name: "5",
      area_name: "LAXMI NAGAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 129,
      zone_mstr_id: 16,
      ward_name: "6",
      area_name: "SUPAILA BAZAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 130,
      zone_mstr_id: 16,
      ward_name: "7",
      area_name: "FARID NAGAR KOHAKA",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 131,
      zone_mstr_id: 16,
      ward_name: "8",
      area_name: "RANI AWANTIKABAI KOHAKA",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 132,
      zone_mstr_id: 16,
      ward_name: "9",
      area_name: "PURANI BASTI KHOHKA",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 133,
      zone_mstr_id: 16,
      ward_name: "12",
      area_name: "CONTACTOR COLONY",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 134,
      zone_mstr_id: 16,
      ward_name: "67",
      area_name: "SECTOR-08",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 135,
      zone_mstr_id: 16,
      ward_name: "69",
      area_name: "SHAHID KHAUSHAL NAGAR SOUTH",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 136,
      zone_mstr_id: 16,
      ward_name: "70",
      area_name: "SHAHID KHAUSHAL NAGAR NORTH",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 137,
      zone_mstr_id: 16,
      ward_name: "10",
      area_name: "SHANTI NAGAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 138,
      zone_mstr_id: 16,
      ward_name: "11",
      area_name: "AMBEDKAR NAGAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 139,
      zone_mstr_id: 16,
      ward_name: "13",
      area_name: "RAJIV NAGAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 140,
      zone_mstr_id: 17,
      ward_name: "14",
      area_name: "RAMNAGAR MUKTIDHAM",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 141,
      zone_mstr_id: 17,
      ward_name: "15",
      area_name: "VAISHALI NAGAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 142,
      zone_mstr_id: 16,
      ward_name: "16",
      area_name: "KURUD",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 143,
      zone_mstr_id: 16,
      ward_name: "17",
      area_name: "VIRNDA NAGAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 144,
      zone_mstr_id: 17,
      ward_name: "18",
      area_name: "PREM NAGAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 145,
      zone_mstr_id: 17,
      ward_name: "19",
      area_name: "SHASTRI NAGAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 146,
      zone_mstr_id: 17,
      ward_name: "26",
      area_name: "HOUSING BOARD",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 147,
      zone_mstr_id: 17,
      ward_name: "27",
      area_name: "GHASHIDAS NAGAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 148,
      zone_mstr_id: 17,
      ward_name: "20",
      area_name: "PRAGTI NAGAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 149,
      zone_mstr_id: 17,
      ward_name: "21",
      area_name: "SUNDAR NAGAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 150,
      zone_mstr_id: 17,
      ward_name: "22",
      area_name: "SHYAM NAGAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 151,
      zone_mstr_id: 17,
      ward_name: "23",
      area_name: "RAVIDAS NAGAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 152,
      zone_mstr_id: 17,
      ward_name: "24",
      area_name: "SHARDAPARA",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 153,
      zone_mstr_id: 17,
      ward_name: "25",
      area_name: "SANTOSHIPARA",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 154,
      zone_mstr_id: 19,
      ward_name: "46",
      area_name: "SECTOR-03",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 155,
      zone_mstr_id: 19,
      ward_name: "47",
      area_name: "SECTOR-01 SOUTH",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 156,
      zone_mstr_id: 19,
      ward_name: "48",
      area_name: "SECTOR-01 NORTH",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 157,
      zone_mstr_id: 19,
      ward_name: "49",
      area_name: "SECTOR-02 EAST",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 158,
      zone_mstr_id: 19,
      ward_name: "50",
      area_name: "SECTOR-02 WEST",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 159,
      zone_mstr_id: 17,
      ward_name: "28",
      area_name: "CHHAWANI BASTI",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 160,
      zone_mstr_id: 17,
      ward_name: "29",
      area_name: "KHURSIPAR ZONE-2 BAPU NAGAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 161,
      zone_mstr_id: 18,
      ward_name: "30",
      area_name: "KHURSI ZONE-2 BALAJEE NAGAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 162,
      zone_mstr_id: 18,
      ward_name: "31",
      area_name: "KHURSI ZONE-3 DURGA MANDIR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 163,
      zone_mstr_id: 18,
      ward_name: "32",
      area_name: "NEW KHURSI RADHAKRISHN MANDIR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 164,
      zone_mstr_id: 18,
      ward_name: "33",
      area_name: "KHURSI ZONE-3  ",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 165,
      zone_mstr_id: 18,
      ward_name: "34",
      area_name: "SUBHASH NAGAR KHURSI ZONE-2",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 166,
      zone_mstr_id: 18,
      ward_name: "35",
      area_name: "SHASTRI NAGAR KHURSI ZONE-2",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 167,
      zone_mstr_id: 18,
      ward_name: "36",
      area_name: "GAUTAM NAGAR KHURSI ZONE-1",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 168,
      zone_mstr_id: 18,
      ward_name: "37",
      area_name: "CHANDR SHEKHAR AZAD NAGAR KHURSI ZONE-1",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 169,
      zone_mstr_id: 19,
      ward_name: "38",
      area_name: "S. V.R. NAGAR KHURSI",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 170,
      zone_mstr_id: 19,
      ward_name: "39",
      area_name: "PURAINA",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 171,
      zone_mstr_id: 19,
      ward_name: "51",
      area_name: "SECTOR-04 EAST",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 172,
      zone_mstr_id: 18,
      ward_name: "52",
      area_name: "SECTOR-04 WEST",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 173,
      zone_mstr_id: 18,
      ward_name: "53",
      area_name: "SECTOR-05 EAST ",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 174,
      zone_mstr_id: 18,
      ward_name: "54",
      area_name: "SECTOR-05 WEST",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 175,
      zone_mstr_id: 18,
      ward_name: "55",
      area_name: "SECTOR-06 EAST",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 176,
      zone_mstr_id: 18,
      ward_name: "56",
      area_name: "SECTOR-06 MIDDLE ",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 177,
      zone_mstr_id: 24,
      ward_name: "57",
      area_name: "SECTOR-06 WEST",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 178,
      zone_mstr_id: 24,
      ward_name: "64",
      area_name: "SECTOR-10",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 179,
      zone_mstr_id: 24,
      ward_name: "65",
      area_name: "SECTOR-07 EAST",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 180,
      zone_mstr_id: 24,
      ward_name: "66",
      area_name: "SECTOR-07 WEST",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 181,
      zone_mstr_id: 24,
      ward_name: "68",
      area_name: "SECTOR-09 HOUSING SECTOR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 182,
      zone_mstr_id: 19,
      ward_name: "40",
      area_name: "JORATARAI",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 183,
      zone_mstr_id: 19,
      ward_name: "41",
      area_name: "DUNDERA",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 184,
      zone_mstr_id: 19,
      ward_name: "42",
      area_name: "NEWAI BHATHA",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 185,
      zone_mstr_id: 19,
      ward_name: "43",
      area_name: "STATION MARODA",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 186,
      zone_mstr_id: 19,
      ward_name: "44",
      area_name: "MARODA CAMP MOHARI MATHA",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 187,
      zone_mstr_id: 19,
      ward_name: "45",
      area_name: "MARODA SECTOR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 188,
      zone_mstr_id: 19,
      ward_name: "58",
      area_name: "RISALI SECTOR NORTH",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 189,
      zone_mstr_id: 19,
      ward_name: "59",
      area_name: "RISALI SECTOR SOUTH",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 190,
      zone_mstr_id: 19,
      ward_name: "60",
      area_name: "RISALI BASTI",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 191,
      zone_mstr_id: 19,
      ward_name: "61",
      area_name: "PRAGATI NAGAR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 192,
      zone_mstr_id: 19,
      ward_name: "62",
      area_name: "RUWABANDHA SECTOR",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 193,
      zone_mstr_id: 19,
      ward_name: "63",
      area_name: "RUWABANDHA BASTI",
      stampdate: "2017-07-28",
      user_id: 1,
      status: "1",
    },
    {
      id: 426,
      zone_mstr_id: 19,
      ward_name: "0",
      area_name: "RUWABANDHA BASTI",
      stampdate: "2022-02-23",
      user_id: 1,
      status: "1",
    },
  ];

  const modeOfPayment = [
    {
      id: 1,
      mode_of_payment: "Cash",
      status: 1,
    },
    {
      id: 2,
      mode_of_payment: "Cheque",
      status: 1,
    },
    {
      id: 3,
      mode_of_payment: "DD",
      status: 1,
    },
    {
      id: 4,
      mode_of_payment: "Card",
      status: 1,
    },
    {
      id: 5,
      mode_of_payment: "NEFT",
      status: 1,
    },
    {
      id: 6,
      mode_of_payment: "RTGS",
      status: 1,
    },
  ];
  const paymentDetails = {
    // consumerNo: '',
    //  effectiveDate: '',
    //  consumerDetailsId: '',
    //  userId: '',
    //  ipAddress: '',
    //  dueFromYear:'',
    //  dueUpToYear: '',
    //  transactionId: '',
    //  arrearAm: '',
    //  penalty: '',
    //  discount: '',
    //  demandPayment: '',

    apprCode: "",
    bankName: "",
    branch: "",
    cardHolderName: "",
    cardNo: "",
    cardType: "",
    chequeDDNo: "",
    chequeDDDate: "",
    narration: "",
    neftDate: "",
    neftNo: "",
    othersBankName: "",
    payableAmt: "",
    paymentMode: "",
    paymentModeId: "",
    rtgsNo: "",
    rtgsDate: "",
  };

  const searchConsumerDetails = {
    ward_id: "",
    propertyNo: "",
    ConsumerNo: "",
    MobileNUmber: "",
    name: "",
  };

  const columns = [
    { field: "id", header: "#" },
    { field: "name", header: "Name" },
    { field: "address", header: "Address" },
    { field: "date", header: "Date" },
    { field: "order", header: "Order No" },
  ];

  const [searchConsumerDetail, setSearchConsumerDetail] = useState(
    searchConsumerDetails
  );
  const [searchConsumerDetailResult, setSearchConsumerDetailResult] =
    useState(null);
  const [displayTable, setDisplayTable] = useState(false);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [consumerDetails, setConsumerDetails] = useState([]);
  const [consumerPaymentDetails, setConsumerPaymentDetails] = useState([]);
  const [controller, dispatch] = useMaterialTailwindController();
  const { paymentModeDetailsInputFromAPI } = controller;
  const [toggle, setToggle] = useState(true);
  const [temp, setTemp] = useState("");
  const [val, setVal] = useState("");
  const [demandLoader, setDemandLoader] = useState(false);
  const [generatedemandLoader, setGenerateDemandLoader] = useState(false);
  const [paynowbutton, setPayNowButton] = useState(false);
  const [paynowLoader, setpaynowLoader] = useState(false);
  const [paymentLoader, setpaymentLoader] = useState(false);
  const [isGenerateDisabled, setIsGenerateDisabled] = useState(false);
  const inputElement = useRef();

  //making true
  const [displayPrintDemandForm, setDisplayPrintDemandForm] = useState(false);
  const [displayPrintReceipt, setDisplayPrintReceipt] = useState(false);
  const [displayHindiForm, setDisplayHindiForm] = useState(false);
  const [displayHindiPrintForm, setDisplayHindiPrintForm] = useState(false);
  const [displayConsumerPaymentDetail, setDisplayConsumerPaymentDetail] =
    useState(false);
  const [displayPaymentDetail, setDisplayPaymentDetail] = useState(false);
  const [paymentDetail, setPaymentDetail] = useState(paymentDetails);
  const [consumerNumber, setConsumerNumber] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [paynow, setPayNow] = useState(true);
  useEffect(() => {
    console.log(consumerDetails);
  }, [consumerDetails]);

  useEffect(() => {
    setDisplayPaymentDetail(false);
  }, []);
  useEffect(() => {
    console.log(paymentDetail);
  }, [paymentDetail]);

  useEffect(() => {
    if (paymentDetail.paymentMode === "Cash") {
      setPayNow(false);
    } else if (paymentDetail.paymentMode === "Cheque") {
      if (
        paymentDetail.bankName !== "" &&
        paymentDetail.branch !== "" &&
        paymentDetail.chequeDDNo !== "" &&
        paymentDetail.chequeDDDate !== ""
      ) {
        setPayNow(false);
      } else {
        setPayNow(true);
      }
    } else if (paymentDetail.paymentMode === "DD") {
      if (
        paymentDetail.bankName !== "" &&
        paymentDetail.branch !== "" &&
        paymentDetail.chequeDDNo !== "" &&
        paymentDetail.chequeDDDate !== ""
      ) {
        setPayNow(false);
      } else {
        setPayNow(true);
      }
    } else if (paymentDetail.paymentMode === "Card") {
      if (
        paymentDetail.bankName !== "" &&
        paymentDetail.branch !== "" &&
        paymentDetail.cardType !== "" &&
        paymentDetail.apprCode !== "" &&
        paymentDetail.cardHolderName !== "" &&
        paymentDetail.cardNo !== ""
      ) {
        setPayNow(false);
      } else {
        setPayNow(true);
      }
    } else if (paymentDetail.paymentMode === "NEFT") {
      if (
        paymentDetail.bankName !== "" &&
        paymentDetail.branch !== "" &&
        paymentDetail.neftDate !== "" &&
        paymentDetail.neftNo !== ""
      ) {
        setPayNow(false);
      } else {
        setPayNow(true);
      }
    } else if (paymentDetail.paymentMode === "RTGS") {
      if (
        paymentDetail.bankName !== "" &&
        paymentDetail.branch !== "" &&
        paymentDetail.rtgsNo !== "" &&
        paymentDetail.rtgsDate !== ""
      ) {
        setPayNow(false);
      } else {
        setPayNow(true);
      }
    } else {
      setPayNow(true);
    }
  }, [
    paymentDetail.paymentMode,
    paymentDetail.bankName,
    paymentDetail.branch,
    paymentDetail.chequeDDNo,
    paymentDetail.chequeDDDate,
    paymentDetail.cardType,
    paymentDetail.apprCode,
    paymentDetail.cardHolderName,
    paymentDetail.cardNo,
    paymentDetail.neftDate,
    paymentDetail.neftNo,
    paymentDetail.rtgsDate,
    paymentDetail.rtgsNo,
  ]);
  // useEffect(()=>{
  //   console.log('searching...', searchConsumerDetail)
  //  if((searchConsumerDetail.ward_id !=='' && searchConsumerDetail.propertyNo !=='' ))
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
  // },[searchConsumerDetail.ward_id,searchConsumerDetail.propertyNo,searchConsumerDetail.ConsumerNo,
  //   searchConsumerDetail.MobileNUmber,searchConsumerDetail.name])

  useEffect(() => {
    console.log("searching...", searchConsumerDetail);
    if (
      searchConsumerDetail.ward_id !== "" ||
      searchConsumerDetail.propertyNo !== "" ||
      searchConsumerDetail.ConsumerNo !== "" ||
      searchConsumerDetail.MobileNUmber !== "" ||
      searchConsumerDetail.name !== ""
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    searchConsumerDetail.ward_id,
    searchConsumerDetail.propertyNo,
    searchConsumerDetail.ConsumerNo,
    searchConsumerDetail.MobileNUmber,
    searchConsumerDetail.name,
  ]);

  const handleSearchQueryChange = (e) => {
    if (e.toString().includes("ward_name")) {
      let wardItem = JSON.parse(e);
      // console.log(wardItem)
      setSearchConsumerDetail((prevState) => {
        return {
          ...prevState,
          ward_id: wardItem.id,
        };
      });
    } else {
      setSearchConsumerDetail({
        ...searchConsumerDetail, // spreading the unchanged values
        [e.target.name]: e.target.value, // changing the state of *changed value*
      });
    }
  };

  const backHandler = () => {
    setDisplayDetails(true);
    setDisplayConsumerPaymentDetail(false);
    setDisplayTable(false);
    setToggle(false);
  };
  const handlePaymentDetails = (e, id) => {
    console.log(e);
    if (e.toString().includes("mode_of_payment")) {
      let connItem = JSON.parse(e);
      // console.log(wardItem)
      setPaymentDetail((prevState) => {
        return {
          ...prevState,
          paymentMode: connItem.mode_of_payment,
          paymentModeId: connItem.id,
        };
      });
    } else if (e.toString().includes("bank_name")) {
      let connItem = JSON.parse(e);
      // console.log(wardItem)
      setPaymentDetail((prevState) => {
        return {
          ...prevState,
          bankName: connItem.bank_name,
        };
      });
    } else if (e.toString().includes("narration")) {
      let connItem = JSON.parse(e);
      // console.log(wardItem)
      setPaymentDetail((prevState) => {
        return {
          ...prevState,
          narration: e.target.value,
        };
      });
    } else if (id.includes("chequeDDDate")) {
      setPaymentDetail((prevState) => {
        return { ...prevState, chequeDDDate: convertDateToAPIFormat(e.$d) };
      });
    } else if (e.toString().includes("cardType")) {
      let relation = e.toString().split("_")[1];
      // console.log(zoneItem)
      setPaymentDetail((prevState) => {
        return {
          ...prevState,
          cardType: relation,
        };
      });
    } else if (id.includes("neftDate")) {
      setPaymentDetail((prevState) => {
        return { ...prevState, neftDate: convertDateToAPIFormat(e.$d) };
      });
    } else if (id.includes("rtgsDate")) {
      setPaymentDetail((prevState) => {
        return { ...prevState, rtgsDate: convertDateToAPIFormat(e.$d) };
      });
    } else {
      setPaymentDetail({
        ...paymentDetail, // spreading the unchanged values
        [e.target.name]: e.target.value, // changing the state of *changed value*
      });
    }
  };

  const handleViewBtnClick = async (e, consumerNo) => {
    e.preventDefault();
    setDemandLoader(true);
    //setDisplayTable(true)
    console.log("after clicking view", consumerNo);
    try {
      const paymentReceiptDetailsGetUrl = `${SUDA_API_BASE_URL}/user/Water/SearchView/${consumerNo}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
      };
      let response = null,
        responseBody = null;
      response = await fetch(paymentReceiptDetailsGetUrl, requestOptions);
      responseBody = await response.json();
      //console.log(response,responseBody)
      console.log("after clicking view result", response, responseBody);
      if (response?.status == "200" && !responseBody?.errors) {
        console.log("after clicking view result 200", responseBody);
        setConsumerDetails(responseBody);
        setDemandLoader(false);
        setDisplayDetails(true);
        setDisplayTable(false);
        setToggle(false);
      } else if (response?.status == "200" && responseBody?.errors) {
        console.log(responseBody?.errors[0].message);
        toast.error(responseBody?.errors[0].message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setDemandLoader(false);
        //setShowReceipt(true)
      } else {
        toast.error("Error encountered, please try again", {
          position: toast.POSITION.TOP_CENTER,
        });
        setDemandLoader(false);
      }
    } catch (err) {
      console.error(err);
      setDemandLoader(false);
      // setReceiptDetails([])
      // setIsReceipLoaded(false)
    } finally {
      // setIsReceiptLoading(false)
    }
  };
  const updateBasicDetailFormHandler = async (e) => {
    e.preventDefault();
    setTemp("Loading...");
    try {
      const paymentReceiptDetailsGetUrl = `${SUDA_API_BASE_URL}/user/Water/SearchConsumer?consumerName=${searchConsumerDetail.name}&consumerNo=${searchConsumerDetail.ConsumerNo}&mobileNo=${searchConsumerDetail.MobileNUmber}&propertyNo=${searchConsumerDetail.propertyNo}&wardId=${searchConsumerDetail.ward_id}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
      };
      let response = null,
        responseBody = null;
      response = await fetch(paymentReceiptDetailsGetUrl, requestOptions);
      responseBody = await response.json();
      console.log("Search consumer", response, responseBody);

      if (response?.status == "200") {
        console.log("200", responseBody);
        setSearchConsumerDetailResult(responseBody);

        //setDisplayTable(true)
      } else {
        toast.error("Error while searching. Please try again later", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      console.error(err);
      //searchConsumerDetailResult
      toast.error("Error while searching. Please try again later", {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
    }
    // searchConsumerDetail.propertyNo = ''
    setSearchConsumerDetail((prevState) => {
      return {
        ...prevState,
        //ward_id: prevState.ward_id,
        propertyNo: "",
        ConsumerNo: "",
        MobileNUmber: "",
        name: "",
      };
    });

    // setSearchConsumerDetail({
    //   ward_id:'',
    //   propertyNo:''
    // })
  };
  const backbuttonHandler = () => {
    setDisplayDetails(false);
    setDisplayTable(false);
    setToggle(true);
  };
  useEffect(() => {
    console.log(searchConsumerDetail);
  }, [searchConsumerDetail]);
  useEffect(() => {
    if (searchConsumerDetailResult?.length > 0) {
      setDisplayTable(true);
      setTemp("");
    } else if (searchConsumerDetailResult?.length === 0) {
      setDisplayTable(false);
      setTemp("No results found");
    } else {
      setTemp("");
    }
  }, [searchConsumerDetailResult]);

  const printDemandHandler = () => {
    //setDisplayPrintDemandForm(true)
    setDisplayPrintReceipt(true);
    setToggle(false);
    setDisplayTable(false);
    setDisplayDetails(false);

    // setDisplayPrintDemandForm(true)
    // setToggle(false)
    // setDisplayTable(false)
    // setDisplayDetails(false)
    // setDisplayConsumerPaymentDetail(false)
  };
  // const viewPaymentDetailsHandler = (e,consumerNo) => {
  //   console.log("UNDER VIEW BUTTON", consumerNo)
  //  setDisplayConsumerPaymentDetail(true)
  //  setToggle(false)
  //  setDisplayTable(false)
  //  setDisplayDetails(false)
  // }

  const viewPaymentDetailsHandler = async (e, consumerNo) => {
    e.preventDefault();
    setpaymentLoader(true);
    console.log(consumerNo);
    try {
      const paymentReceiptDetailsGetUrl = `${SUDA_API_BASE_URL}/user/Water/getConsumerPayment/${consumerNo}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
      };
      let response = null,
        responseBody = null;
      response = await fetch(paymentReceiptDetailsGetUrl, requestOptions);
      responseBody = await response.json();
      // console.log(response)
      // console.log(responseBody)
      if (response?.status == "200" && !responseBody?.errors) {
        console.log("PAYMENT", responseBody);
        setpaymentLoader(false);
        setConsumerPaymentDetails(responseBody);
        // setDisplayTable(true)
        setDisplayConsumerPaymentDetail(true);
        setToggle(false);
        setDisplayTable(false);
        setDisplayDetails(false);
      } else if (response?.status == "200" && responseBody?.errors) {
        toast.error(responseBody.errors.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setpaymentLoader(false);
      } else {
        console.error(err);
        setpaymentLoader(false);
      }
    } catch (err) {
      console.error(err);
      setpaymentLoader(false);
    } finally {
    }
  };

  const generateDemandHandler = async (e) => {
    e.preventDefault();
    setGenerateDemandLoader(true);
    const userId = getCookieByName("SUDA_USER_ID");
    const consumerNo = consumerDetails?.consumerNo;
    const wardNo = consumerDetails?.wardNo;
    const effectFrom = consumerDetails?.maxEffectFrom;
    console.log(userId, consumerNo, wardNo, effectFrom);
    try {
      //setIsSAFFormSubmissionLoading(true)
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
        body: JSON.stringify({
          consumerNo,
          effectFrom,
          userId,
          wardNo,
        }),
      };
      const safNewEntryUrl = `${SUDA_API_BASE_URL}/user/Water/DemandGenerate`;
      //const response = await fetch(safNewEntryUrl, requestOptions)
      let response = null,
        responseBody = null;
      response = await fetch(safNewEntryUrl, requestOptions);
      responseBody = await response?.json();
      // console.log("woohooo")
      console.log("DemandGenerate", response);
      if (response?.status == "200" && !responseBody) {
        console.log("DemandGenerate", response);

        const consumerNo = consumerDetails?.consumerNo;
        // console.log(consumerNo)
        // handleViewBtnClick(e,consumerNo)
        try {
          const paymentReceiptDetailsGetUrl = `${SUDA_API_BASE_URL}/user/Water/SearchView/${consumerNo}`;
          const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
            },
          };
          let response = null,
            responseBody = null;
          response = await fetch(paymentReceiptDetailsGetUrl, requestOptions);
          responseBody = await response.json();
          console.log("after clicking view result", response, responseBody);
          if (response?.status == "200" && !responseBody?.errors) {
            console.log("after clicking view result 200", responseBody);
            setConsumerDetails(responseBody);
            setGenerateDemandLoader(false);
            setDisplayDetails(true);
            setDisplayTable(false);
            setToggle(false);
          } else if (response?.status == "200" && responseBody?.errors) {
            toast.error(responseBody.errors.message, {
              position: toast.POSITION.TOP_CENTER,
            });
            setGenerateDemandLoader(false);
          } else {
            // setIsReceipLoaded(false)
            toast.error(err, {
              position: toast.POSITION.TOP_CENTER,
            });
            setGenerateDemandLoader(false);
          }
        } catch (err) {
          console.error(err);
          setGenerateDemandLoader(false);
          // setReceiptDetails([])
          // setIsReceipLoaded(false)
        } finally {
          // setIsReceiptLoading(false)
        }

        //setConsumerNumberAfterCreation(responseBody.consumerNo)
        // setIsSAFFormSubmissionSuccess(true)
        // setIsSAFFormSubmissionLoading(false)
        // setPropertyId(safNewFormBasicDetails.prop_id)
        // switchOnNextModalNOffCurrModal(currModal, nextModal)
        // clearAllStateForSAFForm()
        // finalReqObjForSafNewEntry = {}
      }
      //  else if(response?.status == "200" ){
      //   toast.error(responseBody.errors[0].message, {
      //     position: toast.POSITION.TOP_CENTER
      //   });
      //   console.log(response,responseBody, responseBody.errors[0].message)
      // }
      else if (response?.status == "200" && responseBody?.errors) {
        toast.error(responseBody?.errors[0].message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setGenerateDemandLoader(false);
      } else {
        toast.error("Error encountered, please try again", {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(response, responseBody, responseBody.errors[0].message);
        setGenerateDemandLoader(false);
      }
    } catch (err) {
      toast.error(err, {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(err);
      setGenerateDemandLoader(false);
    }
  };

  const paymentOptionsHandler = async (e) => {
    e.preventDefault();
    setpaynowLoader(true);
    paymentDetail.userId = getCookieByName("SUDA_USER_ID");
    paymentDetail.consumerNo = consumerDetails?.consumerNo;
    paymentDetail.wardNo = consumerDetails?.wardNo;
    paymentDetail.oldWardId = consumerDetails?.wardNo;
    paymentDetail.dateOfEffect = consumerDetails?.maxEffectFrom;
    paymentDetail.connectionType = consumerDetails?.connectionType;
    paymentDetail.demandPayment = consumerDetails?.demandAmount;
    paymentDetail.payableAmt = consumerDetails?.totalPayableAmount;
    paymentDetail.penalty = consumerDetails?.penalty;
    paymentDetail.propertyTypeId = consumerDetails?.propertyType;
    paymentDetail.chequeDDAmount = consumerDetails?.demandAmount;
    paymentDetail.demandId = consumerDetails?.demandId;
    paymentDetail.propertyTypeId = consumerDetails?.propertyTypeId;

    //let ipAddress = ""
    try {
      let responseIp = await fetch("https://geolocation-db.com/json/");
      let responseBodyOfIp = await responseIp.json();
      paymentDetail.ipAddress = responseBodyOfIp?.IPv4
        ? responseBodyOfIp.IPv4
        : "0.0.0.0";
    } catch (err) {
      console.error(err);
      paymentDetail.ipAddress = "0.0.0.0";
    }
    const {
      apprCode,
      bankName,
      branch,
      cardHolderName,
      cardNo,
      cardType,
      chequeDDAmount,
      chequeDDDate,
      chequeDDNo,
      connectionType,
      consumerNo,
      dateOfEffect,
      demandId,
      demandPayment,
      ipAddress,
      narration,
      neftDate,
      neftNo,
      oldWardNo,
      othersBankName,
      payableAmt,
      paymentMode,
      paymentModeId,
      penalty,
      propertyTypeId,
      rtgsDate,
      rtgsNo,
      userId,
      wardNo,
    } = paymentDetail;
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
        body: JSON.stringify({
          apprCode,
          bankName,
          branch,
          cardHolderName,
          cardNo,
          cardType,
          chequeDDAmount,
          chequeDDDate,
          chequeDDNo,
          connectionType,
          consumerNo,
          dateOfEffect,
          demandId,
          demandPayment,
          ipAddress,
          narration,
          neftDate,
          neftNo,
          oldWardNo,
          othersBankName,
          payableAmt,
          paymentMode,
          paymentModeId,
          penalty,
          propertyTypeId,
          rtgsDate,
          rtgsNo,
          userId,
          wardNo,
        }),
      };
      //   const safNewEntryUrl = `${SUDA_API_BASE_URL}/user/Water/WaterPayment`
      //   let response = null, responseBody = null
      //   response = await fetch(safNewEntryUrl, requestOptions)
      //   responseBody = await response.json()
      //   console.log('PAYMENT', response,responseBody)
      //   if (response?.status == "200" && !responseBody) {
      //     console.log(response, responseBody)
      //     setpaynowLoader(false)
      //     toast.success('Payment Successful', {
      //       position: toast.POSITION.TOP_CENTER
      //     });
      //    setPayNow(true)
      //   }
      //   else if(response?.status == "200" && responseBody?.errors){
      //     toast.error(responseBody.errors[0].message, {
      //       position: toast.POSITION.TOP_CENTER
      //     });
      //     setpaynowLoader(false)
      //   }

      //   else{
      //     toast.error('Error encountered, please try again', {
      //       position: toast.POSITION.TOP_CENTER
      //     });
      //     setpaynowLoader(false)
      //     console.log(response,responseBody)
      //   }
      // } catch (err) {
      //  toast.error(err, {
      //   position: toast.POSITION.TOP_CENTER
      // });
      //  console.log(err)
      //  setpaynowLoader(false)
      // }}

      const safNewEntryUrl = `${SUDA_API_BASE_URL}/user/Water/WaterPayment`;
      let response = null,
        responseBody = null;
      response = await fetch(safNewEntryUrl, requestOptions);
      //responseBody = await response.json()
      console.log("PAYMENT", response);
      if (response?.status == "200") {
        if (!response.json()) {
          toast.error(responseBody.errors.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          setpaynowLoader(false);
          toast.success("Payment Successful", {
            position: toast.POSITION.TOP_CENTER,
          });
          setPayNow(true); //0122
          setIsGenerateDisabled(true)
        }
      }
      // else if(response?.status == "200" && responseBody?.errors){
      //   toast.error(responseBody.errors[0].message, {
      //     position: toast.POSITION.TOP_CENTER
      //   });
      //   setpaynowLoader(false)
      // }
      else {
        toast.error("Error encountered, please try again", {
          position: toast.POSITION.TOP_CENTER,
        });
        setpaynowLoader(false);
        console.log(response, responseBody);
      }
    } catch (err) {
      toast.error(err, {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(err);
      setpaynowLoader(false);
    }
  };

  const consumerPaymentDetailsPaymentReceipt = async (e, rec) => {
    e.preventDefault();
    console.log(inputElement);
    let v = e.target.getAttribute("data-test-id");
    setVal(v);
    console.log(v);
    console.log(rec);
    setDisplayPrintDemandForm(true);
    setToggle(false);
    setDisplayTable(false);
    setDisplayDetails(false);
    setDisplayConsumerPaymentDetail(false);
  };
  const payWaterTaxHandler = () => {
    setDisplayPaymentDetail((prevState) => !prevState);
  };
  useEffect(() => {
    console.log(val);
  }, [val]);

  useEffect(() => {
    if (consumerDetails) {
      if (consumerDetails.demandId && consumerDetails.demandId.length > 0) {
        setIsGenerateDisabled(true);
        console.log("beep");
      }
    }
  }, [consumerDetails]);

  console.log("isGenerateDis", isGenerateDisabled);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="relative mb-10 mt-10 flex  flex-col justify-center overflow-hidden">
        {toggle ? (
          <>
            <div className="m-auto w-full rounded-md  bg-white px-0 pb-4 pt-0 lg:max-w-full">
              <form
                className="mt-4 h-screen"
                onSubmit={updateBasicDetailFormHandler}
              >
                <div className="m-4 rounded-lg  bg-white px-0  pb-0 pt-0 lg:max-w-full">
                  <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-lg py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
                    <h2 className="text-center text-sm font-semibold text-white">
                      Search Water Consumer
                    </h2>
                  </nav>
                  <div className=" mb-6 mt-3 flex-col items-center justify-center md:flex-1 lg:flex">
                    <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                      <label
                        className="mb-2 block text-xs font-bold text-gray-700"
                        htmlFor="password"
                      >
                        Ward No
                        {/* <p className='contents text-red-600 text-xs font-bold'>*</p> */}
                      </label>
                      <Select
                        onChange={(e) => handleSearchQueryChange(e)}
                        name="ward_name"
                        color='gray'
                        defaultValue={searchConsumerDetail.ward_id}
                        label="select"
                        className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
                      >
                        {wardData.length > 0 ? (
                          wardData.map((item) => {
                            const {
                              id,
                              zone_mstr_id,
                              ward_name,
                              area_name,
                              stampdate,
                              user_id,
                              status,
                            } = item;
                            return (
                              <Option
                                key={id}
                                value={JSON.stringify(item)}
                              >{`${ward_name}`}</Option>
                            );
                          })
                        ) : (
                          <Option>Loading...</Option>
                        )}
                      </Select>
                    </div>
                    <div className="mb-3 ml-3 mt-2 min-w-fit max-w-fit">
                      <p className="text-xs font-bold text-red-600">OR</p>
                    </div>
                    <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                      <label
                        className="mb-2 block text-xs font-bold text-gray-700"
                        htmlFor="password"
                      >
                        Property No.
                      </label>
                      <input
                        //value={safSearchQueryParamObj.property_no}
                        onChange={(e) => handleSearchQueryChange(e)}
                        name="propertyNo"
                        value={searchConsumerDetail.propertyNo}
                        className="bg-white-200 text-white-700 w-full appearance-none rounded border border-gray-500 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500 focus:bg-white focus:outline-none"
                        type="text"
                        placeholder=""
                      />
                    </div>
                    <div className="mb-3 ml-3 mt-2 min-w-fit max-w-fit">
                      <p className="text-xs font-bold text-red-600">OR</p>
                    </div>
                    <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                      <label
                        className="mb-2 block text-xs font-bold text-gray-700"
                        htmlFor="password"
                      >
                        Consumer No
                      </label>
                      <input
                        onChange={(e) => handleSearchQueryChange(e)}
                        name="ConsumerNo"
                        value={searchConsumerDetail.ConsumerNo}
                        className="bg-white-200 text-white-700 w-full appearance-none rounded border border-gray-500 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500 focus:bg-white focus:outline-none"
                        type="text"
                        placeholder=""
                      />
                    </div>
                    <div className="mb-3 ml-3 mt-2 min-w-fit max-w-fit">
                      <p className="text-xs font-bold text-red-600">OR</p>
                    </div>
                    <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                      <label
                        className="mb-2 block text-xs font-bold text-gray-700"
                        htmlFor="password"
                      >
                        Mobile No
                      </label>
                      <input
                        onChange={(e) => handleSearchQueryChange(e)}
                        name="MobileNUmber"
                        value={searchConsumerDetail.MobileNUmber}
                        className="bg-white-200 text-white-700 w-full appearance-none rounded border border-gray-500 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500 focus:bg-white focus:outline-none"
                        type="text"
                        placeholder=""
                      />
                    </div>
                    <div className="mb-3 ml-3 mt-2 min-w-fit max-w-fit">
                      <p className="text-xs font-bold text-red-600">OR</p>
                    </div>
                    <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                      <label
                        className="mb-2 block text-xs font-bold text-gray-700"
                        htmlFor="password"
                      >
                        Name
                      </label>
                      <input
                        onChange={(e) => handleSearchQueryChange(e)}
                        name="name"
                        value={searchConsumerDetail.name}
                        className="bg-white-200 text-white-700 w-full appearance-none rounded border border-gray-500 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500 focus:bg-white focus:outline-none"
                        type="text"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className={`mx-4 mb-2 h-8 w-36 px-4 py-1 tracking-wide text-white ${disabled ? `cursor-not-allowed ` : `cursor-pointer`}
            transform rounded-md  bg-green-400 transition-colors duration-200 hover:bg-green-700  focus:bg-green-400 focus:outline-none`} disabled={disabled} >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
        ) : null}

        {displayTable ? (
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="p-2.5">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="preview-saf-form-table-laypout">
                      <tr>
                        <th
                          scope="col"
                          className="whitespace-normal border border-gray-300 px-2 py-2 text-center text-xs font-bold uppercase text-gray-700"
                        >
                          Sl. No.
                        </th>
                        <th
                          scope="col"
                          className="whitespace-normal border border-gray-300 px-2 py-2 text-center  text-xs font-bold uppercase text-gray-700"
                        >
                          Ward No.
                        </th>
                        <th
                          scope="col"
                          className="whitespace-normal border border-gray-300 px-2 py-2 text-center text-xs font-bold uppercase text-gray-700"
                        >
                          Property No.
                        </th>
                        <th
                          scope="col"
                          className="whitespace-normal border border-gray-300 px-2 py-2 text-center text-xs font-bold uppercase text-gray-700 "
                        >
                          Consumer No
                        </th>
                        <th
                          scope="col"
                          className="whitespace-normal border border-gray-300 px-2 py-2 text-center  text-xs font-bold  uppercase text-gray-700"
                        >
                          Consumer name
                        </th>
                        <th
                          scope="col"
                          className="whitespace-normal border border-gray-300 px-2 py-2 text-center text-xs font-bold uppercase text-gray-700"
                        >
                          Mobile No
                        </th>
                        <th
                          scope="col"
                          className="whitespace-normal border border-gray-300 px-2 py-2 text-center text-xs font-bold uppercase text-gray-700"
                        >
                          Address
                        </th>
                        <th
                          scope="col"
                          className="whitespace-normal border border-gray-300 px-2 py-2 text-center text-xs font-bold uppercase text-gray-700"
                          // onClick={() => handleViewBtnClick(id, property_no)}
                          // onClick={handleViewBtnClick}
                        >
                          View
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {searchConsumerDetailResult?.length > 0
                        ? searchConsumerDetailResult.map(
                            (searchResObj, index) => {
                              const {
                                address,
                                consumerName,
                                consumerNo,
                                mobileNo,
                                propertyNo,
                                wardNo,
                              } = searchResObj;
                              let cno = consumerNo;
                              return (
                                <tr
                                  key={index}
                                  className="hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {index + 1}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {wardNo}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {propertyNo}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {consumerNo}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {consumerName}
                                  </td>

                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {mobileNo}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {address}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-medium text-white">
                                    <button
                                      type="button"
                                      color="green"
                                      className="custom_button_add h-6 w-16 rounded bg-green-700 px-2 py-1"
                                      onClick={(e) =>
                                        handleViewBtnClick(e, `${consumerNo}`)
                                      }
                                    >
                                      View
                                    </button>
                                  </td>
                                </tr>
                              );
                            }
                          )
                        : null}
                    </tbody>
                  </table>
                  {demandLoader ? (
                    <div className="mx-auto h-16 w-16">
                      <ColorRing
                        visible={true}
                        height="40"
                        width="40"
                        colors={[
                          "#FF0000",
                          "#FF0000",
                          "#FF0000",
                          "#FF0000",
                          "#FF0000",
                        ]}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center font-semibold">{temp}</p>
        )}
      </div>

      {displayDetails ? (
        <>
          <div className="m-4 rounded-none  bg-white px-0  pb-0 pt-0 lg:max-w-full">
            <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-lg py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
              <h2 className="text-center text-sm font-semibold text-white">
                Consumer Details
              </h2>
              <button
                className="ml-4 mr-2 rounded-md bg-red-500 px-4
        py-1 text-center text-sm font-semibold text-white"
                onClick={backbuttonHandler}
              >
                Back
              </button>
            </nav>
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block p-2.5 align-middle lg:w-full">
                  <div className="overflow-hidden">
                    {!consumerDetails?.length > 0 ? (
                      <table className="min-w-full">
                        <thead className="bg-gray-50"></thead>

                        <tbody>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                              Consumer No
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {consumerDetails?.consumerNo}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {/* {propertyDetails[0].ward_id ? propertyDetails[0].ConsumerNo : 'N/A'} */}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                              Old Consumer No(if any)
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {consumerDetails?.oldConsumerNo}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {/* {propertyDetails[0].entry_type ? propertyDetails[0].entry_type : 'N/A'} */}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Consumer Name
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {consumerDetails?.consumerName}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {/* {propertyDetails[0].property_no ? propertyDetails[0].property_no : 'N/A' } */}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Mobile No.
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900 ">
                              {consumerDetails?.mobileNo}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {/* {propertyDetails[0].consumer_no ? propertyDetails[0].consumer_no : 'N/A' } */}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Relation
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                              {consumerDetails?.relation}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                              {/* {propertyDetails[0].property_type_name ? propertyDetails[0].property_type_name : "N/A"} */}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Gaurdian Name
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {consumerDetails?.guardianName}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                              {/* {propertyDetails[0].uses_type_name ? propertyDetails[0].uses_type_name : 'N/A'} */}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Ward No
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {consumerDetails?.wardNo}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                              {/* {propertyDetails[0].totalbuilbup_area ? propertyDetails[0].totalbuilbup_area : 'N/A'} */}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900"></td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900"></td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900"></td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Property Type
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                              {consumerDetails?.propertyType}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {/* {propertyDetails[0].property_address ? propertyDetails[0].property_address : 'N/A'} */}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Property No
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                              {consumerDetails?.propertyNo}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {/* {propertyDetails[0].mohalla ? propertyDetails[0].mohalla : 'N/A'} */}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Property Address
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900 ">
                              {consumerDetails?.propertyAddress}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {/* {propertyDetails[0].fy_name ? propertyDetails[0].fy_name : 'N/A'} */}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              No of connection/room
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {consumerDetails?.noOfConnection}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {/* {propertyDetails[0].building_name ? propertyDetails[0].building_name : 'N/A'} */}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-center text-sm font-semibold text-red-700">
                        {/* {propDetailsErr.errMsg} */}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="m-4 rounded-none  bg-white px-0  pb-0 pt-0 lg:max-w-full">
            <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-lg py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
              <h2 className="text-center text-sm font-semibold text-white">
                Consumer Connection Details
              </h2>
            </nav>
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block p-2.5 align-middle lg:w-full">
                  <div className="overflow-hidden">
                    {!consumerDetails?.length > 0 ? (
                      <table className="min-w-full">
                        <thead className="bg-gray-50"></thead>
                        <tbody>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                              Property Type
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {consumerDetails?.propertyType}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {/* {propertyDetails[0].ward_id ? propertyDetails[0].ConsumerNo : 'N/A'} */}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                              Initial Meter Reading
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {consumerDetails?.initialMeterReading}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {/* {propertyDetails[0].entry_type ? propertyDetails[0].entry_type : 'N/A'} */}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Connection Type
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {consumerDetails?.connectionType}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {/* {propertyDetails[0].property_no ? propertyDetails[0].property_no : 'N/A' } */}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              No of Connection/Room
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900 ">
                              {consumerDetails?.noOfConnection}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {/* {propertyDetails[0].consumer_no ? propertyDetails[0].consumer_no : 'N/A' } */}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Meter No
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                              {consumerDetails?.meterNo}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                              {/* {propertyDetails[0].property_type_name ? propertyDetails[0].property_type_name : "N/A"} */}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Date of Connection
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {consumerDetails?.dateOfConnection}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                              {/* {propertyDetails[0].uses_type_name ? propertyDetails[0].uses_type_name : 'N/A'} */}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-center text-sm font-semibold text-red-700">
                        {/* {propDetailsErr.errMsg} */}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="m-4 rounded-none  bg-white px-0  pb-0 pt-0 lg:max-w-full ">
            <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-lg py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
              <h2 className="text-center text-sm font-semibold text-white">
                Consumer Unit Rate Details
              </h2>
            </nav>
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block p-2.5 align-middle lg:w-full">
                  <div className="overflow-hidden">
                    {consumerDetails?.consumerUnitRateDetails ? (
                      <table className="min-w-full">
                        <thead className="bg-gray-50"></thead>
                        <tbody>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                              Unit Rate
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Extra Charge
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                              Date of effect
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                              Status
                            </td>
                          </tr>
                          {consumerDetails?.consumerUnitRateDetails?.map(
                            (consumerUnitRateDetails) => (
                              <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                                  {consumerUnitRateDetails?.unitRate}
                                </td>
                                <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                  {consumerUnitRateDetails?.extraCharge}
                                </td>
                                <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                  {consumerUnitRateDetails?.effectFrom}
                                </td>
                                <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                                  {consumerUnitRateDetails?.status}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    ) : (
                      <table className="min-w-full">
                        <thead className="bg-gray-50"></thead>
                        <tbody>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                              Unit Rate
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Extra Charge
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                              Date of effect
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                              Status
                            </td>
                          </tr>
                          <tr>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900"></td>
                            <td
                              className="ml-2 whitespace-normal px-4 py-2 text-xs font-medium text-gray-900"
                              colSpan="3"
                            >
                              <p className="whitespace-normal text-sm font-medium text-red-900">
                                No records found.
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {displayPaymentDetail ? (
              <div className="">
                <div className="rounded-none border border-gray-500  bg-white px-0  pb-0 pt-0 lg:max-w-full">
                  <nav
                    className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1
             pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10"
                  >
                    <h2 className="text-center text-sm font-semibold text-white">
                      Demand Summary
                    </h2>
                  </nav>
                  <table className="min-w-full">
                    <thead className="bg-gray-50"></thead>
                    <tbody>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                          Demand Amount
                        </td>
                        <td className="whitespace-normal px-4 py-2  text-xs  text-gray-900">
                          {consumerDetails?.demandAmount}
                        </td>
                        <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                          Total Payable Amount
                        </td>
                        <td className="whitespace-normal px-4  py-2  text-xs text-gray-900">
                          {consumerDetails?.totalPayableAmount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <nav className="navcustomproperty relative mb-2 flex flex-wrap items-center justify-between rounded-lg py-2 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
                  <h2 className="text-center text-sm font-semibold text-white">
                    Select Payment Mode
                  </h2>
                </nav>
                <div
                  className="m-4 rounded-none border border-gray-500 bg-white px-4  pb-4 pt-0 
            lg:max-w-full"
                >
                  <div
                    className="items-end md:flex-1  
              lg:flex lg:justify-between"
                  >
                    <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit">
                      <label
                        className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700 "
                        htmlFor="password"
                      >
                        Mode Of Payment
                        <p
                          className="contents text-sm 
                                    font-bold text-red-600"
                        >
                          *
                        </p>
                      </label>
                      <Tooltip
                        className="text-black-900 inline w-64 bg-red-300 text-xs"
                        placement="top"
                        // content={addExistingConsumerMsgList.validConnectionTypeMsg}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                      >
                        <Select
                          name="paymentDetail"
                          id="connectionType"
                          defaultValue={paymentDetail.paymentMode}
                          onChange={(e) => handlePaymentDetails(e, "")}
                          label="select"
                          color="gray"
                          className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900
                                      "
                        >
                          {modeOfPayment.length > 0 ? (
                            modeOfPayment.map((item) => {
                              const { id, mode_of_payment, status } = item;
                              return (
                                <Option
                                  key={id}
                                  value={JSON.stringify(item)}
                                >{`${mode_of_payment}`}</Option>
                              );
                            })
                          ) : (
                            <Option>Loading...</Option>
                          )}
                        </Select>
                      </Tooltip>
                    </div>
                    <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit">
                      <label
                        className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700 "
                        htmlFor="password"
                      >
                        Narration
                      </label>
                      <Tooltip
                        className="text-black-900 inline w-64 bg-red-300 text-xs"
                        placement="top"
                        // content={addExistingConsumerMsgList.validConnectionTypeMsg}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                      >
                        <input
                          name="narration"
                          id="narration"
                          defaultValue={paymentDetail.narration}
                          onChange={(e) => handlePaymentDetails(e, "narration")}
                          className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500
                        focus:bg-white focus:outline-none sm:w-full lg:w-72"
                          type="text"
                          placeholder=""
                        />
                      </Tooltip>
                    </div>
                  </div>
                </div>

                {paymentDetail.paymentMode === "Cheque" ? (
                  <>
                    <nav className="navcustomproperty relative mb-2 flex flex-wrap items-center justify-between rounded-lg py-2 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
                      <h2 className="text-center text-sm font-semibold text-white">
                        Bank Details
                      </h2>
                    </nav>
                    <div className="md:flex-1 lg:flex">
                      <div className="mb-4 ml-3 mt-2 flex">
                        <label
                          className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700"
                          htmlFor="password"
                        >
                          Bank Name
                          <p className="contents text-xs font-bold text-red-600">
                            *
                          </p>
                        </label>
                        <Select
                          name="bank_name"
                          id="bank_name"
                          defaultValue={paymentDetail.bankName}
                          onChange={(e) => handlePaymentDetails(e, "")}
                          color="gray"
                          label="select"
                          className="w-full py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
                        >
                          {paymentModeDetailsInputFromAPI?.length > 0 ? (
                            paymentModeDetailsInputFromAPI[0]?.bankNameBeans.map(
                              (item, index) => {
                                const { id, bank_name } = item;
                                return (
                                  <Option
                                    key={index}
                                    value={JSON.stringify(item)}
                                  >
                                    {bank_name}
                                  </Option>
                                );
                              }
                            )
                          ) : (
                            <Option>Loading...</Option>
                          )}
                        </Select>
                      </div>
                      <div className="mb-4 ml-3 mt-2 flex">
                        <label
                          className=" mb-2   w-[11rem] text-xs font-bold text-gray-700"
                          htmlFor="Branch"
                        >
                          Branch name
                          <p className="contents text-sm font-bold text-red-600">
                            *
                          </p>
                        </label>
                        <input
                          name="branch"
                          id="branch"
                          defaultValue={paymentDetail.branch}
                          onChange={(e) => handlePaymentDetails(e, "")}
                          className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500
                        focus:bg-white focus:outline-none sm:w-full lg:w-72"
                          type="text"
                          placeholder="Branch"
                        />
                      </div>
                    </div>
                    {paymentDetail.bankName === "OTHERS" ? (
                      <div className="mb-4 ml-3 mt-2 flex">
                        <label
                          className=" mb-2   w-[11rem] text-xs font-bold text-gray-700"
                          htmlFor="Branch"
                        >
                          Please mention other bank name
                          <p className="contents text-sm font-bold text-red-600">
                            *
                          </p>
                        </label>
                        <input
                          name="othersBankName"
                          id="othersBankName"
                          defaultValue={paymentDetail.othersBankName}
                          onChange={(e) => handlePaymentDetails(e, "")}
                          className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500
                 focus:bg-white focus:outline-none sm:w-full lg:w-72"
                          type="text"
                          placeholder=""
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="md:flex-1 lg:flex  ">
                      <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                        <label
                          className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700"
                          htmlFor="Cheque No."
                        >
                          Cheque No.
                          <p className="contents text-sm font-bold text-red-600">
                            *
                          </p>
                        </label>
                        <input
                          name="chequeDDNo"
                          id="chequeDDNo"
                          defaultValue={paymentDetail.chequeDDNo}
                          onChange={(e) => handlePaymentDetails(e, "")}
                          className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500
                        focus:bg-white focus:outline-none sm:w-full lg:w-72"
                          type="text"
                          placeholder="Cheque No."
                        />
                      </div>
                      <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                        <label
                          className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700"
                          htmlFor="password"
                        >
                          Cheque Date
                          <p className="contents text-sm font-bold text-red-600">
                            *
                          </p>
                        </label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <Stack spacing={3}>
                            <DesktopDatePicker
                              // label="Date desktop"
                              onChange={(e) =>
                                handlePaymentDetails(e, "chequeDDDate")
                              }
                              name="chequeDDDate"
                              id="chequeDDDate"
                              color="gray"
                              inputFormat="YYYY-MM-DD"
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              value={paymentDetail.chequeDDDate}
                            />
                          </Stack>
                        </LocalizationProvider>
                      </div>
                    </div>
                  </>
                ) : paymentDetail.paymentMode === "DD" ? (
                  <>
                    <nav className="navcustomproperty relative mb-2 flex flex-wrap items-center justify-between rounded-lg py-2 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
                      <h2 className="text-center text-sm font-semibold text-white">
                        Bank Details
                      </h2>
                    </nav>
                    <div className="md:flex-1 lg:flex ">
                      <div className="md:flex-1 lg:flex  ">
                        <div className="mb-4 ml-3 mt-2 flex">
                          <label
                            className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700"
                            htmlFor="password"
                          >
                            Bank Name
                            <p className="contents text-xs font-bold text-red-600">
                              *
                            </p>
                          </label>
                          <Select
                            name="bank_name"
                            defaultValue={paymentDetail.bankName}
                            onChange={(e) => handlePaymentDetails(e, "")}
                            label="select"
                            color="gray"
                            className="w-full py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
                          >
                            {paymentModeDetailsInputFromAPI?.length > 0 ? (
                              paymentModeDetailsInputFromAPI[0]?.bankNameBeans.map(
                                (item, index) => {
                                  const { id, bank_name } = item;
                                  return (
                                    <Option
                                      key={index}
                                      value={JSON.stringify(item)}
                                    >
                                      {bank_name}
                                    </Option>
                                  );
                                }
                              )
                            ) : (
                              <Option>Loading...</Option>
                            )}
                          </Select>
                        </div>
                        <div className="mb-4 ml-3 mt-2 flex">
                          <label
                            className=" mb-2   w-[11rem] text-xs font-bold text-gray-700"
                            htmlFor="Branch"
                          >
                            Branch name
                            <p className="contents text-sm font-bold text-red-600">
                              *
                            </p>
                          </label>
                          <input
                            name="branch"
                            id="branch"
                            defaultValue={paymentDetail.branch}
                            onChange={(e) => handlePaymentDetails(e, "")}
                            className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500
                       focus:bg-white focus:outline-none sm:w-full lg:w-72"
                            type="text"
                            placeholder="Branch"
                          />
                        </div>
                      </div>
                      {paymentDetail.bankName === "OTHERS" ? (
                        <div className="mb-4 ml-3 mt-2 flex">
                          <label
                            className=" mb-2   w-[11rem] text-xs font-bold text-gray-700"
                            htmlFor="Branch"
                          >
                            Please mention other bank name
                            <p className="contents text-sm font-bold text-red-600">
                              *
                            </p>
                          </label>
                          <input
                            name="othersBankName"
                            id="othersBankName"
                            defaultValue={paymentDetail.othersBankName}
                            onChange={(e) => handlePaymentDetails(e, "")}
                            className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500
                 focus:bg-white focus:outline-none sm:w-full lg:w-72"
                            type="text"
                            placeholder=""
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="md:flex-1 lg:flex  ">
                      <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                        <label
                          className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700"
                          htmlFor="Cheque No."
                        >
                          DD No.
                          <p className="contents text-sm font-bold text-red-600">
                            *
                          </p>
                        </label>
                        <input
                          name="chequeDDNo"
                          defaultValue={paymentDetail.chequeDDNo}
                          onChange={(e) => handlePaymentDetails(e, "")}
                          className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500
                       focus:bg-white focus:outline-none sm:w-full lg:w-72"
                          id="chequeDDNo"
                          type="text"
                          placeholder="Cheque No."
                        />
                      </div>
                      <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                        <label
                          className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700"
                          htmlFor="password"
                        >
                          DD Date
                          <p className="contents text-sm font-bold text-red-600">
                            *
                          </p>
                        </label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <Stack spacing={3}>
                            <DesktopDatePicker
                              // label="Date desktop"
                              onChange={(e) =>
                                handlePaymentDetails(e, "chequeDDDate")
                              }
                              name="chequeDDDate"
                              id="chequeDDDate"
                              color="gray"
                              inputFormat="YYYY-MM-DD"
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              value={paymentDetail.chequeDDDate}
                            />
                          </Stack>
                        </LocalizationProvider>
                      </div>
                    </div>
                  </>
                ) : paymentDetail.paymentMode === "NEFT" ? (
                  <>
                    <nav className="navcustomproperty relative mb-2 flex flex-wrap items-center justify-between rounded-lg py-2 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
                      <h2 className="text-center text-sm font-semibold text-white">
                        Bank Details
                      </h2>
                    </nav>
                    <div className="md:flex-1 lg:flex ">
                      <div className="md:flex-1 lg:flex  ">
                        <div className="mb-4 ml-3 mt-2 flex">
                          <label
                            className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700"
                            htmlFor="password"
                          >
                            Bank Name
                            <p className="contents text-xs font-bold text-red-600">
                              *
                            </p>
                          </label>
                          <Select
                            name="bank_name"
                            defaultValue={paymentDetail.bankName}
                            onChange={(e) => handlePaymentDetails(e, "")}
                            label="select"
                            color="gray"
                            className="w-full py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
                          >
                            {paymentModeDetailsInputFromAPI?.length > 0 ? (
                              paymentModeDetailsInputFromAPI[0]?.bankNameBeans.map(
                                (item, index) => {
                                  const { id, bank_name } = item;
                                  return (
                                    <Option
                                      key={index}
                                      value={JSON.stringify(item)}
                                    >
                                      {bank_name}
                                    </Option>
                                  );
                                }
                              )
                            ) : (
                              <Option>Loading...</Option>
                            )}
                          </Select>
                        </div>
                        <div className="mb-4 ml-3 mt-2 flex">
                          <label
                            className=" mb-2   w-[11rem] text-xs font-bold text-gray-700"
                            htmlFor="Branch"
                          >
                            Branch name
                            <p className="contents text-sm font-bold text-red-600">
                              *
                            </p>
                          </label>
                          <input
                            name="branch"
                            id="branch"
                            defaultValue={paymentDetail.branch}
                            onChange={(e) => handlePaymentDetails(e, "")}
                            className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500
                       focus:bg-white focus:outline-none sm:w-full lg:w-72"
                            type="text"
                            placeholder="Branch"
                          />
                        </div>
                      </div>
                      {paymentDetail.bankName === "OTHERS" ? (
                        <div className="mb-4 ml-3 mt-2 flex">
                          <label
                            className=" mb-2   w-[11rem] text-xs font-bold text-gray-700"
                            htmlFor="Branch"
                          >
                            Please mention other bank name
                            <p className="contents text-sm font-bold text-red-600">
                              *
                            </p>
                          </label>
                          <input
                            name="othersBankName"
                            id="othersBankName"
                            defaultValue={paymentDetail.othersBankName}
                            onChange={(e) => handlePaymentDetails(e, "")}
                            className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500
                 focus:bg-white focus:outline-none sm:w-full lg:w-72"
                            type="text"
                            placeholder=""
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="md:flex-1 lg:flex  ">
                      <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                        <label
                          className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700"
                          htmlFor="Cheque No."
                        >
                          NEFT No.
                          <p className="contents text-sm font-bold text-red-600">
                            *
                          </p>
                        </label>
                        <input
                          name="neftNo"
                          id="neftNo"
                          defaultValue={paymentDetail.neftNo}
                          onChange={(e) => handlePaymentDetails(e, "")}
                          className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500
                       focus:bg-white focus:outline-none sm:w-full lg:w-72"
                          type="text"
                          placeholder="Cheque No."
                        />
                      </div>
                      <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                        <label
                          className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700"
                          htmlFor="password"
                        >
                          NEFT Date
                          <p className="contents text-sm font-bold text-red-600">
                            *
                          </p>
                        </label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <Stack spacing={3}>
                            <DesktopDatePicker
                              // label="Date desktop"
                              onChange={(e) =>
                                handlePaymentDetails(e, "neftDate")
                              }
                              name="neftDate"
                              id="neftDate"
                              inputFormat="YYYY-MM-DD"
                              color="gray"
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              value={paymentDetail.neftDate}
                            />
                          </Stack>
                        </LocalizationProvider>
                      </div>
                    </div>
                  </>
                ) : paymentDetail.paymentMode === "RTGS" ? (
                  <>
                    <nav className="navcustomproperty relative mb-2 flex flex-wrap items-center justify-between rounded-lg py-2 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
                      <h2 className="text-center text-sm font-semibold text-white">
                        Bank Details
                      </h2>
                    </nav>
                    <div className="md:flex-1 lg:flex ">
                      <div className="md:flex-1 lg:flex  ">
                        <div className="mb-4 ml-3 mt-2 flex">
                          <label
                            className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700"
                            htmlFor="password"
                          >
                            Bank Name
                            <p className="contents text-xs font-bold text-red-600">
                              *
                            </p>
                          </label>
                          <Select
                            name="bank_name"
                            defaultValue={paymentDetail.bankName}
                            onChange={(e) => handlePaymentDetails(e, "")}
                            label="select"
                            color="gray"
                            className="w-full py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
                          >
                            {paymentModeDetailsInputFromAPI?.length > 0 ? (
                              paymentModeDetailsInputFromAPI[0]?.bankNameBeans.map(
                                (item, index) => {
                                  const { id, bank_name } = item;
                                  return (
                                    <Option
                                      key={index}
                                      value={JSON.stringify(item)}
                                    >
                                      {bank_name}
                                    </Option>
                                  );
                                }
                              )
                            ) : (
                              <Option>Loading...</Option>
                            )}
                          </Select>
                        </div>
                        <div className="mb-4 ml-3 mt-2 flex">
                          <label
                            className=" mb-2   w-[11rem] text-xs font-bold text-gray-700"
                            htmlFor="Branch"
                          >
                            Branch name
                            <p className="contents text-sm font-bold text-red-600">
                              *
                            </p>
                          </label>
                          <input
                            name="branch"
                            id="branch"
                            defaultValue={paymentDetail.branch}
                            onChange={(e) => handlePaymentDetails(e, "")}
                            className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500
                       focus:bg-white focus:outline-none sm:w-full lg:w-72"
                            type="text"
                            placeholder="Branch"
                          />
                        </div>
                      </div>
                      {paymentDetail.bankName === "OTHERS" ? (
                        <div className="mb-4 ml-3 mt-2 flex">
                          <label
                            className=" mb-2   w-[11rem] text-xs font-bold text-gray-700"
                            htmlFor="Branch"
                          >
                            Please mention other bank name
                            <p className="contents text-sm font-bold text-red-600">
                              *
                            </p>
                          </label>
                          <input
                            name="othersBankName"
                            id="othersBankName"
                            defaultValue={paymentDetail.othersBankName}
                            onChange={(e) => handlePaymentDetails(e, "")}
                            className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500
                 focus:bg-white focus:outline-none sm:w-full lg:w-72"
                            type="text"
                            placeholder=""
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="md:flex-1 lg:flex  ">
                      <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                        <label
                          className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700"
                          htmlFor="Cheque No."
                        >
                          RTGS No.
                          <p className="contents text-sm font-bold text-red-600">
                            *
                          </p>
                        </label>
                        <input
                          name="rtgsNo"
                          id="rtgsNo"
                          defaultValue={paymentDetail.rtgsNo}
                          onChange={(e) => handlePaymentDetails(e, "")}
                          className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500
                       focus:bg-white focus:outline-none sm:w-full lg:w-72"
                          type="text"
                          placeholder="Cheque No."
                        />
                      </div>
                      <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                        <label
                          className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700"
                          htmlFor="password"
                        >
                          RTGS Date
                          <p className="contents text-sm font-bold text-red-600">
                            *
                          </p>
                        </label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <Stack spacing={3}>
                            <DesktopDatePicker
                              // label="Date desktop"

                              onChange={(e) =>
                                handlePaymentDetails(e, "rtgsDate")
                              }
                              name="rtgsDate"
                              id="rtgsDate"
                              inputFormat="YYYY-MM-DD"
                              color="gray"
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              value={paymentDetail.rtgsDate}
                            />
                          </Stack>
                        </LocalizationProvider>
                      </div>
                    </div>
                  </>
                ) : paymentDetail.paymentMode === "Card" ? (
                  <>
                    <nav className="navcustomproperty relative mb-2 flex flex-wrap items-center justify-between rounded-lg py-2 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
                      <h2 className="text-center text-sm font-semibold text-white">
                        Bank Details
                      </h2>
                    </nav>
                    <div className="md:flex-1 lg:flex ">
                      <div className="md:flex-1 lg:flex  ">
                        <div className="mb-4 ml-3 mt-2 flex">
                          <label
                            className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700"
                            htmlFor="password"
                          >
                            Bank Name
                            <p className="contents text-xs font-bold text-red-600">
                              *
                            </p>
                          </label>
                          <Select
                            name="bank_name"
                            defaultValue={paymentDetail.bankName}
                            onChange={(e) => handlePaymentDetails(e, "")}
                            label="select"
                            color="gray"
                            className="w-full py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
                          >
                            {paymentModeDetailsInputFromAPI?.length > 0 ? (
                              paymentModeDetailsInputFromAPI[0]?.bankNameBeans.map(
                                (item, index) => {
                                  const { id, bank_name } = item;
                                  return (
                                    <Option
                                      key={index}
                                      value={JSON.stringify(item)}
                                    >
                                      {bank_name}
                                    </Option>
                                  );
                                }
                              )
                            ) : (
                              <Option>Loading...</Option>
                            )}
                          </Select>
                        </div>
                        <div className="mb-4 ml-3 mt-2 flex">
                          <label
                            className=" mb-2   w-[11rem] text-xs font-bold text-gray-700"
                            htmlFor="Branch"
                          >
                            Branch name
                            <p className="contents text-sm font-bold text-red-600">
                              *
                            </p>
                          </label>
                          <input
                            name="branch"
                            id="branch"
                            defaultValue={paymentDetail.branch}
                            onChange={(e) => handlePaymentDetails(e, "")}
                            className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500
                       focus:bg-white focus:outline-none sm:w-full lg:w-72"
                            type="text"
                            placeholder="Branch"
                          />
                        </div>
                      </div>
                      {paymentDetail.bankName === "OTHERS" ? (
                        <div className="mb-4 ml-3 mt-2 flex">
                          <label
                            className=" mb-2   w-[11rem] text-xs font-bold text-gray-700"
                            htmlFor="Branch"
                          >
                            Please mention other bank name
                            <p className="contents text-sm font-bold text-red-600">
                              *
                            </p>
                          </label>
                          <input
                            name="othersBankName"
                            id="othersBankName"
                            defaultValue={paymentDetail.othersBankName}
                            onChange={(e) => handlePaymentDetails(e, "")}
                            className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500
                 focus:bg-white focus:outline-none sm:w-full lg:w-72"
                            type="text"
                            placeholder=""
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <nav className="navcustomproperty relative mb-2 flex flex-wrap items-center justify-between rounded-lg py-2 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
                      <h2 className="text-center text-sm font-semibold text-white">
                        Card Details
                      </h2>
                    </nav>

                    <div className="md:flex-1 lg:flex  ">
                      <div className="mb-4 ml-3 mt-2 flex">
                        <label
                          className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700"
                          htmlFor="password"
                        >
                          Card type
                          <p className="contents text-xs font-bold text-red-600">
                            *
                          </p>
                        </label>
                        <Select
                          name="cardType"
                          defaultValue={paymentDetail.cardType}
                          onChange={(e) => handlePaymentDetails(e, "")}
                          label="Select"
                          color="gray"
                          className="w-full py-1 pl-2 pr-3 text-xs font-bold 
                                                  text-gray-900
                                                "
                        >
                          <Option value="cardType_credit">credit</Option>
                          <Option value="cardType_debit">debit</Option>
                        </Select>
                      </div>
                      <div className="mb-4 ml-3 mt-2 flex">
                        <label
                          className=" mb-2   w-[11rem] text-xs font-bold text-gray-700"
                          htmlFor="Branch"
                        >
                          Transaction id
                          <p className="contents text-sm font-bold text-red-600">
                            *
                          </p>
                        </label>
                        <input
                          name="transactionId"
                          id="transactionId"
                          defaultValue={paymentDetail.transactionId}
                          onChange={(e) => handlePaymentDetails(e, "")}
                          className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500
                       focus:bg-white focus:outline-none sm:w-full lg:w-72"
                          type="text"
                          placeholder="Branch"
                        />
                      </div>
                    </div>

                    <div className="md:flex-1 lg:flex  ">
                      <div className="mb-4 ml-3 mt-2 flex">
                        <label
                          className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700"
                          htmlFor="password"
                        >
                          APPR Code
                          <p className="contents text-xs font-bold text-red-600">
                            *
                          </p>
                        </label>
                        <input
                          name="apprCode"
                          id="apprCode"
                          defaultValue={paymentDetail.apprCode}
                          onChange={(e) => handlePaymentDetails(e, "")}
                          className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500
                       focus:bg-white focus:outline-none sm:w-full lg:w-72"
                          type="text"
                          placeholder="Branch"
                        />
                      </div>
                      <div className="mb-4 ml-3 mt-2 flex">
                        <label
                          className=" mb-2   w-[11rem] text-xs font-bold text-gray-700"
                          htmlFor="Branch"
                        >
                          Card No.(Last 4 Digits)
                          <p className="contents text-sm font-bold text-red-600">
                            *
                          </p>
                        </label>
                        <input
                          name="cardNo"
                          id="cardNo"
                          defaultValue={paymentDetail.cardNo}
                          onChange={(e) => handlePaymentDetails(e, "")}
                          className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500
                       focus:bg-white focus:outline-none sm:w-full lg:w-72"
                          type="text"
                          placeholder="Branch"
                        />
                      </div>
                    </div>

                    <div className="md:flex-1 lg:flex  ">
                      <div className="mb-4 ml-3 mt-2 flex">
                        <label
                          className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700"
                          htmlFor="password"
                        >
                          Card Holder Name
                          <p className="contents text-xs font-bold text-red-600">
                            *
                          </p>
                        </label>
                        <input
                          name="cardHolderName"
                          id="cardHolderName"
                          defaultValue={paymentDetail.cardHolderName}
                          onChange={(e) => handlePaymentDetails(e, "")}
                          className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500
                       focus:bg-white focus:outline-none sm:w-full lg:w-72"
                          type="text"
                          placeholder="Branch"
                        />
                      </div>
                    </div>
                  </>
                ) : null}

                <button
                  type="submit"
                  className={`mx-4 mb-2 h-8  transform rounded-md bg-green-900 px-4 py-1 tracking-wide 
                                text-white transition-colors duration-200 hover:bg-green-900 focus:bg-green-400
                                 focus:outline-none
                                 ${
                                   paynow
                                     ? `cursor-not-allowed `
                                     : `cursor-pointer`
                                 }
                                 `}
                  disabled={paynow}
                  onClick={(e) => paymentOptionsHandler(e)}
                >
                  Pay now
                </button>
              </div>
            ) : null}

            <div className="my-12 flex items-center justify-center">
              <button
                type="submit"
                className={`mx-4 mb-2 h-8  transform rounded-md bg-blue-900 px-4 py-1 tracking-wide 
                text-white transition-colors duration-200 hover:bg-blue-900 focus:bg-blue-400
                 focus:outline-none 
                 ${
                   isGenerateDisabled
                     ? `cursor-not-allowed`
                     : `cursor-pointer  `
                 }
                 `}
                onClick={(e) => generateDemandHandler(e)}
                disabled={isGenerateDisabled}
              >
                Generate Demand
              </button>

              {/* {
                  consumerDetails.consumerUnitRateDetails?.length > 0 ?
                } */}
              <button
                type="submit"
                className={`mx-4 mb-2 h-8  transform rounded-md bg-blue-900 px-4 py-1 tracking-wide 
                                text-white transition-colors duration-200 hover:bg-blue-900 focus:bg-blue-400
                                 focus:outline-none  
                                 ${
                                   consumerDetails?.consumerUnitRateDetails
                                     ?.length > 0 ||
                                   consumerDetails?.consumerUnitRateDetails !==
                                     null
                                     ? `cursor-pointer  `
                                     : `cursor-not-allowed`
                                 }
                                 `}
                //  disabled={consumerDetails?.consumerUnitRateDetails.length}
                onClick={payWaterTaxHandler}
              >
                View And Pay Demand
              </button>
              <button
                type="submit"
                className=" mx-4 mb-2 h-8  transform rounded-md bg-blue-900 px-4 py-1 tracking-wide 
                                text-white transition-colors duration-200 hover:bg-blue-900 focus:bg-blue-400
                                 focus:outline-none"
                onClick={(e) =>
                  viewPaymentDetailsHandler(e, `${consumerDetails?.consumerNo}`)
                }
              >
                View Payment Details
              </button>

              <button
                type="submit"
                className={`mx-4 mb-2 h-8  transform rounded-md bg-blue-900 px-4 py-1 tracking-wide 
                text-white transition-colors duration-200 hover:bg-blue-900 focus:bg-blue-400
                 focus:outline-none 
                 ${
                   isGenerateDisabled
                     ? `cursor-not-allowed`
                     : `cursor-pointer  `
                 }
                 `}
                onClick={printDemandHandler}
                disabled={isGenerateDisabled}
              >
                Print Demand
              </button>

              {/* <button type='submit'
                className="h-8 px-4 py-1  mx-4 mb-2 tracking-wide text-white transition-colors duration-200 
                transform bg-blue-900 rounded-md hover:bg-blue-900 focus:outline-none
                 focus:bg-blue-400 cursor-pointer"  
                
                 onClick={printDemandHandler}>
                Print Demand 
                </button>  */}
            </div>
          </div>
          {generatedemandLoader ? (
            <div className="mx-auto h-16 w-16">
              <ColorRing
                visible={true}
                height="40"
                width="40"
                colors={["#FF0000", "#FF0000", "#FF0000", "#FF0000", "#FF0000"]}
              />
            </div>
          ) : null}
          {paynowLoader ? (
            <div className="mx-auto h-16 w-16">
              <ColorRing
                visible={true}
                height="40"
                width="40"
                colors={["#FF0000", "#FF0000", "#FF0000", "#FF0000", "#FF0000"]}
              />
            </div>
          ) : null}
          {paymentLoader ? (
            <div className="mx-auto h-16 w-16">
              <ColorRing
                visible={true}
                height="40"
                width="40"
                colors={["#FF0000", "#FF0000", "#FF0000", "#FF0000", "#FF0000"]}
              />
            </div>
          ) : null}
        </>
      ) : null}
      {displayPrintDemandForm ? ( 
        displayHindiForm ? (
          <PaymentReceiptViewPaymentDetailsInHindi
            setDisplayHindiForm={setDisplayHindiForm}
            consumerDetails={consumerDetails}
            consumerPaymentDetails={consumerPaymentDetails}
            setDisplayConsumerPaymentDetail={setDisplayConsumerPaymentDetail}
            val={val}
            setDisplayPrintDemandForm={setDisplayPrintDemandForm}
          />
        ) : (
          <PaymentReceiptViewPaymentDetails
            setDisplayHindiForm={setDisplayHindiForm}
            consumerDetails={consumerDetails}
            consumerPaymentDetails={consumerPaymentDetails}
            setDisplayConsumerPaymentDetail={setDisplayConsumerPaymentDetail}
            setDisplayPrintDemandForm={setDisplayPrintDemandForm}
            val={val}
          />
        )
      ) : null}

      {displayPrintReceipt ? (
        displayHindiPrintForm ? (
          <PrintReceiptViewPaymentDetailsInHindi
            setDisplayPrintReceipt={setDisplayPrintReceipt}
            setDisplayHindiPrintForm={setDisplayHindiPrintForm}
            setDisplayDetails={setDisplayDetails}
            setDisplayPrintDemandForm={setDisplayPrintDemandForm}
            //unitRate={consumerDetails?.consumerUnitRateDetails[0]?.unitRate}
            consumerPaymentDetails={consumerPaymentDetails}
            consumerDetails={consumerDetails}
            totalPayableAmount={consumerDetails?.totalPayableAmount}
          />
        ) : (
          <PrintReceiptViewPaymentDetails
            setDisplayPrintReceipt={setDisplayPrintReceipt}
            setDisplayHindiPrintForm={setDisplayHindiPrintForm}
            //unitRate={consumerDetails?.consumerUnitRateDetails[0]?.unitRate}
            consumerPaymentDetails={consumerPaymentDetails}
            setDisplayDetails={setDisplayDetails}
            setDisplayPrintDemandForm={setDisplayPrintDemandForm}
            consumerDetails={consumerDetails}
            totalPayableAmount={consumerDetails?.totalPayableAmount}
          />
        )
      ) : null}

      {displayConsumerPaymentDetail ? (
        <>
          <div className="m-4 rounded-none border border-gray-500 bg-white px-0  pb-0 pt-0 lg:max-w-full">
            <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-lg py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
              <h2 className="text-center text-sm font-semibold text-white">
                Consumer Details
              </h2>
            </nav>
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block p-2.5 align-middle lg:w-full">
                  <div className="overflow-hidden">
                    {!consumerDetails?.length > 0 ? (
                      <table className="min-w-full">
                        <thead className="bg-gray-50"></thead>

                        <tbody>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                              Consumer No
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {consumerDetails?.consumerNo}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {/* {propertyDetails[0].ward_id ? propertyDetails[0].ConsumerNo : 'N/A'} */}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                              Old Consumer No(if any)
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {consumerDetails?.oldConsumerNo}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {/* {propertyDetails[0].entry_type ? propertyDetails[0].entry_type : 'N/A'} */}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Consumer Name
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {consumerDetails?.consumerName}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {/* {propertyDetails[0].property_no ? propertyDetails[0].property_no : 'N/A' } */}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Mobile No.
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900 ">
                              {consumerDetails?.mobileNo}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {/* {propertyDetails[0].consumer_no ? propertyDetails[0].consumer_no : 'N/A' } */}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Relation
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                              {consumerDetails?.relation}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                              {/* {propertyDetails[0].property_type_name ? propertyDetails[0].property_type_name : "N/A"} */}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Gaurdian Name
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {consumerDetails?.guardianName}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                              {/* {propertyDetails[0].uses_type_name ? propertyDetails[0].uses_type_name : 'N/A'} */}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Ward No
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {consumerDetails?.wardNo}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                              {/* {propertyDetails[0].totalbuilbup_area ? propertyDetails[0].totalbuilbup_area : 'N/A'} */}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900"></td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900"></td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900"></td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Property Type
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                              {consumerDetails?.propertyType}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {/* {propertyDetails[0].property_address ? propertyDetails[0].property_address : 'N/A'} */}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Holding No
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                              {consumerDetails?.propertyNo}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {/* {propertyDetails[0].mohalla ? propertyDetails[0].mohalla : 'N/A'} */}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Property Address
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900 ">
                              {consumerDetails?.propertyAddress}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {/* {propertyDetails[0].fy_name ? propertyDetails[0].fy_name : 'N/A'} */}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              No of connection/room
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {consumerDetails?.noOfConnection}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {/* {propertyDetails[0].building_name ? propertyDetails[0].building_name : 'N/A'} */}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-center text-sm font-semibold text-red-700">
                        {/* {propDetailsErr.errMsg} */}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="m-4 rounded-none border border-gray-500 bg-white px-0  pb-0 pt-0 lg:max-w-full">
            <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
              <h2 className="text-center text-sm font-semibold text-white">
                Consumer Connection Details
              </h2>
            </nav>
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block p-2.5 align-middle lg:w-full">
                  <div className="overflow-hidden">
                    {!consumerDetails?.length > 0 ? (
                      <table className="min-w-full">
                        <thead className="bg-gray-50"></thead>
                        <tbody>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                              Property Type
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {consumerDetails?.propertyType}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {/* {propertyDetails[0].ward_id ? propertyDetails[0].ConsumerNo : 'N/A'} */}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                              Initial Meter Reading
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {consumerDetails?.initialMeterReading}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {/* {propertyDetails[0].entry_type ? propertyDetails[0].entry_type : 'N/A'} */}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Connection Type
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {consumerDetails?.connectionType}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {/* {propertyDetails[0].property_no ? propertyDetails[0].property_no : 'N/A' } */}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              No of Connection/Room
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900 ">
                              {consumerDetails?.noOfConnection}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                              {/* {propertyDetails[0].consumer_no ? propertyDetails[0].consumer_no : 'N/A' } */}
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Meter No
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                              {consumerDetails?.meterNo || "NA"}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                              {/* {propertyDetails[0].property_type_name ? propertyDetails[0].property_type_name : "N/A"} */}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold  text-gray-900">
                              Effect of Connection
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs  text-gray-900">
                              {consumerDetails?.propertyType}
                            </td>
                            <td className="whitespace-normal px-4 py-2 text-xs text-gray-900 ">
                              {/* {propertyDetails[0].uses_type_name ? propertyDetails[0].uses_type_name : 'N/A'} */}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-center text-sm font-semibold text-red-700">
                        {/* {propDetailsErr.errMsg} */}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="m-4 mb-2 rounded-none border border-gray-500 bg-white  px-0 py-6 pb-0  
     pt-0 lg:max-w-full"
          >
            <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
              <h2 className="text-center text-sm font-semibold text-white">
                Consumer Payment Details
              </h2>
            </nav>
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block p-2.5 align-middle lg:w-full">
                  <div className="overflow-hidden">
                    <table className="min-w-full py-6">
                      <thead className="bg-gray-50"></thead>
                      <tbody>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                            Sl No
                          </td>
                          <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                            Trans Date
                          </td>
                          <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                            Receipt No
                          </td>
                          <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                            Mode
                          </td>
                          <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                            Demand
                          </td>
                          <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                            Penalty
                          </td>
                          <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                            Payable Amount
                          </td>

                          <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                            Payment Receipt
                          </td>
                        </tr>
                        {consumerPaymentDetails?.length > 0 ? (
                          consumerPaymentDetails.map(
                            (consumerPaymentDetails, index) => {
                              const {
                                transactionDate,
                                receiptNo,
                                paymentMode,
                                demand,
                                penalty,
                                payableAmount,
                              } = consumerPaymentDetails;
                              //setVal(consumerPaymentDetails)
                              let rec = index;
                              return (
                                <tr
                                  className="hover:bg-gray-50 dark:hover:bg-gray-600"
                                  key={index}
                                  ref={inputElement}
                                >
                                  <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                                    {index + 1}
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs font-medium font-semibold text-gray-900">
                                    <span>{transactionDate}</span>
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                                    {receiptNo}
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                                    {paymentMode}
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                                    {demand}
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                                    {penalty}
                                  </td>
                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                                    {payableAmount}
                                  </td>

                                  <td className="whitespace-normal px-4 py-2 text-xs text-gray-900">
                                    <button
                                      type="button"
                                      color="green"
                                      className="custom_button_add h-6 w-16 rounded
                         bg-blue-400 px-2 py-1"
                                      data-test-id={`${index}`}
                                      onClick={(e, rec) =>
                                        consumerPaymentDetailsPaymentReceipt(
                                          e,
                                          rec
                                        )
                                      }
                                    >
                                      View
                                    </button>
                                  </td>
                                </tr>
                              );
                            }
                          )
                        ) : (
                          <p className="text-center text-sm font-semibold text-red-700">
                            {/* {propDetailsErr.errMsg} */}
                            No records found
                          </p>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="mb-12 ml-4 mr-2 rounded-md bg-red-500 px-4
        py-1 text-center text-sm font-semibold text-white"
            onClick={backHandler}
          >
            Back
          </button>
        </>
      ) : null}
    </>
  );
};

export default MainPageUpdateBasicDetails;
