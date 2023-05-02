import { MichelsonMap } from '@taquito/taquito'
import { char2Bytes } from '@taquito/utils'
import { useWalletAddress } from '@/contexts/Beacon'
import { useContract } from '@/contexts/Contract'
import { useContext } from 'react'
import { ModalCtx } from '@/contexts/Modal'
import Link from 'next/link'

interface IResponseSuccess {
  status: true
  msg: {
    imageHash: string
    metadataHash: string
  }
}

interface IResponseError {
  status: false
  msg: string
}

type TResponse = IResponseSuccess | IResponseError

const useNFT = () => {
  const contract = useContract()
  const address = useWalletAddress()
  const modalCtx = useContext(ModalCtx)

  const upload = async (
    title: string,
    description: string,
    creator: string,
    img: File
  ) => {
    modalCtx.setMessage('Uploading data')
    modalCtx.toggleOpen()
    const payload = new FormData()
    const data = JSON.stringify({
      title,
      description,
      creator,
    })
    payload.append('image', img)
    payload.append('data', data)

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/mint', {
        method: 'POST',
        body: payload,
      })
      if (!res.ok) throw new Error('Cannot connect to server')
      const data: TResponse = (await res.json()) as TResponse
      return data
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      modalCtx.setStatus('error')
      modalCtx.setMessage(
        <div className="flex flex-col gap-3">
          <h3>Error</h3>
          <p className="text-sm opacity-70">{msg}</p>
        </div>
      )
    }
  }

  const mint = async (metadataHash: string) => {
    const metaMap = new MichelsonMap({
      prim: 'map',
      args: [{ prim: 'string' }, { prim: 'bytes' }],
    })

    metaMap.set('', char2Bytes('ipfs://' + metadataHash))
    metaMap.set('usage', char2Bytes('0'))

    modalCtx.setMessage('Minting')

    try {
      const ret = await (await contract).methods
        .mint(address ?? '', metaMap)
        .send()
      const hash = await ret.confirmation(3)
      modalCtx.setStatus('success')
      modalCtx.setMessage(
        <div className="flex flex-col gap-3">
          <h3>Success</h3>
          <Link
            className="text-sm opacity-70 underline"
            target="_blank"
            rel="noopener"
            href={`https://ghostnet.tzkt.io/${address}/balances/nft`}
          >
            Your NFT Collection
          </Link>
        </div>
      )
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      modalCtx.setStatus('error')
      modalCtx.setMessage(
        <div className="flex flex-col gap-3">
          <h3>Error</h3>
          <p className="text-sm opacity-70">{msg}</p>
        </div>
      )
    }
  }

  return { mint, upload }
}

export default useNFT
