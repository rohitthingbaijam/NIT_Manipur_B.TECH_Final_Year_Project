import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class DataserviceProvider { 

  apiBaseUrl="http://phpstack-178083-797126.cloudwaysapps.com/api/"; // api base url
  apiImageUrl="http://phpstack-178083-797126.cloudwaysapps.com/web/";
  private trips: any;

  constructor( public http: Http) {
    //this.trips = TRIPS;
  }

  

// api stull
      loginUrl;
      payload;
      headers;
     async checkLogin(user,secondPara, loginURL)
      {
          let apiUrl1=this.apiBaseUrl + loginURL;
         //  console.log(secondPara)
           this.payload = {
            "Username":user, 
            "Password":secondPara
                      };
            console.log(JSON.stringify(this.payload));

           // return this.http.post(this.loginUrl,JSON.stringify(this.payload))
            return this.http.post(apiUrl1,JSON.stringify(this.payload))

            .toPromise()

            .then(response => {
               return  response.json();
                })

            .catch(err=>{

              console.log('login_error:-', err);

              return 0;

            });

      }

      //this.username, this.password, this.email, this.phoneno, this.address,
      async checkSignup(username,pass,email, phone, add, regiterURL)
      {
          let apiUrl1=this.apiBaseUrl + regiterURL;
         //  console.log(secondPara)
           this.payload = {
            "Username":username, 
            "Password":pass,
            "Email": email,
            "Phoneno": phone,
            "Address": add
                      };
            console.log(JSON.stringify(this.payload));

           // return this.http.post(this.loginUrl,JSON.stringify(this.payload))
            return this.http.post(apiUrl1,JSON.stringify(this.payload))

            .toPromise()

            .then(response => {
               return  response.json();
                })

            .catch(err=>{

              console.log('login_error:-', err);

              return 0;

            });

      }
      
      async checkaddress(address,mobile,pincode, addressURL)
      {
          let apiUrl1=this.apiBaseUrl + addressURL;
         //  console.log(secondPara)
           this.payload = {
            "Address":address, 
            "Mobile":mobile,
            "Pincode": pincode
  
                      };
            console.log(JSON.stringify(this.payload));

           // return this.http.post(this.loginUrl,JSON.stringify(this.payload))
            return this.http.post(apiUrl1,JSON.stringify(this.payload))

            .toPromise()

            .then(response => {
               return  response.json();
                })

            .catch(err=>{

              console.log('login_error:-', err);

              return 0;

            });

      }

      // get report 
  
        async commonAPI(data, apiURL){
                this.payload =JSON.stringify(data) ;
                let apiUrl1=this.apiBaseUrl + apiURL;
                
                console.log('payload:-',this.payload);
               // console.log('Token:-', localStorage.getItem('tokenKey'))
                this.headers = new Headers({"Token": localStorage.getItem('tokenKey') }); 
                return this.http.post(apiUrl1,this.payload,{headers: this.headers})
                .toPromise()
                .then(response => {
                     console.log('success:-',response.json());
                      return response.json(); 
                  })
                  .catch(err=>{
                        console.log("DATA API ERROR: ",err);
                        return 0;
                  });
        }
}
