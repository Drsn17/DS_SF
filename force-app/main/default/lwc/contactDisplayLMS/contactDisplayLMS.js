import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import contactObjectComm from '@salesforce/messageChannel/contactObjectComm__c';

export default class ContactDisplayLMS extends LightningElement {

    @wire(MessageContext)
    MessageContext;

    contactObjList;

    connectedCallback(){
        console.log('ConnectedCall back of Subscriber');
        this.subscribeMessageChannel();
    }

    subscribeMessageChannel =()=>{
        subscribe(this.MessageContext, contactObjectComm, (message)=>{
            console.log(message);
            this.contactObjList = message.contactObject;
            console.log(this.contactObjList);
        })
    }


}