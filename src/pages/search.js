import React from "react";
import { google_signin } from "../firebase";
import NavBar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

const search = () => {

    return (
        <div className="App">
            <NavBar/>
            <SearchBar/>
        </div>
            
    )
}
export default search;
