import * as React from 'react'

import { About, Footer, Nav } from '../components'

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
            <Nav />
            <About />
            <Footer />
        </div>

    )
}

export default faqs