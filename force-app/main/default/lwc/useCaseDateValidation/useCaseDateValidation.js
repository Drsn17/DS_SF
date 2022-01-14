import { LightningElement } from 'lwc';

const todayDate = new Date(2021, 7, 1);

export default class UseCaseDateValidation extends LightningElement {
    dateError = false;
    errorMessage;
    startDate;
    endDate;

    handleChange =(event) =>{
        let dateType = event.target.name;
        if(dateType === 'startDate'){
            this.startDate = event.target.value;
        }
        else  if(dateType === 'endDate'){
            this.endDate = event.target.value;
        }
        if(this.startDate && this.startDate > this.endDate){
            console.log('Start Date can not ne greater then End Date');
            this.dateError = true;
            this.errorMessage = 'Start Date can not ne greater then End Date'; 
         }
         else{
             this.dateError = false;
         }
         
         console.log('todayDate---'+todayDate);
         console.log('this.startDate---'+new Date(this.startDate));

         if(new Date(this.startDate) < todayDate){
            console.log('Start Date can not less then today');
            this.dateError = true;
            this.errorMessage = 'Start Date can not less then today'; 
         }
    }
}