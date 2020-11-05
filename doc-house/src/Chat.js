import React from 'react'
import "./Chat.css";
import { Avatar, IconButton } from '@material-ui/core';
import MoreVert from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import InsertEmotionIcon from '@material-ui/icons/InsertEmoticon';
import SelectInput from '@material-ui/core/Select/SelectInput';

function Chat() {
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
                       <p className="chat__message">
                           <span className="chat__name">Sadi</span>
                           This is a message
                          <span className="chat__timestamp">
                               {new Date().toUTCString()}
                          </span>
                        </p> 

                       <p className="chat__message chat__receiver">
                           <span className="chat__name">Sadi</span>
                           This is a message
                          <span className="chat__timestamp">
                               {new Date().toUTCString()}
                          </span>
                        </p> 

                       <p className="chat__message">
                           <span className="chat__name">Sadi</span>
                           This is a message
                          <span className="chat__timestamp">
                               {new Date().toUTCString()}
                          </span>
                        </p> 


                       <p className="chat__message chat__receiver">
                           <span className="chat__name">Sadi</span>
                           This is a message
                          <span className="chat__timestamp">
                               {new Date().toUTCString()}
                          </span>
                        </p> 

                        <p className="chat__message">
                           <span className="chat__name">Sadi</span>
                           This is a message
                          <span className="chat__timestamp">
                               {new Date().toUTCString()}
                          </span>
                        </p> 
             </div>


             <div className="chat__footer">
                <InsertEmotionIcon/>
                <form>
                    <input
                    // value={input}
                    // onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a mesage"
                    type="text"
                    />
                    <button type="submit">
                        Send a message
                    </button>
                </form>
             </div>

        </div>
    )
}

export default Chat
