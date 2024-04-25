// Home.js
import React, { useState } from 'react';
import Content from './Content';
import Cuaca from '../Page/Cuaca'


//import './Home.css';
const Home = () => {
  return (
    <div className="vacaybot__home">
      <div className="navbar_top">
      <Content/>
      </div>
      <div className="vacaybot_chat">
      <Cuaca/>
      </div>
    </div>
  );
};

export default Home;
