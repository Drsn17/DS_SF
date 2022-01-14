import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import contactObjectComm from '@salesforce/messageChannel/contactObjectComm__c';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
];

export default class ContactDataTableLMS extends LightningElement {
    @wire(MessageContext)
    MessageContext;

    data = [];
    columns = columns;

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
            this.data = message.contactObject;
        })
    }
}