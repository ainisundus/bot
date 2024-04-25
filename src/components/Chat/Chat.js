import React, { useState, useEffect, useRef } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import Header from '../Navigasi/Header'
import newt from '../../assets/1.jpg';
import './Chatbot.css';
import axios from 'axios'; // Import library Axios

const Chatbot = () => {

  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm VacayBot! Ask me anything!",
      sentTime: "just now",
      sender: "VacayBot"
    }
  ]);
  const messageListRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    // Panggil API FastAPI menggunakan Axios
    try {

      const response = await axios.post('https://chatbot-zj4zfvhwoa-et.a.run.app/chat', { message }); 
      const botResponse = response.data.response; // Mendapatkan respon dari data
      setMessages([...newMessages, { message: botResponse, direction: 'incoming', sender: 'VacayBot' }]);
      
      // Mengirimkan history ke database
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      const data = {
        id: id,
        question: message,
        answer: botResponse
      };
      const response_ = await fetch(`http://localhost:8080/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Mengirim token JWT di header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

        if (!response_.ok) {
        throw new Error("Failed to send data to API");
        }

      const responseData = await response_.json();
      console.log("Response from API:", responseData);
    } catch (error) {
      console.error('Error fetching response:', error);
    }

    setIsTyping(false);
  };
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollToBottom();
    }
  }, [messages]); // Jalankan scroll saat pesan diperbarui


  return (
    <div className="chatbot">
      <Header/>
      <div className= 'chatbot__'>
        <div className='chatbot__css'>
         <MainContainer style={{flex: 1, justifyContent: "center"}} >
          <ChatContainer style={{ minWidth: '600px', height: "540px", overflow: "scroll", display: "fix", justifyContent: "center"}}>       
          <MessageList
              ref={messageListRef}
              style={{marginTop:"10px"}} 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="Vacaybot is typing" /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
         </MainContainer>
        </div>
      </div>
    </div>
  )
}

export default Chatbot;
