import { useHistory } from "react-router-dom";

import LeftSidebar from './Components/LeftSidebar'
import MainContent from './Components/MainContent'

import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

const frontendApi = "clerk.together.yak-5.lcl.dev"

function App() {

  const history = useHistory()

  return (
    <ClerkProvider frontendApi={frontendApi} navigate={(to) => history(to)}>
      <SignedIn>
      <div className="">
        <LeftSidebar
        />
        <MainContent
        />
      </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}

export default App;
