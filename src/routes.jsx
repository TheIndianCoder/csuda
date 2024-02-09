import { Home, Profile, SignIn, SignUp, MaintenancePage } from "@/pages";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

import { Dashboard as DashboardHome } from '@/Dashboard/layouts'

// Customer Hom nav define here------------------------

export const routes = [
  {
    icon: HomeIcon,
    name: "home",
    path: "/home",
    element: <Home />,
    id: 1
  },
 
  {
    
    icon: ArrowRightOnRectangleIcon,
    name: "Official Login",
    path: "login",
    element: <SignIn />,
    id: 3
  },

];

export default routes;
