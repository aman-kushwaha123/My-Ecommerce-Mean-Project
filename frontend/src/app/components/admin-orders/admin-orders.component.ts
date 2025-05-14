import { Component,inject } from '@angular/core';
import {AfterViewInit,  ViewChild} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule,MatPaginator } from '@angular/material/paginator';
import { MatSortModule,MatSort } from '@angular/material/sort';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { Router, RouterLink,ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-orders',
  imports: [MatFormFieldModule,MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatButtonModule,MatButtonToggleModule,FormsModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent {
  orderService=inject(OrderService)
  route=inject(ActivatedRoute)
  displayedColumns: string[] = ['_id', 'name','Total',"Action","charges"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  user:any
  orders:any[]=[]
  name!:String
  shippingcharge!:Number
  deliverycharge!:Number
  constructor(){
    this.dataSource = new MatTableDataSource([] as any)
  }

  ngOnInit(){
    this.getServerData()
    this.orderService.init()
    this.user=localStorage['user']
    this.name=JSON.parse(this.user).name
    
    
    
    
  }

private getServerData(){
   this.dataSource.data=this.orderService.orders
}
  

ngAfterViewInit() {
 
   this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
    
 
}


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
} 
Scharge(e:any){
  this.shippingcharge=e
   
}
Dcharge(e:any){
  this.deliverycharge=e
 
}
updateStatus(e:any,orderid:String){
  let status=e.value
  this.orderService.updateOrderStatus(orderid,status).subscribe((result)=>{
    alert("Status Updated")
   
  })
}

  updatecharge(orderid:String){
  
  let charge={
    shippingcharge:this.shippingcharge,
    deliverycharge:this.deliverycharge
  }
  this.orderService.updateOrderCharges(orderid,charge).subscribe((result)=>{
    alert("Charges Updated")
   
  })
  

}

}