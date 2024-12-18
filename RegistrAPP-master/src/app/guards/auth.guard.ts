import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}

  // Método de verificación de autenticación
  checkIfUserIsAuthenticated(): boolean {
    // Aquí debes implementar tu lógica de autenticación.
    // Por ejemplo, podrías verificar un token almacenado en el local storage.
    const isAuthenticated = false; // Cambia esto según tu lógica de autenticación

    if (!isAuthenticated) {
      this.router.navigate(['login']); // Redirige a la página de inicio de sesión si no está autenticado
    }
    return isAuthenticated;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DocenteGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isDocente()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AlumnoGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAlumno()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}


// Implementación del guard utilizando CanActivateFn
export const authGuard: CanActivateFn = (route, state) => {
  const authGuardInstance = new AuthGuard(new Router());
  return authGuardInstance.checkIfUserIsAuthenticated();
};
