import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import "./App.css";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "./axios"


function App() {
  const [messages,setMessages]=useState([])
  useEffect(() => {
   axios.get("/messages/sync")
   .then(response =>{
     setMessages(response.data)
   })
  }, [])

  useEffect(() => {
    const pusher = new Pusher("0f7956dbf309fcd6674d", {
      cluster: "eu",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage)=>{
      // alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage])
    });
    return()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);
  
  console.log(messages)

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
