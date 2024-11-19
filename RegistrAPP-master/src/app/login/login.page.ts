import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service'; // Importa tu servicio de base de datos

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private databaseService: DatabaseService // Inyecta el servicio de base de datos
  ) {
    this.formularioLogin = this.fb.group({
      usuario: ['', [Validators.required, this.validarCorreo]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Método para validar el campo de correo
  validarCorreo(control: any) {
    const correo = control.value;
    const patronCorreo = /@(duocuc\.cl|profesor\.duoc\.cl)$/; // Solo dominios permitidos
    return correo && !patronCorreo.test(correo) ? { correoInvalido: true } : null;
  }

  // Método para verificar si un campo es inválido
  isFieldInvalid(field: string): boolean {
    const control = this.formularioLogin.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordType === 'password' ? 'eye-off' : 'eye';
  }
  // Método para verificar si un campo es válido
isFieldValid(field: string): boolean {
  const control = this.formularioLogin.get(field);
  return control ? control.valid && (control.dirty || control.touched) : false;
}

async registrarUsuarioDePrueba() {
  try {
    const email = 'ejemplo@duocuc.cl'; // Cambia esto si quieres otro correo
    const password = '123456';         // Contraseña de prueba
    await this.databaseService.addUser(email, password);
    console.log('Usuario de prueba registrado correctamente');
  } catch (error) {
    console.error('Error al registrar el usuario de prueba:', error);
  }
}

  // Método para iniciar sesión
   async iniciarSesion() {
   if (this.formularioLogin.valid) {
      const usuario = this.formularioLogin.get('usuario')?.value;
      const contraseña = this.formularioLogin.get('contraseña')?.value;

    try {
      const user = await this.databaseService.getUser(usuario, contraseña);

       if (user) {
         // Guarda el usuario y su rol en localStorage
          localStorage.setItem('usuario', usuario);
       localStorage.setItem('rol', user.role);

          // Redirige según el rol del usuario
          if (user.role === 'docente') {
           this.router.navigate(['/home']);
          } else if (user.role === 'alumno') {
            this.router.navigate(['/alumno']);
          }
           alert('Usuario o contraseña incorrectos');
        }
       } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Ocurrió un error al iniciar sesión');
      }
     } else {
      alert('Por favor, completa correctamente el formulario');
     }
  }
  async irHome() {
    if (this.formularioLogin.valid) {
      const email = this.formularioLogin.get('usuario')?.value;
      const password = this.formularioLogin.get('contraseña')?.value;
  
      try {
        await this.databaseService.addUser(email, password);
        console.log('Usuario registrado e iniciado sesión');
        // Redirige según el rol del usuario
        if (email.includes('@profesor.duoc.cl')) {
          this.router.navigate(['/home']);
        } else if (email.includes('@duocuc.cl')) {
          this.router.navigate(['/alumno']);
        }
      } catch (error) {
        console.error('Error al registrar el usuario', error);
      }
    }
  }

}