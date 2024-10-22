import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {
  passwordRecoveryForm!: FormGroup; // Formulario reactivo para la recuperación de contraseña
  emailSent: boolean = false; // Variable para indicar si el correo fue enviado
  emailFocused: boolean = false; // Variable para controlar el foco del campo email

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // Inicialización del formulario con validaciones
    this.passwordRecoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]] // Campo obligatorio con validación de formato de correo
    });
  }

  // Verifica si un campo es inválido y ha sido tocado o sucio
  isFieldInvalid(field: string): boolean {
    const control = this.passwordRecoveryForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  // Verifica si un campo es válido y ha sido tocado o sucio
  isFieldValid(field: string): boolean {
    const control = this.passwordRecoveryForm.get(field);
    return control ? control.valid && (control.dirty || control.touched) : false;
  }

  // Maneja el envío del formulario
  onSubmit() {
    if (this.passwordRecoveryForm.valid) {
      this.emailSent = true; // Indica que el correo fue enviado
      // Aquí iría la lógica para enviar el correo de recuperación
      console.log('Correo de recuperación enviado a:', this.passwordRecoveryForm.value.email);
    }
  }
}
