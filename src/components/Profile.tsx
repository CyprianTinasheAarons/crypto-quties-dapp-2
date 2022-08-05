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
      <div className="px-8 py-16 mx-auto sm:px-32 bg  text-[#EC6F35] min-h-screen ">
        <h1 className="mb-4 text-3xl font-bold text-center uppercase font">My NFTs</h1>
        {
          nftData.length > 0 ? (
            <div className="flex flex-col py-16 m-auto p-auto ">

              <div
                className="flex pb-10 overflow-x-scroll hide-scroll-bar"
              >
                <div
                  className="flex flex-nowrap "
                >

                  {nftData.map((item, index) => {
                    return (
                      <div className="inline-block p-2 px-3 py-8 bg-[#B9D7ED] rounded-xl border-4 border-black " key={index}>
                        <div
                          className="w-64 h-64 max-w-xs overflow-hidden transition-shadow duration-300 ease-in-out shadow-md rounded-2xl hover:shadow-xl"
                        >
                          <a>
                            <img src={`https://gateway.pinata.cloud/ipfs/QmdJmuH8oEJoBbyyjUdsafYQH8xoLLvAeUvgZ1Ece1Jh6d/${item}.jpg`} alt="" className="w-full h-full" />
                          </a>
                        </div>
                        <div className="flex justify-between mx-2">
                          <h1 className="text-2xl italic text-black">#</h1>
                          <h1 className="text-2xl text-black font">{parseInt(item)}</h1>
                        </div>
                      </div>
                      
                    )
                  })}
                </div>
              </div>
            </div>) : (
              <div className="flex flex-col py-16 m-auto p-auto ">
                 <h1 className="text-2xl text-center ">No NFTs Found</h1>
                </div>
            )
        }

            </div>    
    )
}