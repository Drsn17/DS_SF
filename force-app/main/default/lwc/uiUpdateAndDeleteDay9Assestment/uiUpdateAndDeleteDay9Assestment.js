import { LightningElement, track } from 'lwc';
import { deleteRecord, updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getOpportunities from '@salesforce/apex/OpportunityController.fetchOpportunities';

export default class UiUpdateAndDeleteDay9Assestment extends LightningElement {
    @track listOfOpportunities;
    name;
    stage;
    type;

    connectedCallback()
    {
        getOpportunities()
            .then(opps =>
            {
                console.log('IN----');
                this.listOfOpportunities = opps;
            })
            .catch(error =>
            {
                console.log('Error IN');
                console.log(JSON.stringify(error));
            })
    }

    handleChange=(event) =>{
        let inputName = event.target.name;
        let inputVal = event.detail.value;

        if(inputName ==='name'){
            this.name = inputVal;
        }
        else  if(inputName ==='stage'){
            this.stage = inputVal;
        }
        else  if(inputName ==='type'){
            this.type = inputVal;
        }
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

    updateOpportunity = (event) =>{
        const oppId = event.target.value;
        console.log('oppId--'+oppId);

        const fields= {'Name' : this.name, 'Type' : this.type, 'StageName' : this.stage};


    }
}