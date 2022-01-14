import { LightningElement, api } from 'lwc';

export default class RecordCardView extends LightningElement {
    @api listOfRecords;
    @api selectedObject;
    selectedRecordId;
    


    onPreview(event) {
        //Get the recordId of clicked preview card..
        //this.selectedRecordId = event.target.Id;
    }
}