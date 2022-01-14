global class Batch3 implements Database.Batchable<sObject>{
    
    global Database.QueryLocator start(Database.BatchableContext BC){
        return Database.getQueryLocator('SELECT Id from Contact Limit 1');
    }
    
    public void execute(Database.BatchableContext BC, List<sObject> scope){
        List<AsyncApexJob> jobs = [SELECT Id, Status FROM AsyncApexJob WHERE Status NOT IN ('Completed', 'Failed','Aborted') limit 150];
        for (AsyncApexJob job : jobs)
        {
            System.abortJob(job.Id);
        }
    }
        public void finish(Database.BatchableContext BC){
        }
    }