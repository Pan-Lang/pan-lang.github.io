import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import Landing from './Landing';
import User from './User';

/**
 * Landing page
 */
function Home() {
  const [user] = useAuthState(auth);

  if (!Boolean(user)) {
    // If the user is not logged in, return landing page
    return <Landing />;
  } else {
    // If user is logged in, return user's home page
    return <User />;
  }
}

export default Home;
