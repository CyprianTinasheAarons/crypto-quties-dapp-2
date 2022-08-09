import * as React from 'react'

import { Home,Footer, Nav } from '../components'

function Page() {
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
      <Home/>
      <Footer/>
      </div>

  )
}

export default Page
