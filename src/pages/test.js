import React from "react";
import NavBar from "../components/Navbar";
import SendMsg from "../components/SendMsg";

const test = () => {

    return (
        <div className="App">
            <NavBar/>
            <SendMsg chat_id={"1"}/>
        </div>
    )
}
export default test;