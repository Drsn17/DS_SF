import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import sample from '@salesforce/resourceUrl/samplejs';

export default class UseExternalJS extends LightningElement {

    elements;
    moreElements;
    connectedCallback(){
        loadScript(this, sample + '/sample.js').then(() =>{
            console.log('Loaded JS');
            this.elements = samplejs.getList();
            this.moreElements = samplejs.getAnotherList();
            console.log(this.moreElements);
        })
    }
    
}