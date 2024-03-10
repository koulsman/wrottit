import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Modal } from '@mantine/core';
import Login from "./Login.tsx";
import React from 'react';
import { MantineProvider, Text } from '@mantine/core';
import MainPage from "./MainPage.tsx"
import { DoubleNavbar } from './DoubleNavbar.tsx';
import { Link } from 'react-router-dom';

// kidc

function App() {
  return (
    <main>
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
         <p className="title">Wrottit</p>
      </header>
 <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/MainPage" element={<MainPage />}/>
          {/* <Route path="/Login" element={<Login />} /> */}
          <Route path="/DoubleNavbar" element={<DoubleNavbar />}/>
          </Routes>
          </BrowserRouter>
          </MantineProvider>

          
         
    </div>
    </main>
  );
}

export default App;
