import React from "react";

export const StatusButton = () => {
  return (
    <button className="flex items-center justify-center gap-[10px] rounded-[60px] border border-gray-300 py-3 px-5">
      <div className="h-3 w-3 rounded-full bg-[#00B98C]" />
      <h4 className="text-xs font-bold leading-[19px] text-[#00B98C] ">
        Connected
      </h4>
      <h4 className="text-xs font-bold leading-[19px] text-black ">
        0x1499CB...{" "}
      </h4>
    </button>
  );
};

export const ConnectPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 pt-[135px] pb-[215px]">
      <h1 className="text-[34px] font-black uppercase leading-[40px] font-rale">
        NFT Launchpad
      </h1>
      <img alt="front" src="icons/front.svg" width={200} height={200} />
      <button className="rounded-[60px] bg-[#3D00B7] px-[40px] py-[18px] text-sm font-bold tracking-[0.04em] text-white">
        Connect your wallet
      </button>
    </div>
  );
};
