import { Injectable,inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  http=inject(HttpClient)
  orders:any
  init(){
    this.getorder().subscribe((result)=>{
      this.orders=result
    })
  }

  addorder(order:any){
    return this.http.post(environment.apiUrl+'/customer/order/add',order)
  }
  getorder(){
    return this.http.get(environment.apiUrl+'/customer/order')
  }
  getorderById(id:String){
    return this.http.get(environment.apiUrl+'/customer/order/'+id)
  }

  updateOrderStatus(id:String,status:String){
    return this.http.put(environment.apiUrl+'/admin/order/'+id,status)

  }
  updateOrderCharges(id:String,charges:any){
    return this.http.put(environment.apiUrl+'/admin/order/charge/'+id,charges)

  }

  constructor() { }
}
