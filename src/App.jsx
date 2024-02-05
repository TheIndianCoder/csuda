import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import propertyRoutes from "./propertyRoutes/propertyRoutes";
import RequireAuth, { getCookieByName, validateJwtToken } from "./utils/RequireAuth";
import userData from "./data/user-login";
import { Dashboard, Auth } from '@/Dashboard/layouts';
import { useEffect, useState } from "react";
import { useBeforeunload, Beforeunload } from "react-beforeunload";
import HomePage from "./Dashboard/pages/dashboard/homePage";
import { setIsJwtValid, useMaterialTailwindController } from "./Dashboard/context";
// import useUnload from "./utils/useUnload";

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

let accessToken = null //userData.accessToken
// console.log(accessToken)

function App() {
  
  const [controller, dispatch] = useMaterialTailwindController()
  const {isJwtValid} = controller
  accessToken = userData.accessToken
  // console.log(accessToken)
  // console.log(propertyRoutes)
  // console.log("url >>> " + window.location.href)

  const [showPublicNavbar, setPublicNavbar] = useState(true)
  const location = useLocation()
  //const [isSignInTouteEnabled, setisSignInTouteEnabled] = useState(true)

  useEffect(() => {
    let currURL = window.location.href.toLowerCase()
    // console.log("inside useEffect ::: " + currURL)
    if (currURL.includes('dashboard') || currURL.includes('auth')) {
      setPublicNavbar(false)
    } else {
      setPublicNavbar(true)
    }
  }, [location])

  useEffect(() => {
    const validateCookieToken = () => {

    }
  },[])

  let beforeUnloadHandler = (event) => {
    console.log(event)
    event.preventDefault()
    return event.returnValue = "oops??"
  }

  return (
    <>
      
      <div className="container-fluid w-full mb-3  p-0">
        {
          showPublicNavbar ? <Navbar routes={routes} /> : null
        }
      </div>
      <Routes>
        {/* Home page route here */}
        {routes.map(
          ({ path, element, href, id }, key) => {
            if (path === '/profile') {
              return (element && <Route key={id} exact path={path}
                element={<RequireAuth accessToken={accessToken} >{element}</RequireAuth>}
              />)
            } else if (path === '/dashboard') {
              return (element && <Route key={id} exact path={path} href={href} />)
            } 
            else if (path === '/sign-in') {
              // console.log("inside sign-in route")
              const token = getCookieByName("SUDA_TOKEN")
              if(!validateJwtToken(token)){
                // console.log("registering sign-in route")
                // console.log(element)
                return (element && <Route key={id} exact path={path} element={element} />)
              }else{
                // console.log("de-registering sign-in route")
                return null
              }
            }
            else {
              return (element && <Route key={id} exact path={path} element={element} />)
            }

          }

        )}
        <Route key="a" path="*" element={<Navigate to="/home" />} />
        {/* Dashbord side nav here */}
        {
          propertyRoutes.map((item, index) => {
            return (item && <Route key={item.id} exact path={item.path} element={item.element} />)
          })
        }
        {/* Dashboard routes */}
        <Route key="b" path="/dashboard/*" element={<RequireAuth>{<Dashboard />}</RequireAuth>} />
        <Route key="c" path="/auth/*" element={<Auth />} />
        {/* <Route path="*" element={<Navigate to="/dashboard/home" replace />} /> */}
      </Routes>

    </>
  );
}

export default App;
