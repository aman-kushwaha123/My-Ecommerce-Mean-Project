import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Address } from '../types/address';
@Injectable({
  providedIn: 'root'
})
export class AddressService {
   http=inject(HttpClient)
   Address:Address[]=[]

   init(){
     this.getAddress().subscribe((result)=>{
       this.Address=result as any
       
     })
   }
   
   getAddress(){
    return this.http.get<Address>(environment.apiUrl+'/customer/Address')
   }
   addAddress(model:String){
    return this.http.post(environment.apiUrl+'/customer/Address/add',model)
   }
   updateAddress(model:String){
     return this.http.put(environment.apiUrl+'/customer/Address/update',model)
   }
   deleteAddress(){
     return this.http.delete(environment.apiUrl+'/customer/Address/delete')
   }


  constructor() { }
}
