import React, {useState, useEffect, useContext} from 'react';
import "../../styles/Chat.css";
import { Avatar} from '@material-ui/core';
import InsertEmotionIcon from '@material-ui/icons/InsertEmoticon';
import axios from '../../axios';
import Pusher from "pusher-js";
import { useParams } from 'react-router-dom';
import UserContext from '../../context/userContext';

function Chat() {
    
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const {user} = useContext(UserContext);
    const author = user.first_name + ' ' + user.last_name;
   // a ? b : (c ? d : e)
    useEffect(() => {
       if(roomId){
            axios.get(`chat/rooms/${roomId}`).then(res => {
                // console.log(res.data);
                setRoomName(user.type === 'user' ? res.data.members[1].user_name : 
                     (user.type === 'doctor' ? res.data.members[0].user_name : '')
                );
                setMessages(res.data.messages);
            })
        }
    }, [roomId,user.type]);

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
            author: author,
            author_id: user._id,
            timestamp: new Date().toUTCString(),
            room_id: roomId
        });

        setInput("");
    }


    return (
        <div className="chat">
             <div className = "chat__header">
                 <Avatar className = "chat__avatar"/>
                 <div className="chat__headerInfo">
                        <h3>{roomName}</h3>
                 </div>
             </div>

             <div className="chat__body">
                 {messages.map((message) => (
                    <p key={message._id} className={`chat__message ${message.author_id !== user._id && "chat__receiver"}`}>
                        {message.message}
                    <span key={message._id} className="chat__timestamp">
                        {(new Date(message.timestamp)).toLocaleString()}
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
