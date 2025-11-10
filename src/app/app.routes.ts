import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { SeafarersListComponent } from './components/seafarers-list/seafarers-list.component';
import { AddnewseafarerComponent } from './components/addnewseafarer/addnewseafarer.component';
import { EditseafarerComponent } from './components/editseafarer/editseafarer.component';

export const routes: Routes = [

  // layouts auth
  {path:"" , component: AuthComponent , children:[
    {path:"" , redirectTo:"login" , pathMatch:"full" , title:"login"} ,
    {path:"login" , component: LoginComponent , title:"login"} ,
  ]} ,



  // layouts admin

  {path:"" , component:AdminComponent , children:[
    {path:"" , redirectTo:"seafarerslist" , pathMatch:"full" , title:"seafarerslist"} ,
    {path:"seafarerslist" , component: SeafarersListComponent , title:"seafarerslist" } ,
    {path:"newseafarer" , loadComponent:()=> import("./components/addnewseafarer/addnewseafarer.component").then( (c)=>c.AddnewseafarerComponent) , title:"addnewseafarer"} ,
    {path:"editseafarer/:id" , loadComponent:()=> import("./components/editseafarer/editseafarer.component").then( (c)=>c.EditseafarerComponent)  , title:"editseafarer"} ,
  ]}
];
