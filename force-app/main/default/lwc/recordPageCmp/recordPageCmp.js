import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RecordPageCmp extends LightningElement {
    @api objectApiName;
    @api recordId;

    handleToast = (event)=>{
        const toaster = new ShowToastEvent({
            title : 'Message from Saleforce',
            message : `You are in a ${ this.objectApiName } record and the id is ${ this.recordId}`,
            variant : 'warning',
            mode : 'sticky'
        });

        this.dispatchEvent(toaster);
    }

    value = 'inProgress';

    get options() {
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;

        const toaster = new ShowToastEvent({
            title : 'Message from Saleforce',
            message : `Selected value is : ${this.value}`,
            variant : 'warning',
            mode : 'sticky'
        });

        this.dispatchEvent(toaster);
    }

}