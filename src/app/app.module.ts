import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CommonserviceProvider } from '../providers/commonservice/commonservice';
import { HttpClientModule } from '@angular/common/http';
import { DataserviceProvider } from '../providers/dataservice/dataservice';
import { AuthServiceProvider } from '../providers/auth-service/auth-sevice';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { mergeAnalyzedFiles } from '@angular/compiler';
import { IonicStorageModule } from '@ionic/storage';

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
import { AboutPage } from '../pages/about/about'; 
import { CartPage } from '../pages/cart/cart';
import { PaymentPage } from '../pages/payment/payment';
import { ThankyouPage } from '../pages/thankyou/thankyou';
import { MyorderPage } from '../pages/myorder/myorder';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ArbinPage,
    MancustomPage,
    WomencustomPage,
    ManshirtsPage,
    MantrousersPage,
    WomenshirtsPage,
    WomenblousePage,
    LoginPage,
    RegistrationPage,
    TrendsPage,
    NewarrivalsPage,
    SalePage,
    CartPage,
    PaymentPage,
    ThankyouPage,
    AboutPage,
    MyorderPage,
 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ArbinPage,
    MancustomPage,
    WomencustomPage,
    ManshirtsPage,
    MantrousersPage,
    WomenshirtsPage,
    WomenblousePage,
    LoginPage,
    RegistrationPage,
    TrendsPage,
    NewarrivalsPage,
    SalePage,
    ListPage,
    CartPage,
    PaymentPage,
    ThankyouPage,
    AboutPage,
    MyorderPage,
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataserviceProvider,
    CommonserviceProvider,
    AuthServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
