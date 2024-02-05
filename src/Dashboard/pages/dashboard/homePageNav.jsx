import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

import { Select, Option, Textarea, Checkbox } from "@material-tailwind/react";

function HomePageNav() {
  const navigate = useNavigate()
  const [openNav, setOpenNav] = useState(false);



  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const handleLogout = () => {
    //window.localStorage.removeItem("SUDA_TOKEN")
    document.cookie = `SUDA_TOKEN=; path=/`
    console.log("Logging out!")
    navigate("/home")
  }

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );
  return (
    <Navbar className="mx-auto max-w-screen-2xl bg-indigo-900 rounded-md py-2 px-4 lg:px-8 lg:py-2">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="div"
          className="mr-4 py-0 font-normal flex"
        >
          <img
            src="/img/ch_logo.png"
            class="w-12 h-12 rounded-full"
            alt=""
          />
          <span className='lg:text-xl mt-3 ml-2 text-white lg:font-extrabold uppercase '> WELCOME TO</span>
          {/* <div className="flex flex-col lg:w-96 gap-6 ml-2 h-10">
            <Select value='BHILAI MUNICIPAL CORPORATION' variant="standard" className='text-white lg:text-xl lg:font-extrabold uppercase h-10'>
              <Option value='BILASPUR MUNICIPAL CORPORATION' className='pt-2 pb-1'>BILASPUR MUNICIPAL CORPORATION</Option>
              <Option value='DURG MUNICIPAL CORPORATION' className='pt-2 pb-1'>DURG MUNICIPAL CORPORATION</Option>
              <Option value='RISALI MUNICIPAL CORPORATION' className='pt-2 pb-1'> RISALI MUNICIPAL CORPORATION</Option>
              <Option value='BHILAI MUNICIPAL CORPORATION' className='pt-2 pb-1'> BHILAI MUNICIPAL CORPORATION</Option>
            </Select>
          </div> */}
        </Typography>
        <Typography
          as="div"
          className="mr-4 py-0 font-normal flex"
        >
          <img
            src="/img/ch_logo.png"
            class="w-12 h-12 rounded-full"
            alt=""
          />
          
          
        </Typography>
        <div className=" lg:block">{navList}</div>
        {/* <Button onClick={handleLogout} variant="gradient" size="sm" className="hidden lg:inline-block">
          <span>Log Out</span>
        </Button> */}

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>

        <div className="container mx-auto">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2" >
            <span>Password Management</span>
          </Button>
        </div>
        <div className="container mx-auto">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>User Guide</span>
          </Button>
        </div>
        <div className="container mx-auto">
          {navList}
          <Button onClick={handleLogout} variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Log Out</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  )
}

export default HomePageNav