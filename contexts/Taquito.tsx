import { TezosToolkit, MichelCodecPacker } from '@taquito/taquito'
import { useState } from 'react'
import { RemoteSigner } from '@taquito/remote-signer' 
import { InMemorySigner } from "@taquito/signer"
import constate from 'constate'
import { useEndpoint } from './Settings'

export const [TaquitoProvider, useTezosToolkit] = constate(
  () => {
    const endpoint = useEndpoint()
    const ttk = new TezosToolkit(endpoint)
    ttk.setPackerProvider(new MichelCodecPacker())
    const [taquito] = useState((): { ttk: TezosToolkit } => ({
      ttk,
    }))
    return taquito
  },
  (v) => v.ttk
)
