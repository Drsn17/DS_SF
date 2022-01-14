public with sharing class OpportunityRecord {
    public OpportunityRecord() {

    }
    @AuraEnabled
    public static List<Opportunity> getOpportunity(){
        try {
            return [SELECT Id FROM Opportunity LIMIT 1];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}