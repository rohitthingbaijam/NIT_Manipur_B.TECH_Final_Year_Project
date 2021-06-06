import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MancustomPage } from '../mancustom/mancustom';
import { WomencustomPage } from '../womencustom/womencustom';
import { HomePage } from '../home/home';
import { CartPage } from '../cart/cart';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';


@Component({
  selector: 'page-arbin',
  templateUrl: 'arbin.html',
})
export class ArbinPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private data: DataserviceProvider, 
    private common: CommonserviceProvider) {

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

  goNext2(){
    this.navCtrl.push(MancustomPage);
  }

  goNext3(){
    this.navCtrl.push(WomencustomPage);
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
