import React,{useRef} from 'react';
import eventBus from '../eventbus/EventBus';

export default function TextInput(props){


    const id = `${props.id}--textbox`
    const textbox = useRef(null);

    const rewriteText = () => {
        if (textbox.current.value !== null){
            eventBus.dispatch('addtext');
        }
    }

    const preventDefaultBehaviour = (e) => {
        if (e.which === 13) e.preventDefault();
    }

    const removeTextBox = (e) => {
        e.preventDefault();
        let data = {
            id:props.id,
        }
        eventBus.dispatch('removetextbox',data);
    }

    return (
        <div className="text--input--comp">
        <input type="text" className="form--input" placeholder={`TEXTBOX#${props.id}`} id={id} ref={textbox} onChange={rewriteText} onKeyDown={preventDefaultBehaviour} />
        <button className="form--button--removetextbox" onClick={removeTextBox} >X</button>
        </div>
    )
}