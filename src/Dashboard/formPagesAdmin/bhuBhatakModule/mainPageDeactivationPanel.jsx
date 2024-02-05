import BankReconciliationTable from "@/Dashboard/resusables/BankReconciliationTable";
import {
  Accordion,
  Button,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import React, { useMemo } from "react";
import { useState } from "react";
import { getCookieByName } from "@/utils/RequireAuth";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ClickAwayListener } from "@mui/base";
import { convertDateToAPIFormat } from "@/utils/commonUtils";
import { ColorRing } from "react-loader-spinner";
import Pagination from "@/Components/Pagination";
const SUDA_API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const activeUsersHeadings = [
  "Sl.No.",
  "Name",
  "Lease Number",
  "Area Name",
  "Ward Number",
  "Action",
];

const inactiveUsersHeadings = [
  "Sl.No.",
  "Name",
  "Lease Number",
  "Area Name",
  "Ward Number",
  "Deactivation date",
  "Action",
];

const MainPageDeactivationPanel = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [inActiveUsers, setInActiveUsers] = useState([]);
  const [activationsearchLoading, setActivationSearchLoading] = useState(false);
  const [DeactivationsearchLoading, setDeactivationSearchLoading] =
    useState(false);
  const [activityLoading, setActivityLoading] = useState(false);
  const [openReasonBox, setOpenReasonBox] = useState(false);
  const [deactivationReason, setDeactivationReason] = useState("");
  const [loadedLandAllotmentId, setLoadedLandAllotmentId] = useState(null);
  const [currentDeActivationPage, setCurrentDeactivationPage] = useState(1);
  const [currentDeactiveOffset, setCurrentDeactiveOffset] = useState(0);
  const [endOfDeActiveNext, setEndOfDeActiveNext] = useState(false);
  const [currentActivationPage, setCurrentActivationPage] = useState(1);
  const [currentActiveOffset, setCurrentActiveOffset] = useState(0);
  const [endOfActiveNext, setEndOfActiveNext] = useState(false);
  const PageSize = 10;
  async function HandleActivateFunction(landAllotmentId) {
    setActivityLoading(true);
    try {
      const base_url = `${SUDA_API_BASE_URL}/bhubhatak/lease/allottee/${landAllotmentId}`;
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
        body: JSON.stringify({
          action: "activate",
          reason: "",
        }),
      };
      let response = null,
        responseBody = null;
      response = await fetch(base_url, requestOptions);
      if (response.status === 200) {
        toast.success("User Activated Successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setActivityLoading(false);
    }
  }

  async function HandleDeactivationFunction() {
    if (!loadedLandAllotmentId || deactivationReason === "") {
      toast.error("To deactivate user, specify reason", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    setActivityLoading(true);
    try {
      const base_url = `${SUDA_API_BASE_URL}/bhubhatak/lease/allottee/${loadedLandAllotmentId}`;
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
        body: JSON.stringify({
          action: "deactivate",
          reason: deactivationReason,
        }),
      };
      let response = null;
      response = await fetch(base_url, requestOptions);
      if (response.status === 200) {
        toast.success("User Deactivated Successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setActivityLoading(false);
      setDeactivationReason("");
      setOpenReasonBox(false);
    }
  }

  //list of active users
  useEffect(() => {
    (async function () {
      setActivationSearchLoading(true);
      console.log("currentActivationPage", currentActivationPage);
      try {
        const base_url = `${SUDA_API_BASE_URL}/bhubhatak/lease/allottees?allotmentStatus=true&pageNumber=${currentActivationPage}&pageSize=${PageSize}`;
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
        console.log("response_active", responseBody);
        if (response.status === 200) {
          let restructredData = [];
          responseBody.data.users.forEach((data, index) => {
            restructredData.push({
              sl_no: index + currentActiveOffset + 1,
              allottee_name: data.AllotteeDetail.name,
              lease_number: data.lease_number,
              area_name: data.LandDetail.area_name,
              ward_number: data.LandDetail.ward_name,
              action: (
                <Button
                  className="w-3/4 rounded-sm bg-green-700 py-2"
                  onClick={() => {
                    setLoadedLandAllotmentId(data.land_allottment_id);
                    setOpenReasonBox(true);
                  }}
                >
                  Deactivate
                </Button>
              ),
            });
          });
          if (restructredData.length !== 0) {
            if (endOfActiveNext) setEndOfActiveNext(false);
            setActiveUsers(restructredData);
          } else {
            setEndOfActiveNext(true);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setActivationSearchLoading(false);
      }
    })();
  }, [currentActivationPage]);

  //list of Inactive users
  useEffect(() => {
    (async function () {
      setDeactivationSearchLoading(true);
      try {
        const base_url = `${SUDA_API_BASE_URL}/bhubhatak/lease/allottees?allotmentStatus=false&pageNumber=${currentDeActivationPage}&pageSize=${PageSize}`;
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
        if (response.status === 200) {
          let restructredData = [];
          responseBody.data.users.forEach((data, index) => {
            restructredData.push({
              sl_no: index + 1,
              allottee_name: data.AllotteeDetail.name,
              lease_number: data.lease_number,
              area_name: data.LandDetail.area_name,
              ward_number: data.LandDetail.ward_name,
              deactivationDate: convertDateToAPIFormat(
                data.consumer_deactivation_timestamp
              ) || <i>Unknown</i>,
              action: (
                <Button
                  className="w-3/4 rounded-sm bg-green-700 py-2"
                  onClick={() =>
                    HandleActivateFunction(data.land_allottment_id)
                  }
                >
                  Activate
                </Button>
              ),
            });
          });

          if (restructredData.length !== 0) {
            if (endOfDeActiveNext) setEndOfDeActiveNext(false);
            setInActiveUsers(restructredData);
          } else {
            setEndOfDeActiveNext(true);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setDeactivationSearchLoading(false);
      }
    })();
  }, [currentDeActivationPage]);

  return (
    <div>
      <ToastContainer autoClose={2000} />
      {openReasonBox && (
        <div className="fixed left-0 top-0 z-50 h-full w-full bg-black/90">
          <ClickAwayListener onClickAway={() => setOpenReasonBox(false)}>
            <div className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 bg-white shadow">
              <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
                <h2 className="text-center text-sm font-semibold text-white">
                  Specify Reason
                </h2>
              </nav>
              <div className="flex h-full w-full flex-col items-start justify-center gap-2.5 p-4">
                <textarea
                  className="h-3/4 w-full resize-none overflow-auto border border-blue-gray-800 bg-gray-100 p-4"
                  placeholder="Write reason here..."
                  value={deactivationReason}
                  onChange={(e) => setDeactivationReason(e.target.value)}
                />
                <Button onClick={HandleDeactivationFunction}>Deactivate</Button>
              </div>
            </div>
          </ClickAwayListener>
        </div>
      )}

      <div className="mt-5 shadow">
        <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
          <h2 className="text-center text-sm font-semibold text-white">
            List of Active Users
          </h2>
        </nav>
        <div className="p-4">
          {activeUsers.length !== 0 ? (
            <>
              {endOfActiveNext ? (
                <p className="mx-auto my-2 text-sm font-semibold text-gray-700">
                  No more records!
                </p>
              ) : (
                <BankReconciliationTable
                  tableHeadings={activeUsersHeadings}
                  tableRows={activeUsers}
                />
              )}

              <div className="mb-5 flex items-center justify-center gap-4">
                <Button
                  onClick={() => {
                    if (currentActivationPage === 1) return;
                    setCurrentActivationPage(currentActivationPage - 1);
                    setCurrentActiveOffset(currentActiveOffset - PageSize);
                  }}
                >
                  Prev
                </Button>
                <Button
                  onClick={() => {
                    if (!endOfActiveNext) {
                      setCurrentActivationPage(currentActivationPage + 1);
                      setCurrentActiveOffset(currentActiveOffset + PageSize);
                    }
                  }}
                >
                  Next
                </Button>
              </div>
            </>
          ) : activationsearchLoading ? (
            <ColorRing
              visible={true}
              height="40"
              width="40"
              colors={["#2fa158", "#2fa158", "#2fa158", "#2fa158", "#2fa158"]}
            />
          ) : (
            <p className="mx-auto my-2 text-sm font-semibold text-gray-700">
              No records found!
            </p>
          )}
        </div>
      </div>
      <div className="mb-12 mt-5 shadow">
        <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
          <h2 className="text-center text-sm font-semibold text-white">
            List of Deactivated Users
          </h2>
        </nav>
        <div className="p-4">
          {inActiveUsers.length !== 0 ? (
            <>
              {endOfDeActiveNext ? (
                <p className="mx-auto my-2 text-sm font-semibold text-gray-700">
                  No more records!
                </p>
              ) : (
                <BankReconciliationTable
                  tableHeadings={inactiveUsersHeadings}
                  tableRows={inActiveUsers}
                />
              )}

              <div className="mb-5 flex items-center justify-center gap-4">
                <Button
                  onClick={() => {
                    if (currentDeActivationPage === 1) return;
                    setCurrentDeactivationPage(currentDeActivationPage - 1);
                    setCurrentDeactiveOffset(currentDeactiveOffset - PageSize);
                  }}
                >
                  Prev
                </Button>
                <Button
                  onClick={() => {
                    if (!endOfDeActiveNext) {
                      setCurrentDeactivationPage(currentDeActivationPage + 1);
                      setCurrentDeactiveOffset(
                        currentDeactiveOffset + PageSize
                      );
                    }
                  }}
                >
                  Next
                </Button>
              </div>
            </>
          ) : DeactivationsearchLoading ? (
            <ColorRing
              visible={true}
              height="40"
              width="40"
              colors={["#2fa158", "#2fa158", "#2fa158", "#2fa158", "#2fa158"]}
            />
          ) : (
            <p className="mx-auto my-2 text-sm font-semibold text-gray-700">
              No records found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPageDeactivationPanel;
