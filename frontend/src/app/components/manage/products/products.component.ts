import { Component } from '@angular/core';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button'; 
import { inject,Injectable } from '@angular/core';
import {BrandsService} from './../../../services/brands.service'
import { RouterLink } from '@angular/router';
import { Brand } from '../../../types/brand';
import { ProductService } from '../../../services/product.service';


@Component({
  selector: 'app-products',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatButtonModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  displayedColumns: string[] = ['_id', 'name','shortdescription','price','discount','categoryid','brandid',"Action"];
  dataSource: MatTableDataSource<Brand>;
  productsService=inject(ProductService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {
    // Create 100 users

    
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([] as any);
  }
  
  ngOnInit(){
    this.getServerdata();

  }
  private getServerdata() {
    this.productsService.getProducts().subscribe((result) => {
      console.log(result);
      
      this.dataSource.data = result;
    });
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

  delete(id:String){
     this.productsService.deleteProduct(id).subscribe((result)=>{
     
      this.getServerdata();
     })

  }



}
