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

  function handleResize() {
    {window.innerWidth < 720 ? setIsMobile(true) : setIsMobile(false)}
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })
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
  
  return (
    
    <nav className={classes.navbar} style={{    position: "sticky",
      top: "17em", paddingLeft: "0"}}>
      <div className={classes.navbarMain}>
        
      
      
          
      <a href="#" className={classes.link} onClick={(event) => homeHandler()}>
        <IconHome className={classes.linkIcon} stroke={1.5} />
        {isMobile=== false && <span>Home</span>}
      </a> 
      <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
        <IconCircleArrowUp className={classes.linkIcon} stroke={1.5} />
        {isMobile=== false && <span>Top Posts</span>}
      </a> 
      <a href="#" className={classes.link} onClick={communityHandler}>
        <IconLayoutGrid className={classes.linkIcon} stroke={1.5} />
        {isMobile=== false && <span>Communities</span>}
      </a> 
      <a href="#" className={classes.link} onClick={aboutHandler}>
        <IconInfoCircle className={classes.linkIcon} stroke={1.5} />
        {isMobile=== false && <span>About Wrottit</span>}
      </a> 
      <a href="#" className={classes.link} onClick={metallicaHandler}>
        <IconInfoCircle className={classes.linkIcon} stroke={1.5} />
        {isMobile=== false && <span>metallica</span>}
      </a> 
    </div>
    
      {/* window.location.reload(); */}
      
    </nav>
  );
}