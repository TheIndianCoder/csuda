import React from "react";
import { Select, Option } from "@material-tailwind/react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import { ColorRing } from "react-loader-spinner";
import { useMaterialTailwindController } from "@/Dashboard/context";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ExportToExcel } from "@/utils/commonComponents";
import ReactPaginate from "react-paginate";
import Table from "../../utils/Table";
import "react-toastify/dist/ReactToastify.css";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const ArrearAndCurrentCollection = () => {
  const [inputData, setInputData] = useState({
    fromDate: "",
    toDate: "",
    wardId: "",
  });

  const [counterCollectionReportObj, setCounterCollectionReportObj] =
    useState(null);
  const [loader, setLoader] = useState(false);
  const [controller, dispatch] = useMaterialTailwindController();
  const [totalCollectionAmount, setTotalCollectionAmount] = useState("");
  const [totalBounce, settotalBounce] = useState("");
  const [netCollection, setnetCollection] = useState("");
  const [dataForExport, setDataForExport] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState([]);
  const { safAllInputFromAPI } = controller;

  let handlePrintToPDF = () => {
    let printwin = window.open("");
    printwin.document.write(document.getElementById("print_section").innerHTML);
    copyStyles(window.document, printwin.document);
    printwin.print();
  };

  const copyStyles = (src, dest) => {
    Array.from(src.styleSheets).forEach((styleSheet) => {
      dest.head.appendChild(styleSheet.ownerNode.cloneNode(true));
    });
    Array.from(src.fonts).forEach((font) => dest.fonts.add(font));
  };

  function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${year}-${month}-${day}`;
  }

  const handleSearch = async () => {
    setLoader(true);

    const baseParams = {
      fromDate: inputData.fromDate,
      toDate: inputData.toDate,
    };

    if (inputData.wardId !== "All") {
      baseParams.wardId = inputData.wardId;
    }

    try {
      const url = `${BACKEND_BASE_URL}/reports`;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportIdentifier: "waste_currentand_arrear_collection",
          params: baseParams,
        }),
      };
      let response = null,
        responseBody = null;
      response = await fetch(url, requestOptions);

      console.log(response.data);

      responseBody = await response.json();
      setCounterCollectionReportObj(responseBody?.data);
      setnetCollection(responseBody?.netCollection);
      setTotalCollectionAmount(
        Number(responseBody.data[1][0].current_collection) +
          Number(responseBody.data[0][0].advance_collection)
      );
      settotalBounce(responseBody?.totalBounce);
      setCounterCollectionReportObj(response?.data.data);
      setnetCollection(response?.data.netCollection);
      setTotalCollectionAmount(
        Number(response.data[1][0].current_collection) +
          Number(response.data[0][0].advance_collection)
      );
      settotalBounce(response?.totalBounce);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    console.log(counterCollectionReportObj, "test");
  }, [counterCollectionReportObj]);

  //   const url = `${BACKEND_BASE_URL}/reports`;
  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
  //     },
  //     body: JSON.stringify({
  //       requestData,
  //     }),
  //   };
  //   let response = null,
  //     responseBody = null;
  //   response = await fetch(url, requestOptions);
  //   responseBody = await response.json();
  //   console.log(response, responseBody);
  //   if (response?.status == "200") {
  //     console.log("responseBody =============");
  //     console.log(responseBody);

  //     setLoader(false);
  //   } else {
  //     toast.error("Please try again", {
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //     setCounterCollectionReportObj(null);
  //     setLoader(false);
  //   }
  // } catch (err) {
  //   console.error(err);
  //   toast.error(err, {
  //     position: toast.POSITION.TOP_CENTER,
  //   });
  //   setCounterCollectionReportObj(null);
  //   setLoader(false);
  // } finally {
  //   setLoader(false);
  // }
  // setLoader(false);
  // };

  useEffect(() => {
    console.log(data, "table");
    if (data?.length > 0) {
      let dataForExportToExcel = data?.map((item, index) => {
        console.log(item);
        return {
          "Ward No": item?.ward_name,
          "Arrear Collection.": item?.arrear_collection,
          // "Current Collection.":  item?.[1][0]?.current_collection === null ? 'NA' : item?.[1][0]?.current_collection,
          "Current Collection.":
            item?.current_collection === "" ? "NA" : item?.current_collection,
          "Advance Collection":
            item?.advance_collection === "" ? "NA" : item?.advance_collection,
          "Total Collection.": item?.total_collection,
          // "Total Collection.": item[0]?.current_collection !== null ?  item[0]?.advance_collection !== null
          // ? (item[0]?.current_collection) + (item[0]?.advance_collection) : item[0]?.current_collection : item[0]?.advance_collection
        };
      });
      setDataForExport(dataForExportToExcel);
    }
  }, [data]);

  useEffect(() => {
    if (counterCollectionReportObj !== null) {
      // console.log(counterCollectionReportObj);
      // let adv = counterCollectionReportObj[0][0].advance_collection;
      // let curr = counterCollectionReportObj[1][0].current_collection;
      // console.log(Number(adv) + Number(curr));

      const result = counterCollectionReportObj[0]?.map((item) => {
        const new_info = counterCollectionReportObj[1]?.find(
          (detail) => detail.id === item.id
        );

        return {
          ...item,
          ...new_info,
        };
      });

      for (let i = 0; i < counterCollectionReportObj[0].length; i++) {
        result[i].ward_name = counterCollectionReportObj[0][i].ward_name;
      }

      for (const element of result) {
        element.arrear_collection = "0";
        element.total_collection =
          Number(element.current_collection) +
          Number(element.advance_collection);
      }
      console.log("result", result, counterCollectionReportObj);
      setData(result);
    }
  }, [counterCollectionReportObj]);
  useEffect(() => {
    console.log(data, "data");
  }, [data]);
  const columns = [
    { field: "ward_name", header: "Ward No" },
    { field: "arrear_collection", header: "Arrear Collection" },
    { field: "advance_collection", header: "Advance Collection" },
    { field: "current_collection", header: "Current Collection" },
    { field: "total_collection", header: "Total Collection" },
  ];

  const dataLoding = !safAllInputFromAPI || !safAllInputFromAPI.ward;

  const wardOptions = [
    { id: "All", ward_name: "All" },
    ...(safAllInputFromAPI?.ward?.length > 0
      ? safAllInputFromAPI.ward.map((item) => {
          const { id, ward_name } = item;
          return { id, ward_name };
        })
      : []),
  ];

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="m-4 mt-4 rounded-none border border-gray-500 bg-white px-0 pb-4 pt-0 lg:max-w-full">
        <nav className="navcustomproperty relative mb-1 flex flex-wrap items-center justify-between rounded-none py-1 pl-2 pr-0 ring-1 ring-black">
          <h2 className="text-center text-sm font-semibold text-white">
            Arrear and Current Collection Report
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
                    onChange={(date) => {
                      const formattedDate = formatDate(date);
                      setInputData({ ...inputData, fromDate: formattedDate });
                    }}
                    id="date_from"
                    name="date_from"
                    inputFormat="YYYY-MM-DD"
                    renderInput={(params) => <TextField {...params} />}
                    disableFuture={true}
                    value={
                      inputData.fromDate !== ""
                        ? inputData.fromDate
                        : "YYYY-MM-DD"
                    }
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
                    onChange={(date) => {
                      const formattedDate = formatDate(date);
                      setInputData({ ...inputData, toDate: formattedDate });
                    }}
                    id="date_to"
                    name="date_to"
                    inputFormat="YYYY-MM-DD"
                    renderInput={(params) => <TextField {...params} />}
                    disableFuture={true}
                    value={
                      inputData.toDate !== "" ? inputData.toDate : "YYYY-MM-DD"
                    }
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
              </label>
              <Select
                onChange={(value) => {
                  const selectedWard = JSON.parse(value);
                  setInputData({
                    ...inputData,
                    wardId: selectedWard.id,
                  });
                }}
                name="wardNo"
                label="select"
                className="py-2 pl-2 pr-3 text-xs font-bold text-gray-900"
              >
                {dataLoding ? (
                  <Option>Loading...</Option>
                ) : (
                  wardOptions.map((item) => (
                    <Option key={item.id} value={JSON.stringify(item)}>
                      {item.ward_name}
                    </Option>
                  ))
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
                            {/* <tr className="">
                                     <td className="px-4 py-2 font-semibold text-sm font-bold text-center text-gray-900 whitespace-normal">
                                    (Water User Charge)
                                    </td>
                                  </tr>  */}
                            <tr className="">
                              <td className="whitespace-normal px-4 py-2 text-center text-sm font-bold font-semibold text-green-700">
                                Arrear and Current Collection Report from{" "}
                                {`${inputData?.fromDate + ""}`} to{" "}
                                {inputData?.toDate}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="flex justify-evenly">
                          <p>Total Collection : {totalCollectionAmount}</p>
                          <p>
                            Total Bounce :{" "}
                            {totalBounce != null ? totalBounce : "N/A"}
                          </p>
                          <p>Net Collection : {totalCollectionAmount - 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="m-4 rounded-none bg-white px-0 pb-0 pt-0 lg:max-w-full">
                <div className="mb-1 flex flex-col">
                  <div className="overflow-x-auto">
                    <div className="3xl:w-full p-0 align-middle">
                      <div className="overflow-hidden">
                        <table className="min-w-full">
                          <thead className="preview-payment-form-child-table-laypout">
                            <tr>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Ward No
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Arrear Collection
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Current Collection
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Advance Collection
                              </th>
                              <th
                                scope="col"
                                className="whitespace-normal border border-gray-300 px-6 py-2  text-center text-xs  font-bold uppercase text-gray-700"
                              >
                                Total Collection
                              </th>
                    
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {counterCollectionReportObj[0]?.map(
                              (item, index) => {
                                return (
                                  <>
                                    <tr key={index} className="">
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                      
                                        {counterCollectionReportObj?.[0][0]
                                          .ward_name}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        0
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {
                                          counterCollectionReportObj?.[1][0]
                                            .current_collection
                                        }
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {counterCollectionReportObj?.[0][0]
                                          .advance_collection === null
                                          ? "NA"
                                          : counterCollectionReportObj?.[0][0]
                                              .advance_collection}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {counterCollectionReportObj?.[1][0]
                                          .current_collection !== null
                                          ? counterCollectionReportObj?.[0][0]
                                              .advance_collection !== null
                                            ? Number(
                                                counterCollectionReportObj?.[1][0]
                                                  .current_collection
                                              ) +
                                              Number(
                                                counterCollectionReportObj?.[0][0]
                                                  .advance_collection
                                              )
                                            : counterCollectionReportObj?.[1][0]
                                                .current_collection
                                          : counterCollectionReportObj?.[0][0]
                                              .advance_collection}
                                      </td>
                   
                                    </tr>
                                    <tr>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        Total
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        0
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {
                                          counterCollectionReportObj?.[1][0]
                                            .current_collection
                                        }
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal uppercase text-gray-700">
                                        {counterCollectionReportObj?.[0][0]
                                          .advance_collection === null
                                          ? "NA"
                                          : counterCollectionReportObj?.[0][0]
                                              .advance_collection}
                                      </td>
                                      <td className="whitespace-normal border border-gray-300 px-6 py-2 text-center text-xs font-normal text-gray-700">
                                        {counterCollectionReportObj?.[1][0]
                                          .current_collection !== null
                                          ? counterCollectionReportObj?.[0][0]
                                              .advance_collection !== null
                                            ? Number(
                                                counterCollectionReportObj?.[1][0]
                                                  .current_collection
                                              ) +
                                              Number(
                                                counterCollectionReportObj?.[0][0]
                                                  .advance_collection
                                              )
                                            : counterCollectionReportObj?.[1][0]
                                                .current_collection
                                          : counterCollectionReportObj?.[0][0]
                                              .advance_collection}
                                      </td>
                                    </tr>
                                  </>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              <Table
                data={data}
                columns={columns}
                hover={true}
                striped={true}
              />
            </section>

            <div className="m-auto min-w-fit max-w-fit items-center md:flex-1 lg:flex">
              <div className="mb-0 ml-2 mr-0 mt-4 min-w-fit max-w-fit">
                <button
                  type="button"
                  className="mb-4 ml-2 mr-2 h-8 w-28 transform rounded-md bg-green-400 px-4 
                  py-1 text-sm font-bold tracking-wide text-white 
                  transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 
                  focus:outline-none"
                  onClick={handlePrintToPDF}
                >
                  Print
                </button>
              </div>
              <ExportToExcel
                excelData={dataForExport}
                filaName={`CounterCollectionReport-From-${inputData?.fromDate}-To-${inputData?.toDate}`}
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

export default ArrearAndCurrentCollection;
