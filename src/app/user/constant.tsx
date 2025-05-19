import { SideNavItem } from "@/types/types";
import { IconHome, IconCamera, IconRobot } from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/user/dashboard",
    icon: <IconHome width="24" height="24" />,
  },
  {
    title: "Image Prediction",
    path: "/user/predict",
    icon: <IconCamera width="24" height="24" />,
  },
  {
    title: "Our AI Agent",
    path: "/user/agent",
    icon: <IconRobot width="24" height="24" />,
  },
];
