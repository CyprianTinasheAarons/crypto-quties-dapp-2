import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Menu, MenuItem, MenuButton, MenuList } from "@chakra-ui/react"
import { useIsMounted } from '../hooks'

export function Connect() {
  const isMounted = useIsMounted()
  const { connector, isConnected , address} = useAccount()
  const { connect, connectors } =
    useConnect()
  const { disconnect } = useDisconnect()

  return (
    
      <Menu >   
              
        {
          isConnected ? (
            <MenuButton className="px-16 py-4 mr-2 bg-[#39B7FF] rounded-2xl text-white ">
          
              {/* truncate address */}
              {
                address !== undefined ? 
                <span className="inline-block ml-2 uppercase">
                {address.substring(0, 8)} ...
                {address.substring(address.length - 4, address.length)}
                  </span>
                  :
                  null
              }

            </MenuButton>
          ) : (
            <MenuButton className="px-16 py-4 mr-2 uppercase bg-[#39B7FF] rounded-2xl text-white">
            Connect Wallet
          </MenuButton>)
            }
   
              <MenuList>
         
        {connectors
          .filter((x) => isMounted && x.ready && x.id !== connector?.id)
          .map((x) => (
            <MenuItem key={x.id} onClick={() => connect({ connector: x })} >
             <h1  className="text-black uppercase " > {x.name}</h1>
           
            </MenuItem>
          ))}
        {isConnected ? 
          <MenuItem onClick={() => disconnect()} >
            <h1 className="text-black uppercase " >
            Disconnect
              </h1>
          </MenuItem> : null
        
          }
              </MenuList>
      </Menu>
  
        
    
  )
}
