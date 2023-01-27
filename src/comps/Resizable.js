import React,{useState, useRef, useEffect} from "react";
import Bounds from "../classes/Bounds";

export default function Resizable(props){

    useEffect(()=>{
        
        bounds.setLeft(props.cvs.current.getBoundingClientRect().left+((props.cvs.current.width-props.imgwidth)/2));
        bounds.setRight(document.documentElement.clientWidth-props.cvs.current.getBoundingClientRect().right+((props.cvs.current.width-props.imgwidth)/2));
        bounds.setTop(props.cvs.current.getBoundingClientRect().top);
        bounds.setBottom(document.documentElement.clientWidth-props.cvs.current.getBoundingClientRect().bottom);
        console.log(bounds);

    },[]);

    const id = 'box';
    const bounds = new Bounds();
    const resizable = useRef(null);
    const test = useRef(null);

    const [initialPosX,   setInitialPosX] = useState(null);
    const [initialPosY,   setInitialPosY] = useState(null);
    const [initialWidth, setInitialWidth] = useState(null);
    const [initialHeight, setInitialHeight] = useState(null);
    const [offsetLeft, setOffsetLeft] = useState(null);
    const [offsetTop, setOffsetTop] = useState(null);
    const [offsetRight, setOffsetRight] = useState(null);
    const [offsetBottom, setOffsetBottom] = useState(null);
    const [left, setLeft] = useState(null);
    const [right, setRight] = useState(null);
    const [top, setTop] = useState(null);
    const [bottom, setBottom] = useState(null);
  
    const initial = (e) => {
        
        
        
        setOffsetLeft(e.clientX-test.current.getBoundingClientRect().left);
        setOffsetTop(e.clientY-test.current.getBoundingClientRect().top);
        setOffsetRight(test.current.getBoundingClientRect().right-e.clientX);
        setOffsetBottom(test.current.getBoundingClientRect().bottom-e.clientY);
        setInitialPosX(e.clientX);
        setInitialPosY(e.clientY);
        setInitialHeight(resizable.current.offsetHeight);
        setInitialWidth(resizable.current.offsetWidth);
        setLeft(test.current.getBoundingClientRect().left);
        setRight(document.documentElement.clientWidth-test.current.getBoundingClientRect().right);
        setTop(test.current.getBoundingClientRect().top);
        setBottom(document.documentElement.clientHeight-test.current.getBoundingClientRect().bottom);
    }


    const drag = (e) => {
        if (e.screenX ===0) return;

        
        
        test.current.style.left = `${e.pageX-offsetLeft}px`;
        test.current.style.top = `${e.pageY-offsetTop}px`;
        test.current.style.right = `${document.documentElement.clientWidth-e.pageX-offsetRight}px`;
        test.current.style.bottom = `${document.documentElement.clientHeight-e.pageY-offsetBottom}px`;
        
    }
    const dragEnd = (e) => {
        console.log("right:"+test.style.right+" left:"+test.style.left+" top:"+test.style.top+" bottom:"+test.style.bottom);
    }
    
    const resizeE = (e) => {
        if (e.screenX === 0) return;
        
        
        
        let newSize = parseInt(initialWidth) + parseInt((e.clientX - initialPosX));

        if (newSize<20) return;

        test.current.style.left = `${left}px`;
        test.current.style.right = `${document.documentElement.clientWidth-e.pageX-offsetRight}px`;

        resizable.current.style.width = `${newSize-2}px`;
        
    }
    const resizeW = (e) => {
        if (e.screenX === 0) return;
        
        

        let newSize = parseInt(initialWidth) + parseInt((initialPosX - e.clientX));

        if (newSize<20) return;

        test.current.style.left = `${e.pageX-offsetLeft}px`;
        test.current.style.right = `${right}px`;

        resizable.current.style.width = `${newSize-2}px`;
        
    }
    const resizeN = (e) => {
        if (e.screenX === 0) return;

        

        let newSize = parseInt(initialHeight) + parseInt((initialPosY-e.clientY));

        if (newSize<20) return;
        
        test.current.style.top = `${e.pageY-offsetTop}px`;
        test.current.style.bottom = `${bottom}px`;

        resizable.current.style.height = `${newSize-2}px`;
        
    }
    const resizeS = (e) => {
        if (e.screenX === 0) return;

        

        let newSize = parseInt(initialHeight) + parseInt((e.clientY-initialPosY));

        if (newSize<20) return;

        test.current.style.top = `${top}px`;
        test.current.style.bottom = `${document.documentElement.clientHeight-e.pageY-offsetBottom}px`;

        resizable.current.style.height = `${newSize-2}px`;
        
      
    }
    const resizeNE = (e) => {
        if (e.screenX === 0) return;
        
        

        let newHeight = parseInt(initialHeight) + parseInt((initialPosY-e.clientY));
        let newWidth = parseInt(initialWidth) + parseInt((e.clientX - initialPosX));

        if (newHeight>=20) {
            test.current.style.top = `${e.pageY-offsetTop}px`;
            test.current.style.bottom = `${bottom}px`;
            resizable.current.style.height = `${newHeight-2}px`;
        }
        
        if (newWidth>=20) {
            test.current.style.left = `${left}px`;
            test.current.style.right = `${document.documentElement.clientWidth-e.pageX-offsetRight}px`;
            resizable.current.style.width = `${newWidth-2}px`;
        }
      
    }
    const resizeNW = (e) => {
        if (e.screenX === 0) return;
        
        

        let newHeight = parseInt(initialHeight) + parseInt((initialPosY-e.clientY));
        let newWidth = parseInt(initialWidth) + parseInt((initialPosX-e.clientX));

        if (newHeight>=20) {
            test.current.style.top = `${e.pageY-offsetTop}px`;
            test.current.style.bottom = `${bottom}px`;
            resizable.current.style.height = `${newHeight-2}px`;
        }

        if (newWidth>=20) {
            test.current.style.left = `${e.pageX-offsetLeft}px`;
            test.current.style.right = `${right}px`;
            resizable.current.style.width = `${newWidth-2}px`;
        }
      
    }
    const resizeSE = (e) => {
        if (e.screenX === 0) return;
        
        

        let newHeight = parseInt(initialHeight) + parseInt((e.clientY-initialPosY));
        let newWidth = parseInt(initialWidth) + parseInt((e.clientX - initialPosX));
        
        if (newHeight>=20) {
            test.current.style.top = `${top}px`;
            test.current.style.bottom = `${document.documentElement.clientHeight-e.pageY-offsetBottom}px`;
            resizable.current.style.height = `${newHeight-2}px`;
        }

        if (newWidth>=20) {
            test.current.style.left = `${left}px`;
            test.current.style.right = `${document.documentElement.clientWidth-e.pageX-offsetRight}px`;
            resizable.current.style.width = `${newWidth-2}px`;
        }
      
    }
    const resizeSW = (e) => {
        if (e.screenX === 0) return;
        
        

        let newHeight = parseInt(initialHeight) + parseInt((e.clientY-initialPosY));
        let newWidth = parseInt(initialWidth) + parseInt((initialPosX-e.clientX));

        if (newHeight>=20) {
            test.current.style.top = `${top}px`;
            test.current.style.bottom = `${document.documentElement.clientHeight-e.pageY-offsetBottom}px`;
            resizable.current.style.height = `${newHeight-2}px`;
        }

        if (newWidth>=20) {
            test.current.style.left = `${e.pageX-offsetLeft}px`;
            test.current.style.right = `${right}px`;
            resizable.current.style.width = `${newWidth-2}px`;
        }
      
    }
    return(
        <div className = 'Block' id = {id} ref={test}>
            <div id = 'DraggableNW'
                onDragStart = {initial} 
                onDrag      = {resizeNW}
            />
            <div id = 'DraggableN'
                onDragStart = {initial} 
                onDrag      = {resizeN}
            />
            <div id = 'DraggableNE'
                onDragStart = {initial} 
                onDrag      = {resizeNE}
            />
            <div id = 'DraggableW'
                onDragStart = {initial} 
                onDrag      = {resizeW}
            />
            <div id ='Resizable' onDragStart={initial} onDrag={drag} onDragEnd={dragEnd} ref={resizable}/>
            <div id = 'DraggableE'
                onDragStart = {initial} 
                onDrag      = {resizeE}
            />
            <div id = 'DraggableSW'
                onDragStart = {initial} 
                onDrag      = {resizeSW}
            />
            <div id = 'DraggableS'
                onDragStart = {initial} 
                onDrag      = {resizeS}
            />
            <div id = 'DraggableSE'
                onDragStart = {initial} 
                onDrag      = {resizeSE}
            />
        </div>
    )
};