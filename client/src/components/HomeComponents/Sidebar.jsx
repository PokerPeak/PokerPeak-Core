// import React from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const thisUrl = location.pathname;

  useEffect(() => {
    console.log("url : ", location.pathname);
  }, [location]);

  return (
    <div className="flex flex-col h-full bg-accent">
      <div className="flex flex-col gap-3 mt-3">
        <Link to={"account"}>
          <div className="flex gap-1 items-center">
            <p className="text-3xl">🧿</p>
            <div className="flex flex-col">
              <p className="font-bold">My Account</p>
              <div
                className={`h-[3px] rounded-[30px] ${
                  thisUrl.includes("account") ? "bg-[#a10f0a]" : ""
                }`}
              ></div>
            </div>
          </div>
        </Link>
        <Link to={"dashboard"}>
          <div className="flex gap-1 items-center">
            <p className="text-3xl">🎴</p>
            <div className="flex flex-col">
              <p className="font-bold">Dashboard</p>
              <div
                className={`h-[3px] rounded-[30px] ${
                  thisUrl.includes("dashboard") ? "bg-[#a10f0a]" : ""
                }`}
              ></div>
            </div>
          </div>
        </Link>
        <Link to={"tournament"}>
          <div className="flex gap-1 items-center">
            <p className="text-3xl">🎮</p>
            <div className="flex flex-col">
              <p className="font-bold">Tournament</p>
              <div
                className={`h-[3px] rounded-[30px] ${
                  thisUrl.includes("tournament") ? "bg-[#a10f0a]" : ""
                }`}
              ></div>
            </div>
          </div>
        </Link>
        <Link to={"rooms"}>
          <div className="flex gap-1 items-center">
            <p className="text-3xl">🃏</p>
            <div className="flex flex-col">
              <p className="font-bold">Rooms</p>
              <div
                className={`h-[3px] rounded-[30px] ${
                  thisUrl.includes("rooms") ? "bg-[#a10f0a]" : ""
                }`}
              ></div>
            </div>
          </div>
        </Link>
      </div>
      <div className="text-sm m-1 flex justify-center mt-auto">
        <p>@pokerpeak.2024</p>
      </div>
    </div>
  );
}
