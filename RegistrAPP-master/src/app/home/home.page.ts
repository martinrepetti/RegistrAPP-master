import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isClassStarted: boolean = false;
  usuario: string | null = null;
  qrCodeUrl: string | null = null;
  isQrVisible: boolean = false;

  // Definición de los botones del alert
  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    },
    {
      text: 'Si',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.redirectToLogin();
      }
    },
  ];

  // Inyectamos AlertController, NavController y Router
  constructor(private alertController: AlertController, private navCtrl: NavController, private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario');
  }

  // Método para mostrar el alert
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Finalizar la clase?',
      buttons: this.alertButtons,
    });

    await alert.present();
  }

  // Método para redirigir al login
  redirectToLogin() {
    // Usar NavController para redirigir al login
    this.navCtrl.navigateRoot('/login');
    // También se podría usar Router si prefieres: this.router.navigate(['/login']);
  }
  // Método para generar el código QR
  generateQR() {
    const dataToEncode = 'Texto a codificar';  // Cambia esto por los datos que quieras codificar
    
    this.apiService.generateQR(dataToEncode).subscribe(
      (response) => {
        const url = window.URL.createObjectURL(response);
        this.qrCodeUrl = url;
        this.isQrVisible = false;
      },
      (error) => {
        console.error('Error generando el código QR:', error);
      }
    );
  }
  toggleQrVisibility(visible: boolean) {
    this.isQrVisible = visible;
  }
}
