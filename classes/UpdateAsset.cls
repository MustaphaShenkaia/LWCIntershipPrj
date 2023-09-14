public with sharing class UpdateAsset {
    
    @AuraEnabled
    public static void updateAsset(List<Asset> records){
        
        update records; 
        
    }
}