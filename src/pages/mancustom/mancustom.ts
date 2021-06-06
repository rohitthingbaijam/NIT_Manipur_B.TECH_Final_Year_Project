import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MantrousersPage } from '../mantrousers/mantrousers';
import { ManshirtsPage } from '../manshirts/manshirts';
import { HomePage } from '../home/home';
import { CartPage } from '../cart/cart';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';

/**
 * Generated class for the MancustomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-mancustom',
  templateUrl: 'mancustom.html',
})
export class MancustomPage {

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
    this.navCtrl.push(ManshirtsPage);
  }

  goNext3(){
    this.navCtrl.push(MantrousersPage);
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
