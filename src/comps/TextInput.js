import React,{useRef} from 'react';
import eventBus from '../eventbus/EventBus';

export default function TextInput(props){


    //creat unique id for the textbox
    const id = `${props.id}--textbox`
    const textbox = useRef(null);

    //dispatch event whenver text value is changed
    const rewriteText = () => {
        if (textbox.current.value !== null){
            eventBus.dispatch('addtext');
        }
    }

    //pressing enter removes the input from the document(i found out about this by mistake, didn't even know it was a thing)
    const preventDefaultBehaviour = (e) => {
        if (e.which === 13) e.preventDefault();
    }

    //dispatch event to remove the resizable/textbox pair
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