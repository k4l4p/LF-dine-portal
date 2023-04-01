import Header from '@/components/Header'
import { useIsConnected } from '@/contexts/Beacon'
import { ModalPopup } from '@/contexts/Modal'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const MainLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <main className="font-dm-sans">
      <Header />
      {children}
      <ModalPopup />
    </main>
  )
}

export default MainLayout
