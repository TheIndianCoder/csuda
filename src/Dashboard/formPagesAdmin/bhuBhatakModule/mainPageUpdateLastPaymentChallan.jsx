import BankReconciliationTable from "@/Dashboard/resusables/BankReconciliationTable";
import BhuBhatakChallanHistory from "@/Dashboard/resusables/BhuBhatakChallanHistory";
import BhuBhatakLandDetailsForm from "@/Dashboard/resusables/BhuBhatakLandDetailsForm";
import BhubhatakPersonalDetails from "@/Dashboard/resusables/BhubhatakPersonalDetails";
import OrInputBox from "@/Dashboard/resusables/OrInputBox";
import UpdateChalanForm from "@/Dashboard/resusables/UpdateChalanForm";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { getCookieByName } from "@/utils/RequireAuth";
import { Button, IconButton } from "@material-tailwind/react";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import {
  convertDateToGenericDashFormat,
  convertDateToGenericSlashFormat,
} from "@/utils/commonUtils";
const SUDA_API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const tableHeadings = [
  "Sl.No",
  "Allotee Name",
  "Lease Number",
  "Area Name",
  "Ward Number",
  "Action",
];

const initialValuesForChallanForm = {
  demandFrom: "",
  demandUpto: "",
  landAllotmentId: "",
  transactionNo: "",
  paymentDate: "",
  totalPaidAmount: "",
  paymentMode: "Cash",
  paymentDetals: {},
  remarks: "",
  challan: null,
};

