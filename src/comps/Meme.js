import React,{useState,useRef,useEffect} from "react";
import Resizable from "./Resizable";
import TextInput from "./TextInput";
import eventBus from "../eventbus/EventBus";

export default function Meme(){


    
    const [image, setImage] = useState(new Image());
    const [resizableList, setResizableList] = useState([]);
    const hiddenFileInput = useRef(null);
    const cvs = useRef(null);
    const textBoxes = useRef(null);
    const button = useRef(null);
    
    function reDraw(){
        const width = 600*(image.width/image.height);
        const ctx = cvs.current.getContext("2d");
        ctx.clearRect(0, 0, 1200, 600);
        ctx.drawImage(image,(1200-(width))/2,0,width,600);
        button.current.click();
    }

    function updateText(e){
        e.preventDefault();
        const ctx = cvs.current.getContext('2d');
        for (let i=0;i<resizableList.length;i++){
            let box = document.getElementById(`${i}--box`);
            let textbox = document.getElementById(`${i}--textbox`);
            let x = box.getBoundingClientRect().left - cvs.current.getBoundingClientRect().left + (box.offsetWidth/2);
            let y = box.getBoundingClientRect().top - cvs.current.getBoundingClientRect().top + (box.offsetHeight/2);
            ctx.textAlign = "center";
            ctx.font="30px impact";
            ctx.fillStyle="white";
            ctx.fillText(textbox.value.toUpperCase(),x,y);
        }
    }
    
    
    
    function addResizable(width){
        let resizable = {
            cvs:cvs,
            imgwidth:width,
            image:image
        }
        setResizableList((prevResizableList)=>[...prevResizableList, resizable]);
    }
    
    function draw() {
        const width = 600*(image.width/image.height);
        const ctx = cvs.current.getContext("2d");
        console.log(image.width);
        ctx.clearRect(0, 0, 1200, 600);
        ctx.drawImage(image,(1200-(width))/2,0,width,600);
        addResizable(width);
        addResizable(width);      
    }

    function addTextClick(e){
        e.preventDefault();
    }
    
    function addImageClick(e){
        e.preventDefault();
        console.log(resizableList);
        setResizableList([]);
        hiddenFileInput.current.click();
    }
    
    useEffect(()=>{
        eventBus.on('addtext',reDraw);
        image.onload = draw;
        console.log('useeffect');
    },[])

    return (
        <main>
            <form className="form">
                
                
                <div className='form--textboxes' ref={textBoxes}>
                    {resizableList.map((item,index)=>{
                    return (<TextInput cvs={item.cvs} image={item.image} imgwidth={item.imgwidth} key={index} id={index}  />)
                })}
                    <button className='form--button--textboxes' >Add Text</button>
                </div>
                
                <button className="form--button" onClick={addImageClick}>Add Image</button>
                <div className="form--image">
                <canvas id='meme' ref={cvs} className="form--meme" height="600" width="1200"></canvas>
                {resizableList.map((item,index)=>{
                    return (<Resizable cvs={item.cvs} imgwidth={item.imgwidth} key={index} id={index}/>)
                })}
                </div>
                <button style={{display:'none'}} onClick={updateText} ref={button} ></button>
            </form>
            <input
               type="file"
               name="myImage"
               style={{display:'none'}}
               ref={hiddenFileInput}
               onChange={(event) => {
               image.src = URL.createObjectURL(event.target.files[0]);
              }}
            />
        </main>
    )
}