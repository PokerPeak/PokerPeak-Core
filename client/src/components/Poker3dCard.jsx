import React, { useEffect, useRef } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

export function Poker3dCard() {
  const ref = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.style = "color:black";
      }
    }, 5000);
  }, [ref]);

  return (
    <CardContainer className="inter-var relative">
      <CardBody
        className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]
       w-auto sm:w-[30rem] h-auto rounded-xl p-6 border "
      >
        <div
          className="
        absolute -top-8 w-full z-10 "
        >
          <p
            ref={ref}
            className="text-xl transition-all ease-in-out mb-3 font-bold text-neutral-400  text-center mx-auto"
          >
            Hover me & see the cool effect
          </p>
        </div>

        {/* <CardItem
          as="p"
          translateZ="80"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem> */}
        <CardItem translateZ="50" className="w-full">
          {/* <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          /> */}
          <img
            src="/assets/landing.png"
            alt="poker face"
            className="object-cover w-full h-full rounded-md shadow-xl group-hover/card:shadow-xl"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
