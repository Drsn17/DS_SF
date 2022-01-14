import { LightningElement, wire, track, api } from 'lwc';
import getAccountList from '@salesforce/apex/AccountHelper.getAccountList';


//export default class DataTableDemoLWC extends LightningElement {}
    
    const data = [
        { id: 1, name: 'Billy Simonns', age: 40, email: 'billy@salesforce.com' },
        { id: 2, name: 'Kelsey Denesik', age: 35, email: 'kelsey@salesforce.com' },
        { id: 3, name: 'Kyle Ruecker', age: 50, email: 'kyle@salesforce.com' },
        {
            id: 4,
            name: 'Krystina Kerluke',
            age: 37,
            email: 'krystina@salesforce.com',
        },
    ];
    
  /*  const columns = [
        { label: 'Name', fieldName: 'name' },
        {
            label: 'Age',
            fieldName: 'age',
            type: 'number',
            sortable: true,
            cellAttributes: { alignment: 'left' },
        }, 
        { label: 'Email', fieldName: 'email', type: 'email' },
    ]; */

    const columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Type', fieldName: 'Type' },
        { label: 'Phone', fieldName: 'Phone', type:'Phone' },
        { label: 'Website', fieldName: 'Id', type: 'url',
            typeAttributes: {
                label:{
                    fieldName: 'Id'
                }
            }
            
        },
        
    ]; 
    
    export default class DataTableDemoLWC extends LightningElement {
        @api recordId;
        data = data;
        columns = columns;
        defaultSortDirection = 'asc';
        sortDirection = 'asc';
        sortedBy;

        @track accounts;
        @track error;
        @track data2;
        @wire(getAccountList, {recordId:'$recordId' })
        wiredAccounts({ error, data }) {
            if (data) {
                console.log('Data-----'+JSON.stringify(data));
                this.accounts = data;
                data.forEach(element => {
                    var abc;
                    console.log('element---'+JSON.stringify(element));
                    abc = element;
                    abc.Id = element.Id;
                    console.log('abc---'+JSON.stringify(abc));
                });
                this.data2 = data;
                
               // console.log('data1---'+JSON.stringify(data2));
            } else if (error) {
                console.log(error);
                this.error = error;
            }
        }
    
        // Used to sort the 'Age' column
        sortBy(field, reverse, primer) {
            const key = primer
                ? function(x) {
                      return primer(x[field]);
                  }
                : function(x) {
                      return x[field];
                  };
    
            return function(a, b) {
                a = key(a);
                b = key(b);
                return reverse * ((a > b) - (b > a));
            };
        }
    
        onHandleSort(event) {
            const { fieldName: sortedBy, sortDirection } = event.detail;
            const cloneData = [...this.data];
    
            cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
            this.data = cloneData;
            this.sortDirection = sortDirection;
            this.sortedBy = sortedBy;
        }
    }