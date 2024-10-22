import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './Components/first-component/first-component.component';
import { SecondComponentComponent } from './Components/second-component/second-component.component'; 
import { NotFoundComponent } from './not-found/not-found.component'; 

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'formulario',
    loadChildren: () => import('./formulario/formulario.module').then(m => m.FormularioPageModule)
  },
  {
    path: 'first-component',
    component: FirstComponent // Ruta para el primer componente
  },
  {
    path: 'second-component',
    component: SecondComponentComponent // Ruta para el segundo componente
  },
 {
  path: 'alumno',  // Ruta para el alumno
  loadChildren: () => import('./alumno/alumno.module').then(m => m.AlumnoPageModule)
},
  {
    path: '**', // Ruta wildcard para manejar 404
    component: NotFoundComponent // Redirige a la página Not Found
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
