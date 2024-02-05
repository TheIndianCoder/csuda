import { getCookieByName } from '@/utils/RequireAuth'
import { createPortal } from 'react-dom'
import { Button } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ColorRing } from 'react-loader-spinner'
import { convertStringToLowerCaseNTrim, convertTransactionDateToFYFormat, inWords } from '@/utils/commonUtils'
import { isBlankString } from '@/utils/formValidatorUtils'
import { SUPER, SUPER_BUILD_UP_AREA_PROP_TYPE_ID } from '@/utils/appConstants'
// import Iframe from '@/utils/Iframe'

const ENGLISH = `english`
const HINDI = `hindi`

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

function PaymentReceipt({ showModal, currModal, propId, switchOnPrevModalNOffCurrModal,
    prevModal, propertyNo, paymentDetailsForReceiptView, receiptDetailsForHindi,
    setReceiptDetailsForHindi, nextModal, receiptHeader
}) {
    // const { handleToggle } = props
    const [lang, setLang] = useState(ENGLISH) 
    const { t, i18n } = useTranslation()

    // const handleChangeLanguage = (language) => {
    //     console.log("param lang got :: " + language)
    //     setLang(language === ENGLISH ? HINDI : ENGLISH)
    //     console.log("language changed to :: " + language)
    //     i18n.changeLanguage(language === ENGLISH ? HINDI : ENGLISH)
    // }

    const handleLanguageChange = () => {
        setReceiptDetailsForHindi(receiptDetails)
        switchOnPrevModalNOffCurrModal(currModal, nextModal)
    }

    const handlePrintToPDF = () => {
        // let print_div = document.getElementById("print_div");
        // let print_area = window.open();
        // print_area.document.write(print_div.innerHTML);
        // print_area.document.close();
        // print_area.focus();
        // print_area.print();
        // print_area.close();
        // This is the code print a particular div element
        // let iframeObj = document.getElementById('printf').contentWindow;
        // iframeObj.focus()
        // iframeObj.print()
        //==================================================
        let printwin = window.open("");
        printwin.document.write(document.getElementById("print_section").innerHTML);
        copyStyles(window.document, printwin.document);
        printwin.print();

    }

    const copyStyles = (src, dest) => {
        // console.log("at the start of copying stylesheets")
        Array.from(src.styleSheets).forEach(styleSheet => {
            // console.log("copying stylesheets")
            // console.log(styleSheet.ownerNode)
            dest.head.appendChild(styleSheet.ownerNode.cloneNode(true))
        })
        Array.from(src.fonts).forEach(font => dest.fonts.add(font))
    }

    const [receiptDetails, setReceiptDetails] = useState([])
    const [isReceiptLoading, setIsReceiptLoading] = useState(null)
    const [isReceipLoaded, setIsReceipLoaded] = useState(null)

    useEffect(() => {
        const loadPaymentReceiptDetails = async () => {
            if (paymentDetailsForReceiptView) {
                if (receiptDetailsForHindi?.length < 1) {
                    setIsReceiptLoading(true)
                    try {
                        const paymentReceiptDetailsGetUrl = `${SUDA_API_BASE_URL}/user/getPaymentReceiptByPropId?frm_year=${paymentDetailsForReceiptView.frm_year}&property_no=${propertyNo}&upto_year=${paymentDetailsForReceiptView.upto_year}&tran_no=${paymentDetailsForReceiptView.transaction_no}&payment_mode=${!isBlankString(paymentDetailsForReceiptView.payment_mode) ? paymentDetailsForReceiptView.payment_mode : "NA"}`
                        const requestOptions = {
                            method: "GET",
                            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
                        }
                        let response = null, responseBody = null
                        response = await fetch(paymentReceiptDetailsGetUrl, requestOptions)
                        responseBody = await response.json()
                        if (response?.status == '200') {
                            setReceiptDetails(responseBody)
                            setIsReceipLoaded(true)
                        } else {
                            setIsReceipLoaded(false)
                        }
                    } catch (err) {
                        setReceiptDetails([])
                        setIsReceipLoaded(false)
                    }
                    finally {
                        setIsReceiptLoading(false)
                    }
                } else {
                    console.log("english version already got, not calling api...")
                    console.log(receiptDetailsForHindi)
                    setReceiptDetails(receiptDetailsForHindi)
                    setIsReceipLoaded(true)
                    setIsReceiptLoading(false)
                }
            }
        }
        loadPaymentReceiptDetails()
    }, [paymentDetailsForReceiptView])

    useEffect(() => {
        console.log('receipt details set=============================================')
        console.log(receiptDetails)
    }, [receiptDetails])

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10 mb-10">
            {
                isReceiptLoading == true ? (
                    <div className="m-auto w-24 h-24">
                        <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            colors={['#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000']}
                        />
                    </div>
                ) : null
            } 
            {
                receiptDetails?.length > 0 && isReceipLoaded == true && isReceiptLoading == false > 0 ? (
                    <div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-md border border-gray-500 lg:max-w-full">
                        <nav className="relative flex navcustomproperty flex-wrap items-center justify-between pl-2 pr-0 py-1 mb-2 ring-1 ring-black rounded-none">
                            <h2 className="text-sm font-semibold text-center text-white">
                                PAYMENT RECEIPT
                            </h2>
                            {/* <button onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
                                className="w-24 h-8 px-0 py-0 mx-4 my-0 tracking-wide text-white text-sm font-semibold transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                                Back
                            </button> */}
                            {/* <Button color="green" className='h-6 w-40 m-2 px-2 py-1 bg-green-700 rounded custom_button_add' 
                        onClick={() => handleChangeLanguage(lang)} >Change to {lang === 'hindi' ? ENGLISH : HINDI}</Button> */}
                            <Button color="green" className='h-6 w-40 m-2 px-2 py-1 bg-green-700 rounded custom_button_add'
                                onClick={handleLanguageChange} >हिंदी में रसीद</Button>
                        </nav>
                        {/* <form className="mt-4 ">
                        <div className="h-screen bg-white py-10 px-2">
                        <div className="container mx-auto">
                            <div className="max-w-sm mx-auto md:max-w-lg">
                                <div className="w-full"> */}
                        {/* <div className="row-container"> */}
                        {/* <iframe src="https://jsfiddle.net/about" class="second-row"></iframe> */}
                        {/* <Iframe id='printf' name='printf' className='second-row' > */}
                        <section id='print_section' className="py-0  bg-white">
                            <div className="max-w-3xl mx-auto py-5 bg-white">

                                <article className="overflow-hidden border-dotted border-2 border-black">
                                    <div className="bg-[white] rounded-b-md bg-img">
                                        <div className="p-2">
                                            <div className="space-y-2 text-slate-700">
                                                <div className="flex flex-col mb-1">
                                                    <div className="overflow-x-auto">
                                                        <div className="p-1 lg:w-full inline-block align-middle">
                                                            <div className="overflow-hidden">
                                                                <table className="min-w-full">
                                                                    {/* <thead className="preview-payment-form-table-laypout">
                                                                    </thead> */}
                                                                    <tbody className="divide-y divide-gray-200">
                                                                        <tr>
                                                                            <td className="px-1 py-1 text-center  whitespace-nowrap">
                                                                                <img className="h-12" src="/img/rjnlogo.jpg" />
                                                                            </td>
                                                                            <td className="px-1 py-1 text-center  whitespace-nowrap">
                                                                                <p className="text-2xl font-extrabold tracking-tight uppercase font-body text-center">
                                                                                RAJNANDGAON MUNICIPAL CORPORATION, RAJNANDGAON</p>
                                                                            </td>
                                                                            <td className="px-1 py-1 text-center  whitespace-nowrap">
                                                                                <img className="h-12" src="/img/swachh_bharat.jpg" />
                                                                            </td>

                                                                        </tr>


                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-xl font-bold mb-2 tracking-tight uppercase font-body text-center">
                                                    PROPERTY TAX RECEIPT
                                                    {
                                                        receiptDetails[0]?.check_status == '1' ||
                                                        convertStringToLowerCaseNTrim(receiptDetails[0]?.mode_of_payment) == 'cash' ?
                                                        `` : ` (Temporary)`
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="overflow-x-auto">
                                                <div className="p-2.5 lg:w-full inline-block align-middle">
                                                    <div className="overflow-hidden">
                                                        <table className="min-w-full">
                                                            <thead className="bg-gray-50">

                                                            </thead>
                                                            <tbody> 
                                                                <tr>
                                                                    <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                                        Receipt No.
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                        :
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                        {receiptDetails[0]?.receipt_no}
                                                                    </td>
                                                                    <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                                        Department/Section
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                        :
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                        {receiptDetails[0]?.department_section}
                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                        Account Description
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                        :
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">

                                                                        {receiptDetails[0]?.account_description}

                                                                    </td>
                                                                    <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                        Date
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                        :
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                        {receiptDetails[0]?.date}

                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                        Ward No
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900  whitespace-normal">
                                                                        :
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                        {receiptDetails[0]?.ward_no}

                                                                    </td>
                                                                    <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                        Property No.
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                        :
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                        {receiptDetails[0]?.property_no}

                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    {/* <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 ">
                                Consumer No.
                            </td>
                            <td className="px-3 py-0 text-xs text-gray-900 ">
                                :
                            </td>
                            <td className="px-3 py-0 text-xs text-gray-900 ">
                                1022566006

                            </td> */}
                                                                    <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                        Usage Type
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                        :
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900  whitespace-normal">
                                                                        {receiptDetails[0]?.uses_type_name}

                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                        Owner Name
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900  whitespace-normal">
                                                                        :
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">

                                                                        {receiptDetails[0].owner_name}

                                                                    </td>
                                                                    <td className="px-3 py-0 font-semibold text-xs  font-medium text-gray-900 whitespace-normal ">
                                                                        Mobile No.
                                                                    </td>
                                                                    <td className="px-3 py-0 font-semibold text-xs  text-gray-900 whitespace-normal">
                                                                        :
                                                                    </td>
                                                                    <td className="px-3 py-0 font-normal text-xs  text-gray-900 whitespace-normal">
                                                                        {receiptDetails[0]?.mobile_no}
                                                                    </td>
                                                                </tr>
                                                                <tr>

                                                                    <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                                        Address
                                                                    </td>
                                                                    <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                                        :
                                                                    </td>
                                                                    <td className="px-3 py-0 font-normal text-xs text-gray-900 ">
                                                                        {receiptDetails[0]?.address}
                                                                    </td>
                                                                    <td className="px-3 py-0 font-semibold text-xs  font-medium text-gray-900 whitespace-normal">
                                                                        Area(Sq.ft)
                                                                    </td>
                                                                    <td className="px-3 py-0 font-semibold text-xs  text-gray-900 whitespace-normal">
                                                                        :
                                                                    </td>
                                                                    <td className="px-3 py-0 font-normal text-xs  text-gray-900 whitespace-normal">
                                                                        {receiptDetails[0]?.total_builtup_area}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="px-1 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                                        <div className="flex flex-col mb-1">
                                                                            <div className="overflow-x-auto">
                                                                                <div className="p-1.5 lg:w-full inline-block align-middle">
                                                                                    <div className="overflow-hidden">
                                                                                        <table className="table-fixed w-full">
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th
                                                                                                        scope="col"
                                                                                                        className="px-1 py-1 text-xs text-center font-semibold  text-gray-700 whitespace-normal  border border-gray-300"
                                                                                                    >
                                                                                                        Floor
                                                                                                    </th>
                                                                                                    <th
                                                                                                        scope="col"
                                                                                                        className="px-1 py-1 text-xs text-center font-semibold  text-gray-700 whitespace-normal  border border-gray-300"
                                                                                                    >
                                                                                                        {
                                                                                                            receiptDetails[0].propertyTypeId == SUPER_BUILD_UP_AREA_PROP_TYPE_ID ? SUPER : ''
                                                                                                        } 
                                                                                                        Buildup(Sq.ft) 
                                                                                                    </th>
                                                                                                    <th
                                                                                                        scope="col"
                                                                                                        className="px-1 py-1 text-xs text-center font-semibold  text-gray-700 whitespace-normal  border border-gray-300"
                                                                                                    >
                                                                                                        Usage
                                                                                                    </th>


                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody className="divide-y divide-gray-200">
                                                                                                {
                                                                                                    receiptDetails[0]?.floor_details?.map((item, index) => {
                                                                                                        const { floor_name, built_up_area, usage } = item
                                                                                                        return (
                                                                                                            <tr key={index} >
                                                                                                                <td className="px-1 py-1 text-center text-xs font-medium text-gray-700 whitespace-normal border border-gray-300">
                                                                                                                    {floor_name ? floor_name : 'N/A'}
                                                                                                                </td>
                                                                                                                <td className="px-1 py-1 text-center text-xs font-medium text-gray-700 whitespace-normal border border-gray-300">
                                                                                                                    {built_up_area ? built_up_area : 'N/A'}
                                                                                                                </td>
                                                                                                                <td className="px-1 py-1 text-center text-xs font-medium text-gray-700 whitespace-normal border border-gray-300">
                                                                                                                    {usage ? usage : 'N/A'}
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
                                                                    </td>



                                                                </tr>




                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col mb-1">
                                            <div className="overflow-x-auto">
                                                <div className="p-2.5 lg:w-full inline-block align-middle">
                                                    <div className="overflow-hidden">
                                                        <table className="table-fixed w-full">
                                                            <thead className="preview-payment-recipt-form-table-laypout">
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td colSpan="3" className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">

                                                                        <div className="text-left text-xs  text-gray-900 float-left">A Sum of Rs. </div>
                                                                        <div className="text-left text-xs font-semibold  ml-2 text-gray-900 float-left">{receiptDetails[0]?.receivable_amount} (In words.) </div>
                                                                        <div className="Payment_recipt_custom float-left font-semibold text-xs">
                                                                            {
                                                                                (receiptDetails[0]?.receivable_amount + "").includes(".") ? (
                                                                                    inWords((receiptDetails[0].receivable_amount + "").split(".")[0]) + " Rs. and " +
                                                                                    inWords((receiptDetails[0].receivable_amount + "").split(".")[1]) + " Paisa Only"
                                                                                )
                                                                                    : (
                                                                                        inWords((receiptDetails[0].receivable_amount + "")) + " Rs."
                                                                                    )
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="3" className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">

                                                                        <div className="text-left text-xs  text-gray-900 float-left">towards Holding Tax  & Others vide</div>
                                                                        <div className="Payment_recipt_custom_small ml-2 float-left text-xs font-semibold capitalize">
                                                                            {
                                                                                (receiptDetails[0]?.mode_of_payment + "").trim().toLowerCase() ==
                                                                                    'card' ? receiptDetails[0]?.card_type + " " : ''
                                                                            }
                                                                            {receiptDetails[0]?.mode_of_payment}
                                                                        </div>
                                                                        <div className="text-left text-xs  ml-2 text-gray-900 float-left">Online No.</div>
                                                                        <div className="Payment_recipt_custom_small float-left font-semibold text-xs">{receiptDetails[0]?.online_no ? receiptDetails[0]?.online_no : `NA`}</div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="3" className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">

                                                                        <div className="text-left text-xs  text-gray-900 float-left">dated</div>
                                                                        <div className="Payment_recipt_custom_small float-left font-semibold text-xs">{receiptDetails[0]?.date}</div>
                                                                        <div className="text-left text-xs  ml-2 text-gray-900 float-left">drawn on</div>
                                                                        <div className="Payment_recipt_custom_small float-left font-semibold text-xs">{receiptDetails[0]?.drawn_on ? receiptDetails[0]?.drawn_on : `NA`}</div>
                                                                        <div className="text-left text-xs  ml-2 text-gray-900 float-left">Bank Name</div>
                                                                        <div className="Payment_recipt_custom_small float-left font-semibold text-xs">{receiptDetails[0]?.bank_name ? receiptDetails[0]?.bank_name : `NA`}</div>

                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="3" className="px-0 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">
                                                                        <div className="text-left text-xs  ml-2 text-gray-900 float-left">Place of the bank</div>
                                                                        <div className="Payment_recipt_custom_small float-left font-semibold text-xs">{receiptDetails[0]?.branch_location ? receiptDetails[0]?.branch_location : `NA`}</div>
                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="3" className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">

                                                                        <div className="text-left text-sm font-semibold text-gray-900 float-left">N.B.Online Payment/Cheque/Draft/ Bankers Cheque are Subject to realization</div>

                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col mb-1">

                                            <div className="overflow-x-auto">
                                                <div className="p-2.5 lg:w-full inline-block align-middle">
                                                    <div className="overflow-hidden">
                                                        <table className="w-full table-fixed">
                                                            <thead className="preview-payment-recipt-form-table-laypout">
                                                                <tr>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-1 py-0 text-xs text-left font-bold  whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                                    >
                                                                        Account Description
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-1 py-0 text-xs text-center font-bold whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                                    >
                                                                        Period
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-1 py-0 text-xs text-left font-bold  whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                                    >
                                                                        Amount
                                                                    </th>

                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-gray-200">
                                                                {
                                                                    receiptDetails[0]?.payment_details ? (
                                                                        receiptDetails[0]?.payment_details.map((item, index) => {
                                                                            return (
                                                                                <>
                                                                                    {
                                                                                        receiptDetails[0]?.payment_details ? (
                                                                                            // receiptDetails[0]?.payment_details[0]?.property_tax_arrear != null &&
                                                                                            // receiptDetails[0]?.payment_details[0]?.property_tax_arrear != 0 ? (
                                                                                            <tr>
                                                                                                <td className="px-1 py-0 text-left text-xs  whitespace-normal text-gray-900  border border-gray-900">
                                                                                                    Property Tax Arrear

                                                                                                </td>
                                                                                                <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-normal border border-gray-900">
                                                                                                    {receiptDetails[0]?.payment_details[index]?.previousEffectYear ?
                                                                                                        receiptDetails[0]?.payment_details[index]?.previousEffectYear :
                                                                                                        (receiptDetails[0]?.payment_details[0]?.currentEffectYear ?
                                                                                                            receiptDetails[0]?.payment_details[0]?.currentEffectYear : 'N/A')} 
                                                                                                            {/* {` To `}

                                                                                                    {receiptDetails[0]?.payment_details[0]?.currentEffectYear ?
                                                                                                        receiptDetails[0]?.payment_details[index]?.currentEffectYear :
                                                                                                        convertTransactionDateToFYFormat(receiptDetails[0].date)
                                                                                                    } */}
                                                                                                </td>
                                                                                                <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                                    {receiptDetails[0]?.payment_details[index]?.property_tax_arrear != null ?
                                                                                                        receiptDetails[0]?.payment_details[index]?.property_tax_arrear : 'N/A'}
                                                                                                </td>
                                                                                            </tr>
                                                                                            // ) : null
                                                                                        ) : null


                                                                                    }
                                                                                    {
                                                                                        receiptDetails[0]?.payment_details ? (
                                                                                            // (receiptDetails[0]?.payment_details[0]?.property_tax != null &&
                                                                                            // receiptDetails[0]?.payment_details[0]?.property_tax != 0) ?
                                                                                            // (
                                                                                            <tr>
                                                                                                <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                                    Property Tax Current
                                                                                                </td>
                                                                                                <td className="px-1 py-0 text-center text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                                    {/* {receiptDetails[0]?.payment_details[index]?.previousEffectYear ?
                                                                                                        receiptDetails[0]?.payment_details[index]?.previousEffectYear :
                                                                                                        (receiptDetails[0]?.payment_details[0]?.currentEffectYear ?
                                                                                                            receiptDetails[0]?.payment_details[0]?.currentEffectYear : 'N/A')} {` To `} */}

                                                                                                    {receiptDetails[0]?.payment_details[0]?.currentEffectYear ?
                                                                                                        receiptDetails[0]?.payment_details[index]?.currentEffectYear :
                                                                                                        convertTransactionDateToFYFormat(receiptDetails[0].date)
                                                                                                    }
                                                                                                </td>
                                                                                                <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                                    {receiptDetails[0]?.payment_details[index]?.property_tax != null ?
                                                                                                        receiptDetails[0]?.payment_details[index]?.property_tax : 'N/A'}
                                                                                                </td>
                                                                                            </tr>
                                                                                            // ) : null
                                                                                        ) : null

                                                                                    }
                                                                                    {
                                                                                        receiptDetails[0]?.payment_details ? (
                                                                                            // receiptDetails[0]?.payment_details[0]?.smerik_kar_arrear != null &&
                                                                                            // receiptDetails[0]?.payment_details[0]?.smerik_kar_arrear != 0 ?
                                                                                            // (
                                                                                            <tr>
                                                                                                <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                                    Samekit Kar Arrear
                                                                                                </td>
                                                                                                <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-normal border border-gray-900">
                                                                                                    {receiptDetails[0]?.payment_details[index]?.previousEffectYear ?
                                                                                                        receiptDetails[0]?.payment_details[index]?.previousEffectYear :
                                                                                                        (receiptDetails[0]?.payment_details[0]?.currentEffectYear ?
                                                                                                            receiptDetails[0]?.payment_details[0]?.currentEffectYear : 'N/A')} 
                                                                                                            {/* {` To `}

                                                                                                    {receiptDetails[0]?.payment_details[0]?.currentEffectYear ?
                                                                                                        receiptDetails[0]?.payment_details[index]?.currentEffectYear :
                                                                                                        convertTransactionDateToFYFormat(receiptDetails[0].date)
                                                                                                    } */}
                                                                                                </td>
                                                                                                <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                                    {receiptDetails[0]?.payment_details[index]?.smerik_kar_arrear != null ?
                                                                                                        receiptDetails[0]?.payment_details[index]?.smerik_kar_arrear : 'N/A'}
                                                                                                </td>
                                                                                            </tr>
                                                                                            // ) : null
                                                                                        ) : null

                                                                                    }
                                                                                    {
                                                                                        receiptDetails[0]?.payment_details ? (
                                                                                            // receiptDetails[0]?.payment_details[0]?.smerik_kar_arrear != null &&
                                                                                            // receiptDetails[0]?.payment_details[0]?.smerik_kar_arrear != 0 ?
                                                                                            // (
                                                                                            <tr>
                                                                                                <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                                    Samekit Kar Current
                                                                                                </td>
                                                                                                <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-normal border border-gray-900">
                                                                                                    {/* {receiptDetails[0]?.payment_details[index]?.previousEffectYear ?
                                                                                                        receiptDetails[0]?.payment_details[index]?.previousEffectYear :
                                                                                                        (receiptDetails[0]?.payment_details[0]?.currentEffectYear ?
                                                                                                            receiptDetails[0]?.payment_details[0]?.currentEffectYear : 'N/A')} {` To `} */}

                                                                                                    {receiptDetails[0]?.payment_details[0]?.currentEffectYear ?
                                                                                                        receiptDetails[0]?.payment_details[index]?.currentEffectYear :
                                                                                                        convertTransactionDateToFYFormat(receiptDetails[0].date)
                                                                                                    }
                                                                                                </td>
                                                                                                <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                                    {receiptDetails[0]?.payment_details[index]?.samerik_kar != null ?
                                                                                                        receiptDetails[0]?.payment_details[index]?.samerik_kar : 'N/A'}
                                                                                                </td>
                                                                                            </tr>
                                                                                            // ) : null
                                                                                        ) : null
                                                                                    }
                                                                                    {
                                                                                        receiptDetails[0]?.payment_details ? (
                                                                                            // receiptDetails[0]?.payment_details[0]?.education_cess_arrear != null &&
                                                                                            // receiptDetails[0]?.payment_details[0]?.education_cess_arrear != 0 ?
                                                                                            // (
                                                                                            <tr>
                                                                                                <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                                    Education Cess Arrear
                                                                                                </td>
                                                                                                <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-normal border border-gray-900">
                                                                                                    {receiptDetails[0]?.payment_details[index]?.previousEffectYear ?
                                                                                                        receiptDetails[0]?.payment_details[index]?.previousEffectYear :
                                                                                                        (receiptDetails[0]?.payment_details[0]?.currentEffectYear ?
                                                                                                            receiptDetails[0]?.payment_details[0]?.currentEffectYear : 'N/A')} 
                                                                                                            {/* {` To `}

                                                                                                    {receiptDetails[0]?.payment_details[0]?.currentEffectYear ?
                                                                                                        receiptDetails[0]?.payment_details[index]?.currentEffectYear :
                                                                                                        convertTransactionDateToFYFormat(receiptDetails[0].date)
                                                                                                    } */}
                                                                                                </td>
                                                                                                <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                                    {receiptDetails[0]?.payment_details[index]?.education_cess_arrear != null ?
                                                                                                        receiptDetails[0]?.payment_details[index]?.education_cess_arrear : 'N/A'}
                                                                                                </td>
                                                                                            </tr>
                                                                                            // ) : null
                                                                                        ) : null
                                                                                    }
                                                                                    {
                                                                                        receiptDetails[0]?.payment_details ? (
                                                                                            // receiptDetails[0]?.payment_details[0]?.education_cess != null &&
                                                                                            // receiptDetails[0]?.payment_details[0]?.education_cess != 0 ?
                                                                                            // (
                                                                                            <tr>
                                                                                                <td className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                                    Education Cess Current
                                                                                                </td>
                                                                                                <td className="px-1 py-0 text-center text-xs text-gray-900 whitespace-normal border border-gray-900">
                                                                                                    {/* {receiptDetails[0]?.payment_details[index]?.previousEffectYear ?
                                                                                                        receiptDetails[0]?.payment_details[index]?.previousEffectYear :
                                                                                                        (receiptDetails[0]?.payment_details[0]?.currentEffectYear ?
                                                                                                            receiptDetails[0]?.payment_details[0]?.currentEffectYear : 'N/A')} {` To `} */}

                                                                                                    {receiptDetails[0]?.payment_details[0]?.currentEffectYear ?
                                                                                                        receiptDetails[0]?.payment_details[index]?.currentEffectYear :
                                                                                                        convertTransactionDateToFYFormat(receiptDetails[0].date)
                                                                                                    }
                                                                                                </td>
                                                                                                <td className="px-1 py-0 text-right text-xs  text-gray-900 whitespace-normal border border-gray-900">
                                                                                                    {receiptDetails[0]?.payment_details[index]?.education_cess != null ?
                                                                                                        receiptDetails[0]?.payment_details[index]?.education_cess : 'N/A'}
                                                                                                </td>
                                                                                            </tr>
                                                                                            // ) : null
                                                                                        ) : null
                                                                                    }

                                                                                </>
                                                                            )
                                                                        })
                                                                    ) : null
                                                                }
                                                                {
                                                                    receiptDetails[0]?.rain_water_harvesting != null
                                                                        // &&
                                                                        // receiptDetails[0]?.rain_water_harvesting != '0' 
                                                                        ? (
                                                                            <tr>
                                                                                <td colSpan="2" className="px-1 py-0 text-right text-xs  font-medium text-gray-900 whitespace-normal border border-gray-900">Rain Water Harvesting Penalty</td>
                                                                                <td className="px-1 py-0 text-right text-xs  text-gray-900 font-bold whitespace-nowrap border border-gray-900">
                                                                                    {receiptDetails[0]?.rain_water_harvesting != null ? receiptDetails[0]?.rain_water_harvesting : '0'}
                                                                                </td>
                                                                            </tr>

                                                                        ) : null
                                                                }
                                                                <tr>
                                                                    {
                                                                        receiptDetails[0]?.penal_charge != null &&
                                                                            receiptDetails[0]?.penal_charge != '0' ? (
                                                                            <>
                                                                                <td colSpan="2" className="px-1 py-0 text-right text-xs  font-medium text-gray-900 whitespace-normal border border-gray-900">Penal Charge</td>
                                                                                <td className="px-1 py-0 text-right text-xs  text-gray-900 font-bold whitespace-nowrap border border-gray-900">
                                                                                    {receiptDetails[0]?.penal_charge != null ? receiptDetails[0]?.penal_charge : '0'}
                                                                                </td>
                                                                            </>

                                                                        ) : null
                                                                    }


                                                                </tr>

                                                                <tr>
                                                                    <td colSpan="2" className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-normal border border-gray-900">Form Fee</td>
                                                                    <td className="px-1 py-0 text-right text-xs font-bold text-gray-900 whitespace-nowrap border border-gray-900">
                                                                        {receiptDetails[0]?.form_fee != null ? receiptDetails[0]?.form_fee : '0'}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    {
                                                                        receiptDetails[0]?.penalty_amount != null &&
                                                                            receiptDetails[0]?.penalty_amount != '0' ?
                                                                            (
                                                                                <>
                                                                                    <td colSpan="2" className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-normal border border-gray-900">Penalty Amount</td>
                                                                                    <td className="px-1 py-0 text-right text-xs font-bold text-gray-900 whitespace-nowrap border border-gray-900">
                                                                                        {receiptDetails[0]?.penalty_amount != null ? receiptDetails[0]?.penalty_amount : '0'}
                                                                                    </td>
                                                                                </>
                                                                            ) : null
                                                                    }

                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2" className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-normal border border-gray-900">Total</td>
                                                                    <td className="px-1 py-0 text-right text-xs font-bold text-gray-900 whitespace-nowrap border border-gray-900">
                                                                        {receiptDetails[0]?.receivable_amount != null ? receiptDetails[0]?.receivable_amount : '0'}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"
                                                                        className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-normal border border-gray-900">
                                                                        Amount Adjust
                                                                    </td>
                                                                    <td className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-nowrap border border-gray-900">
                                                                        {receiptDetails[0]?.adjustment_amount != null ? receiptDetails[0]?.adjustment_amount : '0'}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2"
                                                                        className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-normal border border-gray-900">
                                                                        Balance/ Difference Amount Received
                                                                    </td>
                                                                    <td className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-nowrap border border-gray-900">
                                                                        {receiptDetails[0]?.diference_amount != null ? receiptDetails[0]?.diference_amount : '0'}
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2" className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-normal border border-gray-900">Amount Received</td>
                                                                    <td className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-nowrap border border-gray-900">
                                                                        {receiptDetails[0]?.receivable_amount != null ? receiptDetails[0]?.receivable_amount : '0'}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="overflow-x-auto">
                                                <div className="p-1.5 lg:w-full inline-block align-middle">
                                                    <div className="overflow-hidden">
                                                        <table className="table-fixed w-full">
                                                            <thead className="bg-gray-50">

                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    {/* <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-nowrap">
                                <img className="w-32" src='/img/QR_Code.png' />
                            </td> */}

                                                                    <td className="px-3 py-0 text-right text-xs text-gray-900 font-bold whitespace-normal">
                                                                        Signature Of Tax Collector
                                                                    </td>

                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-xs font-light mx-3 my-2 text-slate-700">
                                            <h2 className="mb-1 text-xs font-semibold text-gray-900 dark:text-white">Note:</h2>
                                            <ul className="list-disc px-10">
                                                <li className="mt-0 mb-0">
                                                    <span className="font-normal text-xs text-gray-900 dark:text-white">This is a Computer generated Receipt and does not require physical signature. </span>
                                                </li>
                                                <li className="mt-0 mb-0">
                                                    <span className="font-normal text-xs text-gray-900 dark:text-white">संपत्ति कर भूमि या मकान का मालिकाना हक़ प्रदान नहीं करता है</span>
                                                </li>
                                                <li className="mt-0 mb-0">
                                                    <span className="font-normal text-xs text-gray-900 dark:text-white">For Details Call us at 1800 890 4115</span>
                                                </li>
                                                <li className="mt-0 mb-0">
                                                    <span className="font-normal text-xs font-semibold text-gray-900 dark:text-white">Cheque / Draft / Banker Cheque / Online payment are subject to realization</span>
                                                </li>
                                                <li className="mt-0 mb-0">
                                                    <span className="font-normal text-xs text-gray-900 dark:text-white">You may validate receipt by scanning QR Code.</span>
                                                </li>
                                                <li className="mt-0 mb-0">
                                                    <span className="font-normal text-xs text-gray-900 dark:text-white">Print Date : {
                                                        (new Date()).toString()
                                                    }</span>
                                                </li>
                                            </ul>
                                            {/* </li> */}
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="overflow-x-auto">
                                                <div className="p-1 mb-3 lg:w-full inline-block align-middle">
                                                    <div className="overflow-hidden">
                                                        <table className="table-fixed w-full">
                                                            <thead className="bg-gray-50">

                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="px-3 py-0 font-bold text-xs font-normal text-gray-900 whitespace-normal">
                                                                    RAJNANDGAON MUNICIPAL CORPORATION, RAJNANDGAON
                                                                    </td>
                                                                    <td className="px-3 py-0 text-right text-xs text-gray-900 font-normal whitespace-normal">
                                                                        In Collaboration With <b>Sri Publications & Stationers Pvt. Ltd.</b>
                                                                    </td>

                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                </article>
                            </div >

                        </section >

                        {/* </Iframe> */}
                        {/* </div> */}

                        <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 lg:max-w-full">

                            <div className="container py-2 px-10 mx-0 min-w-full flex flex-col items-center">
                                <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                                    {/* <CustomBackButton showCustomBackButton={true} /> */}

                                    <button onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
                                        className="w-36 h-8 px-0 py-0 mx-4 my-0 tracking-wide text-white text-sm font-semibold transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                                        Back
                                    </button>
                                    <button
                                        onClick={handlePrintToPDF} className=" w-36 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                                        Print
                                    </button>

                                    {/* <button onClick={() => switchOnNextModalNOffCurrModal(currModal, nextModal)}
                                    className="w-36 h-8 px-4 py-1  mx-4 mb-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-indigo-600">
                                    Proceed
                                </button> */}
                                </div>



                            </div>

                        </div>
                        {/* </div>
                            </div>
                        </div>
                       </div>
                        </form> */}
                    </div>
                ) : null
            }
            {
                isReceipLoaded == false ? (
                    <>
                        <button onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
                            className="w-36 h-8 px-0 py-0 mx-4 my-0 tracking-wide text-white text-sm font-semibold transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                            Back
                        </button>
                        <p className="text-center font-semibold text-sm text-red-700">Unable to load payment receipt details</p>
                    </>
                ) : null
            }
        </div>
    )
}

export default PaymentReceipt 