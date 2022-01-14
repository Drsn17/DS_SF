import { LightningElement, track, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import releatedFiles from '@salesforce/apex/FileUploadAndView_LWC_Controller.releatedFiles';
import getlibrariesFile from '@salesforce/apex/FileUploadAndView_LWC_Controller.libraries_Apex_2';


const columns = [
    {label: 'Title', fieldName: 'Title'}
];

export default class FileUpload extends LightningElement {

@track columns = columns;
@track data;
@track librariesData = []; 
@track isModalOpen = false;
@api recordId;
@track isLibariesValues = false;
@track isLibariesData = true;

connectedCallback() {
    this.getRelatedFiles();
}



    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
        this.getRelatedFiles();
    
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }

    OpenLibrariesMethod(){
        console.log('OpenLibrariesMethod click');
        this.isLibariesValues = true;
        this.isLibariesData = false;
        console.log('this.isLibariesData ---'+this.isLibariesData );
    }

    onLiabriesBack(){
        this.isLibariesValues = false;
        this.isLibariesData = true;
        console.log('this.isLibariesValues ---'+this.isLibariesValues );
    }

    // Getting releated files of the current record
    getRelatedFiles() {
        releatedFiles({idParent: '0012w00000AUnB3AAL'})
        .then(data => {
            console.log('DS-----'+JSON.stringify(data));
            this.data = data;
            console.log('DS-123----'+JSON.stringify(this.data));
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error!!',
                    message: error.message,
                    variant: 'error',
                }),
            );
        });
    }
    

    // Getting selected rows to perform any action
    getSelectedRecords(event) {
        let conDocIds;
        const selectedRows = event.detail.selectedRows;
        conDocIds = new Set();
        // Display that fieldName of the selected rows
        for (let i = 0; i < selectedRows.length; i++){
            conDocIds.add(selectedRows[i].ContentDocumentId);
        }

        this.selectedRecords = Array.from(conDocIds).join(',');

        window.console.log('selectedRecords =====> '+this.selectedRecords);
    }
    
    get acceptedFormats() {
        return ['.pdf', '.png','.jpg','.jpeg','.json'];
    }
    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        let uploadedFileNames = '';
        for(let i = 0; i < uploadedFiles.length; i++) {
            uploadedFileNames += uploadedFiles[i].name + ', ';
        }
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: uploadedFiles.length + ' Files uploaded Successfully: ' + uploadedFileNames,
                variant: 'success',
            }),
        );
        this.isModalOpen = false;

    }

     // Getting releated files of the current record

     @wire(getlibrariesFile)
     librariesFile({data, error}) {
         console.log('ABC');
         //this.librariesData = data;
         for(let key in data) {
            // Preventing unexcepted data
           console.log('Key1---'+key);
            if (data.hasOwnProperty(key)) { // Filtering the data in the loop
                this.librariesData.push({value:data[key], key:key});
            }
            else if(error) {
                window.console.log('error---'+error);
            } 
        }
    }
}