import * as React from 'react'
import "../styles/global.css"
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

import {
  WagmiConfig,
  configureChains,
  createClient,
  defaultChains,
} from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ alchemyId }),
])

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      
      <NextHead>
        <title>Crypto Quties | Binance NFTs </title>
        <link rel="shortcut icon" href="favicon.ico" />

                <link
                  rel="preload"
                  href="/handbag.ttf"
                  as="font"
                  type="font/woff"
                  crossOrigin=""
                />
                <link
                  rel="preload"
                  href="/pixel.ttf"
                  as="font"
                  type="font/woff"
                  crossOrigin=""
                />

      </NextHead>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </WagmiConfig>
  )
}

export default App
