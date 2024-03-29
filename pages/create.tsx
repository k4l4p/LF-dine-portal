import CalendarButton from "@/components/Calendar/CalendarButton"
import DropDown from "@/components/DropDown/DropDown"
import useNFT from "@/hooks/useNFT"
import MainLayout from "@/layout/MainLayout"
import { Switch } from "@headlessui/react"
import Image from "next/image"
import React, { ReactElement, useEffect, useState } from "react"

interface MetaDataFormProp {
	date: Date
	setDate: React.Dispatch<React.SetStateAction<Date>>
	unit: {
		id: number
		name: string
	}
	setUnit: React.Dispatch<
		React.SetStateAction<{
			id: number
			name: string
		}>
	>
	listingDate: {
		id: number
		name: string
	}
	setListingDate: React.Dispatch<
		React.SetStateAction<{
			id: number
			name: string
		}>
	>
	name: string
	setName: React.Dispatch<React.SetStateAction<string>>
	description: string
	setDescription: React.Dispatch<React.SetStateAction<string>>
	creator: string
	setCreator: React.Dispatch<React.SetStateAction<string>>
}

const unitList = [
	{
		id: 0,
		name: "XTZ",
	},
	{
		id: 1,
		name: "USDT",
	},
]

const expirationList = [
	{
		id: 0,
		name: "No Expiration",
	},
	{
		id: 1,
		name: "1 day",
	},
	{
		id: 2,
		name: "7 days",
	},
	{
		id: 3,
		name: "1 month",
	},
	{
		id: 4,
		name: "3 months",
	},
	{
		id: 5,
		name: "Custom",
	},
]

const ImageUpload = ({
	img,
	setImg,
}: {
	img: File | null
	setImg: React.Dispatch<React.SetStateAction<File | null>>
}) => {
	const handleFile = (file: File | undefined) => {
		if (!file) return
		setImg(file)
	}

	const upload = () => {
		let input = document.createElement("input")
		input.type = "file"
		input.onchange = (e) => {
			var file = (e.target as HTMLInputElement)?.files?.[0]
			handleFile(file)
		}
		input.click()
	}

	const loadFile = () => {
		if (img === null) {
			return (
				<>
					<h6 className="text-sm font-bold tracking-[0.04em] text-black/50">
						Drag and drop your file here
					</h6>
					<button
						onClick={upload}
						className="flex items-center justify-center rounded-[60px] bg-[#242425] py-[18px] px-10 text-sm font-bold tracking-[0.04em] text-white"
					>
						Choose file
					</button>
				</>
			)
		}
		const url = URL.createObjectURL(img)
		return (
			<div className="relative p-4 flex flex-col items-center w-full h-full gap-10">
				<div 
        onClick={upload}
        className="w-[300px] h-[300px] cursor-pointer">
					<Image
						className="object-contain w-full h-full"
						src={url}
						alt="file-preview"
						width={300}
						height={300}
					/>
				</div>
				<div className="flex flex-col w-[300px] opacity-70 text-sm">
					<h6 className="truncate">File Name: {img.name}</h6>
					<h6>File Size: {img.size}</h6>
				</div>
			</div>
		)
	}

	return (
		<section
			onDragOver={(event) => {
				event.preventDefault()
				event.currentTarget.classList.add("opacity-20")
			}}
			onDragExit={(event) => {
				event.preventDefault()
				event.currentTarget.classList.remove("opacity-20")
			}}
			onDrop={(event) => {
				event.preventDefault()
				event.currentTarget.classList.remove("opacity-20")
				if (event.dataTransfer.files) {
					handleFile(event.dataTransfer.files[0])
				}
				handleFile((event.target as HTMLInputElement)?.files?.[0])
			}}
			className="flex flex-col gap-4 transition-opacity"
		>
			<div className="flex h-[400px] w-[400px] flex-col items-center justify-center gap-5 rounded-2xl bg-[#EEEEF0]">
				{loadFile()}
			</div>
		</section>
	)
}

