import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyorderPage } from '../myorder/myorder';
import { HomePage } from '../home/home';


/**
 * Generated class for the ThankyouPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-thankyou',
  templateUrl: 'thankyou.html',
})
export class ThankyouPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThankyouPage');
  }

  goOrder(){
    this.navCtrl.push(MyorderPage);
  }

  goHome(){
    this.navCtrl.setRoot(HomePage);
  }

}
