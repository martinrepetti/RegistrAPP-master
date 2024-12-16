import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage{

  scannedData: string | null = null;

  constructor(private barcodeScanner: BarcodeScanner) {}

  scanQRCode() {
    this.barcodeScanner.scan().then(
      (barcodeData) => {
        console.log('Barcode data', barcodeData);
        this.scannedData = barcodeData.text; // Guardar el texto del QR
      },
      (err) => {
        console.error('Error', err);
      }
    );
  }
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
