public with sharing class GetAllAccounts {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, AccountNumber,BillingCountry, Phone FROM Account LIMIT 10];
    }
}