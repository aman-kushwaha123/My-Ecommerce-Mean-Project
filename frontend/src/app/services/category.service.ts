import { HttpClient } from '@angular/common/http';
import { inject,Injectable } from '@angular/core';
import { category } from '../types/category';
import {environment} from './../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
   http=inject(HttpClient);
   
  constructor() { }
  getCategories(){
    return this.http.get<category[]>(environment.apiUrl+"/category");
  }
  getCategoryById(id:String){
    return this.http.get<category>(environment.apiUrl+"/category/"+id);
  }
  updateCategory(id:String,name:String){
     return this.http.put(environment.apiUrl+"/category/"+id,{
      name:name
     });

  }
  addCategories(name:String){
    return this.http.post(environment.apiUrl+"/category",{
      name:name,
    })
  }

  deleteCategories(id:String){
    return this.http.delete(environment.apiUrl+"/category/"+id);
  }

}
    