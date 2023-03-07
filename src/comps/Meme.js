import React,{useState,useRef,useEffect, useCallback} from "react";
import Resizable from "./Resizable";
import TextInput from "./TextInput";

export default function Meme(){


    const [width, setWidth] = useState (1200);
    const [image, setImage] = useState(new Image());
    const [resizableList, setResizableList] = useState([]);
    const hiddenFileInput = useRef(null);
    const cvs = useRef(null);
    const textBoxes = useRef(null);
    const [idCounter, setIdCounter] = useState (2);
    const [imageLoaded, setImageLoaded] = useState(false);

    
    const removeTextboxEvent = useCallback((data) => {
        setResizableList((current)=>
            current.filter((resizable)=>resizable.id!==data.id)
        );
    },[]);


    const updateText = useCallback(() => {
        const ctx = cvs.current.getContext('2d');
        ctx.clearRect(0, 0, width, 600);
        ctx.drawImage(image,0,0,width,600);
        for (let i=0;i<resizableList.length;i++){
            let box = document.getElementById(`${resizableList[i].id}--box`);
            let textbox = document.getElementById(`${resizableList[i].id}--textbox`);
            let x = box.getBoundingClientRect().left - cvs.current.getBoundingClientRect().left + (box.offsetWidth/2);
            let y = box.getBoundingClientRect().top - cvs.current.getBoundingClientRect().top+30;
            
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.font="30px impact";
            ctx.fillStyle="white";
            ctx.shadowColor="black";
            ctx.shadowBlur=7;
            ctx.lineWidth=5;
            fitText(ctx,textbox.value,x,y,box.offsetWidth-40,box.offsetHeight-40);
        }
    },[image,resizableList,width]);

    function fitText(ctx,text,x,y,maxWidth,maxHeight){

        let words = text.split(' ');
        let line = '';
        let lines = [];
        let fontSize = 30;
        let metrics = null;
        let fontHeight = null;
        for (let n = 0; n < words.length; n++){
            metrics = ctx.measureText(words[n]);
            while (metrics.width > maxWidth){
                fontSize--;
                ctx.font = `${fontSize}px impact`;
                metrics = ctx.measureText(words[n]);
            }
        }
        for (let n = 0; n < words.length; n++){
            let testLine = line + words[n] + ' ';
            metrics = ctx.measureText(testLine);
            fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
            if (metrics.width > maxWidth && n>0){
                lines.push(line);
                line = words[n] + ' ';
            }
            else {
                line = testLine;
            }
        }
        lines.push(line);
        while (lines.length * fontHeight >= maxHeight || fontSize === 1){
            fontSize--;
            ctx.font = `${fontSize}px impact`;
            metrics = ctx.measureText(lines[0]);
            fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
        }
        for (let n = 0; n<lines.length; n++){
            ctx.strokeText(lines[n],x,y);
            ctx.fillText(lines[n],x,y);
            y += fontHeight;
        }

    }

    function downloadMeme(e){
        e.preventDefault();
        let url = cvs.current.toDataURL("image/png");
        let link = document.createElement('a');
        link.download = 'meme.png';
        link.href = url;
        link.click();
    }
    
    function addResizable(){
        let resizable = {
            cvs:cvs,
            id:idCounter,
        }
        setIdCounter(idCounter+1);
        setResizableList((prevResizableList)=>[...prevResizableList, resizable]);
    }
    function addResizableStart(id){
        let resizable = {
            cvs:cvs,
            id:id,
        }
        setResizableList((prevResizableList)=>[...prevResizableList, resizable]);
    }
    
    function draw() {
        const width = 600*(image.width/image.height);
        setWidth(width);
        setResizableList([]);    
        setImageLoaded(true);
    }

    function addTextClick(e){
        e.preventDefault();
        if (resizableList.length !== 0)
        addResizable();
    }
    
    function addImageClick(e){
        e.preventDefault();
        console.log(resizableList);
        hiddenFileInput.current.click();
    }
    
    useEffect(()=>{
        image.onload = draw;
    },[])

    const cb = useCallback(
        (e) => removeTextboxEvent(e.detail)
    ,[removeTextboxEvent]);

    useEffect(()=>{
        document.addEventListener('removetextbox',cb);
        document.addEventListener('addtext',updateText);
        updateText();
        return () => {
            document.removeEventListener('addtext',updateText);
            document.removeEventListener('removetextbox',cb);
        }
    },[resizableList])

    useEffect(()=>{
        if(!imageLoaded) return;
        const ctx = cvs.current.getContext("2d");
        ctx.clearRect(0, 0, width, 600);
        ctx.drawImage(image,0,0,width,600);
        addResizableStart(0);
        addResizableStart(1);  
        
    },[width])


    return (
        <main>
            <form className="form">
                
                
                <div className='form--textboxes' ref={textBoxes}>
                    {resizableList.map((item)=>{
                    return (<TextInput cvs={item.cvs} key={item.id} id={item.id}  />)
                })}
                {
                    imageLoaded && <button className='form--button--textboxes' onClick={addTextClick} >Add Text</button>
                }
                </div>
                <button className="form--button" onClick={addImageClick}>Add Image</button>
                {
                    imageLoaded && <button className="form--button" onClick={downloadMeme} >Download Meme</button>
                }
                <div className="form--image">
                <canvas id='meme' ref={cvs} className="form--meme" height="600" width={width}></canvas>
                {resizableList.map((item)=>{
                    return (<Resizable cvs={item.cvs} key={item.id} id={item.id}/>)
                })}
                </div>
            </form>
            <input
               type="file"
               accept="image/*"
               name="meme"
               style={{display:'none'}}
               ref={hiddenFileInput}
               onChange={(event) => {
               image.src = URL.createObjectURL(event.target.files[0]);
              }}
            />
        </main>
    )
}