import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any;

  constructor(private dbService: DatabaseService) {}

  public async login(email: string, password: string) {
    this.currentUser = await this.dbService.getUser(email, password);
    return this.currentUser !== null;
  }

  public isDocente(): boolean {
    return this.currentUser && this.currentUser.role === 'docente';
  }

  public isAlumno(): boolean {
    return this.currentUser && this.currentUser.role === 'alumno';
  }
}
