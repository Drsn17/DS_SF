import { LightningElement } from 'lwc';

export default class GetterProperties extends LightningElement {
    number1;
    number2;
    handleChange =(event) =>{
        let inputVal = event.target.value;
        if(event.target.name === 'number1'){
            this.number1 = inputVal;
            console.log('number1--'+this.number1);
          
        }
        else if(event.target.name === 'number2'){
            this.number2 = inputVal;
            console.log('number2--'+this.number2);
        }
    }

    get sumOfTwo(){
        /*if(this.number1 && this.number2){
            console.log('number1--'+this.number1);
            console.log('number2--'+this.number2);
            //using the + we are converting the value from string to NUmber
            return +this.number1 + +this.number2;
        }
        console.log('Here....');
        return ''; */

        if(this.number1 && this.number2){
            if(!isNaN(this.number1) && !isNaN(this.number2)){
                return 'Total count of :' + (+this.number1 + +this.number2)
            }
            return 'Both value should be number';
        }
    }
}