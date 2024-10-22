import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://api.qrserver.com/v1/create-qr-code/';

  constructor(private http: HttpClient) {}

  generateQR(data: string): Observable<any> {
    // Construir la URL con los parámetros de tamaño y datos
    const qrUrl = `${this.apiUrl}?size=150x150&data=${encodeURIComponent(data)}`;
    
    // Hacer la solicitud GET a la URL
    return this.http.get(qrUrl, { responseType: 'blob' });  // Se espera una imagen, por eso se usa 'blob'
  }
}
