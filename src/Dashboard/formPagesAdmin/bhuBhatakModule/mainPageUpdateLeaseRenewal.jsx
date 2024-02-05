import BankReconciliationTable from "@/Dashboard/resusables/BankReconciliationTable";
import OrInputBox from "@/Dashboard/resusables/OrInputBox";
import { getCookieByName } from "@/utils/RequireAuth";
import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { CirclesWithBar, ColorRing } from "react-loader-spinner";
import { useState } from "react";
import BhubhatakPersonalDetails from "@/Dashboard/resusables/BhubhatakPersonalDetails";
import BhuBhatakLandDetailsForm from "@/Dashboard/resusables/BhuBhatakLandDetailsForm";
import BhuBhatakLeaseHistory from "@/Dashboard/resusables/BhuBhatakLeaseHistory";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
const SUDA_API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const tableHeadings = [
  "Sl.No",
  "Allotee Name",
  "Mobile Number",
  "Lease Number",
  "Area Name",
  "Ward Number",
  "Registration Date",
  "Land Allotment Id",
  "Action",
];

const MainPageUpdateLeaseRenewal = () => {
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [leaseNo, setLeaseNo] = useState(null);
  const [landAllotmentId, setLandAllotmentId] = useState(null);
  const [viewDetailParams, setViewDetailParams] = useState(null);
  const [mainsearchLoading, setMainSearchLoading] = useState(false);
  const [renewLeaseLoading, setRenewLeaseLoading] = useState(false);
  const [eligibleConsumerData, setEligibleConsumerData] = useState([]);
  const [eachConsumerPersonalData, setEachConsumerPersonalData] =
    useState(null);
  const [eachConsumerLandData, setEachConsumerLandData] = useState(null);
  const [eachConsumerleaseHistory, setEachConsumerleaseHistory] =
    useState(null);
  const [userInput, setUserInput] = useState({
    name: null,
    wardNo: null,
    leaseNo: null,
    mobileNo: null,
  });
  const [renewedList, setRenewedList] = useState([]);

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
      if (!responseBody.data) {
        toast.error("No Data can be fetched!", { position: "top-center" });
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
    } catch (error) {
      console.log(error);
    }

    setLeaseNo(leaseNo);
    setViewDetailParams(leaseNo);
    setLandAllotmentId(landAllotmentId);
    setShowPersonalDetails(true);
  }

  async function CallForData() {
    console.log(userInput);
    setMainSearchLoading(true);
    try {
      const base_url = `${SUDA_API_BASE_URL}/bhubhatak/lease/renewals/?name=${`${userInput.name}`}&leaseNumber=${
        userInput.leaseNo
      }&wardNumber=${userInput.wardNo}&mobileNumber=${userInput.mobileNo}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
          mode: "no-cors",
        },
      };
      let response = null;
      let responseBody = null;
      response = await fetch(base_url, requestOptions);
      responseBody = await response.json();
      console.log(responseBody);
      if (response?.status === 200) {
        let restructredData = [];
        if (responseBody.data.length === 0) {
          toast.error("No records found!", {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        }
        responseBody?.data?.forEach((data, index) => {
          restructredData.push({
            Sl_no: index + 1,
            allottee_name: data.allottee_name,
            mobile_number: data.mobile_number,
            lease_number: data.lease_number,
            area_name: data.area_name,
            ward_number: data?.ward_name,
            registration_date: data.registration_date,
            land_allotment_id: data.land_allottment_id,
            action: (
              <Button
                className="w-full rounded-sm bg-green-700 py-2"
                onClick={() =>
                  ViewData(data.lease_number, data.land_allottment_id)
                }
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

  function TakeBackToMainPage() {
    setShowPersonalDetails(false);
  }

  // fetching lease history
  useEffect(() => {
    if (landAllotmentId) {
      (async () => {
        try {
          const base_url = `${SUDA_API_BASE_URL}/bhubhatak/lease/${landAllotmentId}/renewal`;
          const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
              mode: "no-cors",
            },
          };
          let response = null,
            responseBody = null;
          response = await fetch(base_url, requestOptions);
          responseBody = await response.json();
          console.log("lease history", responseBody);
          if (response.status === 200) {
            if (
              !responseBody?.data?.message &&
              responseBody?.data?.length !== 0
            ) {
              let restructredData = [];
              responseBody?.data?.forEach((data, index) => {
                restructredData.push({
                  sl_no: index + 1,
                  date_of_renewal: data.date_of_renewal,
                  renewal_effective_upto: data.renewal_effective_upto,
                });
              });
              setEachConsumerleaseHistory(restructredData);
            }
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [landAllotmentId]);

  async function RenewLeaseFunction() {
    if (landAllotmentId === null) {
      toast.error("Land Allotmnet Id not found!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    try {
      setRenewLeaseLoading(true);
      const base_url = `${SUDA_API_BASE_URL}/bhubhatak/lease/${landAllotmentId}/renewal`;
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
      };
      let response = null,
        responseBody = null;
      response = await fetch(base_url, requestOptions);
      responseBody = await response.json();
      if (response.status === 201) {
        toast.success("Lease Renewed!", {
          position: "top-center",
        });
        setRenewedList([...renewedList, landAllotmentId]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRenewLeaseLoading(false);
    }
  }

  return (
    <div>
      <ToastContainer autoClose={2000} />
      {!showPersonalDetails ? (
        <>
          <OrInputBox
            setUserInput={setUserInput}
            userInput={userInput}
            handleSearch={CallForData}
            isloading={mainsearchLoading}
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
          {eachConsumerleaseHistory && (
            <BhuBhatakLeaseHistory history={eachConsumerleaseHistory} />
          )}
          <div className="justify-centre mb-12 w-full items-center gap-2 p-4 lg:flex">
            <Button
              style={
                renewedList.includes(landAllotmentId)
                  ? { cursor: "no-drop" }
                  : null
              }
              onClick={() => {
                if (renewedList.includes(landAllotmentId)) {
                  toast.success("Lease already renewed!", {
                    position: "top-center",
                  });
                  return;
                } else {
                  RenewLeaseFunction();
                }
              }}
              disabled={
                renewLeaseLoading || renewedList.includes(landAllotmentId)
                  ? true
                  : false
              }
            >
              Renew Lease
            </Button>
            {renewLeaseLoading && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                colors={["#2fa158", "#2fa158", "#2fa158", "#2fa158", "#2fa158"]}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MainPageUpdateLeaseRenewal;
