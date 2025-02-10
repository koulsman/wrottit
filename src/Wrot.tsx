import { Tooltip } from "@mantine/core";
import wrot from "./images/wrot-logo-Photoroom.png-Photoroom.png";

export default function Wrot() {
    const wrotSayings = ["I don't know if I'm extremely sensitive or life is unbearable","It's nice to see you!",
  "If the path before you is clear,you're probably on someone else's","Bip Bip Bop Bop", "You won't find the same person twice,not even in the same person",
"Courage is grace under pressure","Even though I'm blue,my heart is black","Whenever I climb I am followed by a dog called 'Ego'","When i grow up,I'm gonna be a dinosaur",
"Hello world","Peekaboo","Why are you bothering me?","Reload the page so i can think of something smart","Limp Bizkit have some good tunes","na na na ... na na ... na na na"]

var selectedSaying = wrotSayings[Math.floor(Math.random()*wrotSayings.length)];
    return (
        <>
        <Tooltip label={selectedSaying}>
        <img src={wrot} className="wrot" />
        </Tooltip>
        </>
    )
}