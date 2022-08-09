import * as React from 'react'

import { Profile,Footer, Nav } from '../components'

function ProfilePage() {
 
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
      <Profile/>
      <Footer/>
      </div>

  )
}

export default ProfilePage
