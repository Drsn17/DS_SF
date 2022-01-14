import { LightningElement, track } from 'lwc';

export default class SecondDemo extends LightningElement {
    @track name;
    @track age;
    @track origin;
    @track isShown = false;
    arrayOfText = ['Lightning', 'Aura', 'Salesforce', 'Apex', 'Java'];

    handleText = () =>{
        console.log(('Clicked!!'));
        this.isShown = !this.isShown;
        
        // Get value by class
       /* console.log('Name: '+this.template.querySelector('.name').value);
        this.name = this.template.querySelector('.name').value;
        this.age = this.template.querySelector('.age').value;
        this.origin = this.template.querySelector('.origin').value; */

        let elementlist = this.template.querySelectorAll('input');

       // let valueBYId = this.template.getElementById('ids');


       //get value by Name

       /*
        for(let el of elementlist){
            let inputval = el.value;

            if(el.name === 'name'){
                this.name = inputval;
            }
            else if(el.name === 'age'){
                this.age = inputval;
            }
            else if(el.name === 'origin'){
                this.origin = inputval;
            }
        }
        */

        //Switch Case


    }

    trackChange = (event) =>{
        console.log(event.taget.value);

        let inputVal = event.target.value;
        switch (event.target.name){
            case "name": this.name = inputVal;
            break;

            case "age": this.age = inputVal;
            break;

            case "origin": this.origin = inputVal;
            break;
            default:
        }
    }
}