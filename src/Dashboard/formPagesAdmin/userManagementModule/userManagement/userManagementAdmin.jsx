import React, { useEffect, useState } from 'react'
import { Select, Option, Button, Textarea, Checkbox } from "@material-tailwind/react";
import { getCookieByName } from '@/utils/RequireAuth';
import { ColorRing } from 'react-loader-spinner';

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

function UserManagement({
    switchOnPrevModalNOffCurrModal, setUserIdForPwdChange,
    currModal, nextModal, showModal
}) {
    const [usersList, setUsersList] = useState([])
    const [isUsersListLoading, setIsUsersListLoading] = useState(null)
    const [isUsersListLoadSuccess, setIsUsersListLoadSuccess] = useState(null)
    const loadAllUsersListFromAPI = async () => {
        let response = null, responseBody = null, responseClone = null, responseText = null
        try {
            setIsUsersListLoading(true)
            const requestOptions = {
                method: "GET",
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
            }
            const getAllUsersURL = `${SUDA_API_BASE_URL}/admin/getAllUser`

            response = await fetch(getAllUsersURL, requestOptions)
            // responseClone = response.clone()
            // console.log(response)
            responseBody = await response.json()
            // console.log(responseBody)
            if (response?.status == 200) {
                setUsersList(responseBody)
                setIsUsersListLoadSuccess(true)
            } else {
                setUsersList([])
                setIsUsersListLoadSuccess(false)
            }
        } catch (err) {
            console.log(err)
            // responseText = await responseClone.text()
            // console.log(responseText)
            setIsUsersListLoadSuccess(false)
        } finally {
            setIsUsersListLoading(false)
        }
    }
    useEffect(() => {
        loadAllUsersListFromAPI()
    }, [])

    const handlePasswordChange = (event, userObj, index) => {
        setUserIdForPwdChange(userObj.id)
        switchOnPrevModalNOffCurrModal(currModal, nextModal)
    }
    return showModal == true ? (
        <div className="relative flex flex-col justify-center overflow-hidden mt-10 mb-10">
            <div className="w-full px-0 pt-0 pb-4 m-auto bg-white rounded-md  lg:max-w-full">
                <nav className="relative flex flex-wrap items-center pl-2 pr-0 py-2 navcustomproperty mb-2 ring-1 ring-red rounded-md bg-red-500 h-10">
                    <h2 className="text-sm font-semibold text-center text-white pr-3">
                        List Of All Users
                    </h2>
                    {/* <div className="mr-auto md:mr-4 w-72 ">
                        <Select label="Select" className='px-1 py-1 text-white text-xs font-semibold border border-white hover:border-white'>
                            <Option> ALL</Option>
                            <Option> Sri Publications & Stationers Pvt. Ltd.</Option>
                            <Option> Municipal Staff Name</Option>
                        </Select>
                    </div>
                    <Button color="green" className='h-6 w-16 px-2 py-1 bg-red-600 rounded custom_button_add'>Add</Button> */}

                </nav>
                <form className="mt-4 ">
                    <div className="flex flex-col">
                        <div className="overflow-x-auto">
                            <div className="p-2.5 lg:w-full inline-block align-middle">
                                <div className="lg:overflow-hidden">
                                    {
                                        isUsersListLoading == true ? (
                                            <div className="m-auto w-24 h-24">
                                                <ColorRing
                                                    visible={true}
                                                    height="40"
                                                    width="40"
                                                    colors={['#2fa158', '#2fa158', '#2fa158', '#2fa158', '#2fa158']}
                                                />
                                            </div>
                                        ) : null
                                    }
                                    {
                                        usersList?.length > 0 ? (
                                            <table className="min-w-full">
                                                <thead className="preview-saf-form-table-laypout">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                        >
                                                            Sl No.
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                        >
                                                            User Id
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase border border-gray-300"
                                                        >
                                                            Emplyee Name
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
                                                            Designation
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase  border border-gray-300"
                                                        >
                                                            Status
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-2 text-xs font-bold text-center text-gray-700 uppercase  border border-gray-300"
                                                        >
                                                            Reset Password
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {
                                                        usersList?.map((item, index) => {
                                                            const { user_id, employee_name, user_name, designation, is_active } = item
                                                            return (
                                                                <tr key={index} class="hover:bg-gray-50 dark:hover:bg-gray-600">
                                                                    <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                        {index + 1}
                                                                    </td>
                                                                    <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                        {user_id ? user_id : 'N/A'}
                                                                    </td>
                                                                    <td className="px-6 py-2 text-xs font-medium text-center text-gray-700 whitespace-nowrap border border-gray-300">
                                                                        {employee_name ? employee_name : 'N/A'}
                                                                    </td>
                                                                    <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                        {user_name ? user_name : 'N/A'}
                                                                    </td>
                                                                    <td className="px-6 py-2 text-xs font-bold text-green-900 text-center whitespace-nowrap border border-gray-300">
                                                                        {designation ? designation : 'N/A'}
                                                                    </td>
                                                                    <td className="px-6 py-2 text-xs font-bold text-green-900 text-center whitespace-nowrap border border-gray-300">
                                                                        {is_active ? is_active : 'N/A'}
                                                                    </td>
                                                                    <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                        <Button
                                                                            disabled={user_name?.toString().trim() == 'admin' && user_id == 111 ? true : false}
                                                                            onClick={(event) => handlePasswordChange(event, item, index)}
                                                                            type='button'
                                                                            color="green"
                                                                            className={`h-6 w-30 px-1 py-1 bg-green-700 rounded 
                                                                            ${user_name?.toString().trim() == 'admin' && user_id == 111 ? `password_button_add` : ``}`}>
                                                                            Reset Password
                                                                        </Button>
                                                                    </td>
                                                                    {/* <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                        <Button color="blue" className='h-6 w-16 px-1 py-1 bg-blue-500 rounded'>Edit</Button>
                                                                    </td>
                                                                    <td className="px-6 py-2 text-xs font-medium text-gray-700 text-center whitespace-nowrap border border-gray-300">
                                                                        <Button color="red" className='h-6 w-16 px-1 mr-1 py-1 bg-red-700 rounded'>Delete</Button>
                                                                    </td> */}
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        ) : null
                                    }
                                    {
                                        isUsersListLoadSuccess == false ? (
                                            <p className="text-center font-semibold text-sm text-red-700">
                                                Unable to load user list !
                                            </p>
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>

        </div>
    ) : null
}

export default UserManagement