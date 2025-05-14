import { Component } from '@angular/core';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button'; 
import { inject,Injectable } from '@angular/core';
import {CategoryService} from './../../../services/category.service'
import { RouterLink } from '@angular/router';
import { category } from '../../../types/category';

@Component({
  selector: 'app-categories',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatButtonModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
    displayedColumns: string[] = ['_id', 'name',"Action"];
  dataSource: MatTableDataSource<category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  categoryService=inject(CategoryService);
  constructor() {
    
    // Create 100 users

    
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([] as any);
  }
  ngOnInit(){
    this.getServerdata();

  }

  private getServerdata() {
    this.categoryService.getCategories().subscribe((result) => {
      
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
    this.categoryService.deleteCategories(id).subscribe((result)=>{
      alert("category deleted");
      this.getServerdata();
    })
  }
}
  