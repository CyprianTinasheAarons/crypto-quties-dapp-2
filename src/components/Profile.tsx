import { useState, useEffect } from 'react'
import {useAccount, useContract ,useSigner} from 'wagmi'

import 'animate.css';
import axios from 'axios';
let Contract = require("web3-eth-contract");
let abi = require("./abi.json");

// set provider for all later instances to use
Contract.setProvider("https://bsc-dataseed1.binance.org");

let contract = new Contract(abi, "0xCF0Bf342AC1DA3C3307B85B6CB5B78D8Da384E40");

export function Profile() {

    const { address } = useAccount()
   
  const [nftData, setNftData] = useState([]);
  const [images,setImagesData] = useState([]);



  const getData = async () => {

    await contract.methods.walletOfOwner(address).call()
      .then((result: any) => {

        setNftData(result);
  
      })
  }

  // read get json data from nftdata
  const readData = async () => {

  nftData.forEach((item: any) => {
   axios.get(`https://cq-cid-art.herokuapp.com/image/${item}.json`).then((res: any) => {
     console.log(res.data)
      let array:any = []
     array.push(res.data)
     console.log(array)
      setImagesData(array)
     
      }).catch(
        (error: any) => {
          console.log(error)
        }
    )
    }
    )
  }

 
  useEffect(() => {
    getData();
    readData()
    console.log(nftData)
  },[]);

    return (
      <div className="px-8 py-16 mx-auto sm:px-32 bg  text-[#EC6F35] min-h-screen ">
        <h1 className="mb-4 text-3xl font-bold text-center uppercase font animate__animated animate__bounce">My NFTs</h1>
        {
          images.length > 0 ? (
            <div className="flex flex-col py-16 m-auto p-auto ">

              <div
                className="flex pb-10 overflow-x-scroll hide-scroll-bar"
              >
                <div
                  className="flex flex-nowrap "
                >

                  {images.map((item, index) => {
                    return (
                      <div className="inline-block p-2 px-3 py-8 bg-[#B9D7ED] rounded-xl border-4 border-black  animate__animated animate__bounceInLeft" key={index}>
                        <div
                          className="w-64 h-64 max-w-xs overflow-hidden transition-shadow duration-300 ease-in-out shadow-md rounded-2xl hover:shadow-xl"
                        >
                          <a>
                            <img src={`${item}`} alt="" className="w-full h-full" />
                          </a>
                        </div>
                        <div className="flex justify-between pt-4 mx-2">
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