import React from "react";
import "./sidebar.css";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
          <Avatar src="https://avatars.githubusercontent.com/u/51799297?v=4"/>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon/>
            </IconButton>
            <IconButton>
            <ChatIcon />
            </IconButton>
            <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
          <div className="sidebar__searchContainer">
              <SearchOutlined/>
              <input placeholder="Search or start new chat" type="text"/>

          </div>
      </div>
      <div className="sidebar__chats">
          <SidebarChat/>
          <SidebarChat/>
          <SidebarChat/>
         
      </div>
    </div>
  );
};

export default Sidebar;
