import { ConnectRoot } from '@/components/WalletConnection'
import { BeaconProvider } from '@/contexts/Beacon'
import { SettingsProvider } from '@/contexts/Settings'
import { TaquitoProvider } from '@/contexts/Taquito'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NoSSR from 'react-no-ssr'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NoSSR>
        
        <SettingsProvider>
          <TaquitoProvider>
            <BeaconProvider>
            <ConnectRoot>
              <Component {...pageProps} />
              </ConnectRoot>
            </BeaconProvider>
          </TaquitoProvider>
        </SettingsProvider>
        
      </NoSSR>
    </>
  )
}
