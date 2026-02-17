import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { SerieFormComponent } from './pages/serie-form/serie-form';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'new', component: SerieFormComponent},

    //Ruta por defecto
    {path: '', redirectTo: 'home', pathMatch: 'full'},

    //404
    {path: '**', redirectTo: 'home'}
];
