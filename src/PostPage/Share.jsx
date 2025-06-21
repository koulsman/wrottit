import "./Likes.css";
import share from "../images/share.svg";
import { Popover, Button, Text } from "@mantine/core";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";
import FacebookIcon from "../images/facebook-icon.svg";
import TwitterIcon from "../images/twitter-icon.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Copy from "../images/copy.svg";

export default function Share({ postid }) {
  // const urlForCopy = `http://localhost:3000/post/${postid}`;
  const urlForCopy = `http://wrottit-servers.onrender.com/post/${postid}`;
 
  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <div className="postInteractionContainer" style={{background: "purple"}}> 
          <img src={share} className="vectors" alt="share icon" />
        </div>
      </Popover.Target>
      <Popover.Dropdown style={{ width: "26em" }}>
        <div className="flex flex-col gap-2">
          <FacebookShareButton url={urlForCopy}>
            <img
              src={FacebookIcon}
              style={{ width: "2em", height: "2em", margin: "1em" }}
            />
          </FacebookShareButton>

          {/* <FacebookMessengerShareButton url={urlForCopy} appId="YOUR_FACEBOOK_APP_ID">
            <Button leftIcon={<FaFacebookMessenger />} color="blue">Share on Messenger</Button>
          </FacebookMessengerShareButton> */}

          <TwitterShareButton url={urlForCopy}>
            <img
              src={TwitterIcon}
              style={{ width: "2em", height: "2em", margin: "1em" }}
            />
          </TwitterShareButton>
          <button>{urlForCopy}</button>

          <Popover width={200} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <CopyToClipboard text={urlForCopy} tooltip="Copy">
                <img
                  src={Copy}
                  alt="Copy icon"
                  style={{
                    width: "2em",
                    height: "2em",
                    margin: "1em", 
                    backgroundColor: "#4274D8",
                  }}
                />
              </CopyToClipboard>
            </Popover.Target>
            <Popover.Dropdown>
              <Text size="xs">Copied!</Text>
            </Popover.Dropdown>
          </Popover>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
