import { api, LightningElement, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

const fields = [NAME_FIELD, PHONE_FIELD, INDUSTRY_FIELD];

export default class UiUpdateRecord extends LightningElement
{
    @api recordId;
    name;
    phone;
    industry;
    options;
    isValidate = true;

    @wire(getRecord, { recordId: '$recordId', fields })
    accRec({ data, error })
    {
        if (data) {
            this.name = getFieldValue(data, NAME_FIELD);
            this.phone = getFieldValue(data, PHONE_FIELD);
            this.industry = getFieldValue(data, INDUSTRY_FIELD);
        }
    }

    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: INDUSTRY_FIELD })
    industryValues({ data, error })
    {
        if (data) {
            this.options = data.values;
        }
        else {
            console.log('Error Fetching Picklist Values');
        }
    }

    handleChange = (event) =>
    {
        let inputName = event.target.name;
        let inputVal = event.detail.value;

        //custom Validation
        if(inputVal === null || inputVal == ''){
            event.target.setCustomValidity('This is required');
            this.isValidate = false;
        }
        else{
            event.target.setCustomValidity('');
            this.isValidate = true;
            if (inputName === 'name') {
                this.name = inputVal;
            } else if (inputName === 'phone') {
                this.phone = inputVal;
            } else if(inputName === 'industry'){
                this.industry = inputVal;
            }
        }

       
    }

    updateAccount = () =>
    {
        if(this.isValidate){
            const fields = { 'Id': this.recordId, 'Name': this.name, 'Phone': this.phone, 'Industry': this.industry };
        updateRecord({ fields })
            .then(account =>
        {
            console.log(JSON.parse(JSON.stringify(account)));
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                    message: `Account with id ${ account.id } updated successfully`,
                    variant: 'success',
                    mode: 'sticky'
            }))
            })
            .catch(error =>
        {
            console.log(JSON.parse(JSON.stringify(error)));
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: JSON.stringify(error.body.message),
                variant: 'error',
                mode: 'sticky'
            }))
        })
        }
        
    }
}