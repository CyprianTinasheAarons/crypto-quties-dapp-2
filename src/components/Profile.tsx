import { useState, useEffect } from 'react'
import {useAccount, useContract ,useSigner} from 'wagmi'
const mainAbi = require("../abis/main.json")

export function Profile() {

    const { address } = useAccount()
    const { data: signer } = useSigner()
    const [nftData, setNftData] = useState([]);

    const contractMainAddr = "0xCF0Bf342AC1DA3C3307B85B6CB5B78D8Da384E40"
  
    const mainContract = useContract({
        addressOrName: contractMainAddr,
        contractInterface: mainAbi,
        signerOrProvider: signer
    })

    const getData = async () => {
      console.log("getData")
      await mainContract.walletOfOwner(address)
          .then((result: any) => {
            console.log(result)
          setNftData(result);
          }).catch((err: any) => {
            console.log(err)
          })

    };
 
  useEffect(() => {
    getData();
  });

    return (
      <div className="px-8 py-16 mx-auto sm:px-32 bg font text-[#EC6F35] min-h-screen ">
        <h1 className="mb-4 text-3xl font-bold text-center uppercase">My NFTs</h1>

<div className="flex flex-col py-16 m-auto p-auto ">

      <div
        className="flex pb-10 overflow-x-scroll hide-scroll-bar"
      >
        <div
          className="flex flex-nowrap "
                    >
            
                        {nftData.map((item, index) => {
                            return (
                                <div className="inline-block px-3 " key={index}>
                                    <div
                                        className="w-64 h-64 max-w-xs overflow-hidden transition-shadow duration-300 ease-in-out border-4 border-black shadow-md rounded-2xl hover:shadow-xl"
                                    >
                                  <a>
                                  <img src={`https://gateway.pinata.cloud/ipfs/QmdJmuH8oEJoBbyyjUdsafYQH8xoLLvAeUvgZ1Ece1Jh6d/${item}.jpg`} alt="" className="w-full h-full" />    
                          </a>
                                </div>
                                <div className="flex justify-between mx-2">
                                    <h1 className="text-2xl text-black">#</h1>
                                    <h1 className="text-2xl text-black">{parseInt(item)}</h1>
                                  </div>
                                </div>
                            )
                        })}               
        </div>
      </div>
            </div>
            </div>    
    )
}