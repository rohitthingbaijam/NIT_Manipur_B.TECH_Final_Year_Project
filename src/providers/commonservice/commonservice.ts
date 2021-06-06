import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import {  AlertController, LoadingController, ToastController, Platform, Events ,PopoverController,Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';


/*
  Generated class for the CommonserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonserviceProvider { 
  @ViewChild(Nav) nav: Nav;
  constructor(public http: HttpClient, public storage: Storage, public alertCtrl: AlertController,public loadingCtrl:LoadingController, public toastCtrl: ToastController, public plt: Platform,  public events: Events, public popoverCtrl: PopoverController) {
    
  }

  cart_count1;
  public updateCart1(): Promise<any> {

    //key will always be "store_url"
    return new Promise<any>((resolve, reject) => {
      
      this.storage.ready().then(() => {

        this.storage.get("cart").then((data) => {
          let cartItems = data;
          let counter=0;
          if(cartItems)
          {
            for (let i = 0; i < cartItems.length; i++)
            { 
              counter=counter + data[i].qty;
              
            }
        }
  
          if (cartItems && cartItems.length > 0) {
  
            this.cart_count1 = counter;
            resolve(this.cart_count1);
  
          } else {
  
            this.cart_count1 = 0;
            //return this.cart_count1;
            resolve(this.cart_count1);
  
          }
  
  
        })
  
      })

       
      
    });
  }

  //toast message 
  presentToast(m) {
                    let toast = this.toastCtrl.create({
                      message: m,
                      duration: 50000,
                      position: 'middle',
                      cssClass: 'dark-trans',
                      closeButtonText: 'OK',
                      showCloseButton: true
                    });
                    toast.present();
  }

  
 // loading function
 loader: any;
 msg;
 pageLoading(m)
 {
      if(m){
        this.msg=m;
      }
      else{
        this.msg="Please wait...";
      }
     this.loader = this.loadingCtrl.create({
       content: this.msg,
       duration: 15000,
     
       spinner: 'crescent',
    
     });
     this.loader.present();
     this.loader.onDidDismiss(() => {
      // console.log('Dismissed loading');

     });
 }


 stopLoading()
 {
    this.loader.dismiss();
 }

  presentAlert(t,m) {
    let alert = this.alertCtrl.create({
      title: t,
      subTitle: m,
      buttons: ['OK']
    });
    alert.present();
  }

 

  
 


}
