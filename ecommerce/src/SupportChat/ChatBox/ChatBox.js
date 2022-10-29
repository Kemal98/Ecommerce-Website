import React, { useRef } from 'react'
import Button from "react-bootstrap/Button";
// import {io} from "socket.io-client";
import socketIOClient from "socket.io-client";
import "./chatBox.css"
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { ToastContainer, toast } from 'react-toastify';
import { auth, fs } from '../../Config/Config';
import {useState, useEffect} from 'react';

// const socket = io.connection()
const ENDPOINT = window.location.host.indexOf("localhost")>= 0 
? "http://127.0.0.1:4000" : window.location.host;

// Ako je lokalkni host, hostuj se na 4000 u suprotonm hostuj se na proizvodni server npr: netfly,hircle i td...


const ChatBox = () => {
    function GetUserId () {
        const[uid, setUid] = useState(null)
        useEffect(() => {
          auth.onAuthStateChanged(user => {
            if(user) {
              setUid(user.uid)
            }
          })
        }, [])
        return uid
      };    

    const uuid = GetUserId()
      const GetCurrentUser = () => {
        const [user,setUser] = useState(null)
        
         useEffect(()=> {
          auth.onAuthStateChanged(user => {
            if(user) {
             fs.collection('users').doc(user.uid).get().then(snapshot => {
              setUser(snapshot.data().fullName);
             }) 
            }
            else {
              setUser(null)
              console.log(user)
            }
          })
        }, [])
        return user;
      };
    const user = GetCurrentUser();
    // const uiMessagesRef = useRef(null);

    const [userName, setUserName] = useState("");
    const [messages, setMessages] = useState([
      { from: "System", body: "Hello there, Please ask your question." },
    ]);
  
    const [socket, setSocket] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [messageBody, setMessageBody] = useState("");
  
    useEffect(() => {
      // if (uiMessagesRef.current) {
      //   uiMessagesRef.current.scrollBy({
      //     top: uiMessagesRef.current.scrollHeight,
      //     left: 0,
      //     behavior: "smooth",
      //   });
      // }
      if (socket) {
        socket.emit("onLogin", { name: userName });
        socket.on("message", (data) => {
          setMessages([...messages, data]);
        });
      }
    }, [messages, socket, userName]);
  
    const supportHandler = () => {
      setIsOpen(true);
      if (!userName) {
        setUserName(user)
      }
      const sk = socketIOClient(ENDPOINT);
      setSocket(sk);
      console.log(user)
    };
    const closeHandler = () => {
      setIsOpen(false);
    };
  
    const submitHandler = (e) => {
      e.preventDefault();
      if (!messageBody.trim()) {
        alert("Error. Please type message.");
      } else {
        setMessages([
          ...messages,
          { body: messageBody, from: userName, to: "Admin" },
        ]);
        setTimeout(() => {
          socket.emit("onMessage", {
            body: messageBody,
            from: userName,
            to: "Admin",
          });
        }, 1000);
        setMessageBody("");
      }
    };


  return (
    <div className='messagePosition'>

    <div className='chatbox'>

    {!isOpen ? (
        <Button onClick={supportHandler} variant="primary">
          Chat with us
        </Button>
      ) : (
     <div className="card_">
        <div className="bodyCard_">
                  <h1 className="card__title">Support Chat</h1>
                  <div className="text-end">
                <Button
                  className="btn-sm btn-secondary"
                  type="button"
                  onClick={closeHandler}
                >
                  x
                </Button>
              </div>
                {/* <Col className="text-end">
                <Button className="btn-sm btn-secondary" type='button' onClick={closeHandler}> x </Button>
                </Col> */}
           
            <hr/>
             <ListGroup>
              {
              messages.map((msg, index) => (
              <ListGroup.Item key={index}>
                <span className="fromBody">
                <strong>{`${msg.from}`}:</strong> {msg.body}
                </span>
              </ListGroup.Item>))
              }
            </ListGroup>
              <form onSubmit={submitHandler}>
                <div className="input-group">
                    <FormControl value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    type="text"
                    placeholder="type message">
                    </FormControl>
                    <button className='btnChat' type="submit" variant="primary">
                     Send
                   </button>
                </div>
              </form>
        </div>
     </div>
      )}
    </div>
    </div>
  )
}

export default ChatBox