import React,{useState, useRef, useEffect} from "react";
import Bounds from "../classes/Bounds";
import eventBus from "../eventbus/EventBus";

export default function Resizable(props){

    //create unique id for the resizable box
    const id = `${props.id}--box`;
    
    //resizable is the div the text is fit into, resizableBox is the div containing everything.
    const resizable = useRef(null);
    const resizableBox = useRef(null);
    
    //everything here is pretty self explanatory
    const [bounds, setBounds] = useState(null);
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
    const [draggable,setDraggable] = useState(false);
    const [resizableN, setResizableN] = useState(false);
    const [resizableS, setResizableS] = useState(false);
    const [resizableE, setResizableE] = useState(false);
    const [resizableW, setResizableW] = useState(false);
    const [resizableNE, setResizableNE] = useState(false);
    const [resizableNW, setResizableNW] = useState(false);
    const [resizableSE, setResizableSE] = useState(false);
    const [resizableSW, setResizableSW] = useState(false);
    

    //first render,save the bounds so we can use them later
    useEffect (() => {

        const bds = new Bounds();
        bds.setLeft((props.cvs.current.getBoundingClientRect().left+window.scrollX));
        bds.setRight((document.documentElement.clientWidth-props.cvs.current.getBoundingClientRect().right+window.scrollX));
        bds.setTop(props.cvs.current.getBoundingClientRect().top+window.scrollY);
        bds.setBottom(document.documentElement.clientHeight-(props.cvs.current.getBoundingClientRect().bottom+window.scrollY));
        setBounds(bds);
    },[]);

    //code here is pretty much the same for every resize direction, so I'll leave comments just for the DRAG block

    //DRAG


    //this is called onmousedown and it sets up every state variable we need in order to move the component around
    const initialDrag = (e) => {
        
        setOffsetLeft(e.clientX-resizableBox.current.getBoundingClientRect().left);
        setOffsetTop(e.clientY-resizableBox.current.getBoundingClientRect().top);
        setOffsetRight(resizableBox.current.getBoundingClientRect().right-e.clientX);
        setOffsetBottom(resizableBox.current.getBoundingClientRect().bottom-e.clientY);
        setInitialPosX(e.clientX);
        setInitialPosY(e.clientY);
        setInitialHeight(resizable.current.offsetHeight);
        setInitialWidth(resizable.current.offsetWidth);
        setLeft(resizableBox.current.getBoundingClientRect().left);
        setRight(document.documentElement.clientWidth-resizableBox.current.getBoundingClientRect().right);
        setTop(resizableBox.current.getBoundingClientRect().top);
        setBottom(document.documentElement.clientHeight-resizableBox.current.getBoundingClientRect().bottom);
        setDraggable(true);
    }
    

    //called onmouseup, sets draggable state to false
    const dragEnd = () => {
        setDraggable(false);
        window.removeEventListener('mousemove',drag);
        window.removeEventListener('mouseup',dragEnd);
    }

    //these two move the event listeners to the window so the component is still draggable once the mouse leaves it
    const dragEnter = (e) => {
        if(!draggable) return;
        window.removeEventListener('mousemove',drag);
        window.removeEventListener('mouseup',dragEnd);
        
    }
    const dragLeave = (e) => {
        if (!draggable) return;
        window.addEventListener('mousemove',drag);
        window.addEventListener('mouseup',dragEnd);
    }


    
    const drag = (e) => {
        if (!draggable) return;
        if (e.screenX ===0) return;

        //if the new position is outside the left or right bounds of the canvas, stop moving.
        if(bounds.getLeft() < e.pageX-offsetLeft && bounds.getRight() < document.documentElement.clientWidth-e.pageX-offsetRight){
            resizableBox.current.style.left = `${e.pageX-offsetLeft}px`;
            resizableBox.current.style.right = `${document.documentElement.clientWidth-e.pageX-offsetRight}px`;
        }
        
        //same as the one above but for top and bottom
        if(bounds.getTop() < e.pageY-offsetTop && bounds.getBottom() < document.documentElement.clientHeight-e.pageY-offsetBottom){
            resizableBox.current.style.top = `${e.pageY-offsetTop}px`;
            resizableBox.current.style.bottom = `${document.documentElement.clientHeight-e.pageY-offsetBottom}px`;
        }
        
        //dispatch event to clear the canvas and add everything back with the new position
        eventBus.dispatch('addtext');
        
    }
    
    
    //RESIZE EAST
    
    const initialE = (e) => {
        
        setOffsetLeft(e.clientX-resizableBox.current.getBoundingClientRect().left);
        setOffsetTop(e.clientY-resizableBox.current.getBoundingClientRect().top);
        setOffsetRight(resizableBox.current.getBoundingClientRect().right-e.clientX);
        setOffsetBottom(resizableBox.current.getBoundingClientRect().bottom-e.clientY);
        setInitialPosX(e.clientX);
        setInitialPosY(e.clientY);
        setInitialHeight(resizable.current.offsetHeight);
        setInitialWidth(resizable.current.offsetWidth);
        setLeft(resizableBox.current.getBoundingClientRect().left);
        setRight(document.documentElement.clientWidth-resizableBox.current.getBoundingClientRect().right);
        setTop(resizableBox.current.getBoundingClientRect().top);
        setBottom(document.documentElement.clientHeight-resizableBox.current.getBoundingClientRect().bottom);
        setResizableE(true);
        
    }

    const resizeEndE = (e) => {
        setResizableE(false);
        window.removeEventListener('mousemove',resizeE);
        window.removeEventListener('mouseup',resizeEndE);
    }

    const resizeEnterE = (e) => {
        if(!resizableE) return;
        window.removeEventListener('mousemove',resizeE);
        window.removeEventListener('mouseup',resizeEndE);
    }
    const resizeLeaveE = (e) => {
        if (!resizableE) return;
        window.addEventListener('mousemove',resizeE);
        window.addEventListener('mouseup',resizeEndE);
    }
    
    const resizeE = (e) => {
        if (!resizableE) return;
        if (e.screenX === 0) return;
        
        
        
        let newSize = parseInt(initialWidth) + parseInt((e.clientX - initialPosX));

        if (newSize<20) return;

        if (bounds.getRight() >= document.documentElement.clientWidth-e.pageX-offsetRight) return;

        resizableBox.current.style.left = `${left+window.scrollX}px`;
        resizableBox.current.style.right = `${document.documentElement.clientWidth-e.pageX-offsetRight}px`;

        resizable.current.style.width = `${newSize-2}px`;
        
        eventBus.dispatch('addtext');
        
    }


    //RESIZE WEST

    const initialW = (e) => {
        
        setOffsetLeft(e.clientX-resizableBox.current.getBoundingClientRect().left);
        setOffsetTop(e.clientY-resizableBox.current.getBoundingClientRect().top);
        setOffsetRight(resizableBox.current.getBoundingClientRect().right-e.clientX);
        setOffsetBottom(resizableBox.current.getBoundingClientRect().bottom-e.clientY);
        setInitialPosX(e.clientX);
        setInitialPosY(e.clientY);
        setInitialHeight(resizable.current.offsetHeight);
        setInitialWidth(resizable.current.offsetWidth);
        setLeft(resizableBox.current.getBoundingClientRect().left);
        setRight(document.documentElement.clientWidth-resizableBox.current.getBoundingClientRect().right);
        setTop(resizableBox.current.getBoundingClientRect().top);
        setBottom(document.documentElement.clientHeight-resizableBox.current.getBoundingClientRect().bottom);
        setResizableW(true);
        
    }

    const resizeEndW = (e) => {
        setResizableW(false);
        window.removeEventListener('mousemove',resizeW);
        window.removeEventListener('mouseup',resizeEndW);
    }

    const resizeEnterW = (e) => {
        if(!resizableW) return;
        window.removeEventListener('mousemove',resizeW);
        window.removeEventListener('mouseup',resizeEndW);

    }
    const resizeLeaveW = (e) => {
        if (!resizableW) return;
        window.addEventListener('mousemove',resizeW);
        window.addEventListener('mouseup',resizeEndW);
    }

    const resizeW = (e) => {
        if (!resizableW) return;
        if (e.screenX === 0) return;
        
        

        let newSize = parseInt(initialWidth) + parseInt((initialPosX - e.clientX));

        if (newSize<20) return;

        if (bounds.getLeft() >= e.pageX-offsetLeft) return;

        resizableBox.current.style.left = `${e.pageX-offsetLeft}px`;
        resizableBox.current.style.right = `${right-window.scrollX}px`;

        resizable.current.style.width = `${newSize-2}px`;

        eventBus.dispatch('addtext');
        
    }

    //RESIZE NORTH

    const initialN = (e) => {
        
        setOffsetLeft(e.clientX-resizableBox.current.getBoundingClientRect().left);
        setOffsetTop(e.clientY-resizableBox.current.getBoundingClientRect().top);
        setOffsetRight(resizableBox.current.getBoundingClientRect().right-e.clientX);
        setOffsetBottom(resizableBox.current.getBoundingClientRect().bottom-e.clientY);
        setInitialPosX(e.clientX);
        setInitialPosY(e.clientY);
        setInitialHeight(resizable.current.offsetHeight);
        setInitialWidth(resizable.current.offsetWidth);
        setLeft(resizableBox.current.getBoundingClientRect().left);
        setRight(document.documentElement.clientWidth-resizableBox.current.getBoundingClientRect().right);
        setTop(resizableBox.current.getBoundingClientRect().top);
        setBottom(document.documentElement.clientHeight-resizableBox.current.getBoundingClientRect().bottom);
        setResizableN(true);
        
    }

    const resizeEndN = (e) => {
        setResizableN(false);
        window.removeEventListener('mousemove',resizeN);
        window.removeEventListener('mouseup',resizeEndN);
    }

    const resizeEnterN = (e) => {
        if(!resizableN) return;
        window.removeEventListener('mousemove',resizeN);
        window.removeEventListener('mouseup',resizeEndN);

    }
    const resizeLeaveN = (e) => {
        if (!resizableN) return;
        window.addEventListener('mousemove',resizeN);
        window.addEventListener('mouseup',resizeEndN);
    }

    const resizeN = (e) => {
        if (!resizableN) return;
        if (e.screenX === 0) return;

        

        let newSize = parseInt(initialHeight) + parseInt((initialPosY-e.clientY));

        if (newSize<20) return;

        if (bounds.getTop() >= e.pageY-offsetTop) return;
        
        resizableBox.current.style.top = `${e.pageY-offsetTop}px`;
        resizableBox.current.style.bottom = `${bottom-window.scrollY}px`;

        resizable.current.style.height = `${newSize-2}px`;

        eventBus.dispatch('addtext');
        
    }

    //RESIZE SOUTH

    const initialS = (e) => {
        
        setOffsetLeft(e.clientX-resizableBox.current.getBoundingClientRect().left);
        setOffsetTop(e.clientY-resizableBox.current.getBoundingClientRect().top);
        setOffsetRight(resizableBox.current.getBoundingClientRect().right-e.clientX);
        setOffsetBottom(resizableBox.current.getBoundingClientRect().bottom-e.clientY);
        setInitialPosX(e.clientX);
        setInitialPosY(e.clientY);
        setInitialHeight(resizable.current.offsetHeight);
        setInitialWidth(resizable.current.offsetWidth);
        setLeft(resizableBox.current.getBoundingClientRect().left);
        setRight(document.documentElement.clientWidth-resizableBox.current.getBoundingClientRect().right);
        setTop(resizableBox.current.getBoundingClientRect().top);
        setBottom(document.documentElement.clientHeight-resizableBox.current.getBoundingClientRect().bottom);
        setResizableS(true);
        
    }

    const resizeEndS = (e) => {
        setResizableS(false);
        window.removeEventListener('mousemove',resizeS);
        window.removeEventListener('mouseup',resizeEndS);
    }

    const resizeEnterS = (e) => {
        if(!resizableS) return;
        window.removeEventListener('mousemove',resizeS);
        window.removeEventListener('mouseup',resizeEndS);

    }
    const resizeLeaveS = (e) => {
        if (!resizableS) return;
        window.addEventListener('mousemove',resizeS);
        window.addEventListener('mouseup',resizeEndS);
    }

    const resizeS = (e) => {
        if (!resizableS) return;
        if (e.screenX === 0) return;

        

        let newSize = parseInt(initialHeight) + parseInt((e.clientY-initialPosY));

        if (newSize<20) return;

        if (bounds.getBottom() >= document.documentElement.clientHeight-e.pageY-offsetBottom) return;

        resizableBox.current.style.top = `${top+window.scrollY}px`;
        resizableBox.current.style.bottom = `${document.documentElement.clientHeight-e.pageY-offsetBottom}px`;

        resizable.current.style.height = `${newSize-2}px`;

        eventBus.dispatch('addtext');
        
      
    }

    //RESIZE NORTH-EAST

    const initialNE = (e) => {
        
        setOffsetLeft(e.clientX-resizableBox.current.getBoundingClientRect().left);
        setOffsetTop(e.clientY-resizableBox.current.getBoundingClientRect().top);
        setOffsetRight(resizableBox.current.getBoundingClientRect().right-e.clientX);
        setOffsetBottom(resizableBox.current.getBoundingClientRect().bottom-e.clientY);
        setInitialPosX(e.clientX);
        setInitialPosY(e.clientY);
        setInitialHeight(resizable.current.offsetHeight);
        setInitialWidth(resizable.current.offsetWidth);
        setLeft(resizableBox.current.getBoundingClientRect().left);
        setRight(document.documentElement.clientWidth-resizableBox.current.getBoundingClientRect().right);
        setTop(resizableBox.current.getBoundingClientRect().top);
        setBottom(document.documentElement.clientHeight-resizableBox.current.getBoundingClientRect().bottom);
        setResizableNE(true);
        
    }

    const resizeEndNE = (e) => {
        setResizableNE(false);
        window.removeEventListener('mousemove',resizeNE);
        window.removeEventListener('mouseup',resizeEndNE);
    }

    const resizeEnterNE = (e) => {
        if(!resizableNE) return;
        window.removeEventListener('mousemove',resizeNE);
        window.removeEventListener('mouseup',resizeEndNE);

    }
    const resizeLeaveNE = (e) => {
        if (!resizableNE) return;
        window.addEventListener('mousemove',resizeNE);
        window.addEventListener('mouseup',resizeEndNE);
    }

    const resizeNE = (e) => {
        if (!resizableNE) return;
        if (e.screenX === 0) return;
        
        

        let newHeight = parseInt(initialHeight) + parseInt((initialPosY-e.clientY));
        let newWidth = parseInt(initialWidth) + parseInt((e.clientX - initialPosX));

        if (newHeight>=20 && bounds.getTop() < e.pageY-offsetTop) {
            resizableBox.current.style.top = `${e.pageY-offsetTop}px`;
            resizableBox.current.style.bottom = `${bottom-window.scrollY}px`;
            resizable.current.style.height = `${newHeight-2}px`;
        }
        
        if (newWidth>=20 && bounds.getRight() < document.documentElement.clientWidth-e.pageX-offsetRight) {
            resizableBox.current.style.left = `${left+window.scrollX}px`;
            resizableBox.current.style.right = `${document.documentElement.clientWidth-e.pageX-offsetRight}px`;
            resizable.current.style.width = `${newWidth-2}px`;
        }

        eventBus.dispatch('addtext');
      
    }

    //RESIZE NORTH-WEST

    const initialNW = (e) => {
        
        setOffsetLeft(e.clientX-resizableBox.current.getBoundingClientRect().left);
        setOffsetTop(e.clientY-resizableBox.current.getBoundingClientRect().top);
        setOffsetRight(resizableBox.current.getBoundingClientRect().right-e.clientX);
        setOffsetBottom(resizableBox.current.getBoundingClientRect().bottom-e.clientY);
        setInitialPosX(e.clientX);
        setInitialPosY(e.clientY);
        setInitialHeight(resizable.current.offsetHeight);
        setInitialWidth(resizable.current.offsetWidth);
        setLeft(resizableBox.current.getBoundingClientRect().left);
        setRight(document.documentElement.clientWidth-resizableBox.current.getBoundingClientRect().right);
        setTop(resizableBox.current.getBoundingClientRect().top);
        setBottom(document.documentElement.clientHeight-resizableBox.current.getBoundingClientRect().bottom);
        setResizableNW(true);
        
    }

    const resizeEndNW = (e) => {
        setResizableNW(false);
        window.removeEventListener('mousemove',resizeNW);
        window.removeEventListener('mouseup',resizeEndNW);
    }

    const resizeEnterNW = (e) => {
        if(!resizableNW) return;
        window.removeEventListener('mousemove',resizeNW);
        window.removeEventListener('mouseup',resizeEndNW);

    }
    const resizeLeaveNW = (e) => {
        if (!resizableNW) return;
        window.addEventListener('mousemove',resizeNW);
        window.addEventListener('mouseup',resizeEndNW);
    }

    const resizeNW = (e) => {
        if (!resizableNW) return;
        if (e.screenX === 0) return;
        
        

        let newHeight = parseInt(initialHeight) + parseInt((initialPosY-e.clientY));
        let newWidth = parseInt(initialWidth) + parseInt((initialPosX-e.clientX));

        if (newHeight>=20 && bounds.getTop() < e.pageY-offsetTop) {
            resizableBox.current.style.top = `${e.pageY-offsetTop}px`;
            resizableBox.current.style.bottom = `${bottom-window.scrollY}px`;
            resizable.current.style.height = `${newHeight-2}px`;
        }

        if (newWidth>=20 && bounds.getLeft() < e.pageX-offsetLeft) {
            resizableBox.current.style.left = `${e.pageX-offsetLeft}px`;
            resizableBox.current.style.right = `${right-window.scrollX}px`;
            resizable.current.style.width = `${newWidth-2}px`;
        }

        eventBus.dispatch('addtext');
      
    }

    //RESIZE SOUTH-EAST

    const initialSE = (e) => {
        
        setOffsetLeft(e.clientX-resizableBox.current.getBoundingClientRect().left);
        setOffsetTop(e.clientY-resizableBox.current.getBoundingClientRect().top);
        setOffsetRight(resizableBox.current.getBoundingClientRect().right-e.clientX);
        setOffsetBottom(resizableBox.current.getBoundingClientRect().bottom-e.clientY);
        setInitialPosX(e.clientX);
        setInitialPosY(e.clientY);
        setInitialHeight(resizable.current.offsetHeight);
        setInitialWidth(resizable.current.offsetWidth);
        setLeft(resizableBox.current.getBoundingClientRect().left);
        setRight(document.documentElement.clientWidth-resizableBox.current.getBoundingClientRect().right);
        setTop(resizableBox.current.getBoundingClientRect().top);
        setBottom(document.documentElement.clientHeight-resizableBox.current.getBoundingClientRect().bottom);
        setResizableSE(true);
        
    }

    const resizeEndSE = (e) => {
        setResizableSE(false);
        window.removeEventListener('mousemove',resizeSE);
        window.removeEventListener('mouseup',resizeEndSE);
    }

    const resizeEnterSE = (e) => {
        if(!resizableSE) return;
        window.removeEventListener('mousemove',resizeSE);
        window.removeEventListener('mouseup',resizeEndSE);

    }
    const resizeLeaveSE = (e) => {
        if (!resizableSE) return;
        window.addEventListener('mousemove',resizeSE);
        window.addEventListener('mouseup',resizeEndSE);
    }

    const resizeSE = (e) => {
        if (!resizableSE) return;
        if (e.screenX === 0) return;
        
        

        let newHeight = parseInt(initialHeight) + parseInt((e.clientY-initialPosY));
        let newWidth = parseInt(initialWidth) + parseInt((e.clientX - initialPosX));
        
        if (newHeight>=20 && bounds.getBottom() < document.documentElement.clientHeight-e.pageY-offsetBottom) {
            resizableBox.current.style.top = `${top+window.scrollY}px`;
            resizableBox.current.style.bottom = `${document.documentElement.clientHeight-e.pageY-offsetBottom}px`;
            resizable.current.style.height = `${newHeight-2}px`;
        }

        if (newWidth>=20 && bounds.getRight() < document.documentElement.clientWidth-e.pageX-offsetRight) {
            resizableBox.current.style.left = `${left+window.scrollX}px`;
            resizableBox.current.style.right = `${document.documentElement.clientWidth-e.pageX-offsetRight}px`;
            resizable.current.style.width = `${newWidth-2}px`;
        }

        eventBus.dispatch('addtext');
      
    }

    //RESIZE SOUTH-WEST

    const initialSW = (e) => {
        
        setOffsetLeft(e.clientX-resizableBox.current.getBoundingClientRect().left);
        setOffsetTop(e.clientY-resizableBox.current.getBoundingClientRect().top);
        setOffsetRight(resizableBox.current.getBoundingClientRect().right-e.clientX);
        setOffsetBottom(resizableBox.current.getBoundingClientRect().bottom-e.clientY);
        setInitialPosX(e.clientX);
        setInitialPosY(e.clientY);
        setInitialHeight(resizable.current.offsetHeight);
        setInitialWidth(resizable.current.offsetWidth);
        setLeft(resizableBox.current.getBoundingClientRect().left);
        setRight(document.documentElement.clientWidth-resizableBox.current.getBoundingClientRect().right);
        setTop(resizableBox.current.getBoundingClientRect().top);
        setBottom(document.documentElement.clientHeight-resizableBox.current.getBoundingClientRect().bottom);
        setResizableSW(true);
        
    }

    const resizeEndSW = (e) => {
        setResizableSW(false);
        window.removeEventListener('mousemove',resizeSW);
        window.removeEventListener('mouseup',resizeEndSW);
    }

    const resizeEnterSW = (e) => {
        if(!resizableSW) return;
        window.removeEventListener('mousemove',resizeSW);
        window.removeEventListener('mouseup',resizeEndSW);

    }
    const resizeLeaveSW = (e) => {
        if (!resizableSW) return;
        window.addEventListener('mousemove',resizeSW);
        window.addEventListener('mouseup',resizeEndSW);
    }

    const resizeSW = (e) => {
        if(!resizableSW) return;
        if (e.screenX === 0) return;
        
        

        let newHeight = parseInt(initialHeight) + parseInt((e.clientY-initialPosY));
        let newWidth = parseInt(initialWidth) + parseInt((initialPosX-e.clientX));

        if (newHeight>=20 && bounds.getBottom() < document.documentElement.clientHeight-e.pageY-offsetBottom) {
            resizableBox.current.style.top = `${top+window.scrollY}px`;
            resizableBox.current.style.bottom = `${document.documentElement.clientHeight-e.pageY-offsetBottom}px`;
            resizable.current.style.height = `${newHeight-2}px`;
        }

        if (newWidth>=20 && bounds.getLeft() < e.pageX-offsetLeft) {
            resizableBox.current.style.left = `${e.pageX-offsetLeft}px`;
            resizableBox.current.style.right = `${right-window.scrollX}px`;
            resizable.current.style.width = `${newWidth-2}px`;
        }

        eventBus.dispatch('addtext');
      
    }
    return(
        <div className = 'Block' id = {id} ref={resizableBox}>
            <div id = 'DraggableNW'
                onMouseDown = {initialNW} 
                onMouseMove = {resizeNW}
                onMouseUp   = {resizeEndNW}
                onMouseLeave= {resizeLeaveNW}
                onMouseEnter= {resizeEnterNW}
            />
            <div id = 'DraggableN'
                onMouseDown = {initialN} 
                onMouseMove = {resizeN}
                onMouseUp   = {resizeEndN}
                onMouseLeave= {resizeLeaveN}
                onMouseEnter= {resizeEnterN}
            />
            <div id = 'DraggableNE'
                onMouseDown = {initialNE} 
                onMouseMove = {resizeNE}
                onMouseUp   = {resizeEndNE}
                onMouseLeave= {resizeLeaveNE}
                onMouseEnter= {resizeEnterNE}
            />
            <div id = 'DraggableW'
                onMouseDown = {initialW} 
                onMouseMove = {resizeW}
                onMouseUp   = {resizeEndW}
                onMouseLeave= {resizeLeaveW}
                onMouseEnter= {resizeEnterW}
            />
            <div id ='Resizable' 
                onMouseDown = {initialDrag}
                onMouseMove = {drag}
                onMouseUp   = {dragEnd}
                onMouseLeave= {dragLeave}
                onMouseEnter= {dragEnter}
                ref={resizable}
            ></div>
            <div id = 'DraggableE'
                onMouseDown = {initialE} 
                onMouseMove = {resizeE}
                onMouseUp   = {resizeEndE}
                onMouseLeave= {resizeLeaveE}
                onMouseEnter= {resizeEnterE}
            />
            <div id = 'DraggableSW'
                onMouseDown = {initialSW} 
                onMouseMove = {resizeSW}
                onMouseUp   = {resizeEndSW}
                onMouseLeave= {resizeLeaveSW}
                onMouseEnter= {resizeEnterSW}
            />
            <div id = 'DraggableS'
                onMouseDown = {initialS} 
                onMouseMove = {resizeS}
                onMouseUp   = {resizeEndS}
                onMouseLeave= {resizeLeaveS}
                onMouseEnter= {resizeEnterS}
            />
            <div id = 'DraggableSE'
                onMouseDown = {initialSE} 
                onMouseMove = {resizeSE}
                onMouseUp   = {resizeEndSE}
                onMouseLeave= {resizeLeaveSE}
                onMouseEnter= {resizeEnterSE}
            />
        </div>
    )
};