import React, {useEffect, useState, useContext} from 'react';
import "./Sidebar.css";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import {Avatar, IconButton} from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import axios from './axios';
import UserContext from './context/userContext';

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if(user._id){
            axios.get(`chat/rooms/user/${user._id}`).then(res => {
                setRooms(res.data);
            });
        }
    }, [user]);


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
                    <SidebarChat key={room._id} id = {room._id} name = {user.type === 'user' ? room.members[1].user_name : 
                                                                        (user.type === 'doctor' ? room.members[0].user_name : '')} />
                 ))}
            </div>
        </div>
    )
}

export default Sidebar
