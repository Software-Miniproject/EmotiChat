import React, { useState } from "react";
import NavBar from "../components/Navbar";
import SendMsg from "../components/Messages";
import DisplayChatrooms from "../components/DisplayChatrooms";

const Test = () => {

    const [selectedChatroom, setChatroom] = useState('');
    const handleSelectChatroom = (chatroom) => {
        setChatroom(chatroom);
    }

    return (
        <div className="App">
            <NavBar/>
            <DisplayChatrooms setChatroom={handleSelectChatroom}/>
            <SendMsg chat_id={selectedChatroom}/>
        </div>
    )
}
export default Test;