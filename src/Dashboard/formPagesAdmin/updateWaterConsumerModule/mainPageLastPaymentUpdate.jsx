import React, { Component, useEffect, useState, useRef, useMemo } from "react";
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
import { useMaterialTailwindController } from "@/Dashboard/context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  SwapStringPlaces,
  convertDateToAPIFormat,
  convertDateToGenericSlashFormat,
} from "@/utils/commonUtils";
import {
  consumerUnitRateDetails,
  lastPaymentDetails,
  wardData,
} from "../utils/common";
import { tableData } from "../utils/tableData";
import Table from "../utils/Table";
import DetailContainer from "../utils/DetailContainer";
import Pagination from "@/Components/Pagination";
const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL;

const MainPageLastPaymentUpdate = () => {
  const searchConsumerDetails = {
    ward_id: "",
    propertyNo: "",
    ConsumerNo: "",
    MobileNUmber: "",
    name: "",
  };

  // const details = [
  //     {
  //     Consumerno : "PC00GYF78787",
  //     },
  //     ]

  //     const detailLists = ["Consumerno", "Holdingno"]

  const details = [
    {
      consumerno: "PC00GYF78787",
      consumername: "Namrata Das",
      oldconsumerno: "Old Consumer no",
      mobileno: "9101043391",
      gaurdianname: "Guardian name",
      wardno: "Ward no",
      holdingno: "Holding no",
      propertytype: "Property type",
      propertyaddress: "Property address",
    },
  ];

  const detailLists = [
    { field: "consumerno", header: "Consumer no" },
    { field: "consumername", header: "Consumer name" },
    { field: "oldconsumerno", header: "Old Consumer No" },
    { field: "mobileno", header: "Mobile no" },
    { field: "gaurdianname", header: "Guardian name" },
    { field: "wardno", header: "Ward no" },
    { field: "holdingno", header: "Holding no" },
    { field: "propertytype", header: "Property type" },
    { field: "propertyaddress", header: "Property address" },
  ];

  const columns = [
    { field: "id", header: "#" },
    { field: "wardNo", header: "Ward No" },
    { field: "name", header: "Consumer Name" },
    { field: "address", header: "Address" },
    { field: "mobileNo", header: "Mobile No" },
    { field: "consumerNo", header: "Consumer No" },
    { field: "propertyNo", header: "Property No" },
    { field: "view", header: "Action" },
  ];

  const consumerConnectionColumns = [
    { field: "propertyType", header: "Property Type" },
    { field: "connnectionType", header: "Connnection Type" },
    { field: "meterno", header: "Meter No" },
    { field: "Initialmeterreading", header: "Initial Meter Reading" },
    { field: "noofconn", header: "No of Connection" },
    { field: "effectofconn", header: "Effect of Connection" },
  ];

  const consumerUnitRateColumns = [
    { field: "unitrate", header: "Unit Rate" },
    { field: "extracharge", header: "Extra Charge" },
    { field: "dateOfEffect", header: "Date of Effect" },
    { field: "status", header: "Status" },
  ];

  const lastPaymentDetailColumns = [
    { field: "slno", header: "Sl No" },
    { field: "demandfrom", header: "Demand From" },
    { field: "demandupto", header: "Demand Upto" },
    { field: "amount", header: "Amount" },
  ];
  const [searchConsumerDetail, setSearchConsumerDetail] = useState(
    searchConsumerDetails
  );
  const [searchConsumerDetailResult, setSearchConsumerDetailResult] = useState(
    []
  );
  const [eachConsumerPersonalDetails, setEachConsumerPersonalDetails] =
    useState([]);
  const [consumerConnectionDetails, setConsumerConnectionDetails] = useState(
    []
  );

  const [consumerDemandDates, setConsumerDemandDates] = useState([]);
  const [consumerUnitRateDetails, setConsumerUnitRateDetails] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [loader, setLoader] = useState(false);
  const [personalDetailsLoader, setPersonalDetailsLoader] = useState(false);
  const [demandTableLoader, setDemandTableLoader] = useState(false);
  const [displayTable, setDisplayTable] = useState(false);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [searchConsumerLoading, setSearchConsumerLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState();
  const [currentPageForUnits, setCurrentPageForUnits] = useState();
  const [selectedDemandMonth, setSelectedDemandMonth] = useState("");
  const [selectedConsumerNo, setSelectedConsumerNo] = useState(null);
  const [fetchedDemandTable, setFetchedDemandTable] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [updateLoader, setUpdateLoader] = useState(false);
  const [totalPayableAmt, setTotalPaybleAmt] = useState(null);
  const [consumerDetailsId, setConsumerDetailsId] = useState(null);
  const [disableBtn, setDisableBtn] = useState(true)
  const [userInput, setUserInput] = useState({
    consumer_details_id: "",
    receipt_no: "",
    receipt_date: "",
    book_no: "",
    frm_month: "",
    upto_month: "",
    tot_amount: "",
    user_id: "",
    fromDate: "",
    upToDate: "",
  });
  const [inputData, setInputData] = useState({
    consumer_details_id: "",
    receipt_no: "",
    receipt_date: "",
    book_no: "",
    frm_month: "",
    upto_month: "",
    tot_amount: "",
    user_id: "",
    fromDate: "",
    upToDate: "",
  });
  const [inputFile, setInputFile] = useState(null);

  const PageSize = 30;

  useEffect(() => {
    let element = document.getElementById("view_box_start");
    if (displayDetails && !personalDetailsLoader && element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [displayDetails, personalDetailsLoader]);

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

  const viewDetailsFunction = async (consumerNo) => {
    setPersonalDetailsLoader(true);
    try {
      const base_url = `${SUDA_API_BASE_URL}/user/Water/SearchView/${consumerNo}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
      };
      let response = null,
        responseBody = null;
      response = await fetch(base_url, requestOptions);
      responseBody = await response.json();
      console.log("responseBody2", responseBody);
      if (response.status !== 200) {
        toast.error("No record found!", { position: "top-center" });
        return;
      }
      if (!responseBody) {
        toast.error("No record found!", { position: "top-center" });
        return;
      }
      setDisplayDetails(true);
      setEachConsumerPersonalDetails([]);
      setEachConsumerPersonalDetails((prevState) => [
        ...prevState,
        {
          consumerno: responseBody?.consumerNo || <i>No record</i>,
          consumername: responseBody?.consumerName || <i>No record</i>,
          oldconsumerno: responseBody?.oldConsumerNo || <i>No record</i>,
          mobileno: responseBody?.mobileNo || <i>No record</i>,
          gaurdianname: responseBody?.guardianName || <i>No record</i>,
          wardno: responseBody?.wardNo || <i>No record</i>,
          holdingno: responseBody?.propertyNo || <i>No record</i>,
          propertytype: responseBody?.propertyType || <i>No record</i>,
          propertyaddress: responseBody?.propertyAddress || <i>No record</i>,
        },
      ]);
      setConsumerConnectionDetails([]);
      setConsumerConnectionDetails((prevState) => [
        ...prevState,
        {
          propertyType: responseBody?.propertyType || <i>No record</i>,
          connnectionType: responseBody?.connectionType || <i>No record</i>,
          meterno: responseBody?.meterNo || <i>No record</i>,
          Initialmeterreading:
            responseBody?.initialMeterReading?.toString() || <i>No record</i>,
          noofconn: responseBody?.initialMeterReading?.toString() || (
            <i>No record</i>
          ),
          effectofconn: responseBody?.dateOfConnection || <i>No record</i>,
        },
      ]);
      setConsumerUnitRateDetails([]);
      responseBody?.consumerUnitRateDetails?.forEach((data) => {
        setConsumerUnitRateDetails((prevState) => [
          ...prevState,
          {
            unitrate: data?.unitRate,
            extracharge: data?.extraCharge?.toString(),
            dateOfEffect: data?.effectFrom,
            status: <i>{data?.status}</i>,
          },
        ]);
      });
      setCurrentPageForUnits(1);
    } catch (error) {
      console.log(error);
      setPersonalDetailsLoader(false);
    }
  };

  const handleFetchDemandDates = async (consumerNo) => {
    try {
      const base_url = `${SUDA_API_BASE_URL}/water/lastPaymentUpdateMonthDropDown?consumerNo=${consumerNo}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
      };
      let response = null,
        responseBody = null;
      response = await fetch(base_url, requestOptions);
      responseBody = await response.json();
      console.log("demand dates", responseBody);
      if (response.status !== 200) {
        toast.error("No record found!", { position: "top-center" });
        return;
      }
      if (responseBody.length < 1) {
        return;
      }
      setConsumerDemandDates([]);
      setConsumerDemandDates(responseBody);
    } catch (error) {
      console.log(error);
    } finally {
      setPersonalDetailsLoader(false);
    }
  };

  const handleSearchConsumer = async () => {
    setLoader(true);
    try {
      const base_url = `${SUDA_API_BASE_URL}/user/Water/SearchConsumer?wardId=${searchConsumerDetail.ward_id}&propertyNo=${searchConsumerDetail.propertyNo}&consumerNo=${searchConsumerDetail.ConsumerNo}&mobileNo=${searchConsumerDetail.MobileNUmber}&consumerName=${searchConsumerDetail.name}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
      };
      let response = null,
        responseBody = null;
      response = await fetch(base_url, requestOptions);
      responseBody = await response.json();
      console.log("responseBody", responseBody);
      if (response.status !== 200) {
        toast.error("No records found!", { position: "top-center" });
        return;
      }
      if (!responseBody || responseBody.length < 1) {
        toast.error("No records found!", { position: "top-center" });
        return;
      }
      let restructedData = [];
      responseBody.forEach((data, index) => {
        restructedData.push({
          id: index + 1,
          wardNo: data.wardNo,
          name: data.consumerName,
          address: data.address,
          mobileNo: data.mobileNo,
          consumerNo: data.consumerNo,
          propertyNo: data.propertyNo || <i>No record</i>,
          view: (
            <Button
              onClick={async () => {
                setSelectedConsumerNo(data.consumerNo);
                await viewDetailsFunction(data.consumerNo)
                  .then(() => handleFetchDemandDates(data.consumerNo))
                  .catch((err) => console.log(err));
              }}
              className="w-full rounded-sm bg-green-700 py-2"
            >
              View
            </Button>
          ),
        });
      });
      setSearchConsumerDetailResult(restructedData);
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return searchConsumerDetailResult.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const UniTableCurrentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return consumerUnitRateDetails.slice(firstPageIndex, lastPageIndex);
  }, [currentPageForUnits]);

  const handleViewDemands = async () => { 
    setDemandTableLoader(true);
    setDisableBtn(false)
    try {
      const base_url = `${SUDA_API_BASE_URL}/user/water/lastPaymentUpdateView?consumerNo=${selectedConsumerNo}&demandUpTo=${selectedDemandMonth}&demandFrom=${consumerDemandDates[0]?.monthId}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
      };
      let response = null,
        responseBody = null;
      response = await fetch(base_url, requestOptions);
      responseBody = await response.json();
      console.log("demandtable", responseBody);
      if (response.status !== 200) {
        toast.error("No records found!", { position: "top-center" });
        return;
      }
      if (responseBody.lastPayment.length < 1) {
        return;
      }
      let restructedData = [];
      responseBody?.lastPayment?.forEach((data, index) => {
        restructedData.push({
          slno: index + 1,
          demandfrom: data?.demandFrom,
          demandupto: data?.demandTo,
          amount: data?.amount,
        });
      });
      setFetchedDemandTable(restructedData);
      setTotalPaybleAmt(responseBody?.totalPayment);
      setConsumerDetailsId(responseBody?.consumerDetailsId);
    } catch (error) {
      console.log(error);
    } finally {
      setDemandTableLoader(false);
    }
  };

  function getFromMonthId() {
    let convertedDates = [];
    consumerDemandDates.forEach((item) =>
      convertedDates.push(new Date(item?.monthId))
    );
    convertedDates.sort((a, b) => a - b);
    let leastDate = convertedDates[0];
    console.log("least date", leastDate);
    const matchedObj = consumerDemandDates.filter(
      (item) => new Date(item?.monthId).toString() === leastDate.toString()
    );

    return {
      monthId: matchedObj[0]?.monthId,
      fromDate: consumerDemandDates[0]?.monthId,

    
    };
  }

  function verifyDetails() {
    if (!inputFile) return false;
    else if (
      userInput.book_no === "" ||
      userInput.receipt_date === "" ||
      userInput.receipt_no === ""
    ) {
      return false;
    }
    return true;
  }

  useEffect(()=>{
    console.log("consumerDemandDates",consumerDemandDates)
  },[consumerDemandDates])

  const handleLastPaymentUpdate = async () => {
    setBtnDisabled(true);
    setUpdateLoader(true);
    const memoizedConsumerDetailsId = consumerDetailsId;

    if (!verifyDetails()) {
      toast.error("Important fields cannot be empty", {
        position: "top-center",
      });
      return;
    }

    try {
      const base_url = `${SUDA_API_BASE_URL}/user/water/lastPaymentUpdate`;
      const userId = getCookieByName("SUDA_USER_ID");
      let fromMonthId = getFromMonthId().monthId;
      let uptoMonthId = selectedDemandMonth;
      let fromDate = getFromMonthId().fromDate;
      let toGetUptoDate = consumerDemandDates.filter(
        (item) => item.monthId === selectedDemandMonth
      );
      // console.log("memoizedConsumerDetailsId", memoizedConsumerDetailsId);
      // let uptoDate = toGetUptoDate[0].fromMonth;
      let uptoDate = toGetUptoDate[0].monthId;

      if (
        !memoizedConsumerDetailsId ||
        !totalPayableAmt ||
        !userId ||
        !selectedDemandMonth
      ) {
        toast.error("Important fields cannot be empty", {
          position: "top-center",
        });
        return;
      }
      console.log("memoizedConsumerDetailsId", memoizedConsumerDetailsId);
      var merged = {
        ...userInput,
        receipt_date: convertDateToAPIFormat(userInput.receipt_date),
        consumer_details_id: memoizedConsumerDetailsId,
        frm_month: fromMonthId,
        // upTo_month: SwapStringPlaces(uptoMonthId),
        upTo_month: uptoMonthId,
        total_amount: totalPayableAmt,
        user_id: userId,
        fromDate: convertDateToGenericSlashFormat(fromDate),
        // upToDate: convertDateToGenericSlashFormat(uptoDate),
        upToDate: uptoDate,
      };

      console.log("from date", merged.fromDate);

      console.log("upToDate",merged?.upToDate, 
      "from date", consumerDemandDates?.[0]?.monthId, 
      "upTo_month", merged?.upTo_month
      );

      const formData = new FormData();
      formData.append("file", inputFile);
      formData.append("upTo_month", merged?.upTo_month);
      formData.append("total_amount", merged?.total_amount);
      formData.append("user_id", merged?.user_id);
      formData.append("fromDate", consumerDemandDates?.[0]?.monthId);
      formData.append("upToDate", merged?.upToDate);
      formData.append("consumer_details_id", memoizedConsumerDetailsId);
      formData.append("receipt_no", merged?.receipt_no);
      formData.append("receipt_date", merged?.receipt_date);
      formData.append("book_no", merged?.book_no);
      formData.append("frm_month", merged?.frm_month);

      //console.log("form data", formData.getAll());

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
        body: formData,
        redirect: "follow",
      };
      let response = null,
        responseBody = null;
      response = await fetch(base_url, requestOptions);
      console.log("response", response);
      if (response.status === 200) {
        toast.success("Payment updated successfully!", {
          position: "top-center",
        });
        setUserInput({
          consumer_details_id: "",
          receipt_no: "",
          receipt_date: "",
          book_no: "",
          frm_month: "",
          upto_month: "",
          tot_amount: "",
          user_id: "",
          fromDate: "",
          upToDate: "",
        });
        setInputFile(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUpdateLoader(false);
      setBtnDisabled(false);
    }
  };

  const updateBasicDetailFormHandler = (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(searchConsumerDetail);
    setLoader(true);
    // setTemp('Loading...')
    //           try {
    //               const paymentReceiptDetailsGetUrl = `${SUDA_API_BASE_URL}/user/Water/SearchConsumer?consumerName=${searchConsumerDetail.name}&consumerNo=${searchConsumerDetail.ConsumerNo}&mobileNo=${searchConsumerDetail.MobileNUmber}&propertyNo=${searchConsumerDetail.propertyNo}&wardId=${searchConsumerDetail.ward_id}`
    //               const requestOptions = {
    //                   method: "GET",
    //                   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
    //               }
    //               let response = null, responseBody = null
    //               response = await fetch(paymentReceiptDetailsGetUrl, requestOptions)
    //               responseBody = await response.json()
    //               console.log("Search consumer", response, responseBody)

    //               if (response?.status == '200') {
    //                 console.log('200',responseBody)
    //                 setSearchConsumerDetailResult(responseBody)
    //               } else {
    //               }
    //           } catch (err) {
    //               console.error(err)

    //           }
    //           finally {
    //           }

    //           setSearchConsumerDetail(prevState => {
    //             return { ...prevState,
    //             propertyNo : '',
    //             ConsumerNo:'',
    //             MobileNUmber:'',
    //             name:''
    //           }
    //   })
  };

  useEffect(() => {
    console.log("searching...", searchConsumerDetail);
    if (
      searchConsumerDetail.ConsumerNo !== "" ||
      searchConsumerDetail.MobileNUmber !== "" ||
      searchConsumerDetail.name !== "" ||
      searchConsumerDetail.propertyNo !== "" ||
      searchConsumerDetail.ward_id !== ""
    ) {
      setDisabled(false);
    }
  }, [
    searchConsumerDetail.ward_id,
    searchConsumerDetail.propertyNo,
    searchConsumerDetail.ConsumerNo,
    searchConsumerDetail.MobileNUmber,
    searchConsumerDetail.name,
  ]);

  console.log("eachConsumerPersonalDetails", eachConsumerPersonalDetails);

  useEffect(() => {
    if (searchConsumerDetailResult?.length > 0) {
      setDisplayTable(true);
      //  setTemp('')
    }
    // else if(searchConsumerDetailResult?.length === 0){
    //  setDisplayTable(false)
    //  setTemp('No results found')
    // }
    // else{
    //  setTemp('')
    // }
  }, [searchConsumerDetailResult]);
  return (
    <>
      <ToastContainer autoClose={2000} />
      {personalDetailsLoader ? (
        <div className="fixed left-0 top-0 h-screen w-screen bg-black/70 backdrop-blur-sm">
          <div className="absolute left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              colors={["#FF0000", "#FF0000", "#FF0000", "#FF0000", "#FF0000"]}
            />
          </div>
        </div>
      ) : (
        <div className="relative mb-10 mt-10 flex  flex-col justify-center overflow-hidden">
          {toggle ? (
            <>
              <div className="m-auto w-full rounded-md  bg-white px-0 pb-4 pt-0 lg:max-w-full">
                <form
                  className="mt-4 h-screen" 
                  onSubmit={updateBasicDetailFormHandler}
                >
                  <div className="m-4 rounded-none  bg-white px-0  pb-0 pt-0 lg:max-w-full">
                    <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-lg py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
                      <h2 className="text-center text-sm font-semibold text-white">
                        Last Payment Update
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
                          color="gray"
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
                      {/* <div className="mb-3 ml-3 mt-2 min-w-fit max-w-fit">
                        <p className="text-xs font-bold text-red-600">OR</p>
                      </div> */}
                      {/* <div className="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
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
                      </div> */}
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        type="submit"
                        className={`mx-4 mb-2 h-8 w-36 px-4 py-1 tracking-wide text-white 
            ${disabled ? `cursor-not-allowed ` : `cursor-pointer`}
            transform rounded-md  
            bg-green-400 transition-colors duration-200 hover:bg-green-700 
            focus:bg-green-400 focus:outline-none`}
                        disabled={disabled}
                        onClick={handleSearchConsumer}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          ) : null}
          {loader ? (
            <div className="m-auto h-16 w-16">
              <ColorRing
                visible={true}
                height="40"
                width="40"
                colors={["#FF0000", "#FF0000", "#FF0000", "#FF0000", "#FF0000"]}
              />
            </div>
          ) : null}
          {displayTable ? (
            <>
              <Table
                data={currentTableData}
                columns={columns}
                hover={true}
                striped={true}
              />
              <div className="justify-center lg:flex">
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={searchConsumerDetailResult.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {personalDetailsLoader ? (
            <div className="m-auto h-16 w-16">
              <ColorRing
                visible={true}
                height="40"
                width="40"
                colors={["#FF0000", "#FF0000", "#FF0000", "#FF0000", "#FF0000"]}
              />
            </div>
          ) : null}
          {displayDetails ? (
            <>
              {eachConsumerPersonalDetails.length > 0 && (
                <div
                  id="view_box_start"
                  className="m-4 rounded-none border border-gray-500 bg-white px-0  pb-0 pt-0 lg:max-w-full"
                >
                  <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-lg py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
                    <h2 className="text-center text-sm font-semibold text-white">
                      Consumer Details
                    </h2>
                  </nav>

                  <DetailContainer
                    detailLists={detailLists}
                    details={eachConsumerPersonalDetails}
                    title="Consumer Details"
                  />
                </div>
              )}
              {consumerConnectionDetails.length > 0 && (
                <div className="m-4 rounded-none border border-gray-500 bg-white px-0  pb-0 pt-0 lg:max-w-full">
                  <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-lg py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
                    <h2 className="text-center text-sm font-semibold text-white">
                      Consumer Connection Details
                    </h2>
                  </nav>
                  <Table
                    data={consumerConnectionDetails}
                    columns={consumerConnectionColumns}
                    hover={true}
                    striped={true}
                  />
                </div>
              )}
              {consumerUnitRateDetails.length > 0 && (
                <div className="m-4 rounded-none border border-gray-500 bg-white px-0  pb-0 pt-0 lg:max-w-full">
                  <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
                    <h2 className="text-center text-sm font-semibold text-white">
                      Consumer Unit Rate Details
                    </h2>
                  </nav>
                  <Table
                    data={UniTableCurrentData}
                    columns={consumerUnitRateColumns}
                    hover={true}
                    striped={true}
                  />
                  <div className="justify-center lg:flex">
                    <Pagination
                      className="pagination-bar"
                      currentPage={currentPageForUnits}
                      totalCount={consumerConnectionDetails.length}
                      pageSize={PageSize}
                      onPageChange={(page) => setCurrentPageForUnits(page)}
                    />
                  </div>
                </div>
              )}

              {displayDetails && (
                <div className="m-4 rounded-none border border-gray-500 bg-white px-0  pb-0 pt-0 lg:max-w-full">
                  <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-lg py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
                    <h2 className="text-center text-sm font-semibold text-white">
                      Last Payment Details
                    </h2>
                  </nav>

                  <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit">
                    <label
                      className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700 "
                      htmlFor="password"
                    >
                      Update Upto Month
                      <p
                        className="contents text-sm 
                                 font-bold text-red-600"
                      >
                        *
                      </p>
                    </label>
                    <Tooltip
                      className="text-black-900 inline w-64 bg-red-300 text-xs 
                            "
                      placement="top"
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                    >
                      <Select
                        onChange={(e) => setSelectedDemandMonth(e)}
                        label="Select"
                        color="gray"
                        className="w-full py-1 pl-2 pr-3 text-xs font-bold 
                                               text-gray-900
                                             "
                      >
                        {consumerDemandDates.length < 1 ? (
                          <i>No records found</i>
                        ) : (
                          consumerDemandDates.map((data) => (
                            <Option value={data.monthId}>{data.month}</Option>
                          ))
                        )}
                      </Select>
                    </Tooltip>
                    <button
                      onClick={handleViewDemands}
                      type="submit"
                      className="mx-4 mb-2 h-8 w-36 transform cursor-pointer rounded-md bg-green-400 
                              px-4
                               py-1 tracking-wide  
                               text-white transition-colors duration-200 hover:bg-green-700 
                               focus:bg-green-400 focus:outline-none"
                    >
                      View 
                    </button>
                  </div>
                  {demandTableLoader ? (
                    <div className="m-auto h-16 w-16">
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
                  {fetchedDemandTable.length > 0 ? (
                    <Table
                      data={fetchedDemandTable}
                      columns={lastPaymentDetailColumns}
                      hover={true}
                      striped={true}
                    />
                  ) : (
                    <p className="mb-12 mt-5 text-center text-sm font-semibold text-red-700">
                      No records found
                    </p>
                  )}
                </div>
              )}

              {displayDetails && (
                <div className="m-4 rounded-none border border-gray-500 bg-white px-0  pb-0 pt-0 lg:max-w-full">
                  <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
                    <h2 className="text-center text-sm font-semibold text-white">
                      Receipt Details
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
                          Receipt No
                          <p
                            className="contents text-sm 
                                 font-bold text-red-600"
                          >
                            *
                          </p>
                        </label>
                        <Tooltip
                          className="text-black-900 inline w-64 bg-red-300 text-xs 
                            "
                          placement="top"
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                        >
                          <input
                            name="narration"
                            id="narration"
                            value={userInput.receipt_no}
                            onChange={(e) =>
                              setUserInput({
                                ...userInput,
                                receipt_no: e.target.value,
                              })
                            }
                            //   defaultValue={paymentDetail.narration}
                            //   onChange={(e)=>handlePaymentDetails(e,"narration")}
                            className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-blue-500
                        focus:bg-white focus:outline-none sm:w-full lg:w-72"
                            type="text"
                            placeholder=""
                          />
                        </Tooltip>
                      </div>

                      <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit">
                        <label
                          className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700 "
                          htmlFor="password"
                        >
                          Book No
                          <p
                            className="contents text-sm 
                                 font-bold text-red-600"
                          >
                            *
                          </p>
                        </label>
                        <Tooltip
                          className="text-black-900 inline w-64 bg-red-300 text-xs 
                            "
                          placement="top"
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                          }}
                        >
                          <input
                            name="narration"
                            id="narration"
                            value={userInput.book_no}
                            onChange={(e) =>
                              setUserInput({
                                ...userInput,
                                book_no: e.target.value,
                              })
                            }
                            //   defaultValue={paymentDetail.narration}
                            //   onChange={(e)=>handlePaymentDetails(e,"narration")}
                            className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-blue-500
                        focus:bg-white focus:outline-none sm:w-full lg:w-72"
                            type="text"
                            placeholder=""
                          />
                        </Tooltip>
                      </div>
                    </div>

                    <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit">
                      <label
                        className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700 "
                        htmlFor="password"
                      >
                        Receipt Date
                        <p
                          className="contents text-sm 
                                 font-bold text-red-600"
                        >
                          *
                        </p>
                      </label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3}>
                          <DesktopDatePicker
                            // label="Date desktop"
                            // onChange={(e)=>handlePaymentDetails(e, "chequeDDDate")}
                            name="chequeDDDate"
                            value={userInput.receipt_date}
                            color="gray"
                            onChange={(e) =>
                              setUserInput({
                                ...userInput,
                                receipt_date: e.$d,
                              })
                            }
                            id="chequeDDDate"
                            inputFormat="YYYY-MM-DD"
                            renderInput={(params) => <TextField {...params} />}
                            // value={paymentDetail.chequeDDDate}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </div>

                    <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit">
                      <label
                        className=" mb-2  block w-[11rem] text-xs font-bold text-gray-700 "
                        htmlFor="password"
                      >
                        Upload Receipt
                        <p
                          className="contents text-sm 
                                 font-bold text-red-600"
                        >
                          *
                        </p>
                      </label>
                      <input
                        //onChange={handleFileChange}
                        className="form-control m-0
                                            block
                                            w-full
                                            rounded
                                            border
                                            border-solid
                                            border-gray-400
                                            bg-white bg-clip-padding 
                                            px-3 py-2 text-xs
                                            font-normal
                                            text-gray-900
                                            transition
                                            ease-in-out
                                            focus:border-gray-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                        type="file"
                        id="owner_file"
                        onChange={(e) => setInputFile(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
              )}

              {displayDetails && (
                <div className="justify-centre mb-12 w-full items-center gap-2 p-4 lg:flex">
                  <button
                    onClick={handleLastPaymentUpdate}
                    
                    type="submit"
                    className={`mx-4 mb-2 h-8 w-36 transform rounded-md bg-green-400 
                              px-4
                               py-1 tracking-wide  
                               text-white transition-colors duration-200 hover:bg-green-700 
                               focus:bg-green-400 focus:outline-none 
                               ${disableBtn ? 'cursor-not-allowed' : 'cursor-pointer'}
                               `}
                               disabled={disableBtn}
                  >
                    Upload
                  </button>
                  {updateLoader && (
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
                  )}
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default MainPageLastPaymentUpdate;
