import React from 'react';
import "../../styles/SidebarChat.css";
import {Avatar} from '@material-ui/core';
import { Link } from 'react-router-dom';


function SidebarChat({id, name}) {
    return (
    <Link to={`/chat/rooms/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <div className="sidebarChat">
                <Avatar />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                </div>   
       </div>
    </Link>
    );
}

export default SidebarChat
