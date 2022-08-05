
import { useAccount, useContract, useSigner ,useNetwork} from 'wagmi'
import {  useToast } from '@chakra-ui/react';
import { Connect } from './Connect';
import { useState, useEffect } from 'react';
const mainAbi = require("../abis/main.json")
import 'animate.css';

export function Mint() {

    const [selected, setSelected] = useState(null);
    const { data: signer } = useSigner()
    const {isConnected } = useAccount()
    const [minting, setMinting] = useState(false)
  const [mint, setMint] = useState(false)
  const [mintAmount, setMintAmount] = useState(1)
  const [totalsupply, setTotalSupply] = useState(0)
  const { chain } = useNetwork()

    const toast = useToast()
    const contractMainAddr = "0xCF0Bf342AC1DA3C3307B85B6CB5B78D8Da384E40"


    const mainContract = useContract({
        addressOrName: contractMainAddr,
        contractInterface: mainAbi,
        signerOrProvider: signer
    })


  const initMinter = async () => {

    let totalWei = String(600000000000000000  * mintAmount);
      
    let minter = await mainContract.mint(mintAmount, { value: totalWei, gasLimit: 1000000 })
    setMinting(true)

          minter.wait().then((data: any) => {
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

  const calculateTotal =  () => {
      mainContract.totalSupply().then((data: any) => {
      console.log("data", data)
      setTotalSupply(999 - data.toNumber())
    }).catch((error: any) => {
      console.log("error", error)
    })
  }
  
    useEffect(() => {
      calculateTotal();
  })
    
  

  return (
    <div className="px-8 py-16 mx-auto text-[#EC6F35] sm:px-32 bg font min-h-screen">
      <div>  
        <h1 className="mb-4 text-3xl font-bold text-center uppercase font animate__animated animate__bounce">Mint NFT</h1>
    
        <p className="text-center font">Mint a Crypto Qutie! O.6 BNB Price to Mint!</p>
        <p className="text-center font">{totalsupply} Exclusive Crypto Quties Left to Mint!</p>
        <div className="flex items-center justify-center m-4 animate__rubberBand">
          <img src="2022.gif" alt="" className="w-1/4 rounded-2xl" />
        </div>
        <div className="flex justify-center p-2 m-2 ">
          <div className="flex flex-row items-center align-middle ">    <button className="flex items-center justify-center w-10 h-10 mr-2 text-2xl text-white align-middle bg-[#EC6F35] border-2 border-white rounded-full " onClick={() => {
            setMintAmount(mintAmount - 1)
          }} disabled={mintAmount <= 1}><h1 className="text-center">-</h1></button> <h1 className="mx-2 text-2xl text-center text-white">{mintAmount}</h1> <button className="flex items-center justify-center w-10 h-10 ml-2 text-2xl text-white align-middle bg-[#EC6F35] border-2 border-white rounded-full" onClick={() => {
            setMintAmount(mintAmount + 1)
          }}><h1 className="text-center">+</h1></button></div>
        </div>
        {minting && <h1 className="mx-2 text-lg text-center text-white">Minting...</h1>}
        <div className="flex justify-center p-2 m-2 ">

          {
            isConnected ? (<><button className="px-16 py-4 mr-2 bg-[#39B7FF] pixel-btn text-white" onClick={() => initMinter()} disabled={chain?.id !== 56} ><h1 className="uppercase">Mint NFT </h1> </button>  </>) :
              <Connect />
          }
        </div>
       
        {chain?.id === 56 ? <h1 className='py-2 text-center'>Connected to BSC</h1> : <h1 className='py-2 text-center text-red-500'>Please Connect to BSC</h1> }


        <a href="https://bscscan.com/address/0xCF0Bf342AC1DA3C3307B85B6CB5B78D8Da384E40" target="_blank" className="text-center">
          <p className="text-center underline">View on BSCScan</p>
        </a></div>
          </div>
    )
}
