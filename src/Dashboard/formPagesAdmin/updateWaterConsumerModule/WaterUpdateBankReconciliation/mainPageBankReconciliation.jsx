import BankReconciliationForm from "@/Dashboard/resusables/BankReconciliationForm";
import BankReconciliationTable from "@/Dashboard/resusables/BankReconciliationTable";
import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { getCookieByName } from "@/utils/RequireAuth";
import { convertDateToAPIFormat } from "@/utils/commonUtils";
import WaterUpdateBankReconciliationDetailedView from "./WaterUpdateBankReconciliationDetailedView";
import Pagination from "@/Components/Pagination";
import { useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
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
  "View",
];

const initialValuesForSearch = {
  fromDate: "",
  page: 0,
  paymentMode: "",
  size: 50,
  toDate: "",
};

const MainPageWaterBankReconciliation = () => {
  const [isDetailedViewOpen, setIsDetailedViewOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [otherDetails, setOtherDetails] = useState(null);
  const [clearStatus, setClearStatus] = useState("");
  const [viewLoading, setViewLoading] = useState(false);
  const PageSize = 25;

  const viewDetailsPage = async (transactionNo) => {
    setViewLoading(true);
    try {
      const base_url = `${SUDA_API_BASE_URL}/watermanagement/transaction/${transactionNo}`;
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
    } finally {
      setViewLoading(false);
    }
  };

  // data fetcher function
  async function fetchData(userInput) {
    console.log(userInput);
    setSearchLoading(true);
    try {
      const base_url = `${SUDA_API_BASE_URL}/watermanagement/transactions/reconcile?fromDate=${convertDateToAPIFormat(
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
            consumer_name: data.name,
            trans_date: data.transaction_date,
            trans_no: data.transaction_no,
            mode: data.payment_mode,
            cheque_no: data.chq_dd_no,
            bank_name: data.bank_name,
            payable_amt: data.payable_amount,
            tax_collector: data.user_name || <i>Not Mentioned</i>,
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
        setTableData(restructredData);
        setCurrentPage(1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  }

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return tableData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, tableData]);

  console.log(currentTableData);

  console.log("otherDetails", otherDetails);

  //update clearance status function
  async function UpdateClearanceStatus() {
    try {
      const userId = getCookieByName("SUDA_USER_ID");
      const base_url = `${SUDA_API_BASE_URL}/watermanagement/transaction/reconcile`;
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

  return !isDetailedViewOpen ? (
    <div>
      <BankReconciliationForm searchLoading={searchLoading} callDesignatedSearchApiFunction={fetchData} />
      {tableData.length !== 0 && (
        <BankReconciliationTable
          tableHeadings={RowHeadings}
          tableRows={currentTableData}
        />
      )}

      <div className="mb-12 flex flex-col items-center justify-center">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={tableData.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  ) : (
    <div>
      <ToastContainer autoClose={2000} />
      <WaterUpdateBankReconciliationDetailedView
        setIsDetailedViewOpen={setIsDetailedViewOpen}
        details={otherDetails}
        setClearStatus={setClearStatus}
        module="WATER"
      />
      <div className="mb-12 justify-center lg:flex">
        <Button onClick={UpdateClearanceStatus}>Update Clearance Status</Button>
      </div>
    </div>
  );
};

export default MainPageWaterBankReconciliation;
