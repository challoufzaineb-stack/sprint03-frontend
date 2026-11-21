import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Type } from '../model/type.model';
import { VoyageService } from '../services/voyage.service';
import { UpdateType } from '../update-type/update-type';

@Component({
  selector: 'app-liste-types',
  imports: [CommonModule, UpdateType],
  styleUrl: './liste-types.css',
  templateUrl: './liste-types.html',
})
export class ListeTypes implements OnInit {
  types!: Type[];
  updatedType: Type = { "idType": 0, "nomType": "" };
  ajout: boolean = true;

  constructor(
    private voyageService: VoyageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerTypes();
  }

  chargerTypes() {
    this.voyageService.listeTypes().subscribe(t => {
      console.log(t);
      this.types = t._embedded.types;
      this.cdr.detectChanges();
    });
  }

  typeUpdated(t: Type) {
    console.log("Type updated event", t);
    const typeToSend: any = { nomType: t.nomType };
    if (!this.ajout && t.idType) {
      typeToSend.idType = t.idType;
    }

    this.voyageService.ajouterType(typeToSend).subscribe({
      next: () => {
        this.chargerTypes();
        this.updatedType = { "idType": 0, "nomType": "" };
        this.ajout = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Erreur ajout/modification :", err);
      }
    });
  }

  updateTyp(t: Type) {
    this.updatedType = { ...t };
    this.ajout = false;
    this.cdr.detectChanges();
  }
}