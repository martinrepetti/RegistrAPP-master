import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dbInstance!: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.createDatabase();
  }

  private async createDatabase() {
    this.dbInstance = await this.sqlite.create({
      name: 'myapp.db',
      location: 'default'
    });
    await this.dbInstance.executeSql(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT,
        contraseña TEXT
      )
    `, []);
  }

  async addUser(usuario: string, contraseña: string) {
    const sql = 'INSERT INTO users (usuario, contraseña) VALUES (?, ?)';
    return this.dbInstance.executeSql(sql, [usuario, contraseña]);
  }
}
