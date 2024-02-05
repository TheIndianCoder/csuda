import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { getCookieByName, validateJwtToken } from "@/utils/RequireAuth";
import { useMaterialTailwindController } from "@/Dashboard/context";


export function Navbar({ brandName, routes, action }) {
  const [ openNav, setOpenNav ] = React.useState(false);
  const [ controller, dispatch ] = useMaterialTailwindController()
  const { isJwtValid } = controller

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {
      routes.map( ({ name, path, icon, href, target }) => {
        if(path === "/sign-in") {
          const jwtToken = getCookieByName("SUDA_TOKEN")
          if( validateJwtToken(jwtToken) ){
            return null;
          }
        }
        return (
        <Typography
          key={name}
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
          {href ? (
            <a
              href={href}
              target={target}
              className="flex items-center gap-1 p-1 font-normal"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </a>
          ) : (
            <Link
              to={path}
              target={target}
              className="flex items-center gap-1 p-1 font-normal"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </Link>
          )}
        </Typography>
      )}
      )}
    </ul>
  );

  return (
    <>
    
    <MTNavbar color="transparent" className="p-0 bg-blue-gray-900 rounded-none ">
      
      <div className="container mt-0 w-full mx-auto flex items-center justify-evenly text-white">
      <img src="/img/ch_logo.png" alt="bg image" width="100" height="100" className="rounded-full"/>
        <Link to="/">
          <Typography className="mr-4 ml-2 cursor-pointer pl-0 font-bold text-4xl">
            {brandName}
          </Typography>
        </Link>
        <div className="hidden lg:block ">{navList}</div>
        
        <IconButton
          variant="text"
          size="sm"
          color="white"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <MobileNav
        className="rounded-xl bg-white px-4 pt-2 pb-4 text-blue-gray-900"
        open={openNav}
      >
        <div className="container mx-auto">
          {navList}
          <a
            href="https://www.material-tailwind.com/blocks/react?ref=mtkr"
            target="_blank"
            className="mb-2 block"
          >
          </a>
          {React.cloneElement(action, {
            className: "w-full block",
          })}
        </div>
      </MobileNav>
    </MTNavbar>
</>
  );
}

Navbar.defaultProps = {
  brandName: "Rajnandgaon Municipal",
  action: (
    <a
      href="#"
      target="_blank"
    >
      {/* <Button variant="gradient" size="sm" fullWidth>
        App Download
      </Button> */}
    </a>
  ),
};

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
