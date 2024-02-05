import React from 'react'
import { Button } from '@material-tailwind/react'
import { convertStringToLowerCaseNTrim, convertTransactionDateToFYFormat, inWords } from '@/utils/commonUtils'
import Table from '../utils/Table'
import { useEffect } from 'react'

const PaymentDetailsReceiptEnglish = ({receiptDetails,setDisplayHindiForm , 
    setDisplayDetails,
    setviewAndPayDemandDetails,
    setdisplayPaymentDetail,
    setViewReceipt, 
    searchAllotteeDetails,
    receiptDetail
}) => { 
    console.log(searchAllotteeDetails,receiptDetail, "searchAllotteeDetails")
    const handlePrintToPDF = () => {
      
        let printwin = window.open("");
        printwin.document.write(document.getElementById("print_section").innerHTML);
        copyStyles(window.document, printwin.document);
        printwin.print();
    }
    const backHandler = () => {
        setDisplayDetails(true)
        setviewAndPayDemandDetails(false)
        setdisplayPaymentDetail(true)
        setViewReceipt(false)
    }
    useEffect(()=>{
        console.log(receiptDetails)
    },[receiptDetails])
    const copyStyles = (src, dest) => {
        Array.from(src.styleSheets).forEach(styleSheet => {
            dest.head.appendChild(styleSheet.ownerNode.cloneNode(true))
        })
        Array.from(src.fonts).forEach(font => dest.fonts.add(font))
    }
    const columns = [
        { field: "year", header: "Mode" },
        { field: "amount", header: "Amount" },
        { field: "gst", header: "GST" },
        { field: "total_amount", header: "Total Payable Amount" },
        { field: "transaction_number", header: "Transaction Number" },
        { field: "payment_date", header: "Payment Date" },
      ];   
      const data = [
       {
         year : receiptDetail?.payment_mode,
         amount: searchAllotteeDetails?.demand_amount,
         gst: searchAllotteeDetails?.gst,
         total_amount: receiptDetail?.total_payable_amount,
        transaction_number:receiptDetail?.transaction_number,
        payment_date:receiptDetail?.payment_date

       }
      ]
  return (
    <>
     <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10 mb-10">
  {/* <ToastContainer autoClose={2000}/> */}
<div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-md border border-gray-500 lg:max-w-full">
                        <nav className="relative flex navcustomproperty flex-wrap items-center justify-between pl-2 pr-0 py-1 mb-2 ring-1 ring-black rounded-none">
                            <h2 className="text-sm font-semibold text-center text-white">
                                BHU BHATAK RECEIPT
                            </h2>
                            <Button color="green" className='h-6 w-40 m-2 px-2 py-1 bg-green-700 rounded custom_button_add'
                            onClick={()=>setDisplayHindiForm(true)}
                                 >हिंदी में रसीद</Button>
                         </nav>
                       
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
                                                                  
                                                                    <tbody className="divide-y divide-gray-200">
                                                                        <tr>
                                                                            <td className="px-1 py-1 text-center  whitespace-nowrap">
                                                                                <img className="h-12" src="/img/Bhilai_recipt.png" />
                                                                            </td>
                                                                            <td className="px-1 py-1 text-center  whitespace-nowrap">
                                                                                <p className="text-2xl font-extrabold tracking-tight uppercase font-body text-center">
                                                                                    BHILAI MUNICIPAL CORPORATION, BHILAI</p>
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
                                                 
                                                    {/* {receiptDetails.description} */}
                                                  
                                                </p>
                                            </div>
                                        </div>
                                        <div className="my-3 flex justify-center items-center">
                                            <span className='border-2 p-2 border-black className="text-xl font-semibold tracking-tight uppercase font-body text-center'>
                                            Bhu Bhatak Receipt
                                            </span>
                                      
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
                                                                        Allottee Name
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                        :
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                        {searchAllotteeDetails?.AllotteeDetail?.name}
                                                                    </td>
                                                                    <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal">
                                                                        Guardian Name
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                        :
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                    {searchAllotteeDetails?.AllotteeDetail?.guardian_name}
                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                        Area Name
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                        :
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">

                                                                    {searchAllotteeDetails?.LandDetail?.area_name}

                                                                    </td>
                                                                    <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                        Registration Date
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                        :
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                    {searchAllotteeDetails?.registration_date}

                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                        Total Payable Amount
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900  whitespace-normal">
                                                                        :
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                    {/* {searchAllotteeDetails?.demand_amount} */}
                                                                    {receiptDetail?.total_payable_amount}
                                                                    </td>
                                                                    <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                        Usage Type
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                        :
                                                                    </td>

                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal">
                                                                    {searchAllotteeDetails?.UsageType?.usage_name}

                                                                    </td>

                                                                </tr> 
                                                                <tr>
                                                                   
                                                                    <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                        Plot Area
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                        :
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900  whitespace-normal">
                                                                    {searchAllotteeDetails?.LandDetail?.plot_area}

                                                                    </td>

                                                                    <td className="px-3 py-0 font-semibold text-xs font-medium text-gray-900 whitespace-normal ">
                                                                        Bhu Bhatak Rate
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900 whitespace-normal ">
                                                                        :
                                                                    </td>
                                                                    <td className="px-3 py-0 text-xs text-gray-900  whitespace-normal">
                                                                    {searchAllotteeDetails?.LandDetail?.bhu_bhatak_rate}

                                                                    </td>
                                                                </tr>
                                                              
                                                              
                                                             



                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Table data={data} columns={columns} hover={true} striped={true} />

                       
                                        
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
                                                                        BHILAI MUNICIPAL CORPORATION, BHILAI
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

                      
                        <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 lg:max-w-full">

                            <div className="container py-2 px-10 mx-0 min-w-full flex flex-col items-center">
                                <div className="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                                  

                                    <button 
                                       onClick={backHandler}
                                        className="w-36 h-8 px-0 py-0 mx-4 my-0 tracking-wide text-white text-sm font-semibold transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                                        Back
                                    </button>
                                    <button
                                       onClick={handlePrintToPDF} 
                                        className=" w-36 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-400">
                                        Print
                                    </button>

                                 
                                </div>



                            </div>

                        </div>
                      
                    </div>
    </div>
    </>
  )
}

export default PaymentDetailsReceiptEnglish