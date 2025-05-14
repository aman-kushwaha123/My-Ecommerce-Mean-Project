import { inject,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../types/product';
import { category } from '../types/category';
import { Brand } from '../types/brand';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http=inject(HttpClient);
  getNewproduct(){
   return this.http.get<Product[]>(environment.apiUrl+"/customer/new-products");
  }

  getfeaturedproduct(){
    return this.http.get<Product[]>(environment.apiUrl+"/customer/featured-products");
  }

  getCategories(){
    return this.http.get<category[]>(environment.apiUrl+"/customer/categories")
  }
  getBrands(){
    return this.http.get<Brand[]>(environment.apiUrl+"/customer/brands")
  }

  getproductforlisting(searchterm:String,categoryid:String,page:number,pagesize:number,sortBy:String,sortOrder:number,brandid:String){
     
      return this.http.get<Product[]>(environment.apiUrl+`/customer/products?searchterm=${searchterm}&categoryid=${categoryid}&page=${page}&pagesize=${pagesize}&sortBy=${sortBy}&sortOrder=${sortOrder}&brandid=${brandid}`);

  }

  getproductById(id:String){
    return this.http.get<Product>(environment.apiUrl+'/customer/products/'+id)
  }

  getproductBybrand(id:String){
    return this.http.get<Product>(environment.apiUrl+'/customer/product/'+id)
  }
  updatename(name:String){
    return this.http.put(environment.apiUrl+'/customer/update',name)
  }
  
  constructor() { }
}
