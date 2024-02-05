import React, { Fragment, useState } from 'react'
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
  Typography,
} from "@material-tailwind/react";
import routes from '@/routes-dashboard';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMaterialTailwindController, setOpenSidenav } from "@/Dashboard/context";
import { isUserAdmin } from '@/utils/commonUtils';
import { dashboardRoutesObject } from '@/Dashboard/data/routes-dashboard-constants';
import { AccordionListComponent } from '@/utils/commonComponents';

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function DashboardAccordion() {
  const [open, setOpen] = useState(0);
  const navigate = useNavigate()
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleSideNavChange = (path) => {
    // console.log("navigate: " + path)
    navigate("/dashboard" + path)
  }

  return (
    <Fragment>
      {/* dashboard side nav */}
      
      {/* <Accordian open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader
          className='middle none font-sans font-bold center transition-all hover:text-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white border-none hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize relative'>
          <Link to={'/dashboard/dashboard/home'}>
            Dashboard
          </Link>
        </AccordionHeader>
      </Accordian> */}

      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader
          className='middle none font-sans font-bold center transition-all hover:text-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white border-none hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize relative'
          onClick={() => handleOpen(1)}>
          Manage User
        </AccordionHeader>
        <AccordionBody>
          <ul className="list-disc customlist text-white text-xl font-bold text-green-500">
            {routes.map(({ layout, pages }) => {
              // console.log(pages)
              return pages.map(({ icon, name, path, upIcon, downIcon }) => (
                layout == "dashboard" &&
                <AccordionListComponent
                  name={name}
                  layout={layout}
                  path={path}
                  sidenavColor={sidenavColor}
                  sidenavType={sidenavType} />

              ))
            })
            }
          </ul>
        </AccordionBody>
      </Accordion>
      {/* SAF Setup */}
      {/* <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
        <AccordionHeader 
        className=' middle none font-sans font-bold center transition-all hover:text-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white border-none hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize relative' 
        onClick={() => handleOpen(4)}>
          SAF Manage
        </AccordionHeader>
        <AccordionBody>
          <ul className="list-disc customlist text-white text-xl font-bold text-red-500">
            {routes.map(({ layout, pages }) => {
              return pages.map(({ icon, name, path, upIcon, downIcon }) => (
                layout == "propertyReport" && <AccordionListComponent
                  name={name}
                  layout={layout}
                  path={path}
                  sidenavColor={sidenavColor}
                  sidenavType={sidenavType} />
              ))
            })
            }
          </ul>
        </AccordionBody>
      </Accordion> */}
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader
          className=' middle none font-sans font-bold center transition-all hover:text-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white border-none hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize relative'
          onClick={() => handleOpen(2)}>
          Property Payment
        </AccordionHeader>
        <AccordionBody>
          <ul className="list-disc customlist text-white text-xl font-bold text-green-500">
            {routes.map(({ layout, pages }) => {
              // console.log(pages)
              return pages.map(({ icon, name, path, upIcon, downIcon }) => {
                if (layout == "propertyPayment") {
                  if (path == dashboardRoutesObject.propertyOwnerDetails) {
                    if (isUserAdmin() == true) {
                      return (
                        <AccordionListComponent
                          name={name}
                          layout={layout}
                          path={path}
                          sidenavColor={sidenavColor}
                          sidenavType={sidenavType} />
                      );
                    } else {
                      return null
                    }
                  } else {
                    return (
                      <AccordionListComponent
                        name={name}
                        layout={layout}
                        path={path}
                        sidenavColor={sidenavColor}
                        sidenavType={sidenavType} />
                    )
                  }
                }
              })
            })
            }
          </ul>
        </AccordionBody>
      </Accordion>
      {/* property report side nav */}
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader
          className=' middle none font-sans font-bold center transition-all hover:text-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white border-none hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize relative'
          onClick={() => handleOpen(3)}>
          Property Report
        </AccordionHeader>
        <AccordionBody>
          <ul className="list-disc customlist text-white text-xl font-bold text-green-500">
            {routes.map(({ layout, pages }) => {
              // console.log(pages)
              return pages.map(({ icon, name, path, upIcon, downIcon }) => (
                layout == "propertyReport" &&
                <AccordionListComponent
                  name={name}
                  layout={layout}
                  path={path}
                  sidenavColor={sidenavColor}
                  sidenavType={sidenavType} />
              ))
            })
            }
          </ul>
        </AccordionBody>
      </Accordion>
      {/* user charge side nav */}
      {/* <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
        <AccordionHeader
          className='middle none font-sans font-bold center transition-all hover:text-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white border-none hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize relative'
          onClick={() => handleOpen(4)}>
          User Charges
        </AccordionHeader>
        <AccordionBody>
          <ul className="list-disc customlist text-white text-xl font-bold text-green-500">
            {routes.map(({ layout, pages }) => {
              return pages.map(({ icon, name, path, upIcon, downIcon }) => {
                return (
                  layout == "userCharges" &&
                  <AccordionListComponent
                    name={name}
                    layout={layout}
                    path={path}
                    sidenavColor={sidenavColor}
                    sidenavType={sidenavType} />
                )
              })
            })
            } 
          </ul>
        </AccordionBody>
      </Accordion>  */}
      {/* water consumer side nav */}
      {/* <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
        <AccordionHeader
          className='middle none font-sans font-bold center transition-all hover:text-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white border-none hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize relative'
          onClick={() => handleOpen(5)}>
           Water Consumer
        </AccordionHeader>
        <AccordionBody>
          <ul className="list-disc customlist text-white text-xl font-bold text-green-500">
            {routes.map(({ layout, pages }) => {
              // console.log(pages)
              return pages.map(({ icon, name, path, upIcon, downIcon }) => {
                console.log(layout)
                return (
                  layout == "updateWaterConsumer" &&
                  <AccordionListComponent
                    name={name} 
                    layout={layout}
                    path={path}
                    sidenavColor={sidenavColor}
                    sidenavType={sidenavType} />
                )
              })
            })
            }
          </ul>
        </AccordionBody>
      </Accordion> */}
      {/* Bhu Bhatak side nav */}
      {/* <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
        <AccordionHeader
          className='middle none font-sans font-bold center transition-all hover:text-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white border-none hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize relative'
          onClick={() => handleOpen(6)}>
           Bhu Bhatak
        </AccordionHeader>
        <AccordionBody>
          <ul className="list-disc customlist text-white text-xl font-bold text-green-500">
            {routes.map(({ layout, pages }) => {
              // console.log(pages)
              return pages.map(({ icon, name, path, upIcon, downIcon }) => {
                console.log(layout)
                return (
                  layout == "bhubhatak" &&
                  <AccordionListComponent
                    name={name} 
                    layout={layout}
                    path={path}
                    sidenavColor={sidenavColor}
                    sidenavType={sidenavType} />
                )
              })
            })
            }
          </ul>
        </AccordionBody>
      </Accordion> */}

      
      {/* Property Accountant */}
      {/* <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
        <AccordionHeader 
        className=' middle none font-sans font-bold center transition-all hover:text-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-white border-none hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize relative' 
        onClick={() => handleOpen(5)}>
          Property Accountant
        </AccordionHeader>
        <AccordionBody>
          <ul className="list-disc customlist text-white text-xl font-bold text-green-500">
            {routes.map(({ layout, pages }) => {
              // console.log(pages)
              return pages.map(({ icon, name, path, upIcon, downIcon }) => (
                layout == "propertyReport" && <AccordionListComponent
                  name={name}
                  layout={layout}
                  path={path}
                  sidenavColor={sidenavColor}
                  sidenavType={sidenavType} />
              ))
            })
            }
          </ul>
        </AccordionBody>
      </Accordion> */}

    </Fragment>

  )
}

export default DashboardAccordion