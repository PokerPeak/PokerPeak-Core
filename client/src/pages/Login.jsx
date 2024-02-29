import { useState } from "react";
import { ConnectWallet, useAddress, useConnectionStatus } from "@thirdweb-dev/react";
import { LightlinkPegasusTestnet } from "@thirdweb-dev/chains";
import { message } from "react-message-popup";

import Loading from "../utils/Loading";
import { useTheContext } from "../context";
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';

export default function Login() {
  const address = useAddress();
  const navigate = useNavigate();
  const connectionStatus = useConnectionStatus();

  const { setUserData } = useTheContext();
  const token = localStorage.getItem("token");

  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);

  const handelPassword = (event) => {
    setPassword(event.target.value);
  };

  const Handelogin = async () => {
    if (!password) {
      message.error("Enter Password", 1000);
      return;
    }
    if (!address) {
      message.error("Connect wallet", 2000);
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("address", address);
    urlencoded.append("password", password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };
    setLoad(true);

    try {
      const response = await fetch(
        "http://localhost:2024/login",
        requestOptions
      );
      const result = await response.text();
      const parsedResult = JSON.parse(result);

      if (parsedResult?.status === "succesfull") {
        message.success("Logged in!!");
        setUserData(parsedResult?.data);
        localStorage.setItem("token", parsedResult?.data.token);
        Navigate("/home/dashboard");
        setLoad(false);
      } else {
        message.info(parsedResult.message);
      }
    } catch (error) {
      message.error(error.result.message);
      console.log("error", error);
    } finally {
      setTimeout(() => {
        setLoad(false);
      }, 1000);
    }
  };

  if (token && connectionStatus === 'connected') {
    return <Navigate to="/home/dashboard" />;
  }

  return (
    <>
      <div className="h-screen flex flex-col gap-1 items-center justify-center">
        <div className="bg-black text-white text-accent w-[50%] p-5 px-6 shadow-2xl shadow-gray-900 rounded-[30px]">
          <p className="text-4xl font-bold font-goudy">Log In</p>
          <div className="m-2">
            <div className="flex text-gray-400 flex-col text-card gap-3">
              <ConnectWallet
                switchToActiveChain={true}
                displayBalanceToken={{
                  [LightlinkPegasusTestnet.chainId]:
                    "0x89CCf46D641F30E6D04833f1352D6b2DD40c6E12"
                }}
                theme="light"
              />
              {token === null && (
                <>
                  <p className="text-2xl font-goudy font-bold">Password</p>
                  <input
                    type="password"
                    value={password}
                    placeholder=""
                    onChange={handelPassword}
                    className="m-1 p-1 px-4 rounded-[10px] focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      className="bg-primary text-white w-[70%] mt-5 p-1 rounded-[20px] font-bold flex gap-2 items-center justify-center"
                      onClick={Handelogin}
                    >
                      <p className="text-3xl">🐻‍❄️</p>Validate..
                    </button>
                    <button
                      className="bg-white text-primary w-[30%] mt-5 p-1 rounded-[20px] font-bold flex items-center justify-center"
                      onClick={() => {
                        navigate("/signup");
                      }}
                    >
                      <p className="text-3xl">🐻</p>Sign up
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {load && <Loading />}
    </>
  );
}
