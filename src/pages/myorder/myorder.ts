import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CommonserviceProvider } from '../../providers/commonservice/commonservice';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';

/**
 * Generated class for the MyorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-myorder',
  templateUrl: 'myorder.html',
})
export class MyorderPage {
  orderItems: any[] = [];
  overalltotal: number;
  showEmptyOrderMessage: boolean = false;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public commonserv: CommonserviceProvider,private data: DataserviceProvider) {
    this.overalltotal = 0.0;  
    this.commonserv.storage.ready().then(()=>{

      this.commonserv.storage.get("cart").then( (data)=>{
        this.orderItems = data;
        console.log(this.orderItems);

        if(this.orderItems && this.orderItems.length > 0){

         

          this.orderItems.forEach( (item, index)=> {
           
              this.overalltotal = this.overalltotal + (parseFloat(item.total) );
              
            
          })

          console.log( 'final amount', this.overalltotal);
          

        } else {

          this.showEmptyOrderMessage = true;

        }


      })

    })
  } 

  //token= localStorage.getItem('order'); 

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyorderPage');
    this.order();
  }

  getOrderUrl = "ticket/orderhistory";
  item;
  price;
  // orderUrl=
  order()
  {
    this.commonserv.pageLoading("");
    const myData={
      date1: 'data.description',
      date2:'24.8149233,93.9449727',
      
    }
    //commonAPI 
    this.data.commonAPI(myData, this.getOrderUrl).then((res) => {
        
            this.commonserv.stopLoading();
            if(res.type=='fail'){
              
              alert('fail')
            }
            else
            {
              console.log('result from api:-', res);
              if(res.length>0)
              {
                this.item=res; 
               
              }
              
              
            } 
  
      }).catch((err)=>{
        
    
        console.log('dashboard error api:-',err);

      }); 


    
  }

  detailOrder(val){

    console.log('orderid:-', val.id)
    

  }
  


}
