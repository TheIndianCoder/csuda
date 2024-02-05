import React from "react";
import {
  Select,
  Option,
  Button,
  Textarea,
  Checkbox,
  Tooltip,
  Switch,
} from "@material-tailwind/react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import { CirclesWithBar, ColorRing } from "react-loader-spinner";
import { useMaterialTailwindController } from "@/Dashboard/context";
import { convertDateToAPIFormat, convertDateFormat } from "@/utils/commonUtils";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  ColorRingCustom,
  ExportToExcel,
  NotFoundErrorMessageCustom,
} from "@/utils/commonComponents";
import "react-toastify/dist/ReactToastify.css";
import { getCookieByName } from "@/utils/RequireAuth";

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL;

const MainPageUserChargesWasteCounterCollectionReport = () => {
  const counterCollectionReports = {
    date_from: "",
    date_to: "",
    user_id: "",
    ward_id: "",
    payment_mode: "",
    payment_modeId: "",
  };
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
  const [counterCollectionReport, setcounterCollectionReport] = useState(
    counterCollectionReports
  );
  const [wardId, setWardId] = useState("");
  const [operatorName, setoperatorName] = useState("");
  const [payment_mode, setpayment_mode] = useState("");
  const [counterCollectionReportObj, setCounterCollectionReportObj] =
    useState(null);
  const [loader, setLoader] = useState(false);
  const [controller, dispatch] = useMaterialTailwindController();
  const [totalCollectionAmount, setTotalCollectionAmount] = useState("");
  const [totalBounce, settotalBounce] = useState("");
  const [netCollection, setnetCollection] = useState("");
  const [dataForExport, setDataForExport] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const modeOfPayment = [
    {
      id: 0,
      mode_of_payment: "All",
      status: 1,
    },
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
  const { allUserDetailsInputFromAPI, safAllInputFromAPI } = controller;
  const handleCounterCollectionReport = (e, id) => {
    console.log("hi");
    const eventStr = e + "";
    if (e.toString().includes("ward_name")) {
      const propertyTypeItem = JSON.parse(e);
      const pN = parseInt(propertyTypeItem.id);
      setcounterCollectionReport((prevState) => {
        let eventObj = JSON.parse(e);
        return { ...prevState, ward_id: pN };
      });
    } else if (eventStr.includes("user")) {
      setcounterCollectionReport((prevState) => {
        let eventObj = JSON.parse(e);
        return { ...prevState, user_id: eventObj.user_id };
      });
    } else if (e.toString().includes("payment_mode")) {
      const propertyTypeItem = JSON.parse(e);
      const pN = parseInt(propertyTypeItem.id);
      setpayment_mode(pN);
    } else if (id.includes("date_from")) {
      setcounterCollectionReport((prevState) => {
        return { ...prevState, date_from: convertDateToAPIFormat(e.$d) };
      });
    } else if (id.includes("date_to")) {
      setcounterCollectionReport((prevState) => {
        return { ...prevState, date_to: convertDateToAPIFormat(e.$d) };
      });
    } else if (e.toString().includes("mode_of_payment")) {
      let connItem = JSON.parse(e);
      // console.log(wardItem)
      setcounterCollectionReport((prevState) => {
        return {
          ...prevState,
          payment_mode: connItem.mode_of_payment,
          payment_modeId: connItem.id,
        };
      });
    } else {
      setcounterCollectionReport({
        ...counterCollectionReport, // spreading the unchanged values
        [e.target.name]: e.target.value, // changing the state of *changed value*
      });
    }
  };

  let handlePrintToPDF = () => {
    let printwin = window.open("");
    printwin.document.write(document.getElementById("print_section").innerHTML);
    copyStyles(window.document, printwin.document);
    printwin.print();
  };

  const copyStyles = (src, dest) => {
    // console.log("at the start of copying stylesheets")
    Array.from(src.styleSheets).forEach((styleSheet) => {
      // console.log("copying stylesheets")
      // console.log(styleSheet.ownerNode)
      dest.head.appendChild(styleSheet.ownerNode.cloneNode(true));
    });
    Array.from(src.fonts).forEach((font) => dest.fonts.add(font));
  };
  useEffect(() => {
    console.log(counterCollectionReportObj);
  }, [counterCollectionReportObj]);

  const handleSearch = async () => {
    setLoader(true);
    try {
      console.log("searchQueryObj==========");
      //   console.log(searchQueryObj)
      let {
        date_from,
        date_to,
        user_id,
        ward_id,
        payment_mode,
        payment_modeId,
      } = counterCollectionReport;
      //   if(user_id === '')
      //   user_id = 0
      //   if(ward_id === '')
      //   ward_id = 0
      //   if(payment_mode === '')
      //   payment_mode = 0
      const url = `${SUDA_API_BASE_URL}/user/userChargeCounterReport/${date_from}/${date_to}/${ward_id}/${user_id}/${payment_mode}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
      };
      let response = null,
        responseBody = null;
      response = await fetch(url, requestOptions);
      responseBody = await response.json();
      console.log(response, responseBody);
      if (response?.status == "200" && !responseBody?.errors) {
        console.log("responseBody =============");
        console.log(responseBody);
        setCounterCollectionReportObj(responseBody?.collectionsBody);
        setnetCollection(responseBody?.netCollection);
        setTotalCollectionAmount(responseBody?.totalCollection);
        settotalBounce(responseBody?.totalBounce);
        setLoader(false);
      } else if (response?.status == "200" && responseBody?.errors) {
        toast.error(responseBody.errors.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setCounterCollectionReportObj(null);
        setLoader(false);
      } else {
        toast.error("Please try again", {
          position: toast.POSITION.TOP_CENTER,
        });
        setCounterCollectionReportObj(null);
        setLoader(false);
      }
    } catch (err) {
      console.error(err);
      toast.error(err, {
        position: toast.POSITION.TOP_CENTER,
      });
      setCounterCollectionReportObj(null);
      setLoader(false);
    } finally {
      setLoader(false);
    }
    setLoader(false);
    // setcounterCollectionReport(prevState => {
    //   return{
    //     ...prevState,
    //     date_from: '',
    //     date_to:'',
    //     user_id: '',
    //     ward_id: '',
    //     payment_mode: '',
    //     payment_modeId: ''
    //   }
    // })
  };

  //   useEffect(()=>{

  //    if((counterCollectionReport?.date_from !=='' && counterCollectionReport?.date_to !==''
  //     && counterCollectionReport?.payment_mode !==''))
  //    {
  //     setDisabled(false)
  //    }
  //    else{
  //     setDisabled(true)
  //    }
  //   },[counterCollectionReport.date_from, counterCollectionReport.date_to, counterCollectionReport.payment_mode])

  useEffect(() => {
    if (
      counterCollectionReport?.date_from !== "" &&
      counterCollectionReport?.date_to !== "" &&
      counterCollectionReport?.user_id !== "" &&
      counterCollectionReport?.ward_id !== "" &&
      counterCollectionReport?.payment_mode !== ""
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    counterCollectionReport.date_from,
    counterCollectionReport.date_to,
    counterCollectionReport.payment_mode,
    counterCollectionReport.user_id,
    counterCollectionReport.ward_id,
  ]);

  useEffect(() => {
    if (counterCollectionReportObj?.length > 0) {
      // let totalCollectionVal = 0
      // counterCollectionReportObj.forEach(item => {
      //   totalCollectionVal += parseFloat(item.tot_amount)
      // })
      // setTotalCollectionAmount(totalCollectionVal)

      let dataForExportToExcel = counterCollectionReportObj.map(
        (item, index) => {
          return {
            "Sl No.": index + 1,
            "Consumer No.": item.consumer_no,
            "Consumer Name.": item.consumer_name,
            "Ward No.": item.ward_no,
            Amount: item.amount,
            "From Month": item.frm_month,
            "To Month": item.to_month,
            "Mobile No.": item.mobile,
            "Holding No": item.holding_no,
            "Upto Month": item.upToMonth,
            "Transaction Date": item.transaction_date,
            "Transaction Number": item.transaction_no,
            "Mode Of Payment": item.payment_mode,
            "Cheque Date.": item.cheque_date,
            "Cheque/DD No.": item.cheque_no,
            "Bank Name": item.bankName,
            "Branch Name": item.branch_name,
            "Branch Name": item.branch_name,
            "TC Name": item.tax_collector,
          };
        }
      );
      setDataForExport(dataForExportToExcel);
    }
  }, [counterCollectionReportObj]);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="m-4 mt-4 rounded-none border border-gray-500 bg-white px-0 pb-4 pt-0 lg:max-w-full">
        <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
          <h2 className="text-center text-sm font-semibold text-white">
            Water Counter Report
          </h2>
        </nav>
        <form>
          <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex">
            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
              <label
                className="mb-2 block text-xs font-bold text-gray-700"
                htmlFor="password"
              >
                Date From
                <p className="contents text-sm font-bold text-red-600">*</p>
              </label>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    // label="Date desktop"
                    onChange={(e) =>
                      handleCounterCollectionReport(e, "date_from")
                    }
                    id="date_from"
                    name="date_from"
                    inputFormat="YYYY-MM-DD"
                    renderInput={(params) => <TextField {...params} />}
                    disableFuture={true}
                    value={counterCollectionReport?.date_from}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
              <label
                className="mb-2 block text-xs font-bold text-gray-700"
                htmlFor="password"
              >
                Date To
                <p className="contents text-sm font-bold text-red-600">*</p>
              </label>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    // label="Date desktop"
                    onChange={(e) =>
                      handleCounterCollectionReport(e, "date_to")
                    }
                    id="date_to"
                    name="date_to"
                    inputFormat="YYYY-MM-DD"
                    renderInput={(params) => <TextField {...params} />}
                    disableFuture={true}
                    value={counterCollectionReport?.date_to}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
          </div>
          <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex">
            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
              <label
                className="mb-2 block text-xs font-bold text-gray-700"
                htmlFor="password"
              >
                Ward No.
                {/* <p className='contents text-red-600 text-xs font-bold'>*</p> */}
              </label>
              <Select
                onChange={(e) => handleCounterCollectionReport(e, "")}
                name="wardNo"
                //  defaultValue={consumerDetail.wardNo}
                defaultValue={wardId}
                label="select"
                className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900
                        "
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
            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
              <label
                className="mb-2 block text-xs font-bold text-gray-700"
                htmlFor="password"
              >
                Operator Name
                {/* <p className='contents text-red-600 text-xs font-bold'>*</p> */}
              </label>
              <Select
                onChange={(e) => handleCounterCollectionReport(e, "")}
                name="operatorName"
                //  defaultValue={consumerDetail.wardNo}
                defaultValue={operatorName}
                label="select"
                className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900
                        "
              >
                {allUserDetailsInputFromAPI?.length > 0 ? (
                  allUserDetailsInputFromAPI.map((item) => {
                    const {
                      id,
                      user_id,
                      employee_name,
                      user_name,
                      designation,
                      is_active,
                    } = item;
                    return (
                      <Option
                        key={id}
                        value={JSON.stringify(item)}
                      >{`${employee_name} - ${user_name} - ${designation}`}</Option>
                    );
                  })
                ) : (
                  <Option>Loading...</Option>
                )}
              </Select>
            </div>
          </div>
          <div className="min-w-fit max-w-fit items-end md:flex-1 lg:flex">
            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
              <label
                className="mb-2 block text-xs font-bold text-gray-700"
                htmlFor="password"
              >
                Payment Mode
                <p className="contents text-sm font-bold text-red-600">*</p>
              </label>

              <Select
                onChange={(e) => handleCounterCollectionReport(e, "")}
                name="payment_mode"
                //  defaultValue={consumerDetail.wardNo}
                defaultValue={payment_mode}
                label="select"
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
            </div>
            <div className="mb-0 ml-2 mr-0 mt-8 min-w-fit max-w-fit">
              <button
                type="button"
                onClick={handleSearch}
                className={`mb-4 ml-2 mr-2 h-8 w-28 px-4 py-1 tracking-wide
                    ${disabled ? `cursor-not-allowed ` : `cursor-pointer`}
                     transform rounded-md bg-green-400 text-xs font-bold 
                     text-white transition-colors duration-200 hover:bg-green-700 
                     focus:bg-green-400 focus:outline-none`}
                disabled={disabled}
              >
                Search
              </button>
            </div>
          </div>
          {loader ? (
            <div className="m-auto h-16 w-16">
              <ColorRing
                visible={true}
                height="40"
                width="40"
                colors={["#2fa158", "#2fa158", "#2fa158", "#2fa158", "#2fa158"]}
              />
            </div>
          ) : null}
        </form>

        {counterCollectionReportObj?.length > 0 ? (
          <>
            <section id="print_section" className="bg-white  py-0">
              <div className="m-4 rounded-none border border-gray-500 bg-white px-0  pb-0 pt-0 lg:max-w-full">
                <div className="flex flex-col">
                  <div className="overflow-x-auto">
                    <div className="inline-block p-2.5 align-middle lg:w-full">
                      <div className="overflow-hidden">
                        <table className="min-w-full">
                          <thead className="bg-gray-50"></thead>
                          <tbody>
                            <tr className="">
                              <td className="whitespace-normal px-4 py-2 text-center  text-sm font-semibold text-blue-900">
                                BHILAI MUNICIPAL CORPORATION
                              </td>
                            </tr>
                            <tr className="">
                              <td className="whitespace-normal px-4 py-2 text-center text-sm font-bold font-semibold text-gray-900">
                                (Solid Waste User Charge)
                              </td>
                            </tr>
                            <tr className="">
                              <td className="whitespace-normal px-4 py-2 text-center text-sm font-bold font-semibold text-green-700">
                                Counter Collection Report from{" "}
                                {`${counterCollectionReport?.date_from + ""}`}{" "}
                                to {counterCollectionReport?.date_to}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="flex justify-evenly">
                          <p>
                            Total Collection :{" "}
                            {totalCollectionAmount != null
                              ? totalCollectionAmount
                              : "N/A"}
                          </p>
                          <p>
                            Total Bounce :{" "}
                            {totalBounce != null ? totalBounce : "N/A"}
                          </p>
                          <p>
                            Net Collection :{" "}
                            {netCollection != null ? netCollection : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="m-4 rounded-none bg-white px-0 pb-0 pt-0 lg:max-w-full">
                <div className="mb-1 flex flex-col">
                  <div className="overflow-x-auto">
                    <div className="3xl:w-full inline-block p-0 align-middle">
                      <div className="overflow-hidden">
                        <table className="min-w-full">
                          <thead className="preview-payment-form-child-table-laypout">
                            <tr>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Sl. No.
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Consumer. No.
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Consumer. Name.
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Ward No.
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Amount.
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                From month
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                To month
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Mob No.
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Holding No
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                UpTo Month
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Trans. date
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Trans. No
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Mode
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Cheque Date
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Cheque/DD No
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Bank Name
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Branch Name
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Amount
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                TC Name
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {counterCollectionReportObj?.map((item, index) => {
                              return (
                                <tr key={index} className="">
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {index + 1}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                    {item?.consumer_no}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                    {item?.consumer_name}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.ward_no}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.amount}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.frm_month}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.to_month}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.mobile}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.holding_no}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                    {item?.upToMonth}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.transaction_date}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.transaction_no}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.payment_mode != null
                                      ? item?.payment_mode
                                      : "N/A"}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.cheque_date != null
                                      ? item?.cheque_date
                                      : "N/A"}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.cheque_no != null
                                      ? item?.cheque_no
                                      : "N/A"}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                    {item?.bankName != null
                                      ? item?.bankName
                                      : "N/A"}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                    {item?.branch_name != null
                                      ? item?.branch_name
                                      : "N/A"}
                                  </td>
                                  <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                    {item?.tax_collector != null
                                      ? item?.tax_collector
                                      : "N/A"}
                                  </td>
                                  {/* <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                            {item?.tot_amount}
                                          </td> */}
                                  {/* <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                            {item?.property_tax}
                                          </td>
                                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                            {item?.aproperty_tax}
                                          </td>
                                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300 uppercase">
                                            {item?.composite_tax}
                                          </td>
                                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                            {item?.acomposite_tax}
                                          </td>
                                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                            {item?.education_cess}
                                          </td>
                                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                            {item?.aeducation_cess}
                                          </td>
                                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                            Dummy
                                          </td>
                                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300 uppercase">
                                            Dummy
                                          </td>
                                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                            {item?.penalty}
                                          </td>
                                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                            {item?.penal_charge}
                                          </td>
                                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                            {item?.rain_harvest_charge}
                                          </td>
                                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                            {item?.form_fee}
                                          </td>
                                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300 uppercase">
                                            {item?.discount}
                                          </td>
                                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                            {item?.adv_adjust}
                                          </td>
                                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                            {item?.tot_amount}
                                          </td>
                                          <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                            {item?.tax_collector}
                                          </td> */}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="m-auto min-w-fit max-w-fit items-center md:flex-1 lg:flex">
              <div className="mb-0 ml-2 mr-0 mt-8 min-w-fit max-w-fit">
                <button
                  type="button"
                  className="mb-4 ml-2 mr-2 h-8 w-28 transform rounded-md bg-green-400 px-4 py-1 text-sm font-bold tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 focus:outline-none"
                  onClick={handlePrintToPDF}
                >
                  Print
                </button>
              </div>
              <ExportToExcel
                excelData={dataForExport}
                filaName={`CounterCollectionReport-From-${counterCollectionReport?.date_from}-To-${counterCollectionReport?.date_to}`}
                btnText={`Export to Excel`}
              />
            </div>
          </>
        ) : counterCollectionReportObj?.length === 0 ? (
          <>
            <p className="whitespace-normal px-4 py-2 text-center  text-sm font-semibold text-blue-900">
              No results found
            </p>
          </>
        ) : null}
      </div>
      {/* </div>
    </div> */}
    </>
  );
};

export default MainPageUserChargesWasteCounterCollectionReport;
