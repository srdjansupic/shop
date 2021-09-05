import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import "./MenuCss.css";



const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSlideBar = () => {
    setSidebar(!sidebar);
  }
  const closeSlideBar = () => {
    setSidebar(false)
  }

  return (
    <header>
      <img src="https://www.3dengr.com/wp-content/uploads/2014/03/Techshop-Logo.png" id="logo"></img>
      <div id="menu" onClick={showSlideBar}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
        <nav className={sidebar === false ? "closeSlideBar" : "openSlideBar"} sidebar={sidebar}>
          <div className="nav-div">
          <div className="close-slide-bar" onClick={closeSlideBar}>X</div>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} sidebar={sidebar} key={index} closeSlideBar={closeSlideBar}/>;
            })}
          </div>
        </nav>
      </header>
  );
};

export default Sidebar;
