public with sharing class RecordPreviewController {
    
    /*
        This method is used to fetch records on the sobjectName and fields parameter.
    */
    @AuraEnabled
    public static List<Sobject> fetchRecordList(String sobjectName, String fields ){
        
        List<String> fieldset = new List<String>();
        
        if(fields != null) {
            List<String> fieldNames =  (List<String>) JSON.deserialize(fields, List<String>.class);
            
            for(String eachFieldName : fieldNames) {
                fieldset.add(String.valueOf(eachFieldName));
            }
        }
        String fieldQuery = 'SELECT ' + fieldset + ' FROM ' + sobjectName + ' LIMIT 10';
        List<sObject> sobjList = Database.query(fieldQuery);
        return sobjList;
    }
}