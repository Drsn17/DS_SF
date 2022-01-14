import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccount';

const columns = [
    {
        label: 'Name', fieldName: 'Name', type: 'text', sortable: true
    }, {
        label: 'Phone', fieldName: 'Phone', type: 'phone'
    }, {
        label: 'Industry', fieldName: 'Industry', type: 'text', sortable: true
    }, {
        label: 'AnnualRevenue', fieldName: 'AnnualRevenue', type: 'text', sortable: true
    }
]

export default class UseCaseCSV extends LightningElement {
    accountColumns = columns;
    accounts;

   connectedCallback(){
        getAccounts().then(response => {
            this.accounts = response
        })
        .catch(error =>{
            console.log('error--'+error.message);
        })
    } 
    

    handleDownload = () =>{
        let rowEnd = '\n';
        let csvString = '';
        let rowData = new Set();

        //Get all the key associated with all the records
        this.accounts.forEach((account) => {
            Object.keys(account).forEach(key =>{
                rowData.add(key);
            })
        })

        //Array.from() take the set/iterable and transform into an array
        rowData = Array.from(rowData);

        //Genarte CSV string for the fields 
        csvString += rowData.join(',');
        csvString += rowEnd;

        console.log('csvString---'+csvString);

        for(let i=0; i < this.accounts.length; i++){
            let colValue = 0;
            for(let key of rowData){
                //To check if it is the first column
                if(colValue > 0){
                    csvString += ',';
                }
                let value = this.accounts[i][key] === undefined ? '' : this.accounts[i][key];
                csvString += `"${value}"`;
                colValue++; 
            }
            csvString += rowEnd;
            //console.log(csvString);
        }
        console.log(csvString);
        //create one anchor tag dynamically
        let downloadElement = document.createElement('a');

        //setting the downloadable link with uri
        downloadElement.href = 'data:text/csv;charset=utf-8' + encodeURI(csvString);

        //setting the target, so that it remains in the current page
        downloadElement.target = '_self';

        //setting the downloadble file
        downloadElement.download = 'AccountData.csv';

        //click this link dunamically
        downloadElement.click();


    }
}