import { cn } from "@/lib/utils";
import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ className }) => {
  return (
    <div
      className={cn(
        "w-full fixed -bottom-1 z-10 p-4 px-6 text-gray-400 bg-black/90",
        className
      )}
    >
      <div
        className="py-2 flex justify-between items-center 
      border-t border-[#745f0e] "
      >
        {/* copyright */}
        <h2>Copyright &copy; 2024 Poker Peak</h2>
        {/* right Side */}
        <div className="flex items-center space-x-4">
          <Link target="_blank" to="https://twitter.com/poker_peak">
            twitter
          </Link>
          <Link
            target="_blank"
            to="https://github.com/PokerPeak/PokerPeak-Core"
          >
            Github
          </Link>
          <Link to="/help">Help</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
