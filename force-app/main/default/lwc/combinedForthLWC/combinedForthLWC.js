import { LightningElement, track } from 'lwc';

export default class CombinedForthLWC extends LightningElement {

    @track trainess = [{
        id: 1,
        Name: 'Akash',
        Dept: "Sfdc",
        Age: 30
    },
    {
        id: 2,
        Name: 'Prakash',
        Dept: "Sfdc",
        Age: 30
    },
    {
        id: 3,
        Name: 'Amit',
        Dept: "Sfdc",
        Age: 30
    },
    {
        id: 4,
        Name: 'Ajay',
        Dept: "Sfdc",
        Age: 30
    }
        
    ]

    @track showtable = false;

    handleshowtable =(event) =>{
        this.showtable = !this.showtable ;
        const ctrlBtn = this.template.querySelector('.ctrl-btn');
        const outputText = this.template.querySelector('.output-text');

        if(this.showtable){
            ctrlBtn.textContent = 'Hide Date';
            outputText.textContent = 'Click on the button to hide the data';

        }
        else{
            ctrlBtn.textContent = 'Show Date';
            outputText.textContent = 'Click on the button to show the data';
        }
    }
}