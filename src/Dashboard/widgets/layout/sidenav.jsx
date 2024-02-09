import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/Dashboard/context";
import DashboardAccordion from "@/Dashboard/pages/dashboard/dashboardAccordion";
import { getCookieByName } from "@/utils/RequireAuth";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    // dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    dark: "bg-red-900",
    white: "bg-black shadow-lg",
    transparent: "bg-teal-900",
  };

  // console.log("inside sidenav of dashboard")
  // console.log(`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
  //   } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`)

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0 overflow-auto" : "-translate-x-80"
        } fixed inset-0 z-50 my-0 ml-0 h-[calc(100vh-40px)] w-72 rounded-none transition-transform duration-300 `}
    >
      <div
        className={`relative border-b ${sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
          }`}
      >
        <Link to="/dashboard/dashboard/home" className="flex items-center gap-4 py-6 px-2">
          <Typography
            variant="h6"
            as="div"
            className="mr-4 py-0 font-normal flex"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            <img
              src="/img/ch_logo.png"
              className="w-20 h-20 rounded-full"
              alt=""
            />
            <span className='text-sm text-white mt-5 ml-4 font-bold'>{`Welcome, ${getCookieByName("SUDA_USER_NAME")}`}</span>
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-2">
        <ul className="mb-4 flex flex-col gap-1 p-0">
          {/* <div className="hover:bg-red-400 hover:cursor-pointer">
            <Typography
              variant="h6"
              as="div"
              className="py-2 px-4"
              color={sidenavType === "dark" ? "white" : "blue-gray"}
            >
              Navigation
            </Typography>
          </div> */}
          <div className=" hover:bg-red-800 hover:border-black py-2 px-4 hover:cursor-pointer rounded-lg"> 
            <NavLink
              to="/dashboard/dashboard/home"
              className={` text-white text-md font-bold  rounded-lg` }
              // className= {({ isActive }) => isActive? "bg-red-800" : ""}
              activeClassName="bg-red-800 text-white"
            >
              Dashboard
            </NavLink>
          </div>
          
          <DashboardAccordion />
        </ul>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: `Welocme, ${getCookieByName('SUDA_USER_NAME')}`,
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/Dashboard/widgets/layout/sidnave.jsx";

export default Sidenav;
