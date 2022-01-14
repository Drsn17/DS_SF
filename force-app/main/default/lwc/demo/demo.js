import { LightningElement, track } from 'lwc';

export default class Demo extends LightningElement {
    @track randomText = 'First LWC Para';
    @track isShown = false;
    @track ArrayString = ['Java', 'Apex', 'CSS', 'JS'];
    @track loadValue = 'Click on the button to see the data';
    @track buttonLabel = 'Show Data';
    @track randomdata;


    handleText = () =>{
        console.log("Clicked!");
        this.randomText = 'LWC reactivity demo';
        this.isShown = true;

    }

    trackChange = (event) =>{
        console.log(event.target.value);
        this.randomText = event.target.value;
        
    }

    randomDataFun = () =>{

    console.log('randomDataFun');
    console.log('randomDataFun1');
    let random1 = Math.floor(Math.random() * this.ArrayString.length);
    console.log('randomDataFun3');
    console.log('random1---'+random1);
    this.randomdata = this.ArrayString[random1];
    console.log('randomdata---'+randomdata);
    }

    showData = ()=>{
        if(this.buttonLabel == 'Hide Data'){
            this.buttonLabel = 'Show Data';
            this.loadValue = 'Click on the button to see the data';
        }
        else if(this.buttonLabel = 'Show Data'){
            this.buttonLabel = 'Hide Data';
            this.loadValue = 'Click on the button to hide data';
        }
        
    }


}