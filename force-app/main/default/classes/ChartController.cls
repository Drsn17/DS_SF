public with sharing class ChartController {
    public ChartController() {

    }
    @AuraEnabled (cacheable  = true)
    public static List<AggregateResult> getOpportunities(){
        return [SELECT COUNT(ID) TOTAL, StageName FROM Opportunity GROUP BY StageName];
    }
}