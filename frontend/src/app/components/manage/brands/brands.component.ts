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
@Component({
  selector: 'app-brands',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatButtonModule,RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  displayedColumns: string[] = ['_id', 'name',"Action"];
  dataSource: MatTableDataSource<Brand>;
  brandService=inject(BrandsService);
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
    this.brandService.getBrands().subscribe((result) => {
     
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
  this.brandService.deleteBrands(id).subscribe((result)=>{
    alert("category deleted");
    this.getServerdata();
  })
}
}


