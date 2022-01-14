import { LightningElement } from 'lwc';
import { ShowToastEvent} from 'lightning/platformShowToastEvent';
import genarateAsPDF from '@salesforce/apex/DisplayRichTextController.genarateAsPDF';


export default class UseCasePDF extends LightningElement {

    textValue;
    allwedFormats = ['font', 'size', 'bold', 'list', 'image', 'color', 'table', 'background'];

    handleChange = (event) => {
        this.textValue = event.target.value;
    }

    saveAsPDF = () =>{
        genarateAsPDF({ textValue : this.textValue})
        .then(response => {
            this.attachmentId = response.Id;
            this.dispatchEvent(new ShowToastEvent({
                title : 'Success',
                message : `PDF Creating Successfully with Id ${ this.attachmentId }`,
                variant : 'SUCCESS'
            }))
        })
        .catch(error => {
            this.dispatchEvent(new ShowToastEvent({
                title : 'Error',
                message : `PDF Creating Error. ${error.body.message}`,
                variant : 'ERROR'
            }))
        })
    }

}