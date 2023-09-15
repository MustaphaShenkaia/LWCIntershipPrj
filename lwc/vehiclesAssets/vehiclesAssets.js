import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from "lightning/actions";	

import getAssets from '@salesforce/apex/AssetController.getAssets';
import updateAsset from '@salesforce/apex/UpdateAsset.updateAsset';


export default class VehiclesAssets extends LightningElement {

    @api recordId;

    @track data; 

    @track selectedRows = []; 

    
    columns = [
        {
            label: 'Serial Number',
            fieldName: 'SerialNumber',
            type: 'text',
            //sortable: true
            
        },
        {
            label: 'Interior Color',
            fieldName: 'Interior_Color__c',
            type: 'text',
            //sortable: true
        },
        {
            label: 'Exterior Color',
            fieldName: 'Exterior_Color__c',
            type: 'text',
            //sortable: true
        },
        {
            label: 'Product Name',
            fieldName:  'Product2_Name', // Product2Id // Product2.Name
            type: 'text',
            //sortable: true
        }
        
    ];

    //---------------------------
  
     @wire(getAssets, {Opportunity__c: null} ) getAssets({error, data}) {

        // if(data) {
        //     this.data = data; 
        // } else if(error) {
        //     this.data = undefined; 
        // }

        //----------------------------------

        if (data) {

            let accParsedData = JSON.parse(JSON.stringify(data));

            accParsedData.forEach(acc=> {
                if(acc.Product2Id){
                acc.Product2_Name =acc.Product2.Name;
                }
            });

            this.data = accParsedData;

        } else if(error) {
                this.data = undefined; 
            }
     }       

     //---------------------------
     
     handleRowSelection(event) {

        this.selectedRows = event.detail.selectedRows;   // selected      
        
    }  

    //---------------------------
    
    handleData() {       

        if (this.selectedRows.length > 0) {            

            const records = [];
                      
            for (let i = 0; i < this.selectedRows.length; i++) {

                const record = { ...this.selectedRows[i] };
                record.Opportunity__c = this.recordId; 
               

                records.push(record);
            }



           updateAsset({records:records})

           .then( () => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'SUCCESS',
                        message: 'Asset başarılı bir şekilde oluşmuştur..',
                        variant: 'success',
                    })
                );
                
            } )

            
            .catch( () => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'ERROR',
                        message: 'Asset oluşturulaamadı!!',
                        variant: 'error',
                    })
                );
            } )
            // method().then( () => {} ).catch( () => {} )   
            
        }

        this.dispatchEvent(new CloseActionScreenEvent());     
        
    }

}




