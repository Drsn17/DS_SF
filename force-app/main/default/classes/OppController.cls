public class OppController {
    @AuraEnabled
    public Static Opportunity getOpportunityDetails(String OppId){
        if(OppId != null){
            List<Opportunity> opp = [Select Id from Opportunity Where Id =: OppId limit 1];
            return opp[0];
        }
         return null;
    }

}