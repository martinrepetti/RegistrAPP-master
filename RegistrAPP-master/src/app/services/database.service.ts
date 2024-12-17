import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dbInstance: SQLiteObject | null = null;

  constructor(private sqlite: SQLite) {
    this.initializeDatabase();
  }

  // Inicializa la base de datos
  private async initializeDatabase() {
    try {
      this.dbInstance = await this.sqlite.create({
        name: 'DB.db',
        location: 'default'
      });
      await this.dbInstance.executeSql(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT,
          password TEXT
        );
      `, []);
    } catch (error) {
      console.error('Error initializing database', error);
    }
  }

  // Método para agregar un usuario
  public async addUser(email: string, password: string) {
    try {
      await this.dbInstance!.executeSql(`
        INSERT INTO users (email, password) VALUES (?, ?)
      `, [email, password]);
    } catch (error) {
      console.error('Error adding user', error);
    }
  }

  // Método para obtener un usuario por correo y contraseña
  public async getUser(email: string, password: string) {
    try {
      const res = await this.dbInstance!.executeSql(`
        SELECT * FROM users WHERE LOWER(email) = LOWER(?) AND password = ?
      `, [email, password]);
      if (res.rows.length > 0) {
        return res.rows.item(0);
      }
      return null;
    } catch (error) {
      console.error('Error fetching user', error);
      return null;
    }
  }
}
