import { useState } from "react";
import { message } from "react-message-popup";
import Avatar from "../utils/Avatar";
// import { useWeb3Context } from "../ThirdWebContext";
import { LightlinkPegasusTestnet } from "@thirdweb-dev/chains";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useNavigate } from "react-router-dom";
import Loading from "../utils/Loading";
// import  rupee from "../assets/rupee.png";

export default function Signup() {
  // const {  address } = useWeb3Context();
  const Navigate = useNavigate();

  const [load, setLoad] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("https://avataaars.io/");
  const [phone, setPhone] = useState("");

  // const sdk = useSDK();
  const address = useAddress();

  //adding address from thirdwebbb

  //function
  const handelEmail = (event) => {
    setEmail(event.target.value);
  };
  const handelName = (event) => {
    setName(event.target.value);
  };
  const handelPass = (event) => {
    setPassword(event.target.value);
  };
  const handelRePass = (event) => {
    setRePassword(event.target.value);
  };
  const handelPhone = (event) => {
    setPhone(event.target.value);
  };

  const HandelSignup = () => {
    if (!checkAllGood()) {
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("name", name);
    urlencoded.append("address", address);
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    urlencoded.append("avatar", avatar);
    urlencoded.append("phoneNo", phone);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };
    setLoad((lod) => !lod);
    fetch("http://localhost:2024/signup", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (JSON.parse(result)?.status == 201) {
          message.success("Account Created Sucessfully!");
          Navigate("/login");
        } else {
          console.log(result);
        }
        setLoad((lod) => !lod);
      })
      .catch((error) => {
        setLoad((lod) => !lod);
        console.log("error", error);
      });
  };

  const checkAllGood = () => {
    if (name === "") {
      message.error("Enter a Name", 3000);
      return false;
    }
    if (email === "") {
      message.error("Enter a Email", 3000);
      return false;
    }
    if (phone === "") {
      message.error("Enter a Phone", 3000);
      return false;
    }
    if (password === "") {
      message.error("Enter the password", 3000);
      return false;
    }
    if (rePassword === "") {
      message.error("Re-Enter the password ", 3000);
      return false;
    }
    if (rePassword != password) {
      message.error("re-password must be same to password!");
      return false;
    }
    return true;
  };

  // const signMessage = async()=>{
  //     const sign = await sdk?.wallet.sign("kello");
  //     if(!sign){
  //         alert('cancled');
  //         return;
  //     }
  //     setSignature(sign);

  //     const addressRevcovered = await sdk?.wallet.recoverAddress("kello",sign);
  //     if(!addressRevcovered){
  //         alert("no address");
  //         return;
  //     }
  //     console.log(addressRevcovered);
  //     setAddress(addressRevcovered);
  // }
  return (
    <>
      <div className="h-screen flex flex-col gap-1 items-center justify-center">
        <div className="bg-black border border-gray-300 text-white text-card w-[50%] p-5 px-6 shadow-2xl shadow-gray-900 rounded-[30px]">
          <p className="text-4xl font-bold font-goudy mb-8">Sign Up</p>
          <div className="flex justify-between text-input m-2">
            <div className="flex flex-col text-gray-500 w-[50%]">
              <p className="text-2xl font-goudy font-bold">Name</p>
              <input
                type="text"
                value={name}
                placeholder="Kamlesh Kumar"
                onChange={handelName}
                className="m-1 p-1 px-4 rounded-[10px] focus:outline-none"
              />

              <p className="text-2xl font-goudy font-bold">Email</p>
              <input
                type="text"
                value={email}
                placeholder="example@domain.com"
                onChange={handelEmail}
                className="m-1 p-1 px-4 rounded-[10px] focus:outline-none"
              />

              <p className="text-2xl  font-goudy font-bold">Phone</p>
              <input
                type="text"
                value={phone}
                placeholder="+xx xxx-xxx-xxxx"
                onChange={handelPhone}
                className="m-1 p-1 px-4 rounded-[10px] focus:outline-none"
              />

              <p className="text-2xl  font-goudy font-bold">Password</p>
              <input
                type="password"
                value={password}
                onChange={handelPass}
                className="m-1 p-1 px-4 rounded-[10px] focus:outline-none"
              />

              <p className="text-2xl  font-goudy font-bold">Re-Password</p>
              <input
                type="password"
                value={rePassword}
                onChange={handelRePass}
                className="m-1 p-1 px-4 rounded-[10px] focus:outline-none"
              />

              {address ? (
                <p className="text-2xl  font-goudy font-bold">Connected!!</p>
              ) : (
                <p className="text-2xl  font-goudy font-bold">
                  Connect address
                </p>
              )}
              <div className="">
                <ConnectWallet
                  switchToActiveChain={true}
                  displayBalanceToken={{
                    [LightlinkPegasusTestnet.chainId]:
                      "0x89CCf46D641F30E6D04833f1352D6b2DD40c6E12"
                  }}
                  theme="light"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Avatar avatar={avatar} setAvatar={setAvatar} />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-primary w-[300px] mt-3 p-1 rounded-[20px] font-bold flex gap-2 items-center justify-center"
              onClick={HandelSignup}
            >
              <p className="text-3xl">🦭</p>Register...
            </button>
            <button
              className="bg-[#ffffff] text-primary w-[150px] mt-3 p-1 rounded-[20px] font-bold flex gap-2 items-center justify-center"
              onClick={() => {
                Navigate("/login");
              }}
            >
              <p className="text-3xl">🫏</p>Log in
            </button>
          </div>
        </div>
      </div>
      {load && <Loading />}
    </>
  );
}
