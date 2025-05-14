import { HttpInterceptorFn } from "@angular/common/http";
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import { throwError } from "rxjs";


export const tokenHttpInterceptor:HttpInterceptorFn=(req,next)=>{
       const router=inject(Router)
      const token=localStorage.getItem("token");
      if(token){
        req=req.clone({
            setHeaders:{
                Authorization : token,
            }
        })

        
      }
      return next(req);
      
      
}