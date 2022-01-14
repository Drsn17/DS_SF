import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';


export default class UiGetList extends LightningElement {

    pageToken = null;
    nextPageToken = null;
    previousPageToken = null;
    records;

    @wire(getListUi, {objectApiName: CONTACT_OBJECT, listViewApiName: 'AllContacts', pageSize: 1, pageToken : '$pageToken'})
    listView({data, error}){
        if(data){
            console.log(JSON.parse(JSON.stringify(data)));
            console.log(JSON.stringify(data));

            this.records = data.records.records;
            this.nextPageToken = data.records.nextPageToken;
            this.previousPageToken = data.records.previousPageToken;

        }
        if(error){
            console.log('Error---'+error.message);
        }
    }

    handleNext = () =>{
        this.pageToken = this.nextPageToken;
    }

    handlePrevious = () =>{
        this.pageToken = this.previousPageToken;
    }
}