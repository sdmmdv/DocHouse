import React, {useState} from 'react';
import "./Chat.css";
import { Avatar, IconButton } from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import InsertEmotionIcon from '@material-ui/icons/InsertEmoticon';
import SelectInput from '@material-ui/core/Select/SelectInput';
import axios from './axios';

function Chat({ messages }) {
    
    const [input, setInput] = useState('');

    const sendMessage = async (e) => {
        //prevent page reload
        e.preventDefault();

        await axios.post("/messages/new", {
            message: input,
            author: "Sadi",
            timestamp: new Date().toUTCString(),
            received: true,
        });

        setInput("");
    }


    return (
        <div className="chat">
             <div className = "chat__header">
                 <Avatar />
                 <div className="chat__headerInfo">
                        <h3>Room name</h3>
                        <p>Last seen at...</p>
                 </div>

                 <div className="chat__headerRight">
                        <IconButton>
                            <SearchOutlined/>
                        </IconButton>
                        <IconButton>
                            <AttachFile/>
                        </IconButton>
                        <IconButton>
                            <MoreVert/>
                        </IconButton>
                 </div>
             </div>

             <div className="chat__body">
                 {messages.map((message) => (
                    <p key={message._id} className={`chat__message ${message.received && "chat__receiver"}`}>
                    <span className="chat__name">{message.author}</span>
                        {message.message}
                    <span className="chat__timestamp">
                        {message.timestamp}
                    </span>
                    </p> 
                 ))}
             </div>


             <div className="chat__footer">
                <InsertEmotionIcon/>
                <form>
                    <input 
                     placeholder="Type a mesage"
                     type="text"
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     />
                    <button type="submit" onClick={sendMessage}> Send a message </button>
                </form>
             </div>

        </div>
    )
}

export default Chat
