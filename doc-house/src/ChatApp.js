import React, {useEffect, useState} from 'react'
import "./App.css";
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from "pusher-js";
import axios from './axios';

function ChatApp() {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get('/messages/').then(res => {
                setMessages(res.data)
        });
    }, []);

    useEffect(() => {
      const pusher = new Pusher('efd0c2d67fea5dc4f0fd', {
        cluster: 'eu'
      });
  
      const channel = pusher.subscribe('messages');
      channel.bind('inserted', (newMessage) => {
        setMessages([...messages, newMessage])
      });

      return () => {
          channel.unbind_all();
          channel.unsubscribe();
      };

    }, [messages]);

    return (
        <div className="app">
            <div className="app__body">
                <Sidebar />
                <Chat messages={messages}/>
            </div>
        </div>
    )
}

export default ChatApp
