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

import homeLogo from "../images/home.svg"
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Navbar.module.css';
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

// const data = [
  
//   { link: '', label: 'Home', icon: IconHome },
//   { link: '', label: 'Top Posts', icon: IconCircleArrowUp },
//   { link: '', label: 'Communities', icon: IconLayoutGrid },
//   { link: '', label: 'About Wrottit', icon: IconInfoCircle },

// ];

export function Navbar() {
  const [active, setActive] = useState('Billing');
  const [isMobile,setIsMobile] = useState(false);

 useEffect(() => {
  function handleResize() {
    setIsMobile(window.innerWidth < 720);
  }

  handleResize(); 
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
  const navigate = useNavigate()

  function aboutHandler() {
    navigate('/About')
  }
  function homeHandler() {
    navigate('/')
  }
  function communityHandler() {
    navigate('/Communities')
  }
  function metallicaHandler() {
    navigate('/MetallicaCommunity')
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

  const isMobileStyle = {position: "sticky", 
      top: "17em", padding : "1em", width: '6em', };

      const DesktopStyle = {position: "sticky",
      top: "17em", paddingLeft: "0"};
  
  return (
    
    <nav className={classes.navbar} style={ isMobile? isMobileStyle  : DesktopStyle }>
      <div className={classes.navbarMain}>
        
      
      
          
      <a href="#" className={classes.link} onClick={(event) => homeHandler()}>
        <IconHome className={classes.linkIcon} stroke={1.5} />
        {!isMobile && <span>Home</span>}
      </a> 
      <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
        <IconCircleArrowUp className={classes.linkIcon} stroke={1.5} />
        {!isMobile && <span>Top Posts</span>}
      </a> 
      <a href="#" className={classes.link} onClick={communityHandler}>
        <IconLayoutGrid className={classes.linkIcon} stroke={1.5} />
        {!isMobile && <span>Communities</span>}
      </a> 
      <a href="#" className={classes.link} onClick={aboutHandler}>
        <IconInfoCircle className={classes.linkIcon} stroke={1.5} />
        {!isMobile && <span>About Wrottit</span>}
      </a> 
      <a href="#" className={classes.link} onClick={metallicaHandler}>
        <IconInfoCircle className={classes.linkIcon} stroke={1.5} />
        {!isMobile && <span>metallica</span>}
      </a> 
    </div>
    
      {/* window.location.reload(); */}
      
    </nav>
  );
}