import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Navbar } from './Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UnstyledButton, Tooltip, Title, rem } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './DoubleNavbar.module.css';
import '@mantine/dropzone/styles.css';
import { initializeApp } from 'firebase/app'
import {
	getFirestore, collection,getDocs
	} from 'firebase/firestore'
  import '@mantine/tiptap/styles.css';
  import '@mantine/dates/styles.css';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <MantineProvider theme={theme}>
  <React.StrictMode>
  
  <BrowserRouter>
      <Routes>
      
      <Route path="/Navbar" element={<Navbar />} />
      
      </Routes>
      </BrowserRouter>
    <App />
    
  </React.StrictMode>
  
  </MantineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
