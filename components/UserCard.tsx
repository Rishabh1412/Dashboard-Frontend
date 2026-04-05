import React from "react";
import { MdWifi } from "react-icons/md";
import { safeNumber, safeText } from "./dashboardUtils";

type UserData = {
  name?: string;
  balance?: number;
  exp?: string;
  cvv?: string;
};

type UserCardProps = {
  userData?: UserData;
};

const UserCard = ({ userData }: UserCardProps) => {
  // Safe fallback to prevent app crashes if userData is missing
  const balance = safeNumber(userData?.balance);

  return (
    <div
      className="aspect-3/2 w-full flex flex-col justify-between p-5 rounded-3xl bg-[#0F3B36] shadow-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] cursor-default"
    >

      <div className="flex w-full items-center justify-between">

        <div className="grid grid-cols-2 gap-1" aria-label="Flow Logo">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-[#BCF963]"
            ></div>
          ))}
        </div>

        {/* Contactless Symbol */}
        <div
          className="flex items-center justify-center rotate-90 text-[#BCF963]"
          aria-label="Contactless Payment Enabled"
        >
          <MdWifi className="text-2xl" />
        </div>
      </div>

      {/* Middle Section: User Name */}
      <div className="flex flex-grow items-center pt-6">
        <div className="md:text-xl text-2xl font-extrabold tracking-tight text-white">
          {safeText(userData?.name, "Andrew Forbist")}
        </div>
      </div>

      {/* Bottom Section: Balance and Card Details */}
      <div className="flex w-full items-end justify-between gap-4 md:pt-4 pt-0">
        
        {/* Balance Section */}
        <div className="flex flex-1 flex-col">
          <p className="text-xxs font-semibold uppercase tracking-widest text-white/70">
            Balance Amount
          </p>
          <h4 className="text-2xl font-bold tracking-tight text-white">
            ₹{balance.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </h4>
        </div>

        {/* Details: EXP and CVV */}
        <div className="flex items-center gap-5 pb-1">
          <div className="flex flex-col">
            <p className="text-xxs font-semibold uppercase tracking-widest text-white/70">
              EXP
            </p>
            <p className="text-xs font-bold text-white/90">
              {safeText(userData?.exp, "11/29")}
            </p>
          </div>
          
          <div className="flex flex-col">
            <p className="text-xxs font-semibold uppercase tracking-widest text-white/70">
              CVV
            </p>
            <p className="text-xs font-bold text-white/90">
              {safeText(userData?.cvv, "323")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
