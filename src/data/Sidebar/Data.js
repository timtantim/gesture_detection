// import {
//     HomeIcon,
//     LayoutIcon,
//     CalendarIcon,
//     InvoiceIcon,
//     UserIcon,
//     RolesIcon,
//     PagesIcon,
//     AuthIcon,
//     WizardIcon,
//     ModalIcon,
//   } from "./Icons";
import {
    HomeIcon,
    LayoutIcon,
    CalendarIcon,
    InvoiceIcon,
    UserIcon,
    LogoutIcon,
    RolesIcon,
    PagesIcon,
    AuthIcon,
    WizardIcon,
    ModalIcon,
    LoginIcon,
    HistoryIcon,
    StreamIcon
  } from "../../Icons/Sidebar/Icons";
import GestureDetection from "../../pages/GestureDetection";
import GestureDetectionRecord from "../../pages/GestureDetectionRecord";
import LiveStream from "../../pages/LiveStream";
import FlvLiveStream from "../../pages/FlvLiveStream";
import Login from "../../pages/Login";
import Logout from "../../pages/Logout";
  
  export const SIDEBAR_DATA = [
    {
        id: 1,
        name: "Gesture Detection",
        path: "gestureDetection",
        icon: <UserIcon />,
        element: <GestureDetection/>,
        private:true
    },
    {
      id: 2,
      name: "Gesture Detection Record",
      path: "gestureDetectionRecord",
      icon: <HistoryIcon />,
      element: <GestureDetectionRecord/>,
      private:true
    },
    {
      id: 3,
      name: "Live Stream",
      path: "liveStream",
      icon: <StreamIcon />,
      element: <LiveStream/>,
      private:true
    },
    {
      id: 4,
      name: "Flv Live Stream",
      path: "FlvliveStream",
      icon: <StreamIcon />,
      element: <FlvLiveStream/>,
      private:true
    },
    {
        id: 5,
        name: "Login",
        path: "login",
        icon: <LoginIcon />,
        element: <Login/>,
        private:false
    },
    {
        id: 6,
        name: "Logout",
        path: "logout",
        icon: <LogoutIcon />,
        element: <Logout/>,
        private:true
    }
    // {
    //   id: 1,
    //   name: "dashboards",
    //   path: "dashboards",
    //   icon: <HomeIcon />,
    // },
    // {
    //   id: 2,
    //   name: "layouts",
    //   path: "layouts",
    //   icon: <LayoutIcon />,
    // },
    // {
    //   id: 3,
    //   name: "calendar",
    //   path: "calendar",
    //   icon: <CalendarIcon />,
    // },
    // {
    //   id: 4,
    //   name: "invoice",
    //   path: "invoice",
    //   icon: <InvoiceIcon />,
    // },
    // {
    //   id: 5,
    //   name: "users",
    //   path: "users",
    //   icon: <UserIcon />,
    // },
    // {
    //   id: 6,
    //   name: "roles & permissions",
    //   path: "roles",
    //   icon: <RolesIcon />,
    // },
    // {
    //   id: 7,
    //   name: "pages",
    //   path: "pages",
    //   icon: <PagesIcon />,
    // },
    // {
    //   id: 8,
    //   name: "authentication",
    //   path: "authentication",
    //   icon: <AuthIcon />,
    // },
    // {
    //   id: 9,
    //   name: "wizard examples",
    //   path: "wizard",
    //   icon: <WizardIcon />,
    // },
    // {
    //   id: 10,
    //   name: "modal examples",
    //   path: "modal",
    //   icon: <ModalIcon />,
    // },
  ];