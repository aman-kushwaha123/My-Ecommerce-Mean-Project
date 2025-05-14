import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { inject,Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {BrandsService} from './../../../services/brands.service'
@Component({
  selector: 'app-brands-form',
  imports: [ FormsModule,MatButtonModule,MatInputModule],
  templateUrl: './brands-form.component.html',
  styleUrl: './brands-form.component.css'
})
export class BrandsFormComponent {
  name!:String;
  router=inject(Router);
  brandsService=inject(BrandsService)
  route=inject(ActivatedRoute);
  isEdit=false;
  id!:String;
  ngOnInit(){
    this.id=this.route.snapshot.params['id']
    console.log(this.id)
    if(this.id){
      this.isEdit=true
      this.brandsService.getBrandsById(this.id).subscribe((result:any)=>{
        console.log(result);
        this.name=result.name;
            
      })

   }
  }

  add(){
    console.log(this.name)
    this.brandsService.addBrands(this.name).subscribe((result:any)=>{
      alert("brands Added")
      this.router.navigateByUrl('/admin/brands')
    })
  }

  update(){
    this.brandsService.updateBrands(this.id,this.name).subscribe((result:any)=>{
          alert('updated');
          this.router.navigateByUrl('/admin/brands')
    })
  }

  
  


}
 