const MetaDataForm = ({
	date,
	setDate,
	listingDate,
	setListingDate,
	setUnit,
	unit,
	creator,
	description,
	name,
	setCreator,
	setDescription,
	setName,
}: MetaDataFormProp) => {
	return (
		<div className="flex w-[457px] flex-col gap-6">
			<input
				name="name"
				type={"text"}
				placeholder="Name"
				value={name}
				onChange={(e) => {
					setName(e.target.value)
				}}
				className="rounded-2xl border border-[#E1E1E1] bg-white p-4 text-sm font-bold leading-[18px] placeholder:text-[#878787] focus:outline-none"
			/>
			<input
				name="name"
				type={"text"}
				placeholder="Description (Optional)"
				value={description}
				onChange={(e) => {
					setDescription(e.target.value)
				}}
				className="rounded-2xl border border-[#E1E1E1] bg-white p-4 text-sm font-bold leading-[18px] placeholder:text-[#878787] focus:outline-none"
			/>
			<input
				name="name"
				type={"text"}
				placeholder="Creator Name"
				value={creator}
				onChange={(e) => {
					setCreator(e.target.value)
				}}
				className="rounded-2xl border border-[#E1E1E1] bg-white p-4 text-sm font-bold leading-[18px] placeholder:text-[#878787] focus:outline-none"
			/>
			<div className="pointer-events-none opacity-50 relative w-full">
				<h6 className="absolute top-[7.5px] left-[16px] text-[10px] font-bold leading-[13px]">
					Amount
				</h6>
				<input
					name="amount"
					placeholder="1"
					className="w-full rounded-2xl border border-[#E1E1E1] bg-white px-4 pt-[24.5px] pb-[7.5px] text-[14px] font-bold leading-[18px]"
				/>
			</div>
			<div className="pointer-events-none opacity-50 relative w-full">
				<h6 className="absolute top-[7.5px] left-[16px] bg-white text-[10px] font-bold leading-[13px]">
					Price
				</h6>
				<input
					name="price"
					placeholder="1"
					className="w-full rounded-2xl border border-[#E1E1E1] bg-white px-4 pt-[24.5px] pb-[7.5px] text-[14px] font-bold leading-[18px]"
				/>
				<div className="absolute inset-y-0 right-2 top-0">
					<DropDown item={unit} setItem={setUnit} list={unitList} />
				</div>
			</div>
			<div className="pointer-events-none opacity-50 relative w-full">
				<h6 className="absolute top-[7.5px] left-[16px] text-[10px] font-bold leading-[13px]">
					Date of listing expiration
				</h6>

				{listingDate.id !== 5 ? (
					<div className="w-full rounded-2xl border border-[#E1E1E1] bg-white px-4 pt-[24.5px] pb-[7.5px] text-[14px] font-bold leading-[18px]">
						{listingDate.name}
					</div>
				) : (
					<input
						name="dateOfExpiration"
						placeholder="1"
						className="w-full rounded-2xl border border-[#E1E1E1] bg-white px-4 pt-[24.5px] pb-[7.5px] text-[14px] font-bold leading-[18px]"
					/>
				)}

				<div className="absolute inset-y-0 right-2 top-0">
					<DropDown
						item={listingDate}
						setItem={setListingDate}
						list={expirationList}
					/>
				</div>
			</div>
			<CalendarButton date={date} setDate={setDate} />
		</div>
	)
}

