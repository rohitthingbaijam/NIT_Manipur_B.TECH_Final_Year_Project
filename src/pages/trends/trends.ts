import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';


/**
 * Generated class for the TrendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-trends',
  templateUrl: 'trends.html',
})
export class TrendsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goNext1(){
    this.navCtrl.push(HomePage);
  }

}
