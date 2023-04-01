import { BeaconProvider } from '@/contexts/Beacon'
import { ContractProvider } from '@/contexts/Contract'
import { ModalPopup, ModalProvider } from '@/contexts/Modal'
import { SettingsProvider } from '@/contexts/Settings'
import { TaquitoProvider } from '@/contexts/Taquito'
import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import NoSSR from 'react-no-ssr'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <>
      <NoSSR>
        <ModalProvider>
          <SettingsProvider>
            <TaquitoProvider>
              <BeaconProvider>
                <ContractProvider>
                  {getLayout(<Component {...pageProps} />)}
                </ContractProvider>
              </BeaconProvider>
            </TaquitoProvider>
          </SettingsProvider>
        </ModalProvider>
      </NoSSR>
    </>
  )
}
