import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NavigateToRecord extends NavigationMixin(LightningElement) { 

    recordPageUrl;

    connectedCallback()
    {
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                recordId: '0012w00000ikH2fAAE',
                objectApiName: 'Account',
                actionName: 'view'
            }
        }).then(url =>
        {
            this.recordPageUrl = url;
        })
    }

    navigateToCreateRec = () =>
    {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'new'
            }
        })
    }

    navigateToEditRec = () =>
    {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: '0012w00000ikH2fAAE',
                objectApiName: 'Account',
                actionName: 'edit'
            }
        })
    }

    navigateToViewRec = () =>
    {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: '0012w00000ikH2fAAE',
                objectApiName: 'Account',
                actionName: 'view'
            }
        })
    }
}