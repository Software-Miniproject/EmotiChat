import logo from './logo.svg';
import { google_signin } from "./firebase";
import './App.css';

function App() {
  return (
    <div className="App">
      <button onClick={google_signin} type="button" class="login-with-google-btn" >
        Sign in with Google
      </button>
    </div>
  );
}

export default App;
