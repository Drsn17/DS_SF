import { LightningElement } from 'lwc';
import getRecordList from '@salesforce/apex/RecordPreviewController.fetchRecordList';

export default class MainMiniProjectFSC extends LightningElement {
    selectedObject;
    selectedFields = [];
    accountFields = ['Name', 'Industry', 'Rating'];
    contactFields = ['Name', 'Phone', 'Email'];
    opportunityFields = ['Name', 'Stage'];
    leadFields = ['Name', 'Email', 'Phone'];
    caseFields = ['Status'];
    listOfRecords;
    callbackError;


    handleSelectedItem(event){
        this.selectedObject = event.detail;

        console.log(this.selectedObject);

        //Calling the apex to get the records for selected object...
        if(this.selectedObject) {
            //const selectedFields = switch-case;

            switch(this.selectedObject) { 
                case 'Account' : this.selectedFields = this.accountFields; 
                    break; 
                case 'Contact' : this.selectedFields = this.contactFields; 
                    break;
                case 'Opportunity' : this.selectedFields = this.opportunityFields;
                    break;
                case 'Lead' : this.selectedFields = this.leadFields;
                    break;
                case 'Case' : this.selectedFields = this.caseFields;
                    break; 
                default: this.selectedFields = null;
            }

            getRecordList({sobjectName : this.selectedObject, fields : JSON.stringify(this.selectedFields)})
                .then(result => {
                    this.listOfRecords = result;
                })
                .catch(error => {
                    console.log(error);
                    this.callbackError = error;
                });
        }
    }
}