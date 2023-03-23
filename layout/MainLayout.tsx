import Header from '@/components/Header'
import { useIsConnected } from '@/contexts/Beacon'
import { useRouter } from 'next/router'
import React from 'react'

const MainLayout = ({ children }: { children: React.ReactElement }) => {
  const isConnected = useIsConnected()
  const router = useRouter()

  if (!isConnected()) {
    router.push('/')
  }
  return (
    <main className="font-dm-sans">
      <Header />
      {children}
    </main>
  )
}

export default MainLayout
