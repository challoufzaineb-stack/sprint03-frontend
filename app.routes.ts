import { Routes } from '@angular/router';
import { Voyages } from './voyages/voyages';
import { AddVoyage } from './add-voyage/add-voyage';
import { UpdateVoyage } from './update-voyage/update-voyage';
import { RechercheParType } from './recherche-par-type/recherche-par-type';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom'; 
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { voyageGuard } from './voyage-guard';
import { ListeTypes } from './liste-types/liste-types';

export const routes: Routes = [
  { path: 'voyages', component: Voyages },
  { path: 'add-voyage', component: AddVoyage,canActivate: [voyageGuard] },
  { path: 'updateVoyage/:id', component: UpdateVoyage },
  { path: 'rechercheParType', component: RechercheParType },
  { path: 'rechercheParNom', component: RechercheParNom }, 
  { path: 'login', component: Login },
  { path: 'app-forbidden', component: Forbidden },
  { path: 'listeTypes', component: ListeTypes },
  { path: '', redirectTo: 'voyages', pathMatch: 'full' }
];