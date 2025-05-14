import { Component,inject} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatInputModule,MatButtonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
     formbuilder=inject(FormBuilder)
     authService=inject(AuthService)
     router=inject(Router)
     loginForm=this.formbuilder.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]]
     })
     login(){
         let value=this.loginForm.value as any
         this.authService.loginUser(value).subscribe((result:any)=>{
          alert("User LoggedIn")
          localStorage.setItem("token",result.token)
          localStorage.setItem("user",JSON.stringify(result.user))
          this.router.navigateByUrl('')

          
         })

     }

}
