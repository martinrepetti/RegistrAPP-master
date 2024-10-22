// Importaciones necesarias desde Angular para la configuración de rutas
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importación del componente LoginPage que se mostrará en esta ruta
import { LoginPage } from './login.page';

// Definición de las rutas para el módulo de la página de login
const routes: Routes = [
  {
    path: '', // Ruta raíz para esta página
    component: LoginPage // El componente que se mostrará cuando se acceda a esta ruta
  }
];

// Decorador @NgModule que configura el módulo de rutas para esta página
@NgModule({
  imports: [RouterModule.forChild(routes)], // Se cargan las rutas definidas en este módulo
  exports: [RouterModule], // Se exporta RouterModule para que las rutas puedan ser usadas por otros módulos
})
export class LoginPageRoutingModule {} // Exportación del módulo para su uso en otros lugares de la aplicación
