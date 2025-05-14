import { Injectable ,inject} from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  httpclient=inject(HttpClient)
  name!:String
  init(){
    this.getuserByUserid().subscribe((result:any)=>{
      this.name=result[0].name
    })

  }
 
  
  registerUser(model:User){
     return this.httpclient.post(environment.apiUrl+"/auth/register",model)
    
  }

  loginUser(model:User){
    return this.httpclient.post(environment.apiUrl+"/auth/login",model)
  }

  isLoggedIn(){
    let token=localStorage.getItem("token");
    if(token){
      return true
    }
    else{
      return false
    }

  }

  getuserByUserid(){
    return this.httpclient.get(environment.apiUrl+"/customer/username")
  }

  
 
 logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    

    
  }

  isAdmin(){
    let userData=localStorage.getItem("user")
    if(userData){
      return JSON.parse(userData).isAdmin
    }
    else{
      return false;
    }
  }
}
