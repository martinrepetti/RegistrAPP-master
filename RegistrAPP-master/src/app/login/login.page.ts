import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    // Creamos el formulario con los controles 'email' y 'password'
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Función para manejar el inicio de sesión
  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Verifica si el usuario ya está registrado
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.find((user: any) => user.email === email);

      if (!userExists) {
        // Si el usuario no existe, lo registramos
        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
      }

      // Redirige según el dominio del correo electrónico
      if (email.includes('@profesor.duoc.cl')) {
        localStorage.setItem('user', JSON.stringify({ email, role: 'profesor' }));
        this.router.navigate(['/home']);
      } else if (email.includes('@duocuc.cl')) {
        localStorage.setItem('user', JSON.stringify({ email, role: 'alumno' }));
        this.router.navigate(['/alumno']);
      } else {
        alert('Correo no válido');
      }
    } else {
      alert('Por favor, completa todos los campos correctamente');
    }
  }
}
