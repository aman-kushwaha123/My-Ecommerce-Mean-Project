import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const isAdmingaurd:CanActivateFn=(route,state)=>{
    let authService=inject(AuthService)
    let router=inject(Router)
    if(authService.isAdmin()){
        return true
    }
    else{
        router.navigateByUrl('')
        return false
    }

}