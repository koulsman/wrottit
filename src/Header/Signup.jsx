import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Tooltip, Divider, Checkbox, Flex } from "@mantine/core";
import Facebook from "../images/facebook-icon.svg";
import Twitter from "../images/twitter-icon.svg";
import Google from "../images/google-icon.svg";
import axios from "axios";
import { isLoggedInAtom, loggedUserAtom } from "../Header/isLoggedIn";
import { useAtom } from "jotai";
import bcrypt from "bcryptjs";
import blackUserImage from "../images/UserImage/black.svg"
import blueUserImage from "../images/UserImage/blue.svg"
import burgundyUserImage from "../images/UserImage/burgundy.svg"
import limeUserImage from "../images/UserImage/lime.svg"
import orangeUserImage from "../images/UserImage/orange.svg"
import pinkUserImage from "../images/UserImage/pink.svg"
import spiralUserImage from "../images/UserImage/spiral.svg"
import config from "../config";

export function Signup() {
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [credentialCompleted, setCredentialCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [loggedUser, setLoggedUser] = useAtom(loggedUserAtom);


  
  const userImagesArray = [blackUserImage,blueUserImage,burgundyUserImage,limeUserImage,orangeUserImage,pinkUserImage,spiralUserImage];
  function randomUserImageHandler() {
    
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    const chosenUserImage = userImagesArray[randomNumber]
    return chosenUserImage;
  }

  async function handleSignup() {
    
  
    try {
      const response = await axios.post(`${config.USERS_API}/users`, {
        name,
        email,
        
        userImage: randomUserImageHandler(),
        // password
        password: password
      });
      const newUser = response.data;
      setLoggedUser(newUser); // Update loggedUser
      setIsLoggedIn(true); // Mark user as logged in
      alert("Signup successful!");
      close();
    } catch (error) {
  console.error("Error creating user:", error.response?.data || error.message);
  alert(error.response?.data?.message || "Error creating user. Please try again.");
}
  }

  useEffect(() => {
    const isValid =
      name !== "" &&
      email !== "" &&
      password !== "" &&
      email.includes("@") &&
      checked;
    setCredentialCompleted(isValid);

    if (!email.includes("@")) {
      setErrorMessage("Please input a valid email address");
    } else if (!checked) {
      setErrorMessage("Are you really human?");
    } else if (!name || !email || !password) {
      setErrorMessage("Please fill all the inputs");
    }
  }, [name, email, password, checked]);

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <h1>Sign Up</h1>
        <Flex direction="row" align="center">
          <Checkbox style={{marginRight: "1em"}}
            checked={checked}
            onChange={(e) => setChecked(e.currentTarget.checked)}
          />
          <p>I declare that I'm human</p>
        </Flex>
        <Divider my="xs" label="CONTINUE WITH" labelPosition="center" />
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
        </div>
        <Divider my="xs" label="OR" labelPosition="center" />
        <div className="User-pass-div">
          <input
            className="Text-input"
            name="Email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ color: "black" }}
          />
          <input
            className="Text-input"
            name="Name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            style={{ color: "black" }}
          />
          <input
            className="Text-input"
            name="Password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ color: "black" }}
          />
          <Tooltip
            label={credentialCompleted ? "Click to Sign Up!" : errorMessage}
            withArrow
          >
            <span>
              <Button
                onClick={handleSignup}
                disabled={!credentialCompleted}
                style={{
                  pointerEvents: credentialCompleted ? "auto" : "none",
                  opacity: credentialCompleted ? 1 : 0.4,
                  margin: "auto"
                }}
              >
                Sign Up
              </Button>
            </span>
          </Tooltip>
        </div>
      </Modal>
      <text className="Signup-text" onClick={open}>
        Sign Up
      </text>
    </>
  );
}
