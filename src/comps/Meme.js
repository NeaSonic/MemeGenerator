import React,{useState} from "react";
import Resizable from "./Resizable";

export default function Meme(){
    const [resizableList, setResizableList] = useState([]);
    const top = React.useRef(null);
    const bot = React.useRef(null);
    const hiddenFileInput = React.useRef(null);
    const cvs = React.useRef(null);
    const image = new Image();
    function addResizable(width){
        const resizable = <Resizable cvs={cvs} key={resizableList.length} imagwidth={width}/>;
        setResizableList((prevResizableList)=>[...prevResizableList, resizable]);
        console.log("ran");
    }
    function draw() {
        const width = 600*(image.width/image.height);
        const ctx = cvs.current.getContext("2d");
        console.log(width);
        ctx.clearRect(0, 0, 1200, 600);
        ctx.drawImage(image,(1200-(width))/2,0,width,600);
        addResizable(width);
        addResizable(width);
        
    };
    function text(){
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
        console.log(resizableList);
        setResizableList([]);
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
                {resizableList.map(item => item)}
                </div>
            </form>
            <input
               type="file"
               name="myImage"
               style={{display:'none'}}
               ref={hiddenFileInput}
               onChange={(event) => {
               image.src = URL.createObjectURL(event.target.files[0]);
               image.onload = draw;
              }}
            />
        </main>
    )
};