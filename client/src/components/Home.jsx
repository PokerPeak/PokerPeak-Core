// import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Account, Dashboard, Tournament } from "../components";
import { NoPage } from "../pages";
import Navbar from "./HomeComponents/Navbar";
import Sidebar from "./HomeComponents/Sidebar";
import { fullScreenState } from "../atoms/triggers";
import { useRecoilValue } from "recoil";

// import { useAddress } from "@thirdweb-dev/react";
import { message } from "react-message-popup";
import Rooms from "./Rooms";
import { useConnectionStatus } from "@thirdweb-dev/react";

export default function Home() {
  // const address = useAddress();
  const token = localStorage.getItem("token");
  const FullScreenTrigger = useRecoilValue(fullScreenState);
  const navigate = useNavigate();

  const connectionStatus = useConnectionStatus();

  console.log('connecstatus : ', connectionStatus);

  if (token == undefined || token == null || connectionStatus === 'disconnected') {
    message.info("Session Expired!", 1000);
    navigate('/login');
    return;
  }

  if (FullScreenTrigger) {
    document.body.style.overflowY = "hidden";
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      {/* <div className="bg-[#3f3f3f] h-[3px]"></div> */}
      <div className="flex-1 flex ">
        <div className={`${
          !FullScreenTrigger && "hidden"} px-4 bg-accent`}>
          <Sidebar />
        </div>

        <div className="w-[2px] bg-border"></div>
        <Routes>
          <Route path="account" element={<Account />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tournament" element={<Tournament />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </div>
  );
}

