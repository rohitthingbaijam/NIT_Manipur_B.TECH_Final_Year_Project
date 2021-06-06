import { Component, ViewChild,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Nav, Platform , Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ArbinPage } from '../pages/arbin/arbin';
import { MancustomPage } from '../pages/mancustom/mancustom';
import { WomencustomPage } from '../pages/womencustom/womencustom';
import { ManshirtsPage } from '../pages/manshirts/manshirts';
import { MantrousersPage } from '../pages/mantrousers/mantrousers';
import { WomenshirtsPage } from '../pages/womenshirts/womenshirts';
import { WomenblousePage } from '../pages/womenblouse/womenblouse';
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { TrendsPage } from '../pages/trends/trends';
import { NewarrivalsPage } from '../pages/newarrivals/newarrivals';
import { SalePage } from '../pages/sale/sale';
import { AboutPage} from '../pages/about/about';
import { MyorderPage } from '../pages/myorder/myorder';
import { CartPage } from '../pages/cart/cart';
import { PaymentPage } from '../pages/payment/payment';
import { ThankyouPage } from '../pages/thankyou/thankyou';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private events: Events) {
 
    this.initializeApp();

    // used for an example of ngFor and navigation
    

  }

  username='Guest';
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.listenToLoginEvents() ;
    });
    let token= localStorage.getItem('tokenKey');
   
    if(token){
              this.pages = [
                { title: 'Phisakhol', component: HomePage },
               // { title: 'Login', component: LoginPage },
                { title: 'Find your Fit', component: ArbinPage },
               // { title: 'Registration', component: RegistrationPage },
               { title: 'Orders', component: MyorderPage },
                { title: 'About', component: AboutPage },
                { title: 'Logout', component: 'logout' }
                
              ];
              this.username=localStorage.getItem('username');
    }
    else
    {
      this.pages = [
        { title: 'Phisakhol', component: HomePage },
        { title: 'Login', component: LoginPage },
        { title: 'Find your Fit', component: ArbinPage },
        { title: 'Registration', component: RegistrationPage },
        { title: 'About', component: AboutPage },
       // { title: 'Logout', component: LoginPage },
      ];
    }
   
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component=='logout')
    {
      localStorage.clear();
      this.platform.exitApp();
    }
    else{
          this.nav.setRoot(page.component);
    }
    
  }
  listenToLoginEvents() {
    this.events.subscribe('user:login', ( uname,tok) => {
      console.log('username', uname)
      
      this.username=uname;
      this.pages = [
        { title: 'Phisakhol', component: HomePage },
       // { title: 'Login', component: LoginPage },
        { title: 'Find your Fit', component: ArbinPage },
       // { title: 'Registration', component: RegistrationPage },
       { title: 'Orders', component: MyorderPage },
        { title: 'About', component: AboutPage },
        { title: 'Logout', component: 'logout' }
        
      ];
    });
  }

}
