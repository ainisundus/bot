import React from "react";
import Chat from "../Chat/Chat";
import '../Style/Content.css'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
const Header = () => {
  return (
    <div className="header">
      <div className="header__content">
        <h1>VacayBot</h1>
        <div className="header__description">
          <p>A website bot that helps you to provide accurate, personal, and convenient travel recommendations</p>
          <div className="chat">
            <svg data-testid="LogoutIcon">
                <ChatBubbleIcon />
            </svg>
            <p><a href="Chat">Chat Me</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;