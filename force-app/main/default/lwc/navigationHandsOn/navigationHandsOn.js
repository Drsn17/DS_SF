import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NavigationHandsOn extends NavigationMixin(LightningElement) {

    sObjectName;
    modeValue = 'create';
    recordIdValue;
    listViewId;
    isNotCreated = false;
    idLabel = 'Enter Record Id';
    attributesvalue;
    isButton = false;

    get options() {
        return [
            { label: 'Create', value: 'create' },
            { label: 'View', value: 'view' },
            { label: 'Edit', value: 'edit' },
            { label: 'List View', value: 'listView' },
            { label: 'Releted View', value: 'reletedView' }
        ];
    }

    handleModeChange =(event) => {
        this.isButton = false;
        this.modeValue = event.detail.value;
        this.handleValueAssignment();
        
    }

    handleNavigation = (event) =>{
        this.isButton = true;

        let inputName = event.target.name;
        let inputVal = event.detail.value;

        if(inputName === 'sObjectName'){
            this.sObjectName = inputVal;
        }
        else if(inputName === 'ids'){
            this.listViewId = inputVal;
        }
        else if(inputName === 'modeValue'){
            this.modeValue = inputVal;
        }

        handleValueAssignment();

    }

    handleValueAssignment(){
        console.log('isButton---'+this.isButton);
        if(this.modeValue === 'create'){
            this.isNotCreated = false;
            if(this.isButton){
                this.attributesvalue = {
                    objectApiName: this.sObjectName,
                    actionName: 'create'
                }
            }
            
        }

        else if(this.modeValue === 'view'){
            this.isNotCreated = true;
            this.idLabel = 'Enter Record Id';
            if(this.isButton){
                this.attributesvalue = {
                    recordId: this.recordIdValue,
                    objectApiName: this.sObjectName,
                    actionName: 'view'
                }
            }
            
        }
        else if(this.modeValue === 'edit'){
            this.isNotCreated = true;
            this.idLabel = 'Enter Record Id';
            if(this.isButton){
                this.attributesvalue = {
                    recordId: this.recordIdValue,
                    objectApiName: this.sObjectName,
                    actionName: 'edit'
                }
            }
            
        }
        else if(this.modeValue === 'listView'){
            this.isNotCreated = true;
            this.idLabel = 'Enter List View Id';
            if(this.isButton){
                this.attributesvalue = {
                    recordId: this.recordIdValue,
                    objectApiName: this.sObjectName,
                    actionName: 'listview'
                }
            }
            
        }
        else if(this.modeValue === 'reletedView'){
            this.isNotCreated = true;
            this.idLabel = 'Enter Releted Id';
            if(this.isButton){
                this.attributesvalue = {
                    recordId: this.recordIdValue,
                    objectApiName: this.sObjectName,
                    actionName: 'reletedview'
                }
            }
           
        }
        if(this.isButton){
            //navigateToCreateEditView();
        }
    }
}