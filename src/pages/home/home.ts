import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ArbinPage } from '../arbin/arbin';
import { CartPage } from '../cart/cart';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';
import { SalePage } from '../sale/sale';
import { NewarrivalsPage } from '../newarrivals/newarrivals';
  
@Component({
  selector: 'page-home',
  templateUrl: 'home.html' 
})
export class HomePage {

  items;

  constructor(public navCtrl: NavController, private data: DataserviceProvider, private common: CommonserviceProvider) {
  //  this.initializeItems();

  this.common.events.subscribe("updateCart", () => {
    this.common.updateCart1()
      .then((cart) => {
        
          this.cart_count=cart;
      
      }).catch((err) => {
        console.log('error from cart :-',err)
      });

})

  }

  goNext1(){
    this.navCtrl.push(SalePage);
  }

  goNext2(){
    this.navCtrl.push(NewarrivalsPage);
  }
   
  goNext4(){
    this.navCtrl.push(ArbinPage);
  }

   goMyCart(){
    this.navCtrl.push(CartPage);
  }

  ionViewDidLoad() {

    this.common.updateCart1()
    .then((cart) => {
      
        this.cart_count=cart;
    
    }).catch((err) => {
      console.log('error from cart :-',err)
    });
}
cart_count;


  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota',
      'Buenos Aires',
      'Cairo',
      'Dhaka',
      'Edinburgh',
      'Geneva',
      'Genoa',
      'Glasglow',
      'Hanoi',
      'Hong Kong',
      'India',
      'Islamabad',
      'Istanbul',
      'Jakarta',
      'Kiel',
      'Kyoto',
      'Le Havre',
      'Lebanon',
      'Lhasa',
      'Lima',
      'London',
      'Los Angeles',
      'Madrid',
      'Manila',
      'New York',
      'Olympia',
      'Oslo',
      'Panama City',
      'Peking',
      'Philadelphia',
      'San Francisco',
      'Seoul',
      'Taipeh',
      'Tel Aviv',
      'Tokio',
      'Uelzen',
      'Washington'
    ];
  }

    getItems(ev)
     {
      // Reset items back to all of the items
        this.initializeItems();
  
        // set val to the value of the ev target
        var val = ev.target.value;
    
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.items = this.items.filter((item) => {
            return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
      }
 }

    dashboardUrl="ticket/dashboard";
    dashboard;
    getDashboard(){ 

      const myData={
                date1: 'data.description',
                date2:'24.8149233,93.9449727',
                
              }
              //commonAPI 
              this.data.commonAPI(myData, this.dashboardUrl).then((res) => {
                  
                      
                      if(res.type=='fail'){
                        
                        alert('fail')
                      }
                      else
                      {
                        console.log('result from api:-', res);
                        if(res.length>0)
                        {
                          this.dashboard=res;
                         
                        }
                        
                        
                      } 
            
                }).catch((err)=>{
                  
              
                  console.log('dashboard error api:-',err);
    
                }); 
  
              
             
  } 
}
