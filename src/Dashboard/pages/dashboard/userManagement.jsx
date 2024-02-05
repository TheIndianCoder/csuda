import React from 'react'
import { Select, Option, Button, Textarea, Checkbox } from "@material-tailwind/react";

function UserManagement() {
  return (
    <div className="relative flex flex-col justify-center overflow-hidden mt-10 mb-10">
        <div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-md border border-gray-500 lg:max-w-full">
            <nav className="relative flex flex-wrap items-center pl-2 pr-0 py-2 navcustomproperty mb-2 ring-1 ring-black rounded-none">
                <h2 className="text-sm font-semibold text-center text-white pr-3">
                    Employee List Of All:
                </h2>
                <div className="mr-auto md:mr-4 w-72 ">
                    <Select label="Select" className='px-1 py-1 text-white text-xs font-semibold'>
                        <Option> ALL</Option>
                        <Option> Sri Publications & Stationers Pvt. Ltd.</Option>
                        <Option> Municipal Staff Name</Option>
                    </Select>
                </div>
                <Button color="green" className='h-6 w-16 px-2 py-1 bg-green-700 rounded custom_button_add'>Add</Button>
                
            </nav>
            <form className="mt-4 ">
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
                                                Employee Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                            >
                                                Contact No.
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                            >
                                                User Type
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                            >
                                                User Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300 "
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase  border border-gray-300"
                                            >
                                                view
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase  border border-gray-300"
                                            >
                                                Edit
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase  border border-gray-300"
                                            >
                                                Delete
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                            Snigdha Basu
                                            </td>
                                            <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                302587455
                                            </td>
                                            <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                Project Manager
                                            </td>
                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                Snigdha_bmc
                                            </td>
                                            <td className="px-6 py-2 text-xs font-bold text-green-900 text-center whitespace-nowrap border border-gray-300">
                                                Active
                                            </td>

                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                            <Button color="green" className='h-6 w-16 px-1 py-1 bg-green-700 rounded custom_button_add'>View</Button>
                                            </td>
                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                            <Button color="blue" className='h-6 w-16 px-1 py-1 bg-blue-500 rounded'>Edit</Button>
                                            </td>
                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                            <Button color="red" className='h-6 w-16 px-1 mr-1 py-1 bg-red-700 rounded'>Delete</Button>
                                            </td>

                                        </tr>
                                        <tr class="hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                            Snigdha Maity
                                            </td>
                                            <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                958587455
                                            </td>
                                            <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                Project Lead
                                            </td>
                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                Snigdha_risa
                                            </td>
                                            <td className="px-6 py-2 text-xs font-bold text-red-700 text-center whitespace-nowrap border border-gray-300">
                                                Deactive
                                            </td>

                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                    <Button color="green" className='h-6 w-16 px-1 py-1 bg-green-700 rounded custom_button_add'>View</Button>
                                            </td>
                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                            <Button color="blue" className='h-6 w-16 px-1 py-1 bg-blue-500 rounded'>Edit</Button>
                                            </td>
                                            <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                            <Button color="red" className='h-6 w-16 px-1 mr-1 py-1 bg-red-700 rounded'>Delete</Button>
                                            </td>

                                        </tr>


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    </div>
  )
}

export default UserManagement