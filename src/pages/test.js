import React, { useState } from "react";
import NavBar from "../components/Navbar";
import SendMsg from "../components/SendMsg";
import CreateChatroom from "../components/CreateChatroom";

const Test = () => {

    const [selectedChatroom, setChatroom] = useState('');
    const handleSelectChatroom = (chatroom) => {
        setChatroom(chatroom);
    }

    return (
        <div className="App">
            <NavBar/>
            <CreateChatroom setChatroom={handleSelectChatroom}/>
            <SendMsg chat_id={selectedChatroom}/>
        </div>
    )
}
export default Test;