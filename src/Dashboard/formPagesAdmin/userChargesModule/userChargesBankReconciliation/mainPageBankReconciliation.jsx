import BankReconciliationForm from "@/Dashboard/resusables/BankReconciliationForm";
import BankReconciliationTable from "@/Dashboard/resusables/BankReconciliationTable";
import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { getCookieByName } from "@/utils/RequireAuth";
import { convertDateToAPIFormat } from "@/utils/commonUtils";
import MainPageBankReconciliationDetailedView from "./mainPageBankReconciliationDetailedView";

import { toast, ToastContainer } from "react-toastify";
import Pagination from "@/Components/Pagination";
import userData from "@/data/user-login";
import { useMemo } from "react";
import WaterUpdateBankReconciliationDetailedView from "../../updateWaterConsumerModule/WaterUpdateBankReconciliation/WaterUpdateBankReconciliationDetailedView";
const SUDA_API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const RowHeadings = [
  "Id",
  "Ward no",
  "Consumer No",
  "Consumer Name",
  "Trans Date",
  "Trans No",
  "Mode",
  "Cheque/DD No",
  "Bank",
  "Amount",
  "Tax Collector",
  "Status",
  "View",
];

const initialValuesForSearch = {
  fromDate: "",
  paymentMode: "",
  toDate: "",
};

const MainPageUserChargesBankReconciliation = () => {
  const [isDetailedViewOpen, setIsDetailedViewOpen] = useState(false);
  const [BankReconciliationTableData, setBankReconciliationTableData] =
    useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState();
  const [otherDetails, setOtherDetails] = useState(null);
  const [clearStatus, setClearStatus] = useState("");
  const PageSize = 25;

  async function FetchTableData(userInput) {
    console.log(userInput);
    setSearchLoading(true);
    try {
      const base_url = `${SUDA_API_BASE_URL}/wastemanagement/transactions/reconcile?fromDate=${convertDateToAPIFormat(
        userInput.fromDate
      )}&toDate=${convertDateToAPIFormat(userInput.toDate)}&paymentMode=${
        userInput.paymentMode
      }`;
      var requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
        redirect: "follow",
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
            ward_no: data.ward_name,
            consumer_id: data.transaction_master_id,
            consumer_name: data.consumer_name,
            trans_date: data.transaction_date,
            trans_no: data.transaction_no,
            mode: data.payment_mode,
            cheque_no: data.cheque_no,
            bank_name: data.bank_name,
            payable_amt: data.payable_amt,
            tax_collector: data.name || <i>Not Mentioned</i>,
            status:
              data.cleared_stampdate === "" ? <i>Pending</i> : <i>Approved</i>,
            action: (
              <Button
                className="w-full rounded-sm bg-green-700 py-2"
                onClick={() => viewDetailsPage(data?.transaction_no)}
              >
                View
              </Button>
            ),
          });
        });
        setBankReconciliationTableData(restructredData);
        setCurrentPage(1);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setSearchLoading(false);
    }
  }

  const viewDetailsPage = async (transactionNo) => {
    try {
      const base_url = `${SUDA_API_BASE_URL}/wastemanagement/transaction/${transactionNo}`;
      var requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
        redirect: "follow",
      };

      let response = null,
        responseBody = null;
      response = await fetch(base_url, requestOptions);
      responseBody = await response.json();
      console.log(responseBody);
      if (response?.status !== 200) {
        toast.error("No records found!", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
      setOtherDetails(responseBody?.data);
      setIsDetailedViewOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return BankReconciliationTableData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, BankReconciliationTableData]);

  //update clearance status function
  async function UpdateClearanceStatus() {
    try {
      const userId = getCookieByName("SUDA_USER_ID");
      console.log(userId);
      const base_url = `${SUDA_API_BASE_URL}/wastemanagement/transaction/reconcile`;
      var requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
        redirect: "follow",
        body: JSON.stringify({
          transactionDetailsId: otherDetails.transaction_details_id,
          transactionMasterId: otherDetails.transactionid,
          userId: userId,
          clearStatus: clearStatus,
          paymentMode: otherDetails.payment_mode,
        }),
      };

      let response = null,
        responseBody = null;
      response = await fetch(base_url, requestOptions);
      responseBody = await response.json();
      if (response.status === 200) {
        if (responseBody.success) {
          toast.success("Updated Clearance Status Successfully!", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error("Updation of Clearance status failed!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ToastContainer autoClose={2000} />
      {!isDetailedViewOpen ? (
        <div>
          <BankReconciliationForm
            searchLoading={searchLoading}
            callDesignatedSearchApiFunction={FetchTableData}
          />
          {BankReconciliationTableData.length !== 0 && (
            <>
              <BankReconciliationTable
                tableHeadings={RowHeadings}
                tableRows={currentTableData}
              />
              <div className="mb-12 flex flex-col items-center justify-center">
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={BankReconciliationTableData.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <div>
          <WaterUpdateBankReconciliationDetailedView
            setIsDetailedViewOpen={setIsDetailedViewOpen}
            details={otherDetails}
            setClearStatus={setClearStatus}
            module="WASTE"
          />
          <div className="mb-12 justify-center lg:flex">
            <Button onClick={UpdateClearanceStatus}>
              Update Clearance Status
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default MainPageUserChargesBankReconciliation;
