import * as React from 'react'

import { Rarities, Footer, Nav } from '../components'

function quest() {
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
            <Rarities />
            <Footer />
        </div>

    )
}

export default quest