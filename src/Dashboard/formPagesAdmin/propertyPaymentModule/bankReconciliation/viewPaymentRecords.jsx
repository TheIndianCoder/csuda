import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material';
import { useMaterialTailwindController } from '@/Dashboard/context';
import { Select, Tooltip, Option, Button } from '@material-tailwind/react'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Stack from '@mui/material/Stack';
import { getCookieByName } from '@/utils/RequireAuth';
import { ColorRing } from 'react-loader-spinner';
import { isBlankString } from '@/utils/formValidatorUtils'; 
import FloatingMessage from '@/utils/floatingMessage';


const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

function ViewPaymentRecords({
    showModal, currModal, switchOnPrevModalNOffCurrModal, prevModal, nextModal,
    paymentRecordIdForPaymentDetailsView
}) {
    const [controller, dispatch] = useMaterialTailwindController();
    const { paymentModeDetailsInputFromAPI } = controller;

    // console.log("paymentRecordIdForPaymentDetailsView :: ")
    // console.log(paymentRecordIdForPaymentDetailsView)
    const [isPaymentDetailsLoaded, setIsPaymentDetailsLoaded] = useState(null)
    const [isPaymentDetailsLoading, setIsPaymentDetailsLoading] = useState(null)
    const [paymentTransactionDetails, setPaymentTransactionDetails] = useState(null)
    const [updateReconciliationObj, setUpdateReconciliationObj] = useState({
        check_status: "",
        remarks: "",
        clearance_date: "",
        other_reason: ""
    })
    const [isUpdateReconciliationObjValid, setIsUpdateReconciliationObjValid] = useState(null)
    const [isUpdateReconciliationInProgress, setIsUpdateReconciliationInProgress] = useState(null)
    const [isUpdateReconciliationSuccess, setIsUpdateReconciliationSuccess] = useState(null)
    const [blockFurtherUpdate, setBlockFurtherUpdate] = useState(null)
    const [cashBounceReason, setCashBounceReason] = useState('')
    const handleReconciliationObjectChange = (event, id) => {
     
        if (event?.target?.id) {
            const eventId = event.target.id
            let eventVal = event.target.value 
            if (eventId == "other_reason") {
                setUpdateReconciliationObj(prevState => {
                    return { ...prevState, other_reason: eventVal }
                })
            }
        } else if (id == "clearance_type") {
            setUpdateReconciliationObj(prevState => {
                return { ...prevState, check_status: event }
            })
        } else if (id == "clearance_date") {
            setUpdateReconciliationObj(prevState => {
                return { ...prevState, clearance_date: event?.$d }
            })
        } else if (id == "bounce_reason") {
            const eventObj = JSON.parse(event)
            setUpdateReconciliationObj(prevState => {
                return { ...prevState, remarks: eventObj.bounce_reason }
            })
        }
       
    }

    useEffect(() => {
        console.log("updateReconciliationObj ::::::::::::::::::::::::::::::")
        console.log(updateReconciliationObj,(paymentRecordIdForPaymentDetailsView?.payment_mode + "").trim().toLowerCase())
        const { clearance_date, remarks, check_status, other_reason } = updateReconciliationObj
        const clearance_remarks = (remarks + "").trim().toLowerCase() != "others" ? 
        (paymentRecordIdForPaymentDetailsView?.payment_mode + "").trim().toLowerCase() == "cash"
        ? cashBounceReason :
        remarks : other_reason

        console.log("checking for cash",isBlankString(clearance_date) ,check_status,
        isBlankString(clearance_remarks),
        isBlankString(check_status) , isBlankString(other_reason))
        let isValid = true
        if (isBlankString(clearance_date) && isBlankString(clearance_remarks)
            && isBlankString(check_status) && isBlankString(other_reason)) {
            isValid = null
        } else if (check_status == "1") {
            isValid = !isBlankString(clearance_date) && !isBlankString(check_status)
        } else {
            isValid = !isBlankString(clearance_date) && !isBlankString(clearance_remarks)
                && !isBlankString(check_status)
        }

        setIsUpdateReconciliationObjValid(isValid)
    }, [updateReconciliationObj,paymentRecordIdForPaymentDetailsView?.payment_mode,cashBounceReason])

    // useEffect(() => {
    //     setUpdateReconciliationObj({
    //         check_status: "",
    //         remarks: "",
    //         clearance_date: "",
    //         other_reason: ""
    //     })
    // }, [])

    const fetchPaymentTransactionDetailsById = async () => {
        setUpdateReconciliationObj({
            check_status: "",
            remarks: "",
            clearance_date: "",
            other_reason: ""
        })
        setPaymentTransactionDetails(null)
        setIsPaymentDetailsLoading(true)
        try {
            const url = `${SUDA_API_BASE_URL}/user/reconciliationViewById?id=${paymentRecordIdForPaymentDetailsView?.id}`
            const requestOptions = {
                method: "GET",
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
            }
            let response = null, responseBody = null;
            response = await fetch(url, requestOptions)
            responseBody = await response.json()
            if (response?.status == "200") {
                setIsPaymentDetailsLoaded(true)
                setPaymentTransactionDetails(responseBody)
            } else {
                setIsPaymentDetailsLoaded(false)
                setPaymentTransactionDetails(null)
            }
        } catch (err) {
            console.error(err)
            setIsPaymentDetailsLoaded(false)
            setPaymentTransactionDetails(null)
        } finally {
            setIsPaymentDetailsLoading(false)
        }

    }
    useEffect(() => {
        fetchPaymentTransactionDetailsById()
    }, [paymentRecordIdForPaymentDetailsView])

    const closeFloatingMessage = () => {
        setIsUpdateReconciliationSuccess(null)
    }

    const handleReconciliationUpdate = async () => {
        setIsUpdateReconciliationInProgress(true)
        try {
            const requestBody = {
                check_status: parseInt(updateReconciliationObj.check_status),
                id: 0,
                remarks: (updateReconciliationObj.remarks + "").trim().toLowerCase() != "others" ?
               ((paymentRecordIdForPaymentDetailsView?.payment_mode + "").trim().toLowerCase()
                                                                    == "cash" ? 
                                                                    cashBounceReason : 
                updateReconciliationObj.remarks) :
                    updateReconciliationObj.other_reason,
                transaction_id: parseInt(paymentTransactionDetails.propertyTransactionBeans[0].id),
                user_id: parseInt(getCookieByName("SUDA_USER_ID"))
            }
            const url = `${SUDA_API_BASE_URL}/user/reconciliationUpdateById`
            const requestOptions = {
                method: "PUT",
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
                body: JSON.stringify(requestBody)
            }
            // console.log("requestBody ::: ")
            // console.log(requestBody)
            // throw new Error("reconciliation blocked")
            let respone = null, responseBody = null
            respone = await fetch(url, requestOptions)
            // responseBody = await respone.json()
            if (respone?.status == "200") {
                setBlockFurtherUpdate(true)
                setIsUpdateReconciliationSuccess(true)
            } else {
                setIsUpdateReconciliationSuccess(false)
            }
        } catch (err) {
            console.error(err)
            setIsUpdateReconciliationSuccess(false)
        } finally {
            setIsUpdateReconciliationInProgress(false)
        }
    }

    return (
        <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-m lg:max-w-full">
            <nav className="relative bg-orange-800 flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-red-700 rounded-md h-10">
                <h2 className="text-sm font-semibold text-center text-white">
                    Transaction Details
                </h2>
            </nav>
            {
                isPaymentDetailsLoading == true ? (
                    <div className="m-auto w-16 h-16">
                        <ColorRing
                            visible={true}
                            height="40"
                            width="40"
                            colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}

                        />
                    </div>
                ) : null
            }
            {
                isPaymentDetailsLoaded == true && paymentTransactionDetails ? (
                    <>
                        <div className="flex flex-col">
                            <div className="overflow-x-auto">
                                <div className="p-2.5 3xl:w-full inline-block align-middle">
                                    <div className="overflow-hidden">
                                        {
                                            false == null ? (
                                                <div className="m-auto w-24 h-24">
                                                    <ColorRing
                                                        visible={true}
                                                        height="40"
                                                        width="40"
                                                        colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}
                                                    />
                                                </div>
                                            ) : null
                                        }
                                        <table className="min-w-full">
                                            <thead className="bg-gray-50">

                                            </thead>
                                            <tbody>
                                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                        Transaction No.
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        :
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        {paymentTransactionDetails?.propertyTransactionBeans[0]?.transaction_no}
                                                    </td>
                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                        Transaction Date
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        :
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-700 font-normal  whitespace-normal">
                                                        {paymentTransactionDetails?.propertyTransactionBeans[0]?.transaction_date ?
                                                            (new Date(paymentTransactionDetails?.propertyTransactionBeans[0]?.transaction_date)).toString()
                                                            : ''}
                                                    </td>

                                                </tr>
                                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                        Paid Amount
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        :
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-green-700 font-bold whitespace-normal">
                                                        {paymentTransactionDetails?.propertyTransactionBeans[0]?.payable_amt}
                                                    </td>
                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                        Payment Mode
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        :
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-700 font-normal  whitespace-normal">
                                                        {paymentTransactionDetails?.propertyTransactionBeans[0]?.payment_mode}
                                                    </td>

                                                </tr>
                                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                        Bank Name
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        :
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        {paymentTransactionDetails?.chequeDDCardTransactionBeans[0]?.bank_name}
                                                    </td>
                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                        Branch Name
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        :
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-700 font-normal  whitespace-normal">
                                                        {paymentTransactionDetails?.chequeDDCardTransactionBeans[0]?.branch_name}
                                                    </td>

                                                </tr>
                                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                        Cheque No.
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        :
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        {paymentTransactionDetails?.chequeDDCardTransactionBeans[0]?.cheque_no}
                                                    </td>
                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                        Cheque Date
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        :
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-700 font-normal  whitespace-normal">
                                                        {paymentTransactionDetails?.chequeDDCardTransactionBeans[0]?.cheque_dt}
                                                    </td>

                                                </tr>
                                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                        DD No.
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        :
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        {paymentTransactionDetails?.chequeDDCardTransactionBeans[0]?.dd_no}
                                                    </td>
                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                        DD Date
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        :
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-700 font-normal  whitespace-normal">
                                                        {paymentTransactionDetails?.chequeDDCardTransactionBeans[0]?.dd_dt}
                                                    </td>

                                                </tr>
                                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                        RTGS No.
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        :
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        {paymentTransactionDetails?.chequeDDCardTransactionBeans[0]?.rtgs_no}
                                                    </td>
                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                        RTGS Date
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        :
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-700 font-normal  whitespace-normal">
                                                        {paymentTransactionDetails?.chequeDDCardTransactionBeans[0]?.rtgs_dt}
                                                    </td>

                                                </tr>
                                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                        NEFT No.
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        :
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        {paymentTransactionDetails?.chequeDDCardTransactionBeans[0]?.neft_no}
                                                    </td>
                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                        NEFT Date
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        :
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-700 font-normal  whitespace-normal">
                                                        {paymentTransactionDetails?.chequeDDCardTransactionBeans[0]?.neft_dt}
                                                    </td>

                                                </tr>
                                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                        Card No.
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        :
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        {paymentTransactionDetails?.chequeDDCardTransactionBeans[0]?.card_no}
                                                    </td>
                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                        Card Holder Name
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        :
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-700 font-normal  whitespace-normal">
                                                        {paymentTransactionDetails?.chequeDDCardTransactionBeans[0]?.card_holder_name}
                                                    </td>
                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                        Card Type
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        :
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-700 font-normal  whitespace-normal">
                                                        {paymentTransactionDetails?.chequeDDCardTransactionBeans[0]?.card_type}
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                        Clearance Status<p className='contents text-red-600 text-xs font-bold'>*</p>
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        :
                                                    </td>
                                                    <td className="px-1 py-2 text-sm text-gray-900 whitespace-normal">
                                                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                                            {
                                                                paymentRecordIdForPaymentDetailsView?.check_status == "1"
                                                                    || 
                                                                (paymentRecordIdForPaymentDetailsView?.payment_mode + "").trim().toLowerCase()
                                                                    == "cash" ?
                                                                    <Select
                                                                            onChange={(e) => handleReconciliationObjectChange(e, "clearance_type")}
                                                                            label="select" color='orange' className={`pl-2 pr-3 py-2 font-bold text-sm text-gray-900`}>
                                                                            <Option value='1' >Cleared</Option>
                                                                            <Option value='3' >Bounced</Option>
                                                                        </Select> : null
                                                            }
                                                            {
                                                                paymentRecordIdForPaymentDetailsView?.check_status == "3" ?
                                                                    (
                                                                        "Bounced"
                                                                    ) : null
                                                            }
                                                            {
                                                                (paymentRecordIdForPaymentDetailsView?.check_status != "1" &&
                                                                    paymentRecordIdForPaymentDetailsView?.check_status != "3"
                                                                    &&
                                                                    (paymentRecordIdForPaymentDetailsView?.payment_mode + "").trim().toLowerCase()
                                                                    != 'cash') ?
                                                                    (
                                                                        <Select
                                                                            onChange={(e) => handleReconciliationObjectChange(e, "clearance_type")}
                                                                            label="select" color='orange' className={`pl-2 pr-3 py-2 font-bold text-sm text-gray-900`}>
                                                                            <Option value='1' >Cleared</Option>
                                                                            <Option value='3' >Bounced</Option>
                                                                        </Select>
                                                                    ) : null
                                                            }
                                                        </div>
                                                    </td>
                                                    {
                                                        ((paymentRecordIdForPaymentDetailsView?.check_status != "1" &&
                                                            paymentRecordIdForPaymentDetailsView?.check_status != "3" ) ||
                                                            (paymentRecordIdForPaymentDetailsView?.payment_mode + "").trim().toLowerCase()
                                                            === 'cash') ?
                                                            (
                                                                <>
                                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                                        Clearance / Rejection Date<p className='contents text-red-600 text-xs font-bold'>*</p>
                                                                    </td>
                                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                                        :
                                                                    </td>
                                                                    <td className="px-1 py-2 text-sm text-gray-700 font-normal  whitespace-normal">
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                            <Stack spacing={3}>
                                                                                <DesktopDatePicker
                                                                                    onChange={(e) => handleReconciliationObjectChange(e, "clearance_date")}
                                                                                    // label="Date desktop"
                                                                                    id="clearance_date"
                                                                                    color='orange'
                                                                                    inputFormat="MM/DD/YYYY"
                                                                                    renderInput={(params) => <TextField {...params} />}
                                                                                    disableFuture={true}
                                                                                    value={updateReconciliationObj?.clearance_date}
                                                                                />
                                                                            </Stack>
                                                                        </LocalizationProvider>
                                                                    </td>
                                                                </>
                                                            ) : null
                                                    }
                                                    {
                                                        paymentTransactionDetails?.chequeDDCardTransactionBeans[0]?.clear_stampdate ?
                                                            (
                                                                <>
                                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                                        Clearance Date<p className='contents text-red-600 text-xs font-bold'>*</p>
                                                                    </td>
                                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                                        :
                                                                    </td>
                                                                    <td className="px-1 py-2 text-sm text-gray-900 whitespace-normal">
                                                                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                                                            {(new Date(paymentTransactionDetails?.chequeDDCardTransactionBeans[0]?.clear_stampdate)).toString()}
                                                                        </div>
                                                                    </td>
                                                                </>
                                                            ) : null
                                                    }

                                                </tr>
                                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    {
                                                        (paymentRecordIdForPaymentDetailsView?.check_status != "1" &&
                                                            paymentRecordIdForPaymentDetailsView?.check_status != "3") ?
                                                            updateReconciliationObj?.check_status == "3" ? (
                                                                <>
                                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                                        Reason<p className='contents text-red-600 text-xs font-bold'>*</p>
                                                                    </td>
                                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                                        :
                                                                    </td>
                                                                    <td className="px-1 py-2 text-sm text-gray-900 whitespace-normal">
                                                                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                                                            {
                                                                                 (paymentRecordIdForPaymentDetailsView?.payment_mode + "").trim().toLowerCase()
                                                                                 == "cash" ? 
                                                                                 <input
                                                                            id="cash_bounce_reason"
                                                                            value={cashBounceReason}
                                                                            onChange={(e) => setCashBounceReason(e.target.value)}
                                                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                                                                            type="text" placeholder="" />
                                                                                 :  <Select
                                                                                 onChange={(e) => handleReconciliationObjectChange(e, "bounce_reason")}
                                                                                 label="select" color='orange' className={`pl-2 pr-3 py-2 font-bold text-xs text-gray-900`}>
                                                                                 {
                                                                                     paymentModeDetailsInputFromAPI?.length > 0 ? (
                                                                                         paymentModeDetailsInputFromAPI[0]?.chequeDDBounceReasonBeans.map((item, index) => {
                                                                                             const { id, bounce_reason } = item
                                                                                             return (
                                                                                                 <Option key={index} value={JSON.stringify(item)} >{bounce_reason}</Option>
                                                                                             )
                                                                                         })
                                                                                     ) : <Option>Loading...</Option>
                                                                                 }
                                                                             </Select>
                                                                            }
                                                                           
                                                                        </div>
                                                                    </td>
                                                                </>
                                                            ) : null

                                                            : null
                                                    }

                                                </tr>

                                                {
                                                    (updateReconciliationObj?.remarks + "").trim().toLowerCase() == "others" ?
                                                        (
                                                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                                <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                                    Please mention other reason<p className='contents text-red-600 text-xs font-bold'>*</p>
                                                                </td>
                                                                <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                                    :
                                                                </td>
                                                                <td className="px-1 py-2 text-sm text-gray-900 whitespace-normal">
                                                                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                                                        <input
                                                                            id="other_reason"
                                                                            value={updateReconciliationObj?.other_reason}
                                                                            onChange={(e) => handleReconciliationObjectChange(e)}
                                                                            className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-orange-500"
                                                                            type="text" placeholder="Reason for rejection" />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ) : null
                                                }
                                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="px-4 py-2 font-semibold text-sm font-medium text-gray-900 whitespace-normal">
                                                        Remarks
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900 whitespace-normal">
                                                        :
                                                    </td>
                                                    <td className="px-1 py-2 text-sm text-gray-900 whitespace-normal">
                                                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                                            {
                                                                // (paymentRecordIdForPaymentDetailsView?.payment_mode + "").trim().toLowerCase()
                                                                // == "cash" ? 
                                                                // <input
                                                                // id="other_reason"
                                                                // value={updateReconciliationObj?.other_reason}
                                                                // onChange={(e) => handleReconciliationObjectChange(e)}
                                                                // className="bg-white-200 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-white-700 leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                                                // type="text" placeholder="" />
                                                                // : 
                                                                paymentTransactionDetails?.propertyTransactionBeans[0]?.remarks
}
                                                            
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 lg:max-w-full">
                            {
                                isUpdateReconciliationSuccess == true ? (
                                    <FloatingMessage
                                        color='green'
                                        closeFloatingMessage={closeFloatingMessage}
                                        showMessage={true}
                                        message='Payment reconciliation details saved successfully' />
                                ) : null
                            }
                            {
                                isUpdateReconciliationSuccess == false ? (
                                    <FloatingMessage
                                        color='red'
                                        closeFloatingMessage={closeFloatingMessage}
                                        showMessage={true}
                                        message='Something went wrong! Please try again.' />
                                ) : null
                            }
                            <div className="container py-2 px-10 mx-0 min-w-full flex flex-col items-center">
                                {
                                    isUpdateReconciliationObjValid == false ? (
                                        <p className='contents text-red-600 text-xs font-bold'>
                                            Please enter all fields marked with *
                                        </p>
                                    ) : null
                                }
                                {
                                    isUpdateReconciliationInProgress == true ? (
                                        <div className="m-auto w-16 h-16">
                                            <ColorRing
                                                visible={true}
                                                height="40"
                                                width="40"
                                                colors={['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#ff0000']}

                                            />
                                        </div>
                                    ) : null
                                }

                                <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                                    <button onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
                                        className="w-36 h-8 px-0 py-0 mx-4 my-0 tracking-wide text-white text-sm font-semibold transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                                        Back
                                    </button>
                                    {
                                        (paymentRecordIdForPaymentDetailsView?.payment_mode + "").trim().toLowerCase()
                                        == "cash" ?  <button
                                        onClick={handleReconciliationUpdate}
                                        disabled={!isUpdateReconciliationObjValid}
                                        className={`w-36 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white 
                                        transition-colors duration-200 transform bg-green-400 rounded-md 
                                        hover:bg-green-700 focus:outline-none focus:bg-green-400
                                        ${!isUpdateReconciliationObjValid ? 'cursor-not-allowed' : ''}`}>
                                        {`Save`}
                                    </button>:
                                    
                
                                        paymentRecordIdForPaymentDetailsView?.check_status != "1" &&
                                            paymentRecordIdForPaymentDetailsView?.check_status != "3" &&
                                                                                        blockFurtherUpdate != true ?
                                            (

                                                <button
                                                    onClick={handleReconciliationUpdate}
                                                    disabled={!isUpdateReconciliationObjValid}
                                                    className={`w-36 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white 
                                                    transition-colors duration-200 transform bg-green-400 rounded-md 
                                                    hover:bg-green-700 focus:outline-none focus:bg-green-400
                                                    ${!isUpdateReconciliationObjValid ? 'cursor-not-allowed' : ''}`}>
                                                    {`Save`}
                                                </button>
                                            ) : null
                                    }

                                </div>
                            </div>
                        </div>
                    </>
                ) : isPaymentDetailsLoaded == false ? (
                    (
                        <><p className="text-center font-semibold text-lg text-red-700">
                            {`Something went wrong! Please try again`}
                        </p>
                            <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 lg:max-w-full">
                                <div className="container py-2 px-10 mx-0 min-w-full flex flex-col items-center">
                                    <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                                        <button onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
                                            className="w-36 h-8 px-0 py-0 mx-4 my-0 tracking-wide text-white text-sm font-semibold transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                                            Back
                                        </button>
                                    </div>
                                </div>
                            </div></>)
                ) : (
                    <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 lg:max-w-full">
                        <div className="container py-2 px-10 mx-0 min-w-full flex flex-col items-center">
                            <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                                <button onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
                                    className="w-36 h-8 px-0 py-0 mx-4 my-0 tracking-wide text-white text-sm font-semibold transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ViewPaymentRecords