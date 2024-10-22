import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Proporciona directivas comunes como ngIf y ngFor
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Para trabajar con formularios, tanto reactivos como basados en plantillas
import { IonicModule } from '@ionic/angular'; // Proporciona los componentes y directivas de Ionic

import { LoginPageRoutingModule } from './login-routing.module'; // Módulo de enrutamiento específico para LoginPage
import { LoginPage } from './login.page'; // Componente LoginPage

@NgModule({
  imports: [
    CommonModule, // Importa módulos comunes para el uso general
    FormsModule, // Importa FormsModule para formularios basados en plantillas
    ReactiveFormsModule, // Importa ReactiveFormsModule para formularios reactivos
    IonicModule, // Importa el módulo Ionic para componentes de Ionic
    LoginPageRoutingModule // Importa el módulo de enrutamiento para LoginPage
  ],
  declarations: [LoginPage] // Declara el componente LoginPage en este módulo
})
export class LoginPageModule {}
