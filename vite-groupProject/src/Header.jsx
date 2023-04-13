import React from "react"
import spongebob from "./images/spongebob.png"


export default function Header(){
    return(
        <header className="header">
            <h2 className="headerTitle">Bored Memes</h2>
            <img className="headerImg" src= {spongebob}/>
            <h4 className="headerMeme">Meme Generator</h4>
            
        </header>
    )
}