const MainPageUpdateLastPaymentChallan = () => {
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [viewDetailParams, setViewDetailParams] = useState(null);
  const [mainSearchLoading, setMainSearchLoading] = useState(false);
  const [leaseNo, setLeaseNo] = useState(null);
  const [landAllotmentId, setLandAllotmentId] = useState(null);
  const [eligibleConsumerData, setEligibleConsumerData] = useState([]);
  const [eachConsumerPersonalData, setEachConsumerPersonalData] =
    useState(null);
  const [eachConsumerLandData, setEachConsumerLandData] = useState(null);
  const [eachConsumerDemandDetails, setEachConsumerDemandDetails] =
    useState(null);
  const [eachConsumerChallanHistory, setEachConsumerChallanHistory] =
    useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    wardNo: "",
    leaseNo: "",
    mobileNo: "",
  });
  const [landValues, setLandValues] = useState({
    area_name: "",
    ward_number: "",
    address: "",
    consumer_number: "",
    registration_date: "",
    usage_type: "",
    plot_area: "",
    bhu_bhatak_rate: "",
    demand_amount: "",
  });

  const [updateChallanFormDetails, setUpdateChallanFormDetails] = useState(
    initialValuesForChallanForm
  );
  const [updateChallanLoading, setUpdateChallanLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [challanHisotryLoading, setChallanHistoryLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  async function ViewData(leaseNo, landAllotmentId) {
    try {
      const base_url = `${SUDA_API_BASE_URL}/bhubhatak/challan/${landAllotmentId}`;
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
        toast.error("No Data found!", { position: "top-center" });
        return;
      }
      if (
        responseBody?.data?.DemandDetails?.length === 0 ||
        !responseBody?.data?.DemandDetails
      ) {
        toast.error("Demand either not generated or all demands paid!", {
          position: "top-center",
        });
        return;
      }
      let alloteer = [];
      let landeer = [];
      alloteer.push(responseBody?.data?.AllotteeDetail);
      if (alloteer.length > 0) {
        setEachConsumerPersonalData(alloteer);
      }
      landeer.push({
        ...responseBody?.data?.LandDetail,
        registration_date: responseBody?.data?.registration_date,
        demand_amount: responseBody?.data?.demand_amount,
        usage_type: responseBody?.data?.UsageType?.usage_name,
        ward_number: responseBody?.data?.LandDetail?.ward_name,
      });
      console.log("landeer", landeer);
      if (landeer.length > 0) {
        setEachConsumerLandData(landeer);
      }
      if (responseBody?.data?.DemandDetails.length !== 0) {
        setEachConsumerDemandDetails(responseBody?.data?.DemandDetails);
      }
    } catch (error) {
      console.log(error);
    }

    setLeaseNo(leaseNo);
    setViewDetailParams(leaseNo);
    setLandAllotmentId(landAllotmentId);
    setShowPersonalDetails(true);
  }
  async function ViewChallanHistory(landAllotmentId) {
    setChallanHistoryLoading(true);
    try {
      const base_url = `${SUDA_API_BASE_URL}/bhubhatak/challan/${landAllotmentId}/history`;
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
        toast.error("Challan History cannot be fetched!", {
          position: "top-center",
        });
        return;
      }
      if (
        responseBody?.data?.DemandDetails?.length === 0 ||
        !responseBody?.data?.DemandDetails
      ) {
        setEachConsumerChallanHistory([]);
        return;
      }
      let restructredData = [];
      responseBody?.data?.DemandDetails.forEach((data, index) => {
        restructredData.push({
          sl_no: index + 1,
          demand_tenure: data.demand_from + " - " + data.demand_upto,
          challan_doc_link: <i>Uploaded</i>,
        });
      });
      setEachConsumerChallanHistory(restructredData);
    } catch (error) {
      console.log(error);
    } finally {
      setChallanHistoryLoading(false);
    }
  }

  console.log("challan history", eachConsumerChallanHistory);

  //fetching allottee table
  async function CallForData() {
    console.log(userInput);
    if (
      userInput.leaseNo === "" &&
      userInput.name === "" &&
      userInput.mobileNo === "" &&
      userInput.wardNo === ""
    ) {
      toast.error("No records found!", { position: "top-center" });
      return;
    }
    setMainSearchLoading(true);

    console.log(userInput);
    try {
      const base_url = `${SUDA_API_BASE_URL}/bhubhatak/lease?wardNo=${userInput.wardNo}&leaseNumber=${userInput.leaseNo}&mobileNumber=${userInput.mobileNo}&name=${userInput.name}`;
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
      console.log(responseBody);
      if (response?.status === 200) {
        let restructredData = [];
        if (responseBody.data.length === 0) {
          toast.error("No data found!", {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        }
        responseBody.data.forEach((data, index) => {
          restructredData.push({
            Sl_no: index + 1,
            allottee_name: data.AllotteeDetail.name,
            lease_number: data.lease_number,
            area_name: data.LandDetail.area_name,
            ward_number: data.LandDetail.ward_name,
            action: (
              <Button
                className="w-full rounded-sm bg-green-700 py-2"
                onClick={async () => {
                  await ViewData(data.lease_number, data.land_allottment_id)
                    .then(() => ViewChallanHistory(data.land_allottment_id))
                    .catch((error) => console.log(error));
                }}
              >
                View
              </Button>
            ),
          });
        });
        setEligibleConsumerData(restructredData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMainSearchLoading(false);
    }
  }

  function verifyChallanDetails() {
    const {
      demandFrom,
      demandUpto,
      transactionNo,
      paymentDate,
      totalPaidAmount,
      paymentMode,
      challan,
    } = updateChallanFormDetails;

    if (
      demandFrom !== "" &&
      demandUpto !== "" &&
      transactionNo !== "" &&
      paymentDate !== "" &&
      totalPaidAmount !== "" &&
      paymentMode !== "" &&
      challan !== null
    ) {
      return true;
    } else {
      return false;
    }
  }

  async function updateChallan() {
    console.log("updateChallanFormDetails", updateChallanFormDetails);
    if (!landAllotmentId) {
      toast.error("No Land Alottment Id found!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else if (!verifyChallanDetails()) {
      toast.error("Please fill the required fields!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    setUpdateChallanFormDetails({
      ...updateChallanFormDetails,
      landAllotmentId: landAllotmentId,
      paymentDetals: { ...paymentDetails },
    });
    setUpdateChallanLoading(true);
    try {
      var formdata = new FormData();
      formdata.append("demandFrom", updateChallanFormDetails.demandFrom);
      formdata.append("demandUpto", updateChallanFormDetails.demandUpto);
      formdata.append("landAllotmentId", landAllotmentId);
      formdata.append("transactionNo", updateChallanFormDetails.transactionNo);
      formdata.append(
        "paymentDate",
        convertDateToGenericDashFormat(updateChallanFormDetails.paymentDate)
      );
      formdata.append(
        "totalPaidAmount",
        updateChallanFormDetails.totalPaidAmount
      );
      formdata.append("paymentMode", updateChallanFormDetails.paymentMode);
      formdata.append("paymentDetals", { ...paymentDetails });
      formdata.append("remarks", updateChallanFormDetails.remarks);
      formdata.append("challan", updateChallanFormDetails.challan);

      console.log("challan", formdata.get("challan"));

      const base_url = `${SUDA_API_BASE_URL}/bhubhatak/challan/${landAllotmentId}`;
      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      let response = null,
        responseBody = null;
      response = await fetch(base_url, requestOptions);
      responseBody = await response.json();
      console.log(responseBody);
      if (response.status !== 201 && response.status !== 200) {
        toast.error("Challan update failed!", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
      toast.success("Challan Updated Successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setUpdateChallanLoading(false);
      setUpdateChallanFormDetails(initialValuesForChallanForm);
    }
  }

  useEffect(() => {
    console.log("searching...", userInput);
    if (
      userInput.leaseNo !== "" ||
      userInput.name !== "" ||
      userInput.mobileNo !== "" ||
      userInput.wardNo !== ""
    ) {
      setDisabled(false);
    }
  }, [userInput.leaseNo, userInput.name, userInput.mobileNo, userInput.wardNo]);

  function TakeBackToMainPage() {
    setShowPersonalDetails(false);
  }

  return (
    <div>
      <ToastContainer autoClose={2000} />
      {!showPersonalDetails ? (
        <>
          <OrInputBox
            userInput={userInput}
            setUserInput={setUserInput}
            handleSearch={CallForData}
            isloading={mainSearchLoading}
            isDisabled={disabled}
          />
          <div className="my-6" />
          {eligibleConsumerData.length === 0 ? (
            <></>
          ) : (
            <BankReconciliationTable
              tableHeadings={tableHeadings}
              tableRows={eligibleConsumerData}
            />
          )}
        </>
      ) : (
        <>
          <div className="flex justify-end">
            <IconButton className="bg-[#ea4335]" onClick={TakeBackToMainPage}>
              <ArrowUturnLeftIcon className="-mt-px h-5 w-4 font-black text-white " />
            </IconButton>
          </div>
          <BhubhatakPersonalDetails
            AllotteeDetails={eachConsumerPersonalData}
          />
          <BhuBhatakLandDetailsForm LandDetails={eachConsumerLandData} />
          <UpdateChalanForm
            details={updateChallanFormDetails}
            setDetails={setUpdateChallanFormDetails}
            paymentDetails={paymentDetails}
            setPaymentDetails={setPaymentDetails}
            handleSubmit={updateChallan}
            loading={updateChallanLoading}
            demandDetails={eachConsumerDemandDetails}
            setDemandDetails={setEachConsumerDemandDetails}
          />
          {eachConsumerChallanHistory === null ||
          eachConsumerChallanHistory.length < 1 ? (
            <p className="mb-12 mt-5 text-center text-sm font-semibold text-red-700">
              No records found
            </p>
          ) : (
            <BhuBhatakChallanHistory history={eachConsumerChallanHistory} />
          )}
        </>
      )}
    </div>
  );
};

export default MainPageUpdateLastPaymentChallan;
