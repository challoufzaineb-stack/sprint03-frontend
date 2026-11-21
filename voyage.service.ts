import { Injectable } from '@angular/core';
import { Voyage } from '../model/voyage.model';
import { Type } from '../model/type.model';
import { TypeWrapper } from '../model/type-wrapper.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VoyageService {

  voyage!: Voyage;
  types!: Type[];

  apiURL = 'http://localhost:8090/voyages/api';
  apiURLType = 'http://localhost:8090/voyages/type';

  constructor(private http: HttpClient) {
    console.log("Création du service voyage !");
  }

  listeVoyages(): Observable<Voyage[]> {
    return this.http.get<Voyage[]>(this.apiURL);
  }

  ajouterVoyage(v: Voyage): Observable<Voyage> {
    return this.http.post<Voyage>(this.apiURL, v, httpOptions);
  }

  supprimerVoyage(id: number): Observable<any> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterVoyage(id: number): Observable<Voyage> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Voyage>(url);
  }

  updateVoyage(v: Voyage): Observable<Voyage> {
    return this.http.put<Voyage>(this.apiURL, v, httpOptions);
  }

  listeTypes(): Observable<TypeWrapper> {
    return this.http.get<TypeWrapper>(this.apiURLType);
  }

  ajouterType(t: Type): Observable<Type> {
    return this.http.post<Type>(this.apiURLType, t, httpOptions);
  }

  rechercherParType(idType: number): Observable<Voyage[]> {
    const url = `${this.apiURL}/voystype/${idType}`;
    return this.http.get<Voyage[]>(url);
  }

  rechercherParNom(nom: string): Observable<Voyage[]> {
    const url = `${this.apiURL}/voysByDestination/${nom}`;
    return this.http.get<Voyage[]>(url);
  }
}