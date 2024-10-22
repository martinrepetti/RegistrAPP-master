import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  formularioLogin: FormGroup;
  usuarioFocused = false;
  passwordFocused = false;
  
  // Propiedades para mostrar/ocultar la contraseña
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(private fb: FormBuilder, private router: Router) {
    this.formularioLogin = this.fb.group({
      usuario: ['', [Validators.required, this.validarCorreo]],
      contraseña: ['', Validators.required],
    });
  }
 // Método para validar el campo de correo
 validarCorreo(control: any) {
  const correo = control.value;
  const patronCorreo = /@(duocuc\.cl|profesor\.duoc\.cl)$/; // Verifica si el correo termina con los dominios permitidos
  return correo && !patronCorreo.test(correo) ? { correoInvalido: true } : null;
}
  // Método para verificar si un campo es inválido
  isFieldInvalid(field: string): boolean {
    const control = this.formularioLogin.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  // Método para verificar si un campo es válido
  isFieldValid(field: string): boolean {
    const control = this.formularioLogin.get(field);
    return control ? control.valid && (control.dirty || control.touched) : false;
  }

  // Método modificado para redirigir según el tipo de usuario
  irHome() {
    if (this.formularioLogin.valid) {
      const usuario = this.formularioLogin.get('usuario')?.value;
     
      
      // Almacena el nombre de usuario y tipo en localStorage
      localStorage.setItem('usuario', usuario);

      // Redirige según el dominio del correo
      if (usuario.includes('@profesor.duoc.cl')) {
        this.router.navigate(['/home']);
      } else if (usuario.includes('@duocuc.cl')) {
        this.router.navigate(['/alumno']);
      }
    }
  }
  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }
}