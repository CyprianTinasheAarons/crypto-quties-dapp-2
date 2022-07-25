
import { useAccount, useContract, useSigner} from 'wagmi'
import {  useToast } from '@chakra-ui/react';
import { Connect } from './Connect';
import { useState, useEffect } from 'react';
const mainAbi = require("../abis/main.json")

export function Mint() {

    const [selected, setSelected] = useState(null);
    const { data: signer } = useSigner()
    const {isConnected } = useAccount()
    const [minting, setMinting] = useState(false)
  const [mint, setMint] = useState(false)
  const [mintAmount, setMintAmount] = useState(1)
  const [totalsupply, setTotalSupply] = useState(0)

    const toast = useToast()
    const contractMainAddr = "0xCF0Bf342AC1DA3C3307B85B6CB5B78D8Da384E40"


    const mainContract = useContract({
        addressOrName: contractMainAddr,
        contractInterface: mainAbi,
        signerOrProvider: signer
    })


  const initMinter = async () => {

    let totalWei = String(600000000000000000  * mintAmount);
      
    let mint = await mainContract.mint(mintAmount, { value: totalWei, gasLimit: 1000000 })
    setMinting(true)

          mint.wait().then((data: any) => {
            console.log("data", data)
            toast({
              title: "Success",
              description: "NFT Minted",
              status: "success",
              duration: 9000,
              isClosable: true
            })
            setMinting(false)
 
            setSelected(null)
            setMint(true)
          }).catch((error:any) => {
            toast({
              title: "Error",
              description: error.message,
              status: "error",
              duration: 9000,
              isClosable: true
            })
            setMinting(false)
          })
        
  }

  const calculateTotal = async () => {
     await mainContract.totalSupply().then((data: any) => {
      console.log("data", data)
      setTotalSupply(999 - data.toNumber())
    }).catch((error: any) => {
      console.log("error", error)
    })
  }
  
    useEffect(() => {
      calculateTotal();
  }, [])
    
  

  return (
    <div className="container px-8 py-16 mx-auto sm:px-32 ">
      <h1 className="mb-4 text-3xl font-bold text-center uppercase">Mint NFT</h1>
      <p className="text-center">Mint a Crypto Qutie! O.6 BNB Price to Mint!</p>
      <p className="text-center">{totalsupply} Exclusive Crypto Quties Left to Mint!</p>
      <div className="flex items-center justify-center">
      <img src="2022.gif" alt="" className="w-1/3 rounded-2xl"/>
        </div>
      <div className="flex justify-center p-2 m-2 ">
    <div className="flex flex-row items-center align-middle ">    <button className="flex items-center px-8 py-2 mr-2 text-2xl text-black align-middle"  onClick={() => {
      setMintAmount(mintAmount - 1)
    }} disabled={mintAmount === 0}>-</button> <h1 className="mx-2 text-2xl text-center text-black">{mintAmount}</h1> <button className="flex items-center px-8 py-2 mr-2 text-2xl text-black align-middle"  onClick={() => {
      setMintAmount(mintAmount + 1)
    }}>+</button></div>
      </div>
      {minting && <h1 className="mx-2 text-lg text-center text-black">Minting...</h1>}
      <div className="flex justify-center p-2 m-2 ">
  
                     {
                       isConnected ? (<><button className="px-16 py-4 mr-2 bg-[#39B7FF] rounded-2xl text-white" onClick={() => initMinter()} ><h1 className="uppercase ">Mint </h1> </button>  </>) :
                       <Connect/>
                     }
      </div>
      
      <a href="https://bscscan.com/address/0xCF0Bf342AC1DA3C3307B85B6CB5B78D8Da384E40" target="_blank" className="text-center">
     <p className="text-center underline">View on BSCScan</p>
      </a>
          </div>
    )
}
