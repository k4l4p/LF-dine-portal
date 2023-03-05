import React from 'react'

const MintSuccess = () => {
  return (
    <div className="flex items-center justify-center py-32">
      {/* card */}
      <div className="flex max-w-lg flex-col items-center justify-center gap-[60px] rounded-2xl border border-[#f2f2f2]/50 bg-white p-[50px]">
        <div id="heading" className="flex flex-col items-center gap-[28.5px]">
          <img alt="suceess" src="icons/success.svg" height={60} width={60} />
          <h2 className="text-center font-rale text-[34px] font-black uppercase leading-10">
            YOUR NFT HAS SUCCESSFULLY MINTED!
          </h2>
        </div>
        <div id="details" className="flex flex-col gap-8">
          <img alt="demo" src="nft-01.png" height={400} width={400} />
          <div className="flex flex-col gap-3">
            <h4 className="text-2xl font-bold leading-[19px]">NFT Voucher</h4>
            <div className="flex">
              <div className="mr-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#E9F0FF]">
                <img src="icons/tezos.svg" alt="tezos" width={15} height={18} />
              </div>
              <h6 className="text-lg font-bold leading-6 text-[#0D61FF]">
                0.25 XTZ
              </h6>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-bold leading-6 text-[#878787]">
              Address
            </h4>
            <div className="flex gap-3">
              <h6 className="text-xl font-bold leading-5">
                0x1499CB1E1936364D8dB0CE272
              </h6>
              <span className="rounded-full bg-[#F5F5F5] px-2.5 py-1 font-bold leading-5 text-[#4B4B4B]">
                Copy
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MintSuccess
