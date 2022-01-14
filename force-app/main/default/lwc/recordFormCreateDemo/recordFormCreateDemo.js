import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';

import FirstName_FIELD from '@salesforce/schema/Contact.FirstName';
import LastName_FIELD from '@salesforce/schema/Contact.LastName';
import Phone_FIELD from '@salesforce/schema/Contact.Phone';


export default class RecordFormCreateDemo extends LightningElement {

    field = [NAME_FIELD, INDUSTRY_FIELD, REVENUE_FIELD];
    conField = [FirstName_FIELD, LastName_FIELD, Phone_FIELD];
    ObjectName = 'Contact';

    handleSubmit = (event) => {
        event.preventDefault();
        const fields = event.detail.fields;
        fields.website = 'www.text.com';
        this.template.querySelector('lightning-record-form').submit(fields);
    }

    handleSuccess = (event) =>{
        console.log(JSON.stringify(event.detail));
        this.dispatchEvent(new ShowToastEvent({
            title : 'Record Saved Successfully',
            message :` A record Id: ${ event.detail.id } Successfully Created`,
            varient : 'SUCCESS',
            mode : 'sticky'
        }));
    }
}