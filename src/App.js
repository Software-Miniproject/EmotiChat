import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import login from "./pages/login";
import search from "./pages/search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/login" Component={login}/>
        <Route exact path="/search" Component={search}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
