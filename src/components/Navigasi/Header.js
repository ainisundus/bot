import React, { useState } from 'react';
import Profile from '../Page/Profile'
import '../Style/Header.css'
import HomeIcon from '@mui/icons-material/Home';
import newt from '../../assets/1.jpg';
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
    
    const [toggleMenu, setToggleMenu] = useState(false);

    const handleToggleMenu = () => {
      setToggleMenu(!toggleMenu);
    };
    
    return (
        <div className="vacaybot__navbar">
            <div className="topbarLeft">
            <Link to="/home">
                    <img src={logo} alt="logo" className="logo"/>
                </Link>
            </div>
            <div className="vacaybot__navbar_links">
                <p className="vacaybot_link"><a href="/aboutus">About Us</a></p>  
            </div>
            <img src={newt} alt="" className="topbarImg" onClick={handleToggleMenu}/>
            {toggleMenu && <Profile onCloseMenu={handleToggleMenu} />}
            
        </div>
    );

}
export default Navbar;