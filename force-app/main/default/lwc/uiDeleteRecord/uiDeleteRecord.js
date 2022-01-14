import { LightningElement, track } from 'lwc';
import { deleteRecord, updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getOpportunities from '@salesforce/apex/OpportunityController.fetchOpportunities';
export default class UiDeleteRecord extends LightningElement
{
    @track listOfOpportunities;

    connectedCallback()
    {
        getOpportunities()
            .then(opps =>
            {
                this.listOfOpportunities = opps;
            })
            .catch(error =>
            {
                console.log(JSON.stringify(error));
            })
    }

    deleteOpportunity = (event) =>
    {
        const deleteId = event.target.value;
        console.log(deleteId);
        deleteRecord(deleteId)
            .then(() =>
            {
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: `Opportunity record with id ${ deleteId } has been deleted`,
                    variant: 'success',
                    mode: 'sticky'
                }));
                for (let opp of this.listOfOpportunities) {
                    if (opp.Id == deleteId) {
                        this.listOfOpportunities.splice(opp, 1);
                    }
                }
            })
            .catch(error =>
            {
                console.log(error);
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error',
                    message: 'Error',
                    variant: 'error'
            }))
        })
    }

}