const UtilityForm = () => {
	const [enabled, setEnabled] = useState(false)
	const [utilType, setUtilType] = useState<"standard" | "custom">("standard")
	return (
		<div className="flex flex-col gap-[34px] pointer-events-none opacity-50">
			<div className="flex flex-col items-start gap-5">
				<h2 className="text-xl font-bold tracking-[0.04em]">Utility of NFT</h2>
				<div className="flex rounded-[30px] bg-[#EEEEEE] py-1 px-[6px]">
					<button
						onClick={() => setUtilType("standard")}
						className={
							"rounded-[30px] py-[10px] px-5 text-[14px] font-bold tracking-[0.04em] " +
							(utilType === "standard"
								? "bg-black text-white"
								: "bg-transparent text-[#8A8787]")
						}
					>
						Standard
					</button>
					<button
						onClick={() => setUtilType("custom")}
						className={
							"rounded-[30px] py-[10px] px-5 text-[14px] font-bold tracking-[0.04em] " +
							(utilType === "custom"
								? "bg-black text-white"
								: "bg-transparent text-[#8A8787]")
						}
					>
						Custom
					</button>
				</div>
			</div>
			{/* optional section */}
			{utilType === "standard" ? (
				<div className="flex flex-col gap-6">
					<div className="flex items-center">
						<Switch
							checked={enabled}
							onChange={setEnabled}
							className={`${
								enabled ? "bg-[#3D00B7]" : "bg-[#E1E1E1]"
							} relative mr-[23px] inline-flex h-[31px] w-[51px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
						>
							<span className="sr-only">Use setting</span>
							<span
								aria-hidden="true"
								className={`${enabled ? "translate-x-5" : "translate-x-0"}
pointer-events-none inline-block h-[27px] w-[27px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
							/>
						</Switch>
						<h6 className="mr-3 text-[14px] font-bold leading-[18px]">
							Discount for in store purchases
						</h6>
						<div className="relative w-24">
							<input className="w-full rounded-2xl border border-[#E1E1E1] bg-white p-4 pr-8 text-sm font-bold leading-[18px] focus:outline-none" />
							<h6 className="absolute inset-y-4 right-4 align-middle">%</h6>
						</div>
					</div>
					<div className="flex items-center">
						<Switch
							checked={enabled}
							onChange={setEnabled}
							className={`${
								enabled ? "bg-[#3D00B7]" : "bg-[#E1E1E1]"
							} relative mr-[23px] inline-flex h-[31px] w-[51px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
						>
							<span className="sr-only">Use setting</span>
							<span
								aria-hidden="true"
								className={`${enabled ? "translate-x-5" : "translate-x-0"}
pointer-events-none inline-block h-[27px] w-[27px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
							/>
						</Switch>
						<h6 className="mr-3 text-[14px] font-bold leading-[18px]">Buy</h6>
						<div className="relative mr-3 w-24">
							<input className="w-full rounded-2xl border border-[#E1E1E1] bg-white p-4 pr-8 text-sm font-bold leading-[18px] focus:outline-none" />
						</div>
						<h6 className="text-[14px] font-bold leading-[18px]">get 1 free</h6>
					</div>
				</div>
			) : (
				<textarea
					placeholder="Utility description"
					className="h-[100px] rounded-2xl border border-[#E1E1E1] bg-white p-4 focus:outline-none"
				></textarea>
			)}
		</div>
	)
}
const CreateNFT = () => {
	const { mint, upload } = useNFT()
	const [img, setImg] = useState<File | null>(null)
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [creator, setCreator] = useState("")
	const [date, setDate] = useState(new Date())
	const [unit, setUnit] = useState(unitList[0])
	const [listingDate, setListingDate] = useState(expirationList[0])

	const metaDataProp: MetaDataFormProp = {
		date,
		listingDate,
		setDate,
		setListingDate,
		setUnit,
		unit,
		creator,
		description,
		name,
		setCreator,
		setDescription,
		setName,
	}
	return (
		<div className="mx-auto flex max-w-7xl flex-col gap-16 pt-24 pb-40">
			<h2 className="font-rale text-[34px] font-black uppercase leading-[40px]">
				Create new nft
			</h2>
			<div className="flex flex-col gap-4">
				<h4 className="text-xl font-bold tracking-[0.04em]">Upload file</h4>
				<div className="flex gap-8">
					<ImageUpload {...{ img, setImg }} />
					<section className="flex flex-col gap-[50px]">
						<MetaDataForm {...metaDataProp} />
						<UtilityForm />
						<div>
							<button
								onClick={async () => {
									if (!img) return
									const res = await upload(name, description, creator, img)
									if (!res || !res.status) return
									mint(res.msg.metadataHash).catch(console.log)
								}}
								className="rounded-[60px] bg-[#3D00B7] py-[18px] px-10 text-sm font-bold leading-[18px] text-white"
							>
								Create item
							</button>
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}

CreateNFT.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>
}

export default CreateNFT
