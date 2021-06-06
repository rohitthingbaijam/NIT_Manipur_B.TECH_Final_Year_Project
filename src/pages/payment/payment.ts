import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ThankyouPage } from '../thankyou/thankyou';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  cartItems: any[] = [];
  overalltotal: number;


  constructor(public navCtrl: NavController, public navParams: NavParams ,private data: DataserviceProvider, private common: CommonserviceProvider, private commonserv : CommonserviceProvider) {
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
          

        }


      })

    })

    this.showaddress();
  }

  buyUrl="ticket/buyitems";
  goNextthankyou(){
    this.common.pageLoading('Please wait...');
    const myData={
      cart:this.cartItems,
      paymenttype: 'cod',
      finalamount: this.overalltotal 
     
     }
    //commonAPI  

    this.data.commonAPI(myData, this.buyUrl).then((res) => {
           this.common.stopLoading();
        
          // alert(1)
        
          if(res.type=='success'){
              this.navCtrl.setRoot(ThankyouPage);
              let data = [];
              this.common.storage.set("cart", data).then(() => {
                  data.push({});
               }).catch((err) => {
                 console.log('error from cart :-',err)
               });
         
               //console.log(this.cart_count);
          }
          else
          {
            
             
           alert('fail');
            
            
          } 
      }).catch((err)=>{
      
        console.log('login function:-',err);
        this.common.stopLoading();

      }); 


  
 
  }
 
paymentUrl = "ticket/adddeliveryaddress"  ;
address;
mobile;
pincode
lastshow=false;
adddeliveryaddress(){
  if(this.address && this.mobile && this.pincode  )
  {
    this.common.pageLoading('Please wait...');
    const myData={
      Address:this.address,
      Mobile:this.mobile,
      Pincode: this.pincode ,
 }
    //commonAPI 
  

    this.data.commonAPI(myData, this.paymentUrl).then((res) => {
          console.log('login_response:-',res);
          // alert(1)
        
          if(res==0)
          {
          
          this.common.presentToast("Error occured");
          this.common.stopLoading();
            
          }
          else if(res.type=='success')
          {
            console.log('success');
            this.common.stopLoading();
            this.lastshow=true; // hide the delivery add field
          }
          else{
            
            this.common.presentToast(res.msg);
            this.common.stopLoading();

          }
      }).catch((err)=>{
      
        console.log('login function:-',err);
        this.common.stopLoading();

      }); 

  }
  else{
   
    this.common.presentToast('Credentials can\'t be blank');
   
  }
}
showUrl="ticket/showdeliveryaddress";
//getaddress=[];
add1;
phone1;
pin1;
showaddress(){

    this.common.pageLoading('Please wait...');
    const myData={
      Address:'this.address',
     
 }
    //commonAPI  
  

    this.data.commonAPI(myData, this.showUrl).then((res) => {
           this.common.stopLoading();
        
          // alert(1)
        
          if(res.type=='fail'){
                        
           console.log('fail', res) 
          }
          else
          {
            console.log('result from api:-', res);
            if(res.length>0)
            {
              // this.dashboard=res;
              this.lastshow=true; // hide the delivery add field
              console.log('add', res[0].address)
              this.add1= res[0].address;
              this.pin1= res[0].pincode;
              this.phone1= res[0].mobile;
             
            }
            
            
          } 
      }).catch((err)=>{
      
        console.log('login function:-',err);
        this.common.stopLoading();

      }); 

 
}

}
