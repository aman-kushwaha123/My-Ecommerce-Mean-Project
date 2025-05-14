import { inject,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {cart} from './../types/cart'
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CartService {
   http=inject(HttpClient)
   cartProducts:cart[]=[]
   total!:Number
   init(){
     this.getcart().subscribe((result)=>{
          this.cartProducts=result
     })
   }
   
  addtocart(id:any,quantity:Number){
    
    return this.http.post(environment.apiUrl+'/customer/cart/'+id,{quantity:quantity})

  }

  removefromcart(id:any){
    return this.http.delete(environment.apiUrl+'/customer/cart/'+id)
  }

  getcart(){
    return this.http.get<cart[]>(environment.apiUrl+'/customer/cart')
  }

  constructor() { }
}
