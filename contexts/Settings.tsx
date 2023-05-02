import { NetworkType } from '@airgap/beacon-sdk'
import constate from 'constate'
import { useState } from 'react'

export const [
  SettingsProvider,
  useAppName,
  useEndpoint,
  useNetwork,
  useContractAddress,
] = constate(
  () => {
    const [settings] = useState({
      app_name: 'My DApp',
      endpoint: 'https://ghostnet.ecadinfra.com',
      network: NetworkType.GHOSTNET,
      contract: 'KT1CqdBTV2TFkimnXVLJP26TBR65ULM8dLt2',
    })
    return settings
  },
  (v) => v.app_name,
  (v) => v.endpoint,
  (v) => v.network,
  (v) => v.contract
)
