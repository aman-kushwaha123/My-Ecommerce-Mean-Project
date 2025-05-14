import { Component,inject } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router,ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-order-detail',
  imports: [DatePipe],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {
      orderService=inject(OrderService)
      route=inject(ActivatedRoute)
      id!:String
      order:any
      qty:Boolean=false

      
      ngOnInit(){
        this.orderService.init()
        this.id=this.route.snapshot.params['id']
        this.order=this.orderService.getorderById(this.id).subscribe((result)=>{
          this.order=result
          if(this.order.quantity){
            this.qty=true



          }else{
            this.qty=false
          }
          
        })
        
        
      }

      getname(){
        let user=localStorage['user']
        let name=JSON.parse(user).name
        let email=JSON.parse(user).email
        

        return {name,email}

      }

      gettotal(){
        let total=(this.order.shippingcharge+this.order.deliverycharge)+this.order.total
        return total
      }
}
 