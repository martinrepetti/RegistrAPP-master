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

  private async initializeDatabase() {
    try {
      this.dbInstance = await this.sqlite.create({
        name: 'users.db',
        location: 'default'
      });
      await this.dbInstance.executeSql(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT,
          password TEXT,
          role TEXT
        );
      `, []);
    } catch (error) {
      console.error('Error initializing database', error);
    }
  }

  public async addUser(email: string, password: string) {
    const role = email.includes('@profesor.duoc.cl') ? 'docente' : 'alumno';
    try {
      await this.dbInstance!.executeSql(`
        INSERT INTO users (email, password, role) VALUES (?, ?, ?)
      `, [email, password, role]);
    } catch (error) {
      console.error('Error adding user', error);
    }
  }

  public async getUser(email: string, password: string) {
    try {
      const res = await this.dbInstance!.executeSql(`
        SELECT * FROM users WHERE email = ? AND password = ?
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
