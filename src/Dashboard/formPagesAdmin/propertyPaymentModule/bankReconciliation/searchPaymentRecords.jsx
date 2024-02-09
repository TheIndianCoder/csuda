import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material';
import { useMaterialTailwindController } from '@/Dashboard/context';
import { Select, Tooltip, Option, Button } from '@material-tailwind/react'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Stack from '@mui/material/Stack';
import { getCookieByName } from '@/utils/RequireAuth';
import { ColorRing } from 'react-loader-spinner';
import { convertDateToAPIFormat } from '@/utils/commonUtils';

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

function SearchPaymentRecords({
    showModal, currModal, nextModal, switchOnPrevModalNOffCurrModal,
    setPaymentRecordIdForPaymentDetailsView
}) {
    const [controller, dispatch] = useMaterialTailwindController();
    const { paymentModeDetailsInputFromAPI } = controller;

    const [paymentRecordSearchObj, setPaymentRecordSearchObj] = useState({
        from_date: "",
        page: 0,
        payment_mode: "",
        size: 50,
        to_date: ""
    })
    const [isPaymentRecordsLoading, setIsPaymentRecordsLoading] = useState(null)
    const [isPaymentRecordsLoaded, setIsPaymentRecordsLoaded] = useState(null)
    const [paymentRecordsResultObj, setPaymentRecordsResultObj] = useState([])

    const handlepaymentRecordsSearchObjectChange = (event, eventId) => {
        console.log(event)
        if (event?.target?.id) {
            if (event.target.id == "size") {
                setPaymentRecordSearchObj(prevState => {
                    return { ...prevState, size: event.target.value }
                })
            }
        } else if (event?.toString().includes("mode_of_payment")) {
            let eventItem = JSON.parse(event)
            setPaymentRecordSearchObj(prevState => {
                return { ...prevState, payment_mode: eventItem.mode_of_payment }
            })
        } else if (event?.$d) {
            if (eventId == "from_date") {
                setPaymentRecordSearchObj(prevState => {
                    return { ...prevState, from_date: event.$d }
                })
            } else if (eventId == "to_date") {
                setPaymentRecordSearchObj(prevState => {
                    return { ...prevState, to_date: event.$d }
                })
            }
        }
    }

    useEffect(() => {
        console.log(`paymentRecordSearchObj ${paymentRecordSearchObj}`)
        console.log(paymentRecordSearchObj)
    }, [paymentRecordSearchObj])

    const handleSearch = async () => {
        console.log("isPaymentRecordsLoaded :: " + isPaymentRecordsLoaded)
        setIsPaymentRecordsLoading(true)
        try {
            const from_date = convertDateToAPIFormat(paymentRecordSearchObj.from_date)
            const to_date = convertDateToAPIFormat(paymentRecordSearchObj.to_date)
            const url = `${SUDA_API_BASE_URL}/user/reconciliationView?from_date=${from_date}&page=${paymentRecordSearchObj.page}&payment_mode=${paymentRecordSearchObj.payment_mode}&size=${paymentRecordSearchObj.size}&to_date=${to_date}`
            const requestOptions = {
                method: "GET",
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
            }
            let response = null, responseBody = null
            response = await fetch(url, requestOptions)
            responseBody = await response.json()
            console.log(responseBody)
            if (response?.status == "200") {
                setPaymentRecordsResultObj(responseBody)
                setIsPaymentRecordsLoaded(true)
            } else {
                setIsPaymentRecordsLoaded(false)
                setPaymentRecordsResultObj(null)
            }
        } catch (err) {
            console.error(err)
            setIsPaymentRecordsLoaded(false)
            setPaymentRecordsResultObj(null)
        } finally {
            setIsPaymentRecordsLoading(false)
        }
    }

    const handleViewPaymentDetails = (item) => {
        setPaymentRecordIdForPaymentDetailsView(item)
        switchOnPrevModalNOffCurrModal(currModal, nextModal)
    }

    useEffect(() => {
        setIsPaymentRecordsLoaded(null)
    }, [])

    return showModal ? (
        <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-md mt-4  lg:max-w-full">
            <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-600 rounded-md h-10">
                <h2 className="text-sm font-semibold text-center text-white">
                    Search Payment Details 
                </h2>
            </nav>
            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end">
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                        Date From
                        <p className='contents text-red-600 text-sm font-bold'>*</p>
                    </label>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3}>
                            <DesktopDatePicker
                                // label="Date desktop"
                                id="from_date"
                                // className=""
                                onChange={(e) => handlepaymentRecordsSearchObjectChange(e, "from_date")}
                                inputFormat="MM/DD/YYYY"
                                renderInput={(params) => <TextField {...params} />}
                                value={paymentRecordSearchObj?.from_date}
                                disableFuture={true}
                            />
                        </Stack>
                    </LocalizationProvider>

                </div>
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                        Date Upto
                        <p className='contents text-red-600 text-sm font-bold'>*</p>
                    </label>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={3}>
                            <DesktopDatePicker
                                // label="Date desktop"
                                id="to_date"
                                inputFormat="MM/DD/YYYY"
                                onChange={(e) => handlepaymentRecordsSearchObjectChange(e, "to_date")}
                                renderInput={(params) => <TextField {...params} />}
                                value={paymentRecordSearchObj?.to_date}
                                disableFuture={true}
                            />
                        </Stack>
                    </LocalizationProvider>

                </div>
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                        Payment Mode<p className='contents text-red-600 text-xs font-bold'>*</p>
                    </label>
                    <Select onChange={handlepaymentRecordsSearchObjectChange}
                        label="select" color='red' className={`pl-2 pr-3 py-2 font-bold text-xs text-gray-900 border-red-500`}>
                        {
                            paymentModeDetailsInputFromAPI?.length > 0 ? (
                                paymentModeDetailsInputFromAPI[0]?.modeOfPaymentBeans.map((item, index) => {
                                    const { id, mode_of_payment, status } = item
                                    return (
                                        <Option key={index} value={JSON.stringify(item)} >{mode_of_payment}</Option>
                                    )
                                })
                            ) : <Option>Loading...</Option>
                        }
                    </Select>

                </div>
                <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                        Enter number of records to display<p className='contents text-red-600 text-xs font-bold'>*</p>
                    </label>
                    <input
                        value={paymentRecordSearchObj?.size}
                        onChange={handlepaymentRecordsSearchObjectChange}
                        id='size'
                        className="bg-white-200 appearance-none border border-red-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-red-500"
                        type="number" placeholder="50" />
                </div>

            </div>
            <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end m-auto">
                <div className="mb-0 ml-3 mr-4 mt-4 min-w-fit max-w-fit">
                    <button type='button'
                        onClick={handleSearch}
                        className="w-36 h-8 px-4 py-1 mx-4 mb-4 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                        Search
                    </button>
                </div>
            </div>
            {/* </div> */}

            {
                isPaymentRecordsLoading == true ? (
                    <div className="m-auto w-16 h-16">
                        <ColorRing
                            visible={true}
                            height="40"
                            width="40"
                            colors={['#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000']}

                        />
                    </div>
                ) : null
            }
            {/* <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                    <h2 className="text-sm font-semibold text-center text-white">
                        Collection Details
                    </h2>
                </nav>
                <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="p-2.5 lg:w-full inline-block align-middle">
                            <div className="overflow-hidden">
                                {
                                    false == null ? (
                                        <div className="m-auto w-24 h-24">
                                            <ColorRing
                                                visible={true}
                                                height="40"
                                                width="40"
                                                colors={['#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000']}
                                            />
                                        </div>
                                    ) : null
                                }
                                <table className="min-w-full">
                                    <thead className="bg-gray-50">

                                    </thead>
                                    <tbody>
                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                Collection Details from 21.03.2023 to 24.03.2024
                                            </td>
                                            <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                                                :
                                            </td>
                                            <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                                                1211
                                            </td>
                                            <td className="px-4 py-2 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                Total Collection
                                            </td>
                                            <td className="px-4 py-2 text-xs text-gray-900 whitespace-normal">
                                                :
                                            </td>
                                            <td className="px-4 py-2 text-xs text-green-700 font-bold  whitespace-normal">
                                                2523366
                                            </td>

                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {
                isPaymentRecordsLoaded == true ? (
                    paymentRecordsResultObj?.content?.length > 0 ? (
                        <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-md lg:max-w-full">
                            <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-600 rounded-md h-10">
                                <h2 className="text-sm font-semibold text-center text-white">
                                    Payment Details
                                </h2>
                            </nav>
                            <div className="flex flex-col mb-1">
                                <div className="overflow-x-auto">
                                    <div className="p-2.5 3xl:w-full inline-block align-middle">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full">
                                                <thead className="preview-payment-form-table-laypout">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-2 text-xs text-center font-bold  text-gray-700 uppercase  whitespace-normal border border-gray-300"
                                                        >
                                                            Sl. No.
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-2 text-xs text-center font-bold  text-gray-700 uppercase  whitespace-normal border border-gray-300"
                                                        >
                                                            Ward No.
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-2 text-xs text-center font-bold  text-gray-700 uppercase  whitespace-normal border border-gray-300"
                                                        >
                                                            Property No.
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-2 text-xs text-center font-bold  text-gray-700 uppercase  whitespace-normal border border-gray-300"
                                                        >
                                                            Owner Name
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-2 text-xs text-center font-bold  text-gray-700 uppercase  whitespace-normal border border-gray-300"
                                                        >
                                                            Transcation Date
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-2 text-xs text-center font-bold  text-gray-700 uppercase  whitespace-normal border border-gray-300 "
                                                        >
                                                            Transcation No.
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-2 text-xs text-center font-bold  text-gray-700 uppercase  whitespace-normal border border-gray-300"
                                                        >
                                                            Pay Mode
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-2 text-xs text-center font-bold  text-gray-700 uppercase  whitespace-normal border border-gray-300 "
                                                        >
                                                            Amount
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-2 text-xs text-center font-bold  text-gray-700 uppercase  whitespace-normal border border-gray-300"
                                                        >
                                                            Tax Collector
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-2 text-xs text-center font-bold   whitespace-normal text-gray-700 uppercase border border-gray-300"
                                                        >
                                                            Status
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-2 text-xs text-center font-bold   whitespace-normal text-gray-700 uppercase border border-gray-300"
                                                        >
                                                            view
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {
                                                        paymentRecordsResultObj.content.map((item, index) => {
                                                            return (
                                                                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                                    <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                                                        {index + 1}
                                                                    </td>
                                                                    <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                                                        {item?.ward_name}
                                                                    </td>
                                                                    <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                                                        {item?.property_no}
                                                                    </td>
                                                                    <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                                                        {item?.owner_name}
                                                                    </td>
                                                                    <td className="px-6 py-2 text-center text-xs font-normal text-gray-700 whitespace-normal border border-gray-300">
                                                                        {item?.transaction_date}
                                                                    </td>
                                                                    <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                                                        {item?.transaction_no}
                                                                    </td>
                                                                    <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                                                        {item?.payment_mode}
                                                                    </td>

                                                                    <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                                                        {item?.payable_amt}
                                                                    </td>
                                                                    <td className="px-6 py-2 text-center text-xs font-normal text-gray-700  whitespace-normal border border-gray-300">
                                                                        {item?.tax_collector}
                                                                    </td>
                                                                    {
                                                                        // item?.check_status == "1" || (item?.payment_mode + "").trim().toLowerCase() == 'cash' ? (
                                                                             (item?.payment_mode + "").trim().toLowerCase() == 'cash' ? (
                                                                            <td className="px-6 py-2 text-center text-xs font-bold text-green-700  whitespace-normal border border-gray-300 uppercase">
                                                                                Pending
                                                                            </td>
                                                                        ) :
                                                                            item?.check_status == "3" ? (
                                                                                <td className="px-6 py-2 text-center text-xs font-bold text-red-700  whitespace-normal border border-gray-300 uppercase">
                                                                                    Rejected
                                                                                </td>
                                                                            ) :
                                                                                item?.check_status == "0" || item?.check_status == null ?
                                                                                    (
                                                                                        <td className="px-6 py-2 text-center text-xs font-bold text-yellow-700  whitespace-normal border border-gray-300 uppercase">
                                                                                            Pending
                                                                                        </td>
                                                                                    ) : (
                                                                                        <td className="px-6 py-2 text-center text-xs font-bold text-red-700  whitespace-normal border border-gray-300 uppercase">
                                                                                            {`Unknown status - ${item?.check_status}`}
                                                                                        </td>
                                                                                    )
                                                                    }
                                                                    <td className="px-6 py-2 text-center text-xs font-medium text-gray-700  whitespace-normal border border-gray-300">
                                                                        <button
                                                                            onClick={() => handleViewPaymentDetails(item)}
                                                                            type='button' color="green"
                                                                            className='h-6 w-16 px-2 py-1 bg-green-700 rounded text-white text-xs font-semibold custom_button_add'>
                                                                            VIEW
                                                                        </button>
                                                                    </td>

                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ) : (<p className="text-center font-semibold text-xs text-red-700">
                        {`No have any data for bank reconciliation! Please try again with different search criteria.`}
                    </p>)
                ) : isPaymentRecordsLoaded == false ? (
                    (<p className="text-center font-semibold text-xs text-red-700">
                        {`Something went wrong while searching! Please try again`}
                    </p>)
                ) : null
            }
        </div>
    ) : null
}

export default SearchPaymentRecords