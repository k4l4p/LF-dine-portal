import {
  useConnect,
  useDisconnect,
  useIsConnected,
  useWalletAddress,
} from '@/contexts/Beacon'
import { Dialog, Transition } from '@headlessui/react'
import React, { createContext, Fragment, useContext, useState } from 'react'

export const StatusButton = () => {
  const isConnected = useIsConnected()
  const disconnect = useDisconnect()
  const name = useWalletAddress()
  return (
    isConnected() && (
      <button
        onClick={() => {
          disconnect().catch(console.log)
        }}
        className="flex items-center justify-center gap-[10px] rounded-[60px] border border-gray-300 py-3 px-5 w-full max-w-[210px] hover:max-w-[450px] transition-[max-width]"
      >
        <div className="h-3 w-3 rounded-full bg-[#00B98C] shrink-0" />
        <h4 className="text-xs font-bold leading-[19px] text-[#00B98C] ">
          Connected
        </h4>
        <h4 className="text-xs font-bold leading-[19px] text-black truncate">
          {name}
        </h4>
      </button>
    )
  )
}

export const ConnectPage = () => {
  const connect = useConnect()
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10 pt-[135px] pb-[215px]">
        <h1 className="font-rale text-[34px] font-black uppercase leading-[40px]">
          NFT Launchpad
        </h1>
        <img alt="front" src="icons/front.svg" width={200} height={200} />
        <button
          onClick={connect}
          className="rounded-[60px] bg-[#3D00B7] px-[40px] py-[18px] text-sm font-bold tracking-[0.04em] text-white"
        >
          Connect your wallet
        </button>
      </div>
    </>
  )
}
