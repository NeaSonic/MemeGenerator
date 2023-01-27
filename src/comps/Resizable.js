import React,{useState} from "react";

export default function Resizable(){
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
        
        let resizable = document.getElementById('Resizable');
        let test = document.getElementById('test');
        
        setOffsetLeft(e.clientX-test.getBoundingClientRect().left);
        setOffsetTop(e.clientY-test.getBoundingClientRect().top);
        setOffsetRight(test.getBoundingClientRect().right-e.clientX);
        setOffsetBottom(test.getBoundingClientRect().bottom-e.clientY);
        setInitialPosX(e.clientX);
        setInitialPosY(e.clientY);
        setInitialHeight(resizable.offsetHeight);
        setInitialWidth(resizable.offsetWidth);
        setLeft(test.getBoundingClientRect().left);
        setRight(document.documentElement.clientWidth-test.getBoundingClientRect().right);
        setTop(test.getBoundingClientRect().top);
        setBottom(document.documentElement.clientHeight-test.getBoundingClientRect().bottom);
    }


    const drag = (e) => {
        if (e.screenX ===0) return;

        let test = document.getElementById('test');
        
        test.style.left = `${e.pageX-offsetLeft}px`;
        test.style.top = `${e.pageY-offsetTop}px`;
        test.style.right = `${document.documentElement.clientWidth-e.pageX-offsetRight}px`;
        test.style.bottom = `${document.documentElement.clientHeight-e.pageY-offsetBottom}px`;
        
    }
    const dragEnd = (e) => {
        console.log("right:"+test.style.right+" left:"+test.style.left+" top:"+test.style.top+" bottom:"+test.style.bottom);
    }
    
    const resizeE = (e) => {
        if (e.screenX === 0) return;
        
        let test = document.getElementById('test');
        let resizable = document.getElementById('Resizable');
        
        let newSize = parseInt(initialWidth) + parseInt((e.clientX - initialPosX));

        if (newSize<20) return;

        test.style.left = `${left}px`;
        test.style.right = `${document.documentElement.clientWidth-e.pageX-offsetRight}px`;

        resizable.style.width = `${newSize-2}px`;
        
    }
    const resizeW = (e) => {
        if (e.screenX === 0) return;
        
        let test = document.getElementById('test');
        let resizable = document.getElementById('Resizable');

        let newSize = parseInt(initialWidth) + parseInt((initialPosX - e.clientX));

        if (newSize<20) return;

        test.style.left = `${e.pageX-offsetLeft}px`;
        test.style.right = `${right}px`;

        resizable.style.width = `${newSize-2}px`;
        
    }
    const resizeN = (e) => {
        if (e.screenX === 0) return;

        let test = document.getElementById('test');
        let resizable = document.getElementById('Resizable');

        let newSize = parseInt(initialHeight) + parseInt((initialPosY-e.clientY));

        if (newSize<20) return;
        
        test.style.top = `${e.pageY-offsetTop}px`;
        test.style.bottom = `${bottom}px`;

        resizable.style.height = `${newSize-2}px`;
        
    }
    const resizeS = (e) => {
        if (e.screenX === 0) return;

        let test = document.getElementById('test');
        let resizable = document.getElementById('Resizable');

        let newSize = parseInt(initialHeight) + parseInt((e.clientY-initialPosY));

        if (newSize<20) return;

        test.style.top = `${top}px`;
        test.style.bottom = `${document.documentElement.clientHeight-e.pageY-offsetBottom}px`;

        resizable.style.height = `${newSize-2}px`;
        
      
    }
    const resizeNE = (e) => {
        if (e.screenX === 0) return;
        
        let resizable = document.getElementById('Resizable');
        let test = document.getElementById('test');

        let newHeight = parseInt(initialHeight) + parseInt((initialPosY-e.clientY));
        let newWidth = parseInt(initialWidth) + parseInt((e.clientX - initialPosX));

        if (newHeight>=20) {
            test.style.top = `${e.pageY-offsetTop}px`;
            test.style.bottom = `${bottom}px`;
            resizable.style.height = `${newHeight-2}px`;
        }
        
        if (newWidth>=20) {
            test.style.left = `${left}px`;
            test.style.right = `${document.documentElement.clientWidth-e.pageX-offsetRight}px`;
            resizable.style.width = `${newWidth-2}px`;
        }
      
    }
    const resizeNW = (e) => {
        if (e.screenX === 0) return;
        
        let resizable = document.getElementById('Resizable');
        let test = document.getElementById('test');

        let newHeight = parseInt(initialHeight) + parseInt((initialPosY-e.clientY));
        let newWidth = parseInt(initialWidth) + parseInt((initialPosX-e.clientX));

        if (newHeight>=20) {
            test.style.top = `${e.pageY-offsetTop}px`;
            test.style.bottom = `${bottom}px`;
            resizable.style.height = `${newHeight-2}px`;
        }

        if (newWidth>=20) {
            test.style.left = `${e.pageX-offsetLeft}px`;
            test.style.right = `${right}px`;
            resizable.style.width = `${newWidth-2}px`;
        }
      
    }
    const resizeSE = (e) => {
        if (e.screenX === 0) return;
        
        let resizable = document.getElementById('Resizable');
        let test = document.getElementById('test');

        let newHeight = parseInt(initialHeight) + parseInt((e.clientY-initialPosY));
        let newWidth = parseInt(initialWidth) + parseInt((e.clientX - initialPosX));
        
        if (newHeight>=20) {
            test.style.top = `${top}px`;
            test.style.bottom = `${document.documentElement.clientHeight-e.pageY-offsetBottom}px`;
            resizable.style.height = `${newHeight-2}px`;
        }

        if (newWidth>=20) {
            test.style.left = `${left}px`;
            test.style.right = `${document.documentElement.clientWidth-e.pageX-offsetRight}px`;
            resizable.style.width = `${newWidth-2}px`;
        }
      
    }
    const resizeSW = (e) => {
        if (e.screenX === 0) return;
        
        let resizable = document.getElementById('Resizable');
        let test = document.getElementById('test');

        let newHeight = parseInt(initialHeight) + parseInt((e.clientY-initialPosY));
        let newWidth = parseInt(initialWidth) + parseInt((initialPosX-e.clientX));

        if (newHeight>=20) {
            test.style.top = `${top}px`;
            test.style.bottom = `${document.documentElement.clientHeight-e.pageY-offsetBottom}px`;
            resizable.style.height = `${newHeight-2}px`;
        }

        if (newWidth>=20) {
            test.style.left = `${e.pageX-offsetLeft}px`;
            test.style.right = `${right}px`;
            resizable.style.width = `${newWidth-2}px`;
        }
      
    }
    return(
        <div className = 'Block' id ='test'>
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
            <div id ='Resizable' onDragStart={initial} onDrag={drag} onDragEnd={dragEnd}/>
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