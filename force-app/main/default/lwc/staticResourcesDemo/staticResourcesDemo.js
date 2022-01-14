import { LightningElement } from 'lwc';

//Static resources
import Static_resources from '@salesforce/resourceUrl/Mobiles';
import content_assets from '@salesforce/contentAssetUrl/mobiles';

//File
import Static_resourcesImg1 from '@salesforce/resourceUrl/img1';
import content_assetsImg3 from '@salesforce/contentAssetUrl/img3';

//Custom Label Greeting
import greeting_Label from '@salesforce/label/c.Greeting';

//LOCAL Properties 
import LOCALE from '@salesforce/i18n/locale';
import LANG from '@salesforce/i18n/lang'; 
import DIR from '@salesforce/i18n/dir';


export default class StaticResourcesDemo extends LightningElement {
    apple = Static_resources + '/apple.png';
    samsung = Static_resources + '/samsung.png';
    oneplus = Static_resources + '/oneplus.png';
    img1 = Static_resourcesImg1;


    apple1 = content_assets + 'pathinarchive=apple.png';
    samsung1 = content_assets + 'pathinarchive=samsung.png';
    oneplus1 = content_assets + 'pathinarchive=oneplus.png';
    img3 = content_assetsImg3;

    greeting = greeting_Label;

    date = new Date();
    fromattedDate = new Intl.DateTimeFormat(LOCALE).format(this.date);
    lang = LANG;
    dir = DIR;
}