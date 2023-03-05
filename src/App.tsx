import React, { useContext, useEffect, useState } from 'react'
import CreateNFT from './components/CreateNFT'
import Header from './components/Header'
import MintSuccess from './components/MintSuccess'
import {
  ConnectCtx,
  ConnectModal,
  ConnectPage,
  ConnectRoot,
} from './components/WalletConnection'

function App() {
  const connectCtx = useContext(ConnectCtx)
  const [stage, setStage] = useState<'connect' | 'create' | 'success'>(
    'connect'
  )

  const setMintSuccess = () => {
    setStage('success')
  }
  useEffect(() => {
    if (connectCtx.isConnected) {
      setStage('create')
    }
    console.log(connectCtx.isConnected)
  }, [connectCtx.isConnected])

  return (
    <>
      <main className="font-dm-sans">
        <Header />
        {stage === 'connect' && <ConnectPage />}
        {stage === 'create' && <CreateNFT proceed={setMintSuccess} />}
        {stage === 'success' && <MintSuccess />}
      </main>
      <ConnectModal />
    </>
  )
}

export default App
