public with sharing class AccountHelper {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(String recordId) {
        return [SELECT Id, Name, Type, Rating, Phone 
            FROM Account where Id =: recordId limit 10];
    }
}