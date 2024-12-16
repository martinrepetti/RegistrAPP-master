import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { provideHttpClient } from '@angular/common/http';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component'; // Asegúrate de importar el componente 404

@NgModule({


  declarations: [
    AppComponent,
    NotFoundComponent // Asegúrate de declarar tu componente NotFound aquí
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(),
      SQLite,
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },BarcodeScanner
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
