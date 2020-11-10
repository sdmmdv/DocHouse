import React, {useEffect, useState} from 'react'
import "./App.css";
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from "pusher-js";
import axios from './axios';
import Navbar from './components/Navbar';
import {Router,withRouter, Switch, Route } from 'react-router-dom';
import { useParams, useLocation} from 'react-router-dom';
import {history} from './components/Main';
// import { createBrowserHistory } from "history";

// export const history = createBrowserHistory();

function ChatApp() {

    const [messages, setMessages] = useState([]);
    // const [rooms, setRooms] = useState([]);
    // const {roomId} = props.match.params.roomId;
    const { roomId } = useParams();

    useEffect(() => {
        axios.get('chat/messages/').then(res => {
                setMessages(res.data)
        });
        console.log(roomId);
    }, []);

    // useEffect(() => {
    //     const pusher = new Pusher('efd0c2d67fea5dc4f0fd', {
    //       cluster: 'eu'
    //     });
    
    //     const channel = pusher.subscribe('rooms');
    //     channel.bind('updated', (newMessage) => {
    //       alert(JSON.stringify(newMessage));
    //       setMessages([...messages, newMessage])
    //     });
  
    //     return () => {
    //         channel.unbind_all();
    //         channel.unsubscribe();
    //     };
  
    //   }, [messages]);

    // useEffect(() => {
    //     axios.get('chat/rooms/').then(res => {
    //             setRooms(res.data)
    //     });
    // }, []);

    // useEffect(() => {
    //   const pusher = new Pusher('efd0c2d67fea5dc4f0fd', {
    //     cluster: 'eu'
    //   });
  
    //   const channel = pusher.subscribe('rooms');
    //   channel.bind('updated', (newMessage) => {
    //     alert(JSON.stringify(newMessage));
    //     setMessages([...messages, newMessage])
    //   });

    //   return () => {
    //       channel.unbind_all();
    //       channel.unsubscribe();
    //   };

    // }, [messages]);

    return (
        <div> 
            <Navbar />
            <div className="app"> 
                <div className="app__body">
                    <Sidebar/>
                    <Chat/>
                </div>
            </div>
        </div>
    )
}

export default ChatApp
