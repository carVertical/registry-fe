import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VinpercontractComponent} from './pages/vinpercontract/vinpercontract.component';
import {HomeComponent} from './pages/home/home.component';
import {UtilitiesComponent} from './pages/utilities/utilities.component';

const appRoutes: Routes = [
  {path: 'vin', component: VinpercontractComponent},
  {path: 'utilities', component: UtilitiesComponent},
  {path: '', component: HomeComponent},
  {path: '**', redirectTo: ''}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
