import { LightningElement, track } from 'lwc';

export default class ReactivityDemo extends LightningElement {
    //only for premitive type like : Number, String, Boolean etc from spring 20 release
    @track reactiveData = 'Hello this is Reactive data';
    //not for non premitove like array 
    @track technologies = ['Java', 'JS', 'JS', 'Aura'];

    handleClick = (event) => {
        this.reactiveData = 'Value has been changed';
    }

    handleArrayClick = (event) =>{
        this.technologies.push('LWC');
    }
}