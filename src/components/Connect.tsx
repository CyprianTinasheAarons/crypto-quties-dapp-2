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
            <MenuButton className="sm:px-16 sm:py-4 px-4 py-2 mr-2 bg-[#39B7FF]  text-white pixel pixel-btn">
          
              {/* truncate address */}
              {
                address &&
                <p className="inline-block ml-2 text-xs uppercase sm:text-md">
                {address.substring(0, 8)} ...
                {address.substring(address.length - 4, address.length)}
                  </p> 
              }

            </MenuButton>
          ) : (
            <MenuButton className="sm:px-16 sm:py-4 px-4 py-2 mr-2 bg-[#39B7FF]  text-white pixel pixel-btn">
              <p className="text-xs">Connect Wallet</p>
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
