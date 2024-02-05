import React, { Component } from 'react'
import { Select, Option, Button, Textarea, Checkbox } from "@material-tailwind/react";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import CustomBackButton from './customBackButton';

export class SAF_form_preview extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { showSAFNewFormPreview, switchOnNextModalNOffCurrModal, switchOnPrevModalNOffCurrModal,
        prevModal, currModal } = this.props
        return showSAFNewFormPreview ? (
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden mt-10 mb-10">


                <div className="w-11/12 px-0 pt-0 pb-4 m-auto bg-white rounded-md border border-gray-500 lg:max-w-full">
                    <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-2 navcustomproperty mb-2 ring-1 ring-black rounded-none">
                        <h2 className="text-sm font-semibold text-center text-white">
                            New Assesment Form Preview
                        </h2>
                    </nav>
                    <form className="mt-4 ">
                        <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
                            <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                                <h2 className="text-sm font-semibold text-center text-white">
                                    Basic Details
                                </h2>
                            </nav>
                            <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4 mt-3">
                                <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                    <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Property ID:
                                        <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>2</p>
                                    </p>

                                </div>
                                <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                    <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Zone No.:
                                        <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>30</p>
                                    </p>

                                </div>
                                <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                    <p className='block md:flex-1 lg:flex  text-gray-700 text-xs font-bold mb-2 lg:w-96'>Ward No.:
                                        <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>15</p>
                                    </p>
                                </div>
                            </div>
    
                        </div>
                        <div className="mb-6"></div>

                        <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  mt-4 border border-gray-500 lg:max-w-full">
                            <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                                <h2 className="text-sm font-semibold text-center text-white">
                                    Owner Details
                                </h2>
                            </nav>
                            <div className="px-0 pt-0 pb-2 m-4 bg-white rounded-none mt-4 border border-gray-500 lg:max-w-full">
                                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                                    <h2 className="text-sm font-semibold text-center text-white">
                                        Personal Details
                                    </h2>
                                </nav>
                                <div className="flex flex-col">
                                    <div className="overflow-x-auto">
                                        <div className="p-2.5 lg:w-full inline-block align-middle">
                                            <div className="lg:overflow-hidden">
                                                <table className="min-w-full">
                                                    <thead className="preview-saf-form-table-laypout">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                            >
                                                                Sl. No.
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                            >
                                                                Owner Name
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                            >
                                                                Gender
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                            >
                                                                Relation
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                                            >
                                                                Guardian Name
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase  border border-gray-300"
                                                            >
                                                                Mobile No.
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                            >
                                                                Date Of Birth
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                            >
                                                                Aadhar No.
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                            >
                                                                PAN No.
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                            >
                                                                Email ID
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                1
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Snigdha Basu
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Female
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                D/O
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                Chandan Basu
                                                            </td>

                                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                9564782364
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                10-01-1996
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                548621548854
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                DFT45YYG4
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                snigdha123@gmail.com
                                                            </td>
                                                        </tr>
                                                        

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6"></div>
                            {/* <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none mt-4 border border-gray-500 lg:max-w-full">
                                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                                    <h2 className="text-sm font-semibold text-center text-white">
                                        Electricity Details
                                    </h2>
                                </nav>
                                <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4 mt-3">
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-48'>Electricity K. No:
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>30</p>
                                        </p>

                                    </div>
                                    <div class="mb-4 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-red-600 text-xs font-bold mb-2 lg:w-24'>OR

                                        </p>

                                    </div>
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-64'>ACC No.:
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>123456789</p>
                                        </p>

                                    </div>
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex  text-gray-700 text-xs font-bold mb-2 lg:w-64'>Electricity Consumer Category:
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>DS I/II/III</p>
                                        </p>
                                    </div>

                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex  text-gray-700 text-xs font-bold mb-2 lg:w-64'>BIND/BOOK No.:
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>521046</p>
                                        </p>
                                    </div>
                                </div>
                            </div> */}
                            <div className="mb-6"></div>
                            <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none mt-4 border border-gray-500 lg:max-w-full">
                                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                                    <h2 className="text-sm font-semibold text-center text-white">
                                        Building Construction Period
                                    </h2>
                                </nav>
                                <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4 mt-3">
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Building Construction Period From:
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>12/05/20222</p>
                                        </p>

                                    </div>
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Building Construction Period To:
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>15-02-2023</p>
                                        </p>

                                    </div>
                                </div>
                                

                            </div>
                            <div className="mb-6"></div>
                            <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none mt-4 border border-gray-500 lg:max-w-full">
                                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                                    <h2 className="text-sm font-semibold text-center text-white">
                                        Property Details
                                    </h2>
                                </nav>

                                <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4 mt-3">
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Plot Area(Sq.ft.)*:
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>849.00</p>
                                        </p>

                                    </div>
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Open Land Area(Sq.ft.):
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>1500.00</p>
                                        </p>

                                    </div>
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Ownership Type:
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>Rental</p>
                                        </p>

                                    </div>
                                    
                                </div>

                                {/* <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4">

                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Landmark:
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>Near Montevideo,pocitos</p>
                                        </p>

                                    </div>
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Width Of Road:
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>20 ft. to 39 ft.</p>
                                        </p>

                                    </div>
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Total Plot Area:
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>12 In Decimal</p>
                                        </p>

                                    </div>
                                </div> */}



                            </div>
                            <div className="mb-6"></div>
                            <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none mt-4 border border-gray-300 lg:max-w-full">
                                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                                    <h2 className="text-sm font-semibold text-center text-white">
                                        Property Address
                                    </h2>
                                </nav>
                                <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none mt-4 border border-gray-300 lg:max-w-full">
                                    <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4">

                                        <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                            <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>District:
                                                <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>Montevideo</p>
                                            </p>

                                        </div>
                                        <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                            <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>City:
                                                <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>Pocitos</p>
                                            </p>

                                        </div>
                                    </div>

                                    <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4">

                                        <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                            <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Address:
                                                <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>Near Montevideo,pocitos</p>
                                            </p>

                                        </div>
                                        <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                            <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Pin Code:
                                                <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>721636</p>
                                            </p>

                                        </div>
                                    </div>
                                </div>
                                <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none mt-4 border border-gray-300 lg:max-w-full">
                                    <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4">

                                        <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                            <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>District:
                                                <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>Montevideo</p>
                                            </p>

                                        </div>
                                        <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                            <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>City:
                                                <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>Pocitos</p>
                                            </p>

                                        </div>
                                    </div>

                                    <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4">

                                        <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                            <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Correspondence Address:
                                                <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>Near Montevideo,pocitos</p>
                                            </p>

                                        </div>
                                        <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                            <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Pin Code:
                                                <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>721636</p>
                                            </p>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="mb-6"></div>
                            <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none mt-4 border border-gray-500 lg:max-w-full">
                                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                                    <h2 className="text-sm font-semibold text-center text-white">
                                        Floor Details
                                    </h2>
                                </nav>

                                <div className="flex flex-col">
                                    <div className="overflow-x-auto">
                                        <div className="p-2.5 lg:w-full inline-block align-middle">
                                            <div className="lg:overflow-hidden">
                                                <table className="min-w-full">
                                                    <thead className="preview-saf-form-table-laypout">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                            >
                                                                Floor No.
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                            >
                                                                Building Type
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                            >
                                                                Property Type
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                            >
                                                                Occupancy Type
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                            >
                                                                Zone No
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                            >
                                                                Build Up Area(In Sq.ft.)
                                                            </th>
                                                            
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                First Floor
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                RCC
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                            Residential
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                            Self-Occupied
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                30
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                1200
                                                            </td>
                                                         
                                                        </tr>
                                                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Second Floor
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                RCC
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                            Residential
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                            Self-Occupied
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                32
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                1225
                                                            </td>
                                                         
                                                        </tr>
                                                        

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                            <div className="mb-6"></div>
                            <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 border border-gray-500 lg:max-w-full">
                                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                                    <h2 className="text-sm font-semibold text-center text-white">
                                        Others Details
                                    </h2>
                                </nav>
                                <div className="flex flex-col">
                                    <div className="overflow-x-auto">
                                        <div className="p-2.5 lg:w-full inline-block align-middle">
                                            <div className="lg:overflow-hidden">
                                                <table className="min-w-full">
                                                    <thead className="preview-saf-form-table-laypout">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-left text-gray-700 uppercase border border-gray-300"
                                                            >
                                                                Description
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-left text-gray-700 uppercase border border-gray-300"
                                                            >
                                                                Value/Amount
                                                            </th>
                                                            
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Initial Annual Rental Value of Residential Portion
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>
														<tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Initial Annual Rental Value of Commercial Portion
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>
														<tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Initial Annual Rental Value of Industrial Portion
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>
														<tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Total Annual Rental Value
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>
														<tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Total Annual Rental Value after 10% Maintenance Discount (Rule-7)
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>
														<tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Net Payble Property Tax(In Percentage)
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>
														<tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Payble Property Tax after 50% Discount on Owner's own Occupency in residential building
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>
														<tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Discount Under Section 136 of the Corporation Act 1956 (if eligible)
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>
														<tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Special Discount (in Percentage) Under Section 137 on depositing the amount of one-time current property tax demand before the assessment period 30 November 2022
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>
                                                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Education Cess (2% of net Annual Rental Value)
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>
														<tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Mandatory Consolidated Tax -(A) For Property Tax Payer Owner Rs.600 Yearly
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>
														<tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Mandatory Consolidated Tax -(B) For non Property Tax Payer Owner Rs.300 Yearly
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>
														<tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Arrears -(A) Arrears of Property Tax of the Previous Year (Total Areears)
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>
														<tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Arrears -(B) Arrears of Consolidated Tax of the Previous Year (Total Areears)
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>
														<tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Late Fee / Surcharge Fee
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>
														<tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Shasti Shulk(Charge) under sub-section 2-a of Section 139 of Municipal Corporation Act 1956
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>
														<tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Rain Water Harvesting Charges
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>
														<tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                SAF form Charge
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>
														<tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Total Payable Amount
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>
														<tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Total Received Amount
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-left text-gray-700 whitespace-nowrap border border-gray-300">
                                                                100
                                                            </td>                                                   
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4 mt-3">
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Initial Annual Rental Value of Residential Portion:
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>Yes</p>
                                        </p>

                                    </div>
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Initial Annual Rental Value of Commercial Portion:
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>Yes</p>
                                        </p>

                                    </div>
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Initial Annual Rental Value of Industrial Portion:
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>Yes</p>
                                        </p>

                                    </div>
                                </div> */}
                                {/* <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4 mt-0">
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Total Annual Rental Value:
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>01-05-2021</p>
                                        </p>

                                    </div>
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Total Annual Rental Value after 10% Maintenance Discount (Rule-7):
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>200</p>
                                        </p>
                                    </div>
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Net Payble Property Tax(In Percentage):
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>200</p>
                                        </p>
                                    </div>
                                </div> */}
                                {/* <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4 mt-0">
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Owner's Occupancy or Rental on Residential Building:
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>01-05-2021</p>
                                        </p>

                                    </div>
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Payble Property Tax after 50% Discount on Owner's own Occupency in residential building:
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>1200</p>
                                        </p>

                                    </div>
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <p className='block md:flex-1 lg:flex text-gray-700 text-xs font-bold mb-2 lg:w-96'>Discount Under Section 136 of the Corporation Act 1956 (if eligible):
                                            <p className='block text-gray-700 text-xs font-medium mb-2 lg:ml-3'>1200</p>
                                        </p>

                                    </div>
                                </div> */}
                            </div>
                            <div className="mb-6"></div>
                            {/* <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
                                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                                    <h2 className="text-sm font-semibold text-center text-white">
                                        Annual Rental Value - As Per Old Rule(Effect From 01-04-2016 to 31-03-2022)
                                    </h2>
                                </nav>
                                <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4 mt-3">
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">

                                        <h2 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">*Note:</h2>
                                        <ol class="max-w-lg space-y-1 text-xs text-gray-900 list-decimal list-inside dark:text-gray-400">
                                            <li class="mt-1 mb-1">
                                                <span class="font-semibold text-xs text-gray-900 dark:text-white">Occupancy Factor:</span> <a href="#" className="font-medium text-blue-800 dark:text-blue-800 hover:underline">Click here</a><span class="ml-1 font-normal text-xs text-gray-900 dark:text-white">to view occupanct factor</span>
                                            </li>
                                            <li class="mt-1 mb-1">
                                                <span class="font-semibold text-xs text-gray-900 dark:text-white">Code:</span> <span class="ml-1 font-normal text-xs text-gray-900 dark:text-white">it refers to the Floor details in the above table</span>
                                            </li>
                                            <li class="mt-1 mb-1">
                                                <span class="font-semibold text-xs text-gray-900 dark:text-white">Usage Factor:</span> <a href="#" className="font-medium text-blue-800 dark:text-blue-800 hover:underline">Click here</a><span class="ml-1 font-normal text-xs text-gray-900 dark:text-white">to view usage factor</span>
                                            </li>
                                            <li class="mt-1 mb-1">
                                                <span class="font-semibold text-xs text-gray-900 dark:text-white">Rental Rate:</span> <a href="#" className="font-medium text-blue-800 dark:text-blue-800 hover:underline">Click here</a><span class="ml-1 font-normal text-xs text-gray-900 dark:text-white">to view rental rate</span>
                                            </li>
                                            <li class="mt-1 mb-1">
                                                <span class="font-semibold text-xs text-gray-900 dark:text-white">Carprt Area:</span> <span class="ml-1 font-normal text-xs text-gray-900 dark:text-white">Buildup Area * 70%(Residential)</span>
                                            </li>
                                            <li class="mt-1 mb-1">
                                                <span class="font-semibold text-xs text-gray-900 dark:text-white">Carprt Area:</span><span class="ml-1 font-normal text-xs text-gray-900 dark:text-white">Buildup Area * 80%(Non-Residential)</span>
                                            </li>
                                            <li class="mt-1 mb-1">
                                                <span class="font-semibold text-xs text-gray-900 dark:text-white">Annual Rental Value(ARV)=</span><span class="ml-1 font-normal text-xs text-gray-900 dark:text-white">Carpet Area * Usage Factor * Occupancy Factor * Rental Rate</span>
                                            </li>
                                        </ol>


                                    </div>



                                </div>
                                <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none mt-4 lg:max-w-full">
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <label class="block text-gray-700 text-xs font-bold mb-2" for="password">
                                            Floor Tax Calculation Details

                                        </label>

                                    </div>

                                    <div className="flex flex-col">
                                        <div className="overflow-x-auto">
                                            <div className="p-1.5 lg:w-full inline-block align-middle">
                                                <div className="overflow-hidden">
                                                    <table className="min-w-full">
                                                        <thead className="preview-saf-form-table-laypout">
                                                            <tr>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                                >
                                                                    Code(A)
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                                                >
                                                                    Usage Factor(B)
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                                                >
                                                                    Occupancy Factor(C)
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                                                >
                                                                    Rental Rate(D)
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                                                >
                                                                    Carpet Area(In sq. ft.)(E)
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase  border border-gray-300"
                                                                >
                                                                    ARV(F=B*C*D*E)
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                                                >
                                                                    Effect From(G)
                                                                </th>

                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-200">
                                                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                                <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                    001
                                                                </td>
                                                                <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                    ground Floor
                                                                </td>
                                                                <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                    Residential
                                                                </td>
                                                                <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                    Self-Occupied
                                                                </td>
                                                                <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                    RCC
                                                                </td>

                                                                <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                    600
                                                                </td>
                                                                <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                    12/2019
                                                                </td>
                                                            </tr>


                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                                <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none mt-4 lg:max-w-full">
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <label class="block text-gray-700 text-xs font-bold mb-2" for="password">
                                            Quarterly Tax Calculation Details

                                        </label>

                                    </div>

                                    <div className="flex flex-col">
                                        <div className="overflow-x-auto">
                                            <div className="p-1.5 lg:w-full inline-block align-middle">
                                                <div className="overflow-hidden">
                                                    <table className="min-w-full">
                                                        <thead className="preview-saf-form-table-laypout">
                                                            <tr>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                                >
                                                                    Effect Form
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                                                >
                                                                    ARV
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                                                >
                                                                    Holding Tax
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                                                >
                                                                    Water Tax
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                                                >
                                                                    Latrine/Conservancy Tax
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase  border border-gray-300"
                                                                >
                                                                    Water Harvesting
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                                                >
                                                                    Quarterly Tax
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-200">
                                                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                                <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                    001
                                                                </td>
                                                                <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                    ground Floor
                                                                </td>
                                                                <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                    Residential
                                                                </td>
                                                                <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                    Self-Occupied
                                                                </td>
                                                                <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                    RCC
                                                                </td>

                                                                <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                    600
                                                                </td>
                                                                <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                    12/2019
                                                                </td>
                                                            </tr>


                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div> */}
                            {/* <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none  border border-gray-500 lg:max-w-full">
                                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                                    <h2 className="text-sm font-semibold text-center text-white">
                                        Capital Value - As Per Old Rule(Effect From 01-04-2022)
                                    </h2>
                                </nav>
                                <div className=" md:flex-1 lg:flex min-w-fit max-w-fit items-end gap-4 mt-3">
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">

                                        <h2 class="mb-2 text-sm font-semibold text-gray-900 dark:text-white">*Note:</h2>
                                        <ol class="max-w-lg space-y-1 text-xs text-gray-900 list-decimal list-inside dark:text-gray-400">
                                            <li class="mt-1 mb-1">
                                                <span class="font-semibold text-xs text-red-600 dark:text-white">Occupancy Factor:</span> <a href="#" className="font-medium text-blue-800 dark:text-blue-800 hover:underline">Click here</a><span class="ml-1 font-normal text-xs text-red-600 dark:text-white">to view occupanct factor</span>
                                            </li>

                                            <li class="mt-1 mb-1">
                                                <span class="font-semibold text-xs text-red-600 dark:text-white">Circle Rate:</span> <a href="#" className="font-medium text-blue-800 dark:text-blue-800 hover:underline">Click here</a><span class="ml-1 font-normal text-xs text-red-600 dark:text-white">to view circle rate</span>
                                            </li>
                                            <li class="mt-1 mb-1">
                                                <span class="font-semibold text-xs text-red-600 dark:text-white">Code:</span> <span class="ml-1 font-normal text-xs text-red-600 dark:text-white">it refers to the Floor details in the above table</span>
                                            </li>
                                            <li class="mt-1 mb-1">
                                                <span class="font-semibold text-xs text-red-600 dark:text-white">Appendix-1 Factor:</span> <a href="#" className="font-medium text-blue-800 dark:text-blue-800 hover:underline">Click here</a><span class="ml-1 font-normal text-xs text-red-600 dark:text-white">to view Appendix-1 Factor</span>
                                            </li>
                                            <li class="mt-1 mb-1">
                                                <span class="font-semibold text-xs text-red-600 dark:text-white">Tax Rate for:</span>
                                                <ul class="list-disc px-10">
                                                    <li class="mt-1 mb-1">
                                                        <span class="font-semibold text-xs text-gray-900 dark:text-white">Residential-0.075% </span>
                                                    </li>
                                                    <li class="mt-1 mb-1">
                                                        <span class="font-semibold text-xs text-gray-900 dark:text-white">Non-Residential -0.15%</span>
                                                    </li>
                                                    <li class="mt-1 mb-1">
                                                        <span class="font-semibold text-xs text-gray-900 dark:text-white">Non-Residential and Builtup Area of Usage Type (Hotels, Marrage Hall, Multiplexes, and Shopping Malls) are greter than 25000 sq ft - 0.20% :</span>
                                                    </li>
                                                    <li class="mt-1 mb-1">
                                                        <span class="font-semibold text-xs text-gray-900 dark:text-white">Capital Value (CV) = Builtup Area X Occupancy Factor X Circle Rate </span>
                                                    </li>
                                                    <li class="mt-1 mb-1">
                                                        <span class="font-semibold text-xs text-gray-900 dark:text-white">Yearly Tax = Capital Value X Appendix-1 factor ( <i>1 in case of Non-Residential</i> ) X Tax Rate / 100</span>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ol>


                                    </div>



                                </div>
                                <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none mt-4 lg:max-w-full">
                                    <div class="mb-2 ml-3 mt-2 min-w-fit max-w-fit">
                                        <label class="block text-gray-700 text-xs font-bold mb-2" for="password">
                                            Floor Tax Calculation Details

                                        </label>

                                    </div>

                                    <div className="flex flex-col">
                                        <div className="overflow-x-auto">
                                            <div className="p-1.5 lg:w-full inline-block align-middle">
                                                <div className="overflow-hidden">
                                                    <table className="min-w-full">
                                                        <thead className="preview-saf-form-table-laypout">
                                                            <tr>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                                >
                                                                    Code(A)
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                                                >
                                                                    Usage Factor(B)
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                                                >
                                                                    Occupancy Factor(C)
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                                                >
                                                                    Rental Rate(D)
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                                                >
                                                                    Carpet Area(In sq. ft.)(E)
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase  border border-gray-300"
                                                                >
                                                                    ARV(F=B*C*D*E)
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                                                >
                                                                    Effect From(G)
                                                                </th>

                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-200">
                                                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-600"> 
                                                                <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                    001
                                                                </td>
                                                                <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                    ground Floor
                                                                </td>
                                                                <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                    Residential
                                                                </td>
                                                                <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                    Self-Occupied
                                                                </td>
                                                                <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                    RCC
                                                                </td>

                                                                <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                    600
                                                                </td>
                                                                <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                    12/2019
                                                                </td>
                                                            </tr>


                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </div>

                            </div> */}
                            {/* <div className="px-0 pt-0 pb-0 m-4 bg-white rounded-none mt-4 border border-gray-500 lg:max-w-full">
                                <nav className="relative flex flex-wrap items-center justify-between pl-2 pr-0 py-1 navcustomproperty mb-1 ring-1 ring-black rounded-none">
                                    <h2 className="text-sm font-semibold text-center text-white">
                                        Final Tax Details
                                    </h2>
                                </nav>

                                <div className="flex flex-col">
                                    <div className="overflow-x-auto">
                                        <div className="p-2.5 lg:w-full inline-block align-middle">
                                            <div className="overflow-hidden">
                                                <table className="min-w-full">
                                                    <thead className="preview-saf-form-table-laypout">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                                            >
                                                                Effect Form
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                                            >
                                                                Yearly Holding Tax
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                                            >
                                                                Quarterly Holding Tax
                                                            </th>

                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                001
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                ground Floor
                                                            </td>
                                                            <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                Residential
                                                            </td>

                                                        </tr>


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div> */}

                        </div>



                    </form>
                    <div className="flex min-w-fit gap-4 text-sm mt-10">
                        <Checkbox class="font-semibold text-xs text-gray-900" color="teal" label="I/We solemnly declare that I am/We are fully aware of the legal provisions contain in this form and other rules and sections of Chhattisgarh Municipal Holding Tax Rule 2013 and Chhattisgarh Municipal Corporation Act 2011 and above information is correct to best of my/our knowledge & belief." />
                    </div>
                    <div className="px-0 pt-0 pb-4 m-4 bg-white rounded-none mt-4 lg:max-w-full">

                        <div className="container py-2 px-10 mx-0 min-w-full flex flex-col items-center">
                            <div class="mb-0 ml-3 mr-4 mt-2 min-w-fit max-w-fit">
                                {/* <CustomBackButton showCustomBackButton={true} /> */}
                                <button 
                                class="w-36 h-8 px-4 py-1 mx-4 mb-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-indigo-600">
                                    Submit
                                </button>
                                <button onClick={() => switchOnPrevModalNOffCurrModal(currModal, prevModal)}
                                    class="w-36 h-8 px-4 py-1  mx-4 mb-2 tracking-wide text-white transition-colors duration-200 transform bg-green-400 rounded-md hover:bg-green-700 focus:outline-none focus:bg-indigo-600">
                                    Edit
                                </button>
                            </div>



                        </div>

                    </div>

                </div>

            </div>
        ) : null
    }
}

export default SAF_form_preview