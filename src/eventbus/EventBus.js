//this is something I wanted to use until I found out React doesn't work very well with custom events, and I'm just using it to dispatch events now.


const eventBus = {


    on(event,callback){
        document.addEventListener(event, (e) => callback(e.detail));
    },
    dispatch(event,data){
        document.dispatchEvent(new CustomEvent(event,{detail: data}));
    },
    remove(event,callback){
        document.removeEventListener(event,callback);
    }
}

export default eventBus;
