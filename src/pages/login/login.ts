import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegistrationPage } from '../registration/registration';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';
import { CommonserviceProvider } from '../../providers/commonservice/commonservice';
import { CartPage } from '../cart/cart';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private data: DataserviceProvider, private common: CommonserviceProvider, public events: Events ) {
  }

  goNext1(){
    this.navCtrl.push(HomePage);
  }

  goNext2(){
    this.navCtrl.push(RegistrationPage);
  }

    loginUrl="site/login";
    username;
    password;
  login() {

            if(this.username && this.password)
            {
              this.common.pageLoading('Please wait...');

              this.data.checkLogin(this.username, this.password, this.loginUrl).then((res) => {
                    console.log('login_response:-',res);
                    // alert(1)
                  
                    if(res==0)
                    {
                    
                    this.common.presentToast("Error occured");
                    this.common.stopLoading();
                      
                    }
                    else if(res.type=='success')
                    {
                      this.common.stopLoading();
                      console.log('nextLogin:-', this.navParams.get('nextLogin'));
                      localStorage.setItem('tokenKey', res.msg);
                      localStorage.setItem('username', res.username);
                      this.eventLogin(res.msg,res.username);
                      if(this.navParams.get('nextLogin')){
                        this.navCtrl.setRoot(CartPage);
                      }
                      else
                      {
                        this.navCtrl.setRoot(HomePage);
                      }
                      
                    
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
             
              this.common.presentToast('username/password can\'t be blank');
             
            }

            

      }
      eventLogin(stoken,uname) {
        console.log('User logined and subscribe!',uname + ' ' + stoken)
        this.events.publish('user:login',  uname,stoken );
      }

}
