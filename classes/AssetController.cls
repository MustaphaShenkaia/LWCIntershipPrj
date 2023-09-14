public with sharing class AssetController {
    
    public AssetController() {
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Asset> getAssets() {
        
      	List<Asset> assetList = [SELECT SerialNumber, Interior_Color__c, Exterior_Color__c, Product2.Name, Opportunity__c FROM Asset WHERE Opportunity__c = null];
                   
      	return assetList; 
    }
}