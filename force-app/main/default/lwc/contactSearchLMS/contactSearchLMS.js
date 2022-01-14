import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.fetchFewContacts';
import { publish, MessageContext } from 'lightning/messageService';
import contactObjectComm from '@salesforce/messageChannel/contactObjectComm__c';


export default class ContactSearchLMS extends LightningElement {
    name;
    contactObjList;
    
    @wire(MessageContext)
    MessageContext;

    handleChange = (event) =>{
        this.name = event.target.value;
        console.log(this.name);
    }

    handleSearch = () =>{
        if(this.name){
            getContacts()
            .then(result => {
                this.contactObjList = result;
                console.log(this.contactObjList);
                const message ={ 
                    contactObject : result
                               }
                console.log(message);
                publish(this.MessageContext, contactObjectComm, message);
            })
            .catch(error => {
                //this.error = error;
                console.log('Error---'+error);
            });
        }
    }
}