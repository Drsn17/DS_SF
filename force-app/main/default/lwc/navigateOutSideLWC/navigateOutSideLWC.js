import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'

export default class NavigateOutSideLWC extends NavigationMixin(LightningElement) {

    vfUrl;
    connectedCallback(){
        this[NavigationMixin.GenerateUrl]({
            type : 'standard__webPage',
            attributes : {
                url: '/apex/NavigationVFPage'
            }
        }).then(url =>{
            this.vfUrl = url;
        })
    }

    navigateToVfPage = () =>{
        this[NavigationMixin.GenerateUrl]({
            type : 'standard__webPage',
            attributes : {
                url: '/apex/NavigationVFPage'
            }
        }).then(url =>{
            window.open(url);
        })
    }

    navigateToAura = () =>{
        this[NavigationMixin.Navigate]({
            type : 'standard__component',
            attributes : {
                componentName: 'c__navigationAuraComponent'
            },
            //we can pass multiple value with the help of state on to the Aura attribute
            state: {
                c__prepertyValue: 'From LWC to Aura'
            }
        })
    }
}