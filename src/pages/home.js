import React, { useState } from "react";
import SendMsg from "../components/Messages";
import DisplayChatrooms from "../components/DisplayChatrooms";

const Home = () => {

    const [selectedChatroom, setChatroom] = useState('');
    const handleSelectChatroom = (chatroom) => {
        setChatroom(chatroom);
    }

    return (
        <div className="App">
            <DisplayChatrooms setChatroom={handleSelectChatroom}/>
            <SendMsg chat_id={selectedChatroom}/>
        </div>
    )
}
export default Home;