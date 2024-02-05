import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  ArrowRightIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import {
  Home,
  Profile,
  Tables,
  Notifications,
} from "@/Dashboard/pages/dashboard";
const SignUp = () => import("@/Dashboard/pages/auth");
const SignIn = () => import("@/Dashboard/pages/auth");
import HomePage from "@/Dashboard/pages/dashboard/homePage";
import MainPageSearchProperty from "@/Dashboard/formPagesAdmin/propertyPaymentModule/searchProperty/mainPageSearchProperty";
import DashboardHome from "@/Dashboard/pages/dashboard/dashboardHome";
import MainPageSafNewProperty from "@/Dashboard/formPagesAdmin/propertyPaymentModule/safNewProperty/mainPageSafNewProperty";
import UserManagement from "@/Dashboard/pages/dashboard/userManagement";
import PasswordManagement from "@/Dashboard/pages/dashboard/passwordManagement";
import RoleManagement from "@/Dashboard/pages/dashboard/roleManagement";
import MainPageSAFReAssessment from "@/Dashboard/formPagesAdmin/propertyPaymentModule/safReAssessment/mainPageSAFReAssessment";
import MainPageUserManagement from "@/Dashboard/formPagesAdmin/userManagementModule/userManagement/mainPageUserManagement";
import MainPageBankReconciliation from "@/Dashboard/formPagesAdmin/propertyPaymentModule/bankReconciliation/mainPageBankReconciliation";

import { dashboardRoutesObject } from "@/Dashboard/data/routes-dashboard-constants";
import MainPagePropertyOwnerDetails from "@/Dashboard/formPagesAdmin/propertyPaymentModule/propertyOwnerDetails/mainPagePropertyOwnerDetails";
import MainPagePaymentModeReport from "@/Dashboard/formPagesAdmin/propertyReportModule/paymentModeReport/mainPagePaymentModeReport";
import MainPageTeamWiseSummaryReport from "@/Dashboard/formPagesAdmin/propertyReportModule/teamWiseSummaryReport/mainPageTeamWiseSummaryReport";
import MainPageWardWiseDemandReport from "@/Dashboard/formPagesAdmin/propertyReportModule/wardWiseDemandReport/mainPageWardWiseDemandReport";
import MainPagePaymentDetailsReport from "@/Dashboard/formPagesAdmin/propertyReportModule/counterCollectionReport/mainPageAllPaymentReceiptDetailsReport";
import MainPageBulkPaymentReceipt from "@/Dashboard/formPagesAdmin/propertyReportModule/bulkPaymentReceipt/mainPageBulkPaymentReceipt";
import MainPagePaymentModeUpdate from "@/Dashboard/formPagesAdmin/propertyPaymentModule/paymentModeUpdate/mainPagePaymentModeUpdate";
import MainPageDeleteTransaction from "@/Dashboard/formPagesAdmin/propertyPaymentModule/deleteTransaction/mainPageDeleteTransaction";
import MainPageAddNewUser from "@/Dashboard/formPagesAdmin/userChargesModule/addNewUser/mainPageAddNewUser";
import MainPageAddNewRenter from "@/Dashboard/formPagesAdmin/userChargesModule/addNewRenter/mainPageAddNewRenter";
import MainPageUserChargesDemandAndPayment from "@/Dashboard/formPagesAdmin/userChargesModule/userChargesDemandAndPayment/mainPageUserChargesDemandAndPayment";
import MainPageAddExistingConsumer from "./Dashboard/formPagesAdmin/updateWaterConsumerModule/mainPageAddExistingConsumer";
import MainPageUpdateBasicDetails from "./Dashboard/formPagesAdmin/updateWaterConsumerModule/mainPageUpdateBasicDetails";
import MainPageUpdateConnection from "./Dashboard/formPagesAdmin/updateWaterConsumerModule/mainPageUpdateConnection";
import PaymentReceipt from "./Dashboard/formPagesAdmin/updateWaterConsumerModule/paymentReceipt";
import WaterCounterCollectionReport from "./Dashboard/formPagesAdmin/updateWaterConsumerModule/WaterCounterCollectionReport";
import MainPageUserChargesWasteCounterCollectionReport from "./Dashboard/formPagesAdmin/userChargesModule/userChargesWasteCounterCollectionReport/mainpageUserChargesWasteCounterCollectionReport";
import MainPageUserChargesLastPaymentUpdate from "./Dashboard/formPagesAdmin/userChargesModule/userChargesLastPaymentUpdate/mainpageUserChargesLastPaymentUpdate";
import MainPageLastPaymentUpdate from "./Dashboard/formPagesAdmin/updateWaterConsumerModule/mainPageLastPaymentUpdate";
import MainPagePropertyLastPaymentUpdate from "./Dashboard/formPagesAdmin/propertyPaymentModule/lastPaymentUpdate/mainPagePropertyLastPaymentUpdate";
import MainPageUserChargesUpdateConsumer from "./Dashboard/formPagesAdmin/userChargesModule/userChargesUpdateConsumer/mainpageuserChargesUpdateConsumer";
import MainPageUpdateWaterConsumer from "./Dashboard/formPagesAdmin/updateWaterConsumerModule/mainPageUpdateWaterConsumer";

