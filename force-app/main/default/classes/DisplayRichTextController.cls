global with sharing class DisplayRichTextController {
    @AuraEnabled(cacheable=false)
    public static Attachment genarateAsPDF(String textValue){
        try {

            Pagereference page = Page.renderAsPDF;
            page.getParameters().put('displayText', textValue);
            Contact con = new Contact(Id = '0032w00000cPP5WAAW');

            Attachment att = new Attachment();
            att.Name = 'LWC.pdf';
            att.ParentId = con.Id;
            att.Body = page.getContentAsPDF();
            att.IsPrivate = false;
            insert att;

            return att;            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}