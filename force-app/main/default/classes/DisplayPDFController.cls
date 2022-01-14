public with sharing class DisplayPDFController {
    public String displayText {get; set;}
    public DisplayPDFController() {
        displayText = String.escapeSingleQuotes(
            Apexpages.currentPage().getParameters().get('displayText'));
        
    }
}