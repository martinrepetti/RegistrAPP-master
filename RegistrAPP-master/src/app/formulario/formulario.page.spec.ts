import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule para pruebas de formularios
import { FormularioPage } from './formulario.page';
import { IonicModule } from '@ionic/angular';

describe('FormularioPage', () => {
  let component: FormularioPage;
  let fixture: ComponentFixture<FormularioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(), // Importa IonicModule para la funcionalidad de Ionic
        ReactiveFormsModule // Importa ReactiveFormsModule para pruebas de formularios reactivos
      ],
      declarations: [FormularioPage]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with email field', () => {
    expect(component.passwordRecoveryForm.contains('email')).toBeTrue();
  });

  it('should make the email field required and validate email format', () => {
    const emailControl = component.passwordRecoveryForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalse(); // El campo debe ser inválido si está vacío

    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBeTrue(); // El campo debe ser válido con un correo electrónico correcto
  });

  it('should set emailSent to true when form is valid and submitted', () => {
    component.passwordRecoveryForm.get('email')?.setValue('test@example.com');
    component.onSubmit();
    expect(component.emailSent).toBeTrue(); // El estado de emailSent debe ser verdadero después del envío del formulario
  });

  it('should not set emailSent to true when form is invalid and submitted', () => {
    component.passwordRecoveryForm.get('email')?.setValue('');
    component.onSubmit();
    expect(component.emailSent).toBeFalse(); // El estado de emailSent no debe cambiar si el formulario es inválido
  });
});
