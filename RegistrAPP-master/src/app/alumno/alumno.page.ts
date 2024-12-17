import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit{

    segment='scan';
    scanResult=""
 
  constructor( 
    private modalController: ModalController,
    private platform: Platform,
    private loadingController: LoadingController,
  ) {}

ngOnInit(): void {
    if(this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
}

async startScan() {
  const modal = await this.modalController.create({
  component: BarcodeScanningModalComponent,
  cssClass:'barcode-scanning-modal',
  showBackdrop: false,
  componentProps: { 
    formats:[],
    LensFacing:LensFacing.Back
  }
  });

  await modal.present();
  const{data} = await modal.onWillDismiss();

  if (data){
    this.scanResult = data?.barcode?.displayValue
  }

}
}