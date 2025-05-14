import { inject,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  http=inject(HttpClient)
  wishlists:Product[]=[]
  init(){
    this.getwishlist().subscribe((result)=>{
        this.wishlists=result
       
    })
    
  }
  
  getwishlist(){
    return this.http.get<Product[]>(environment.apiUrl+'/customer/wishlist')
  }

  addwishlist(id:any){
    return this.http.post(environment.apiUrl+'/customer/wishlist/'+id,{})
  }
  removewishlist(id:any){
        return  this.http.delete(environment.apiUrl+'/customer/wishlist/'+id)
  }
  constructor() { }
}
