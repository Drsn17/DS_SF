import { LightningElement } from 'lwc';

export default class UseCaseGoogleMap extends LightningElement {

    mapOptions = {
        draggable : false,
        disableDefualtUI : true
    }
    markers = [
        {
            location : {
                city : 'Mumbai',
                State : 'Maharastra'
            },
            value: 'location001',
            title: 'The Landmark Building',
            description: 'The Landmark is considered to be one of the city&#39;s most architecturally distinct and historic properties', //escape the apostrophe in the string using &#39;
            icon: 'standard:account'
        },
        {
            location : {
                city : 'Delhi',
                State : 'Delhi'
            }
        },
        {
            location : {
                city : 'Almora',
                State : 'Uttarakhand'
            }
        }
    ]
    
}