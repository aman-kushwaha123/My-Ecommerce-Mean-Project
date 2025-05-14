import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const authgaurd:CanActivateFn=(route,state)=>{
    const router=inject(Router)
    const authservice=inject(AuthService)
    if(authservice.isLoggedIn()){
        return true
    }
    else{
        router.navigateByUrl('/login')
        return false
    }
       

}