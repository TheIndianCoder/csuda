import React, { useMemo, useState } from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Select, Option } from "@material-tailwind/react";
import DummyTable from "@/Components/DummyTable";
import { ExportToExcel } from '@/utils/commonComponents';


const AssessmentSurveyReport = () => {
    const counterCollectionReports = {
        date_from: '', 
        date_to: '',
        user_id: "",
        ward_id:"",
       
        }
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [wardNo, setWardNo] = useState(new Date());
    const [propertyNo,  setPropertyNo] = useState();
    const [reportType, setReportType] = useState(0);
    const [dataForExport, setDataForExport] = useState([])
    const [counterCollectionReportObj, setCounterCollectionReportObj] = useState(null)
    const [counterCollectionReport,setcounterCollectionReport] = useState(counterCollectionReports)

    const tableHeader = [
        ["BHILAL MUNICIPAL CORPORATION"],
        ["Survey Assessment Report From 20-05-2023 To 20-05-2025"],
        ["Owner Details", "Self Declaration Builtup Area"],
    ]

    let handlePrintToPDF = () => {
        let printwin = window.open("");
        printwin.document.write(document.getElementById("print_section").innerHTML);
        copyStyles(window.document, printwin.document);
        printwin.print();
    }
    

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10 mb-10">
            <div className="w-full min-h-screen px-0 pt-0 pb-4 m-auto bg-white rounded-none border border-gray-500 lg:max-w-full">
                <form className="mt-4">
                    <div className="px-0 pt-0 pb-2 m-4 bg-white rounded-none mt-4 border border-gray-500 lg:max-w-full">
                        <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                            <h2 className="text-sm font-semibold text-center text-white">
                                Assessment Report Nigam
                            </h2>
                        </nav>
                        <div className="md:flex-1 lg:flex justify-between md:mx-16">
                            <div className="mb-4 ml-1 mt-2 flex flex-row">
                                <label className="block text-gray-700 text-xs font-bold my-2 mx-4 " htmlFor="password">
                                    Date From
                                </label>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            id="from_date"
                                            value={startDate}
                                            onChange={(e) => { setDate(e.target.value); }}
                                            inputFormat="MM/DD/YYYY"
                                            renderInput={(params) => <TextField {...params} />}
                                            disableFuture={true}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </div>
                            <div className="mb-4 ml-1 mt-2 flex flex-row ">
                                <label className="block text-gray-700 text-xs font-bold my-2 mx-4" htmlFor="password">
                                    Date to
                                </label>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            id="from_date"
                                            onChange={(e) =>
                                              setEndDate(e.target.value)
                                            }
                                            inputFormat="MM/DD/YYYY"
                                            renderInput={(params) => <TextField {...params} />}
                                            value={endDate}
                                            disableFuture={true}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className="md:flex-1 lg:flex justify-between md:mx-16 mx-6">
                            <div className="flex flex-row md:ml-5">
                                <label className=" text-gray-700 text-xs font-bold mb-2 mt-3 md:w-24" htmlFor="password">
                                    Ward No
                                </label>
                                <Select
                                    onChange={(e) => setWardNo(e.target.value)}
                                    name="ward no"
                                    label="select"
                                    className="pl-2 pr-3 py-2 font-bold text-xs text-gray-900 ">

                                    <Option value="" disabled> </Option>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                    <Option value="4">4</Option>
                                    <Option value="5">5</Option>
                                    <Option value="6">6</Option>
                                </Select>

                            </div>
                            <div className="mb-4 ml-1 mt-2 flex flex-row ">
                                <label className="text-gray-700 text-xs font-bold mt-3 mx-2 md:w-18" htmlFor="password">
                                    Property No
                                </label>
                                <input
                                    onChange={(e) => setPropertyNo(e.target.value)}
                                    name="Property No"
                                    value={propertyNo}
                                    className="bg-white-200 appearance-none border border-gray-500 rounded py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                    type="text" placeholder="" />
                            </div>
                        </div>
                        <div className="md:flex-1 lg:flex justify-between md:mx-16">
                            <div className="flex flex-row md:ml-5">
                                <label className=" text-gray-700 text-xs font-bold mb-2 mt-3 md:w-24" htmlFor="password">
                                    Report Type
                                </label>
                                <Select
                                    onChange={(e) => {setReportType(e.target.value)}}
                                    name="Report Type"
                                    value={reportType}
                                    label="select"
                                    className="pl-2 pr-3 py-2 font-bold text-xs text-gray-900 ">

                                    <Option value="" disabled> </Option>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                    <Option value="4">4</Option>
                                    <Option value="5">5</Option>
                                    <Option value="6">6</Option>
                                </Select>

                            </div>
                        </div>
                        <div className="mb-0 ml-2 mr-0  flex flex-row justify-center">
                            <button type='button'
                                // onClick={handleSearch}
                                className="w-28 h-8 px-4 py-1 mr-2 ml-2 mb-4 tracking-wide text-white text-xs font-bold transition-colors duration-200 transform bg-blue-400 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-400">
                                Show
                            </button>
                        </div>
                    </div>
                </form>
                <div className="px-0 pt-0 pb-2 m-4 bg-white rounded-none border border-gray-500 lg:max-w-full">
                    <DummyTable tableHeader={tableHeader} />
                    <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-center m-auto">
                      <div className="mb-0 ml-2 mr-0 mt-8 min-w-fit max-w-fit">
                        <button type='button'
                          className="w-28 h-8 px-4 py-1 mr-2 ml-2 mb-4 tracking-wide text-white text-sm font-bold transition-colors duration-200 transform bg-blue-gray-900 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400" 
                          onClick={handlePrintToPDF} >
                          Print
                        </button>
                      </div>
                      <div className="mb-0 ml-2 mr-0 mt-4 min-w-fit max-w-fit">
                      <ExportToExcel
                        excelData={dataForExport}
                        filaName={`CounterCollectionReport-From-${counterCollectionReport?.date_from}-To-${counterCollectionReport?.date_to}`}
                        btnText={`Export to Excel`}
                      />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssessmentSurveyReport