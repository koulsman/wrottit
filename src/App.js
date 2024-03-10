import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Modal } from '@mantine/core';
import Login from "./Login";
import React from 'react';
// kidc

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="/Login" element={<Login />} />
          </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
