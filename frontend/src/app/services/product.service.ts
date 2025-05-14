import { inject,Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Product} from './../types/product'
import {environment} from './../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpclient=inject(HttpClient);
  Products:Product[]=[]
  constructor() { }
  init(){
    this.getProducts().subscribe((result)=>{
      this.Products=result
    })
  }

  getProducts(){
    return this.httpclient.get<Product[]>(environment.apiUrl+'/product')
  }

  getProduct(id:String){
    return this.httpclient.get<Product>(environment.apiUrl+'/product/'+id)
}
  
  addProduct(model:Product){
    return this.httpclient.post(environment.apiUrl+'/product',model)
  }

  UpdateProduct(id:String,model:Product){
    return this.httpclient.put(environment.apiUrl+'/product/'+id,model)
  }

  deleteProduct(id:String){
    return this.httpclient.delete(environment.apiUrl+'/product/'+id)
  }


   
  
}
