import { Component,inject} from '@angular/core';
import { OrderService } from '../../services/order.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-order',
  imports: [DatePipe,MatButtonModule,RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
   cartService=inject(CartService)
   orderService=inject(OrderService)
   order!:any
   
   ngOnInit(){
       this.cartService.init()
       this.orderService.init()
       

   }
   




}
