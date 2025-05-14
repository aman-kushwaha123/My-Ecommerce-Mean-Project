import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder,ReactiveFormsModule,Validators,FormGroup} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [MatInputModule,MatCheckboxModule,MatButtonModule,ReactiveFormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
   router=inject(Router)
   formbuilder=inject(FormBuilder)
   authService=inject(AuthService);
   registerForm=this.formbuilder.group({
      name:[null,[Validators.required,Validators.minLength(5)]],
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required,Validators.minLength(5)]]
   })


  register(){
    let value=this.registerForm.value as any
    
    this.authService.registerUser(value).subscribe((result)=>{
        alert("Ragistered")
        this.router.navigateByUrl("login");
    })
  }





}
