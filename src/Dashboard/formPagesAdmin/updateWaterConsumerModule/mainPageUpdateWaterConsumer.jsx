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
import { convertDateToAPIFormat } from "@/utils/commonUtils";
import {
  consumerConnectionDetails,
  consumerUnitRateDetails,
  lastPaymentDetails,
  wardData,
} from "../utils/common";
import { tableData } from "../utils/tableData";
import Table from "../utils/Table";
import DetailContainer from "../utils/DetailContainer";
import UserDetailsContainer from "../userChargesModule/userChargesUpdateConsumer/UserDetailsContainer";
import Pagination from "@/Components/Pagination";
import ReactPaginate from "react-paginate";
// const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const MainPageUpdateWaterConsumer = () => {
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
    { field: "id", header: "Sl No" },
    { field: "consumer_no", header: "Consumer No" },
    { field: "name", header: "Consumer Name" },
    { field: "mobile_no", header: "Mobile No" },
    { field: "holding_no", header: "Holding No" },
    { field: "view", header: "View" },
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
  const prev = {
    display: "flex",
  };

  const lastPaymentDetailColumns = [
    { field: "slno", header: "Sl No" },
    { field: "demandfrom", header: "Demand From" },
    { field: "demandupto", header: "Demand Upto" },
    { field: "amount", header: "Amount" },
  ];
  const [searchConsumerDetail, setSearchConsumerDetail] = useState(
    searchConsumerDetails
  );
  const [searchConsumerDetailResult, setSearchConsumerDetailResult] =
    useState(null);
  const [searchConsumer, setsearchConsumer] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [loader, setLoader] = useState(false);
  const [fetchedData, setFetchedData] = useState(false);
  const [displayTable, setDisplayTable] = useState(false);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [consumerDetails, setConsumerDetails] = useState([]);

  const [old_consumer_no, setold_consumer_no] = useState("");
  const [holding_no, setholding_no] = useState("");
  const [name, setName] = useState("");
  const [mobile_no, setmobile_no] = useState("");
  const [relation, setrelation] = useState("");
  const [guardian_name, setguardian_name] = useState("");
  const [property_address, setproperty_address] = useState("");
  const [ward_id, setward_id] = useState("");
  const [editDetails, seteditDetails] = useState(true);
  const [is_nigam_emp, setis_nigam_emp] = useState("");
  const [nigam_emp_doc, setnigam_emp_doc] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);

  const PageSize = 10;

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

  const viewConsumerDetailHandler = async (id) => {
    //setFetchedData(data)
    setLoader(true);
    setToggle(false);
    setDisplayDetails(true);
    try {
      const searchDetails = `${BACKEND_BASE_URL}/watermanagement/consumers/individual/${id}`;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      let response = null,
        responseBody = null;
      response = await fetch(searchDetails, requestOptions);
      responseBody = await response.json();
      console.log("receipt in main form", response, responseBody);
      let allotteearr = [];
      if (response?.status == "200") {
        setDisplayDetails(true);
        console.log("receipt in main form 200", response, responseBody);
        setConsumerDetails(responseBody.data);
        setDisplayTable(false);
      } else {
        //setLoader(false)
        setDisplayDetails(false);
        toast.error("Failed to fetch details..!!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      console.error(err);
      setLoader(false);
      setDisplayDetails(false);
      toast.error("Failed to fetch details..!!!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
    }
  };

  const updateBasicDetailFormHandler = async (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(searchConsumerDetail);
    setLoader(true);
    // setTemp('Loading...')
    try {
      const paymentReceiptDetailsGetUrl = `${BACKEND_BASE_URL}/watermanagement/consumers?consumerNo=${searchConsumerDetail.ConsumerNo}&wardNo=${searchConsumerDetail.ward_id}&mobileNo=${searchConsumerDetail.MobileNUmber}&propertyNo=${searchConsumerDetail.propertyNo}&name=${searchConsumerDetail.name}`;
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
      //console.log("Search consumer", response, responseBody)

      if (response?.status == "200" && responseBody?.data?.length > 0) {
        console.log("200", responseBody, responseBody?.data?.length);
        // setLoader(false)
        //setDisplayTable(true)
        setSearchConsumerDetailResult(responseBody?.data);
      } else if (
        response?.status == "200" &&
        responseBody?.data?.length === 0
      ) {
        console.log(
          "200",
          responseBody,
          responseBody?.data?.length,
          "length is 0"
        );
        // setLoader(false)
        //setDisplayTable(true)
        setSearchConsumerDetailResult(responseBody?.data);
      } else {
        setLoader(false);
        setDisplayTable(false);
        toast.error("Error while searching. Please try again later ..!!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      console.error(err);
      setLoader(false);
      setDisplayTable(false);
      toast.error("Error while searching. Please try again later ..!!!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
    }

    setSearchConsumerDetail((prevState) => {
      return {
        ...prevState,
        propertyNo: "",
        ConsumerNo: "",
        MobileNUmber: "",
        name: "",
      };
    });
  };

  useEffect(() => {
    console.log(editDetails, "edit btn");
  }, [editDetails]);

  useEffect(() => {
    console.log("searching...", searchConsumerDetail);
    if (searchConsumerDetail.ward_id !== "") {
      setDisabled(false);
    } else if (searchConsumerDetail.propertyNo !== "") {
      setDisabled(false);
    } else if (searchConsumerDetail.ConsumerNo !== "") {
      setDisabled(false);
    } else if (searchConsumerDetail.MobileNUmber !== "") {
      setDisabled(false);
    } else if (searchConsumerDetail.name !== "") {
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

  useEffect(() => {
    console.log(searchConsumerDetailResult, "searchConsumerDetailResult");
    let arr = [];
    if (searchConsumerDetailResult?.length > 0) {
      searchConsumerDetailResult.map((testData, index) => {
        let val = {};
        val.id = index + 1;
        val.consumer_no = testData?.consumer_no;
        val.name = testData?.name;
        val.holding_no = testData?.holding_no;
        val.mobile_no = testData?.mobile_no;
        val.view = (
          <button
            type="button"
            className="custom_button_add h-6 w-16 rounded bg-green-700
               px-2 py-1 text-white"
            onClick={() => viewConsumerDetailHandler(val.consumer_no)}
          >
            View
          </button>
        );
        arr.push(val);
      });
    }

    setsearchConsumer(arr);
    //  setCurrentPage(1);
  }, [searchConsumerDetailResult]);

  const endOffset = itemOffset + PageSize;

  const currentItems = searchConsumer?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(searchConsumer?.length / PageSize);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * PageSize) % searchConsumer?.length;

    setItemOffset(newOffset);
  };

  //  useEffect(()=>{
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  //   return searchConsumerDetailResult?.slice(firstPageIndex, lastPageIndex);
  //  },[searchConsumerDetailResult])
  //  const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  //   return searchConsumer?.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage]);

  useEffect(() => {
    console.log(
      "searchConsumer on load",
      searchConsumer,
      searchConsumerDetailResult
    );
    if (searchConsumerDetailResult?.length > 0) {
      if (searchConsumer?.length > 0) {
        setDisplayTable(true);
        setLoader(false);
      } else if (searchConsumer?.length === 0) {
        setDisplayTable(true);
        setLoader(false);
      } else {
        setDisplayTable(false);
      }
    }
    if (searchConsumerDetailResult?.length === 0) {
      setDisplayTable(true);
      setLoader(false);
    }
  }, [searchConsumer, searchConsumerDetailResult]);

  useEffect(() => {
    console.log(displayTable, "displayTable status");
  }, [displayTable]);

  useEffect(() => {
    console.log(consumerDetails[0], "consumerDetails");
    if (consumerDetails.length > 0) {
      const categoryElement = document.getElementById("wardNameId");
      const nigamEmployee = document.getElementById("nigamEmployee");
      const selectedRelation = document.getElementById("selectedRelation");
      setold_consumer_no(consumerDetails[0].old_consumer_no);
      setholding_no(consumerDetails[0].holding_no);
      setName(consumerDetails[0].name);
      setmobile_no(consumerDetails[0].mobile_no);
      // setrelation(consumerDetails[0].relation)
      setguardian_name(consumerDetails[0].guardian_name);
      setproperty_address(consumerDetails[0].property_address);
      // setward_id(consumerDetails[0].ward_id)

      console.log(categoryElement, "categoryElement");

      categoryElement.innerHTML = consumerDetails[0]?.ward_id;
      nigamEmployee.innerHTML = consumerDetails[0]?.is_nigam_emp;
      selectedRelation.innerHTML = consumerDetails[0]?.relation;
    }
  }, [consumerDetails]);
  const changeHandler = (e, id) => {
    // if(id.includes("wardNo")){
    //   setWardNo(e.target.value)
    // }
    // console.log("change handler", e)
    if (e.toString().includes("ward_name")) {
      console.log("clk");
      let wardItem = JSON.parse(e);
      let wardId = wardItem.id;
      const categoryElement = document.getElementById("wardNameId");
      categoryElement.innerHTML = wardItem.ward_name;
      // console.log(wardItem)
      setward_id(wardId);
    } else if (e.toString().includes("nigam")) {
      const nigamEmployee = document.getElementById("nigamEmployee");
      let nigam = e.toString().split("_")[1];
      setis_nigam_emp(nigam);
      nigamEmployee.innerHTML = nigam;
    } else if (id.includes("old_consumer_no")) {
      setold_consumer_no(e.target.value);
    } else if (id.includes("holding_no")) {
      setholding_no(e.target.value);
    } else if (id.includes("name")) {
      setName(e.target.value);
    } else if (id.includes("mobile_no")) {
      setmobile_no(e.target.value);
    } else if (id.includes("relation")) {
      const selectedRelation = document.getElementById("selectedRelation");
      let relation = e.toString().split("_")[1];
      // console.log(zoneItem)
      setrelation(relation);
      selectedRelation.innerHTML = relation;
    } else if (id.includes("guardian_name")) {
      setguardian_name(e.target.value);
    } else if (id.includes("property_address")) {
      setproperty_address(e.target.value);
    } else {
    }
    seteditDetails(false);
  };

  useEffect(() => {
    console.log("is_nigam_emp", is_nigam_emp, nigam_emp_doc);
    if (is_nigam_emp === "Yes") {
      if (nigam_emp_doc !== null) {
        seteditDetails(false);
      } else {
        seteditDetails(true);
      }
    } else {
      seteditDetails(false);
    }
  }, [is_nigam_emp, nigam_emp_doc]);

  const handleFileChange = (e) => {
    setnigam_emp_doc(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(ward_id, consumerDetails[0], "realtion");
    const formData = new FormData();

    console.log(formData, "formdataaa");
    formData.append(
      "consumerBasicDetailsId",
      consumerDetails[0]?.consumer_dets_id
    );
    formData.append("consumerNo", consumerDetails[0]?.old_consumer_no);
    formData.append("consumerDetailsId", consumerDetails[0]?.consumer_dets_id);
    console.log(nigam_emp_doc, consumerDetails[0]?.consumer_dets_id, formData);

    console.log(formData.get("consumerBasicDetailsId"));
    console.log(formData.get("consumerDetailsId"));
    console.log(formData.get("nigam_emp_doc"));

    let editDetails = {};
    // editDetails.consumerBasicDetailsId = consumerDetails[0]?.consumer_dets_id
    // editDetails.consumerDetailsId = consumerDetails[0]?.consumer_dets_id
    console.log(ward_id, consumerDetails[0].ward_id);
    const wardNameId = document.getElementById("wardNameId");
    const nigamEmployee = document.getElementById("nigamEmployee");
    const selectedRelation = document.getElementById("selectedRelation");
    if (wardNameId.innerHTML !== consumerDetails[0]?.ward_id) {
      // editDetails.wardId = ward_id
      formData.append("wardId", ward_id);
    }
    if (old_consumer_no !== consumerDetails[0].old_consumer_no) {
      // editDetails.old_consumer_no = old_consumer_no
      formData.append("oldConsumerNo", old_consumer_no);
    }
    if (holding_no !== consumerDetails[0].holding_no) {
      // editDetails.holding_no = holding_no
      formData.append("holdingNo", holding_no);
    }
    if (name !== consumerDetails[0].name) {
      // editDetails.name = name
      formData.append("name", name);
    }

    if (mobile_no !== consumerDetails[0].mobile_no) {
      // editDetails.mobile_no = mobile_no
      console.log("mob");
      formData.append("mobileNo", mobile_no);
    }
    if (selectedRelation.innerHTML !== consumerDetails[0].relation) {
      // editDetails.relation = relation
      formData.append("relation", relation);
    }
    if (guardian_name !== consumerDetails[0].guardian_name) {
      //editDetails.guardian_name = guardian_name
      formData.append("guardianName", guardian_name);
    }
    if (property_address !== consumerDetails[0].property_address) {
      // editDetails.property_address = property_address
      formData.append("propertyAddress", property_address);
    }
    //  console.log(editDetails, nigam_emp_doc)

    //  editDetails.isNigamEmp = is_nigam_emp
    if (nigamEmployee.innerHTML !== consumerDetails[0]?.is_nigam_emp) {
      formData.append("isNigamEmp", is_nigam_emp);
    }

    console.log(nigam_emp_doc, "nigam_emp_doc");
    if (nigam_emp_doc) {
      formData.append("nigam_emp_doc", nigam_emp_doc);
    }

    console.log(formData, "formData");
    try {
      const paymentReceiptDetailsGetUrl = `${BACKEND_BASE_URL}/watermanagement/updateConsumer`;
      const requestOptions = {
        method: "PUT",
        // headers: {
        //   'Content-Type': 'application/json',
        //  },
        body: formData,
        //redirect: "follow",
      };

      let response = null,
        responseBody = null;
      response = await fetch(paymentReceiptDetailsGetUrl, requestOptions);
      //responseBody = await response.json()
      console.log("edit", response, response);

      if (response?.status == "200") {
        //console.log('200',responseBody)
        // setLoader(false)
        // setSearchConsumerDetailResult(responseBody.data)
        toast.success("Details edited successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Edit failed!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Edit failed!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
    }
  };

  const backbuttonHandler = () => {
    setDisplayDetails(false);
    setDisplayTable(true);
    setToggle(true);
    setLoader(false);
  };
  return (
    <>
      <ToastContainer autoClose={2000} />

      <div className="relative mb-10 mt-10 flex  flex-col justify-center overflow-hidden">
        {toggle ? (
          <>
            <div
              className="m-auto w-full rounded-md border border-gray-500 bg-white px-0 
        pb-4 pt-0 
        lg:max-w-full"
            >
              <form className="" onSubmit={updateBasicDetailFormHandler}>
                <div className="rounded-none bg-white px-0  pb-0 pt-0 lg:max-w-full">
                  <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
                    <h2 className="text-center text-sm font-semibold text-white">
                      Update Consumer
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
                        className="bg-white-200 text-white-700 w-full appearance-none rounded border border-gray-500 px-4 py-2 leading-tight focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none"
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
                        className="bg-white-200 text-white-700 w-full appearance-none rounded border border-gray-500 px-4 py-2 leading-tight focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none"
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
                        className="bg-white-200 text-white-700 w-full appearance-none rounded border border-gray-500 px-4 py-2 leading-tight focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none"
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
                        className="bg-white-200 text-white-700 w-full appearance-none rounded border border-gray-500 px-4 py-2 leading-tight focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none"
                        type="text"
                        placeholder=""
                      />
                    </div>
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
                    >
                      Submit
                    </button>
                  </div>
                </div>
                {loader ? (
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
            </div>
          </>
        ) : null}
        {displayTable ? (
          <>
            <div>
              <Table
                data={currentItems}
                columns={columns}
                hover={true}
                striped={true}
              />
              {searchConsumer?.length > 10 ? (
                <ReactPaginate
                  breakLabel="..."
                  nextLabel={
                    <span
                      className="
                  // flex h-8 w-5 
                  items-center justify-center rounded-md bg-gray-200 px-5 py-3
                   text-xs text-gray-700"
                    >
                      next
                    </span>
                  }
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel={
                    <span
                      className="
                // flex h-8 w-8
                items-center  justify-center rounded-md bg-gray-200 px-5 py-3
                text-xs text-gray-700"
                    >
                      prev
                    </span>
                  }
                  containerClassName="flex items-center justify-center text-xs mx-3"
                  pageClassName="block border border-solid border-lightGray
              //  text-xs mx-1 
              //  hover:bg-lightGray w-8 py-3 px-5 h-8 flex items-center justify-center rounded-md 
               "
                  activeClassName="bg-gray-300 text-gray-700 text-xs"
                  renderOnZeroPageCount={null}
                />
              ) : null}
            </div>
          </>
        ) : (
          <></>
        )}

        {displayDetails ? (
          <>
            <div className="m-4 rounded-none border border-gray-500 bg-white px-0  pb-0 pt-0 lg:max-w-full">
              <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
                <h2 className="text-center text-sm font-semibold text-white">
                  Update Consumer Basic Details
                </h2>
                <button
                  className="ml-4 mr-2 rounded-md bg-red-500 px-4
        py-1 text-center text-sm font-semibold text-white"
                  onClick={backbuttonHandler}
                >
                  Back
                </button>
              </nav>

              <div className="mt-3 flex flex-col">
                <div className="overflow-x-auto">
                  <div className="inline-block p-2.5 align-middle lg:w-full">
                    <div className="overflow-hidden">
                      <form onSubmit={submitHandler}>
                        <div className="grid grid-cols-1 gap-1 px-2 py-3 md:grid-cols-2 md:gap-3 md:px-6">
                          <div className="flex gap-3 whitespace-normal  py-2 text-xs font-normal text-gray-700 ">
                            <span>Ward No</span>
                            <Select
                              onChange={(e) => changeHandler(e, "ward_name")}
                              name="ward_name"
                              id={`wardNameId`}
                              defaultValue={ward_id}
                              label=""
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
                          <div className="flex gap-3 whitespace-normal  py-2 text-xs font-normal text-gray-700 ">
                            <span>Consumer No</span>
                            <input
                              name="narration"
                              id="narration"
                              disabled={true}
                              value={consumerDetails[0]?.consumer_no}
                              className="text-white-700 appearance-none rounded border border-gray-400 bg-gray-200 px-4 py-2 leading-tight focus:border-2 focus:border-blue-500
                        focus:bg-white focus:outline-none sm:w-full lg:w-72"
                              type="text"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-1 px-2 py-3 md:grid-cols-2 md:gap-3 md:px-6">
                          <div className="flex gap-3 whitespace-normal  py-2 text-xs font-normal text-gray-700 ">
                            <span>Old Consumer no</span>
                            <input
                              name="narration"
                              id="narration"
                              value={old_consumer_no}
                              onChange={(e) =>
                                changeHandler(e, "old_consumer_no")
                              }
                              onKeyPress={(e) =>
                                !/[0-9]/.test(e.key) && e.preventDefault()
                              }
                              className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-blue-500
                        focus:bg-white focus:outline-none sm:w-full lg:w-72"
                              type="text"
                              placeholder=""
                            />
                          </div>
                          <div className="flex gap-3 whitespace-normal  py-2 text-xs font-normal text-gray-700 ">
                            <span>Holding no</span>
                            <input
                              name="narration"
                              id="narration"
                              value={holding_no}
                              onChange={(e) => changeHandler(e, "holding_no")}
                              maxLength="10"
                              onKeyPress={(e) =>
                                !/[0-9]/.test(e.key) && e.preventDefault()
                              }
                              className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-blue-500
                        focus:bg-white focus:outline-none sm:w-full lg:w-72"
                              type="text"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-1 px-2 py-3 md:grid-cols-2 md:gap-3 md:px-6">
                          <div className="flex gap-3 whitespace-normal  py-2 text-xs font-normal text-gray-700 ">
                            <span>Name</span>
                            <input
                              name="narration"
                              id="narration"
                              value={name}
                              onChange={(e) => changeHandler(e, "name")}
                              className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-blue-500
                        focus:bg-white focus:outline-none sm:w-full lg:w-72"
                              type="text"
                              placeholder=""
                            />
                          </div>
                          <div className="flex gap-3 whitespace-normal  py-2 text-xs font-normal text-gray-700 ">
                            <span>Mobile Number</span>
                            <input
                              name="narration"
                              id="narration"
                              value={mobile_no}
                              onChange={(e) => changeHandler(e, "mobile_no")}
                              onKeyPress={(e) =>
                                !/[0-9]/.test(e.key) && e.preventDefault()
                              }
                              maxLength="10"
                              className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-blue-500
                        focus:bg-white focus:outline-none sm:w-full lg:w-72"
                              type="text"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-1 px-2 py-3 md:grid-cols-2 md:gap-3 md:px-6">
                          <div className="flex gap-3 whitespace-normal  py-2 text-xs font-normal text-gray-700 ">
                            <span>Relation</span>
                            {/* <input 
                              name="narration"
                              id="narration"
                              value={relation}
                              onChange={(e)=>changeHandler(e,'relation')}
                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                               type="text" placeholder="" /> */}
                            <Select
                              onChange={(e) => changeHandler(e, "relation")}
                              label=""
                              id={`selectedRelation`}
                              className="w-full py-1 pl-2 pr-3 text-xs font-bold 
                                               text-gray-900
                                             "
                            >
                              <Option value="relation_M/O">M/O</Option>
                              <Option value="relation_F/O">F/O</Option>
                              <Option value="relation_S/O">S/O</Option>
                              <Option value="relation_D/O">D/O</Option>
                              <Option value="relation_W/O">W/O</Option>
                              <Option value="relation_C/O">C/O</Option>
                            </Select>
                          </div>
                          <div className="flex gap-3 whitespace-normal  py-2 text-xs font-normal text-gray-700 ">
                            <span>Guardian Name</span>
                            <input
                              name="narration"
                              id="narration"
                              value={guardian_name}
                              onChange={(e) =>
                                changeHandler(e, "guardian_name")
                              }
                              className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-blue-500
                        focus:bg-white focus:outline-none sm:w-full lg:w-72"
                              type="text"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-1 px-2 py-3 md:grid-cols-2 md:gap-3 md:px-6">
                          <div className="flex gap-3 whitespace-normal  py-2 text-xs font-normal text-gray-700 ">
                            <span>Property Address</span>
                            <input
                              name="narration"
                              id="narration"
                              value={property_address}
                              onChange={(e) =>
                                changeHandler(e, "property_address")
                              }
                              className="bg-white-200 text-white-700 appearance-none rounded border border-gray-400 px-4 py-2 leading-tight focus:border-2 focus:border-blue-500
                        focus:bg-white focus:outline-none sm:w-full lg:w-72"
                              type="text"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-1 px-2 py-3 md:grid-cols-2 md:gap-3 md:px-6">
                          <div className="flex gap-3 whitespace-normal  py-2 text-xs font-normal text-gray-700 ">
                            <span>Is Consumer a 4th Grade Nigam Employee</span>
                            <Tooltip
                              className="text-black-900 inline w-64 bg-transparent text-xs"
                              placement="top"
                              animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                              }}
                            >
                              <Select
                                onChange={(e) => changeHandler(e, "nigam")}
                                defaultValue={is_nigam_emp}
                                label=""
                                id={`nigamEmployee`}
                                // className="w-72 pl-2 pr-3 py-2 font-bold text-xs text-gray-900
                                // "
                              >
                                <Option value="nigam_Yes">Yes</Option>
                                <Option value="nigam_No">No</Option>
                              </Select>
                            </Tooltip>
                          </div>
                          {is_nigam_emp === "Yes" ? (
                            <>
                              <div className="flex py-3">
                                <span className=" text-xs font-normal  text-gray-700">
                                  Identification Document
                                </span>
                                <input
                                  onChange={handleFileChange}
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
                                            focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                                  type="file"
                                  name="nigam_file"
                                  // defaultValue={nigam_emp_doc}
                                  accept="image/*"
                                  id="nigam"
                                />
                              </div>
                            </>
                          ) : null}
                        </div>

                        <button
                          type="submit"
                          className={`mb-2 mr-auto h-8 w-36  transform rounded-md bg-green-400 
                               px-4 py-1
                               text-center tracking-wide  
                               text-white transition-colors duration-200 hover:bg-green-700 
                               focus:bg-green-400 focus:outline-none
                               ${
                                 editDetails
                                   ? `cursor-not-allowed `
                                   : `cursor-pointer`
                               }
                               `}
                          disabled={editDetails}
                        >
                          Edit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default MainPageUpdateWaterConsumer;
