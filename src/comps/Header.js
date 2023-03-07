import React from "react";
import Xdd from '../imgs/xdd.png';

export default function Header(){
    return (
        <header className="header">
            <img 
                src={Xdd}
                className="header--image"
            />
            <h2 classname="header--title">Meme generator xDD</h2>
        </header>
    )
}