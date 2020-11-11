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
    const [userId, setUserId] = useState('');
    //must depend on user Id // rooms that belong to user should be fetched
    // useEffect(() => {
    //     axios.get('chat/rooms/').then(res => {
    //             setRooms(res.data);
    //     });
    // }, []);

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        console.log(token);
        const checkAuth = async () => {
            const userRes = await axios.post("http://localhost:5000/general/tokenIsValid",null, {
                headers: { "x-auth-token": token },
            });
            setUserId(userRes.data.result._id);
            console.log(userId);
        }
        

        checkAuth();
    }, []);

    useEffect(() => {
        if(userId){
            axios.get(`chat/rooms/user/${userId}`).then(res => {
                setRooms(res.data);
            });
        }
    }, [userId]);


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
                    <SidebarChat key={room._id} id = {room._id} name = {room.members[1].user_name} />
                 ))}
            </div>
        </div>
    )
}

export default Sidebar
