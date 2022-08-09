import * as React from 'react'

import { FAQ,Footer, Nav } from '../components'

function faqs() {
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
      <FAQ/>
      <Footer/>
      </div>

  )
}

export default faqs