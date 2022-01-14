import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import chartJS from '@salesforce/resourceUrl/chartJS';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class UseCaseChart extends LightningElement {

    @api chartConfig;
    chart;

    renderedCallback(){ 
        console.log('Under rendered');
        loadScript(this, chartJS).then(() =>{
            console.log('Under rendered2');
            const ctx = this.template.querySelector('.myChart').getContext('2d');
            console.log('Under rendered3');
            console.log('ctx----'+ctx);
            console.log(JSON.stringify(this.chartConfig));
            this.chart = new window.Chart(ctx, JSON.parse(JSON.stringify(this.chartConfig)));
            console.log('Under rendered4');
        })
        .catch(error => {
            this.dispatchEvent(new ShowToastEvent({
                title : 'Error Loading Chart',
                message : error.message,
                variant : 'error'
            }))
        })
    }
}