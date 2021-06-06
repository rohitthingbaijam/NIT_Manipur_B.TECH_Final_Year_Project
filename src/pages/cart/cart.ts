import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';

import { CommonserviceProvider } from '../../providers/commonservice/commonservice';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartItems: any[] = [];
  overalltotal: number;
  showEmptyCartMessage: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,  public commonserv: CommonserviceProvider, private dataService: DataserviceProvider) {

    this.overalltotal = 0.0;  
   
    
    this.commonserv.storage.ready().then(()=>{

      this.commonserv.storage.get("cart").then( (data)=>{
        this.cartItems = data;
        console.log(this.cartItems);

        if(this.cartItems && this.cartItems.length > 0){

         

          this.cartItems.forEach( (item, index)=> {
           
              this.overalltotal = this.overalltotal + (parseFloat(item.total) );
              
            
          })

          console.log( 'final amount', this.overalltotal);
          

        } else {

          this.showEmptyCartMessage = true;

        }


      })

    })
  }
  pay(){
    let token= localStorage.getItem('tokenKey');
    if(token){
      this.navCtrl.push(PaymentPage);
    }
    else
    {
      this.commonserv.presentToast('Please login to continue');
      this.navCtrl.push(LoginPage,{
        "nextLogin": 'cart'
      });
    }
   
  }

  removeFromCart(item, i){

    let price;
    
    price = parseFloat(item.price);
    let qty = item.qty;

    this.cartItems.splice(i, 1);

    this.commonserv.storage.set("cart", this.cartItems).then( ()=> {

      this.overalltotal = this.overalltotal - (price * qty);

    });

    if(this.cartItems.length == 0){
      this.showEmptyCartMessage = true;
    }

    this.commonserv.events.publish("updateCart"); 
  }


  changeQty(item: any, index: number, change: number){

    let price;
     // console.log('item.product_type.selling_price:-',item.productype);
      price = parseFloat(item.price);
      
    let qty: number = item.qty;

    if(change < 0 && item.qty == 1){
      return;
    }

    qty = qty + change;
    item.qty = qty;
   
    item.total = qty * price;
    
 // console.log('Change total:-',(parseFloat(this.total.toString()) + (price * change)))
    this.cartItems[index] = item;
    
    this.commonserv.storage.set("cart", this.cartItems).then( ()=> {

      // this.commonserv.presentToast("Cart updated");
      this.commonserv.events.publish("updateCart"); 

    });  
    
   
    this.overalltotal = (parseFloat(this.overalltotal.toString()) + (parseFloat(price.toString()) * change));

  }
}
