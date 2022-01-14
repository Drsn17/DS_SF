import { LightningElement, wire } from 'lwc';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class UiGetPicklistValuesByRecordType extends LightningElement {
    industryValue;
    typeValue;
    accountIndustryValues;
    accountTypeValues;

    @wire(getPicklistValuesByRecordType, {objectApiName: ACCOUNT_OBJECT, recordTypeId: '0122w000000JVyf'})
    accountPickList({ data, error })
    {
        console.log('Calling');
        if(data){
            console.log('If---');
            console.log(JSON.parse(JSON.stringify(data)));
            console.log('Picklist Values---'+JSON.stringify(data.picklistFieldValues.Industry.values));
            this.accountIndustryValues = data.picklistFieldValues.Industry.values;
            this.accountTypeValues =  data.picklistFieldValues.Type.values;
            console.log('this.accountIndustryValues---'+this.accountIndustryValues);
        }
        else if(error){
            console.log('Else---');
            console.log('Error---'+error);

        }
        console.log('accountIndustryValues---'+this.accountIndustryValues);
        console.log('Finnaly---');
    }

    handleChange = (event)=>{
        if(event.target.name === 'Industry'){
            //event.detail.name
            console.log('event.target.Value---'+event.target.Value);
            this.industryValue = event.detail.value;

        }
        else if(event.target.name === 'Type'){
            console.log('event.target.Value---'+event.target.Value);
            this.typeValue = event.detail.value;

        }
    }



}