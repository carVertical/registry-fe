import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routes';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VinpercontractComponent } from './pages/vinpercontract/vinpercontract.component';
import { HomeComponent } from './pages/home/home.component';
import { UtilitiesComponent } from './pages/utilities/utilities.component';

@NgModule({
  declarations: [
    AppComponent,
    UtilitiesComponent,
    VinpercontractComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,

    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
