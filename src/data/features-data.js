import {
  StarIcon,
  ArrowPathIcon,
  FingerPrintIcon,
  TicketIcon
} from "@heroicons/react/24/solid";
import { routesMap } from "./routes-config";

export const featuresData = [
  {
    color: "blue",
    title: "Property / Holding Tax",
    icon: StarIcon,
    description:
      "",
    listIcons: [
      "/logos/Property_Tax/self_ass.png",
      "/logos/Property_Tax/saf_status.png",
      "/logos/Property_Tax/holding.png",
      "/logos/Property_Tax/search_property.png",
      "/logos/Property_Tax/holding.png",
      "/logos/Property_Tax/view_prop.png",
      "/logos/Property_Tax/view_pay.png",
    ],
    listNames: [
      "SAF Form for New Property",
      "SAF Status",
      "Pay Property Tax",
      "Search Property ",
      "View Dues Details",
      "View Property Details",
      "View Payment Details",
    ],
    //Need to change routes as development goes on
    listRoutes: Object.values(routesMap.propertyTax)
  },
  {
    color: "red",
    title: "Water Usage Charge",
    icon: ArrowPathIcon,
    description:
      "",
    listIcons: [
      "/logos/Water/apply_newwtr.png",
      "/logos/Water/regulazation.png",
      "/logos/Water/saf_status.png",
      "/logos/Water/con_dtls.png",
      "/logos/Water/con_dtls2.png",
      "/logos/Water/paisa.png",
      "/logos/Water/bill_view.png",
      "/logos/Water/view_pay.png",
    ],
    listNames: [
      "Apply For New Connection ",
      "Apply For Regularisation",
      "Track Your Status",
      "Search Consumer Details",
      "Ward Wise Consumer Details",
      "Pay Water User Charge ",
      "View Bill Details",
      "View Payment Details "
    ],
    listRoutes: Object.values(routesMap.propertyTax)
  },
  {
    color: "teal",
    title: "Municipal License",
    icon: FingerPrintIcon,
    description:
      "",
    listIcons: [
      "/logos/License/apply_trade.png",
      "/logos/License/renewal_lic.png",
      "/logos/License/amendment_license.png",
      "/logos/License/surendar_lic.png",
      "/logos/License/saf_status.png",
      "/logos/License/con_dtls2.png",
      "/logos/License/dwonload_lic.png",
    ],
    listNames: [
      "Apply For New License ",
      "Apply For Renewal License",
      "Apply For Amendment License",
      "Apply For Surrender License",
      "Track Your Status",
      "Ward Wise Municipal License",
      "Download Municipal License",
    ],
    listRoutes: Object.values(routesMap.propertyTax)
  },
  {
    color: "pink",
    title: "User Charges",
    icon: TicketIcon,
    description:
      "",
    listIcons: [
      "/logos/License/apply_trade.png",
      "/logos/License/renewal_lic.png",
      "/logos/License/amendment_license.png",
      "/logos/License/surendar_lic.png",
      "/logos/License/saf_status.png",
      "/logos/License/con_dtls2.png",
      "/logos/License/dwonload_lic.png",
    ],
    listNames: [
      "Apply For New License ",
      "Apply For Renewal License",
      "Apply For Amendment License",
      "Apply For Surrender License",
      "Track Your Status",
      "Ward Wise Municipal License",
      "Download Municipal License",
    ],
    listRoutes: Object.values(routesMap.propertyTax)
  },
];

export default featuresData;
