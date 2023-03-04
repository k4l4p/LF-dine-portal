import { Switch } from "@headlessui/react";
import React, { useState } from "react";

const ImageUpload = () => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex h-[400px] w-[400px] flex-col items-center justify-center gap-5 rounded-2xl bg-[#EEEEF0]">
        <h6 className="text-sm font-bold tracking-[0.04em] text-black/50">
          Drag and drop your file here
        </h6>
        <button className="flex items-center justify-center rounded-[60px] bg-[#242425] py-[18px] px-10 text-sm font-bold tracking-[0.04em] text-white">
          Choose file
        </button>
      </div>
    </section>
  );
};

const MetaDataForm = () => {
  return (
    <div className="flex w-[457px] flex-col gap-6">
      <input
        name="name"
        type={"text"}
        placeholder="Name"
        className="rounded-2xl border border-[#E1E1E1] bg-white p-4 text-sm font-bold leading-[18px] placeholder:text-[#878787] focus:outline-none"
      />
      <input
        name="name"
        type={"text"}
        placeholder="Description (Optional)"
        className="rounded-2xl border border-[#E1E1E1] bg-white p-4 text-sm font-bold leading-[18px] placeholder:text-[#878787] focus:outline-none"
      />
      <div className="relative w-full">
        <h6 className="absolute top-[7.5px] left-[16px] text-[10px] font-bold leading-[13px]">
          Amount
        </h6>
        <input
          name="amount"
          placeholder="1"
          className="w-full rounded-2xl border border-[#E1E1E1] px-4 pt-[24.5px] pb-[7.5px] text-[14px] font-bold leading-[18px]"
        />
      </div>
      <div className="relative w-full">
        <h6 className="absolute top-[7.5px] left-[16px] text-[10px] font-bold leading-[13px]">
          Price
        </h6>
        <input
          name="price"
          placeholder="1"
          className="w-full rounded-2xl border border-[#E1E1E1] px-4 pt-[24.5px] pb-[7.5px] text-[14px] font-bold leading-[18px]"
        />
      </div>
      <div className="relative w-full">
        <h6 className="absolute top-[7.5px] left-[16px] text-[10px] font-bold leading-[13px]">
          Date of listing expiration
        </h6>
        <input
          name="dateOfExpiration"
          placeholder="1"
          className="w-full rounded-2xl border border-[#E1E1E1] px-4 pt-[24.5px] pb-[7.5px] text-[14px] font-bold leading-[18px]"
        />
      </div>
      <div className="rounded-2xl border border-[#E1E1E1] bg-white p-4 text-sm font-bold leading-[18px]">
        test
      </div>
    </div>
  );
};

const UtilityForm = () => {
  const [enabled, setEnabled] = useState(false);
  const [utilType, setUtilType] = useState<"standard" | "custom">("standard");
  return (
    <div className="flex flex-col gap-[34px]">
      <div className="flex flex-col items-start gap-5">
        <h2 className="text-xl font-bold tracking-[0.04em]">Utility of NFT</h2>
        <div className="flex rounded-[30px] bg-[#EEEEEE] py-1 px-[6px]">
          <button
            onClick={() => setUtilType("standard")}
            className={
              "rounded-[30px] py-[10px] px-5 text-[14px] font-bold tracking-[0.04em] " +
              (utilType === "standard"
                ? "bg-black text-white"
                : "bg-transparent text-[#8A8787]")
            }
          >
            Standard
          </button>
          <button
            onClick={() => setUtilType("custom")}
            className={
              "rounded-[30px] py-[10px] px-5 text-[14px] font-bold tracking-[0.04em] " +
              (utilType === "custom"
                ? "bg-black text-white"
                : "bg-transparent text-[#8A8787]")
            }
          >
            Custom
          </button>
        </div>
      </div>
      {/* optional section */}
      {
        utilType === 'standard'
        ? <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-[#3D00B7]" : "bg-[#E1E1E1]"
            } relative mr-[23px] inline-flex h-[31px] w-[51px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${enabled ? "translate-x-5" : "translate-x-0"}
pointer-events-none inline-block h-[27px] w-[27px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
          <h6 className="mr-3 text-[14px] font-bold leading-[18px]">
            Discount for in store purchases
          </h6>
          <div className="relative w-24">
            <input className="w-full rounded-2xl border border-[#E1E1E1] bg-white p-4 pr-8 text-sm font-bold leading-[18px] focus:outline-none" />
            <h6 className="absolute inset-y-4 right-4 align-middle">%</h6>
          </div>
        </div>
        <div className="flex items-center">
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-[#3D00B7]" : "bg-[#E1E1E1]"
            } relative mr-[23px] inline-flex h-[31px] w-[51px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${enabled ? "translate-x-5" : "translate-x-0"}
pointer-events-none inline-block h-[27px] w-[27px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
          <h6 className="mr-3 text-[14px] font-bold leading-[18px]">Buy</h6>
          <div className="relative mr-3 w-24">
            <input className="w-full rounded-2xl border border-[#E1E1E1] bg-white p-4 pr-8 text-sm font-bold leading-[18px] focus:outline-none" />
          </div>
          <h6 className="text-[14px] font-bold leading-[18px]">get 1 free</h6>
        </div>
      </div>
      : <textarea placeholder="Utility description" className="border border-[#E1E1E1] rounded-2xl h-[100px] p-4 focus:outline-none"></textarea>
      }
      
    </div>
  );
};
const CreateNFT = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-16 pt-24 pb-40">
      <h2 className="text-[34px] font-black uppercase leading-[40px] font-rale">
        Create new nft
      </h2>
      <div className="flex flex-col gap-4">
        <h4 className="text-xl font-bold tracking-[0.04em]">Upload file</h4>
        <div className="flex gap-8">
          <ImageUpload />
          <section className="flex flex-col gap-[50px]">
            <MetaDataForm />
            <UtilityForm />
            <div>
              <button className="rounded-[60px] bg-[#3D00B7] py-[18px] px-10 text-sm font-bold leading-[18px] text-white">
                Create item
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
