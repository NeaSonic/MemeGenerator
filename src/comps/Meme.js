import React,{useState} from "react";
import Resizable from "./Resizable";

export default function Meme(){
    const top = React.useRef(null);
    const bot = React.useRef(null);
    const hiddenFileInput = React.useRef(null);
    const cvs = React.useRef(null);
    const image = new Image();
    function draw() {
        console.log(image.height+" "+image.width);
        const width = 600*(image.width/image.height);
        const ctx = cvs.current.getContext("2d");
        ctx.clearRect(0, 0, 1200, 600);
        ctx.drawImage(image,(1200-(width))/2,0,width,600);
    };
    function text(){
        console.log(image.height+" "+image.width);
        const width = 600*(image.width/image.height);
        const ctx = cvs.current.getContext("2d");
        ctx.clearRect(0, 0, 1200, 600);
        ctx.drawImage(image,(1200-(width))/2,0,width,600);
        ctx.textAlign = "center";
        ctx.font="30px impact";
        ctx.fillStyle="white";
        ctx.fillText(top.current.value.toUpperCase(),600,50);
        ctx.fillText(bot.current.value.toUpperCase(),600,550);
    };
    function handleClick(e){
        e.preventDefault();
        hiddenFileInput.current.click();
    };
    return (
        <main>
            <form className="form">
                <input type="text" className="form--input" placeholder="Top Text" ref={top} onChange={text}/>
                <input type="text" className="form--input" placeholder="Bottom Text" ref={bot} onChange={text}/>
                <button className="form--button" onClick={handleClick}>Add Image</button>
                <div className="form--image">
                <canvas id='meme' ref={cvs} className="form--meme" height="600" width="1200"></canvas>
                <Resizable />
                </div>
            </form>
            <input
               type="file"
               name="myImage"
               style={{display:'none'}}
               ref={hiddenFileInput}
               onChange={(event) => {
               console.log(event.target.files[0]);
               image.src = URL.createObjectURL(event.target.files[0]);
               image.onload = draw;
              }}
            />
        </main>
    )
};