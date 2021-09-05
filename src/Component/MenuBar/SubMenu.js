import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import "./MenuCss.css"

const SidebarLabel = styled.span`
margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding:10px 20px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;

  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

const SubMenu = ({ item, closeSlideBar, sidebar }) => {

  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  const closeSlideMenu = () => {
    closeSlideBar();
  }
  
  return (
    <>
      <div className="menu-comp" onMouseEnter={sidebar === false ? item.subNav && showSubnav : null } onMouseLeave={item.subNav && showSubnav}>
        <div className="divLink">
          {item.icon}
          <Link to={item.path} className="linkName" onClick={closeSlideMenu}>{item.title}</Link>
          <div className="itemIcon" onClick={item.subNav && showSubnav}>
            {item.subNav && subnav
              ? item.iconOpened
              : item.subNav
                ? item.iconClosed
                : null}
          </div></div>

        <div className="subMenu">
          {subnav && item.subNav.map((item, index) => {
            return (
              <DropdownLink to={item.path} key={index} onClick={closeSlideMenu}>
                {item.icon}
                <SidebarLabel >{item.title}</SidebarLabel>
              </DropdownLink>
            );
          })}
        </div></div>
    </>
  );
};

export default SubMenu;
