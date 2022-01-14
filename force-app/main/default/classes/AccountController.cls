public with sharing class AccountController {
    public AccountController() {

    }
     @AuraEnabled
     public static List<Account> getAccounts(){
         try {
             return [SELECT Id, Name, Phone, Website, Industry FROM Account LIMIT 10];
         } catch (Exception e) {
             throw new AuraHandledException(e.getMessage());
         }
     }

     @AuraEnabled(cacheable=true)
     public static List<Account> getAccount(){
         try {
             return [SELECT Id, Name, Phone, Website, Industry, AnnualRevenue FROM Account LIMIT 100];
         } catch (Exception e) {
             throw new AuraHandledException(e.getMessage());
         }
     }
}