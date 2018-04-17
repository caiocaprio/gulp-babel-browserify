import {Modal} from './component/modal.js';

class Main {
    constructor(){
        console.log('Hello Main.')
        this.modal = new Modal();
        this.metodo();
    }
    metodo(){        
        this.modal.metodo();
    }
}

var main = new Main();