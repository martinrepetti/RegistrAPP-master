import { Component, OnInit } from '@angular/core';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  // async openCamera() {
  //   try {
  //     const image = await Camera.getPhoto({
  //       quality: 90,
  //       allowEditing: false,
  //       resultType: CameraResultType.Uri,
  //       source: CameraSource.Camera,
  //     });
  //     this.capturedImage = image.webPath;
  //     console.log('Imagen capturada:', this.capturedImage);
  //   } catch (error) {
  //     console.error('Error al abrir la cámara:', error);
  //   }
  // }
}