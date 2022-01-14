public with sharing class FileUploadAndView_LWC_Controller {
    public FileUploadAndView_LWC_Controller() {

    }
    @AuraEnabled(cacheable=true)
        public static ContentVersion saveFile(Id idParent, String strFileName, String base64Data) {
        // Decoding base64Data
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
        
        // inserting file
        ContentVersion cv = new ContentVersion();
        cv.Title = strFileName;
        cv.PathOnClient = '/' + strFileName;
        cv.FirstPublishLocationId = idParent;
        cv.VersionData = EncodingUtil.base64Decode(base64Data);
        cv.IsMajorVersion = true;
        Insert cv;
        return cv;
    }

    @AuraEnabled(cacheable=true)
    public static list<contentversion> releatedFiles(Id idParent){
        list<id> lstConDocs = new list<id>();
        for(ContentDocumentLink cntLink : [Select Id, ContentDocumentId From ContentDocumentLink Where LinkedEntityId =:idParent]) {
            lstConDocs.add(cntLink.ContentDocumentId);
        }
        if(!lstConDocs.isEmpty()) {
            return [SELECT Id, Title, ContentDocumentId, ContentModifiedDate, FileType, ContentSize FROM ContentVersion WHERE ContentDocumentId IN :lstConDocs];
        }
        else {
            return null;
        }
     
    }

    @AuraEnabled(cacheable=true)
    public static list<contentversion> contantDataRecords(String valueType){
        list<id> lstConDocs = new list<id>();
        Id idParent;
        
        for(ContentDocumentLink cntLink : [Select Id, ContentDocumentId From ContentDocumentLink Where LinkedEntityId =:idParent]) {
            lstConDocs.add(cntLink.ContentDocumentId);
        }
        if(!lstConDocs.isEmpty()) {
            return [SELECT Id, Title, ContentDocumentId, ContentModifiedDate, FileType, ContentSize FROM ContentVersion WHERE ContentDocumentId IN :lstConDocs];
        }
        else {
            return null;
        }
     
    }


    //File Owned by Me
    @AuraEnabled(cacheable=true)
    public static list<ContentDocument> fileOwnedByMe_Apex(String valueType){
        return [SELECT Id, CreatedById, CreatedDate, LastModifiedById, LastModifiedDate, IsArchived, ArchivedById, ArchivedDate, IsDeleted, OwnerId, SystemModstamp, Title, PublishStatus, LatestPublishedVersionId, ParentId, LastViewedDate, LastReferencedDate, Description, ContentSize, FileType, FileExtension, SharingOption, SharingPrivacy, ContentModifiedDate, ContentAssetId FROM ContentDocument];

    }

    //Files Shared with Me
    @AuraEnabled(cacheable=true)
    public static list<contentversion> fileSharedWithMe_Apex(  Id idParent){
        list<id> lstConDocs = new list<id>();
             
        for(ContentDocumentLink cntLink : [Select Id, ContentDocumentId From ContentDocumentLink Where LinkedEntityId =:idParent and ShareType != 'I']) {
            lstConDocs.add(cntLink.ContentDocumentId);
        }
        if(!lstConDocs.isEmpty()) {
            return [SELECT Id, Title, ContentDocumentId, ContentModifiedDate, FileType, ContentSize FROM ContentVersion WHERE ContentDocumentId IN :lstConDocs];
        }
        else {
            return null;
        }
     
    }

    //Recent Files 
    @AuraEnabled(cacheable=true)
    public static list<RecentlyViewed> recentFiles_Apex(String valueType){
        return [SELECT Id, Name, LastName, FirstName, Type, Alias, UserRoleId, RecordTypeId, IsActive, ProfileId, Title, Email, Phone, NameOrAlias, LastViewedDate, LastReferencedDate FROM RecentlyViewed WHERE Type ='ContentDocument' Order by LastViewedDate Desc limit 5]; //Id LIKE '069%'

    }

    //Files Im Following
 
    @AuraEnabled(cacheable=true)
    public static list<ContentVersion> followingFile_Apex(String valueType){
        Set<Id> idParent = new Set<Id>();
        Set<id> lstConDocs = new Set<Id>();
        for(EntitySubscription entitySub : [SELECT Id, ParentId, SubscriberId, CreatedById, CreatedDate, IsDeleted FROM EntitySubscription]){//Need to add WHERE ParentId starts with '069'
            idParent.add(entitySub.ParentId);
        }
        if(!idParent.isEmpty()){
            for(ContentDocumentLink cntLink : [Select Id, ContentDocumentId From ContentDocumentLink Where LinkedEntityId =:idParent]) {
                lstConDocs.add(cntLink.ContentDocumentId);
            }
        }
        if(!lstConDocs.isEmpty()) {
            return [SELECT Id, Title, ContentDocumentId, ContentModifiedDate, FileType, ContentSize FROM ContentVersion WHERE ContentDocumentId IN :lstConDocs];
        }
        else {
            return null;
        }
    }

    //List of Libraries I can access
    @AuraEnabled(cacheable=true)
    public static Map<ContentWorkspace, List<ContentVersion>> libraries_Apex(){
        Set<Id> ContentWorkspaceId = new Set<Id>();
        Set<Id> lstConDocs = new Set<Id>();
        Map<Id,Id> map_CW_CDL_Ids = new Map<Id, Id>();
        Map<Id,ContentWorkspace> map_IdVsConWorspace = new Map<Id, ContentWorkspace>();
        Map<ContentWorkspace, List<ContentVersion>> Map_ContectWorkspace = new Map<ContentWorkspace, List<ContentVersion>>();

        for(ContentWorkspace contWork : [SELECT Id, Name, Description, TagModel, DefaultRecordTypeId, IsRestrictContentTypes, IsRestrictLinkedContentTypes, WorkspaceType, ShouldAddCreatorMembership, LastWorkspaceActivityDate, RootContentFolderId, NamespacePrefix, DeveloperName, WorkspaceImageId FROM ContentWorkspace]){
            ContentWorkspaceId.add(contWork.Id);
            //Map for return to the Page, If the values will null then the key must be shows as null 
            if(!Map_ContectWorkspace.containsKey(contWork)){
                Map_ContectWorkspace.put(contWork, new List<ContentVersion>());
            }
            //This map will help to compare Id and help to add the value on above map
            if(!map_IdVsConWorspace.containsKey(contWork.Id)){
                map_IdVsConWorspace.put(contWork.Id, contWork);
            }
        }
        if(!ContentWorkspaceId.isEmpty()){
            for(ContentDocumentLink cntLink : [Select Id, ContentDocumentId, LinkedEntityId From ContentDocumentLink Where LinkedEntityId =:ContentWorkspaceId]) {
                lstConDocs.add(cntLink.ContentDocumentId);
                if(!map_CW_CDL_Ids.containsKey(cntLink.ContentDocumentId)){
                    map_CW_CDL_Ids.put(cntLink.ContentDocumentId, cntLink.LinkedEntityId);
                }
            }
        }
        if(!lstConDocs.isEmpty()) {
          for(ContentVersion contVersion: [SELECT Id, Title, ContentDocumentId, ContentModifiedDate, FileType, ContentSize FROM ContentVersion WHERE ContentDocumentId IN :lstConDocs]){
                if(map_CW_CDL_Ids.containsKey(contVersion.ContentDocumentId)){
                    if(map_IdVsConWorspace.containsKey(map_CW_CDL_Ids.get(contVersion.ContentDocumentId))){
                        if(Map_ContectWorkspace.containsKey(map_IdVsConWorspace.get(map_CW_CDL_Ids.get(contVersion.ContentDocumentId)))){
                            Map_ContectWorkspace.get(map_IdVsConWorspace.get(map_CW_CDL_Ids.get(contVersion.ContentDocumentId))).add(contVersion);
                        }
                    }
                }
          }        
        }
        if(!Map_ContectWorkspace.isEmpty()){
            return Map_ContectWorkspace;
        }
       System.debug('Map_ContectWorkspace---'+Map_ContectWorkspace);
       return null;
    }  

    //List of Libraries I can access
    @AuraEnabled(cacheable=true)
    public static Map<String, List<ContentVersion>> libraries_Apex_2(){
        Set<Id> ContentWorkspaceId = new Set<Id>();
        Set<Id> lstConDocs = new Set<Id>();
        Map<Id,Id> map_CW_CDL_Ids = new Map<Id, Id>();
        Map<Id,ContentWorkspace> map_IdVsConWorspace = new Map<Id, ContentWorkspace>();
        Map<String, List<ContentVersion>> Map_ContectWorkspace = new Map<String, List<ContentVersion>>();

        for(ContentWorkspace contWork : [SELECT Id, Name, Description, TagModel, DefaultRecordTypeId, IsRestrictContentTypes, IsRestrictLinkedContentTypes, WorkspaceType, ShouldAddCreatorMembership, LastWorkspaceActivityDate, RootContentFolderId, NamespacePrefix, DeveloperName, WorkspaceImageId FROM ContentWorkspace]){
            ContentWorkspaceId.add(contWork.Id);
            //Map for return to the Page, If the values will null then the key must be shows as null 
            if(!Map_ContectWorkspace.containsKey(contWork.Name)){
                Map_ContectWorkspace.put(contWork.Name, new List<ContentVersion>());
            }
            //This map will help to compare Id and help to add the value on above map
            if(!map_IdVsConWorspace.containsKey(contWork.Id)){
                map_IdVsConWorspace.put(contWork.Id, contWork);
            }
        }
        if(!ContentWorkspaceId.isEmpty()){
            for(ContentDocumentLink cntLink : [Select Id, ContentDocumentId, LinkedEntityId From ContentDocumentLink Where LinkedEntityId =:ContentWorkspaceId]) {
                lstConDocs.add(cntLink.ContentDocumentId);
                if(!map_CW_CDL_Ids.containsKey(cntLink.ContentDocumentId)){
                    map_CW_CDL_Ids.put(cntLink.ContentDocumentId, cntLink.LinkedEntityId);
                }
            }
        }
        if(!lstConDocs.isEmpty()) {
          for(ContentVersion contVersion: [SELECT Id, Title, ContentDocumentId, ContentModifiedDate, FileType, ContentSize FROM ContentVersion WHERE ContentDocumentId IN :lstConDocs]){
                if(map_CW_CDL_Ids.containsKey(contVersion.ContentDocumentId)){
                    if(map_IdVsConWorspace.containsKey(map_CW_CDL_Ids.get(contVersion.ContentDocumentId))){
                        String ConWorkpaceName = map_IdVsConWorspace.get(map_CW_CDL_Ids.get(contVersion.ContentDocumentId)).Name;
                        if(Map_ContectWorkspace.containsKey(ConWorkpaceName)){
                            Map_ContectWorkspace.get(ConWorkpaceName).add(contVersion);
                        }
                    }
                }
          }        
        }
        System.debug('Map_ContectWorkspace---'+Map_ContectWorkspace);
        if(!Map_ContectWorkspace.isEmpty()){
            return Map_ContectWorkspace;
        }
       return null;
    }   

}