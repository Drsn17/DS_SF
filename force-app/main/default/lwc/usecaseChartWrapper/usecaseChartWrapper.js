import { LightningElement, wire } from 'lwc';
import getOpportunies from '@salesforce/apex/ChartController.getOpportunities';

export default class UsecaseChartWrapper extends LightningElement {
    chartConfig;
    @wire(getOpportunies)
    wiredOpportunities({data, error}){
        if(data){
            console.log('data---'+JSON.stringify(data));
            let chartCountData = [];
            let chartStageData = [];

            data.forEach(opp => {
                chartCountData.push(opp.TOTAL);
                chartStageData.push(opp.StageName);
    
            });

            this.chartConfig = {
                type : 'pie',
                data : {
                    datasets : [{
                        label : 'Number',
                        backgroundColor : ['green','Orange','yellow','red', 'grey'],
                        data : chartCountData
                    }],
                    labels : chartStageData
                },
                
            }
        }
    }
}