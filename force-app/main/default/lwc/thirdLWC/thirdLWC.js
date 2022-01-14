import { LightningElement, track } from 'lwc';

export default class ThirdLWC extends LightningElement {

    @track stateObj = [{
        id : 12,
        Name : 'Ajay',
        Age : 35
        },

        {
            id : 13,
            Name : 'Amit',
            Age : 34
        },
        {
            id : 14,
            Name: 'Akshay',
            Age: 45
        }     

    ];

}