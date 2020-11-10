import React, {useEffect, useState} from 'react';
import "./Sidebar.css";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import {Avatar, IconButton} from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import axios from './axios';

function Sidebar() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        axios.get('chat/rooms/').then(res => {
                setRooms(res.data);
        });
    }, []);


    return (
        <div className="sidebar">
            <div className="sidebar__search">
                <div className ="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search for the new chats" type="text"/>
                </div>
            </div>
       
            <div className="sidebar__chats">
                {rooms.map((room) => (
                    <SidebarChat key={room._id} id = {room._id} name = {room.members[1]} />
                 ))}
            </div>
        </div>
    )
}

export default Sidebar
