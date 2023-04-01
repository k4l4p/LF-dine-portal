import Header from '@/components/Header'
import { useIsConnected } from '@/contexts/Beacon'
import { ModalPopup } from '@/contexts/Modal'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const MainLayout = ({ children }: { children: React.ReactElement }) => {
  const isConnected = useIsConnected()
  const router = useRouter()

  useEffect(()=> {
    if (!isConnected()) {
      router.push('/')
    }
  }, [])
  return (
    <main className="font-dm-sans">
      <Header />
      {children}
      <ModalPopup />
    </main>
  )
}

export default MainLayout
