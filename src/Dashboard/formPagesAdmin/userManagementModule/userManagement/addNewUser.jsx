import { getCookieByName } from "@/utils/RequireAuth";
import { Option, Select, Tooltip } from "@material-tailwind/react";
import React, { useState } from "react";
import axios from "axios";

const BACKEND_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL;

const AddNewUser = () => {
  const [employee_photo, setEmployee_photo] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [phone, setPhone] = useState(null);
  const [employee_of, setEmployeeOf] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [image, setImage] = useState(null);

  let Designation = [
    {name: "Project Manager", value: "PM"},
    { name: "Ass. Project Manager", value: "APM" },
    { name: "Circle Officer/Manager", value: "CM" },
    { name: "Team Leader", value: "TL" },
    { name: "Tax Collector", value: "TC" },
    { name: "Back Office T/L", value: "BOT" },
    { name: "Back Office", value: "BO" },
    { name: "Area Manager", value: "AM" },
    { name: "JSK (Counter)", value: "J" },
    { name: "Accounts", value: "ACC" },
    // { name: "Old Operator Short Name", value: "BO" },
  ];

  const handleAdduser = async (event, data) => {
    event.preventDefault();
    const userID = getCookieByName("SUDA_USER_ID");
    // console.log(userID);
    if (name && phone && employee_of && designation && password) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email_id", email);
      formData.append("employee_password", password);
      formData.append("contact_number", phone);
      formData.append("employee_of", employee_of);
      formData.append("designation", designation);
      formData.append("employee_image", employee_photo);
      
      
      try {
        const url = `${BACKEND_BASE_URL}/user/create`;
        
        // const requestOptions = {
        //   method: "POST",
        //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
        //   body: JSON.stringify(finalReqObjForSafNewEntry),
        // }

      const header = {
        method: "POST",
        url: url,
        headers: {
          "Content-Type": "application/json",
          "Accept":"application/json",
          Authorization: `Bearer ${getCookieByName("SUDA_TOKEN")}`,
        },
        data: formData,
      }
        // const safNewEntryUrl = `${SUDA_API_BASE_URL}/user/SAFEntry` 
        // const response = await fetch(safNewEntryUrl, requestOptions)
        
        
        console.log("form data");
        axios.request(header).then((response) => {
          console.log("response",response.data)
          const responseBody = response.data;
        }).catch((err) => {
          console.log("err",err)
        })
        // const response = await axios.post(url, formData, { header });
        // const responseBody = response.data;
        if(responseBody){
          console.log("responseBody",responseBody)
        }else{
          console.log("responseBody NOT FOUND")
        }
        console.log("succ",responseBody)
        return;
        if (
          responseBody?.success == true &&
          responseBody?.data.message == "User created successfully"
        ) {
          console.log(responseBody);
          setEmail(null);
          setDesignation(null);
          setPassword(null);
          setPhone(null);
          setEmployeeOf(null);
          setName(null);
          setEmployee_photo(null);
          setImage(null);
          document.getElementById("employee_name").value = "";
          document.getElementById("contact_no").value = "";
          document.getElementById("password").value = "";
          document.getElementById("email_id").value = "";
          document.getElementById("employee_photo").files = [];

          alert("User Added Successfully");
        } else {
          console.log(err);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Please Fill in all the fields");
    }
  };

  const handleDesignationChange = (event) => {
    setDesignation(event);
  };

  const handleEmployeeofChange = (event) => {
    setEmployeeOf(event);
  };

  const handleEmployeePhotoChange = (e) => {
    console.log(e.target.files);
    setEmployee_photo(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
    e.target.value = "";
  };
  return (
    <div className="relative mb-10 mt-10 flex flex-col justify-center overflow-hidden">
      <div className="m-auto w-full rounded-md bg-white px-0 pb-4 pt-0 lg:max-w-full">
        <nav className="navcustomproperty relative mb-2 flex flex-wrap items-center justify-between rounded-lg h-10 py-2 pl-2 pr-0 ring-1 ring-red bg-orange-600">
          <h2 className="text-center text-sm font-semibold text-white">
            Employee Master
          </h2>
        </nav>
        <form className="mt-4" onSubmit={handleAdduser}>
          <div
            className="m-4 flex flex-col justify-between rounded-lg border border-gray-700 bg-white 
         px-4 pb-4 pt-0 md:flex-row lg:max-w-full"
          >
            <div
              className=" 
           col-md-6 flex-col lg:flex lg:justify-between"
            >
              <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit">
                <label
                  className=" mx-1 mb-2  mt-1 block w-[11rem] text-sm font-bold text-gray-700 "
                  htmlFor="employee_name"
                >
                  Employee Name
                  <span className="contents text-sm font-bold text-red-600">
                    *
                  </span>
                </label>
                <Tooltip
                  className={`text-black-900 inline w-64 bg-red-300 text-xs 
                             ${true == false ? `` : `hidden`}`}
                  placement="top"
                  //   content={addExistingConsumerMsgList.validOldConsumerNoMsg}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <input
                    onChange={(e) => setName(e.target.value)}
                    name="employee_name"
                    value={name}
                    color="orange"
                    className={`bg-white-200 appearance-none border 
                                     ${
                                       true == false
                                         ? `border-red-900`
                                         : `border-gray-500`
                                     } text-white-700 w-full rounded px-4 py-2 leading-tight 
                                         focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none`}
                    id="employee_name"
                    type="text"
                    placeholder="Employee Name"
                  />
                </Tooltip>
              </div>
              <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit">
                <label
                  className=" mx-1 mb-2  mt-1 block w-[11rem] text-sm font-bold text-gray-700 "
                  htmlFor="contact_no"
                >
                  Contact no.
                  <span className="contents text-sm font-bold text-red-600">
                    *
                  </span>
                </label>
                <Tooltip
                  className={`text-black-900 inline w-64 bg-red-300 text-xs 
                             ${true == false ? `` : `hidden`}`}
                  placement="top"
                  //   content={addExistingConsumerMsgList.validOldConsumerNoMsg}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    name="contact_no"
                    value={phone}
                    maxLength={10}
                    
                    className={`bg-white-200 appearance-none border 
                                     ${
                                       true == false
                                         ? `border-red-900`
                                         : `border-gray-500`
                                     } text-white-700 w-full rounded px-4 py-2 leading-tight 
                                         focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none`}
                    id="contact_no"
                    type="text"
                    placeholder="90xxxxxxxx"
                  />
                </Tooltip>
              </div>
              <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit">
                <label
                  className=" mx-1 mb-2  mt-1 block w-[11rem] text-sm font-bold text-gray-700 "
                  htmlFor="password"
                >
                  Password
                  <span className="contents text-sm font-bold text-red-600">
                    *
                  </span>
                </label>
                <Tooltip
                  className={`text-black-900 inline w-64 bg-red-300 text-xs 
                             ${true == false ? `` : `hidden`}`}
                  placement="top"
                  //   content={addExistingConsumerMsgList.validOldConsumerNoMsg}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    value={password}
                    type="password"
                    
                    className={`bg-white-200 appearance-none border 
                                     ${
                                       true == false
                                         ? `border-red-900`
                                         : `border-gray-500`
                                     } text-white-700 w-full rounded px-4 py-2 leading-tight 
                                         focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none`}
                    id="password"
                    placeholder="Password"
                  />
                </Tooltip>
              </div>
              <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit">
                <label
                  className=" mx-1 mb-2  mt-1 block w-[11rem] text-sm font-bold text-gray-700 "
                  htmlFor="email_id"
                >
                  Email Id
                </label>
                <Tooltip
                  className={`text-black-900 inline w-64 bg-red-300 text-xs 
                             ${true == false ? `` : `hidden`}`}
                  placement="top"
                  //   content={addExistingConsumerMsgList.validOldConsumerNoMsg}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    name="email_id"
                    value={email}
                    
                    className={`bg-white-200 appearance-none border 
                                     ${
                                       true == false
                                         ? `border-red-900`
                                         : `border-gray-500`
                                     } text-white-700 w-full rounded px-4 py-2 leading-tight 
                                         focus:border-2 focus:border-blue-500 focus:bg-white focus:outline-none`}
                    id="email_id"
                    type="text"
                    placeholder="axxx@xxxxx.com"
                  />
                </Tooltip>
              </div>

              <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit">
                <label
                  className=" mx-1 mb-2  mt-1 block w-[11rem] text-sm font-bold text-gray-700"
                  htmlFor="employee_of"
                >
                  Employee Of
                  <span className="contents text-sm font-bold text-red-600">
                    *
                  </span>
                </label>
                <Tooltip
                  className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${true == false ? `` : `hidden`}`}
                  placement="top"
                  // content={safInputValidatorMsgList.validWardMsg}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <Select
                    onChange={handleEmployeeofChange}
                    label="select"
                    value={employee_of}
                    
                    className={`py-2 pl-2 pr-3 text-xs font-bold text-black
                        ${
                          true == false ? `border-red-900` : ``
                        }`}
                  >
                    <Option value="Sri Publications & Stationers Pvt. Ltd.">
                      {" "}
                      Sri Publications & Stationers Pvt. Ltd.
                    </Option>
                    <Option value=""> </Option>
                  </Select>
                </Tooltip>
              </div>

              <div className="mb-4 ml-3 mt-2 flex min-w-fit max-w-fit">
                <label
                  className=" mx-1 mb-2  mt-1 block w-[11rem] text-sm font-bold text-gray-700 "
                  htmlFor="employee_of"
                >
                  Designation
                  <span className="contents text-sm font-bold text-red-600">
                    *
                  </span>
                </label>
                <Tooltip
                  className={`text-black-900 inline w-64 bg-red-300 text-xs
                                ${true == false ? `` : `hidden`}`}
                  placement="top"
                  // content={safInputValidatorMsgList.validWardMsg}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <Select
                    onChange={handleDesignationChange}
                    value={designation}
                    label="select"
                    
                    className={`py-2 pl-2 pr-3 text-xs font-bold text-black 
                                        ${
                                          true == false ? `border-red-900` : ``
                                        }`}
                  >
                    {Designation.map((designation) => (
                      <Option key={designation.value} value={designation.value}>
                        {designation.name}
                      </Option>
                    ))}
                  </Select>
                </Tooltip>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="transform rounded-md  bg-green-400 px-4 py-1 font-bold text-white hover:bg-green-700 focus:bg-green-400 focus:outline-none"
                >
                  Add
                </button>
              </div>
            </div>

            <div className=" col-md-6 flex justify-center">
              <label
                className=" mb-2 mt-4 text-sm font-bold text-gray-700 "
                htmlFor="employee_name"
              >
                Employee Photo
              </label>
              <div className="mb-4 ml-2 mt-2 gap-4">
                <input
                  onChange={handleEmployeePhotoChange}
                  className="form-control m-0
                                            
                                            rounded
                                            border
                                            border-solid
                                            border-gray-400
                                            bg-white bg-clip-padding 
                                            px-3 py-2 text-xs
                                            font-normal
                                            text-gray-900
                                            transition
                                            ease-in-out focus:border-2
                                            focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none"
                  type="file"
                  accept="image/*"
                  id="employee_photo"
                />
                {image && <img src={image} alt="" className="mt-8 h-28 w-28" />}
                <div>
                  <i className="mt-2 text-xs text-red-500">
                    Note: Only jpg format.
                  </i>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddNewUser;
