import { HttpClient } from '@angular/common/http';
import { inject,Injectable } from '@angular/core';
import {Brand} from './../types/brand'
import {environment} from './../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class BrandsService {
    http=inject(HttpClient);
  constructor() { }
   
  getBrands()
   {
    return this.http.get<Brand[]>(environment.apiUrl+"/brand")
   }
    
     getBrandsById(id:String){
       return this.http.get<Brand>(environment.apiUrl+"/brand/"+id);
     }
    updateBrands(id:String,name:String){
      return this.http.put(environment.apiUrl+"/brand/"+id,{
        name:name
      })
    }
   
     
     addBrands(name:String){
       return this.http.post<Brand>(environment.apiUrl+"/brand",{
         name:name,
       })
     }
   
     deleteBrands(id:String){
       return this.http.delete(environment.apiUrl+"/brand/"+id);
     }
   
}
  