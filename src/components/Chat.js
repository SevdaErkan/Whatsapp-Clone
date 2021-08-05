import { Avatar, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import "./chat.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MicIcon from "@material-ui/icons/Mic";
import axios from "../axios";
import { AttachFile, InsertEmoticon, SearchOutlined } from "@material-ui/icons";

const Chat = ({ messages }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/messages/new", {
      message: input,
      name: "Demo App",
      timestamp: "now",
      received: false,
    });
    setInput("")
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => {
          return (
            <p
              className={`chat__message ${
                message.received ? "chat__reciever" : ""
              }`}
              key={message._id}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">{message.timestamp}</span>
            </p>
          );
        })}

        {/* <p className="chat__message chat__reciever">
          <span className="chat__name">Sevda</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p> */}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
