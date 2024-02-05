import { useMaterialTailwindController } from '@/Dashboard/context';
import { convertStringToLowerCaseNTrim } from '@/utils/commonUtils';
import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import { Option, Select } from '@material-tailwind/react'

function PaymentModesPage({
    paymentTransactionDetails, handlePaymentTransactionDetailsChange, paymentModeObj,
    handlePaymentModeChange
}) {
    const [controller, dispatch] = useMaterialTailwindController();
    const { paymentModeDetailsInputFromAPI } = controller;

    return (
        <div>
            <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end mt-3 mb-6">
                <div className="mb-2 ml-4 mt-2 min-w-fit max-w-fit">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                        Mode Of Payment<p className='contents text-red-600 text-xs font-bold'>*</p>
                    </label>
                    <Select 
                    onChange={handlePaymentModeChange}
                        label="select" className="pl-2 pr-3 py-2 font-bold text-xs text-gray-900">
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
                <div className="mb-0 ml-3 mt-2 min-w-fit max-w-fit">
                    <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                        Narration
                        {/* <p className='contents text-red-600 text-sm font-bold'>*</p> */}
                    </label>
                    <textarea
                    onChange={handlePaymentTransactionDetailsChange}
                        className="bg-white-200 appearance-none border border-gray-500 rounded w-64 h-10 py-2 px-4 text-white-700 
                  leading-tight focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                        id="narration"
                        name="narration" rows="4" cols="20"></textarea>
                </div>
            </div>
            <div className="mb-6"></div>
            {
                (convertStringToLowerCaseNTrim(paymentModeObj?.payment_mode) != "cash"
                    && paymentModeObj?.payment_mode) ? (
                    <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
                        <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                            <h2 className="text-sm font-semibold text-center text-white">
                                Bank Details
                            </h2>
                        </nav>
                        <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                    Bank Name<p className='contents text-red-600 text-xs font-bold'>*</p>
                                </label>
                                <Select onChange={handlePaymentTransactionDetailsChange}
                                    label="select" className="pl-2 pr-3 py-2 w-full font-bold text-xs text-gray-900">
                                    {
                                        paymentModeDetailsInputFromAPI?.length > 0 ? (
                                            paymentModeDetailsInputFromAPI[0]?.bankNameBeans.map((item, index) => {
                                                const { id, bank_name } = item
                                                return (
                                                    <Option key={index} value={JSON.stringify(item)} >{bank_name}</Option>
                                                )
                                            })
                                        ) : <Option>Loading...</Option>
                                    }
                                </Select>
                            </div>
                            {
                                (paymentTransactionDetails?.bank_name + "").trim().toLowerCase() == "others" ? (
                                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                                            Please mention other bank name<p className='contents text-red-600 text-sm font-bold'>*</p>
                                        </label>
                                        <input onChange={handlePaymentTransactionDetailsChange}
                                            value={paymentTransactionDetails.others_bank_name}
                                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                                                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                            id="others_bank_name" type="text" placeholder="Branch" />
                                    </div>
                                ) : null
                            }
                            <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Branch">
                                    Branch<p className='contents text-red-600 text-sm font-bold'>* </p>
                                    <p className='contents text-red-600 text-xs font-bold whitespace-normal'>
                                        Please leave empty if branch name is not applicable for selected payment mode.
                                    </p>
                                </label>
                                <input onChange={handlePaymentTransactionDetailsChange}
                                    value={paymentTransactionDetails.branch}
                                    className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                                                focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                    id="branch" type="text" placeholder="Branch" />
                            </div>
                        </div>

                        {
                            convertStringToLowerCaseNTrim(paymentModeObj?.payment_mode) == "cheque" ? (
                                <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Cheque No.">
                                            Cheque No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                                        </label>
                                        <input onChange={handlePaymentTransactionDetailsChange}
                                            value={paymentTransactionDetails.cheque_no}
                                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                                                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                            id="cheque_no" type="text" placeholder="Cheque No." />
                                    </div>
                                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                            Cheque Date
                                            <p className='contents text-red-600 text-sm font-bold'>*</p>
                                        </label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <Stack spacing={3}>
                                                <DesktopDatePicker
                                                    // label="Date desktop"
                                                    id="cheque_date"
                                                    onChange={handlePaymentTransactionDetailsChange}
                                                    inputFormat="MM/DD/YYYY"
                                                    renderInput={(params) => <TextField {...params} />}
                                                    value={paymentTransactionDetails.cheque_date}
                                                />
                                            </Stack>
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            ) : null
                        }
                        {
                            convertStringToLowerCaseNTrim(paymentModeObj?.payment_mode) == "rtgs" ? (
                                <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Cheque No.">
                                            RTGS No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                                        </label>
                                        <input
                                            onChange={handlePaymentTransactionDetailsChange}
                                            value={paymentTransactionDetails.rtgs_no}
                                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                                                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                            id="rtgs_no" type="text" placeholder="Cheque No." />
                                    </div>
                                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                            RTGS Date
                                            <p className='contents text-red-600 text-sm font-bold'>*</p>
                                        </label>

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <Stack spacing={3}>
                                                <DesktopDatePicker
                                                    // label="Date desktop"
                                                    id="rtgs_date"
                                                    onChange={handlePaymentTransactionDetailsChange}
                                                    inputFormat="YYYY-MM-DD"
                                                    renderInput={(params) => <TextField {...params} />}
                                                    value={paymentTransactionDetails.rtgs_date}
                                                />
                                            </Stack>
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            ) : null
                        }
                        {
                            convertStringToLowerCaseNTrim(paymentModeObj?.payment_mode) == "dd" ? (
                                <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Cheque No.">
                                            DD No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                                        </label>
                                        <input
                                            onChange={handlePaymentTransactionDetailsChange}
                                            value={paymentTransactionDetails.dd_no}
                                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                                                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                            id="dd_no" type="text" placeholder="Cheque No." />
                                    </div>
                                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                            DD Date
                                            <p className='contents text-red-600 text-sm font-bold'>*</p>
                                        </label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <Stack spacing={3}>
                                                <DesktopDatePicker
                                                    // label="Date desktop"
                                                    id="dd_date"
                                                    onChange={handlePaymentTransactionDetailsChange}
                                                    inputFormat="MM/DD/YYYY"
                                                    renderInput={(params) => <TextField {...params} />}
                                                    value={paymentTransactionDetails.dd_date}
                                                />
                                            </Stack>
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            ) : null
                        }
                        {
                            convertStringToLowerCaseNTrim(paymentModeObj?.payment_mode) == "upi" ? (
                                <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Cheque No.">
                                            UPI No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                                        </label>
                                        <input
                                            onChange={handlePaymentTransactionDetailsChange}
                                            value={paymentTransactionDetails?.upi_no}
                                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                                                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                            id="upi_no" type="text" placeholder="Cheque No." />
                                    </div>
                                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                            UPI Date
                                            <p className='contents text-red-600 text-sm font-bold'>*</p>
                                        </label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <Stack spacing={3}>
                                                <DesktopDatePicker
                                                    // label="Date desktop"
                                                    id="upi_date"
                                                    onChange={handlePaymentTransactionDetailsChange}
                                                    inputFormat="MM/DD/YYYY"
                                                    renderInput={(params) => <TextField {...params} />}
                                                    value={paymentTransactionDetails?.upi_date}
                                                />
                                            </Stack>
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            ) : null
                        }
                        {
                            convertStringToLowerCaseNTrim(paymentModeObj?.payment_mode) == "neft" ? (
                                <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Cheque No.">
                                            NEFT No.<p className='contents text-red-600 text-sm font-bold'>*</p>
                                        </label>
                                        <input
                                            onChange={handlePaymentTransactionDetailsChange}
                                            value={paymentTransactionDetails.neft_no}
                                            className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                                                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                            id="neft_no" type="text" placeholder="Cheque No." />
                                    </div>
                                    <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                        <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                            NEFT Date
                                            <p className='contents text-red-600 text-sm font-bold'>*</p>
                                        </label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <Stack spacing={3}>
                                                <DesktopDatePicker
                                                    // label="Date desktop"
                                                    id="neft_date"
                                                    onChange={handlePaymentTransactionDetailsChange}
                                                    inputFormat="MM/DD/YYYY"
                                                    renderInput={(params) => <TextField {...params} />}
                                                    value={paymentTransactionDetails.neft_date}
                                                />
                                            </Stack>
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            ) : null
                        }
                        <div className="mb-6"></div>
                        {
                            convertStringToLowerCaseNTrim(paymentModeObj?.payment_mode) == "card" ? (
                                <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
                                    <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                                        <h2 className="text-sm font-semibold text-center text-white">
                                            Card Details
                                        </h2>
                                    </nav>
                                    <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                                Card Type<p className='contents text-red-600 text-xs font-bold'>*</p>
                                            </label>
                                            <Select
                                                onChange={handlePaymentTransactionDetailsChange}
                                                label="select" className="pl-2 pr-3 py-2 sm:w-full lg:w-72 font-bold text-xs text-gray-900">
                                                <Option value='card_type_credit' >Credit</Option>
                                                <Option value='card_type_debit' >Debit</Option>
                                            </Select>
                                        </div>
                                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Transaction ID">
                                                Transaction ID<p className='contents text-red-600 text-sm font-bold'>*</p>
                                            </label>
                                            <input onChange={handlePaymentTransactionDetailsChange}
                                                value={paymentTransactionDetails.transaction_id}
                                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                                                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                                id="transaction_id" type="text" placeholder="Transaction ID" />
                                        </div>
                                    </div>
                                    <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="APPR Code">
                                                APPR Code<p className='contents text-red-600 text-sm font-bold'>*</p>
                                            </label>
                                            <input onChange={handlePaymentTransactionDetailsChange}
                                                value={paymentTransactionDetails.appr_code}
                                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                                                            focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                                id="appr_code" type="text" placeholder="APPR Code" />
                                        </div>
                                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Card No.">
                                                Card No.(Last 4 Digits)<p className='contents text-red-600 text-sm font-bold'>*</p>
                                            </label>
                                            <input value={paymentTransactionDetails.card_no}
                                                onChange={handlePaymentTransactionDetailsChange}
                                                maxLength="4"
                                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                                                            focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                                id="card_no" type="text" placeholder="Card No." />
                                        </div>
                                    </div>
                                    <div className="md:flex-1 lg:flex min-w-fit max-w-fit items-end ">
                                        <div className="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                            <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="Card Holder Name">
                                                Card Holder Name<p className='contents text-red-600 text-sm font-bold'>*</p>
                                            </label>
                                            <input value={paymentTransactionDetails.card_holder_name}
                                                onChange={handlePaymentTransactionDetailsChange}
                                                className="bg-white-200 appearance-none border border-gray-400 rounded sm:w-full lg:w-72 py-2 px-4 text-white-700 leading-tight
                                                        focus:outline-none focus:bg-white focus:border-2 focus:border-blue-500"
                                                id="card_holder_name" type="text" placeholder="Card Holder Name." />
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                        <div className="mb-6"></div>

                    </div>
                ) : null
            }
        </div>
    )
}

export default PaymentModesPage