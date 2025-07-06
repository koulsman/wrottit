import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Tooltip, Divider } from "@mantine/core";
import Facebook from "../images/facebook-icon.svg";
import Twitter from "../images/twitter-icon.svg";
import Google from "../images/google-icon.svg";
import { Signup } from "./Signup";
import axios from "axios";
import LoggedInfo from "../LoggedInfo/LoggedInfo";
import { isLoggedInAtom, loggedUserAtom } from "./isLoggedIn";
import { useAtom } from "jotai";
import { Switch } from "@mantine/core";
import bcrypt from "bcryptjs";
import config from "../config";

export function Login() {
  const [opened, { open, close }] = useDisclosure(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [loggedUser, setLoggedUser] = useAtom(loggedUserAtom);
  const [checked, setChecked] = useState(false);
   function DefaultUser(checked) {
    if(checked) {

    
      setChecked(checked);
      setEmail("johndoe@gmail.com")
      setPassword("johnnybegood")
      }
      // else {
      // setChecked(false);
      // setEmail("")
      // setPassword("")
      // }
   }
  
  async function handleLogin() {
    try {
      const response = await axios.post(`${config.USERS_API}/users/login`, {
        email,
        password,
      });
      const userInfo = response.data;
      setLoggedUser(userInfo);
      setIsLoggedIn(true);
      alert("Login successful!");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in. Please check your credentials and try again.");
      setIsLoggedIn(false);
    }
  }

  // Close modal when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      close();
    }
  }, [isLoggedIn, close]);

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <h1>Log In</h1>
        {/* <Divider my="xs" label="CONTINUE WITH" labelPosition="center" />
        <div className="Social-media-icons">

        <Tooltip label="Facebook">
            <img src={Facebook} className="Social-media-logo" alt="Facebook" />
          </Tooltip>
          <Tooltip label="Twitter">
            <img src={Twitter} className="Social-media-logo" alt="Twitter" />
          </Tooltip>
          <Tooltip label="Google">
            <img src={Google} className="Social-media-logo" alt="Google" />
          </Tooltip>
        </div> */}
        <div>
           <Tooltip label="This is for convenience. Don't worry, password are encrypted!" refProp="rootRef">
          <Switch 
          onMouseOver={{}}
            checked={checked}
            label="Slide if you are a tester or reqruiter for default user"
            onChange={(event) => DefaultUser(event.currentTarget.checked)}
          />
          </Tooltip>
        </div>
        <Divider my="xs" label="OR" labelPosition="center" />
        <div className="User-pass-div">
          <input
            className="Text-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={{ color: "black" }}
          />
          <input
            className="Text-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ color: "black" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleLogin}>Login</Button>
        </div>

        <div style={{ marginTop: "8px", display: "flex" }}>
          <p>Forgot your username or password?</p>
          <a href="https://www.google.com/search?q=alzheimers+diseace&ie=UTF-8">
            <p>If yes, click me!</p>
          </a>
        </div>
        <p>
          New to Wrottit? <Signup />
        </p>
      </Modal>
      {isLoggedIn ? (
        <LoggedInfo
          style={{ zIndex: 500 }}
          name={loggedUser?.name}
          uid={loggedUser?._id}
          status={isLoggedIn}
        />
      ) : (
        <Button onClick={open}>Login</Button>
      )}
    </>
  );
}
