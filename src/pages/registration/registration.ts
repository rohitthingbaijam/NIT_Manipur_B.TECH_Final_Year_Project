import { Component, OnInit } from '@angular/core';
import { NavController, NavParams ,MenuController } from 'ionic-angular';

import { LoginPage } from '../login/login';
//import { unescapeIdentifier } from '@angular/compiler';
import { Validators, FormGroup, FormControl, AbstractControl, FormBuilder } from '@angular/forms';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';



/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage  {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private data: DataserviceProvider, private common: CommonserviceProvider,
              private menu: MenuController ) {
  }
ionViewDidEnter() {
  this.menu.swipeEnable(false);
}

  RegistrationUrl="site/signup"
  username;
  email;
  phoneno;
  address;
  password;
  register(){
    if(this.username && this.password && this.email && this.phoneno && this.address )
    {
      this.common.pageLoading('Please wait...');

      this.data.checkSignup(this.username, this.password, this.email, this.phoneno, this.address, this.RegistrationUrl).then((res) => {
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
              this.navCtrl.setRoot(LoginPage);
              this.common.stopLoading();
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

 

}

    


    


  


