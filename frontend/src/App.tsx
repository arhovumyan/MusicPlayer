import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from './components/ui/button';

const App = () => {
  return (
  <>
    <header>
      <SignedOut>
          <SignInButton>
            <Button>Sign in</Button>
          </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  </>
  )
}

export default App
