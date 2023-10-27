import './App.css';
import SignIn from './components/SignIn';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase"
import Chat from "./components/Chat"

function App() {
  const [user, setUser] = useAuthState(auth);

  return (
    <div>
      {user ? <Chat></Chat> : <SignIn></SignIn>}
    </div>
  );
}

export default App;
