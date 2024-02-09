import React, { useEffect, useState } from 'react'
import { Button } from '@material-tailwind/react'
import { convertStringToLowerCaseNTrim, convertTransactionDateToFYFormat, inWords } from '@/utils/commonUtils'
import { SUPER, SUPER_BUILD_UP_AREA_PROP_TYPE_ID } from '@/utils/appConstants'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

const PaymentReceiptViewPaymentDetails = ({setDisplayHindiForm, consumerNumberAfterCreation, modeOfPayment,
    consumerDetails, consumerPaymentDetails, val,
setDisplayConsumerPaymentDetail, setDisplayPrintDemandForm}) => {
  const [receiptDetails, setReceiptDetails] = useState([])
  console.log("Db test",consumerDetails)
    const handleLanguageChange = () => {
        setDisplayHindiForm(true)
    }
    const backHandler = () => {
        setDisplayConsumerPaymentDetail(true)
        setDisplayPrintDemandForm(false)
    }
    const handlePrintToPDF = () => {
        let printwin = window.open("");
        printwin.document.write(document.getElementById("print_section").innerHTML);
        copyStyles(window.document, printwin.document);
        printwin.print();
    }
    const copyStyles = (src, dest) => {
          console.log("at the start of copying stylesheets")
        Array.from(src.styleSheets).forEach(styleSheet => {
             console.log("copying stylesheets")
            console.log(styleSheet.ownerNode)
            dest.head.appendChild(styleSheet.ownerNode.cloneNode(true))
        })
        Array.from(src.fonts).forEach(font => dest.fonts.add(font))
    }
 useEffect(()=>{
    console.log(consumerDetails, consumerPaymentDetails)
    console.log(typeof consumerPaymentDetails[val]?.payableAmount,typeof receiptDetails?.form_fee)
 },[consumerDetails, consumerPaymentDetails])
    // useEffect(() => {
    //     const loadPaymentReceiptDetails = async () => {
    //                 try {
    //                     const paymentReceiptDetailsGetUrl = `${SUDA_API_BASE_URL}/user/Water/GetReceipt/${consumerNumberAfterCreation}/${modeOfPayment}`
    //                     const requestOptions = {
    //                         method: "GET",
    //                         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
    //                     }
    //                     let response = null, responseBody = null
    //                     response = await fetch(paymentReceiptDetailsGetUrl, requestOptions)
    //                     responseBody = await response.json()
    //                     console.log("in recept ", responseBody)
    //                     if (response?.status == '200') {
    //                         console.log("in recept 200", responseBody)
    //                         setReceiptDetails(responseBody)

    //                     } else {

    //                     }
    //                 } catch (err) {
    //                     console.error(err)
    //                     setReceiptDetails([])

    //                 }
    //                 finally {

    //                 }
    //     }
    //     loadPaymentReceiptDetails()
    // }, [])
useEffect(()=>{
console.log(val)
},[])
    return (
      <div className="relative mb-10 mt-10 flex min-h-screen flex-col justify-center overflow-hidden">
        <ToastContainer autoClose={2000} />
        <div className="m-auto w-full rounded-md border border-gray-500 bg-white px-0 pb-4 pt-0 lg:max-w-full">
          <nav className="navcustomproperty relative mb-2 flex flex-wrap items-center justify-between rounded-lg py-1 pl-2 pr-0 ring-1 ring-red-700 bg-orange-800 h-10">
            <h2 className="text-center text-sm font-semibold text-white">
              PAYMENT RECEIPT
            </h2>
            {/* <button onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
                                    className="w-24 h-8 px-0 py-0 mx-4 my-0 tracking-wide text-white text-sm font-semibold transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                                    Back
                                </button> */}
            {/* <Button color="green" className='h-6 w-40 m-2 px-2 py-1 bg-green-700 rounded custom_button_add'
                             onClick={() => handleChangeLanguage(lang)} >Change to {lang === 'hindi' ? ENGLISH : HINDI}</Button> */}
            <Button
              color="green"
              className="custom_button_add m-2 h-6 w-40 rounded bg-green-700 px-2 py-1"
              onClick={() => setDisplayHindiForm(true)}
            >
              हिंदी में रसीद
            </Button>
          </nav>
          {/* <form className="mt-4 ">
                            <div className="h-screen bg-white py-10 px-2">
                            <div className="container mx-auto">
                                <div className="max-w-sm mx-auto md:max-w-lg">
                                    <div className="w-full"> */}
          {/* <div className="row-container"> */}
          {/* <iframe src="https://jsfiddle.net/about" class="second-row"></iframe> */}
          {/* <Iframe id='printf' name='printf' className='second-row' > */}
          <section id="print_section" className="bg-white  py-0">
            <div className="mx-auto max-w-3xl bg-white py-5">
              <article className="overflow-hidden border-2 border-dotted border-black">
                <div className="bg-img rounded-b-md bg-[white]">
                  <div className="p-2">
                    <div className="text-slate-700 space-y-2">
                      <div className="mb-1 flex flex-col">
                        <div className="overflow-x-auto">
                          <div className="inline-block p-1 align-middle lg:w-full">
                            <div className="overflow-hidden">
                              <table className="min-w-full">
                                {/* <thead className="preview-payment-form-table-laypout">
                                                                        </thead> */}
                                <tbody className="divide-y divide-gray-200">
                                  <tr>
                                    <td className="whitespace-nowrap px-1 py-1  text-center">
                                      <img
                                        className="h-12"
                                        src="/img/Bhilai_recipt.png"
                                      />
                                    </td>
                                    <td className="whitespace-nowrap px-1 py-1  text-center">
                                      <p className="text-center font-body text-2xl font-extrabold uppercase tracking-tight">
                                        RAJNANDGAON MUNICIPAL CORPORATION, RAJNANDGAON
                                      </p>
                                    </td>
                                    <td className="whitespace-nowrap px-1 py-1  text-center">
                                      <img
                                        className="h-12"
                                        src="/img/swachh_bharat.jpg"
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="my-3 flex items-center justify-center">
                        <span className='className="text-xl border-2 border-black p-2 text-center font-body font-semibold uppercase tracking-tight'>
                          Water Tax <br />
                          Payment Receipt
                        </span>
                      </div>
                      <p className="mb-2 text-center font-body text-xl font-bold uppercase tracking-tight">
                        {/* PROPERTY TAX RECEIPT  */}
                        {receiptDetails.description}
                        {/* {
                                                            receiptDetails?.check_status == '1' ||
                                                            convertStringToLowerCaseNTrim(receiptDetails?.modeofpayment) == 'cash' ?
                                                            `` : ` (Temporary)`
                                                        } */}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="overflow-x-auto">
                      <div className="inline-block p-2.5 align-middle lg:w-full">
                        <div className="overflow-hidden">
                          <table className="min-w-full">
                            <thead className="bg-gray-50"></thead>
                            <tbody>
                              <tr>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900">
                                  Receipt No.
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                                  {consumerPaymentDetails[val]?.receiptNo}
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900">
                                  Department/Section
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                                  Water supply
                                </td>
                              </tr>
                              <tr>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                                  Consumer name
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                                  {consumerDetails?.consumerName}
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                                  Consumer no
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                                  {consumerDetails?.consumerNo}
                                </td>
                              </tr>
                              <tr>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                                  Ward No
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs  text-gray-900">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                                  {consumerDetails?.wardNo}
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                                  Property No.
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900">
                                  {consumerDetails?.propertyNo}
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
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                                  Connection Type
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs  text-gray-900">
                                  {consumerDetails?.connectionType}
                                </td>

                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                                  Payment Mode
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs  text-gray-900">
                                  {consumerPaymentDetails[val]?.paymentMode}
                                </td>
                              </tr>
                              <tr>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900 ">
                                  Total payable
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs  text-gray-900">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs text-gray-900 ">
                                  {consumerPaymentDetails[val]?.payableAmount}
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs  font-medium font-semibold text-gray-900 ">
                                  Mobile No.
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs  font-semibold text-gray-900">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs  font-normal text-gray-900">
                                  {consumerDetails?.mobileNo}
                                </td>
                              </tr>
                              <tr>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900">
                                  Payment Date
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900">
                                  :
                                </td>
                                <td className="px-3 py-0 text-xs font-normal text-gray-900 ">
                                  {consumerPaymentDetails[val]?.transactionDate}
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs  font-medium font-semibold text-gray-900">
                                  Penalty
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs  font-semibold text-gray-900">
                                  :
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs  font-normal text-gray-900">
                                  {consumerPaymentDetails[val]?.penalty}
                                </td>
                              </tr>
                              <tr>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900">
                                  Address
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-xs font-medium font-semibold text-gray-900">
                                  :
                                </td>
                                <td className="px-3 py-0 text-xs font-normal text-gray-900 ">
                                  {consumerDetails?.propertyAddress}
                                </td>
                              </tr>
                              {/* <tr>
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
                                                                                                                receiptDetails?.propertyTypeId == SUPER_BUILD_UP_AREA_PROP_TYPE_ID ? SUPER : ''
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
                                                                                                        receiptDetails?.floor_details?.map((item, index) => {
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



                                                                    </tr> */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-1 flex flex-col">
                    <div className="overflow-x-auto">
                      <div className="inline-block p-2.5 align-middle lg:w-full">
                        <div className="overflow-hidden">
                          <table className="w-full table-fixed">
                            <thead className="preview-payment-recipt-form-table-laypout"></thead>
                            <tbody>
                              <tr>
                                <td
                                  colSpan="3"
                                  className="whitespace-nowrap px-1 py-0 text-left  text-xs text-gray-900"
                                >
                                  <div className="float-left text-left  text-xs text-gray-900">
                                    A Sum of Rs.{" "}
                                  </div>
                                  <div className="float-left ml-2 text-left  text-xs font-semibold text-gray-900">
                                    {consumerPaymentDetails[val]?.payableAmount}{" "}
                                    (In words.){" "}
                                  </div>
                                  <div className="Payment_recipt_custom float-left text-xs font-semibold">
                                    {(
                                      consumerPaymentDetails[val]
                                        ?.payableAmount + ""
                                    ).includes(".")
                                      ? inWords(
                                          (
                                            consumerPaymentDetails[val]
                                              ?.payableAmount + ""
                                          ).split(".")[0]
                                        ) +
                                        " Rs. and " +
                                        inWords(
                                          (
                                            consumerPaymentDetails[val]
                                              ?.payableAmount + ""
                                          ).split(".")[1]
                                        ) +
                                        " Paisa Only"
                                      : inWords(
                                          consumerPaymentDetails[val]
                                            ?.payableAmount + ""
                                        ) + " Rs."}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  colSpan="3"
                                  className="whitespace-nowrap px-1 py-0 text-left  text-xs text-gray-900"
                                >
                                  <div className="float-left text-left  text-xs text-gray-900">
                                    towards Water Tax & Other vide
                                  </div>
                                  <div className="Payment_recipt_custom_small float-left ml-2 text-xs font-semibold capitalize">
                                    {(receiptDetails?.mode_of_payment + "")
                                      .trim()
                                      .toLowerCase() == "card"
                                      ? receiptDetails?.card_type + " "
                                      : ""}
                                    {receiptDetails?.mode_of_payment}
                                  </div>
                                  <div className="float-left ml-2  text-left text-xs text-gray-900">
                                    Online No.
                                  </div>
                                  <div className="Payment_recipt_custom_small float-left text-xs font-semibold">
                                    {receiptDetails?.online_no
                                      ? receiptDetails?.online_no
                                      : `NA`}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  colSpan="3"
                                  className="whitespace-nowrap px-1 py-0 text-left  text-xs text-gray-900"
                                >
                                  <div className="float-left text-left  text-xs text-gray-900">
                                    dated
                                  </div>
                                  <div className="Payment_recipt_custom_small float-left text-xs font-semibold">
                                    {receiptDetails?.date}
                                  </div>
                                  <div className="float-left ml-2  text-left text-xs text-gray-900">
                                    drawn on
                                  </div>
                                  <div className="Payment_recipt_custom_small float-left text-xs font-semibold">
                                    {consumerPaymentDetails[val]
                                      ?.transactionDate
                                      ? consumerPaymentDetails[val]
                                          ?.transactionDate
                                      : `NA`}
                                  </div>
                                  <div className="float-left ml-2  text-left text-xs text-gray-900">
                                    Bank Name
                                  </div>
                                  <div className="Payment_recipt_custom_small float-left text-xs font-semibold">
                                    {consumerPaymentDetails[val]?.bankName
                                      ? consumerPaymentDetails[val]?.bankName
                                      : `NA`}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  colSpan="3"
                                  className="whitespace-nowrap px-0 py-0 text-left  text-xs text-gray-900"
                                >
                                  <div className="float-left ml-2  text-left text-xs text-gray-900">
                                    Place of the bank
                                  </div>
                                  <div className="Payment_recipt_custom_small float-left text-xs font-semibold">
                                    {consumerPaymentDetails[val]?.branchName
                                      ? consumerPaymentDetails[val]?.branchName
                                      : `NA`}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  colSpan="3"
                                  className="whitespace-nowrap px-1 py-0 text-left  text-xs text-gray-900"
                                >
                                  <div className="float-left text-left text-sm font-semibold text-gray-900">
                                    N.B.Online Payment/Cheque/Draft/ Bankers
                                    Cheque are Subject to realization
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-1 flex flex-col">
                    <div className="overflow-x-auto">
                      <div className="inline-block p-2.5 align-middle lg:w-full">
                        <div className="overflow-hidden">
                          <table className="w-full table-fixed">
                            <thead className="preview-payment-recipt-form-table-laypout">
                              <tr>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-900 px-1 py-0  text-left text-xs font-bold uppercase text-gray-900"
                                >
                                  Account Description
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs font-bold uppercase text-gray-900"
                                >
                                  Period
                                </th>
                                <th
                                  scope="col"
                                  className="whitespace-normal border border-gray-900 px-1 py-0  text-left text-xs font-bold uppercase text-gray-900"
                                >
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {receiptDetails?.payment_details
                                ? receiptDetails?.payment_details.map(
                                    (item, index) => {
                                      return (
                                        <>
                                          {receiptDetails?.payment_details ? (
                                            // receiptDetails?.payment_details[0]?.property_tax_arrear != null &&
                                            // receiptDetails?.payment_details[0]?.property_tax_arrear != 0 ? (
                                            <tr>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left  text-xs text-gray-900">
                                                Property Tax Arrear
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs text-gray-900">
                                                {receiptDetails
                                                  ?.payment_details[index]
                                                  ?.previousEffectYear
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.previousEffectYear
                                                  : receiptDetails
                                                      ?.payment_details[0]
                                                      ?.currentEffectYear
                                                  ? receiptDetails
                                                      ?.payment_details[0]
                                                      ?.currentEffectYear
                                                  : "N/A"}
                                                {/* {` To `}

                                                                                                        {receiptDetails?.payment_details[0]?.currentEffectYear ?
                                                                                                            receiptDetails?.payment_details[index]?.currentEffectYear :
                                                                                                            convertTransactionDateToFYFormat(receiptDetails.date)
                                                                                                        } */}
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs text-gray-900">
                                                {receiptDetails
                                                  ?.payment_details[index]
                                                  ?.property_tax_arrear != null
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.property_tax_arrear
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                          ) : // ) : null
                                          null}
                                          {receiptDetails?.payment_details ? (
                                            // (receiptDetails?.payment_details[0]?.property_tax != null &&
                                            // receiptDetails?.payment_details[0]?.property_tax != 0) ?
                                            // (
                                            <tr>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left text-xs text-gray-900">
                                                Property Tax Current
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-center text-xs text-gray-900">
                                                {/* {receiptDetails?.payment_details[index]?.previousEffectYear ?
                                                                                                            receiptDetails?.payment_details[index]?.previousEffectYear :
                                                                                                            (receiptDetails?.payment_details[0]?.currentEffectYear ?
                                                                                                                receiptDetails?.payment_details[0]?.currentEffectYear : 'N/A')} {` To `} */}

                                                {receiptDetails
                                                  ?.payment_details[0]
                                                  ?.currentEffectYear
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.currentEffectYear
                                                  : convertTransactionDateToFYFormat(
                                                      receiptDetails.date
                                                    )}
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs text-gray-900">
                                                {receiptDetails
                                                  ?.payment_details[index]
                                                  ?.property_tax != null
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.property_tax
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                          ) : // ) : null
                                          null}
                                          {receiptDetails?.payment_details ? (
                                            // receiptDetails?.payment_details[0]?.smerik_kar_arrear != null &&
                                            // receiptDetails?.payment_details[0]?.smerik_kar_arrear != 0 ?
                                            // (
                                            <tr>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left text-xs text-gray-900">
                                                Samekit Kar Arrear
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs text-gray-900">
                                                {receiptDetails
                                                  ?.payment_details[index]
                                                  ?.previousEffectYear
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.previousEffectYear
                                                  : receiptDetails
                                                      ?.payment_details[0]
                                                      ?.currentEffectYear
                                                  ? receiptDetails
                                                      ?.payment_details[0]
                                                      ?.currentEffectYear
                                                  : "N/A"}
                                                {/* {` To `}

                                                                                                        {receiptDetails?.payment_details[0]?.currentEffectYear ?
                                                                                                            receiptDetails?.payment_details[index]?.currentEffectYear :
                                                                                                            convertTransactionDateToFYFormat(receiptDetails.date)
                                                                                                        } */}
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs text-gray-900">
                                                {receiptDetails
                                                  ?.payment_details[index]
                                                  ?.smerik_kar_arrear != null
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.smerik_kar_arrear
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                          ) : // ) : null
                                          null}
                                          {receiptDetails?.payment_details ? (
                                            // receiptDetails?.payment_details[0]?.smerik_kar_arrear != null &&
                                            // receiptDetails?.payment_details[0]?.smerik_kar_arrear != 0 ?
                                            // (
                                            <tr>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left text-xs text-gray-900">
                                                Samekit Kar Current
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs text-gray-900">
                                                {/* {receiptDetails?.payment_details[index]?.previousEffectYear ?
                                                                                                            receiptDetails?.payment_details[index]?.previousEffectYear :
                                                                                                            (receiptDetails?.payment_details[0]?.currentEffectYear ?
                                                                                                                receiptDetails?.payment_details[0]?.currentEffectYear : 'N/A')} {` To `} */}

                                                {receiptDetails
                                                  ?.payment_details[0]
                                                  ?.currentEffectYear
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.currentEffectYear
                                                  : convertTransactionDateToFYFormat(
                                                      receiptDetails.date
                                                    )}
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs text-gray-900">
                                                {receiptDetails
                                                  ?.payment_details[index]
                                                  ?.samerik_kar != null
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.samerik_kar
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                          ) : // ) : null
                                          null}
                                          {receiptDetails?.payment_details ? (
                                            // receiptDetails?.payment_details[0]?.education_cess_arrear != null &&
                                            // receiptDetails?.payment_details[0]?.education_cess_arrear != 0 ?
                                            // (
                                            <tr>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left text-xs text-gray-900">
                                                Education Cess Arrear
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs text-gray-900">
                                                {receiptDetails
                                                  ?.payment_details[index]
                                                  ?.previousEffectYear
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.previousEffectYear
                                                  : receiptDetails
                                                      ?.payment_details[0]
                                                      ?.currentEffectYear
                                                  ? receiptDetails
                                                      ?.payment_details[0]
                                                      ?.currentEffectYear
                                                  : "N/A"}
                                                {/* {` To `}

                                                                                                        {receiptDetails?.payment_details[0]?.currentEffectYear ?
                                                                                                            receiptDetails?.payment_details[index]?.currentEffectYear :
                                                                                                            convertTransactionDateToFYFormat(receiptDetails.date)
                                                                                                        } */}
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs text-gray-900">
                                                {receiptDetails
                                                  ?.payment_details[index]
                                                  ?.education_cess_arrear !=
                                                null
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.education_cess_arrear
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                          ) : // ) : null
                                          null}
                                          {receiptDetails?.payment_details ? (
                                            // receiptDetails?.payment_details[0]?.education_cess != null &&
                                            // receiptDetails?.payment_details[0]?.education_cess != 0 ?
                                            // (
                                            <tr>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-left text-xs text-gray-900">
                                                Education Cess Current
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs text-gray-900">
                                                {/* {receiptDetails?.payment_details[index]?.previousEffectYear ?
                                                                                                            receiptDetails?.payment_details[index]?.previousEffectYear :
                                                                                                            (receiptDetails?.payment_details[0]?.currentEffectYear ?
                                                                                                                receiptDetails?.payment_details[0]?.currentEffectYear : 'N/A')} {` To `} */}

                                                {receiptDetails
                                                  ?.payment_details[0]
                                                  ?.currentEffectYear
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.currentEffectYear
                                                  : convertTransactionDateToFYFormat(
                                                      receiptDetails.date
                                                    )}
                                              </td>
                                              <td className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs text-gray-900">
                                                {receiptDetails
                                                  ?.payment_details[index]
                                                  ?.education_cess != null
                                                  ? receiptDetails
                                                      ?.payment_details[index]
                                                      ?.education_cess
                                                  : "N/A"}
                                              </td>
                                            </tr>
                                          ) : // ) : null
                                          null}
                                        </>
                                      );
                                    }
                                  )
                                : null}
                              {receiptDetails?.rain_water_harvesting != null ? (
                                // &&
                                // receiptDetails?.rain_water_harvesting != '0'
                                <tr>
                                  <td
                                    colSpan="2"
                                    className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs font-medium text-gray-900"
                                  >
                                    Rain Water Harvesting Penalty
                                  </td>
                                  <td className="whitespace-nowrap border border-gray-900 px-1  py-0 text-right text-xs font-bold text-gray-900">
                                    {receiptDetails?.rain_water_harvesting !=
                                    null
                                      ? receiptDetails?.rain_water_harvesting
                                      : "0"}
                                  </td>
                                </tr>
                              ) : null}
                              <tr>
                                {receiptDetails?.penal_charge != null &&
                                receiptDetails?.penal_charge != "0" ? (
                                  <>
                                    <td
                                      colSpan="2"
                                      className="whitespace-normal border border-gray-900 px-1  py-0 text-right text-xs font-medium text-gray-900"
                                    >
                                      Penal Charge
                                    </td>
                                    <td className="whitespace-nowrap border border-gray-900 px-1  py-0 text-right text-xs font-bold text-gray-900">
                                      {receiptDetails?.penal_charge != null
                                        ? receiptDetails?.penal_charge
                                        : "0"}
                                    </td>
                                  </>
                                ) : null}
                              </tr>

                              <tr>
                                <td
                                  colSpan="1"
                                  className="whitespace-normal border border-gray-900 px-1 py-0 text-left text-xs font-medium text-gray-900"
                                >
                                  Surcharge
                                </td>
                                <td
                                  colSpan="1"
                                  className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs font-medium text-gray-900"
                                >
                                  {consumerPaymentDetails[val]?.periods !=
                                  null
                                    ? consumerPaymentDetails[val]?.periods
                                    : null}
                                </td>
                                <td className="whitespace-nowrap border border-gray-900 px-1 py-0 text-right text-xs font-bold text-gray-900">
                                  {receiptDetails?.form_fee != null
                                    ? receiptDetails?.form_fee
                                    : "0"}
                                </td>
                              </tr>
                              <tr>
                                {receiptDetails?.penalty_amount != null &&
                                receiptDetails?.penalty_amount != "0" ? (
                                  <>
                                    <td
                                      colSpan="2"
                                      className="whitespace-normal border border-gray-900 px-1 py-0 text-right text-xs font-medium text-gray-900"
                                    >
                                      Penalty Amount
                                    </td>
                                    <td className="whitespace-nowrap border border-gray-900 px-1 py-0 text-right text-xs font-bold text-gray-900">
                                      {receiptDetails?.penalty_amount != null
                                        ? receiptDetails?.penalty_amount
                                        : "0"}
                                    </td>
                                  </>
                                ) : null}
                              </tr>
                              <tr>
                                <td
                                  colSpan="1"
                                  className="whitespace-normal border border-gray-900 px-1 py-0 text-left text-xs font-medium text-gray-900"
                                >
                                  Payable amount
                                </td>
                                <td
                                  colSpan="1"
                                  className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs font-medium text-gray-900"
                                >
                                  {consumerPaymentDetails[val]?.payableAmount !=
                                  null
                                    ? consumerPaymentDetails[val]?.periods
                                    : null}
                                </td>
                                <td className="whitespace-nowrap border border-gray-900 px-1 py-0 text-right text-xs font-bold text-gray-900">
                                  {consumerPaymentDetails[val]?.payableAmount !=
                                  null
                                    ? consumerPaymentDetails[val]?.payableAmount
                                    : "0"}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  colSpan="1"
                                  className="whitespace-normal border border-gray-900 px-1 py-0 text-left text-xs font-medium text-gray-900"
                                >
                                  Total Receivable
                                </td>
                                <td
                                  colSpan="1"
                                  className="whitespace-normal border border-gray-900 px-1 py-0 text-center text-xs font-medium text-gray-900"
                                >
                                  {consumerPaymentDetails[val]?.payableAmount !=
                                  null
                                    ? consumerPaymentDetails[val]?.periods
                                    : null}
                                </td>
                                <td className="whitespace-nowrap border border-gray-900 px-1 py-0 text-right text-xs font-medium text-gray-900">
                                  {/* {receiptDetails?.adjustment_amount != null ? receiptDetails?.adjustment_amount : '0'} */}
                                  {consumerPaymentDetails[val]?.payableAmount !=
                                  null
                                    ? consumerPaymentDetails[val]?.payableAmount
                                    : null}
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
                      <div className="inline-block p-1.5 align-middle lg:w-full">
                        <div className="overflow-hidden">
                          <table className="w-full table-fixed">
                            <thead className="bg-gray-50"></thead>
                            <tbody>
                              <tr>
                                {/* <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-nowrap">
                                    <img className="w-32" src='/img/QR_Code.png' />
                                </td> */}

                                <td className="whitespace-normal px-3 py-0 text-right text-xs font-bold text-gray-900">
                                  Signature Of Tax Collector
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-slate-700 mx-3 my-2 text-xs font-light">
                    <h2 className="mb-1 text-xs font-semibold text-gray-900 dark:text-white">
                      Note:
                    </h2>
                    <ul className="list-disc px-10">
                      <li className="mb-0 mt-0">
                        <span className="text-xs font-normal text-gray-900 dark:text-white">
                          This is a Computer generated Receipt and does not
                          require physical signature.{" "}
                        </span>
                      </li>
                      <li className="mb-0 mt-0">
                        <span className="text-xs font-normal text-gray-900 dark:text-white">
                          संपत्ति कर भूमि या मकान का मालिकाना हक़ प्रदान नहीं
                          करता है
                        </span>
                      </li>
                      <li className="mb-0 mt-0">
                        <span className="text-xs font-normal text-gray-900 dark:text-white">
                          For Details Call us at 1800 890 4115
                        </span>
                      </li>
                      <li className="mb-0 mt-0">
                        <span className="text-xs font-normal font-semibold text-gray-900 dark:text-white">
                          Cheque / Draft / Banker Cheque / Online payment are
                          subject to realization
                        </span>
                      </li>
                      <li className="mb-0 mt-0">
                        <span className="text-xs font-normal text-gray-900 dark:text-white">
                          You may validate receipt by scanning QR Code.
                        </span>
                      </li>
                      <li className="mb-0 mt-0">
                        <span className="text-xs font-normal text-gray-900 dark:text-white">
                          Print Date : {new Date().toString()}
                        </span>
                      </li>
                    </ul>
                    {/* </li> */}
                  </div>

                  <div className="flex flex-col">
                    <div className="overflow-x-auto">
                      <div className="mb-3 inline-block p-1 align-middle lg:w-full">
                        <div className="overflow-hidden">
                          <table className="w-full table-fixed">
                            <thead className="bg-gray-50"></thead>
                            <tbody>
                              <tr>
                                <td className="whitespace-normal px-3 py-0 text-xs font-bold font-normal text-gray-900">
                                  RAJNANDGAON MUNICIPAL CORPORATION, RAJNANDGAON
                                </td>
                                <td className="whitespace-normal px-3 py-0 text-right text-xs font-normal text-gray-900">
                                  In Collaboration With{" "}
                                  <b>Sri Publications & Stationers Pvt. Ltd.</b>
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
            </div>
          </section>

          {/* </Iframe> */}
          {/* </div> */}

          <div className="m-4 mt-4 rounded-none bg-white px-0 pb-4 pt-0 lg:max-w-full">
            <div className="container mx-0 flex min-w-full flex-col items-center px-10 py-2">
              <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                {/* <CustomBackButton showCustomBackButton={true} /> */}

                <button
                  onClick={backHandler}
                  className="mx-4 my-0 h-8 w-36 transform rounded-md bg-green-400 px-0 py-0 text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 focus:outline-none"
                >
                  Back
                </button>
                <button
                  onClick={handlePrintToPDF}
                  className=" mx-4 mb-2 h-8 w-36 transform rounded-md bg-green-400 px-4 py-1 tracking-wide text-white transition-colors duration-200 hover:bg-green-700 focus:bg-green-400 focus:outline-none"
                >
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
      </div>
    );
}

export default PaymentReceiptViewPaymentDetails
