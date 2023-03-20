import React from 'react'
import { StatusButton } from './WalletConnection'

const Header = () => {
  return (
    <header className="mx-auto w-full bg-white py-6 px-10 text-black">
      <div className="mx-auto flex w-full max-w-7xl justify-between">
        <img src="logo.svg" alt="logo" width={107} height={29} />
        <StatusButton />
      </div>
    </header>
  )
}

export default Header
