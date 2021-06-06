import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ArbinPage } from '../arbin/arbin';
import { NewarrivalsPage } from '../newarrivals/newarrivals';
import { CartPage } from '../cart/cart';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';

@Component({
  selector: 'page-sale',
  templateUrl: 'sale.html'     
})
export class SalePage {
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
    this.navCtrl.push(HomePage);
  }
  
  goNext3(){
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

 
}
