import React, {useState, useEffect} from 'react';
import "./Chat.css";
import { Avatar, IconButton } from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import InsertEmotionIcon from '@material-ui/icons/InsertEmoticon';
import SelectInput from '@material-ui/core/Select/SelectInput';
import axios from './axios';
import Pusher from "pusher-js";
import { useParams } from 'react-router-dom';

function Chat() {
    
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
       if(roomId){
            axios.get(`chat/rooms/${roomId}`).then(res => {
                // console.log(res.data);
                setRoomName(res.data.members[1]);
                setMessages(res.data.messages);
            })
        }
    }, [roomId]);

    useEffect(() => {
        const pusher = new Pusher('efd0c2d67fea5dc4f0fd', {
          cluster: 'eu'
        });
    
        const channel = pusher.subscribe('rooms');
        channel.bind('updated', (newMessage) => {
          setMessages([...messages, newMessage])
        });
  
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
  
      }, [messages]);

    const sendMessage = async (e) => {
        //prevent page reload
        e.preventDefault();

        await axios.post("chat/messages/new", {
            message: input,
            author: "Sadi",
            timestamp: new Date().toUTCString(),
            received: true,
            room_id: roomId
        });

        setInput("");
    }


    return (
        <div className="chat">
             <div className = "chat__header">
                 <Avatar />
                 <div className="chat__headerInfo">
                        <h3>{roomName}</h3>
                 </div>
             </div>

             <div className="chat__body">
                 {messages.map((message) => (
                    <p key={message._id} className={`chat__message ${message.received && "chat__receiver"}`}>
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
