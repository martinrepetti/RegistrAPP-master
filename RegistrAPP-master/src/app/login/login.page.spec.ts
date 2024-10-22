// Importaciones necesarias para las pruebas unitarias
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'; // Para simular el enrutamiento en pruebas
import { HomePage } from './home.page'; // Componente HomePage a testear
import { ReactiveFormsModule } from '@angular/forms'; // Para formularios reactivos en pruebas
import { LoginPage } from './login.page'; // Componente LoginPage para pruebas

// Grupo de pruebas para el componente LoginPage
describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  // Configuración inicial del entorno de pruebas para LoginPage
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage); // Crea una instancia del componente LoginPage
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Detecta y aplica los cambios al DOM
  });

  // Verificación básica para comprobar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente existe
  });
});

// Grupo de pruebas para el componente HomePage
describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;

  // Configuración inicial del entorno de pruebas para HomePage
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage], // Declara el componente HomePage para la prueba
      imports: [
        IonicModule.forRoot(), // Importa el módulo de Ionic para uso en las pruebas
        ReactiveFormsModule, // Importa formularios reactivos para simular el formulario de login
        RouterTestingModule.withRoutes([]), // Simula la navegación con rutas vacías para el test
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage); // Crea una instancia del componente HomePage
    component = fixture.componentInstance; // Obtiene la instancia del componente
    router = TestBed.inject(Router); // Inyecta el Router para simular la navegación
    fixture.detectChanges(); // Detecta y aplica los cambios al DOM
  });

  // Verificación básica para comprobar que el componente HomePage se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente existe
  });

  // Prueba que verifica la navegación a la página "home" cuando el formulario de login es válido
  it('should navigate to "home" when login button is clicked and form is valid', () => {
    const navigateSpy = spyOn(router, 'navigate'); // Espía la función de navegación del Router

    // Simula que el formulario tiene valores válidos
    component.formularioLogin.controls['usuario'].setValue('testuser'); // Usuario válido
    component.formularioLogin.controls['contraseña'].setValue('password123'); // Contraseña válida

    // Llama al método que desencadena la navegación al hacer login
    component.irHome();

    // Verifica que se haya llamado a la función de navegación con la ruta '/home'
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  // Prueba que verifica que no se navega si el formulario de login es inválido
  it('should not navigate when form is invalid', () => {
    const navigateSpy = spyOn(router, 'navigate'); // Espía la función de navegación del Router

    // Simula que el formulario es inválido (campo de contraseña vacío)
    component.formularioLogin.controls['usuario'].setValue('testuser'); // Usuario válido
    component.formularioLogin.controls['contraseña'].setValue(''); // Contraseña vacía

    // Llama al método que desencadena la navegación, pero no debería navegar ya que el formulario es inválido
    component.irHome();

    // Verifica que la función de navegación no haya sido llamada
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
