import { LightningElement, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class UiGetObjectInfo extends LightningElement {

    //Example for Apex
    //public static void getAccount(Id accountId, Id recordTypeId){}
    //wire(getAccount, {Id: '', Id: ''}) //hard code
    //wire(getAccount, {Id: '$recordId', Id : ''}) //bind the dynamic value

    @wire(getObjectInfo, { objectApiName : ACCOUNT_OBJECT})
    objectInfo; //value return : {data, error} //both are called as node

    get objectInfoStr(){
        if(this.objectInfo.data){
            return JSON.stringify(this.objectInfo.data);
        }
        else{
            return JSON.stringify(this.objectInfo.error);
        }
    }

    get renderedCallback(){
        console.log('renderedCallback');
        //console.log(JSON.parse(JSON.stringify(this.objectInfo.data)));
    }

    /*get connectedCallback(){
        console.log('connectedCallback');
        console.log(JSON.parse(JSON.stringify(this.objectInfo.data)));
    }*/

}