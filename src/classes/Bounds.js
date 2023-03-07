//Very simple class to store canvas bounds

export default class Bounds {

    #left;
    #right;
    #top;
    #bottom;

    constructor (left,right,top,bottom){
        this.#left = left;
        this.#right = right;
        this.#top = top;
        this.#bottom = bottom;
    }
    setLeft(left){
        this.#left = left;
    }
    setRight(right){
        this.#right = right;
    }
    setTop(top){
        this.#top = top;
    }
    setBottom(bottom){
        this.#bottom = bottom;
    }

    getLeft(){
        return this.#left;
    }
    getRight(){
        return this.#right;
    }
    getTop(){
        return this.#top
    }
    getBottom(){
        return this.#bottom;
    }
}