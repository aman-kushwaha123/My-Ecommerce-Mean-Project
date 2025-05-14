import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandsFormComponent } from './components/manage/brands-form/brands-form.component'
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authgaurd } from './core/auth-gaurd';
import { AdminDashboardComponent } from './components/manage/admin-dashboard/admin-dashboard.component';
import { isAdmingaurd } from './core/isadmin-guard';
import { WishlistsComponent } from './components/wishlists/wishlists.component';
import { CartComponent } from './components/cart/cart.component';
import { AddressComponent } from './components/address/address.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProfileComponent } from './components/profile/profile.component';



export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        canActivate:[authgaurd]
    },{
        path:'admin',
        component:AdminDashboardComponent,
        canActivate:[authgaurd,isAdmingaurd],
        

    },

    {
        path:"admin/categories",
        component:CategoriesComponent,
        canActivate:[authgaurd,isAdmingaurd]
    },
    {
        path:"admin/categories/add",  //edit or for upadate
        component:CategoryFormComponent,
        canActivate:[authgaurd,isAdmingaurd]
    },
    {
        path:"admin/categories/:id",  //edit or for upadate
        component:CategoryFormComponent,
        canActivate:[authgaurd,isAdmingaurd]
    },
    
{
    path:"admin/brands",
    component:BrandsComponent,
     canActivate:[authgaurd,isAdmingaurd]
},
{
    path:"admin/brands/add",  
    component:BrandsFormComponent,
    canActivate:[authgaurd,isAdmingaurd]
},
{
    path:"admin/brands/:id",  //edit or for upadate
    component:BrandsFormComponent,
    canActivate:[authgaurd,isAdmingaurd]
},
{
    path:"admin/products",
    component:ProductsComponent,
    canActivate:[authgaurd,isAdmingaurd]
},
{
    path:"admin/products/add",  
    component:ProductFormComponent,
    canActivate:[authgaurd,isAdmingaurd]
},
{
    path:"admin/products/:id",  
    component:ProductFormComponent,
    canActivate:[authgaurd,isAdmingaurd]
},
{
    path:"admin/order",  
    component:AdminOrdersComponent,
    canActivate:[authgaurd,isAdmingaurd]

},
{
    path:"products",
    component:ProductListComponent,
    canActivate:[authgaurd]
},
{
    path:"products/:id",
    component:ProductDetailComponent,
    canActivate:[authgaurd]
},{
    path:"register",
    component:RegisterComponent,
    
   
},{
    path:"login",
    component:LoginComponent,
    
    
},
{
    path:"wishlists",
    component:WishlistsComponent,
    canActivate:[authgaurd]
},
{
    path:"cart",
    component:CartComponent,
    canActivate:[authgaurd]
    
},
{
    path:"Address",
    component:AddressComponent,
    canActivate:[authgaurd]
},
{
    path:"Address/:id",
    component:AddressComponent,
    canActivate:[authgaurd]
},
{ 
    path:"order",
    component:OrderComponent,
    canActivate:[authgaurd]

},
{
    path:"order-detail/:id",
    component:OrderDetailComponent,
    canActivate:[authgaurd]
},
{
    path:"profile",
    component:ProfileComponent,
    canActivate:[authgaurd]
}
    


];
  