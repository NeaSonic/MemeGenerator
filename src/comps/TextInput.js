import React,{useEffect, useRef} from 'react';
import eventBus from '../eventbus/EventBus';

export default function TextInput(props){


    const id = `${props.id}--textbox`
    const resizableId = `${props.id}--box`
    const textbox = useRef(null);

    const rewriteText = () => {
        if (textbox.current.value !== null){
            eventBus.dispatch('addtext');
        }
    }

    const addText = (ctx,x,y) => {
        ctx.textAlign = "center";
        ctx.font="30px impact";
        ctx.fillStyle="white";
        ctx.fillText(textbox.current.value.toUpperCase(),x,y);
    }

    return (
        <input type="text" className="form--input" placeholder="Text" id={id} ref={textbox} onChange={rewriteText}/>
    )
}