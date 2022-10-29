import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom"
import NavBar from '../../NavBar/NavBar'
import ChatBox from '../ChatBox/ChatBox'
// import {io} from "socket.io-client";
import logo from "./logo5.png"
import socketIOClient from "socket.io-client";
import Container from 'react-bootstrap/Container';
import Nav from "react-bootstrap/Nav"
import Navbar from 'react-bootstrap/Navbar';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { TbLayoutNavbar } from 'react-icons/tb';
import './admin.css';

// const socket = io.connect();

const ENDPOINT = window.location.host.indexOf("localhost")>= 0 
? "http://127.0.0.1:4000" : window.location.host;

const AdminPage = () => {

  const [selectedUser, setSelectedUser] = useState({});
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);



//  Socket on messages 
  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        if (selectedUser.name === data.from) {
          setMessages([...messages, data]);
        } 
        else {
          const existUser = users.find((user) => user.name === data.from);
          if (existUser) {
            setUsers(
              users.map((user) =>
                user.name === existUser.name ? { ...user, unread: true } : user
              )
            ); 
          }
        }
      }); 
    //Update users 
      socket.on("updateUser", (updatedUser) => {
       const existUser = users.find((user) => user.name === updatedUser.name);
      //  console.log(existUser)
      if(existUser) {
        setUsers(
          users.map(( user) => user.name === existUser ? updatedUser : user)
        )
      }
        else {
          setUsers([...users, updatedUser]);
        }
      });

      // List users
      socket.on("listUsers", (updatedUsers) => {
        setUsers(updatedUsers);
      });

      socket.on("selectUser", (user) => {
        setMessages(user.messages);
      });
    }
    else {
      const sk = socketIOClient(ENDPOINT);
      setSocket(sk);
      sk.emit("onLogin", {
        name: "Admin",
      });
    }
  }, [messages, selectedUser, socket, users])
  
// Select users
  const selectUser = (user) => {
  setSelectedUser(user) 
  const existUser = users.find((x) => x.name === user.name)
  if(existUser) {
  setUsers(
      users.map((x) => x.name === existUser ? {...x, unread:false} : x)
    )
  }
  socket.emit("onUserSelected", user)
  }

// Submit handler 
// Emit messages 
  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Error. Please type message.");
    } else {
      setMessages([
        ...messages,
        { body: messageBody, from: "Admin", to: selectedUser.name },
      ]);

      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          from: "Admin",
          to: selectedUser.name,
        });
      }, 1000);
      setMessageBody("");
    }
  };
  return (
    <>
   <div className="chatSupportBody">
      <nav>
        <div className="nav_admin">
          <div className="img_logo_">
          <img src={logo}/>
          </div>
         <h2>Admin Support Chat</h2>
         <span><Link to="/">HOME</Link></span>
        </div>
      </nav>
      <div className='adminSupport'>
        <div className='listUsers'>
          <h3>LIST USERS</h3>
          {users.filter((x) => x.name !== "Admin" && x.name !== "").length === 0 && (
          <Alert variant="info">No User Found</Alert>
          )}

          {users
            .filter((x) => x.name !== "Admin" && x.name !== "")
            .map((user) => (
              <div
                className="listGroupe"
                id= {user.name === selectedUser.name ? "info" : ""}
                action
                key={user.name}
                // variant={user.name === selectedUser.name ? "info" : ""}
                onClick={() => selectUser(user)}>
                   <Badge 
                   bg={
                     selectedUser.name === user.name
                     ? user.online 
                     ?"primary":
                     "secondary" 
                     : user.unread ? 
                     "danger"
                     : user.online ?
                     "primary"
                     :"secondary" 
                   }>
                    {
                      selectedUser.name === user.name ? 
                       user.online
                      ? "Online"
                      : "Offline"
                    : user.unread
                    ? "New"
                    : user.online
                    ? "Online"
                    : "Offline"}
                   </Badge>
                   {user.name}
              </div>
            ))}
       </div>
       <div className="chatUsers">
           <h4>CHAT USERS</h4>
           {!selectedUser.name ? (
            <Alert variant='info'>Select a user to start chat</Alert>
           ): (
         
             <div className="listChat_">
            <h5>Chat with {selectedUser.name}</h5>
              {messages.length === 0 && (
                <p>No message</p>
              )}
              {
                messages.map((msg, index) => (
                  <div className='listChat' key={index}>
                    <strong>{`${msg.from} : `}</strong>{msg.body}
                  </div>
                ))}
            </div>
           )}
            <div className='chatHandler'>
                <form onSubmit={submitHandler}>
                  <div className='btn_input'>
                    <input
                     className='chatInput'
                      value={messageBody}
                      onChange={(e) => setMessageBody(e.target.value)}
                      type="text"
                      placeholder="type message"
                    />
                    <button className='btnChat' type="submit" variant="primary">
                      Send
                    </button>
                  </div>
                </form>
              </div>
       </div>
       <div className="supportLive">
    
          <h3>Admin Support Live <span className='liveLap'></span></h3>
        
       </div>
    </div>
   </div>
    </>
  )
}

export default AdminPage