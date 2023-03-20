import {
  useConnect,
  useDisconnect,
  useIsConnected,
  useWalletAddress,
} from '@/contexts/Beacon'
import { Dialog, Transition } from '@headlessui/react'
import React, { createContext, Fragment, useContext, useState } from 'react'

interface IConnectCtx {
  isOpen: boolean
  toggleIsOpen: () => void
  connect: () => Promise<void>
}

export const ConnectCtx = createContext<IConnectCtx>({} as IConnectCtx)

//connect demo
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const ConnectRoot = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const connectWallet = useConnect()
  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }
  const connect = async () => {
    try {
      setIsOpen(true)
      await connectWallet()
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <ConnectCtx.Provider value={{ isOpen, toggleIsOpen, connect }}>
      {children}
    </ConnectCtx.Provider>
  )
}

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

export const ConnectModal = () => {
  const connectCtx = useContext(ConnectCtx)
  return (
    <Transition show={connectCtx.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={connectCtx.toggleIsOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-12 px-9 text-center align-middle font-dm-sans shadow-xl transition-all">
                <div className="flex w-full flex-col items-center gap-9">
                  <img
                    alt="loading"
                    src="loading.svg"
                    height={100}
                    width={100}
                  />
                  <h4 className="text-2xl font-bold leading-5">
                    Connecting to your wallet
                  </h4>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export const ConnectPage = () => {
  const connectCtx = useContext(ConnectCtx)
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10 pt-[135px] pb-[215px]">
        <h1 className="font-rale text-[34px] font-black uppercase leading-[40px]">
          NFT Launchpad
        </h1>
        <img alt="front" src="icons/front.svg" width={200} height={200} />
        <button
          onClick={connectCtx.connect}
          className="rounded-[60px] bg-[#3D00B7] px-[40px] py-[18px] text-sm font-bold tracking-[0.04em] text-white"
        >
          Connect your wallet
        </button>
      </div>
    </>
  )
}
