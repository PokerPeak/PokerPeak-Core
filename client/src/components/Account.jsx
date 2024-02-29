import { useGetUser } from "@/hooks/useUser";
import { Button } from "./ui/button";
import React from "react";

export default function Account() {
  const user = useGetUser();

  console.log("user : ", user);
  let filteredUser = {};

  if (user) {
    filteredUser = Object.fromEntries(
      Object.entries(user).filter(
        ([key, value]) => key !== "avatar" && key !== "otp" && value !== ""
      )
    );
  }

  console.log("filtered : ", filteredUser);

  return (
    <main className="px-10 bg-[#141414] py-2 w-full rounded-md ">
      <h1 className="text-[2rem] w-full font-bold border-b border-gray-500 text-white">
        User Details :{" "}
      </h1>
      {/* right side */}
      <section className="flex justify-between w-[69%] pt-10 max-w-[1300px]max-md:flex-col-reverse">
        <div className="flex px-2 py-6 flex-col space-y-10  justify-center items-start">
          <ul className="list-none">
            {user &&
              Object.entries(filteredUser).map(([key, value], index) => (
                <li key={index} className="flex space-x-6 w-full">
                  <h1 className="text-[1.3rem] font-semibold">{key} : </h1>
                  <p className="text-green-200 text-[1.2rem]">
                    {String(value)}
                  </p>
                </li>
              ))}
          </ul>
          <Button className="bg-red-400 px-6 text-white">Update Details</Button>
        </div>
        {/* left side */}
        <div className="mt-4">
          <img
            src={user && String(user.avatar)}
            className="w-[190px] bg-[#3d3d3d] border border-gray-500 rounded-md"
            alt="your-avatar"
          />
        </div>
      </section>
    </main>
  );
}
