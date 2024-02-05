import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/Dashboard/widgets/layout";
// import { Footer } from "@/widgets/layout"
import routes from "@/routes-dashboard";
import {
  useMaterialTailwindController, setOpenConfigurator, setSAFAllInputFromAPI, setPaymentModeDetailsInputFromAPI,
  setAllUserDetailsInputFromAPI,
  setConsumerCategoryDetailsInputFromAPI,
  setConsumerRangeDetailsInputFromAPI
}
  from "@/Dashboard/context";
import { useEffect } from "react";
import { getCookieByName } from "@/utils/RequireAuth";
import { COOKIE_CHECK_TIME_INTERVAL, DEFAULT_SUDA_TOKEN_VALUE } from "@/utils/appConstants";
import DashboardHome from "../pages/dashboard/dashboardHome";
import { dashboardRoutesObject } from "../data/routes-dashboard-constants";
import { isUserAdmin } from "@/utils/commonUtils";

const SUDA_API_BASE_URL = import.meta.env.VITE_SUDA_API_BASE_URL

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;
  const location = useLocation()
  const navigate = useNavigate()

  const validateJWTToken = async () => {
    const token = getCookieByName('SUDA_TOKEN')
    const jwtValidateURL = `${SUDA_API_BASE_URL}/tokenValidation/${token}`
    let response = null, responseBody = null;
    try {
      response = await fetch(jwtValidateURL)
      // console.log("route change validate token response=============")
      // console.log(response)
      responseBody = await response.json()
      // console.log("responsebody validate token======================")
      // console.log(responseBody)
      if (response?.status == '200' && responseBody?.toString() == 'true') {
        // console.log("token validated ====> doing nothing")
      } else {
        document.cookie = DEFAULT_SUDA_TOKEN_VALUE
        navigate('/sign-in')
        // console.log("token validation resulted in false =======> navigating to sign-in page again")
      }
    } catch (err) {
      console.error(err)
      document.cookie = DEFAULT_SUDA_TOKEN_VALUE
      navigate('/sign-in')
      // console.log("inside catch :: token validation resulted in false =======> navigating to sign-in page again")
    }
  }

  // console.log("inside dashboard component")
  useEffect(() => {
    validateJWTToken()
  }, [location])

  useEffect(() => {
    // console.log("cookie checking interval set...")
    const clearIntervalHandler = window.setInterval(checkCookie, COOKIE_CHECK_TIME_INTERVAL)
    return () => {
      clearInterval(clearIntervalHandler)
    }
  }, [])

  const checkCookie = function () {

    let lastCookie = document.cookie; // 'static' memory between function calls

    return function () {

      const currentCookie = document.cookie;
      // console.log("checking cookie change.......")
      if (currentCookie != lastCookie) {
        validateJWTToken()
        // something useful like parse cookie, run a callback fn, etc.
        // console.log("cookie change detected.......")
        lastCookie = currentCookie; // store latest cookie
      }
    };
  }();

  const fetchInputDetailsFromAPI = async (url, requestOptions, setter, dispatch) => {
    try {
      const response = await fetch(url, requestOptions)
      const responseBody = await response.json()
      // console.log(responseBody)
      if (response.status == "200") {
        setter(dispatch, responseBody)
      }
    } catch (err) {
      console.error(err)
      setter(dispatch, [])
    }
  }

  useEffect(() => {
    let fetchSAFDropDownLists = async () => {
      try {
        const url = `${SUDA_API_BASE_URL}/SAFAllDropDownList`
        const response = await fetch(url)
        const responseBody = await response.json()
        // console.log(responseBody)
        if (response.status == "200") {
          setSAFAllInputFromAPI(dispatch, responseBody)
        }
      } catch (err) {
        console.error(err)
        setSAFAllInputFromAPI(dispatch, {})
      }
    }
    let fetchPaymentModeDetailsInputFromAPI = async () => {
      try {
        const url = `${SUDA_API_BASE_URL}/PaymentAllDropdown`
        const response = await fetch(url)
        const responseBody = await response.json()
        // console.log(responseBody)
        if (response.status == "200") {
          setPaymentModeDetailsInputFromAPI(dispatch, responseBody)
        }
      } catch (err) {
        console.error(err)
        setPaymentModeDetailsInputFromAPI(dispatch, {})
      }
    }
    let fetchUserDetailsInputFromAPI = async () => {
      try {
        const url = `${SUDA_API_BASE_URL}/admin/getAllUser`
        const requestOptions = {
          method: "GET",
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
        }
        const response = await fetch(url, requestOptions)
        const responseBody = await response.json()
        // console.log(responseBody)
        if (response.status == "200") {
          setAllUserDetailsInputFromAPI(dispatch, responseBody)
        }
      } catch (err) {
        console.error(err)
        setAllUserDetailsInputFromAPI(dispatch, [])
      }
    }
    const requestOptions = {
      method: "GET",
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookieByName('SUDA_TOKEN')}` },
    }
    fetchSAFDropDownLists()
    fetchPaymentModeDetailsInputFromAPI()
    fetchUserDetailsInputFromAPI()
    const fetchConsumerCategoryUrl = `${SUDA_API_BASE_URL}/user/fetchConsumerCategory`
    fetchInputDetailsFromAPI(fetchConsumerCategoryUrl, requestOptions, setConsumerCategoryDetailsInputFromAPI, dispatch)
    const fetchConsumerRangeUrl = `${SUDA_API_BASE_URL}/user/fetchConsumerRange`
    fetchInputDetailsFromAPI(fetchConsumerRangeUrl, requestOptions, setConsumerRangeDetailsInputFromAPI, dispatch)
  }, [])

  return (
    <div className="">
      <Sidenav
        expanded
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/dashboard/logo-ct.png" : "/dashboard/logo-ct-dark.png"
        }
      />
      {/* <p>hola</p>  */}
      <div className={`p-2 ${openSidenav == true ? `xl:ml-80` : `xl:ml-20 xl:mr-20`}`}>
        <DashboardNavbar />
        {/* <Configurator /> */}
        {/* <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton> */}
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              pages.map(({ path, element }) => {
                if (path == dashboardRoutesObject.propertyOwnerDetails) {
                  if (isUserAdmin() != true) {
                    return null
                  }
                }
                return (
                  <Route exact path={`/${layout}${path}`} element={element} />
                )
              })
          )}
        </Routes>
        {/* <DashboardHome /> */}
        <div className="text-blue-gray-600 flex flex-col bg-green-600">
          <Footer />
          
        </div>
      </div>
    </div>

  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
