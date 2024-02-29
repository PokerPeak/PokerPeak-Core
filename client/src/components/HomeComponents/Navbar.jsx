// import React from "react";
import { fullScreenState } from "@/atoms/triggers";
import { LightlinkPegasusTestnet } from "@thirdweb-dev/chains";
import { ConnectWallet } from "@thirdweb-dev/react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import logo from "../../assets/logo2.png";
import { useTheContext } from "../../context";

export default function Navbar() {
  const { userData, setUserData } = useTheContext();
  const Navigate = useNavigate();
  const FullScreenTrigger = useRecoilValue(fullScreenState);

  const logoutHandler = () => {
    setUserData(null);
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <div
        className={` ${
          !FullScreenTrigger && "hidden"
        } flex justify-between px-4 py-1 pb-2 border-b border-border`}
      >
        <div className="flex gap-2 items-center">
          <Link to="/" className="flex items-center justify-center">
            <img src={logo} className="w-[210px]" alt="" />
          </Link>
        </div>
        {/* stuff of users.. */}
        <div className="flex mx-2 gap-4">
          {/* <div className="flex gap-1 items-center">
            <img src={userData?.userInfo?.avatar} className="h-[30px]" alt="" />
            <div className="flex flex-col">
              <p>{userData?.userInfo?.name}</p>
              <div className="h-[3px] rounded-[10px] bg-[#3f3f3f]"></div>
            </div>
          </div> */}
          <ConnectWallet
            switchToActiveChain={true}
            displayBalanceToken={{
              [LightlinkPegasusTestnet.chainId]:
                "0x89CCf46D641F30E6D04833f1352D6b2DD40c6E12"
            }}
            theme="dark"
            className="connectWallet-btn"
          />
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={logoutHandler}
          >
            {/* <img src={logout} className="h-[70%]" alt="" /> */}
            Logout
          </div>
        </div>
      </div>
    </>
  );
}

// token
// userInfo
// admin
// avatar
// createdAt
// email
// kyc
// name
// phoneNo
// pooledMoney
// token
// updatedAt
// verified
// __v
// _id
