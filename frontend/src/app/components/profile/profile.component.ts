import { Component,inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  custmerService=inject(CustomerService)
  authService=inject(AuthService)
  user:any
  name!:String
    ngOnInit(){
      this.user=JSON.parse(localStorage['user'])
      this.name=this.authService.name
    
    }

    updatename(){
       this.custmerService.updatename(this.name).subscribe((result)=>{
        alert("Profile Edited")
       })
    }
}
