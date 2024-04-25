import React, { useState } from 'react';


const Menu = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');

  const handleMenuClick = (menu) => {
    if (menu === activeMenu) {
      setShowSubmenu(!showSubmenu);
    } else {
      setActiveMenu(menu);
      setShowSubmenu(true);
    }
  };

  return (
    <div className="wrapper">
      <div className='menu_profil'>
        <h3 onClick={() => handleMenuClick('akun')}>Akun</h3>
        {showSubmenu && activeMenu === 'akun' && (
          <div className="submenu">
            <p><a href="/users">Profile</a></p>
            <p><a href="/users/edit">Edit Akun</a></p>
            <p>Delete Akun</p>
          </div>
        )}
      </div>
      <div className='menu_chat'>
        <h3 onClick={() => handleMenuClick('chat')}>Chat</h3>
        {showSubmenu && activeMenu === 'chat' && (
          <div className="submenu">
            <p><a href="/chat">Bot</a></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
