import { MichelsonMap } from '@taquito/taquito'
import { char2Bytes } from '@taquito/utils'
import { useWalletAddress } from '@/contexts/Beacon'
import { useContract } from '@/contexts/Contract'

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

  const upload = async (
    title: string,
    description: string,
    creator: string,
    img: File
  ) => {
		const payload = new FormData()
		const data = JSON.stringify({
			title,
			description,
			creator
		})
		payload.append('image', img)
		payload.append('data', data)


		try {
			const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/mint', {
				method: 'POST',
				body: payload,
			})
			const data: TResponse = (await res.json() as TResponse)
			return data
		} catch (err) {
			console.log(err)
		}
	}

  const mint = async (metadataHash: string) => {
    const metaMap = new MichelsonMap({
      prim: 'map',
      args: [{ prim: 'string' }, { prim: 'bytes' }],
    })

    metaMap.set('', char2Bytes('ipfs://' + metadataHash))

    const ret = await (await contract).methods
      .mint(address ?? '', metaMap)
      .send()
    console.log(ret)
    const hash = await ret.confirmation(3)
    console.log(hash)
  }

  return { mint, upload }
}

export default useNFT
