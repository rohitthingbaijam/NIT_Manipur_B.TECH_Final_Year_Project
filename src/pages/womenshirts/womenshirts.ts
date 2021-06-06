import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { CartPage } from '../cart/cart';
import { HomePage } from '../home/home';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';

/**
 * Generated class for the WomenshirtsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-womenshirts',
  templateUrl: 'womenshirts.html',
})
export class WomenshirtsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private data: DataserviceProvider, 
    private common: CommonserviceProvider) {

    this.shippingMethodChange();

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
  this.navCtrl.push(AboutPage);
}

goMyCart(){
    this.navCtrl.push(CartPage);
  }

goNexthomepage(){
  this.navCtrl.push(HomePage);
}

ionViewDidLoad() {

  this.common.updateCart1()
  .then((cart) => {
    
      this.cart_count=cart;
  
  }).catch((err) => {
    console.log('error from cart :-',err)
  });
  
}

bodytype="diana";
  fabric="fabric1";
  sleeve="default";

  getPicture="ticket/custom";
  item=[];
  item1;
  productImage;
  price=0;
  
  shippingMethodChange(){
    this.common.pageLoading("");
   // alert(1);
   // SELECT `id`, `name`, `bodytype`, `fabric`, `sleeve`, `price`, `image`, `genderid` FROM `custom` WHERE 1
    console.log('bodytype:-', this.bodytype);
    const myData={
      name: 'ws',
      bodytype: this.bodytype,
      fabric: this.fabric,
      sleeve: this.sleeve,
      size : this.size  
    }
    //commonAPI 
    this.data.commonAPI(myData, this.getPicture).then((res) => {
        
            
            if(res.type=='fail'){
              
              alert('fail')
              this.common.stopLoading();
            }
            else
            {
              console.log('result from api:-', res);
              if(res.length>0)
              {
                this.common.stopLoading();
                this.item=res;
                this.item1=res;
                console.log('image name:-', this.item[0].image_name) 
                this.productImage=this.item[0].image_name;
                this.price=this.item[0].price;
              }
              else{

              }
  
            } 
  
      }).catch((err)=>{
        
    
        console.log('dashboard error api:-',err);
        this.common.stopLoading();

      }); 

  }
  cart_count;
  getProd;
  qty=1;
  size;
  addToCart(selected_prod_type) {
    
    console.log('given Products:-',selected_prod_type);
    console.log('Selling Price:-',selected_prod_type[0].price);
   let sp= selected_prod_type[0].price;
    // alert(this.selected_prod_type.length);
    
      if(selected_prod_type.length==0)
      {
       
        this.common.presentAlert('Error','Please select any product option');
        
      }
      else
      {

        if(!this.size){ 
          this.common.presentAlert('Error','Please select a size');
        }
        
            
        else{
     

          this.common.storage.get("cart").then((data) => {
            
            if (data == undefined || data.length == 0) {
              data = [];

              data.push({
                // "productype":  selected_prod_type,
                "bodytype":selected_prod_type[0].bodytype,
                "fabric":selected_prod_type[0].fabric,
                "id":selected_prod_type[0].id,
                "qty": this.qty,
                "size": this.size,
                "image_name":selected_prod_type[0].image_name,
                "name":selected_prod_type[0].name,
                "sleeve": selected_prod_type[0].sleeve,
                "price": parseFloat(selected_prod_type[0].price),
                "total":  parseFloat(selected_prod_type[0].price),
               
              //  
              // "amount": parseFloat(product.price)
              });

           
            } else {
 
              let alreadyAdded = false;
              let alreadyProductType= false;
              let alreadyAddedIndex = -1;
              //data = []; 
              ///  console.log('data.length', data.length)
              for (let i = 0; i < data.length; i++){
                

                if(data[i].id == selected_prod_type[0].id){ //Product ID matched
                  
                          alreadyAdded = true;
                          alreadyAddedIndex = i;    
                }
                /* else {

                  // if product type is not matched
                          data.push({
                            "productype":  selected_prod_type[0],
                            "product_image":this.getProd.img_path,
                            "product_name": this.getProd.p_name,
                            "qty": 1
                          // "amount": parseFloat(product.price)
                          });
                } */

              
              }
              if(alreadyAdded){
                          if(alreadyProductType){
                              data[alreadyAddedIndex].qty = parseFloat(data[alreadyAddedIndex].qty) + this.qty;
                              data[alreadyAddedIndex].total = parseFloat(data[alreadyAddedIndex].total) + (this.qty * parseFloat(sp));
                          }
                          else
                          {
                              data.push({

                                "bodytype":selected_prod_type[0].bodytype,
                                "fabric":selected_prod_type[0].fabric,
                                "id":selected_prod_type[0].id,
                                "qty": this.qty,
                                "size": this.size,
                                "image_name":selected_prod_type[0].image_name,
                                "name":selected_prod_type[0].name,
                                "sleeve": selected_prod_type[0].sleeve,
                                "price": parseFloat(selected_prod_type[0].price),
                                "total":  parseFloat(selected_prod_type[0].price),
                              
                              // "amount": parseFloat(product.price)
                              });

                          }

              }
              else{
                        data.push({
                          // "productype":  selected_prod_type[0],
                          "bodytype":selected_prod_type[0].bodytype,
                          "fabric":selected_prod_type[0].fabric,
                          "id":selected_prod_type[0].id,
                          "qty": this.qty,
                          "size": this.size,
                          "image_name":selected_prod_type[0].image_name,
                          "name":selected_prod_type[0].name,
                          "sleeve": selected_prod_type[0].sleeve,
                          "price": parseFloat(selected_prod_type[0].price),
                          "total":  parseFloat(selected_prod_type[0].price),
                        
                        
                        });
              }

          } 
           this.common.storage.set("cart", data).then(() => {
                   // console.log("Cart Updated");
                     // this.common.presentToast('You added an item to your  cart ')
                  console.log(data);

                  this.common.events.publish("updateCart");
                  this.common.updateCart1()
                  .then((cart) => {
                    
                      this.cart_count=cart;
                      this.navCtrl.pop();
                  
                  }).catch((err) => {
                    console.log('error from cart :-',err)
                  });
            
                  //console.log(this.cart_count);

        

             }) 

          })
  }
  }
  }

}
