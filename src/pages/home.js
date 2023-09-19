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
            <div className="home_container"> 
                <div>
                    <DisplayChatrooms setChatroom={handleSelectChatroom}/>
                </div>
                <div id="chatroom-display">
                    <div id="chatmessages">
                        <SendMsg chat_id={selectedChatroom}/>
                    </div>
                </div>
                
           
            </div>
            
        </div>
    )
}
export default Home;