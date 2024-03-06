import {
  FaHome,
  FaUsers,
  FaCog,
  FaChevronCircleRight,
  FaChevronUp,
} from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";
import {
  HiMiniBuildingLibrary,
  HiMiniCheckCircle,
  HiDocumentDuplicate,
} from "react-icons/hi2";
import { TbUserSquare } from "react-icons/tb";
import {
  HiViewList,
  HiOutlineUserCircle,
  HiDocumentReport,
} from "react-icons/hi";
import { FiSettings, FiFile } from "react-icons/fi";

export const menuItems = [
  {
    icon: RiDashboardLine,
    text: "Dashboard",
    url: "/dashboard" || "/",
    submenus: [],
  },

  {
    icon: FiFile,
    text: "Invoice",
    url: "/dashboard/invoice",
    submenus: [],
  },
  {
    icon: FiSettings,
    text: "Settings",
    url: "/dashboard/settings",
    submenus: [],
  },
];
