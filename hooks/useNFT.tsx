import { MichelsonMap } from "@taquito/taquito"
import { char2Bytes, hex2Bytes } from "@taquito/utils"
import { useWalletAddress } from "@/contexts/Beacon"
import { useContract } from "@/contexts/Contract"
import { useContext } from "react"
import { ModalCtx } from "@/contexts/Modal"
import Link from "next/link"

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

function later(delay: number, value: Error) {
	return new Promise((resolve) => setTimeout(resolve, delay, value))
}

const useNFT = () => {
	const contract = useContract()
	const address = useWalletAddress()
	const modalCtx = useContext(ModalCtx)
	const endpoint =
		process.env.NEXT_PUBLIC_API_ENDPOINT ?? "http://localhost:8080"

	const upload = async (
		title: string,
		description: string,
		creator: string,
		img: File
	) => {
		modalCtx.setStatus("loading")
		modalCtx.setMessage("Uploading data")
		modalCtx.toggleOpen()
		const payload = new FormData()
		const data = JSON.stringify({
			title,
			description,
			creator,
		})
		payload.append("image", img)
		payload.append("data", data)

		try {
			const res = await fetch(endpoint + "/mint", {
				method: "POST",
				body: payload,
			})
			if (!res.ok) throw new Error("Cannot connect to server")
			const data: TResponse = (await res.json()) as TResponse
			return data
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Something went wrong"
			modalCtx.setStatus("error")
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
			prim: "map",
			args: [{ prim: "string" }, { prim: "bytes" }],
		})

		metaMap.set("", char2Bytes("ipfs://" + metadataHash))
		metaMap.set("usage", "050000")

		modalCtx.setMessage("Minting")
		modalCtx.setStatus("loading")
		try {
			const ret = await (await contract).methods
				.mint(address ?? "", metaMap)
				.send()
			modalCtx.setStatus("success")
			modalCtx.setMessage(
				<div className="flex flex-col gap-3">
					<h3>Minted!</h3>
					<Link
						className="text-sm opacity-70 underline"
						target="_blank"
						rel="noopener"
						href={`https://ghostnet.tzkt.io/${ret.opHash}`}
					>
						Monitor the transaction here!
					</Link>
				</div>
			)
			const test = await Promise.race([
				later(30000, new Error("Timeout")),
				ret.confirmation(2),
			])

			if (test instanceof Error) {
				modalCtx.setMessage(
					<div className="flex flex-col gap-3">
						<h3>Cannot confirmed</h3>
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
			} else {
				modalCtx.setMessage(
					<div className="flex flex-col gap-3">
						<h3>Confirmed</h3>
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
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Something went wrong"
			modalCtx.setStatus("error")
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
