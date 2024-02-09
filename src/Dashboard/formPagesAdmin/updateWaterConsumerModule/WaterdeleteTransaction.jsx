import { Option, Select, Tooltip } from "@material-tailwind/react";
import React, { useState } from "react";
import DeleteTransactionForm from "../Components/DeleteTransactionForm/index.jsx";
import DetailsSection from "../Components/DetailsSection/index.jsx";
import { getCookieByName } from "@/utils/RequireAuth.jsx";
import FloatingMessage from "@/utils/floatingMessage";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const WaterdeleteTransaction = () => {
  const [isConsumerCreationInSuccessful, setIsConsumerCreationInSuccessful] =
    useState(null);

  const [message, setMessage] = useState("");
  const [fileError, setFileError] = useState(null);

  const [wordCount, setWordCount] = useState(0);
  const closeFloatingMessage = () => {
    setIsConsumerCreationInSuccessful(null);
    setFileError(null);
  };

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [justification, setJustification] = useState("");
  const [approvalLetter, setApprovalLetter] = useState(null);

  const [searchQueryObj, setSearchQueryObj] = useState({
    transaction_no: "",
  });

  const handleSearchQueryObjChange = (event) => {
    event.preventDefault();
    if (event?.target?.id) {
      setSearchQueryObj((prevState) => {
        return {
          [event.target.id]: event.target.value,
        };
      });
    }
  };

  const updateWordCount = (content) => {
    const words = content.split(/\s+/).filter((word) => word.length > 0);
    if (wordCount > 100) {
      setFileError(true);
    } else {
      setFileError(false);
    }
    setWordCount(words.length);
  };

  const handleJustification = (e) => {
    setJustification(e.target.value);
    const content = e.target.value;
    updateWordCount(content);
  };

  const handleJustificationKeyDown = (e) => {
    if (e.key === "Backspace") {
      const content = e.target.value;
      updateWordCount(content);
    }
  };

  const handleDelete = async (event, data) => {
    event.preventDefault();
    const userID = getCookieByName("SUDA_USER_ID");
    console.log(userID);
    const formData = new FormData();
    formData.append("consumerId", data.consumerid);
    formData.append("wardId", data.ward_id);
    formData.append("justification", justification);
    formData.append("userId", userID);
    formData.append("letter", approvalLetter);
    console.log(formData);
    let response = null,
      responseBody = null;
    try {
      const url = `${BACKEND_BASE_URL}/watermanagement/transaction/${searchQueryObj.transaction_no}`;
      const requestOptions = {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}` },
        body: formData,
      };
      response = await fetch(url, requestOptions);
      if (response?.status === 204 || response?.status === "204") {
        setJustification("");
        setApprovalLetter(null);
        setIsConsumerCreationInSuccessful(true);
        setShowModal(false);
        setData(null);
        document.getElementById("transaction_no").value = "";
      } else {
        responseBody = await response.json();
        setIsConsumerCreationInSuccessful(false);
        setMessage(responseBody?.data);
      }
    } catch (err) {
      console.log(err);
      setIsConsumerCreationInSuccessful(false);
      setMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConsumerCreationInSuccessful(null);
    setShowModal(true);
    try {
      const url = `${BACKEND_BASE_URL}/watermanagement/transaction/${searchQueryObj.transaction_no}`;
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
      if (response?.status == "200") {
        setData(responseBody.data);
        console.log(data);
      } else {
        setShowModal(false);
        setMessage(responseBody.data);
        setIsConsumerCreationInSuccessful(false);
      }
    } catch (err) {
      setMessage(responseBody.data);
      setShowModal(false);
      setIsConsumerCreationInSuccessful(false);
    }
  };

  return (
    <div className="relative mb-10 mt-10 flex flex-col justify-center overflow-hidden">
      <div className="m-auto w-full rounded-md border border-gray-500 bg-white px-0 pb-4 pt-0 lg:max-w-full">
        <nav className="navcustomproperty relative mb-2 flex flex-wrap items-center justify-between rounded-lg py-2 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
          <h2 className="text-center text-sm font-semibold text-white">
            Water Delete Transaction
          </h2>
        </nav>
        <div>
          {" "}
          <form className="mt-4" onSubmit={(e) => handleSubmit(e)}>
            <div className="m-4 flex flex-row  rounded-none bg-white px-4 pb-4 pt-0 md:flex-row lg:max-w-full">
              <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit">
                <label
                  className=" mb-2  mt-1 block w-[15rem] text-sm font-bold text-gray-700 "
                  htmlFor="transaction_no"
                >
                  Enter Transaction No.
                </label>
                <Tooltip
                  className={`text-black-900 inline w-64 bg-red-300 text-xs 
                     ${true == false ? `` : `hidden`}`}
                  placement="top"
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <input
                    onChange={handleSearchQueryObjChange}
                    id="transaction_no"
                    className="bg-white-200 text-white-700 w-72 appearance-none rounded border border-gray-500 px-4 py-2 leading-tight focus:border-2 focus:border-gray-500 focus:bg-white focus:outline-none"
                    type="text"
                    placeholder="Transaction No."
                  />
                </Tooltip>
              </div>
              <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit">
                <button
                  className="mx-6 rounded bg-blue-400 px-4 py-1 font-bold text-white hover:bg-blue-700"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>{" "}
        {showModal == true && data != null ? (
          <>
            <form className="mt-4 ">
              <div className="m-4 rounded-none  bg-white px-0  pb-4 pt-0 lg:max-w-full">
                <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-lg py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
                  <h2 className="text-center text-sm font-semibold text-white">
                    Owner Details
                  </h2>
                </nav>
                <div className="flex w-full flex-col justify-between">
                  <div className="mx-2 mt-1 flex flex-row justify-between">
                    <div className="mx-2 mt-1 flex flex-row justify-between">
                      <label
                        className="mb-2 block text-sm text-gray-700 md:w-32"
                        htmlFor="password"
                      >
                        Holding No.
                      </label>
                      <span className="text-sm font-semibold text-gray-600">
                        : &nbsp; {data.holding_no ? data.holding_no : "N/A"}
                      </span>
                    </div>
                    <div className="mx-2 mt-1 flex flex-row  md:w-1/2">
                      <label
                        className="mb-2 block text-sm text-gray-700 md:w-32"
                        htmlFor="password"
                      >
                        Ward No.
                      </label>
                      <span className="text-sm font-semibold text-gray-600">
                        : &nbsp; {data.ward_id ? data.ward_id : "N/A"}
                      </span>
                    </div>
                  </div>
                  <hr className="mx-2 mt-1  bg-gray-400" />
                  <div className="mx-2 mt-1 flex flex-row justify-between">
                    <div className="mx-2 mt-1 flex flex-row justify-between">
                      <label
                        className="mb-2 block text-sm text-gray-700 md:w-32"
                        htmlFor="password"
                      >
                        Consumer Number
                      </label>
                      <span className="text-sm font-semibold text-gray-600">
                        : &nbsp; {data.consumer_no ? data.consumer_no : "N/A"}
                      </span>
                    </div>
                    <div className="mx-2 mt-1 flex flex-row md:w-1/2">
                      <label
                        className="mb-2 block text-sm text-gray-700 md:w-32"
                        htmlFor="password"
                      >
                        Consumer Name
                      </label>
                      <span className="text-sm font-semibold text-gray-600">
                        : &nbsp;{" "}
                        {data.consumer_name ? data.consumer_name : "N/A"}
                      </span>
                    </div>
                  </div>
                  <hr className="mx-2 mt-1  bg-gray-400" />
                  <div className="mx-2 mt-1 flex flex-row justify-between">
                    <div className="mx-2 mt-1 flex flex-row justify-between">
                      <label
                        className="mb-2 block text-sm text-gray-700 md:w-32"
                        htmlFor="password"
                      >
                        Address
                      </label>
                      <span className="text-sm font-semibold text-gray-600">
                        : &nbsp;{" "}
                        {data.property_address ? data.property_address : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <form className="mt-4 ">
              <div className="m-4 rounded-none border border-gray-500 bg-white px-0  pb-4 pt-0 lg:max-w-full">
                <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
                  <h2 className="text-center text-sm font-semibold text-white">
                    Details of Transaction No.{" "}
                    {data.transaction_no
                      ? data.transaction_no.replace("'", "")
                      : "N/A"}
                  </h2>
                </nav>
                <div className="flex w-full flex-col justify-between">
                  <div className="mx-2 mt-1 flex flex-row justify-between">
                    <div className="mx-2 mt-1 flex flex-row justify-between">
                      <label
                        className="mb-2 block text-sm text-gray-700 md:w-32"
                        htmlFor="password"
                      >
                        Transaction No.
                      </label>
                      <span className="text-sm font-semibold text-gray-600">
                        : &nbsp;{" "}
                        {data.transaction_no
                          ? data.transaction_no.replace("'", "")
                          : "N/A"}
                      </span>
                    </div>
                    <div className="mx-2 mt-1 flex flex-row  md:w-1/2">
                      <label
                        className="mb-2 block text-sm text-gray-700 md:w-32"
                        htmlFor="password"
                      >
                        Transaction Date
                      </label>
                      <span className="text-sm font-semibold text-gray-600">
                        : &nbsp;{" "}
                        {data.transaction_date ? data.transaction_date : "N/A"}
                      </span>
                    </div>
                  </div>
                  <hr className="mx-2 mt-1  bg-gray-400" />
                  <div className="mx-2 mt-1 flex flex-row justify-between">
                    <div className="mx-2 mt-1 flex flex-row justify-between">
                      <label
                        className="mb-2 block text-sm text-gray-700 md:w-32"
                        htmlFor="password"
                      >
                        Total Paid Amount
                      </label>
                      <span className="text-sm font-semibold text-gray-600">
                        : &nbsp;{" "}
                        {data.payable_amount ? data.payable_amount : "N/A"}
                      </span>
                    </div>
                    <div className="mx-2 mt-1 flex flex-row md:w-1/2">
                      <label
                        className="mb-2 block text-sm text-gray-700 md:w-32"
                        htmlFor="password"
                      >
                        Payment Mode
                      </label>
                      <span className="text-sm font-semibold text-gray-600">
                        : &nbsp; {data.payment_mode ? data.payment_mode : "N/A"}
                      </span>
                    </div>
                  </div>
                  <hr className="mx-2 mt-1  bg-gray-400" />
                  <div className="mx-2 mt-1 flex flex-row justify-between">
                    <div className="mx-2 mt-1 flex flex-row justify-between">
                      <label
                        className="mb-2 block text-sm text-gray-700 md:w-32"
                        htmlFor="password"
                      >
                        Bank Name
                      </label>
                      <span className="text-sm font-semibold text-gray-600">
                        : &nbsp; {data.bank_name ? data.bank_name : "N/A"}
                      </span>
                    </div>
                    <div className="mx-2 mt-1 flex flex-row md:w-1/2">
                      <label
                        className="mb-2 block text-sm text-gray-700 md:w-32"
                        htmlFor="password"
                      >
                        Branch Name
                      </label>
                      <span className="text-sm font-semibold text-gray-600">
                        : &nbsp; {data.branch_name ? data.branch_name : "N/A"}
                      </span>
                    </div>
                  </div>
                  <hr className="mx-2 mt-1  bg-gray-400" />
                  <div className="mx-2 mt-1 flex flex-row justify-between">
                    <div className="mx-2 mt-1 flex flex-row justify-between">
                      <label
                        className="mb-2 block text-sm text-gray-700 md:w-32"
                        htmlFor="password"
                      >
                        DD/Cheque No.
                      </label>
                      <span className="text-sm font-semibold text-gray-600">
                        : &nbsp; {data.chq_dd_no ? data.chq_dd_no : "N/A"}
                      </span>
                    </div>
                    <div className="mx-2 mt-1 flex flex-row md:w-1/2">
                      <label
                        className="mb-2 block text-sm text-gray-700 md:w-32"
                        htmlFor="password"
                      >
                        DD/Cheque Date
                      </label>
                      <span className="text-sm font-semibold text-gray-600">
                        : &nbsp; {data.chq_dd_dte ? data.chq_dd_dte : "N/A"}
                      </span>
                    </div>
                  </div>
                  <hr className="mx-2 mt-1  bg-gray-400" />
                  <div className="mx-2 mt-1 flex flex-row justify-between">
                    <div className="mx-2 mt-1 flex flex-row justify-between">
                      <label
                        className="mb-2 block text-sm text-gray-700 md:w-32"
                        htmlFor="password"
                      >
                        Transaction By
                      </label>
                      <span className="text-sm font-semibold text-gray-600">
                        : &nbsp;{" "}
                        {data.consumer_name ? data.consumer_name : "N/A"}
                      </span>
                    </div>
                  </div>
                  <hr className="mx-2 mt-1  bg-gray-400" />
                  <div className="mx-2 mt-1 flex flex-row">
                    <label
                      className="mx-2 mb-2 block text-sm text-gray-700 md:w-32"
                      htmlFor="password"
                    >
                      Approval Letter:
                      <span className="contents text-sm font-bold text-red-600">
                        *
                      </span>
                    </label>
                    <input
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file && file.size <= 1024 * 1024) {
                          setApprovalLetter(file);
                        } else {
                          alert(
                            "The file size exceeds the maximum limit of 1 MB."
                          );
                          e.target.value = null;
                        }
                      }}
                      className="form-control m-0
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
                      accept=".png, .jpg, .jpeg, .pdf"
                      id="approvalLetter"
                    />
                  </div>
                  <hr className="mx-2 mt-1  bg-gray-400" />
                  <div className="mx-2 mt-1 flex flex-row">
                    <label
                      className="mx-2 mb-2 block text-sm text-gray-700 md:w-32"
                      htmlFor="password"
                    >
                      Justification (Max 100 Words):
                    </label>
                    <textarea
                      onChange={handleJustification}
                      onKeyDown={handleJustificationKeyDown}
                      className="form-control m-0 rounded border border-solid border-gray-400 bg-white bg-clip-padding px-3 py-2 text-xs font-normal text-gray-900 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                      type="text"
                      rows={5}
                      cols={100}
                      id="justification"
                    />
                  </div>
                  <span className="w-96 text-center text-sm font-semibold text-gray-600">
                    Word(s) : {wordCount}
                  </span>
                  {fileError === true && (
                    <FloatingMessage
                      message={`Justification Count Exceeded 100 words`}
                      showMessage={true}
                      closeFloatingMessage={closeFloatingMessage}
                      color={`red`}
                    />
                  )}
                </div>
                <div className="my-5 flex flex-row justify-center">
                  <button
                    className="rounded bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
                    type="button"
                    onClick={(e) => handleDelete(e, data)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </form>{" "}
          </>
        ) : null}
        {isConsumerCreationInSuccessful === true && (
          <FloatingMessage
            message={`Transaction has been deleted successfully`}
            showMessage={true}
            closeFloatingMessage={closeFloatingMessage}
            color={`green`}
          />
        )}
        {isConsumerCreationInSuccessful === false && (
          <FloatingMessage
            message={`Something went wrong, ${message}`}
            showMessage={true}
            closeFloatingMessage={closeFloatingMessage}
            color={`red`}
          />
        )}
      </div>
    </div>
  );
};

export default WaterdeleteTransaction;