import AddNewUser from "./Dashboard/formPagesAdmin/userManagementModule/userManagement/addNewUser";
import DeleteTransaction from "./Dashboard/formPagesAdmin/userChargesModule/deleteTransaction/deleteTransaction";
import WaterdeleteTransaction from "./Dashboard/formPagesAdmin/updateWaterConsumerModule/WaterdeleteTransaction";
import MainPageUserChargesUpdatePaymentMode from "./Dashboard/formPagesAdmin/userChargesModule/userChargesUpdatePaymentMode/mainpageUserChargesUpdatePaymentMode";
import MainPageWaterUpdatePaymentMode from "./Dashboard/formPagesAdmin/updateWaterConsumerModule/WaterUpdatePaymentMode/mainPageWaterUpdatePaymentMode";
import MainPageWaterBankReconciliation from "./Dashboard/formPagesAdmin/updateWaterConsumerModule/WaterUpdateBankReconciliation/mainPageBankReconciliation";
import MainPageUserChargesBankReconciliation from "./Dashboard/formPagesAdmin/userChargesModule/userChargesBankReconciliation/mainPageBankReconciliation";
import NewLeaseRegistration from "./Dashboard/formPagesAdmin/bhuBhatakModule/mainPageNewLeaseRegistration";
import DemandandPayment from "./Dashboard/formPagesAdmin/bhuBhatakModule/mainPageDemandandPayment";
import UpdateLastPaymentReceipt from "./Dashboard/formPagesAdmin/bhuBhatakModule/mainPageUpdateLastPaymentReceipt";
import Reports from "./Dashboard/formPagesAdmin/bhuBhatakModule/mainPageReports";
import ArrearandCurrentCollection from "./Dashboard/formPagesAdmin/updateWaterConsumerModule/arrearandCurrentCollection/mainPageArrearandCurrentCollection";
import ArrearAndCurrentCollection from "./Dashboard/formPagesAdmin/userChargesModule/arrearAndCurrentCollection/mainPageUserChargesArrearAndCurrentCollection";
import WaterwardWiseDemand from "./Dashboard/formPagesAdmin/updateWaterConsumerModule/WaterwardWiseDemand";
import Userwardwisedemand from "./Dashboard/formPagesAdmin/userChargesModule/Userwardwisedemand";
import PaidUnpaidReportProperty from "./Dashboard/formPagesAdmin/propertyReportModule/PaidUnpaidReportProperty/index";
import PrintAllPaymentUserWise from "./Dashboard/formPagesAdmin/userChargesModule/PrintAllPaymentUserWise";
import PrintAllPaymentReceiptsUserWise from "./Dashboard/formPagesAdmin/propertyReportModule/PrintAllPaymentReceiptsUserWise/index";
import DailyAssessment from "./Dashboard/formPagesAdmin/propertyReportModule/DailyAssessment/index";
import MainPageUserChargesCounterCollectionReport from "./Dashboard/formPagesAdmin/userChargesModule/userChargesCounterCollectionReport/mainPageUserChargesCounterCollectionReport";
import MainPageUserChargesWardWiseDemandReport from "./Dashboard/formPagesAdmin/userChargesModule/userChargesWardWiseDemandReport/mainPageUserChargesWardWiseDemandReport";
import MainPageUpdateWaterWardWiseDemandReport from "./Dashboard/formPagesAdmin/updateWaterConsumerModule/mainPageUpdateWaterWardWiseDemandReport";
import MainPageUserChargesTeamWiseCollectionSummary from "./Dashboard/formPagesAdmin/userChargesModule/userChargesTeamWiseCollectionSummary/MainPageUserChargesTeamWiseCollectionSummary";
import MainPageUpdateWaterTeamWiseCollectionSumary from "./Dashboard/formPagesAdmin/updateWaterConsumerModule/MainPageUpdateWaterTeamWiseCollectionSumary";
import MainPageUserChargesPaymentModeWiseCollection from "./Dashboard/formPagesAdmin/userChargesModule/userChargesPaymentModeWiseCollection/MainPageUserChargesPaymentModeWiseCollection";
import MainPageUpdateWaterPaymentModeWiseCollection from "./Dashboard/formPagesAdmin/updateWaterConsumerModule/MainPageUpdateWaterPaymentModeWiseCollection";
import MainPageUpdateLeaseRenewal from "./Dashboard/formPagesAdmin/bhuBhatakModule/mainPageUpdateLeaseRenewal";
import MainPageUpdateLastPaymentChallan from "./Dashboard/formPagesAdmin/bhuBhatakModule/mainPageUpdateLastPaymentChallan";
import MainPageDeactivationPanel from "./Dashboard/formPagesAdmin/bhuBhatakModule/mainPageDeactivationPanel";
import AssessmentSurveyReport from "./Dashboard/formPagesAdmin/propertyReportModule/assessmentsurveyreport/AssessmentSurveyReport";
import CounterArrearCurrentCollection from "./Dashboard/formPagesAdmin/propertyReportModule/counterArrearCurrentCollection/CounterArrearCurrentCollection";
import SendDueDemandSms from "./Dashboard/formPagesAdmin/propertyReportModule/sendDueDemandSms/SendDueDemandSms";
import MainpageuserChargesUpdateCategoryRange from "./Dashboard/formPagesAdmin/userChargesModule/mainpageuserChargesUpdateCategoryRange/MainpageuserChargesUpdateCategoryRange";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: dashboardRoutesObject.dashboardLayout,
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Home",
        path: dashboardRoutesObject.dashboardHome,
        element: <Home />,
        element: <DashboardHome />,
        upIcon: <ChevronUpIcon {...icon} />,
        downIcon: <ChevronDownIcon {...icon} />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Users Management",
        path: dashboardRoutesObject.dashboardUserNameManagement,
        element: <MainPageUserManagement />,
        upIcon: <ChevronUpIcon {...icon} />,
        downIcon: <ChevronDownIcon {...icon} />,
      },
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: "Password Management",
      //   path: dashboardRoutesObject.dashboardPasswordManagement,
      //   element: <MainPageUserManagement />,
      //   upIcon: <ChevronUpIcon {...icon} />,
      //   downIcon: <ChevronDownIcon {...icon} />,
      // },
      {
        icon: <HomeIcon {...icon} />,
        name: "Create New User",
        path: dashboardRoutesObject.dashboardAddNewUser,
        element: <AddNewUser />,
        upIcon: <ChevronUpIcon {...icon} />,
        downIcon: <ChevronDownIcon {...icon} />,
      },
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: "Role Management",
      //   path: "/roleManagement",
      //   element: <RoleManagement />,
      //   upIcon: <ChevronUpIcon {...icon} />,
      //   downIcon: <ChevronDownIcon {...icon} />
      // },
    ],
  },
  {
    layout: dashboardRoutesObject.propertyPaymentLayout,
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Self Assessment Form",
        path: dashboardRoutesObject.propertyPaymentSafNew,
        //element: <Home />,
        element: <MainPageSafNewProperty />,
        upIcon: <ChevronUpIcon {...icon} />,
        downIcon: <ChevronDownIcon {...icon} />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "SAF Re-assessment",
        path: dashboardRoutesObject.propertyPaymentSearchPropertyNReAssessment,
        //element: <Home />,
        element: <MainPageSAFReAssessment />,
        upIcon: <ChevronUpIcon {...icon} />,
        downIcon: <ChevronDownIcon {...icon} />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Demand and Payment",
        path: dashboardRoutesObject.propertyPaymentSearchPropertyNDemandPayment,
        //element: <Home />,
        element: <MainPageSearchProperty />,
        upIcon: <ChevronUpIcon {...icon} />,
        downIcon: <ChevronDownIcon {...icon} />,
      },
      
      {
        icon: <HomeIcon {...icon} />,
        name: "Bank Reconciliation",
        path: dashboardRoutesObject.propertyPaymentBankReconciliation,
        //element: <Home />,
        element: <MainPageBankReconciliation />,
        upIcon: <ChevronUpIcon {...icon} />,
        downIcon: <ChevronDownIcon {...icon} />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Property Owner Details Update",
        path: dashboardRoutesObject.propertyOwnerDetailsUpdate,
        //element: <Home />,
        element: <MainPagePropertyOwnerDetails />,
        upIcon: <ChevronUpIcon {...icon} />,
        downIcon: <ChevronDownIcon {...icon} />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Update Payment Mode",
        path: dashboardRoutesObject.propertyPaymentPaymentModeUpdate,
        //element: <Home />,
        element: <MainPagePaymentModeUpdate />,
        upIcon: <ChevronUpIcon {...icon} />,
        downIcon: <ChevronDownIcon {...icon} />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Delete Transaction",
        path: dashboardRoutesObject.propertyPaymentDeleteTransaction,
        //element: <Home />,
        element: <MainPageDeleteTransaction />,
        upIcon: <ChevronUpIcon {...icon} />,
        downIcon: <ChevronDownIcon {...icon} />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Last Payment Update",
        path: dashboardRoutesObject.propertyPaymentLastPaymentUpdate,
        //element: <Home />,
        element: <MainPagePropertyLastPaymentUpdate />,
        upIcon: <ChevronUpIcon {...icon} />,
        downIcon: <ChevronDownIcon {...icon} />,
      },
    ],
  },
  {
    layout: dashboardRoutesObject.propertyReportLayout,
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Payment Mode Report",
        path: dashboardRoutesObject.paymentModeReport,
        //element: <Home />,
        element: <MainPagePaymentModeReport />,
        upIcon: <ChevronUpIcon {...icon} />,
        downIcon: <ChevronDownIcon {...icon} />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Team Wise Summary Report",
        path: dashboardRoutesObject.teamWiseSummaryReport,
        //element: <Home />,
        element: <MainPageTeamWiseSummaryReport />,
        upIcon: <ChevronUpIcon {...icon} />,
        downIcon: <ChevronDownIcon {...icon} />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Paid Unpaid Property List",
        path: dashboardRoutesObject.paidUnpaidPropertyReportProperty,
        //element: <Home />,
        element: <PaidUnpaidReportProperty />,
        upIcon: <ChevronUpIcon {...icon} />,
        downIcon: <ChevronDownIcon {...icon} />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Daily Assessment",
        path: dashboardRoutesObject.dailyAssessmentProperty,
        //element: <Home />,
        element: <DailyAssessment />,
        upIcon: <ChevronUpIcon {...icon} />,
        downIcon: <ChevronDownIcon {...icon} />,
      },
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: "Print Payment Receipts User Wise",
      //   path: dashboardRoutesObject.printAllPaymentReceiptsUserWise,
      //   //element: <Home />,
      //   element: <PrintAllPaymentReceiptsUserWise />,
      //   upIcon: <ChevronUpIcon {...icon} />,
      //   downIcon: <ChevronDownIcon {...icon} />,
      // },
      {
        icon: <HomeIcon {...icon} />,
        name: "Ward Wise Demand Report",
        path: dashboardRoutesObject.wardWiseDemandReport,
        //element: <Home />,
        element: <MainPageWardWiseDemandReport />,
        upIcon: <ChevronUpIcon {...icon} />,
        downIcon: <ChevronDownIcon {...icon} />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Counter Collection Report",
        path: dashboardRoutesObject.printAllPaymentReceipts,
        //element: <Home />,
        element: <MainPagePaymentDetailsReport />,
        upIcon: <ChevronUpIcon {...icon} />,
        downIcon: <ChevronDownIcon {...icon} />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Bulk Payment Receipt",
        path: "/bulkPaymentReceipt",
        //element: <Home />,
        element: <MainPageBulkPaymentReceipt />,
        upIcon: <ChevronUpIcon {...icon} />,
        downIcon: <ChevronDownIcon {...icon} />,
      },
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: "Assessment Survey Report",
      //   path: "/assessmentSurvey",
      //   element: <AssessmentSurveyReport />,
      //   upIcon: <ChevronUpIcon {...icon} />,
      //   downIcon: <ChevronDownIcon {...icon} />,
      // },
      {
        icon: <HomeIcon {...icon} />,
        name: "Counter Arrear Current Collection",
        path: "/counterArrearCurrentCollection",
        element: <CounterArrearCurrentCollection />,
        upIcon: <ChevronUpIcon {...icon} />,
        downIcon: <ChevronDownIcon {...icon} />,
      },
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: "Send due demand SMS",
      //   path: "/sendDueDemandSms",
      //   element: <SendDueDemandSms />,
      //   upIcon: <ChevronUpIcon {...icon} />,
      //   downIcon: <ChevronDownIcon {...icon} />,
      // },
    ],
  },
  
];

export default routes;
