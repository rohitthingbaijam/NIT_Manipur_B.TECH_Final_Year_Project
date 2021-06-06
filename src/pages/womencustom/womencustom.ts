import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WomenshirtsPage } from '../womenshirts/womenshirts';
import { WomenblousePage } from '../womenblouse/womenblouse';
import { HomePage } from '../home/home';
import { CartPage } from '../cart/cart';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';

/**
 * Generated class for the WomencustomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-womencustom',
  templateUrl: 'womencustom.html',
})
export class WomencustomPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private data: DataserviceProvider, 
    private common: CommonserviceProvider ) {


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
    this.navCtrl.push(WomenshirtsPage);
  }

  goNext3(){
    this.navCtrl.push(WomenblousePage);
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

