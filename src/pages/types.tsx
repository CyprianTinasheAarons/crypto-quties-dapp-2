import * as React from 'react'


import { Types,Footer, Nav } from '../components'

function types() {
 const [hasMounted, setHasMounted] = React.useState(false);
    React.useEffect(() => {
      setHasMounted(true);
    }, []);
    if (!hasMounted) {
      return null;
    }
  return (

      <div>
    <Nav/>
      <Types/>
      <Footer/>
      </div>

  )
}

export default types