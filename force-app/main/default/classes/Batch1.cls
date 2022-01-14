global class Batch1 implements Database.Batchable<sObject> {
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator('SELECT Id FROM Account LIMIT 1');
    }
    global void execute(Database.BatchableContext bc, List<sObject> records){
        System.debug('Batch Class 1---DS');
    }
    global void finish(Database.BatchableContext bc){
        //Database.executeBatch(New Batch2());
    }
}