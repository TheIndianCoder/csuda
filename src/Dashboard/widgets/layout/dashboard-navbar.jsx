import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { Select, Option, Textarea, Checkbox } from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,

} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/Dashboard/context";
import routes from "@/routes-dashboard";
import { DEFAULT_SUDA_TOKEN_VALUE, DEFAULT_SUDA_USER_ID_VALUE, DEFAULT_SUDA_USER_NAME_VALUE, DEFAULT_SUDA_USER_ROLE_VALUE } from "@/utils/appConstants";
import { ro } from "date-fns/locale";

export function DashboardNavbar() {
  console.log("route", routes)
  
  const [controller, dispatch] = useMaterialTailwindController();  // set dashboard side nav bar
  // console.log("inside DashboardNavbar ::: printing controller")
  // console.log(controller)
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page, subpage] = pathname.split("/").filter((el) => el !== "");
  const navigate = useNavigate()
  const handleLogout = () => {
    //window.localStorage.removeItem("SUDA_TOKEN")
    document.cookie = DEFAULT_SUDA_TOKEN_VALUE
    document.cookie = DEFAULT_SUDA_USER_ID_VALUE
    document.cookie = DEFAULT_SUDA_USER_NAME_VALUE
    document.cookie = DEFAULT_SUDA_USER_ROLE_VALUE
    console.log("Logging out!")
    navigate("/home")
  }

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${fixedNavbar
        ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-800"
        : "px-0 py-1"
        }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="">
          {/* <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""
              }`}
          >
            <Link to={`/dashboard/dashboard/home`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-red-700 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {subpage}
            </Typography>
          </Breadcrumbs> */}

          {/* side nav bar start */}
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid "
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-8 w-8 text-red-700 border border-red-500 rounded-sm hover:bg-red-100 " />
          </IconButton>
          {/* side nav bar start end */}
          
          {/* side nav bar link start here */}
          {            
            routes.map((item, index) => {
              
              for (let i = 0; i < item.pages.length; i++) {
                if (item.pages[i].path.includes(subpage)) {
                  return (
                    <Typography key={`${index}-${i}`} variant="h6" color="blue-gray">                      
                      {item.pages[i].name}
                    </Typography>
                  )
                }
              }
            })
          }
          {/* side nav bar link End here */}
        </div>
        <div className="md:mr-4 w-82 flex justify-evenly">
            {/* <img src="http://localhost/img/ch_logo.png" alt="rajnandgaon " className="w-20 h-20 rounded-full" /> */}
            <Typography variant="h5" color="red">
              <div >
              <strong >RAJNANDGAON MUNICIPAL CORPORATION</strong>
              </div>
              
            </Typography>
        </div>
        {/* nagar nigam content here */}
        <div className="flex items-center">
          {/* notification icon Start */}

          {/* <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src=""
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New message</strong> from Laur
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src=""
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New album</strong> by Travis Scott
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    Payment successfully completed
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu> */}

          {/* notification icon End */}
          
          {/* login button and profile  Start*/}
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <Link to={`/dashboard/dashboard/home/profile`}>
                      <strong>My Profile</strong>
                    </Link>
                    
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-3">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    
                    <Link to="/dashboard/change-password">
                      <strong>Password Management</strong>
                    </Link>
                  </Typography>
                </div>

              </MenuItem>
              <MenuItem className="flex items-center gap-4" onClick={handleLogout}>
                <div  >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    
                    <strong >Log Out</strong>
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
          {/* login button and profile  End*/}
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/Dashboard/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
