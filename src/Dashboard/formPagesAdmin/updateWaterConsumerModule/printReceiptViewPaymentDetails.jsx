import React, { useEffect, useState } from 'react'
import { Button } from '@material-tailwind/react'
import { convertStringToLowerCaseNTrim, convertTransactionDateToFYFormat, inWords } from '@/utils/commonUtils'
import { SUPER, SUPER_BUILD_UP_AREA_PROP_TYPE_ID } from '@/utils/appConstants'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

const PrintReceiptViewPaymentDetails = ({setDisplayHindiPrintForm,setDisplayPrintReceipt,
    setDisplayDetails, setDisplayPrintDemandForm, consumerNumberAfterCreation, modeOfPayment, 
    consumerDetails, consumerPaymentDetails, totalPayableAmount,startDate, endDate}) => {
    const [receiptDetails, setReceiptDetails] = useState([])
    useEffect(()=>{
        console.log("consumerDetails",consumerDetails)
        //console.log(startDate, endDate, consumerDetails.consumerUnitRateDetails[consumerDetails.consumerUnitRateDetails.length].effectFrom)
    // console.log("consumer res",consumerDetails?.consumerUnitRateDetails[consumerDetails.consumerUnitRateDetails.length - 1].effectFrom)
    },[consumerDetails])
    const handleLanguageChange = () => { 
        setDisplayHindiPrintForm(true) 
       // setDisplayPrintDemandForm(true) 
    }  
    const backHandler = () => {  
        setDisplayDetails(true) 
        setDisplayPrintReceipt(false) 
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
    console.log(consumerDetails, consumerPaymentDetails, totalPayableAmount)
 },[consumerDetails, consumerPaymentDetails, totalPayableAmount])
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

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10 mb-10">
            <ToastContainer autoClose={2000}/>
            <div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-md border border-gray-500 lg:max-w-full">
                <nav className="relative flex navcustomproperty flex-wrap items-center justify-between pl-2 pr-0 py-1 mb-2 ring-1 ring-red-700 rounded-lg bg-orange-800 h-10">
                    <h2 className="text-sm font-semibold text-center text-white">
                    Demand Receipt
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
                                                                        <img className="h-12" src="/img/Bhilai_recipt.png" />
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
                                        <div className="my-3 flex justify-center items-center">
                                <span className='border-2 p-2 border-black className="text-xl font-semibold tracking-tight uppercase font-body text-center'>
                                Water Tax <br/> Demand Receipt
                                </span>
                            
                                </div>
                                        <p className="text-xl font-bold mb-2 tracking-tight uppercase font-body text-center">
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
                                        <div className="p-2.5 lg:w-full inline-block align-middle">
                                            <div className="overflow-hidden">
                                                <table className="min-w-full">
                                                    <thead className="bg-gray-50">

                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                            Department/Section
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                            Water supply
                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                                Date of connection
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                            {consumerDetails?.dateOfConnection ? consumerDetails?.dateOfConnection : `NA`}
                                                            </td>

                                                        </tr>
                                                        <tr>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                Consumer name
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                :
                                                            </td>
                                                                <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">

                                                                {consumerDetails?.consumerName ? consumerDetails?.consumerName : `NA`}

                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                Consumer no
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                        
                                                            {consumerDetails?.consumerNo ? consumerDetails?.consumerNo : `NA`}
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
                                                            {consumerDetails?.wardNo ? consumerDetails?.wardNo : `NA`}

                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                Property No.
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                
                                                                {consumerDetails?.propertyNo ? consumerDetails?.propertyNo : `NA`}
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
                                                                Connection Type
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900  whitespace-normal">
                                                            {consumerDetails?.connectionType ? consumerDetails?.connectionType : `NA`}

                                                            </td>
                                                        </tr>
                                                        
                                                        <br/>
                                                        <tr className=''>
                                                        <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                Consumer name
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900  whitespace-normal">
                                                            
                                                            {consumerDetails?.consumerName ? consumerDetails?.consumerName : `NA`}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                        <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                Mobile number
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900  whitespace-normal">
                                                            {consumerDetails?.mobileNo ? consumerDetails?.mobileNo : `NA`}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                        <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                Address
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 text-xs text-gray-900  whitespace-normal">
                                                            
                                                            {consumerDetails?.propertyAddress ? consumerDetails?.propertyAddress : `NA`}
                                                            </td>
                                                        </tr>
                                                        {/* <tr>

                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                                Address
                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 font-normal text-xs text-gray-900 ">
                                                            {consumerDetails?.propertyAddress}
                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs  font-medium text-gray-900 whitespace-normal">
                                                                Penalty
                                                            </td>
                                                            <td className="px-3 py-0 font-semibold text-xs  text-gray-900 whitespace-normal">
                                                                :
                                                            </td>
                                                            <td className="px-3 py-0 font-normal text-xs  text-gray-900 whitespace-normal">
                                                            {consumerDetails?.penalty}
                                                            </td>
                                                        </tr> */}
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
                                {/* <div className="flex flex-col mb-1">
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
                                                                <div className="text-left text-xs font-semibold  ml-2 text-gray-900 float-left">{consumerDetails?.payableAmount} (In words.) </div>
                                                                <div className="Payment_recipt_custom float-left font-semibold text-xs">
                                                                    {
                                                                        (consumerDetails?.payableAmount + "").includes(".") ? (
                                                                            inWords((consumerDetails?.payableAmount + "").split(".")[0]) + " Rs. and " +
                                                                            inWords((consumerDetails?.payableAmount + "").split(".")[1]) + " Paisa Only"
                                                                        )
                                                                            : (
                                                                                inWords((consumerDetails?.payableAmount + "")) + " Rs."
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
                                                                        (receiptDetails?.mode_of_payment + "").trim().toLowerCase() ==
                                                                            'card' ? receiptDetails?.card_type + " " : ''
                                                                    }
                                                                    {receiptDetails?.mode_of_payment}
                                                                </div>
                                                                <div className="text-left text-xs  ml-2 text-gray-900 float-left">Online No.</div>
                                                                <div className="Payment_recipt_custom_small float-left font-semibold text-xs">{receiptDetails?.online_no ? receiptDetails?.online_no : `NA`}</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="3" className="px-1 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">

                                                                <div className="text-left text-xs  text-gray-900 float-left">dated</div>
                                                                <div className="Payment_recipt_custom_small float-left font-semibold text-xs">{receiptDetails?.date}</div>
                                                                <div className="text-left text-xs  ml-2 text-gray-900 float-left">drawn on</div>
                                                                <div className="Payment_recipt_custom_small float-left font-semibold text-xs">{receiptDetails?.drawn_on ? receiptDetails?.drawn_on : `NA`}</div>
                                                                <div className="text-left text-xs  ml-2 text-gray-900 float-left">Bank Name</div>
                                                                <div className="Payment_recipt_custom_small float-left font-semibold text-xs">{receiptDetails?.bank_name ? receiptDetails?.bank_name : `NA`}</div>

                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="3" className="px-0 py-0 text-left text-xs  text-gray-900 whitespace-nowrap">
                                                                <div className="text-left text-xs  ml-2 text-gray-900 float-left">Place of the bank</div>
                                                                <div className="Payment_recipt_custom_small float-left font-semibold text-xs">{receiptDetails?.branch_location ? receiptDetails?.branch_location : `NA`}</div>
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
                                </div> */}

                                <div className="flex flex-col mb-1">

                                    <div className="overflow-x-auto">
                                        <div className="p-2.5 lg:w-full">
                                            <div className="overflow-hidden">
                                                <table className="w-full table-fixed">
                                                    <thead className="preview-payment-recipt-form-table-laypout">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                colSpan="2"
                                                                className="px-1 py-0 text-xs text-left font-bold  whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                Current Demand Period
                                                            </th>
                                                            <th
                                                            
                                                                className="px-3 py-0 text-xs text-center font-bold whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                :
                                                            </th> 
                                                            <th
                                                                scope="col"
                                                                colSpan='2'
                                                                className="px-1 py-0 text-xs text-left font-bold  whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                {/* {consumerDetails?.totalPayableAmount} */}
                                                                {
                                                                    consumerDetails?.consumerUnitRateDetails !== null ? consumerDetails?.consumerUnitRateDetails[consumerDetails?.consumerUnitRateDetails?.length - 1].
                                                                    effectFrom-consumerDetails?.consumerUnitRateDetails[0]?.effectFrom  : null
                                                                }
                                                                
                                                            </th>
                                                            
                                                            <th
                                                                scope="col"
                                                                className="px-1 py-0 text-xs text-left font-bold  whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                Unit
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-1 py-0 text-xs text-center font-bold whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                {consumerDetails?.consumerUnitRateDetails!== null ?  consumerDetails?.consumerUnitRateDetails[0].unitRate : null}
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-1 py-0 text-xs text-left font-bold  whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                {/* {consumerDetails?.totalPayableAmount} */}
                                                                0
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {/* <tr>
                                                            <td  className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-normal border border-gray-900">
                                                                Penalty</td>
                                                            <td className="px-1 py-0 text-right text-xs font-bold text-gray-900 whitespace-nowrap border border-gray-900">
                                                            {consumerDetails?.penalty != null ? consumerDetails?.penalty : '0'}
                                                            </td>
                                                            <td colSpan="3" className="px-1 py-0 text-right text-xs font-medium text-gray-900 whitespace-normal border border-gray-900">
                                                                Penalty</td>
                                                            <td className="px-1 py-0 text-right text-xs font-bold text-gray-900 whitespace-nowrap border border-gray-900">
                                                            {consumerDetails?.penalty != null ? consumerDetails?.penalty : '0'}
                                                            </td>
                                                        </tr> */}
                                                            <tr>
                                                            <th
                                                                scope="col"
                                                                colSpan="2"
                                                                className="px-1 py-0 text-xs text-left font-bold  whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                Outstanding till now
                                                            </th>
                                                            <th
                                                            
                                                                className="px-1 py-0 text-xs text-center font-bold whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                :
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                colSpan="4"
                                                                className="px-1 py-0 text-xs text-left font-bold  whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                {/* {consumerDetails?.totalPayableAmount} */}
                                                                
                                                            </th>
                                                            
                                                            <th
                                                                scope="col"
                                                                className="px-1 py-0 text-xs text-left font-bold  whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                {/* {consumerDetails?.totalPayableAmount} */}
                                                                0
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                colSpan="7"
                                                                className="px-1 py-0 text-xs text-left font-bold  whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                Penalty
                                                            </th>
                                                            
                                                            
                                                            <th
                                                                scope="col"
                                                                className="px-1 py-0 text-xs text-left font-bold  whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                    {consumerDetails?.penalty != null ? consumerDetails?.penalty : '0'}
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                colSpan="7"
                                                                className="px-1 py-0 text-xs text-left font-bold  whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                Total Payable Amount
                                                            </th>
                                                            
                                                            
                                                            <th
                                                                scope="col"
                                                                className="px-1 py-0 text-xs text-left font-bold  whitespace-normal text-gray-900 uppercase border border-gray-900"
                                                            >
                                                                {/* {consumerDetails?.totalPayableAmount} */}
                                                                { (consumerDetails?.totalPayableAmount != null ? consumerDetails?.totalPayableAmount : '0') }
                                                        
                                                            </th>
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

                            <button onClick={backHandler}
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
        </div>
      )
}

export default PrintReceiptViewPaymentDetails