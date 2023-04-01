import { MichelsonMap } from '@taquito/taquito'
import { char2Bytes } from '@taquito/utils'
import { useWalletAddress } from '@/contexts/Beacon'
import { useContract } from '@/contexts/Contract'

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
		payload.append('image', img)
		payload.append('title', title)
		payload.append('description', description)
		payload.append('creator', creator)

		try {
			const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + 'upload', {
				method: 'POST',
				body: payload
			})
			const data = res.json()
			return data
		} catch (err) {
			console.log(err)
		}
	}

  const mint = async () => {
    // const metadata = {
    //   name: 'test',
    //   amount: 1
    // }
    const metaMap = new MichelsonMap({
      prim: 'map',
      args: [{ prim: 'string' }, { prim: 'bytes' }],
    })

    metaMap.set('name', char2Bytes('test'))
    metaMap.set('amount', char2Bytes('1'))

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
