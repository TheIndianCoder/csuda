import { Home, Profile, SignIn, SignUp } from "@/pages";
import { routesMap } from "@/data/routes-config";
// import { MainPage } from '@/formPages/PropertyOrHoldingTaxForms'
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import MainPagePayPropertyTax from "@/formPages/PropertyOrHoldingTaxForms/pay_property_tax/mainPagePayPropertyTax";
import MainPage from "@/formPages/PropertyOrHoldingTaxForms/saf_form_for_new_property/mainPage";
import MainPageSearchProperty from "@/formPages/PropertyOrHoldingTaxForms/search_proparty/mainPageSearchProperty";

// console.log(routesMap.propertyTax)

export const propertyRoutes = [
  {
    id: 1001,
    name: "saf_new",
    path: routesMap.propertyTax["saf_new"],
    element: <MainPage />
  },
  {
    id: 1002,
    name: "saf_status",
    path: routesMap.propertyTax["saf_status"],
    element: <MainPage />
  },
  {
    id: 1003,
    name: "pay_property_tax",
    path: routesMap.propertyTax["pay_property_tax"],
    element: <MainPagePayPropertyTax />,
  },
  {
    id: 1004,
    name: "search_property",
    path: routesMap.propertyTax["search_property"],
    element: <MainPageSearchProperty />,
  },
  {
    id: 1005,
    name: "view_dues_details",
    path: routesMap.propertyTax["view_dues_details"],
    element: <MainPage />,
  },
  {
    id: 1006,
    name: "view_property_details",
    path: routesMap.propertyTax["view_property_details"],
    element: <MainPage />,
  },
  {
    id: 1007,
    name: "view_payment_details",
    path: routesMap.propertyTax["view_payment_details"],
    element: <MainPage />,
  },
  
];

export default propertyRoutes;
