import { TezosToolkit } from '@taquito/taquito'
import { useState } from 'react'
import { RemoteSigner } from '@taquito/remote-signer' 
import { InMemorySigner } from "@taquito/signer"
import constate from 'constate'
import { useEndpoint } from './Settings'

export const [TaquitoProvider, useTezosToolkit] = constate(
  () => {
    const endpoint = useEndpoint()
    const ttk = new TezosToolkit(endpoint)
    const signer = new InMemorySigner('edskRsD6Ai7i6EENixxCRUXuHBYNzLdrVEeZeTafqa6oNoPuyPCyWkgcagRdWBmhHDi4BUdL4fq6NTanHBtyaVk6gbSFiKCCVA')
    ttk.setSignerProvider(signer)
    const [taquito] = useState((): { ttk: TezosToolkit } => ({
      ttk,
    }))
    return taquito
  },
  (v) => v.ttk
)
