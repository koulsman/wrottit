import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconHome,
  IconCircleArrowUp,
  IconInfoCircle,
  IconLayoutGrid
} from '@tabler/icons-react';

import homeLogo from "../src/images/home.svg"
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Navbar.module.css';
import { useNavigate} from 'react-router-dom'

// const data = [
  
//   { link: '', label: 'Home', icon: IconHome },
//   { link: '', label: 'Top Posts', icon: IconCircleArrowUp },
//   { link: '', label: 'Communities', icon: IconLayoutGrid },
//   { link: '', label: 'About Wrottit', icon: IconInfoCircle },

// ];

export function Navbar() {
  const [active, setActive] = useState('Billing');
  const navigate = useNavigate()

  function aboutHandler() {
    navigate('/About')
  }
  function homeHandler() {
    navigate('/')
  }
  // const links = data.map((item) => (
  //   <a
  //     className={classes.link}
  //     data-active={item.label === active || undefined}
  //     href={item.link}
  //     key={item.label}
  //     onClick={(event) => {
  //       event.preventDefault();
  //       setActive(item.label);
  //     }}
  //   >
  //     <item.icon className={classes.linkIcon} stroke={1.5} />
  //     <span>{item.label}</span>
  //   </a>
  // ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        
      
      
          
      <a href="#" className={classes.link} onClick={(event) => homeHandler()}>
        <IconHome className={classes.linkIcon} stroke={1.5} />
        <span>Home</span>
      </a> 
      <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
        <IconCircleArrowUp className={classes.linkIcon} stroke={1.5} />
        <span>Top Posts</span>
      </a> 
      <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
        <IconLayoutGrid className={classes.linkIcon} stroke={1.5} />
        <span>Communities</span>
      </a> 
      <a href="#" className={classes.link} onClick={aboutHandler}>
        <IconInfoCircle className={classes.linkIcon} stroke={1.5} />
        <span>About Wrottit</span>
      </a> 
    </div>
    
      {/* window.location.reload(); */}
      
    </nav>
  );
}